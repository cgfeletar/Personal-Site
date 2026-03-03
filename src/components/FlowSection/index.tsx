import { useState } from 'react';
import { Button } from "../Button";
import { FlowCanvas } from "../FlowCanvas";
import styles from "./FlowSection.module.css";

const EMAIL = 'cgfeletar@gmail.com';
const PHONE = '707-529-8295';

export function FlowSection() {
  const [copied, setCopied] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section id="flow" className={styles.flowSection} aria-labelledby="flow-heading">
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
            <div role="status" aria-live="polite" className={styles.srOnly}>
              {copied ? 'Email address copied to clipboard.' : ''}
            </div>
            <div className={styles.contactRow}>
              <button
                type="button"
                className={styles.contactItem}
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${EMAIL}`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span>{EMAIL}</span>
                <span className={styles.copyHint} aria-hidden="true">{copied ? 'copied!' : 'click to copy'}</span>
              </button>

              <span className={styles.contactDivider} aria-hidden="true">·</span>

              <button
                type="button"
                className={styles.contactItem}
                onClick={() => setPhoneRevealed(true)}
                aria-label={phoneRevealed ? `Phone number: ${PHONE}` : 'Tap to reveal phone number'}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                <span>{phoneRevealed ? PHONE : 'Tap to reveal number'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
