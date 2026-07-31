import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useReadingBook } from "../hooks/useReadingBook";
import {
  startReading,
  stopReading,
  deleteSession,
} from "../api/reading/reading";

export default function ReadingPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const {
    book,
    sessions,
    hasOpenSession,
    progressPercent,
    averageSpeed,
    refetch,
  } = useReadingBook(bookId);
  const [endPage, setEndPage] = useState("");

  const handleStart = async () => {
    if (!bookId) return;
    try {
      await startReading(bookId);
      toast.success("Reading started");
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to start reading");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleStop = async () => {
    if (!bookId) return;
    const pages = Number(endPage);
    if (!endPage.trim() || Number.isNaN(pages) || pages <= 0) {
      toast.error("Enter a valid page number");
      return;
    }
    try {
      await stopReading({ libraryBookId: bookId, endPage: pages });
      toast.success("Reading stopped");
      setEndPage("");
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to stop reading");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!bookId) return;
    const confirmed = window.confirm("Delete this diary entry?");
    if (!confirmed) return;
    try {
      await deleteSession({ libraryBookId: bookId, sessionId });
      toast.success("Entry deleted");
      refetch();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete entry");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <img
        src={book.coverUrl ?? "/placeholder-book.png"}
        alt={`Cover of ${book.title}`}
      />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>
        Current page: {book.currentPage} / {book.totalPages}
      </p>

      {hasOpenSession ?
        <div>
          <input
            type="number"
            min="1"
            placeholder="Page you stopped at"
            value={endPage}
            onChange={(e) => setEndPage(e.target.value)}
          />
          <button onClick={handleStop}>To stop</button>
        </div>
      : <button onClick={handleStart}>To start</button>}

      <h3>Statistics</h3>
      <p>Progress: {progressPercent}%</p>
      {averageSpeed !== null && <p>Average speed: {averageSpeed} pages/min</p>}

      <h3>Diary</h3>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.startPage} → {session.endPage ?? "…"} pages (
            {new Date(session.startedAt).toLocaleDateString()})
            <button onClick={() => handleDeleteSession(session.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
