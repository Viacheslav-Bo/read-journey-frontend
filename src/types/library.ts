import { ReadingStatus } from "./status";

export interface LibraryBook {
  readonly id: string;
  readonly userId: string;
  openLibraryId: string | null;
  title: string;
  author: string;
  coverUrl: string | null;
  totalPages: number;
  currentPage: number;
  status: ReadingStatus;
  readonly createdAt: string;
  updatedAt: string;
}
