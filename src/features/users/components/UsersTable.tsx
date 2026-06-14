"use client";
import { useState, useMemo } from "react";
import { useUsers } from "@/features/users";
import { Badge } from "@/shared/components/ui/Badge";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import type { UserStatus, Plan } from "../types";

const statusVariant: Record<UserStatus, "success" | "neutral" | "warning"> = {
  active: "success",
  inactive: "neutral",
  pending: "warning",
};

const planVariant: Record<Plan, "info" | "neutral" | "success"> = {
  enterprise: "info",
  pro: "success",
  starter: "neutral",
};

type SortKey = "name" | "mrr" | "joinedAt" | "lastActive";

export function UsersTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<UserStatus | "all">("all");
  const [plan, setPlan] = useState<Plan | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const debouncedSearch = useDebounce(search);
  const { data: users, isLoading } = useUsers({
    search: debouncedSearch,
    status,
    plan,
  });

  const sorted = useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [users, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function exportCsv() {
    if (!sorted) return;
    const cols = ["Name", "Email", "Plan", "Status", "MRR", "Joined"];
    const rows = sorted.map((u) => [
      u.name,
      u.email,
      u.plan,
      u.status,
      u.mrr,
      u.joinedAt,
    ]);
    const csv = [cols, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  }

  const SortIcon = ({ k }: { k: SortKey }) => (
    <i
      className={`ti ti-chevron-${sortKey === k ? (sortDir === "asc" ? "up" : "down") : "up"} ml-1 opacity-${sortKey === k ? "100" : "20"} text-xs`}
      aria-hidden="true"
    />
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative">
          <i
            className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg w-52 focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as UserStatus | "all")}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value as Plan | "all")}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="all">All plans</option>
          <option value="enterprise">Enterprise</option>
          <option value="pro">Pro</option>
          <option value="starter">Starter</option>
        </select>
        <button
          onClick={exportCsv}
          className="ml-auto flex items-center gap-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 bg-white transition-colors"
        >
          <i className="ti ti-download text-sm" aria-hidden="true" /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600"
                onClick={() => toggleSort("name")}
              >
                Name <SortIcon k="name" />
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Plan
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide">
                Status
              </th>
              <th
                className="text-right px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600"
                onClick={() => toggleSort("mrr")}
              >
                MRR <SortIcon k="mrr" />
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600"
                onClick={() => toggleSort("joinedAt")}
              >
                Joined <SortIcon k="joinedAt" />
              </th>
              <th
                className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide cursor-pointer hover:text-gray-600"
                onClick={() => toggleSort("lastActive")}
              >
                Last active <SortIcon k="lastActive" />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-14" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-14 ml-auto" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-20" />
                  </td>
                </tr>
              ))
            ) : sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-gray-400"
                >
                  No users match your filters
                </td>
              </tr>
            ) : (
              sorted.map((user, i) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i === sorted.length - 1 ? "border-0" : ""}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-[11px] font-semibold text-indigo-600 shrink-0">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={planVariant[user.plan]}>{user.plan}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant[user.status]}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-medium tabular-nums text-gray-700">
                    {formatCurrency(user.mrr)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(user.joinedAt)}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {formatDate(user.lastActive)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && sorted.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {sorted.length} user{sorted.length !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-gray-400">
              Total MRR:{" "}
              <span className="font-medium text-gray-600">
                {formatCurrency(sorted.reduce((s, u) => s + u.mrr, 0))}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
