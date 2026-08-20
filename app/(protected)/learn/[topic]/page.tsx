"use client";

import { useState, use } from "react";
import { getLessonById } from "@/lib/data/lessons";
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen } from "lucide-react";
import Link from "next/link";

export default function LessonPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);
  const lesson = getLessonById(topic);
  const [currentStep, setCurrentStep] = useState(0);

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Topic not found
        </h2>
        <Link href="/learn" className="text-blue-600 hover:underline">
          ← Back to topics
        </Link>
      </div>
    );
  }

  const step = lesson.steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === lesson.steps.length - 1;
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/learn"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Topics
        </Link>
        <span className="text-gray-300">/</span>
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white text-sm font-bold"
            style={{ backgroundColor: lesson.color }}
          >
            {lesson.letter}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {lesson.name}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs font-medium text-gray-500">
          Step {currentStep + 1} of {lesson.steps.length}
        </span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: lesson.color,
            }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Step title */}
        <div
          className="px-6 py-4 border-b border-gray-100"
          style={{ backgroundColor: lesson.bgColor }}
        >
          <h2 className="text-xl font-bold text-gray-900">{step.title}</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Main content */}
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {step.content}
          </div>

          {/* Example */}
          {step.example && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Example
              </p>
              <div className="font-mono text-lg text-gray-900 whitespace-pre-line leading-relaxed">
                {step.example}
              </div>
              {step.exampleAnswer && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {step.exampleAnswer}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Visual */}
          {step.visual === "sign-chart" && (
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Sign Chart
              </p>
              <div className="grid grid-cols-3 gap-0 text-center text-sm font-medium">
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-tl-lg" />
                <div className="p-2 bg-gray-50 border border-gray-200 font-bold text-blue-700">
                  + (Positive)
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-tr-lg font-bold text-red-700">
                  − (Negative)
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 font-bold text-blue-700">
                  + (Positive)
                </div>
                <div className="p-2 border border-gray-200 text-green-700 bg-green-50 font-bold">
                  + ✓
                </div>
                <div className="p-2 border border-gray-200 text-red-700 bg-red-50 font-bold">
                  − ✗
                </div>
                <div className="p-2 bg-gray-50 border border-gray-200 rounded-bl-lg font-bold text-red-700">
                  − (Negative)
                </div>
                <div className="p-2 border border-gray-200 text-red-700 bg-red-50 font-bold">
                  − ✗
                </div>
                <div className="p-2 border border-gray-200 rounded-br-lg text-green-700 bg-green-50 font-bold">
                  + ✓
                </div>
              </div>
            </div>
          )}

          {step.visual === "number-line" && (
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Number Line
              </p>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="h-0.5 bg-gray-400 w-full" />
                  <div className="flex justify-between mt-2">
                    {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="flex flex-col items-center">
                        <div className="h-2 w-0.5 bg-gray-400 -mt-2.5" />
                        <span
                          className={`text-xs mt-1 font-medium ${
                            n === 0
                              ? "text-blue-600 font-bold"
                              : n < 0
                              ? "text-red-500"
                              : "text-green-600"
                          }`}
                        >
                          {n}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-[10px]">
                    <span className="text-red-500 font-medium">
                      ← Negative
                    </span>
                    <span className="text-green-600 font-medium">
                      Positive →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Rule */}
          <div
            className="rounded-xl p-4 border-2"
            style={{
              borderColor: lesson.color + "40",
              backgroundColor: lesson.bgColor,
            }}
          >
            <div className="flex items-start gap-2.5">
              <BookOpen
                className="h-5 w-5 mt-0.5 shrink-0"
                style={{ color: lesson.color }}
              />
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: lesson.color }}
                >
                  Key Rule
                </p>
                <p className="text-sm font-medium text-gray-800 whitespace-pre-line">
                  {step.keyRule}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={isFirst}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {lesson.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? "w-6"
                  : i < currentStep
                  ? "w-2 opacity-60"
                  : "w-2 opacity-30"
              }`}
              style={{ backgroundColor: lesson.color }}
            />
          ))}
        </div>

        {isLast ? (
          <Link
            href="/practice"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors shadow-sm"
            style={{ backgroundColor: lesson.color }}
          >
            <CheckCircle className="h-4 w-4" />
            Start Practice
          </Link>
        ) : (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors shadow-sm"
            style={{ backgroundColor: lesson.color }}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
