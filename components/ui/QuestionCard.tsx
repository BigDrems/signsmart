"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type QuestionCardProps = {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  showFeedback: boolean;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
};

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  options,
  correctAnswer,
  explanation,
  showFeedback,
  onAnswer,
  onNext,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered && showFeedback) return;
    setSelected(index);
    if (!showFeedback) {
      // Quiz mode: just select, don't show feedback
      onAnswer(index, index === correctAnswer);
    }
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
    onAnswer(selected, selected === correctAnswer);
  };

  const handleNext = () => {
    setSelected(null);
    setAnswered(false);
    onNext();
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="h-2 flex-1 mx-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
          {questionText}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            let optionClass =
              "border-gray-200 hover:border-blue-300 hover:bg-blue-50";

            if (showFeedback && answered) {
              if (index === correctAnswer) {
                optionClass =
                  "border-green-400 bg-green-50 ring-2 ring-green-200";
              } else if (index === selected && !isCorrect) {
                optionClass =
                  "border-red-400 bg-red-50 ring-2 ring-red-200";
              } else {
                optionClass = "border-gray-200 opacity-50";
              }
            } else if (selected === index) {
              optionClass =
                "border-blue-500 bg-blue-50 ring-2 ring-blue-200";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={answered && showFeedback}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${optionClass}`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                    selected === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  } ${
                    showFeedback && answered && index === correctAnswer
                      ? "!bg-green-500 !text-white"
                      : ""
                  } ${
                    showFeedback &&
                    answered &&
                    index === selected &&
                    !isCorrect
                      ? "!bg-red-500 !text-white"
                      : ""
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 font-medium">{option.replace(/^[A-D]\.\s*/, "")}</span>

                {showFeedback && answered && index === correctAnswer && (
                  <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                )}
                {showFeedback &&
                  answered &&
                  index === selected &&
                  !isCorrect && (
                    <XCircle className="ml-auto h-5 w-5 text-red-500" />
                  )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback / Actions */}
      {showFeedback && answered && (
        <div
          className={`rounded-2xl p-4 mb-4 ${
            isCorrect
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span
              className={`font-bold ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}
            >
              {isCorrect ? "Correct! 🎉" : "Not quite! 🤔"}
            </span>
          </div>
          {explanation && (
            <p className="text-sm text-gray-700 ml-7">{explanation}</p>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        {showFeedback && !answered && selected !== null && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Check Answer
          </button>
        )}
        {showFeedback && answered && (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
}
