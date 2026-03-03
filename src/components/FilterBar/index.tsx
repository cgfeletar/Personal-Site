import type { MediaType } from "../../types";
import styles from "./FilterBar.module.css";

type Filter = "all" | MediaType;

interface Props {
  active: Filter;
  onFilter: (f: Filter) => void;
}

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "podcast", label: "Podcasts" },
  { id: "youtube", label: "YouTube" },
];

export function FilterBar({ active, onFilter }: Props) {
  return (
    <div className={styles.bar} role="group" aria-label="Filter media by type">
      {FILTERS.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.btn} ${active === id ? styles.btnActive : ""}`}
          onClick={() => onFilter(id)}
          aria-pressed={active === id}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
