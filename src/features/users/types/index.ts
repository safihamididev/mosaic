export type UserStatus = "active" | "inactive" | "pending"
export type Plan = "starter" | "pro" | "enterprise"

export interface User {
  id: string
  name: string
  email: string
  plan: Plan
  status: UserStatus
  mrr: number
  joinedAt: string
  lastActive: string
}

export interface UserFilters {
  search: string
  status: UserStatus | "all"
  plan: Plan | "all"
}
