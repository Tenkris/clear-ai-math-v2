import { SolutionSteps } from "@/components/solution-steps";
import { BackButton } from "@/components/back-button";
import { UploadedImage } from "@/components/uploaded-image";
import { QuestionUnderstanding } from "@/components/question-understanding";
import { SolvingStrategy } from "@/components/solving-strategy";
import { notFound } from "next/navigation";

interface SolutionPageProps {
  params: {
    question_id: string;
  };
}

interface ApiQuestionResponse {
  question_id: string;
  question_understanding: string;
  solving_strategy: string;
  solution_steps: string[];
  conversations: string[];
  image_s3: string;
  created_at: string;
  updated_at: string;
}

interface Step {
  id: number;
  content: string;
}

const fetchQuestionData = async (
  questionId: string
): Promise<ApiQuestionResponse> => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/question/${questionId}`,
      {
        headers: {
          accept: "application/json",
        },
        cache: "no-store", // Ensure fresh data on each request
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch question data: ${response.statusText}`);
    }

    const data: ApiQuestionResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching question data:", error);
    throw error;
  }
};

const transformSolutionSteps = (steps: string[]): Step[] => {
  return steps.map((step, index) => {
    // Check if step starts with "Step n:" pattern and remove it
    const stepPrefixMatch = step.match(/^Step\s+(\d+):\s*([\s\S]*)$/);

    let cleanedContent = step;

    if (stepPrefixMatch) {
      // Extract the content after "Step n:" and use it as the full content
      cleanedContent = stepPrefixMatch[2].trim();
    }

    return {
      id: index + 1,
      content: cleanedContent,
    };
  });
};

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { question_id } = params;

  let questionData: ApiQuestionResponse;

  try {
    questionData = await fetchQuestionData(question_id);
  } catch (error) {
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
          <BackButton />
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 mb-2">
                Error Loading Question
              </h2>
              <p className="text-red-600">
                Failed to load question data. Please check if the question ID is
                correct and try again.
              </p>
              <p className="text-sm text-red-500 mt-2">
                Question ID: {question_id}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const transformedSteps = transformSolutionSteps(questionData.solution_steps);

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
        <BackButton />

        {/* Debug info - can be removed in production */}
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-600">
          Question ID: {question_id}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Analysis and Solution */}
          <div className="space-y-6">
            <QuestionUnderstanding
              content={questionData.question_understanding}
            />
            <SolvingStrategy content={questionData.solving_strategy} />

            {/* Mobile: Show image here */}
            <div className="lg:hidden">
              <UploadedImage imageUrl={questionData.image_s3} />
            </div>

            <SolutionSteps steps={transformedSteps} questionId={question_id} />
          </div>

          {/* Right Column - Uploaded Image (Desktop only) */}
          <div className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <UploadedImage imageUrl={questionData.image_s3} />
          </div>
        </div>
      </main>
    </div>
  );
}
