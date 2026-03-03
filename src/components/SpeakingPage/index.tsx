import { useState } from "react";
import { mediaItems } from "../../data/mediaItems";
import type { MediaType } from "../../types";
import { EbookCard } from "../EbookCard";
import { FilterBar } from "../FilterBar";
import { MediaCard } from "../MediaCard";
import { PageCta } from "../PageCta";
import { SpeakingHero } from "../SpeakingHero";
import styles from "./SpeakingPage.module.css";

type Filter = "all" | MediaType;

export function SpeakingPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.type === filter);

  return (
    <main id="main-content">
      <SpeakingHero />
      <FilterBar active={filter} onFilter={setFilter} />
      <EbookCard />
      {/*
        aria-live on the grid itself is too noisy: when the card list changes, some ATs
        re-announce every card's full link text. Instead, a compact status region announces
        the result count and the grid is a plain section.
      */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        Showing {visible.length} {visible.length === 1 ? "result" : "results"}
        {filter !== "all" ? ` for ${filter}` : ""}
      </div>
      <section className={styles.mediaGrid} aria-label="Media appearances">
        {visible.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </section>
      <PageCta />
    </main>
  );
}
