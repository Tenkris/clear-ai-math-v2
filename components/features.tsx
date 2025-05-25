import { Brain, ImageIcon, Clock, Sparkles } from "lucide-react"

export function Features() {
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          <ImageIcon className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Image Math Solving</h3>
        <p className="text-gray-600">Upload an image of any math problem and get instant solutions.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          <Brain className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">AI-Powered Solutions</h3>
        <p className="text-gray-600">Get intelligent step-by-step solutions to complex math problems.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
        <p className="text-gray-600">Get immediate answers to your math questions without waiting.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
          <Sparkles className="h-6 w-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Learning Tools</h3>
        <p className="text-gray-600">Understand concepts better with detailed explanations and visualizations.</p>
      </div>
    </div>
  )
}
