import { Header } from "@/shared/components/layout/Header"
import { UsersTable } from "@/features/users/components/UsersTable"

export default function UsersPage() {
  return (
    <div>
      <Header title="Users" subtitle="Manage and filter your customer base" />
      <UsersTable />
    </div>
  )
}
