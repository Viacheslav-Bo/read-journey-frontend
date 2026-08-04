import { useBooks } from "../../hooks/useBooks";
import BookFilters from "../../components/BookFilters/BookFilters";
import { addBook } from "../../api/library/library";
import { useState } from "react";
import { toast } from "react-toastify";
import BookCard from "../../components/BookCard/BookCard";
import { Pagination } from "../../components/Pagination/Pagination";
import { RecommendedBook } from "../../types/books";
import axios from "axios";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import css from "./RecommendedPage.module.css";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import InfoCard from "../../components/InfoCard/InfoCard";
import BookCardSkeleton from "../../components/BookCard/BookCardSkeleton";

export default function RecommendedPage() {
  const [page, setPage] = useState(1);

  const [manualPages, setManualPages] = useState("");
  const [filters, setFilters] = useState({ title: "", author: "" });
  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(
    null,
  );

  const limit =
    window.innerWidth >= 1440 ? 10
    : window.innerWidth >= 768 ? 8
    : 2;

  const { books, totalPages, isLoading } = useBooks(page, filters, limit);

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
      toast.success("Book added to library");
      handleCloseModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add book");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <main className="container">
      <div className={css.layout}>
        <div className={css.sidebar}>
          <BookFilters
            onApply={(filters) => {
              setFilters(filters);
              setPage(1);
            }}
          />
          <WorkoutCard />
          <InfoCard />
        </div>

        <section className={css.recommended}>
          <div className={css.recommendedHeader}>
            <h2 className={css.title}>Recommended</h2>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          <div className={css.booksList}>
            {isLoading ?
              Array.from({ length: limit }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))
            : books.map((book) => (
                <BookCard
                  key={book.openLibraryId}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl ?? "/placeholder-book.png"}
                  onClick={() => handleSelectBook(book)}
                />
              ))
            }
          </div>
        </section>
      </div>

      <AddBookModal
        book={selectedBook}
        manualPages={manualPages}
        onPagesChange={setManualPages}
        onAdd={handleAddToLibrary}
        onClose={handleCloseModal}
      />
    </main>
  );
}
