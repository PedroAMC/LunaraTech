export type EventItem = { time: string; label: string; tone?: "info"|"warn"|"err" };

export default function EventTimeline({ items }: { items: EventItem[] }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
      <div className="text-neutral-300 font-medium mb-2">Eventos destacados</div>
      <ol className="space-y-2">
        {items.map((e, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              className="mt-1 h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor:
                  e.tone === "warn" ? "#f59e0b" : e.tone === "err" ? "#ef4444" : "#38bdf8",
              }}
            />
            <div className="text-sm">
              <span className="text-neutral-400 mr-2">{e.time}</span>
              <span className="text-neutral-200">{e.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
