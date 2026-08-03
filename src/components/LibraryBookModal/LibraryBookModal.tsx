import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { LibraryBook } from "../../types/library";
import css from "./LibraryBookModal.module.css";

interface LibraryBookModalProps {
  book: LibraryBook | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function LibraryBookModal({
  book,
  onClose,
}: LibraryBookModalProps) {
  return (
    <Modal isOpen={!!book} onClose={onClose}>
      {book && (
        <div className={css.content}>
          <img
            className={css.image}
            src={book.coverUrl ?? "/placeholder-book.png"}
            alt={`Cover of ${book.title}`}
          />

          <h2 className={css.title}>{book.title}</h2>

          <p className={css.author}>{book.author}</p>

          <p className={css.pages}>{book.totalPages} pages</p>

          <Link className={css.readButton} to={`/reading/${book.id}`}>
            Start reading
          </Link>
        </div>
      )}
    </Modal>
  );
}
