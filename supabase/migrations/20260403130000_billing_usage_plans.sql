-- 1. Create a table for global pricing plans (Configurable by admin)
CREATE TABLE pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- e.g., 'Starter', 'Professional', 'Enterprise'
  price_cents INTEGER NOT NULL, -- e.g., 2900 for $29.00
  currency TEXT DEFAULT 'USD',
  billing_period TEXT NOT NULL, -- 'monthly', 'quarterly', 'semi-annually', 'yearly'
  form_limit INTEGER NOT NULL, -- 5, 10, 50, -1 (unlimited)
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Link subscriptions to organizations
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES pricing_plans(id),
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'past_due', 'canceled'
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id)
);

-- 3. Seed initial plans as requested
INSERT INTO pricing_plans (name, price_cents, billing_period, form_limit) VALUES
('Starter Monthly', 2900, 'monthly', 5),
('Pro Monthly', 7900, 'monthly', 10),
('Business Monthly', 19900, 'monthly', 50),
('Enterprise Monthly', 49900, 'monthly', -1), -- unlimited
('Starter Yearly', 29000, 'yearly', 5), -- 2 months free implied
('Enterprise Yearly', 499000, 'yearly', -1);

-- 4. Enable RLS
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Public view active plans" ON pricing_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admin manage plans" ON pricing_plans FOR ALL USING (auth.jwt() ->> 'email' = 'admin@insightflow.com'); -- Simple admin check

CREATE POLICY "Users can view their subscription" ON subscriptions FOR SELECT 
USING (org_id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid()));

-- 6. Usage Analytics Layer (CLTV, ARPU Tracking)
-- This table tracks historic revenue per tenant for CLTV calc.
CREATE TABLE revenue_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'subscription_payment', 'addon'
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- KPI Views for Analytics
CREATE OR REPLACE VIEW tenant_kpis AS
SELECT 
  o.id as org_id,
  o.name as org_name,
  COALESCE(SUM(rl.amount_cents), 0) / 100.0 as cltv,
  COUNT(DISTINCT a.id) as total_surveys,
  (SELECT COUNT(*) FROM submissions s JOIN assessments a2 ON s.assessment_id = a2.id WHERE a2.org_id = o.id) as total_submissions
FROM organizations o
LEFT JOIN revenue_logs rl ON o.id = rl.org_id
LEFT JOIN assessments a ON o.id = a.org_id
GROUP BY o.id, o.name;
