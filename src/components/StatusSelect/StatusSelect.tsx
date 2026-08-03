import { useEffect, useRef, useState } from "react";
import css from "./StatusSelect.module.css";
import { ReadingStatus } from "../../types/status";

interface StatusSelectProps {
  value: ReadingStatus | undefined;
  onChange: (value: ReadingStatus | undefined) => void;
}

const options = [
  { label: "All books", value: undefined },
  { label: "Unread", value: "UNREAD" as ReadingStatus },
  { label: "In progress", value: "READING" as ReadingStatus },
  { label: "Done", value: "FINISHED" as ReadingStatus },
];

export default function StatusSelect({ value, onChange }: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <div className={css.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={css.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected.label}</span>

        <svg
          className={`${css.arrow} ${isOpen ? css.open : ""}`}
          width="20"
          height="20"
        >
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </button>

      {isOpen && (
        <ul className={css.menu}>
          {options.map((option) => (
            <li key={option.label}>
              <button
                type="button"
                className={`${css.option} ${
                  option.value === value ? css.active : ""
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
