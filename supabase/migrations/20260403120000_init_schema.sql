-- Enable the UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Multi-tenant Organization Table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'starter', -- 'starter', 'unlimited'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users to Organizations Mapping (RBAC/Multi-tenant mapping)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin', -- 'admin', 'auditor', 'viewer'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, org_id)
);

-- Assessment Definitions
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_json JSONB DEFAULT '{}'::jsonb, -- Stores questions, logic, and media links
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Methodology Templates
CREATE TABLE methodology_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- e.g., "12-Point Sales Funnel"
  config JSONB NOT NULL DEFAULT '{}'::jsonb, -- Stages, weights, and scoring rules
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assessment Submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  responses JSONB DEFAULT '{}'::jsonb,
  media_links JSONB DEFAULT '[]'::jsonb,
  ip_hash TEXT, -- Hashed for GDPR minimization
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Methodology Outcomes
CREATE TABLE methodology_outcomes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES methodology_templates(id) ON DELETE CASCADE,
  current_stage TEXT NOT NULL,
  score_breakdown JSONB DEFAULT '{}'::jsonb,
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE methodology_outcomes ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES FOR TRUE TENANT ISOLATION

-- Organizations: users can only see orgs they belong to
CREATE POLICY "Users can view their organization"
  ON organizations
  FOR SELECT
  USING (id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid()));

-- Assessments: isolated to org
CREATE POLICY "Tenant Access Assessments"
  ON assessments
  FOR ALL
  USING (org_id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid()));

-- Methodology Templates: isolated to org
CREATE POLICY "Tenant Access Methodology Templates"
  ON methodology_templates
  FOR ALL
  USING (org_id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid()));

-- Submissions: public can insert (if assessment is public), but only tenant can read/update
CREATE POLICY "Public can insert submissions"
  ON submissions
  FOR INSERT
  WITH CHECK (true); -- Note: In prod, check if assessment is published.

CREATE POLICY "Tenant Access Submissions"
  ON submissions
  FOR SELECT
  USING (assessment_id IN (SELECT id FROM assessments WHERE org_id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid())));

-- Methodology Outcomes: isolated to org
CREATE POLICY "Tenant Access Outcomes"
  ON methodology_outcomes
  FOR ALL
  USING (template_id IN (SELECT id FROM methodology_templates WHERE org_id IN (SELECT org_id FROM user_roles WHERE user_id = auth.uid())));
