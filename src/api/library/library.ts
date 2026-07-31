import { api } from "../client";
import { LibraryBook } from "../../types/library";
import { ReadingStatus } from "../../types/status";
import { MessageResponse } from "../../types/message";

export const getLibrary = async (
  status?: ReadingStatus,
): Promise<LibraryBook[]> => {
  const res = await api.get<LibraryBook[]>("/library", { params: { status } });
  return res.data;
};

interface AddBookParams {
  title: string;
  author: string;
  totalPages: number;
}

export const addBook = async ({
  author,
  title,
  totalPages,
}: AddBookParams): Promise<LibraryBook> => {
  const res = await api.post<LibraryBook>("/library", {
    title,
    author,
    totalPages,
  });
  return res.data;
};

export const deleteBook = async (id: string) => {
  const res = await api.delete<MessageResponse>(`/library/${id}`);
  return res.data;
};
