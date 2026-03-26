"use client";

import { useEffect, useState } from "react";

type SaleType = "SALE" | "ADJUSTMENT" | "RETURN";

type HistoryEntry = {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  type: SaleType;
  description: string | null;
  created_at: string;
};

export default function AdminHistorialPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [type, setType] = useState<SaleType>("SALE");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function loadHistory() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/sales-history?limit=50");
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error cargando historial");
      setHistory(data.history);
    } catch (err) {
      console.error(err);
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const pid = Number(productId);
    const qty = Number(quantity);

    if (!pid || !qty) {
      setErrorMsg("Debes ingresar productId y cantidad válidos");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: pid,
          quantity: qty,
          type,
          description: description || undefined,
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error registrando venta");

      setProductId("");
      setQuantity("1");
      setDescription("");
      await loadHistory();
    } catch (err) {
      console.error(err);
      setErrorMsg((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Historial de movimientos</h1>

      {/* Formulario simulador */}
      <section className="border rounded-xl p-4 space-y-4">
        <h2 className="font-semibold">Simular venta / ajuste de stock</h2>

        {errorMsg && (
          <p className="text-sm text-red-500">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-4 md:items-end">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Product ID</label>
            <input
              className="border rounded px-2 py-1 text-sm"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="ID del producto"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Cantidad</label>
            <input
              className="border rounded px-2 py-1 text-sm"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Tipo</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as SaleType)}
            >
              <option value="SALE">SALE (venta)</option>
              <option value="RETURN">RETURN (devolución)</option>
              <option value="ADJUSTMENT">ADJUSTMENT (ajuste manual)</option>
            </select>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm mb-1">Descripción (opcional)</label>
            <input
              className="border rounded px-2 py-1 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: venta en feria, ajuste inventario..."
            />
          </div>

          <div className="md:col-span-4 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm rounded bg-black text-white disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Registrar movimiento"}
            </button>
          </div>
        </form>
      </section>

      {/* Tabla historial */}
      <section className="border rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Últimos movimientos</h2>
          <button
            onClick={loadHistory}
            disabled={loading}
            className="text-sm underline disabled:opacity-60"
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1 pr-2">ID</th>
                <th className="text-left py-1 pr-2">Producto</th>
                <th className="text-left py-1 pr-2">Tipo</th>
                <th className="text-left py-1 pr-2">Cantidad</th>
                <th className="text-left py-1 pr-2">Descripción</th>
                <th className="text-left py-1 pr-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b last:border-0">
                  <td className="py-1 pr-2">{h.id}</td>
                  <td className="py-1 pr-2">
                    {h.product_name}{" "}
                    <span className="text-xs text-gray-500">
                      (#{h.product_id})
                    </span>
                  </td>
                  <td className="py-1 pr-2">{h.type}</td>
                  <td className="py-1 pr-2">{h.quantity}</td>
                  <td className="py-1 pr-2">
                    {h.description || "—"}
                  </td>
                  <td className="py-1 pr-2">
                    {new Date(h.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}

              {history.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="py-2 text-center text-gray-500">
                    Todavía no hay movimientos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
