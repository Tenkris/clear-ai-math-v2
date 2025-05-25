import { Zap } from "lucide-react"

interface SolvingStrategyProps {
  content: string
}

export function SolvingStrategy({ content }: SolvingStrategyProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 bg-pink-100 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-pink-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Solving Strategy</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">
        We can solve the equation using{" "}
        <span className="underline decoration-orange-500 decoration-2 font-medium">factoring</span> operations. We'll
        look for two numbers that multiply to give the constant term and add to give the coefficient of x.
      </p>
    </div>
  )
}
