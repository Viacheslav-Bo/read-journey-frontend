import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.button}
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-chevron-left" />
        </svg>
      </button>

      <button
        type="button"
        className={css.button}
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <svg width="16" height="16">
          <use href="/sprite.svg#icon-chevron-right" />
        </svg>
      </button>
    </div>
  );
};
