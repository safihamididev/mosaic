import { kpiData, revenueData, userGrowthData } from "@/mocks/analytics"

export async function fetchKpis() {
  await new Promise((r) => setTimeout(r, 400))
  return kpiData
}

export async function fetchRevenueData() {
  await new Promise((r) => setTimeout(r, 500))
  return revenueData
}

export async function fetchUserGrowthData() {
  await new Promise((r) => setTimeout(r, 450))
  return userGrowthData
}
