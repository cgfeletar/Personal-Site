import { useState } from 'react';
import type { FlowNode } from '../../types';
import { Badge } from '../Badge';
import styles from './FlipCard.module.css';

interface Props {
  node: FlowNode;
}

// Title color cycling: nodeNum % 3 === 1 → titleColor1, nodeNum % 3 === 2 → titleColor2, nodeNum % 3 === 0 → titleColor3
// node 10 (isSpecial) → ivory title
function getTitleColorClass(nodeNum: number, isSpecial?: boolean): string {
  if (isSpecial) return styles.titleSpecial;
  const cycle = nodeNum % 3;
  if (cycle === 1) return styles.titleColor1;
  if (cycle === 2) return styles.titleColor2;
  return styles.titleColor3;
}

// Nodes 6 and 7 have <strong> tags in backText — use dangerouslySetInnerHTML
const HTML_BACK_TEXT_NODES = new Set([6, 7]);

export function FlipCard({ node }: Props) {
  const { nodeNum, title, desc, badges, loopBadge, shipIcon, backEyebrow, backText, isSpecial } = node;
  const titleColorClass = getTitleColorClass(nodeNum, isSpecial);

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (e.key === ' ') e.preventDefault(); // prevent page scroll on space
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div
      className={`${styles.node} ${isSpecial ? styles.nodeSpecial : ''} ${(nodeNum === 2 || nodeNum === 6) ? styles.nodeMedium : ''} ${isFlipped ? styles.flipped : ''}`}
      id={node.id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title} — click or press Enter to see a real-world example`}
      aria-pressed={isFlipped}
    >
      <div className={styles.nodeInner}>
        {/* Front face */}
        <div className={`${styles.nodeFront} ${isSpecial ? styles.nodeSpecialFront : ''}`}>
          {shipIcon && <div className={styles.shipIcon}>🚀</div>}

          <div className={`${styles.nodeTitle} ${titleColorClass}`}>{title}</div>
          <div className={`${styles.nodeDesc} ${isSpecial ? styles.nodeDescSpecial : ''}`}>{desc}</div>

          {loopBadge && (
            <span className={styles.loopBadge}>{loopBadge}</span>
          )}

          {badges && badges.length > 0 && (
            <div className={styles.nodeBadges}>
              {badges.map((badge) => (
                <Badge
                  key={badge.label}
                  label={badge.label}
                  variant={isSpecial ? 'ivory' : badge.variant}
                />
              ))}
            </div>
          )}
        </div>

        {/* Back face */}
        <div className={`${styles.nodeBack} ${isSpecial ? styles.nodeSpecialBack : ''}`}>
          <div className={`${styles.nodeBackEyebrow} ${isSpecial ? styles.nodeBackEyebrowSpecial : ''}`}>
            {backEyebrow}
          </div>
          {HTML_BACK_TEXT_NODES.has(nodeNum) ? (
            <div
              className={`${styles.nodeBackText} ${isSpecial ? styles.nodeBackTextSpecial : ''}`}
              dangerouslySetInnerHTML={{ __html: backText }}
            />
          ) : (
            <div className={`${styles.nodeBackText} ${isSpecial ? styles.nodeBackTextSpecial : ''}`}>
              {backText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
