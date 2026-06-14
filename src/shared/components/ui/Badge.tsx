import { cn } from "@/shared/utils/cn"

type Variant = "success" | "warning" | "danger" | "neutral" | "info"

const styles: Record<Variant, string> = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  neutral: "bg-gray-100 text-gray-600",
  info: "bg-indigo-50 text-indigo-700",
}

export function Badge({ children, variant = "neutral" }: { children: React.ReactNode; variant?: Variant }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", styles[variant])}>
      {children}
    </span>
  )
}
