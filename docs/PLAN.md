# Project Plan — Studentarija.mk

## 1. Discovery & Scope

A web application for student organization in Macedonia — helping students with information, resources and communication. Must be easy to use, accessible and solve real student problems.

---

## 2. Project Management

- **Tool:** Wrike for task tracking, deadline management and team coordination
- Wrike serves as the central hub where every team member knows exactly what to work on
- Alternative tools will be considered if Wrike's free tier proves limiting

---

## 3. Budget & Resources

- **Budget: 0 MKD**
- Exclusively open-source technologies and free tiers of cloud services
- Every architectural decision must respect the zero-cost rule

---

## 4. Design (UI/UX)

- **Status:** Base design already prepared
- **Next step:** Refinement only
  - Review existing design for student-friendliness
  - Ensure full responsiveness (mobile-first)
  - Meet modern accessibility standards

---

## 5. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React + Vite | Large community, fast dev |
| **Styling** | Tailwind CSS | Utility-first, free |
| **Hosting** | GitHub Pages / Render | 100% free |
| **Backend** | Supabase (BaaS) | No backend to write |
| **Database** | PostgreSQL (via Supabase) | Powerful, free tier |
| **Auth** | Supabase Auth | Built-in, free |
| **Animations** | Motion | Free, modern |
| **Icons** | Lucide React | Free, open-source |

---

## 6. Git Strategy

### Branch Protection Rules
- **No direct push to `main`** — ever, including admins
- All changes go through **Pull Requests**
- At least **1 code review approval** required before merge

### Branching Model
```
main                    ← protected, production
└── feature/login       ← new features
└── fix/button-bug      ← bug fixes
└── docs/update-readme  ← documentation
```

### Conventional Commits
```
feat: add student profile page
fix: login button not responding on mobile
docs: update setup instructions
chore: bump dependencies
refactor: extract event card component
```

### Pre-commit Hooks (Husky)
- Linter runs automatically before every commit
- Bad formatting = commit blocked

---

## 7. Testing & QA

- **Automated tests** — cover all edge cases and unexpected user inputs
- **Manual QA** — team members test all usage scenarios before each release
- **Security audit checklist:**
  - [ ] Auth token protection
  - [ ] SQL injection prevention (Supabase handles most of this)
  - [ ] XSS (Cross-Site Scripting) protection
  - [ ] Input validation on all forms

---

## 8. CI/CD (GitHub Actions)

**Trigger:** Every Pull Request

**Pipeline:**
```
PR opened
    → Run all tests
    → Linting check
    → Build check
    → (if all pass) Ready to merge
    → Merge to main
    → Auto-deploy to hosting
```

Zero manual deployment — human error eliminated.

---

## Phases

| Phase | Focus | Status |
|-------|-------|--------|
| **Phase 1** | Setup: repo, CI/CD, local DB, project structure | 🚧 In progress |
| **Phase 2** | Core features: posts, events, auth, admin panel | ⏳ Pending |
| **Phase 3** | Refinement: search, filters, notifications | ⏳ Pending |
| **Phase 4** | QA, security audit, production deploy | ⏳ Pending |

---

*Last updated: 2026-06-20*
