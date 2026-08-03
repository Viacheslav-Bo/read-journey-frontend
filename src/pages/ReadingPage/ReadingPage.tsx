import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReadingProgress from "../../components/ReadingProgress/ReadingProgress";
import { useEffect, useState } from "react";
import css from "./ReadingPage.module.css";

import { useReadingBook } from "../../hooks/useReadingBook";

import {
  startReading,
  stopReading,
  deleteSession,
} from "../../api/reading/reading";

import Dashboard from "../../components/Dashboard/Dashboard";
import AddReadingForm from "../../components/AddReadingForm/AddReadingForm";
import ReadingDetails from "../../components/ReadingDetails/ReadingDetails";
import MyBookCard from "../../components/MyBookCard/MyBookCard";
import BookReadModal from "../../components/BookReadModal/BookReadModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

export default function ReadingPage() {
  const { bookId } = useParams<{ bookId: string }>();

  const { book, sessions, hasOpenSession, progressPercent, refetch } =
    useReadingBook(bookId);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [finishedShown, setFinishedShown] = useState(false);

  const lastFinishedSession = [...sessions]
    .reverse()
    .find((session) => session.endPage !== null);

  const nextStartPage = lastFinishedSession?.endPage ?? 1;

  useEffect(() => {
    if (book?.status === "FINISHED" && !finishedShown) {
      setShowFinishedModal(true);
      setFinishedShown(true);
    }
  }, [book?.status, finishedShown]);

  const handleStart = async (page: number) => {
    if (!bookId) return;

    try {
      await startReading(bookId, page);

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

  const handleStop = async (page: number) => {
    if (!bookId || !book) return;

    try {
      await stopReading({
        libraryBookId: bookId,
        endPage: page,
      });

      toast.success("Reading stopped");

      const finished = page >= book.totalPages;

      await refetch();

      if (finished) {
        setShowFinishedModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to stop reading");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDeleteSession = async () => {
    if (!bookId || !sessionToDelete) return;

    try {
      await deleteSession({
        libraryBookId: bookId,
        sessionId: sessionToDelete,
      });

      toast.success("Entry deleted");

      setSessionToDelete(null);
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
    <main className="container">
      <div className={css.pageWrapper}>
        <Dashboard>
          <AddReadingForm
            mode={hasOpenSession ? "stop" : "start"}
            initialPage={nextStartPage}
            onSubmitPage={hasOpenSession ? handleStop : handleStart}
          />
          {sessions.length === 0 ?
            <ReadingProgress />
          : <ReadingDetails
              sessions={sessions}
              totalPages={book.totalPages}
              progressPercent={progressPercent}
              onDeleteSession={(id) => setSessionToDelete(id)}
            />
          }
        </Dashboard>

        <MyBookCard book={book} isReading={hasOpenSession} />
      </div>

      <BookReadModal
        isOpen={showFinishedModal}
        onClose={() => setShowFinishedModal(false)}
      />

      <ConfirmModal
        isOpen={!!sessionToDelete}
        title="Delete diary entry?"
        text="Are you sure you want to delete this reading session?"
        onConfirm={handleDeleteSession}
        onClose={() => setSessionToDelete(null)}
      />
    </main>
  );
}
