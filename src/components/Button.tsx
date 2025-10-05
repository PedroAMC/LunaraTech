"use client";
import React from "react";
import Link from "next/link";

type Base = React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" };
type AsLink = React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "link"; href: string };

type Props = (Base | AsLink) & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  children?: React.ReactNode;
};

const base =
  "inline-flex items-center gap-2 rounded-lg font-medium transition-all ease-soft";

// ⬇️ Tipa los mapas con `as const` para que las claves sean literales
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
} as const;

const variants = {
  primary:
    "bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white",
  ghost:
    "bg-transparent hover:bg-white/5 active:bg-white/10 text-white/90",
} as const;

export default function Button(props: Props) {
  // ⬇️ NO uses `as any`. Tipos inferidos de `Props`
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;

  // ⬇️ Normaliza claves con el tipo de los mapas
  const sizeKey = size as keyof typeof sizes;
  const variantKey = variant as keyof typeof variants;

  const cls = `${base} ${sizes[sizeKey]} ${variants[variantKey]} ${className}`;

  if ("as" in props && props.as === "link") {
    const { href, ...a } = rest as AsLink; // tipo correcto para el resto
    return (
      <Link href={href ?? "#"} className={cls} {...a}>
        {children}
      </Link>
    );
    // Nota: <Link> ya acepta className directamente en Next 13+
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

