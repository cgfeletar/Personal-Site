import { useRef } from "react";
import { flowNodes } from "../../data/flowNodes";
import { useFlowArrows } from "../../hooks/useFlowArrows";
import { FlipCard } from "../FlipCard";
import styles from "./FlowCanvas.module.css";

type NodeRefs = Record<string, HTMLDivElement | null>;

export function FlowCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefsRef = useRef<NodeRefs>({});

  useFlowArrows(svgRef, canvasRef, nodeRefsRef);

  return (
    <div className={styles.flowCanvas} ref={canvasRef}>
      <svg className={styles.flowSvg} ref={svgRef} />

      <div className={styles.hoverHint} aria-hidden="true">
        <span className={styles.hoverHintDesktop}>
          hover any card to see a real example
        </span>
        <span className={styles.hoverHintMobile}>
          tap any card to see a real example
        </span>
      </div>

      {flowNodes.map((node) => (
        <div
          key={node.id}
          className={`${styles.nodeWrap} ${styles[node.position]}`}
        >
          <div
            ref={(el) => {
              nodeRefsRef.current[node.id] = el;
            }}
          >
            <FlipCard node={node} />
          </div>
        </div>
      ))}
    </div>
  );
}
