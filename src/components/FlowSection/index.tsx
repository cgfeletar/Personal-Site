import { Button } from "../Button";
import { FlowCanvas } from "../FlowCanvas";
import styles from "./FlowSection.module.css";

export function FlowSection() {
  return (
    <section id="flow" aria-labelledby="flow-heading">
      <div className={styles.flowHeader}>
        <h2 id="flow-heading" className={styles.flowTitle}>
          End to <em>end</em> execution.
        </h2>
        <p className={styles.flowSubtitle}>
          From the first conversation to the moment it ships — I own the whole
          journey.
        </p>
      </div>

      <FlowCanvas />

      <section aria-label="Call to action">
        <div className={styles.flowCta}>
          <div className={styles.flowCtaInner}>
            <p className={styles.flowCtaText}>
              Let's build <em>cool stuff</em> together.
            </p>
            <div className={styles.ctaLinks}>
              <Button variant="main" asChild>
                <a
                  href="https://linkedin.com/in/caitlynfeletar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" aria-label="Download Caitlyn Feletar's resume">
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
