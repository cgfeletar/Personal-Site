import { mediaItems } from "../../data/mediaItems";
import { EbookCard } from "../EbookCard";
import { MediaCard } from "../MediaCard";
import { PageCta } from "../PageCta";
import { SpeakingHero } from "../SpeakingHero";
import styles from "./SpeakingPage.module.css";

export function SpeakingPage() {
  return (
    <main id="main-content">
      <SpeakingHero />
      <EbookCard />
      <section className={styles.mediaGrid} aria-label="Media appearances">
        {mediaItems.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </section>
      <PageCta />
    </main>
  );
}
