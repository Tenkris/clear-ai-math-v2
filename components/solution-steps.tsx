"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, MessageCircle } from "lucide-react"

interface Step {
  id: number
  title: string
  content: string
  workShown: string
  detailedExplanation: string
}

interface SolutionStepsProps {
  steps: Step[]
}

export function SolutionSteps({ steps }: SolutionStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())
  const [followUpQuestion, setFollowUpQuestion] = useState("")

  const toggleStep = (stepId: number) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId)
    } else {
      newExpanded.add(stepId)
    }
    setExpandedSteps(newExpanded)
  }

  const handleFollowUpSubmit = () => {
    if (followUpQuestion.trim()) {
      // Handle follow-up question submission
      console.log("Follow-up question:", followUpQuestion)
      setFollowUpQuestion("")
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Solution</h2>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Step {step.id}. {step.title}
            </h3>

            <p className="text-gray-700 mb-4 leading-relaxed">{step.content}</p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap text-gray-800">{step.workShown}</pre>
            </div>

            <button
              onClick={() => toggleStep(step.id)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
            >
              {expandedSteps.has(step.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              Detailed explanation
            </button>

            {expandedSteps.has(step.id) && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-700 leading-relaxed">{step.detailedExplanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Follow-up Question Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="Ask a follow-up question"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleFollowUpSubmit()}
            />
          </div>
          <button
            onClick={handleFollowUpSubmit}
            disabled={!followUpQuestion.trim()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Ask
          </button>
        </div>
        <div className="flex justify-end mt-2">
          <span className="text-sm text-gray-500">1 / 2</span>
        </div>
      </div>
    </div>
  )
}
