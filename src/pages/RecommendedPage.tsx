import { useBooks } from "../hooks/useBooks";
import BookFilters from "../components/BookFilters";
import { addBook } from "../api/library/library";
import { useState } from "react";
import { toast } from "react-toastify";
import BookCard from "../components/BookCard";
import { Pagination } from "../components/Pagination";
import Modal from "../components/Modal";
import { RecommendedBook } from "../types/books";
import axios from "axios";

export default function RecommendedPage() {
  const [page, setPage] = useState(1);

  const [manualPages, setManualPages] = useState("");
  const [filters, setFilters] = useState({ title: "", author: "" });
  const { books, totalPages } = useBooks(page, filters);
  const [selectedBook, setSelectedBook] = useState<RecommendedBook | null>(
    null,
  );

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
    <>
      <BookFilters
        onApply={(filters) => {
          setFilters(filters);
          setPage(1);
        }}
      />

      {books.map((book) => (
        <BookCard
          key={book.openLibraryId}
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl ?? "/placeholder-book.png"}
          onClick={() => handleSelectBook(book)}
        />
      ))}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal isOpen={selectedBook !== null} onClose={handleCloseModal}>
        {selectedBook && (
          <div>
            <img
              src={selectedBook.coverUrl ?? "/placeholder-book.png"}
              alt={`Cover of ${selectedBook.title}`}
            />
            <h2>{selectedBook.title}</h2>
            <p>{selectedBook.author}</p>
            <input
              type="number"
              min="1"
              placeholder="Enter number of pages"
              value={manualPages}
              onChange={(e) => setManualPages(e.target.value)}
            />
            <button onClick={handleAddToLibrary}>Add to library</button>
          </div>
        )}
      </Modal>
    </>
  );
}
