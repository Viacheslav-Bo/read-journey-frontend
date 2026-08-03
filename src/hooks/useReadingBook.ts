import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getLibraryBookById } from "../api/library/library";
import { getStats } from "../api/reading/reading";
import { LibraryBook } from "../types/library";
import { ReadingSession } from "../types/reading";

export const useReadingBook = (bookId?: string) => {
  const [book, setBook] = useState<LibraryBook | null>(null);
  const [sessions, setSessions] = useState<ReadingSession[]>([]);

  const loadData = useCallback(async () => {
    if (!bookId) return;
    try {
      const foundBook = await getLibraryBookById(bookId);
      setBook(foundBook);

      const stats = await getStats(bookId);
      setSessions(stats);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to load data");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [bookId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const hasOpenSession = sessions.some((s) => s.endPage === null);

  const progressPercent =
    book ?
      Math.min(100, Math.round((book.currentPage / book.totalPages) * 100))
    : 0;

  const averageSpeed = (() => {
    const finished = sessions.filter(
      (s) => s.endPage !== null && s.finishedAt !== null,
    );
    if (finished.length === 0) return null;

    const speeds = finished.map((s) => {
      const pages = s.endPage! - s.startPage;
      const minutes =
        (new Date(s.finishedAt!).getTime() - new Date(s.startedAt).getTime()) /
        60000;
      return minutes > 0 ? pages / minutes : 0;
    });

    const avg = speeds.reduce((sum, v) => sum + v, 0) / speeds.length;
    return Math.round(avg * 10) / 10;
  })();

  return {
    book,
    sessions,
    hasOpenSession,
    progressPercent,
    averageSpeed,
    refetch: loadData,
  };
};
