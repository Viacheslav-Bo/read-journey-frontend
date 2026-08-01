import { Link } from "react-router-dom";
import css from "./WorkoutCard.module.css";

export default function WorkoutCard() {
  return (
    <div className={css.card}>
      <h2 className={css.title}>Start your workout</h2>

      <ul className={css.list}>
        <li className={css.item}>
          <div className={css.number}>1</div>

          <p className={css.text}>
            <span>Create a personal library:</span> add the books you intend to
            read to it.
          </p>
        </li>

        <li className={css.item}>
          <div className={css.number}>2</div>

          <p className={css.text}>
            <span>Create your first workout:</span> define a goal, choose a
            period, start training.
          </p>
        </li>
      </ul>

      <div className={css.footer}>
        <Link to="/library" className={css.link}>
          My library
        </Link>

        <Link to="/library" className={css.arrow}>
          <svg width="40" height="40">
            <use href="/sprite.svg#icon-arrow-right" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
