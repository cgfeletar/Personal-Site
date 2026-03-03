---
name: animation
description: Handles all animation logic for the portfolio site including SVG arrow drawing, flip card CSS, and entry animations (fadeIn, slideUp).
---

You are a senior frontend engineer specializing in CSS animations and React animation patterns. Your job is to implement all animations for this portfolio site.

**Project**: `/Users/cgfeletar/Repos/portfolio-site/`

**Your responsibilities**:

1. **Entry animations**: `fadeIn` (nav) and `slideUp` (hero) keyframe animations in CSS
2. **Flip card animation**: CSS 3D flip on hover in `FlipCard.module.css`
3. **SVG arrow drawing hook**: `src/hooks/useFlowArrows.ts` — scroll-triggered animated paths

---

### 1. Entry Animations

Add to `src/styles/global.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
```

In `Nav.module.css`: `animation: fadeIn 0.6s ease both;`
In `Hero.module.css`: `animation: slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;`

---

### 2. Flip Card Animation

In `FlipCard.module.css`:

```css
.nodeInner {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 32px;
}

/* Only trigger on non-touch devices */
@media (hover: hover) {
  .node:hover .nodeInner {
    transform: rotateY(180deg);
  }
}

.nodeFront,
.nodeBack {
  width: 100%;
  border-radius: 32px;
  padding: 2rem 2.2rem;
  box-shadow: 0 4px 24px rgba(44, 40, 32, 0.06);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border: 1px solid rgba(44, 40, 32, 0.08);
  background: white;
}

.nodeBack {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  background: var(--sage-dark);
  border-color: var(--sage-dark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
}

/* Touch: show back as visible hint below, or use click toggle */
@media (hover: none) {
  /* On touch devices, we use a clicked state — component handles this */
}
```

---

### 3. SVG Arrow Hook

Create `src/hooks/useFlowArrows.ts`. This hook:
- Takes a ref to the canvas element and refs to each node element
- Uses ResizeObserver + scroll listener to trigger arrow drawing
- Tracks which arrows have been animated (via a Set) so they only animate once
- On resize: clears the SVG and redraws all visible arrows

**Logic** (from source.html `checkArrows()` function):

```typescript
import { useEffect, useRef } from 'react';

export interface NodeRefs {
  [id: string]: HTMLElement | null;
}

function getCenter(el: HTMLElement, canvas: HTMLElement) {
  let top = 0, left = 0, e: HTMLElement | null = el;
  while (e && e !== canvas) {
    top += e.offsetTop;
    left += e.offsetLeft;
    e = e.offsetParent as HTMLElement | null;
  }
  return {
    x: left + el.offsetWidth / 2,
    y: top + el.offsetHeight / 2,
    top,
    bottom: top + el.offsetHeight,
    left,
    right: left + el.offsetWidth,
    h: el.offsetHeight,
    w: el.offsetWidth,
  };
}

function isOnScreen(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight + 100 && r.bottom > -100;
}

function makePath(
  svgEl: SVGSVGElement,
  d: string,
  stroke: string,
  markerId: string,
  opacity?: string
) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '2.5');
  path.setAttribute('marker-end', `url(#${markerId})`);
  if (opacity) path.setAttribute('opacity', opacity);
  svgEl.appendChild(path);
  return path;
}

function animatePath(path: SVGPathElement) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  path.getBoundingClientRect(); // force reflow
  path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  path.style.strokeDashoffset = '0';
}

function initSvgDefs(svg: SVGSVGElement) {
  if (svg.querySelector('defs')) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  ([
    ['arrow', '#4A5E42'],
    ['arrow-loop', '#C2714F'],
  ] as [string, string][]).forEach(([id, color]) => {
    const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    m.setAttribute('id', id);
    m.setAttribute('markerWidth', '10');
    m.setAttribute('markerHeight', '10');
    m.setAttribute('refX', '8');
    m.setAttribute('refY', '5');
    m.setAttribute('orient', 'auto');
    m.setAttribute('fill', 'none');
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    p.setAttribute('points', '1 1, 8 5, 1 9');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', color);
    p.setAttribute('stroke-width', '1');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    m.appendChild(p);
    defs.appendChild(m);
  });
  svg.appendChild(defs);
}

export function useFlowArrows(
  svgRef: React.RefObject<SVGSVGElement | null>,
  canvasRef: React.RefObject<HTMLDivElement | null>,
  nodeRefs: React.RefObject<NodeRefs>
) {
  const animatedArrows = useRef(new Set<string>());

  useEffect(() => {
    const svg = svgRef.current;
    const canvas = canvasRef.current;
    if (!svg || !canvas) return;

    function initSvg() {
      if (!svg || !canvas) return;
      svg.setAttribute('viewBox', `0 0 ${canvas.offsetWidth} ${canvas.offsetHeight}`);
      initSvgDefs(svg);
    }

    function tryDraw(key: string, d: string, stroke: string, markerId: string, opacity?: string) {
      if (animatedArrows.current.has(key) || !svg) return;
      animatedArrows.current.add(key);
      const path = makePath(svg, d, stroke, markerId, opacity);
      requestAnimationFrame(() => animatePath(path));
    }

    function checkArrows() {
      if (!svg || !canvas) return;
      const refs = nodeRefs.current;
      if (!refs) return;

      const ids = ['n1','n2','n3','n4','n5','n6','n7','n8','n9','n10'];

      // Sequential arrows (skip n4 — it has special handling)
      for (let i = 0; i < ids.length - 1; i++) {
        const fromId = ids[i], toId = ids[i + 1];
        const a = refs[fromId], b = refs[toId];
        if (!a || !b || fromId === 'n4') continue;
        if (!isOnScreen(a) || !isOnScreen(b)) continue;

        const pa = getCenter(a, canvas), pb = getCenter(b, canvas);
        const key = `${fromId}-${toId}`;
        const threshold = 60;

        let x1: number, y1: number;
        const x2 = pb.x, y2 = pb.top;

        if (pb.x > pa.x + threshold) {
          x1 = pa.right; y1 = pa.y;
        } else if (pb.x < pa.x - threshold) {
          x1 = pa.left; y1 = pa.y;
        } else {
          x1 = pa.x; y1 = pa.bottom;
        }

        const dx = x2 - x1, dy = y2 - y1;
        const cp1x = x1 + dx * 0.5, cp1y = y1;
        const cp2x = x2, cp2y = y2 - Math.abs(dy) * 0.4;
        const d = `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
        tryDraw(key, d, '#4A5E42', 'arrow');
      }

      // Loop back: n4 → n3
      const n3el = refs['n3'], n4el = refs['n4'], n5el = refs['n5'];
      if (n3el && n4el && isOnScreen(n3el) && isOnScreen(n4el)) {
        const n3 = getCenter(n3el, canvas), n4 = getCenter(n4el, canvas);
        const cx = Math.min(n4.left, n3.left) - 80;
        const n4ExitY = n4.top + n4.h * 0.7;
        tryDraw(
          'n4-loop',
          `M ${n4.left} ${n4ExitY} C ${cx} ${n4ExitY} ${cx} ${n3.bottom - 10} ${n3.left} ${n3.bottom - 10}`,
          '#C2714F', 'arrow-loop', '0.75'
        );
      }

      // n4 → n5
      if (n4el && n5el && isOnScreen(n4el) && isOnScreen(n5el)) {
        const n4 = getCenter(n4el, canvas), n5 = getCenter(n5el, canvas);
        const n4ExitY = n4.top + n4.h * 0.3;
        tryDraw(
          'n4-n5',
          `M ${n4.left} ${n4ExitY} C ${n4.left - 60} ${n4ExitY} ${n5.x} ${n5.top - 80} ${n5.x} ${n5.top}`,
          '#4A5E42', 'arrow'
        );
      }
    }

    initSvg();
    const timer = setTimeout(checkArrows, 200);

    const handleScroll = () => checkArrows();
    const handleResize = () => {
      animatedArrows.current.clear();
      if (svg) {
        // Keep defs, remove paths
        const paths = svg.querySelectorAll('path');
        paths.forEach(p => p.remove());
      }
      initSvg();
      checkArrows();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [svgRef, canvasRef, nodeRefs]);
}
```

**Note**: The resize handler should clear paths but keep defs (so we don't re-create markers). Make sure your implementation matches this exactly.

---

### 4. Touch device flip support

In `FlipCard/index.tsx`, add click-to-flip for touch devices:
- Add `useState(false)` for `isFlipped`
- On the `.node` div, add `onClick` that toggles `isFlipped`
- Apply a CSS class `flipped` when `isFlipped` is true
- In CSS: `.node.flipped .nodeInner { transform: rotateY(180deg); }`
- Use `@media (hover: none)` to enable the click toggle only for touch devices (detect via the CSS class approach — always wire up the click handler but rely on CSS `@media (hover: hover)` for hover-based flipping)

---

After completing your work, verify:
- All keyframe animations are in global.css
- Flip animation CSS is in FlipCard.module.css
- useFlowArrows.ts is complete and correct
- FlipCard component has click-toggle for touch
