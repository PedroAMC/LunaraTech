// src/components/layout/Container.tsx
import React from "react";

type Props = React.PropsWithChildren<{
  className?: string;
}>;

export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[112rem] px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
