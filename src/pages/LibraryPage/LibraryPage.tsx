import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import css from "./LibraryPage.module.css";
import { useLibrary } from "../../hooks/useLibrary";
import { addBook, deleteBook } from "../../api/library/library";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import BookAddedModal from "../../components/BookAddedModal/BookAddedModal";
import RecommendedBooksPreview from "../../components/RecommendedBooksPreview/RecommendedBooksPreview";
import BookCard from "../../components/BookCard/BookCard";

import { ReadingStatus } from "../../types/status";
import { LibraryBook } from "../../types/library";

import StatusSelect from "../../components/StatusSelect/StatusSelect";
import LibraryBookModal from "../../components/LibraryBookModal/LibraryBookModal";

export default function LibraryPage() {
  const [status, setStatus] = useState<ReadingStatus | undefined>(undefined);
  const { books, removeBook, refetch } = useLibrary(status);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);

  const handleAdd = async (values: {
    title: string;
    author: string;
    totalPages: number;
  }) => {
    try {
      await addBook(values);
      setShowAddedModal(true);
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add book");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Remove this book from your library?");
    if (!confirmed) return;
    try {
      await deleteBook(id);
      toast.success("Book removed");
      removeBook(id);
      setSelectedBook(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to remove book");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main className="container">
      <div className={css.pageWrapper}>
        <div className={css.topWrapper}>
          <AddBookForm onAdd={handleAdd} />
          <RecommendedBooksPreview />
        </div>

        <div className={css.myLibraryPanel}>
          <div className={css.header}>
            <h2 className={css.title}>My library</h2>
            <StatusSelect value={status} onChange={setStatus} />
          </div>

          {books.length === 0 ?
            <div className={css.emptyState}>
              <div className={css.emptyIcon}>📚</div>
              <p className={css.emptyText}>
                To start training, add <strong>some of your books</strong> or
                from the recommended ones
              </p>
            </div>
          : <div className={css.bookGrid}>
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl ?? "/placeholder-book.png"}
                  onClick={() => setSelectedBook(book)}
                >
                  <button
                    type="button"
                    className={css.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(book.id);
                    }}
                    aria-label="Delete book"
                  >
                    <svg width="14" height="14">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </BookCard>
              ))}
            </div>
          }
        </div>

        <BookAddedModal
          isOpen={showAddedModal}
          onClose={() => setShowAddedModal(false)}
        />

        <LibraryBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}
