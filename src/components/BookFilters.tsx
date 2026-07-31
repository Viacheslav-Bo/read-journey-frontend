import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={authorInput}
        onChange={(e) => setAuthorInput(e.target.value)}
      />
      <button type="submit">To apply</button>
    </form>
  );
}
