"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [ "#60a5fa", "#f59e0b", "#10b981", "#ef4444" ];

export default function PieChartBasic({ data, nameKey, valueKey }:{
  data: any[], nameKey: string, valueKey: string
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={valueKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={90}>
            {data.map((_, i) => <Cell key={i} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}