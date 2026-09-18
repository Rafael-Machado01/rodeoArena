interface HeaderNavProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
export default function HeaderNav({
  title,
  description,
  children,
}: HeaderNavProps) {
  return (
    <header className="flex justify-between items-center gap-4 mb-4">
      <div className="flex flex-col">
        <h1 className="text-text font-bold font-heading text-2xl">{title}</h1>
        <p className="text-text-muted">{description}</p>
      </div>
      {children}
    </header>
  );
}
