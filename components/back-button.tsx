"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Upload
    </button>
  )
}
