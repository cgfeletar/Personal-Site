import styles from './SpeakingHero.module.css';

export function SpeakingHero() {
  return (
    <>
      <div className={styles.hero}>
        <span className={styles.eyebrow}>Speaking & Media</span>
        <h1 className={styles.title}>
          I like to <span className={styles.accent}>talk.</span>
        </h1>
        <p className={styles.desc}>
          I made the career change from sales to software via a coding bootcamp — and it turned out
          to be a pretty complicated path to navigate. Once I got in, I decided to share everything
          I'd learned along the way to help other career changers do it faster and smarter.
        </p>
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </>
  );
}
