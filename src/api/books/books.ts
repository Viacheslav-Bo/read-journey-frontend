import { api } from "../client";
import { BooksResponse } from "../../types/books";

interface GetBooksParams {
  page: number;
  limit: number;
  title?: string;
  author?: string;
}

export const getBooks = async ({
  page,
  limit,
  author,
  title,
}: GetBooksParams): Promise<BooksResponse> => {
  const res = await api.get<BooksResponse>("/books", {
    params: { page, limit, author, title },
  });
  return res.data;
};
