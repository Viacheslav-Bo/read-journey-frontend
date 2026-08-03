import { Link } from "react-router-dom";
import css from "./RecommendedBooksPreview.module.css";
import { useBooks } from "../../hooks/useBooks";

const EMPTY_FILTERS = { title: "", author: "" };

export default function RecommendedBooksPreview() {
  const { books } = useBooks(1, EMPTY_FILTERS, 3);

  return (
    <div className={css.panel}>
      <h2 className={css.title}>Recommended books</h2>
      <div className={css.grid}>
        {books.map((book) => (
          <div className={css.card} key={book.openLibraryId}>
            <img
              className={css.cover}
              src={book.coverUrl ?? "/placeholder-book.png"}
              alt={`Cover of ${book.title}`}
            />
            <h3 className={css.bookTitle}>{book.title}</h3>
            <p className={css.bookAuthor}>{book.author}</p>
          </div>
        ))}
      </div>
      <div className={css.footer}>
        <Link to="/recommended" className={css.homeLink}>
          Home
        </Link>
        <Link
          to="/recommended"
          className={css.arrowLink}
          aria-label="Go to Recommended page"
        >
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-login" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
