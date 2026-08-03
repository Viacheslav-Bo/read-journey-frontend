import Modal from "../Modal/Modal";
import css from "./BookReadModal.module.css";

interface BookReadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookReadModal({ isOpen, onClose }: BookReadModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <svg className={css.icon} width="48" height="48">
          <use href="/sprite.svg#icon-check" />
        </svg>
        <h2 className={css.title}>The book is read</h2>
        <p className={css.description}>
          It was an <strong>exciting journey</strong>, where each page revealed
          new horizons, and the characters became inseparable friends.
        </p>
      </div>
    </Modal>
  );
}
