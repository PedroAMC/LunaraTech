import AdminSection from "@/components/admin/AdminSection";
import BarChartBasic from "@/components/charts/BarChartBasic";
import { topPages } from "@/data/analytics";

export default function Page() {
  return (
    <AdminSection title="Analítica · Páginas">
      <BarChartBasic data={topPages} xKey="path" yKey="views" />
    </AdminSection>
  );
}