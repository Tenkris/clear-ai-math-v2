"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type or upload your question"
          className="w-full px-6 py-4 pr-16 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}
