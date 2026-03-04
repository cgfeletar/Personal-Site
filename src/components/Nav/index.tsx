import { useState, useEffect, useRef } from "react";
import styles from "./Nav.module.css";

interface Props {
  activePage?: "home" | "speaking";
}

export function Nav({ activePage = "home" }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    closeTimer.current = setTimeout(() => setMenuVisible(false), 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  return (
    <nav
      className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
      aria-label="Main navigation"
      ref={navRef}
    >
      <a
        href="/"
        className={styles.navLogo}
        aria-label="Caitlyn Feletar — Home"
        aria-current={activePage === "home" ? "page" : undefined}
      >
        Caitlyn Feletar
      </a>
      <div className={styles.navRight}>
        <div className={styles.navLinks}>
          <a
            href="/#flow"
            className={`${styles.navLink} ${activePage === "home" ? styles.navLinkActive : ""}`}
            aria-current={activePage === "home" ? "page" : undefined}
          >
            How I Work
          </a>
          <a
            href="/speaking"
            className={`${styles.navLink} ${activePage === "speaking" ? styles.navLinkActive : ""}`}
            aria-current={activePage === "speaking" ? "page" : undefined}
          >
            Speaking & Media
          </a>
          <a href="#contact" className={styles.navLink}>
            Contact
          </a>
        </div>

        {/* Hamburger button — visible only at ≤480px */}
        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
        >
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
          <span className={styles.hamburgerBar} />
        </button>
      </div>

      {/* Mobile dropdown menu — always unmount via menuVisible, exit animation via !menuOpen */}
      {menuVisible && (
        <div
          id="mobile-nav-menu"
          className={`${styles.mobileMenu} ${!menuOpen ? styles.mobileMenuClosing : ""}`}
          role="navigation"
          aria-label="Mobile menu"
        >
          <a href="/#flow" className={styles.mobileNavLink}>
            How I Work
          </a>
          <a href="/speaking" className={styles.mobileNavLink}>
            Speaking & Media
          </a>
          <a
            href="#contact"
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
