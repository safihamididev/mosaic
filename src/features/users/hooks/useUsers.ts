import { useQuery } from "@tanstack/react-query"
import { fetchUsers, fetchUserById } from "../api"
import type { UserFilters } from "../types"

export function useUsers(filters?: Partial<UserFilters>) {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => fetchUsers(filters),
  })
}

export function useUserDetail(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  })
}
