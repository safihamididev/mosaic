"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/utils/cn"

const nav = [
  { href: "/dashboard", label: "Overview", icon: "chart-bar" },
  { href: "/dashboard/users", label: "Users", icon: "users" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 shrink-0 border-r border-gray-100 bg-white flex flex-col h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-gray-100">
        <span className="text-[15px] font-semibold tracking-tight text-gray-900">Mosaic</span>
        <span className="ml-1.5 text-[10px] font-medium text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded">DEMO</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              )}
            >
              <i className={`ti ti-${icon} text-base`} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-[11px] font-semibold text-indigo-700">SH</div>
          <div>
            <p className="text-xs font-medium text-gray-800 leading-none">Safiullah H.</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
