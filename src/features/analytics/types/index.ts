export interface KpiMetric {
  id: string
  label: string
  value: number
  change: number
  unit: string
}

export interface RevenueDataPoint {
  month: string
  revenue: number
  target: number
}

export interface UserGrowthDataPoint {
  month: string
  users: number
  newUsers: number
}
