import { useState } from "react";
import css from "./BookFilters.module.css";

interface BookFiltersProps {
  onApply: (filters: { title: string; author: string }) => void;
}

export default function BookFilters({ onApply }: BookFiltersProps) {
  const [titleInput, setTitleInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApply({ title: titleInput.trim(), author: authorInput.trim() });
  };

  return (
    <div className={css.filtersWrapper}>
      <h2 className={css.title}>Filters:</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formElements}>
          <div className={css.fieldInline}>
            <label htmlFor="title">Book title:</label>
            <input
              id="title"
              type="text"
              placeholder="Enter text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>

          <div className={css.fieldInline}>
            <label htmlFor="author">Book author:</label>
            <input
              id="author"
              type="text"
              placeholder="Enter text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
          </div>
        </div>

        <button className={css.applyButton} type="submit">
          To apply
        </button>
      </form>
    </div>
  );
}
