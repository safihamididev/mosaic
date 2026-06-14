import { Sidebar } from "./Sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="flex-1 px-8 py-7 max-w-6xl">
        {children}
      </main>
    </div>
  )
}
