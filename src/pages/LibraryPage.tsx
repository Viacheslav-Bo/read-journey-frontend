import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useLibrary } from "../hooks/useLibrary";
import { deleteBook } from "../api/library/library";
import LibraryFilters from "../components/LibraryFilters";
import BookCard from "../components/BookCard/BookCard";
import { ReadingStatus } from "../types/status";

export default function LibraryPage() {
  const [status, setStatus] = useState<ReadingStatus | undefined>(undefined);
  const { books, removeBook } = useLibrary(status);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Remove this book from your library?");
    if (!confirmed) return;

    try {
      await deleteBook(id);
      removeBook(id);
      toast.success("Book removed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to remove book");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <LibraryFilters onFilterChange={setStatus} />

      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverUrl={book.coverUrl ?? "/placeholder-book.png"}
        >
          <Link to={`/reading/${book.id}`}>Start reading</Link>
          <button onClick={() => handleDelete(book.id)}>Remove</button>
        </BookCard>
      ))}
    </>
  );
}
