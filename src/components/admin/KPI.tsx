export default function KPI(props: {
  title: string;
  value: string | number;
  subtitle?: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const tone = props.tone ?? "default";
  const toneCls =
    tone === "success" ? "text-emerald-300" :
    tone === "warning" ? "text-amber-300"  :
    tone === "danger"  ? "text-rose-300"   : "text-neutral-100";

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
      <div className="text-neutral-400 text-sm">{props.title}</div>
      <div className={`mt-1 text-3xl font-semibold ${toneCls}`}>{props.value}</div>
      {props.subtitle && (
        <div className="mt-1 text-xs text-neutral-400">{props.subtitle}</div>
      )}
    </div>
  );
}
