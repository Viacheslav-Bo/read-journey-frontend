import css from "./MyBookCard.module.css";
import { LibraryBook } from "../../types/library";

interface MyBookCardProps {
  book: LibraryBook;
  isReading: boolean;
  onRecordClick?: () => void;
  timeLeftLabel?: string;
}

export default function MyBookCard({
  book,
  isReading,
  onRecordClick,
  timeLeftLabel,
}: MyBookCardProps) {
  return (
    <div className={css.panel}>
      <div className={css.header}>
        <h2 className={css.title}>My reading</h2>
        {timeLeftLabel && <span className={css.timeLeft}>{timeLeftLabel}</span>}
      </div>

      <div className={css.card}>
        <img
          className={css.cover}
          src={book.coverUrl ?? "/placeholder-book.png"}
          alt={`Cover of ${book.title}`}
        />

        <p className={css.bookTitle}>{book.title}</p>
        <p className={css.bookAuthor}>{book.author}</p>

        <button
          type="button"
          className={css.recordButton}
          onClick={onRecordClick}
          aria-label={isReading ? "Stop reading" : "Start reading"}
        >
          {isReading ?
            <svg className={css.stopIcon} viewBox="0 0 15 15">
              <rect x="0" y="0" width="15" height="15" rx="2" fill="#E90516" />
            </svg>
          : <svg className={css.recordIcon} viewBox="0 0 30 30">
              <circle cx="15" cy="15" r="15" fill="#E90516" />
            </svg>
          }
        </button>
      </div>
    </div>
  );
}
