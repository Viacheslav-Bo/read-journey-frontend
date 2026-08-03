import css from "./Statistics.module.css";
import { ReadingSession } from "../../../types/reading";

interface StatisticsProps {
  progressPercent: number;
  totalPages: number;
  sessions: ReadingSession[];
}

export default function Statistics({
  progressPercent,
  totalPages,
  sessions,
}: StatisticsProps) {
  const pagesRead = Math.min(
    totalPages,
    sessions
      .filter((s) => s.endPage !== null)
      .reduce((sum, s) => sum + (s.endPage! - s.startPage + 1), 0),
  );

  const percent = Math.round((pagesRead / totalPages) * 100);

  return (
    <div className={css.wrapper}>
      <div
        className={css.ring}
        style={{ "--progress": progressPercent } as React.CSSProperties}
      >
        <div className={css.ringInner}>{progressPercent}%</div>
      </div>

      <div className={css.legend}>
        <span className={css.legendDot} />

        <div className={css.legendText}>
          <span className={css.legendPercent}>{percent}%</span>

          <span className={css.legendPages}>{pagesRead} pages read</span>
        </div>
      </div>
    </div>
  );
}
