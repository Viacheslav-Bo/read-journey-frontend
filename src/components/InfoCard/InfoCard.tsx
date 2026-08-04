import css from "./InfoCard.module.css";

export default function InfoCard() {
  return (
    <div className={css.quote}>
      <span className={css.icon}>📚</span>

      <p className={css.text}>
        "Books are <span>windows</span> to the world, and reading is a journey
        into the unknown."
      </p>
    </div>
  );
}
