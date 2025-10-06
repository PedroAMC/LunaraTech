// src/app/productos/page.tsx
import { Suspense } from "react";
import ProductsClient from "./products-client";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl p-6">Cargando…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
