import { useState } from 'react';
import styles from './Nav.module.css';

const EMAIL = 'cgfeletar@gmail.com';

interface Props {
  activePage?: 'home' | 'speaking';
}

export function Nav({ activePage = 'home' }: Props) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {}
  };

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {/*
        Logo link navigates to / (same destination as "How I Work").
        aria-label "Home" distinguishes it from the "How I Work" text link so
        screen reader users don't hear two identical links in the nav list.
        aria-current="page" matches the pattern used on the nav links.
      */}
      <a
        href="/"
        className={styles.navLogo}
        aria-label="Caitlyn Feletar — Home"
        aria-current={activePage === 'home' ? 'page' : undefined}
      >
        Caitlyn Feletar
      </a>
      <div className={styles.navRight}>
        <div className={styles.navLinks}>
          <a
            href="/#flow"
            className={`${styles.navLink} ${activePage === 'home' ? styles.navLinkActive : ''}`}
            aria-current={activePage === 'home' ? 'page' : undefined}
          >
            How I Work
          </a>
          <a
            href="/speaking"
            className={`${styles.navLink} ${activePage === 'speaking' ? styles.navLinkActive : ''}`}
            aria-current={activePage === 'speaking' ? 'page' : undefined}
          >
            Speaking & Media
          </a>
        </div>
        <div className={styles.iconLinks}>
          <a
            href="https://linkedin.com/in/caitlynfeletar"
            className={styles.iconBtn}
            aria-label="Visit LinkedIn profile (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <div className={styles.iconBtnWrap}>
            {/* Visually-hidden live region for screen reader copy confirmation */}
            <div role="status" aria-live="polite" className={styles.srOnly}>
              {emailCopied ? 'Email address copied to clipboard.' : ''}
            </div>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleCopyEmail}
              aria-label={`Copy email address ${EMAIL}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.886.705-1.594 1.591-1.636h.045L12 11.182l10.364-7.361h.045c.886.042 1.591.75 1.591 1.636z" />
              </svg>
            </button>
            {emailCopied && (
              <span className={styles.copiedToast} aria-hidden="true">Copied!</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
