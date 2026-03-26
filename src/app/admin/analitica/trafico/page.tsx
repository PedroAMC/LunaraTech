import AdminSection from "@/components/admin/AdminSection";
import LineChartBasic from "@/components/charts/LineChartBasic";
import { trafficByDay } from "@/data/analytics";

export default function Page() {
  const data = trafficByDay.map(d => ({ day: d.day, value: d.value }));
  return (
    <AdminSection title="Analítica · Tráfico">
      <LineChartBasic data={data} xKey="day" yKey="value" />
    </AdminSection>
  );
}