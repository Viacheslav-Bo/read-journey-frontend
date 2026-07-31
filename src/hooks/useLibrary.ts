import axios from "axios";
import { toast } from "react-toastify";
import { getLibrary } from "../api/library/library";
import { LibraryBook } from "../types/library";
import { ReadingStatus } from "../types/status";
import { useCallback, useEffect, useState } from "react";

export const useLibrary = (status?: ReadingStatus) => {
  const [books, setBooks] = useState<LibraryBook[]>([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await getLibrary(status);
      setBooks(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to load books");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [status]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const removeBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  return {
    books,
    refetch: fetchBooks,
    removeBook,
  };
};
