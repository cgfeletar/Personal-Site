/*
 * Code Review Summary
 * Reviewed: 2026-03-01
 *
 * Components: Nav, Hero, FlipCard, FlowCanvas, FlowSection, Badge, Button
 * Hooks: useFlowArrows
 * Agents: component-architecture, animation, mobile-design, accessibility-audit, performance, code-review
 *
 * Key fixes applied during review:
 * - Added 'ivory' variant to Badge component (types + styles) to replace !important
 *   className override in FlipCard's badgeSpecial class. Node 10 now passes
 *   variant="ivory" through props instead of overriding via className.
 * - Removed badgeSpecial CSS class (with 3× !important declarations) from
 *   FlipCard.module.css — no longer needed.
 * - Removed unused flipHint CSS class from FlipCard.module.css (element was
 *   never rendered in the JSX).
 * - Changed badge key in FlipCard from array index (key={i}) to badge.label
 *   for semantically stable keys.
 * - Refactored Badge variant class resolution from inline ternary string
 *   concatenation to a named variable for readability.
 *
 * Quality assessment: Production-ready portfolio site with accessible,
 * responsive, animated components. Clean TypeScript, CSS Modules, Radix UI.
 * TypeScript passes strict mode with noUnusedLocals + noUnusedParameters.
 * All CSS variables used consistently; no hardcoded font-family strings;
 * no console.log or TODO comments.
 */
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { FlowSection } from './components/FlowSection';
import styles from './App.module.css';

function App() {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Nav />
      <Hero />
      <FlowSection />
    </>
  );
}

export default App;
