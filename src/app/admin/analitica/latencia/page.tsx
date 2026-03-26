import AdminSection from "@/components/admin/AdminSection";
import LineChartBasic from "@/components/charts/LineChartBasic";
import { latencySeries } from "@/data/analytics";

const days = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
const merged = days.map((d, i) => ({ day: d, p50: latencySeries[0].values[i], p95: latencySeries[1].values[i] }));

export default function Page() {
  return (
    <AdminSection title="Analítica · Latencia (ms)">
      {/* Dos líneas sobre el mismo dataset */}
      {/* Reutilizamos el componente una vez por línea para mantenerlo simple */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartBasic data={merged.map(m=>({day:m.day, value:m.p50}))} xKey="day" yKey="value" />
        <LineChartBasic data={merged.map(m=>({day:m.day, value:m.p95}))} xKey="day" yKey="value" />
      </div>
    </AdminSection>
  );
}