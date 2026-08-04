import css from "./Statistics.module.css";
import { ReadingSession } from "../../../types/reading";

interface StatisticsProps {
  progressPercent: number;
  totalPages: number;
  sessions: ReadingSession[];
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

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
  const offset = CIRCUMFERENCE - (progressPercent / 100) * CIRCUMFERENCE;

  return (
    <>
      <p className={css.description}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={css.wrapper}>
        <svg
          className={css.ring}
          width="116"
          height="116"
          viewBox="0 0 116 116"
        >
          <circle
            cx="58"
            cy="58"
            r={RADIUS}
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth="12"
          />
          <circle
            cx="58"
            cy="58"
            r={RADIUS}
            fill="none"
            stroke="var(--color-green)"
            strokeWidth="12"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 58 58)"
          />
          <text
            x="58"
            y="58"
            textAnchor="middle"
            dominantBaseline="central"
            className={css.ringText}
          >
            {progressPercent}%
          </text>
        </svg>

        <div className={css.legend}>
          <span className={css.legendDot} />

          <div className={css.legendText}>
            <span className={css.legendPercent}>{percent}%</span>

            <span className={css.legendPages}>{pagesRead} pages read</span>
          </div>
        </div>
      </div>
    </>
  );
}
