import { useState } from "react";
import css from "./ReadingDetails.module.css";

import DiaryList from "./DiaryList/DiaryList";
import Statistics from "./Statistics/Statistics";

import { ReadingSession } from "../../types/reading";

interface ReadingDetailsProps {
  sessions: ReadingSession[];
  totalPages: number;
  progressPercent: number;
  onDeleteSession: (sessionId: string) => void;
}

export default function ReadingDetails({
  sessions,
  totalPages,
  progressPercent,
  onDeleteSession,
}: ReadingDetailsProps) {
  const [tab, setTab] = useState<"diary" | "statistics">("diary");

  return (
    <div className={css.panel}>
      <div className={css.header}>
        <h2 className={css.title}>
          {tab === "diary" ? "Diary" : "Statistics"}
        </h2>

        <div className={css.tabs}>
          <button
            type="button"
            className={css.tabButton}
            data-active={tab === "diary"}
            onClick={() => setTab("diary")}
          >
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-hourglass" />
            </svg>
          </button>

          <button
            type="button"
            className={css.tabButton}
            data-active={tab === "statistics"}
            onClick={() => setTab("statistics")}
          >
            <svg width="16" height="16">
              <use href="/sprite.svg#icon-pie-chart" />
            </svg>
          </button>
        </div>
      </div>
      {tab === "diary" ?
        <div className={css.contentWrapper}>
          <div className={css.content}>
            <DiaryList
              sessions={sessions}
              totalPages={totalPages}
              onDelete={onDeleteSession}
            />
          </div>
        </div>
      : <Statistics
          sessions={sessions}
          progressPercent={progressPercent}
          totalPages={totalPages}
        />
      }
    </div>
  );
}
