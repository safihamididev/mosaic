import { users } from "@/mocks/users"
import type { User, UserFilters } from "../types"

export async function fetchUsers(filters?: Partial<UserFilters>): Promise<User[]> {
  await new Promise((r) => setTimeout(r, 400))
  let result = [...users]
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }
  if (filters?.status && filters.status !== "all") {
    result = result.filter((u) => u.status === filters.status)
  }
  if (filters?.plan && filters.plan !== "all") {
    result = result.filter((u) => u.plan === filters.plan)
  }
  return result
}

export async function fetchUserById(id: string): Promise<User | undefined> {
  await new Promise((r) => setTimeout(r, 300))
  return users.find((u) => u.id === id)
}
