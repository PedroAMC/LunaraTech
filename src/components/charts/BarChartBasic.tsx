"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function BarChartBasic({ data, xKey, yKey }:{
  data: any[], xKey: string, yKey: string
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false}/>
          <XAxis dataKey={xKey} tick={{ fill: "rgba(255,255,255,0.7)" }}/>
          <YAxis tick={{ fill: "rgba(255,255,255,0.7)" }}/>
          <Tooltip />
          <Bar dataKey={yKey} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}