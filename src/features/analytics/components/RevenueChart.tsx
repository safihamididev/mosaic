"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/shared/components/ui/Skeleton"
import type { RevenueDataPoint } from "../types"

export function RevenueChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-700 mb-5">Revenue vs target</p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(v: number) => [`$${v.toLocaleString()}`, ""]}
            contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} name="Revenue" />
          <Line type="monotone" dataKey="target" stroke="#e5e7eb" strokeWidth={1.5} dot={false} strokeDasharray="4 4" name="Target" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function RevenueChartSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <Skeleton className="h-4 w-32 mb-5" />
      <Skeleton className="h-[220px] w-full" />
    </div>
  )
}
