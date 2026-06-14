import { Skeleton } from "@/shared/components/ui/Skeleton"
import { formatCurrency, formatNumber, formatPercent } from "@/shared/utils/formatters"
import type { KpiMetric } from "../types"

function formatValue(value: number, unit: string) {
  if (unit === "$") return formatCurrency(value)
  if (unit === "%") return `${value}%`
  return formatNumber(value)
}

export function KpiCard({ metric }: { metric: KpiMetric }) {
  const isPositive = metric.change > 0
  const changeColor = metric.id === "churn"
    ? isPositive ? "text-red-500" : "text-emerald-600"
    : isPositive ? "text-emerald-600" : "text-red-500"

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">{metric.label}</p>
      <p className="text-2xl font-semibold text-gray-900 tabular-nums">{formatValue(metric.value, metric.unit)}</p>
      <p className={`text-xs mt-1.5 font-medium ${changeColor}`}>
        {formatPercent(metric.change)} vs last month
      </p>
    </div>
  )
}

export function KpiCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <Skeleton className="h-3 w-24 mb-3" />
      <Skeleton className="h-7 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}
