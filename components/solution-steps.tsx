"use client";

import { useState } from "react";
import { MessageCircle, HelpCircle, Loader2 } from "lucide-react";
import { LaTeXRenderer } from "./latex-renderer";

interface Step {
  id: number;
  content: string;
}

interface StepExplanation {
  step: number;
  step_content: string;
  why_this_way: string;
  key_concepts: string;
}

interface SolutionStepsProps {
  steps: Step[];
  questionId: string;
}

export function SolutionSteps({ steps, questionId }: SolutionStepsProps) {
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [loadingExplanations, setLoadingExplanations] = useState<Set<number>>(
    new Set()
  );
  const [explanations, setExplanations] = useState<
    Map<number, StepExplanation>
  >(new Map());
  const [expandedExplanations, setExpandedExplanations] = useState<Set<number>>(
    new Set()
  );

  const handleGetExplanation = async (stepNumber: number) => {
    if (explanations.has(stepNumber)) {
      // Toggle visibility if explanation already exists
      const newExpanded = new Set(expandedExplanations);
      if (newExpanded.has(stepNumber)) {
        newExpanded.delete(stepNumber);
      } else {
        newExpanded.add(stepNumber);
      }
      setExpandedExplanations(newExpanded);
      return;
    }

    // Fetch explanation from API
    setLoadingExplanations((prev) => new Set(prev).add(stepNumber));

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/question/${questionId}/explain-step/${stepNumber}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: "",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch explanation: ${response.statusText}`);
      }

      const explanationData: StepExplanation = await response.json();

      // Store the explanation
      setExplanations((prev) => new Map(prev).set(stepNumber, explanationData));

      // Show the explanation
      setExpandedExplanations((prev) => new Set(prev).add(stepNumber));
    } catch (error) {
      console.error("Error fetching step explanation:", error);
      // You could show an error message to the user here
    } finally {
      setLoadingExplanations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(stepNumber);
        return newSet;
      });
    }
  };

  const handleFollowUpSubmit = () => {
    if (followUpQuestion.trim()) {
      // Handle follow-up question submission
      console.log("Follow-up question:", followUpQuestion);
      setFollowUpQuestion("");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Solution</h2>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Step {step.id}.
            </h3>

            <div className="text-gray-700 mb-4 leading-relaxed">
              <LaTeXRenderer content={step.content} />
            </div>

            <button
              onClick={() => handleGetExplanation(step.id)}
              disabled={loadingExplanations.has(step.id)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingExplanations.has(step.id) ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <HelpCircle className="h-4 w-4" />
              )}
              {explanations.has(step.id)
                ? expandedExplanations.has(step.id)
                  ? "Hide explanation"
                  : "Show explanation"
                : "Get detailed explanation"}
            </button>

            {expandedExplanations.has(step.id) && explanations.has(step.id) && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-900 mb-2">
                    Why This Way?
                  </h4>
                  <div className="text-gray-700 leading-relaxed">
                    <LaTeXRenderer
                      content={explanations.get(step.id)!.why_this_way}
                    />
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    Key Concepts
                  </h4>
                  <div className="text-gray-700 leading-relaxed">
                    <LaTeXRenderer
                      content={explanations.get(step.id)!.key_concepts}
                    />
                  </div>
                </div>
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
  );
}
