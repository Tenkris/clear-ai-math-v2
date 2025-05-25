import { Download, ZoomIn, ZoomOut } from "lucide-react"

export function UploadedImage() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* PDF-like header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">IMG</div>
          <span className="text-sm font-medium text-gray-700">Quadratic_Equation_Problem.jpg</span>
        </div>
        <button className="p-1 hover:bg-gray-200 rounded">
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Image viewer controls */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <ZoomOut className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600">100%</span>
          <button className="p-1 hover:bg-gray-200 rounded">
            <ZoomIn className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="text-sm text-gray-600">1 / 1</div>
      </div>

      {/* Image content */}
      <div className="p-6 h-[500px] flex items-center justify-center">
        <div className="w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border max-w-sm mx-auto">
              <div className="border-2 border-red-500 rounded p-4 mb-4">
                <p className="text-lg font-medium text-gray-800 mb-2">1. Solve the equation.</p>
                <p className="text-2xl font-mono text-gray-800">x² - 5x + 6 = 0</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border border-gray-300 rounded p-2">
                  <p className="font-medium">2. Solve the equation.</p>
                  <p className="font-mono">4x - 2 = 10</p>
                </div>
                <div className="border border-gray-300 rounded p-2">
                  <p className="font-medium">3. Solve the equation.</p>
                  <p className="font-mono">-6m - 1 = 11</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
