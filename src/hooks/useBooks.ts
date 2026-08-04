import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getBooks } from "../api/books/books";
import { RecommendedBook } from "../types/books";
import { FALLBACK_BOOKS } from "../constants/fallbackBooks";

interface Filters {
  title: string;
  author: string;
}

export const useBooks = (page: number, filters: Filters, limit: number) => {
  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);

      const fallbackBooks = FALLBACK_BOOKS.slice(0, limit);

      try {
        const response = await getBooks({
          page,
          limit,
          title: filters.title || undefined,
          author: filters.author || undefined,
        });
        setBooks(response.books.length > 0 ? response.books : fallbackBooks);
        setTotalPages(response.totalPages);
      } catch (error) {
        setBooks(fallbackBooks);
        setTotalPages(1);

        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to load books");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [page, limit, filters]);

  return { books, totalPages, isLoading };
};
