import { Button } from '../Button';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <>
      <main id="main-content" className={styles.hero}>
        <h1 className={styles.heroTitle}>
          <span className={styles.underlineTc}>Product</span>
          <br />
          thinking meets
          <br />
          <span className={styles.accent}>engineering</span> execution.
        </h1>

        <div className={styles.heroRight}>
          <p className={styles.heroDesc}>
            I'm a <strong>frontend engineer</strong> and{' '}
            <strong>product owner</strong> who owns the full journey — from user
            discovery to shipped code. I use AI and{' '}
            <strong>multi-agent workflows</strong> to explore ideas faster,
            automate complex work, and accelerate product development. My
            background in psychology and sales shapes how I understand users,
            communicate across teams, and turn complex needs into products people
            love using.
          </p>
          <div className={styles.heroActions}>
            <Button variant="outline" asChild>
              <a href="#">Download Resume</a>
            </Button>
          </div>
        </div>
      </main>

      <div className={styles.divider} aria-hidden="true"></div>
    </>
  );
}
