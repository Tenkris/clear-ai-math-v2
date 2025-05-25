import { SolutionSteps } from "@/components/solution-steps";
import { BackButton } from "@/components/back-button";
import { UploadedImage } from "@/components/uploaded-image";
import { QuestionUnderstanding } from "@/components/question-understanding";
import { SolvingStrategy } from "@/components/solving-strategy";

interface SolutionPageProps {
  params: {
    question_id: string;
  };
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const { question_id } = params;

  // Mock data - in a real app, this would come from the uploaded image analysis
  // In the future, you can use the question_id to fetch specific solution data
  const solutionData = {
    questionUnderstanding:
      "This question asks to solve the given equation x² - 5x + 6 = 0. This involves finding the values of x that make the equation true by using factoring methods.",
    solvingStrategy:
      "We can solve the equation using factoring operations. We'll look for two numbers that multiply to give the constant term and add to give the coefficient of x.",
    steps: [
      {
        id: 1,
        title: "Identify the quadratic equation",
        content:
          "We have the equation x² - 5x + 6 = 0. This is a quadratic equation in standard form ax² + bx + c = 0, where a = 1, b = -5, and c = 6.",
        workShown: "x² - 5x + 6 = 0",
        detailedExplanation:
          "A quadratic equation is any equation that can be written in the form ax² + bx + c = 0, where a, b, and c are constants and a ≠ 0. The highest power of the variable is 2, which makes it a second-degree polynomial equation.",
      },
      {
        id: 2,
        title: "Factor the quadratic expression",
        content:
          "Look for two numbers that multiply to give 6 (the constant term) and add to give -5 (the coefficient of x). These numbers are -2 and -3.",
        workShown: "x² - 5x + 6 = (x - 2)(x - 3)",
        detailedExplanation:
          "To factor x² - 5x + 6, we need two numbers that multiply to 6 and add to -5. Let's list the factor pairs of 6: (1,6), (2,3), (-1,-6), (-2,-3). Checking which pair adds to -5: (-2) + (-3) = -5 ✓. So we can write x² - 5x + 6 = (x - 2)(x - 3).",
      },
      {
        id: 3,
        title: "Apply the zero product property",
        content:
          "If (x - 2)(x - 3) = 0, then either (x - 2) = 0 or (x - 3) = 0.",
        workShown: "(x - 2) = 0  or  (x - 3) = 0",
        detailedExplanation:
          "The zero product property states that if the product of two factors equals zero, then at least one of the factors must equal zero. This is because the only way to get a product of zero is if one or more of the factors is zero.",
      },
      {
        id: 4,
        title: "Solve for x",
        content: "Solve each equation separately to find the values of x.",
        workShown: "x - 2 = 0  →  x = 2\nx - 3 = 0  →  x = 3",
        detailedExplanation:
          "From x - 2 = 0, we add 2 to both sides to get x = 2. From x - 3 = 0, we add 3 to both sides to get x = 3. These are our two solutions.",
      },
      {
        id: 5,
        title: "Verify the solutions",
        content:
          "Substitute each solution back into the original equation to verify they are correct.",
        workShown:
          "For x = 2: (2)² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓\nFor x = 3: (3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓",
        detailedExplanation:
          "Verification is an important step to ensure our solutions are correct. We substitute each value back into the original equation. If the left side equals the right side (0 in this case), then our solution is correct.",
      },
    ],
  };

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
              content={solutionData.questionUnderstanding}
            />
            <SolvingStrategy content={solutionData.solvingStrategy} />

            {/* Mobile: Show image here */}
            <div className="lg:hidden">
              <UploadedImage />
            </div>

            <SolutionSteps steps={solutionData.steps} />
          </div>

          {/* Right Column - Uploaded Image (Desktop only) */}
          <div className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
            <UploadedImage />
          </div>
        </div>
      </main>
    </div>
  );
}
