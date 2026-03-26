// src/components/home/Section.tsx
export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle && (
          <p className="text-sm text-neutral-400">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
