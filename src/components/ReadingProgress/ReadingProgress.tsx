import css from "./ReadingProgress.module.css";

export default function ReadingProgress() {
  return (
    <div className={css.panel}>
      <h2 className={css.title}>Progress</h2>

      <p className={css.text}>
        Here you will see when and how much you read.
        <br />
        To record, click on the red button above.
      </p>

      <div className={css.iconWrapper} aria-hidden="true">
        <span className={css.emoji}>🌟</span>
      </div>
    </div>
  );
}
