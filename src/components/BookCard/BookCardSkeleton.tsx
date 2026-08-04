import css from "./BookCard.module.css";

export default function BookCardSkeleton() {
  return (
    <div className={css.card}>
      <div className={`${css.cover} ${css.skeleton}`} />
      <div className={css.footer}>
        <div className={css.info}>
          <div
            className={`${css.skeletonLine} ${css.skeleton}`}
            style={{ width: "80%" }}
          />
          <div
            className={`${css.skeletonLine} ${css.skeleton}`}
            style={{ width: "50%", marginTop: 4 }}
          />
        </div>
      </div>
    </div>
  );
}
