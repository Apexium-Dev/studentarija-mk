# Continuity Ledger (`CONTINUITY.md`)

This is the canonical context file designed to survive chat/token compaction. It serves as the long-term memory for the workspace state, architecture, and ongoing progress.

> **Operating Rule:** Read this file at the start of every session before executing any actions. Update this file only when there is a meaningful delta in goals, constraints, decisions, state, or critical outcomes.

## 1. Current Snapshot
* **Goal:** Build a robust, zero-cost web application for a student organization to support and protect students in North Macedonia.
* **Now:** Initializing repository structure, setting up development workflows, and configuring strict Git environments.
* **Next:** Integrating design refinements and establishing database connection scaffolding.
* **Open Questions:** Confirming the exact list of initial features for the minimum viable product (MVP) based on the existing design files.

## 2. Core Tech Stack & Constraints
* **Frontend:** React / Next.js (Optimized for modern performance and SEO)
* **Backend & DB:** Supabase (PostgreSQL, Built-in Auth, Realtime listeners)
* **Hosting:** GitHub Pages (Static hosting) or Render (Free tier web service)
* **Budget Constraint:** 0 MKD (Exclusively utilizing free tiers and open-source software)
* **Project Management:** Wrike (Primary workflow tracking platform)

## 3. Architecture Decisions (ADR-Lite)
* **D001 [ACTIVE - 2026-06-20]:** Selected Supabase as the backend-as-a-service provider to meet the zero-budget constraint while securing built-in user authentication and SQL relational databases.
* **D002 [ACTIVE - 2026-06-20]:** Enforced a strict 300 LOC limit per code file across the workspace to guarantee extreme modularity and prevent context window dilution for AI development agents.

## 4. Done (Recent Milestone Bullets)
* `[2026-06-20]` Initialized project management strategy using Wrike.
* `[2026-06-20]` Established core architectural constraints and tech stack definition.
* `[2026-06-20]` Configured repository guardrails via `RULES.md` and `CONTINUITY.md`.

## 5. Active Working Set
* `RULES.md` - System guardrails and development rules.
* `CONTINUITY.md` - Active ledger and contextual tracking state.

## 6. Receipts & Change Logs
* `2026-06-20T00:00Z` `[USER]`: Defined project scope as a student organization app for North Macedonia with zero budget.
* `2026-06-20T00:05Z` `[ASSUMPTION]`: Assumed initial design asset refinement can be conducted within standard web framework component lifecycles.
* `2026-06-20T00:10Z` `[CODE]`: Generated default workspace guardrails and injected them into the active working set.
