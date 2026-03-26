"use client";

type Props = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
};

export default function Toggle({ checked, onCheckedChange }: Props) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`w-11 h-6 rounded-full transition relative ${
        checked ? "bg-emerald-500/80" : "bg-neutral-700"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          checked ? "left-6" : "left-0.5"
        }`}
      />
    </button>
  );
}
