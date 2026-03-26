// src/components/layout/SectionFull.tsx
import React from "react";
import Container from "./Container";

type Props = {
  title?: string;
  subtitle?: string;
  bleed?: boolean; // true = fondo de la sección llega a los bordes
  className?: string;
  headerClassName?: string;
  children: React.ReactNode;
};

export default function SectionFull({
  title,
  subtitle,
  bleed = false,
  className = "",
  headerClassName = "",
  children,
}: Props) {
  const inner = (
    <div className={`py-8 sm:py-10 ${className}`}>
      {(title || subtitle) && (
        <header className={`mb-6 ${headerClassName}`}>
          {title && (
            <h2 className="text-xl sm:text-2xl font-semibold">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-400 mt-1">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );

  if (bleed) {
    // Sección que toca bordes laterales (usamos .full-bleed del CSS)
    return (
      <section className="full-bleed">
        <Container>{inner}</Container>
      </section>
    );
  }

  // Sección normal con gutters
  return (
    <section>
      <Container>{inner}</Container>
    </section>
  );
}
