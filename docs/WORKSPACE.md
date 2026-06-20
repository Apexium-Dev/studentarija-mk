# WORKSPACE.md - Project Map & Architecture

This document serves as the directory map and architectural guide for the project. All AI agents and developers must consult this map before creating new files or modifying the project structure.

## 1. Directory Structure

The repository follows a strict Next.js (App Router) and Supabase project structure. Do not deviate from this layout.

```text
/
├── .github/                # GitHub Actions (CI/CD workflows, issue templates)
├── docs/                   # Project documentation (if not in root)
│   ├── RULES.md            # Coding standards & guardrails
│   ├── CONTINUITY.md       # Long-term memory and project state
│   ├── CLAUDE.md           # Agent behavioral guidelines
│   └── PLAN.md             # Current sprint tasks and short-term execution
├── public/                 # Static assets (images, fonts, icons)
├── src/                    # Main application source code
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   ├── components/         # Reusable React components
│   │   ├── ui/             # Dumb UI components (buttons, inputs, modals)
│   │   └── features/       # Complex, domain-specific components (e.g., StudentProfile)
│   ├── lib/                # Utility functions and external integrations
│   │   ├── supabase/       # Supabase client initialization and DB helpers
│   │   └── utils.ts        # General utility functions (formatting, validation)
│   ├── types/              # Global TypeScript interfaces and DB schema types
│   └── hooks/              # Custom React hooks
├── supabase/               # Supabase local environment & migrations
│   ├── migrations/         # SQL migration files
│   └── seed.sql            # Dummy data for local testing
├── .gitignore              # Ignored files (node_modules, .env, etc.)
├── package.json            # Project dependencies and scripts
└── tailwind.config.ts      # UI styling configuration
```

## 2. Navigation Rules for Agents

When tasked with a specific goal, navigate to the appropriate domain:

* **Routing & Pages:** If you are adding a new screen, create it in `src/app/[route-name]/page.tsx`.
* **Database Queries:** Do NOT write raw SQL inside React components. Place all database interaction logic inside `src/lib/supabase/`.
* **UI Components:** Build highly modular, decoupled components in `src/components/ui/`. Never place business logic in UI components.
* **Types:** Always define strict TypeScript interfaces in `src/types/` before implementing features.

## 3. Naming Conventions

* **Components & Files (React):** Use `PascalCase.tsx` (e.g., `StudentDashboard.tsx`).
* **Utility Files:** Use `kebab-case.ts` (e.g., `format-date.ts`).
* **CSS/Styling:** Utility-first approach using Tailwind CSS. Avoid creating custom `.css` files unless absolutely necessary for complex animations.

## 4. Local Development Environment

Before testing changes, ensure the environment is running correctly:

1. Run the local frontend server: `npm run dev`
2. (If configured) Start the local Supabase instance: `npx supabase start`
3. Do NOT commit `.env.local` files containing real production keys.
