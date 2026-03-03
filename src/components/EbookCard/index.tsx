import frameworksImg from '../../assets/frameworks.png';
import frontendtechImg from '../../assets/frontendtech.png';
import styles from './EbookCard.module.css';

export function EbookCard() {
  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <div className={styles.screenshots} aria-hidden="true">
          <div className={`${styles.screenshot} ${styles.screenshot1}`}>
            <img src={frameworksImg} alt="" className={styles.screenshotImg} />
          </div>
          <div className={`${styles.screenshot} ${styles.screenshot2}`}>
            <img src={frontendtechImg} alt="" className={styles.screenshotImg} />
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Published Ebook · 2022</span>
          <h2 className={styles.title}>The Bootcamper's Companion</h2>
          <p className={styles.desc}>
            Coding bootcamps teach you to code — but they don't always teach you how to actually
            get hired. This guide fills in the gaps: how to navigate the job search, stand out as
            a career changer, and use your bootcamp to its fullest potential.
          </p>
          <div className={styles.stat}>
            <span className={styles.statNum}>300+</span>
            <span className={styles.statLabel}>copies sold</span>
          </div>
          <p className={styles.oop}>
            Currently out of print — but if you're curious, feel free to reach out and I'll send
            you a copy.
          </p>
          <a
            href="mailto:caitlyn@feletar.com?subject=Bootcamper%27s%20Companion%20Request"
            className={styles.btn}
          >
            Request a copy <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
