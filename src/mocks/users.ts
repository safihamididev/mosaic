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

export const users: User[] = [
  { id: "u1", name: "Alice Chen", email: "alice@growthco.io", plan: "enterprise", status: "active", mrr: 1200, joinedAt: "2024-01-15", lastActive: "2026-06-13" },
  { id: "u2", name: "Ben Okafor", email: "ben@stacklabs.dev", plan: "pro", status: "active", mrr: 299, joinedAt: "2024-03-02", lastActive: "2026-06-12" },
  { id: "u3", name: "Carla Mendes", email: "carla@loops.so", plan: "starter", status: "inactive", mrr: 49, joinedAt: "2024-06-18", lastActive: "2026-04-01" },
  { id: "u4", name: "David Park", email: "david@clearbit.com", plan: "enterprise", status: "active", mrr: 1200, joinedAt: "2023-11-09", lastActive: "2026-06-14" },
  { id: "u5", name: "Emma Rossi", email: "emma@linear.app", plan: "pro", status: "pending", mrr: 299, joinedAt: "2026-05-28", lastActive: "2026-06-10" },
  { id: "u6", name: "Felix Wang", email: "felix@raycast.com", plan: "pro", status: "active", mrr: 299, joinedAt: "2024-09-14", lastActive: "2026-06-13" },
  { id: "u7", name: "Grace Kim", email: "grace@vercel.com", plan: "enterprise", status: "active", mrr: 1200, joinedAt: "2023-07-22", lastActive: "2026-06-14" },
  { id: "u8", name: "Hassan Ali", email: "hassan@supabase.io", plan: "starter", status: "active", mrr: 49, joinedAt: "2025-02-11", lastActive: "2026-06-09" },
]
