// src/components/admin/Toggle.tsx
"use client";

type ToggleProps = {
  checked: boolean;
  onChange?: (v: boolean) => void;
  // compat opcional para código viejo:
  onCheckedChange?: (v: boolean) => void;
};

export default function Toggle({ checked, onChange, onCheckedChange }: ToggleProps) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.checked;
    onChange?.(v);
    onCheckedChange?.(v);
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={handle}
      />
      <span className="w-10 h-6 rounded-full bg-neutral-700 peer-checked:bg-emerald-600 relative transition-colors">
        <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white/90 peer-checked:translate-x-4 transition-transform" />
      </span>
    </label>
  );
}
