import { useState } from "react";
import { FlowCanvas } from "../FlowCanvas";
import styles from "./FlowSection.module.css";

const EMAIL = "cgfeletar@gmail.com";
const PHONE = "707-529-8295";

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
    <section
      id="flow"
      className={styles.flowSection}
      aria-labelledby="flow-heading"
    >
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

      <section id="contact" className={styles.contactSection} aria-label="Contact">
        <div className={styles.contactInner}>
          <p className={styles.contactHeading}>Get in touch.</p>
          <div role="status" aria-live="polite" className={styles.srOnly}>
            {copied ? "Email address copied to clipboard." : ""}
          </div>
          <dl className={styles.contactList}>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>LinkedIn</dt>
              <dd className={styles.contactValueWrap}>
                <a
                  href="https://linkedin.com/in/caitlynfeletar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactValue}
                >
                  linkedin.com/in/caitlynfeletar
                </a>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Email</dt>
              <dd className={styles.contactValueWrap}>
                <button
                  type="button"
                  className={styles.contactValueBtn}
                  onClick={handleCopyEmail}
                  aria-label={`Copy email address ${EMAIL}`}
                >
                  {EMAIL}
                  <span className={styles.copyHint} aria-hidden="true">
                    {copied ? "copied!" : "click to copy"}
                  </span>
                </button>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Phone</dt>
              <dd className={styles.contactValueWrap}>
                <button
                  type="button"
                  className={styles.contactValueBtn}
                  onClick={() => setPhoneRevealed(true)}
                  aria-label={
                    phoneRevealed
                      ? `Phone number: ${PHONE}`
                      : "Tap to reveal phone number"
                  }
                >
                  {phoneRevealed ? PHONE : "Tap to reveal"}
                </button>
              </dd>
            </div>
            <div className={styles.contactRow}>
              <dt className={styles.contactLabel}>Resume</dt>
              <dd className={styles.contactValueWrap}>
                <a
                  href="#"
                  className={styles.contactValue}
                  aria-label="Download Caitlyn Feletar's resume"
                >
                  Download PDF
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </section>
  );
}
