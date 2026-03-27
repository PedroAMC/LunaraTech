import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Page() {
  const products = await getProducts();

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Admin Productos</h1>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price}
        </div>
      ))}
    </div>
  );
}