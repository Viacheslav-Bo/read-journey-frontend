import css from "./BookCard.module.css";
import { useState } from "react";

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
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <article className={css.card} onClick={onClick}>
      {!imgLoaded && <div className={`${css.cover} ${css.skeleton}`} />}
      <img
        className={css.cover}
        style={{ display: imgLoaded ? "block" : "none" }}
        src={coverUrl || "/placeholder-book.png"}
        alt={`Cover of ${title}`}
        onLoad={() => setImgLoaded(true)}
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
