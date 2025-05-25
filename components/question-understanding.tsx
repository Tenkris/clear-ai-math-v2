import { Lightbulb } from "lucide-react"

interface QuestionUnderstandingProps {
  content: string
}

export function QuestionUnderstanding({ content }: QuestionUnderstandingProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Question Understanding</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  )
}
