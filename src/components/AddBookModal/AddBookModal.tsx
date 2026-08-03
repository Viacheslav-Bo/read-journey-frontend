import css from "./AddBookModal.module.css";
import Modal from "../Modal/Modal";
import { RecommendedBook } from "../../types/books";

interface AddBookModalProps {
  book: RecommendedBook | null;
  manualPages: string;
  onPagesChange: (value: string) => void;
  onAdd: () => void;
  onClose: () => void;
}

export default function AddBookModal({
  book,
  manualPages,
  onPagesChange,
  onAdd,
  onClose,
}: AddBookModalProps) {
  return (
    <Modal isOpen={!!book} onClose={onClose}>
      {book && (
        <div className={css.modalContent}>
          <img
            className={css.modalImage}
            src={book.coverUrl ?? "/placeholder-book.png"}
            alt={`Cover of ${book.title}`}
          />

          <h2 className={css.modalTitle}>{book.title}</h2>

          <p className={css.modalAuthor}>{book.author}</p>

          <input
            className={css.modalInput}
            type="number"
            min="1"
            placeholder="Enter number of pages"
            value={manualPages}
            onChange={(e) => onPagesChange(e.target.value)}
          />

          <button className={css.modalButton} onClick={onAdd}>
            Add to library
          </button>
        </div>
      )}
    </Modal>
  );
}
