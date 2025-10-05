type Props = { params: { slug: string } };

export default function ProductoDetalle({ params }: Props) {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <a href="/productos" className="underline">? Volver</a>
      <h1 className="text-2xl font-semibold mt-2">Producto: {params.slug}</h1>
      <p className="mt-2 opacity-80">Detalle placeholder. Aquí irá la info real.</p>
      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
        Agregar al carrito
      </button>
    </main>
  );
}
