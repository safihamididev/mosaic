"use client"
import { useState } from "react"
import { Header } from "@/shared/components/layout/Header"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <Header title="Settings" subtitle="Manage your account preferences" />
      <div className="max-w-xl">
        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Display name</label>
            <input
              type="text"
              defaultValue="Safiullah Hamidi"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="safi@example.com"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
            <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200">
              <option>Asia/Kolkata (IST, UTC+5:30)</option>
              <option>Europe/Amsterdam (CET, UTC+1)</option>
              <option>America/New_York (EST, UTC-5)</option>
            </select>
          </div>
          <div className="pt-1 flex items-center gap-3">
            <button
              type="submit"
              className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save changes
            </button>
            {saved && (
              <span className="text-sm text-emerald-600 flex items-center gap-1">
                <i className="ti ti-check" aria-hidden="true" /> Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
