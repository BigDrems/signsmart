import Link from "next/link";
import { lessons } from "@/lib/data/lessons";
import { ArrowRight, Dumbbell } from "lucide-react";

export default function PracticePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Practice Exercises 💪
        </h1>
        <p className="text-gray-500">
          Choose a topic to practice — no timer, no pressure, just learning!
        </p>
      </div>

      {/* All topics option */}
      <Link
        href="/practice/all"
        className="group block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Dumbbell className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">All Topics</h3>
            <p className="text-sm text-blue-100">
              Practice questions from all four MASD topics mixed together
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-white/70 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Individual topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/practice/${lesson.id}`}
            className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white text-xl font-extrabold shadow-md"
                style={{ backgroundColor: lesson.color }}
              >
                {lesson.letter}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {lesson.name}
                </h3>
                <p className="text-xs text-gray-500">Practice {lesson.name.toLowerCase()} questions</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
