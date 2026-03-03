import { Nav } from './components/Nav';
import { SpeakingPage } from './components/SpeakingPage';
import styles from './App.module.css';

function SpeakingApp() {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Nav activePage="speaking" />
      <SpeakingPage />
    </>
  );
}

export default SpeakingApp;
