import { FlowCanvas } from "../FlowCanvas";
import { PageCta } from "../PageCta";
import styles from "./FlowSection.module.css";

export function FlowSection() {
  return (
    <section
      id="flow"
      className={styles.flowSection}
      aria-labelledby="flow-heading"
    >
      <div className={styles.flowHeader}>
        <h2 id="flow-heading" className={styles.flowTitle}>
          <em>End-to-end</em> execution.
        </h2>
        <p className={styles.flowSubtitle}>
          From the first conversation to the moment it ships — I own the whole
          journey.
        </p>
      </div>

      <FlowCanvas />

      <PageCta />
    </section>
  );
}
