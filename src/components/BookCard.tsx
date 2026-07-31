interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BookCard({
  title,
  author,
  coverUrl,
  children,
  onClick,
}: BookCardProps) {
  return (
    <div onClick={onClick}>
      <img
        src={coverUrl || "/placeholder-book.png"}
        alt={`Cover of ${title}`}
      />
      <h3>{title}</h3>
      <p>{author}</p>
      {children}
    </div>
  );
}
