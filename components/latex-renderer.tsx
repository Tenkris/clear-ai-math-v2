"use client";

import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface LaTeXRendererProps {
  content: string;
  inline?: boolean;
  className?: string;
}

export const LaTeXRenderer = ({
  content,
  inline = false,
  className = "",
}: LaTeXRendererProps) => {
  // Function to detect and render LaTeX expressions
  const renderContent = (text: string) => {
    // Patterns for LaTeX expressions
    const inlinePattern = /\$([^$]+)\$/g;
    const blockPattern = /\$\$([^$]+)\$\$/g;

    // First handle block math ($$...$$)
    const parts = text.split(blockPattern);
    const elements: (string | React.JSX.Element)[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular text or inline math
        const textPart = parts[i];
        const inlineParts = textPart.split(inlinePattern);

        for (let j = 0; j < inlineParts.length; j++) {
          if (j % 2 === 0) {
            // Regular text
            if (inlineParts[j]) {
              elements.push(inlineParts[j]);
            }
          } else {
            // Inline math
            try {
              elements.push(
                <InlineMath key={`inline-${i}-${j}`} math={inlineParts[j]} />
              );
            } catch (error) {
              console.warn("LaTeX rendering error:", error);
              elements.push(`$${inlineParts[j]}$`);
            }
          }
        }
      } else {
        // Block math
        try {
          elements.push(
            <div key={`block-${i}`} className="my-4">
              <BlockMath math={parts[i]} />
            </div>
          );
        } catch (error) {
          console.warn("LaTeX rendering error:", error);
          elements.push(`$$${parts[i]}$$`);
        }
      }
    }

    return elements;
  };

  if (inline) {
    return <span className={className}>{renderContent(content)}</span>;
  }

  return <div className={className}>{renderContent(content)}</div>;
};
