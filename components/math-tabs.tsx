"use client"

import { useState } from "react"

export function MathTabs() {
  const [activeTab, setActiveTab] = useState("photosolve")

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setActiveTab("photosolve")}
        className="px-8 py-3 bg-emerald-600 text-white rounded-full text-sm font-medium transition-all hover:bg-emerald-700"
      >
        Photo Math Solver
      </button>
    </div>
  )
}
