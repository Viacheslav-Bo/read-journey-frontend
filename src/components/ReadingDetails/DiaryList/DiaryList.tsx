import css from "./DiaryList.module.css";
import { ReadingSession } from "../../../types/reading";
import ReadingChart from "../ReadingChart/ReadingChart";

interface DiaryListProps {
  sessions: ReadingSession[];
  totalPages: number;
  onDelete: (sessionId: string) => void;
}

export default function DiaryList({
  sessions,
  totalPages,
  onDelete,
}: DiaryListProps) {
  const finished = sessions.filter(
    (s) => s.endPage !== null && s.finishedAt !== null,
  );

  if (finished.length === 0) {
    return <p className={css.empty}>No reading sessions yet.</p>;
  }

  return (
    <ul className={css.list}>
      {finished.map((session) => {
        const pages = session.endPage! - session.startPage + 1;
        const percent = Math.min(100, Math.round((pages / totalPages) * 100));
        const minutes = Math.max(
          1,
          Math.round(
            (new Date(session.finishedAt!).getTime() -
              new Date(session.startedAt).getTime()) /
              60000,
          ),
        );
        const pagesPerHour = Math.round((pages * 60) / minutes);

        return (
          <li key={session.id} className={css.entry}>
            <div className={css.timeline}>
              <span className={css.checkbox} />
            </div>

            <div className={css.info}>
              <time className={css.date} dateTime={session.startedAt}>
                {new Date(session.startedAt).toLocaleDateString()}
              </time>

              <div className={css.stats}>
                <span className={css.percent}>{percent}%</span>
                <span className={css.minutes}>{minutes} minutes</span>
              </div>
            </div>

            <div className={css.right}>
              <span className={css.pagesCount}>{pages} pages</span>

              <div className={css.chartBlock}>
                <ReadingChart />

                <span className={css.speed}>
                  {pagesPerHour} pages
                  <br />
                  per hour
                </span>
              </div>
            </div>
            <div className={css.deleteBtn}>
              <button
                type="button"
                className={css.deleteButton}
                onClick={() => onDelete(session.id)}
                aria-label="Delete this entry"
              >
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-diary" />
                </svg>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
