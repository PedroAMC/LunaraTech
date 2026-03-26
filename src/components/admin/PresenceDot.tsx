function colorFromMins(mins?: number): string {
  if (mins === undefined) return "bg-neutral-600";
  if (mins <= 5)  return "bg-emerald-500";
  if (mins <= 30) return "bg-amber-500";
  return "bg-rose-500";
}
export default function PresenceDot({ minutes }: { minutes?: number }) {
  const color = colorFromMins(minutes);
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}
