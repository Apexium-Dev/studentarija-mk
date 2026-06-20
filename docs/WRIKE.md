# Wrike Integration Guide (`WRIKE.md`)

This document defines how to connect, authorize, and use Wrike as the project management hub for this workspace. All task tracking, sprint planning, and progress updates flow through Wrike.

> **Operating Rule:** At the start of every development session, check active Wrike tasks before writing any code. Update task statuses as work progresses — do not let Wrike fall out of sync with the actual codebase state.

## 1. First-Time Authorization

Wrike uses OAuth 2.0. After restarting Claude Code, authorization happens once per session:

* Claude Code will automatically open your browser for Wrike login.
* Log in with your Wrike credentials and click **Approve**.
* The browser closes and the connection is established.
* If authorization fails, restart Claude Code and try again.

## 2. Task Management Commands

Use natural language to interact with Wrike directly from Claude Code:

* **View tasks:** `What are my Wrike tasks this week?` or `Show all tasks in the Studentarija project`
* **Create tasks:** `Create a Wrike task: "Set up Next.js project structure" in Phase 1`
* **Update status:** `Mark "Set up Next.js project structure" as complete`
* **Add context:** `Add a comment to the "SQL schema" task: "Merged via PR #5"`
* **Search:** `Show me all overdue tasks` or `What tasks are In Progress?`

## 3. Recommended Workspace Structure

The Wrike workspace should mirror the project phases defined in `PLAN.md`:

* **Space:** Studentarija.mk
  * **Project:** Development
    * **Folder:** Phase 1 — MVP (Setup, Posts, Events, Auth)
    * **Folder:** Phase 2 — Features (Search, Notifications, Profiles)
    * **Folder:** Phase 3 — Polish (QA, Security, Deployment)

## 4. Session Workflow

Every development session follows this sequence:

1. Read `CONTINUITY.md` to load current project state.
2. Query Wrike for active tasks assigned to the current phase.
3. Pick the next task, update its status to **In Progress**.
4. Implement the feature or fix.
5. Mark the task **Complete** and update `CONTINUITY.md` with the delta.

## 5. Troubleshooting

* **"Wrike not connected"** — Restart Claude Code. The OAuth session will re-authorize on the next start.
* **Tasks not visible** — Confirm you are querying the correct Wrike space and project name.
* **Token expired** — This is handled automatically by OAuth. A restart resolves it.
