export default function StatCard({ title, value, hint }:{ title:string; value:string; hint?:string }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-neutral-500 mt-1">{hint}</div>}
    </div>
  );
}
