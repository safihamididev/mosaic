"use client"
import { Header } from "@/shared/components/layout/Header"
import {
  KpiCard, KpiCardSkeleton,
  RevenueChart, RevenueChartSkeleton,
  UserGrowthChart, UserGrowthChartSkeleton,
  useKpis, useRevenueData, useUserGrowthData,
} from "@/features/analytics"

export default function OverviewPage() {
  const kpis = useKpis()
  const revenue = useRevenueData()
  const growth = useUserGrowthData()

  return (
    <div>
      <Header
        title="Overview"
        subtitle="June 2026 — updated today"
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)
          : kpis.data?.map((metric) => <KpiCard key={metric.id} metric={metric} />)
        }
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {revenue.isLoading
          ? <RevenueChartSkeleton />
          : revenue.data && <RevenueChart data={revenue.data} />
        }
        {growth.isLoading
          ? <UserGrowthChartSkeleton />
          : growth.data && <UserGrowthChart data={growth.data} />
        }
      </div>
    </div>
  )
}
