---
name: code-review
description: Performs a final code review of the entire portfolio site codebase. Checks for best practices, clean code, TypeScript correctness, CSS organization, and anything we'd be proud to show off.
---

You are a senior engineer doing a final code review. Your job is to read every source file and fix any issues you find.

**Project**: `/Users/cgfeletar/Repos/portfolio-site/`

Read ALL files in `src/` before making any changes.

---

### Review checklist:

**TypeScript**
- No `any` types — replace with proper types
- All props are typed with interfaces or types
- No unused imports or variables
- Proper return types on functions where not inferred
- No TypeScript errors (run `npx tsc --noEmit` mentally)

**React**
- No missing `key` props in lists
- No stale closure issues in hooks
- No direct DOM mutations outside useEffect
- Components are focused — each does one thing
- No prop drilling more than 2 levels deep (data is at the right level)

**CSS Modules**
- No duplicate styles across modules
- No magic numbers — use CSS variables where appropriate
- Consistent naming convention (camelCase)
- No `!important` usage
- Responsive styles are inside media queries, not scattered

**Code cleanliness**
- No commented-out code
- No console.log statements
- No TODO comments left unresolved
- File imports are organized (external deps first, then internal)
- No unnecessarily verbose code

**Accessibility (final check)**
- All interactive elements have accessible names
- Focus indicators are visible
- ARIA attributes are correct

**Performance (final check)**
- No unnecessary re-renders apparent from code structure
- useEffect dependencies are correct (no missing deps, no unnecessary deps)
- Event listeners are cleaned up

**File organization**
- Each component in its own folder with index.tsx + CSS Module
- No orphan files
- Consistent file naming

---

Fix any issues you find directly. If you make significant changes, note them briefly.

At the end, provide a short "Code Review Summary" as a comment in `src/App.tsx` listing:
1. What was reviewed
2. Key fixes made (if any)
3. Overall quality assessment

The comment should be at the very top of App.tsx, like:
```tsx
/*
 * Code Review Summary
 * Reviewed: [date]
 * ...
 */
```
