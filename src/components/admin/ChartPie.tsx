"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
const COLORS = ["#60a5fa","#f87171","#fbbf24","#34d399","#a78bfa"];

export default function ChartPie({ data }:{ data:{ name:string; value:number }[] }) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label />
          <Tooltip /><Legend />
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
