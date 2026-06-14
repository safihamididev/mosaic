import { useQuery } from "@tanstack/react-query"
import { fetchKpis, fetchRevenueData, fetchUserGrowthData } from "../api"

export function useKpis() {
  return useQuery({ queryKey: ["kpis"], queryFn: fetchKpis })
}

export function useRevenueData() {
  return useQuery({ queryKey: ["revenue"], queryFn: fetchRevenueData })
}

export function useUserGrowthData() {
  return useQuery({ queryKey: ["userGrowth"], queryFn: fetchUserGrowthData })
}
