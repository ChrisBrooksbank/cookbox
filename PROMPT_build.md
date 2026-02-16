# BUILD MODE

You are in build mode. Your job is to implement ONE task from the plan, then exit.

## 0a. Read AGENTS.md

Read AGENTS.md to understand build/test/lint commands and project patterns.

## 0b. Read Implementation Plan

Read IMPLEMENTATION_PLAN.md. Find the first uncompleted task (marked with `- [ ]`).

## 0c. Study Relevant Specs

Read the specification file(s) referenced in your task to understand requirements.

## 0d. Read Project Context

Read PLAN.md for architecture details. Read INTERVIEW.md if you need design decisions.

## 0e. Understand Existing Code

Read relevant existing code to understand patterns and conventions. Don't assume - verify.

## 1. Implement the Task

Write code to complete the task:

- Follow existing code patterns and conventions
- Follow the file structure in PLAN.md
- Write tests for new functionality when appropriate
- Keep changes focused on the single task

## 2. Validate

Run all validation commands from AGENTS.md:

```bash
npx eslint .
npx prettier --check .
npx playwright test
```

If validation fails:

- Fix the issues
- Run validation again
- Repeat until all three pass

If prettier check fails, run `npx prettier --write .` to auto-fix, then re-check.

## 3. Update Plan and Exit

After validation passes:

1. Mark the task complete in IMPLEMENTATION_PLAN.md: `- [ ]` becomes `- [x]`
2. Increment the "Build iterations" count in the Status section
3. Exit cleanly

The loop will restart with fresh context for the next task.

---

## 99999. GUARDRAILS - READ CAREFULLY

- **DON'T skip validation** - always run lint, format check, and tests before finishing
- **DON'T implement multiple tasks** - one task per iteration, stay focused
- **DON'T modify unrelated code** - stay focused on the current task
- **DON'T leave `console.log` in production code** - eslint will catch this
- **DO follow existing code patterns** - consistency matters
- **DO update IMPLEMENTATION_PLAN.md** before exiting
- **DO use ES modules** (`import`/`export`) not CommonJS
- **DO target the file structure defined in PLAN.md**
