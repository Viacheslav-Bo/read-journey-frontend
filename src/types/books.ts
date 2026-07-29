export interface RecommendedBook {
  openLibraryId: string | null;
  title: string;
  author: string;
  coverUrl: string | null;
  totalPages: number | null;
}

export interface BooksResponse {
  books: RecommendedBook[];
  totalItems: number;
  totalPages: number;
  page: number;
}
