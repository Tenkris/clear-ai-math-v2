import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { MathTabs } from "@/components/math-tabs"
import { UploadArea } from "@/components/upload-area"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <header className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold">C</span>
          </div>
          <span className="text-xl font-bold">Clear.ai</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-emerald-600">
            Photosolve
          </a>
          <a href="#" className="text-gray-700 hover:text-emerald-600">
            Resources
          </a>
          <a href="#" className="text-gray-700 hover:text-emerald-600">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Hero />
        <div className="max-w-3xl mx-auto mt-12">
          <MathTabs />
          <UploadArea />
        </div>
        <Features />
      </main>

      <footer className="container mx-auto py-8 px-4 text-center text-gray-600">
        <p>© 2025 Clear.ai. All rights reserved.</p>
      </footer>
    </div>
  )
}
