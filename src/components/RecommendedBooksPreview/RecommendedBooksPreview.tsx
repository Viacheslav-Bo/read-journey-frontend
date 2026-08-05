import { Link } from "react-router-dom";
import css from "./RecommendedBooksPreview.module.css";
import { useBooks } from "../../hooks/useBooks";
import { useState } from "react";
import { addBook } from "../../api/library/library";
import RecommendedBookCard from "../RecommendedBookCard/RecommendedBookCard";
import AddBookModal from "../AddBookModal/AddBookModal";
import { RecommendedBook } from "../../types/books";
import axios from "axios";
import { toast } from "react-toastify";
import BookAddedModal from "../BookAddedModal/BookAddedModal";

const EMPTY_FILTERS = { title: "", author: "" };

interface RecommendedBooksPreviewProps {
  onBookAdded: () => Promise<void>;
}

export default function RecommendedBooksPreview({
  onBookAdded,
}: RecommendedBooksPreviewProps) {
  const { books, isLoading } = useBooks(1, EMPTY_FILTERS, 3);
  const [showAddedModal, setShowAddedModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(
    null,
  );
  const [manualPages, setManualPages] = useState("");

  const handleSelectBook = (book: RecommendedBook) => {
    setSelectedBook(book);
    setManualPages(book.totalPages !== null ? String(book.totalPages) : "");
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setManualPages("");
  };

  const handleAddToLibrary = async () => {
    if (!selectedBook) return;

    if (!manualPages.trim()) {
      toast.error("Please enter the number of pages");
      return;
    }

    const pages = Number(manualPages);

    if (Number.isNaN(pages) || pages <= 0) {
      toast.error("Invalid number of pages");
      return;
    }

    try {
      await addBook({
        title: selectedBook.title,
        author: selectedBook.author,
        totalPages: pages,
        coverUrl: selectedBook.coverUrl ?? undefined,
        openLibraryId: selectedBook.openLibraryId ?? undefined,
      });
      await onBookAdded();
      handleCloseModal();
      setShowAddedModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add book");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className={css.panel}>
        <h2 className={css.title}>Recommended books</h2>
        <div className={css.grid}>
          {isLoading ?
            Array.from({ length: 3 }).map((_, i) => (
              <div className={css.card} key={i}>
                <div className={`${css.cover} ${css.skeleton}`} />
                <div className={`${css.skeletonLine} ${css.skeleton}`} />
                <div className={`${css.skeletonLine} ${css.skeleton}`} />
              </div>
            ))
          : books.map((book) => (
              <RecommendedBookCard
                compact
                book={book}
                onClick={() => handleSelectBook(book)}
              />
            ))
          }
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
      <AddBookModal
        book={selectedBook}
        manualPages={manualPages}
        onPagesChange={setManualPages}
        onAdd={handleAddToLibrary}
        onClose={handleCloseModal}
      />

      <BookAddedModal
        isOpen={showAddedModal}
        onClose={() => setShowAddedModal(false)}
      />
    </>
  );
}
