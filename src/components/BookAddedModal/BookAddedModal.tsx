import Modal from "../../components/Modal/Modal";
import css from "./BookAddedModal.module.css";

interface BookAddedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookAddedModal({
  isOpen,
  onClose,
}: BookAddedModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <span className={css.icon}>👍</span>
        <h2 className={css.title}>Good job</h2>
        <p className={css.description}>
          Your book is now in <strong>the library!</strong> This joy knows no
          bounds, and now you can start your training.
        </p>
      </div>
    </Modal>
  );
}
