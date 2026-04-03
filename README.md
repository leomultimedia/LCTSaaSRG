# InsightFlow

InsightFlow is a next-generation Enterprise SaaS Assessment & Survey System featuring a Glassmorphism aesthetic and built using CLEAN Architecture boundaries. This solution utilizes a multi-tenant cell-based methodology to ensure extreme scalability and GDPR/TDRA compliance.

## Features

- **Glassmorphism UX:** A World's Best analytics dashboard with dark-mode first design and translucency.
- **Dynamic Methodology Engine:** Instead of hard-coding funnels, enterprise customers can use a canvas to define custom research logic (e.g., a "12-Point Sales Funnel").
- **CLEAN Architecture:** Proper separation of pure business logic (`src/domain`), Use Cases (`src/application`), Infrastructure adapters (`src/infrastructure`), and Next.js presentation layers (`src/components`, `src/app`).
- **Data Privacy & Compliance:** Built with explicit compliance logic for GDPR Data Deletion (Right to be Forgotten) and TDRA local residency checks.

## Documentation and System Scaffolding

### Directory Structure

```plaintext
src/
├── app/                  # Next.js App Router root (Pages, Layouts)
├── components/           # React Presentation Components
│   ├── methodology/      # Workflow builder and visual canvases
│   └── compliance/       # Audit trails and compliance dashboards
├── domain/               # Core entities and logic rules (e.g., Score calculcation)
├── application/          # Use cases that orchestra domains (e.g., ProcessMethodology)
└── infrastructure/       # External bounds (Supabase, Stripe, Third Party APIs)
```

## Getting Started

First, install the necessary dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the Glassmorphism Analytics Command Center.

## Deployment & Setup Instructions

To deploy InsightFlow, the following infrastructure must be configured:
1. **Frontend Hosting:** Vercel (preferred for Next.js)
2. **Backend Services:** Supabase (Database, Auth, Edge Functions, S3 Storage)
3. **Security Overlay:** Cloudflare with Turnstile for Web Application Firewall (WAF)

See the provided `setup_credentials_guide.md` (or instructions provided via agent) for detailed information on how to acquire and integrate standard Supabase & Cloudflare API keys for the initialization of your cloud environment.
