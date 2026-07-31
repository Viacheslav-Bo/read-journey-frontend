import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getBooks } from "../api/books/books";
import { RecommendedBook } from "../types/books";

interface Filters {
  title: string;
  author: string;
}

export const useBooks = (page: number, filters: Filters) => {
  const [books, setBooks] = useState<RecommendedBook[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks({
          page,
          limit: 20,
          title: filters.title || undefined,
          author: filters.author || undefined,
        });
        setBooks(response.books);
        setTotalPages(response.totalPages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to load books");
        } else {
          toast.error("Something went wrong");
        }
      }
    };

    fetchBooks();
  }, [page, filters]);

  return { books, totalPages };
};
