import { ReadingStatus } from "../../types/status";

interface LibraryFiltersProps {
  onFilterChange: (status: ReadingStatus | undefined) => void;
}

export default function LibraryFilters({
  onFilterChange,
}: LibraryFiltersProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(value === "" ? undefined : (value as ReadingStatus));
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="">All books</option>
      <option value="UNREAD">Unread</option>
      <option value="READING">In progress</option>
      <option value="FINISHED">Done</option>
    </select>
  );
}
