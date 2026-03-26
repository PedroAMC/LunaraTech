export default function Badge({ kind, children }:{ kind:"green"|"yellow"|"red"|"gray"; children:React.ReactNode }) {
  const map = {
    green: "bg-emerald-900/40 text-emerald-300 border-emerald-700",
    yellow:"bg-amber-900/40 text-amber-300 border-amber-700",
    red:   "bg-rose-900/40 text-rose-300 border-rose-700",
    gray:  "bg-neutral-800 text-neutral-300 border-neutral-700",
  } as const;
  return <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs ${map[kind]}`}>{children}</span>;
}
