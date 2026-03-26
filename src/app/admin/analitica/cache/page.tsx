import AdminSection from "@/components/admin/AdminSection";
import PieChartBasic from "@/components/charts/PieChartBasic";
import { cacheBreakdown } from "@/data/analytics";

export default function Page() {
  return (
    <AdminSection title="Analítica · Cache">
      <PieChartBasic data={cacheBreakdown} nameKey="name" valueKey="value" />
    </AdminSection>
  );
}