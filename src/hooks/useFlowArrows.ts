import { useEffect, useRef, type RefObject } from 'react';

type NodeRefs = Record<string, HTMLDivElement | null>;

function getCenter(el: HTMLElement, canvas: HTMLElement) {
  let top = 0, left = 0;
  let e: HTMLElement | null = el;
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

function isOnScreen(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight + 100 && r.bottom > -100;
}

function makePath(
  svg: SVGSVGElement,
  d: string,
  stroke: string,
  markerId: string,
  opacity?: string
): SVGPathElement {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', '2.5');
  path.dataset.markerId = markerId;
  if (opacity) path.setAttribute('opacity', opacity);
  svg.appendChild(path);
  return path;
}

function animatePath(path: SVGPathElement): void {
  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  path.getBoundingClientRect(); // force reflow
  path.style.transition = 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  path.style.strokeDashoffset = '0';
  // Add arrowhead only after the draw animation completes so it doesn't
  // appear at the destination before the line reaches it.
  setTimeout(() => {
    path.setAttribute('marker-end', `url(#${path.dataset.markerId})`);
  }, 820);
}

function initSvgDefs(svg: SVGSVGElement): void {
  if (svg.querySelector('defs')) return;
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const markers: [string, string][] = [
    ['arrow', '#4A5E42'],
    ['arrow-loop', '#C2714F'],
  ];
  markers.forEach(([id, color]) => {
    const m = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    m.setAttribute('id', id);
    m.setAttribute('markerWidth', '10');
    m.setAttribute('markerHeight', '10');
    m.setAttribute('refX', '8');
    m.setAttribute('refY', '5');
    m.setAttribute('orient', 'auto');
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
  svgRef: RefObject<SVGSVGElement | null>,
  canvasRef: RefObject<HTMLDivElement | null>,
  nodeRefsRef: RefObject<NodeRefs>
): void {
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
      const refs = nodeRefsRef.current;
      if (!refs) return;

      const ids = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10'];

      // Sequential arrows — skip n4 special handling
      for (let i = 0; i < ids.length - 1; i++) {
        const fromId = ids[i];
        const toId = ids[i + 1];
        if (fromId === 'n4') continue;
        const a = refs[fromId];
        const b = refs[toId];
        if (!a || !b) continue;
        if (!isOnScreen(a) || !isOnScreen(b)) continue;

        const pa = getCenter(a, canvas);
        const pb = getCenter(b, canvas);
        const key = `${fromId}-${toId}`;
        const threshold = 60;

        const CARD_GAP = 14; // px above the top of the destination card
        let x1: number, y1: number;
        const x2 = pb.x;
        const y2 = pb.top - CARD_GAP;

        if (pb.x > pa.x + threshold) {
          x1 = pa.right;
          y1 = fromId === 'n3' ? pa.top + pa.h * 0.35 : pa.y;
        } else if (pb.x < pa.x - threshold) {
          x1 = pa.left;
          y1 = fromId === 'n3' ? pa.top + pa.h * 0.35 : pa.y;
        } else {
          x1 = pa.x;
          y1 = pa.bottom;
        }

        const dx = x2 - x1;
        const dy = y2 - y1;
        const cp1x = x1 + dx * 0.5;
        const cp1y = y1;
        const cp2x = x2;
        const cp2y = y2 - Math.abs(dy) * 0.4;
        const d = `M ${x1} ${y1} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x2} ${y2}`;
        tryDraw(key, d, '#4A5E42', 'arrow');
      }

      // Loop back: n4 → n3
      const n3el = refs['n3'];
      const n4el = refs['n4'];
      const n5el = refs['n5'];

      if (n3el && n4el && isOnScreen(n3el) && isOnScreen(n4el)) {
        const n3 = getCenter(n3el, canvas);
        const n4 = getCenter(n4el, canvas);
        const cx = Math.min(n4.left, n3.left) - 80;
        const n4ExitY = n4.top + n4.h * 0.65;
        const n3ArriveY = n3.top + n3.h * 0.65;
        tryDraw(
          'n4-loop',
          `M ${n4.left} ${n4ExitY} C ${cx} ${n4ExitY} ${cx} ${n3ArriveY} ${n3.left} ${n3ArriveY}`,
          '#C2714F',
          'arrow-loop',
          '0.75'
        );
      }

      // n4 → n5
      if (n4el && n5el && isOnScreen(n4el) && isOnScreen(n5el)) {
        const n4 = getCenter(n4el, canvas);
        const n5 = getCenter(n5el, canvas);
        const n4ExitY = n4.top + n4.h * 0.3;
        tryDraw(
          'n4-n5',
          `M ${n4.left} ${n4ExitY} C ${n4.left - 60} ${n4ExitY} ${n5.x} ${n5.top - 80} ${n5.x} ${n5.top - 14}`,
          '#4A5E42',
          'arrow'
        );
      }
    }

    initSvg();
    const timer = setTimeout(checkArrows, 200);

    const handleScroll = () => checkArrows();
    const handleResize = () => {
      animatedArrows.current.clear();
      // Remove all paths (keep defs)
      const paths = svg?.querySelectorAll('path');
      paths?.forEach((p) => p.remove());
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
  }, []); // empty deps — refs are stable
}
