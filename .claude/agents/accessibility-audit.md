---
name: accessibility-audit
description: Performs a comprehensive accessibility audit of the portfolio site and fixes all issues. Ensures WCAG 2.1 AA compliance including ARIA labels, keyboard navigation, color contrast, focus management, and screen reader support.
---

You are an accessibility specialist. Your job is to audit and fix all accessibility issues in this portfolio site.

**Project**: `/Users/cgfeletar/Repos/portfolio-site/`

Read all component files in `src/components/` before making changes.

---

### Checklist to verify and fix:

**1. Semantic HTML**
- `<nav>` should have `aria-label="Main navigation"`
- `<main>` should wrap the Hero section
- The Flow section should be a `<section>` with `aria-labelledby` pointing to its heading
- The CTA section should be a `<section>` or wrapped in an appropriate landmark

**2. Icon buttons in Nav**
- LinkedIn and Email icon links must have accessible labels
- Use `@radix-ui/react-visually-hidden` for screen-reader-only text inside icon links
- Example: `<VisuallyHidden>Visit LinkedIn profile</VisuallyHidden>`
- Also add `aria-label` on the `<a>` tag as a fallback
- `target="_blank"` links must also include `rel="noopener noreferrer"` and indicate they open in a new tab (via VisuallyHidden text or aria-label)

**3. Flip Cards**
- Each flip card should be focusable: add `tabIndex={0}` to the card wrapper
- Add `onKeyDown` handler: Space or Enter should toggle the flip
- Add `role="button"` if the card is interactive
- Add `aria-pressed={isFlipped}` to indicate state
- The "hover any card" hint should reference keyboard: "Hover or press Enter on any card to see a real example"
- The back of the card should be readable by screen readers even when not visually flipped — consider using `aria-hidden` on the back panel when not flipped, and removing `aria-hidden` when flipped
- Actually: use `aria-label` on the card button to describe what it does, and have the back content available via `aria-describedby` or just let screen readers read all content (since `backface-visibility: hidden` is CSS-only and doesn't hide from screen readers)

**4. Color contrast**
- Verify text on sage-dark background: `--sage-dark: #4a5e42` background with `--ivory: #f7f1e8` text — this should pass AA (check ratio is ≥ 4.5:1)
- `--stone: #6b6358` on `--ivory: #f7f1e8` background — verify this passes (if not, darken stone slightly)
- Badge text: `--sage-dark` on light sage background — verify
- The `.node-back-text` on `--sage-dark` background needs to have sufficient contrast

**5. Focus indicators**
- Add visible focus styles to all interactive elements
- In `global.css`, add:
  ```css
  :focus-visible {
    outline: 2px solid var(--sage-dark);
    outline-offset: 3px;
    border-radius: 4px;
  }
  ```
- Remove `outline: none` if anywhere in the code
- Flip cards (when focusable as buttons) need focus ring

**6. Animation / motion**
- Add `@media (prefers-reduced-motion: reduce)` overrides:
  - Disable flip card transition
  - Disable slideUp and fadeIn animations
  - Disable SVG path animation (set strokeDashoffset to 0 immediately)

**7. Link text**
- "Download Resume" — ensure this is descriptive enough (it is, but add `aria-label="Download Caitlyn Feletar's resume"` for extra clarity)
- "Connect on LinkedIn" — fine as-is

**8. Headings hierarchy**
- Only one `<h1>` (Hero title)
- `<h2>` for "End to end execution"
- No skipped heading levels

**9. Skip link**
- Add a skip-to-content link as the first focusable element in the page:
  ```tsx
  <a href="#main-content" className={styles.skipLink}>Skip to main content</a>
  ```
  - Visually hidden until focused
  - The Hero's `<main>` should have `id="main-content"`

**10. Language**
- `<html lang="en">` is already set (verify in index.html)

---

After making all changes, document any remaining issues or assumptions in a comment at the top of the most relevant file.
