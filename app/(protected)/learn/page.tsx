import Link from "next/link";
import { lessons } from "@/lib/data/lessons";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Learn the MASD Rules 📚
        </h1>
        <p className="text-gray-500">
          Choose a topic to start your interactive lesson
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.id}`}
            className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white text-2xl font-extrabold shadow-md"
                style={{ backgroundColor: lesson.color }}
              >
                {lesson.letter}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                  {lesson.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">
                  {lesson.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                  <span>{lesson.steps.length} steps</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-8 p-5 rounded-2xl bg-blue-50 border border-blue-100">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800 mb-1">
              Pro Tip
            </p>
            <p className="text-sm text-blue-700">
              Start with <strong>Multiplication (M)</strong> and work your way
              through to <strong>Division (D)</strong>. The rules build on each
              other!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
