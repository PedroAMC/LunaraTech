"use client";

import { useState } from "react";

type Props = {
  label?: string;
  value: string;
  onChange: (next: string) => void;
};

export default function ImageUploader({ label, value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Error subiendo imagen");
      }

      // Puedes guardar data.key en la BD y usar getImageUrl después,
      // pero para la UI inmediata nos sirve la URL directa
      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm text-neutral-400">{label}</label>
      )}

      <div className="flex items-center gap-4">
        <div className="w-32 h-32 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-neutral-500">Sin imagen</span>
          )}
        </div>

        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de imagen (opcional pegar manual)"
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm"
          />

          {uploading && (
            <p className="text-xs text-emerald-400">Subiendo imagen...</p>
          )}
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}
