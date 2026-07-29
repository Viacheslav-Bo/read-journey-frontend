export interface ReadingSession {
  id: string;
  libraryBookId: string;
  startPage: number;
  endPage: number | null;
  startedAt: string;
  finishedAt: string | null;
  readonly createdAt: string;
}
