import css from "./RecommendedBookCard.module.css";
import { RecommendedBook } from "../../types/books";

interface RecommendedBookCardProps {
  book: RecommendedBook;
  onClick: () => void;
  compact?: boolean;
}

export default function RecommendedBookCard({
  book,
  onClick,
  compact = false,
}: RecommendedBookCardProps) {
  return (
    <button
      type="button"
      className={`${css.card} ${compact ? css.compact : css.full}`}
      onClick={onClick}
      aria-label={`Open ${book.title}`}
    >
      <img
        className={css.cover}
        src={book.coverUrl ?? "/placeholder-book.png"}
        alt={`Cover of ${book.title}`}
      />

      <h3 className={css.bookTitle}>{book.title}</h3>

      <p className={css.bookAuthor}>{book.author}</p>
    </button>
  );
}
