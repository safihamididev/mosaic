"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Skeleton } from "@/shared/components/ui/Skeleton"
import type { UserGrowthDataPoint } from "../types"

export function UserGrowthChart({ data }: { data: UserGrowthDataPoint[] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <p className="text-sm font-medium text-gray-700 mb-5">User growth</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 2, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
          <Tooltip
            formatter={(v: number) => [v.toLocaleString(), ""]}
            contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}
          />
          <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} fill="url(#usersGrad)" name="Total users" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function UserGrowthChartSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <Skeleton className="h-4 w-28 mb-5" />
      <Skeleton className="h-[220px] w-full" />
    </div>
  )
}
