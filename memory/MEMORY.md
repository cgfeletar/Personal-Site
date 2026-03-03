# Portfolio Site Memory

## Project Stack
- Vite + React 19 + TypeScript
- CSS Modules (no Tailwind)
- Radix UI: `@radix-ui/react-slot` (Button), `@radix-ui/react-visually-hidden` (Nav)

## Structure
- `src/components/` — Nav, Hero, FlipCard, FlowCanvas, FlowSection, Badge, Button
- `src/hooks/useFlowArrows.ts` — SVG arrow animation hook
- `src/data/flowNodes.ts` — All 10 flow node data objects
- `src/styles/variables.css` — CSS custom properties (colors, fonts)
- `src/styles/global.css` — Global reset, body, keyframes
- `src/types/index.ts` — FlowNode, BadgeData types
- `.claude/agents/` — 6 agent definition files

## CSS Variables (in variables.css)
`--sage`, `--sage-light`, `--sage-dark`, `--ivory`, `--warm`, `--terracotta`, `--stone`, `--deep`
`--font-serif: 'Fraunces', serif` | `--font-sans: 'Instrument Sans', sans-serif`

## Key Patterns
- Button uses Radix Slot (`asChild`) for polymorphic link/button rendering
- FlipCard: CSS 3D flip on hover (pointer) + click/Enter toggle (touch/keyboard)
- SVG arrows: scroll-triggered, drawn once, animated via strokeDashoffset
- Badge has variants: default, terracotta, warm, ivory (ivory for node 10 special)
- Node 10 is "special" — dark front face, terracotta-dark back face

## Agents Created
1. component-architecture — scaffolds components
2. animation — SVG hooks, flip CSS, entry animations
3. mobile-design — responsive CSS breakpoints
4. accessibility-audit — ARIA, focus, skip link, VisuallyHidden
5. performance — event listener audits, font preconnects
6. code-review — TypeScript, clean code, !important elimination

## Build
`npm run build` — clean build, zero TS errors
Bundle: ~215KB JS / ~10KB CSS (gzipped: ~69KB / ~3KB)
