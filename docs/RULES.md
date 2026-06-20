# Development Rules & Guardrails (`RULES.md`)

This document defines the strict constraints and coding standards for all development in this workspace. AI Agents and human developers must adhere to these rules without exception.

## 1. Code Architecture & Modular Design
* **Strict LOC Limit:** No source code files may exceed **300 lines of code**. Documentation, configuration files, and architectural plans are exempt from this limit.
* **Modular First:** If a feature or task requires more logic, it must be split into smaller, isolated modules, sub-components, or utility functions from the start.
* **Stable Entrypoints:** Think ahead before writing code. Keep the main API boundaries and component entrypoints stable, isolating internal implementation logic so it can be changed without breaking dependencies.
* **UI Intent:** Always design the user interface for the actual end-student experience, not just to reflect the database schema structure.

## 2. Error Handling & Stability
* **Fail-Fast Philosophy:** Do not add default or silent fallbacks during the development phase. If a routine, API call, or layout component fails, let it fail explicitly so it can be caught and fixed.
* **No Empty Catch Blocks:** Empty `try-catch` blocks are strictly forbidden. Every catch block must log the failure clearly or handle it explicitly.

## 3. Dependency Management
* **Don't Reinvent the Wheel:** Prioritize open-source, lightweight, or self-hosted libraries.
* **Validation:** Before adding a new package, present the selection to the user and justify the choice (bundle size, license, active maintenance).

## 4. Git & Repository Integrity
* **Protected Main Branch:** Direct pushes to the `main` branch are disabled. All changes must be delivered via Pull Requests (PRs).
* **Branching Convention:** Use clear semantic prefixes for branches:
  * `feature/feature-name` (e.g., `feature/student-login`)
  * `bugfix/issue-description` (e.g., `bugfix/token-expiration`)
  * `docs/update-topic`
* **Mandatory Reviews:** A Pull Request requires at least one peer approval or explicit user verification before merging.
* **Conventional Commits:** Commit messages must follow structured prefixes to maintain an automated changelog:
  * `feat: <description>` (new feature)
  * `fix: <description>` (bug fix)
  * `docs: <description>` (documentation update)
  * `style: <description>` (formatting, missing semi-colons, etc.)
  * `refactor: <description>` (code change that neither fixes a bug nor adds a feature)
