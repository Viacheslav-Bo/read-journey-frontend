import css from "./BookCard.module.css";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BookCard({
  title,
  author,
  coverUrl,
  children,
  onClick,
}: BookCardProps) {
  return (
    <article className={css.card} onClick={onClick}>
      <img
        className={css.cover}
        src={coverUrl || "/placeholder-book.png"}
        alt={`Cover of ${title}`}
      />

      <div className={css.footer}>
        <div className={css.info}>
          <h3 className={css.title}>{title}</h3>
          <p className={css.author}>{author}</p>
        </div>

        {children}
      </div>
    </article>
  );
}
