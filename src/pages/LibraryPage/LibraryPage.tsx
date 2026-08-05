import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import css from "./LibraryPage.module.css";
import { useLibrary } from "../../hooks/useLibrary";
import { addBook, deleteBook } from "../../api/library/library";
import AddBookForm from "../../components/AddBookForm/AddBookForm";
import BookAddedModal from "../../components/BookAddedModal/BookAddedModal";
import RecommendedBooksPreview from "../../components/RecommendedBooksPreview/RecommendedBooksPreview";
import BookCard from "../../components/BookCard/BookCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { ReadingStatus } from "../../types/status";
import { LibraryBook } from "../../types/library";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import LibraryBookModal from "../../components/LibraryBookModal/LibraryBookModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import BookCardSkeleton from "../../components/BookCard/BookCardSkeleton";

const PAGE_SIZE =
  window.innerWidth >= 1440 ? 10
  : window.innerWidth >= 768 ? 8
  : 8;

export default function LibraryPage() {
  const [status, setStatus] = useState<ReadingStatus | undefined>(undefined);
  const { books, removeBook, refetch, isLoading } = useLibrary(status);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(books.length / PAGE_SIZE));
  const paginatedBooks = books.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [status]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

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
    try {
      await deleteBook(id);
      toast.success("Book removed");
      removeBook(id);
      setSelectedBook(null);
      setBookToDelete(null);
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
          <RecommendedBooksPreview onBookAdded={refetch} />
        </div>

        <div className={css.myLibraryPanel}>
          <div className={css.header}>
            <h2 className={css.title}>My library</h2>
            {totalPages > 1 && (
              <div className={css.paginationDesktop}>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
            <StatusSelect value={status} onChange={setStatus} />
          </div>

          {isLoading ?
            <div className={css.bookGrid}>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))}
            </div>
          : books.length === 0 ?
            <div className={css.emptyState}>
              <div className={css.emptyIcon}>📚</div>
              <p className={css.emptyText}>
                To start training, add <strong>some of your books</strong> or
                from the recommended ones
              </p>
            </div>
          : <>
              <div className={css.bookGrid}>
                {paginatedBooks.map((book) => (
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
                        setBookToDelete(book.id);
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

              {totalPages > 1 && (
                <div className={css.paginationMobile}>
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
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

        <ConfirmModal
          isOpen={!!bookToDelete}
          title="Remove this book?"
          text="Are you sure you want to remove this book from your library?"
          onConfirm={() => bookToDelete && handleDelete(bookToDelete)}
          onClose={() => setBookToDelete(null)}
        />
      </div>
    </main>
  );
}
