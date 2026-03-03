import { useState } from 'react';
import { Button } from '../Button';
import styles from './PageCta.module.css';

const EMAIL = 'caitlyn@feletar.com';

export function PageCta() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text — not needed in modern browsers
    }
  };

  return (
    <section className={styles.cta} aria-labelledby="cta-heading">
      <p className={styles.heading} id="cta-heading">
        Let's build <em>cool stuff</em> together.
      </p>
      <div className={styles.links}>
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
          <a href="#">Download Resume</a>
        </Button>
      </div>
      {/* Visually-hidden live region announces copy confirmation to screen readers.
          Changing aria-label on a focused button is not reliably announced by all ATs. */}
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
      </div>
    </section>
  );
}
