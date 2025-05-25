import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
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
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition">
            Sign In
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-sm p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-red-100 p-6 rounded-full mb-6">
                <AlertCircle className="h-12 w-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Question Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The question you're looking for doesn't exist or may have been
                removed.
              </p>
              <Link
                href="/"
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
