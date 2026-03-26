import AdminSection from "@/components/admin/AdminSection";
import BarChartBasic from "@/components/charts/BarChartBasic";
import { conversionFunnel } from "@/data/analytics";

export default function Page() {
  return (
    <AdminSection title="Analítica · Conversión (embudo)">
      <BarChartBasic data={conversionFunnel} xKey="name" yKey="value" />
    </AdminSection>
  );
}