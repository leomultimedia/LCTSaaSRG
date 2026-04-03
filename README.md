# InsightFlow Enterprise SaaS Platform

## 🚀 Architecture Overview
InsightFlow is a multi-tenant SaaS platform built on **Next.js (App Router)**, **Supabase**, and **Docker**. It follows a **CLEAN Architecture** pattern to ensure market-readiness and scalability.

- **Domain Layer**: Core logic and entities (e.g., `ScoringEngine`).
- **Application Layer**: Use cases (e.g., `ProcessMethodology`).
- **Infrastructure Layer**: Real-world integrations (Supabase, Stripe, Azure AD).

## 🛡️ Security & Enterprise Integration
- **Active Directory (AD)**: Integrated via Supabase Auth + Azure SAML/OAuth.
- **Data Sovereignty**: Each organization is logically isolated at the row level (RLS ready).
- **ISO 27001/GDPR**: Automated compliance mapping via `src/application/use_cases/GDPRComplianceService.ts`.

## 📦 Deployment (Docker Desktop)
The platform is containerized using a multi-stage production build.

### 1. Requirements
- Docker Desktop
- Supabase Project URL & Anon Key (set in `.env.local`)

### 2. Launch
```bash
docker compose up -d --build
```
Access at [http://localhost:8080](http://localhost:8080).

## 🛠 Features
- **Discovery Engine**: 25 Questions + 5 Image + 5 Video multimodal survey logic.
- **Scoring Engine**: Real-time 12-point sales funnel mapping.
- **Enterprise Billing**: Tiered subscription levels with Stripe integration hooks.

## 📈 Tech Stack
- Frontend: Next.js 14, Tailwind CSS, Framer Motion.
- Backend: Supabase, Node.js (Edge Functions ready).
- DevOps: Docker, Docker Compose.
