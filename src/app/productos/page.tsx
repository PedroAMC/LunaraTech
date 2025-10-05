export default function ProductosPage() {
  const mock = [
    { slug: "cable-hdmi", name: "Cable HDMI 2.1", price: 8990 },
    { slug: "cargador-usb-c", name: "Cargador USB-C 25W", price: 14990 },
    { slug: "mouse-gamer", name: "Mouse Gamer 7200 DPI", price: 19990 }
  ];
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mock.map((p) => (
          <li key={p.slug} className="border rounded-lg p-4">
            <div className="text-lg font-medium">{p.name}</div>
            <div className="opacity-70">${p.price.toLocaleString("es-CL")}</div>
            <a href={`/producto/${p.slug}`} className="mt-2 inline-block underline">
              Ver detalle
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}