import { Zap } from "lucide-react";
import { LaTeXRenderer } from "./latex-renderer";

interface SolvingStrategyProps {
  content: string;
}

export function SolvingStrategy({ content }: SolvingStrategyProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 bg-pink-100 rounded-lg flex items-center justify-center">
          <Zap className="h-5 w-5 text-pink-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Solving Strategy
        </h2>
      </div>
      <div className="text-gray-700 leading-relaxed">
        <LaTeXRenderer content={content} />
      </div>
    </div>
  );
}
