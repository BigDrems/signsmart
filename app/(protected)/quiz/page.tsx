import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Clock, FileText, ArrowRight, Trophy } from "lucide-react";

export default async function QuizPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: recentAttempts } = await supabase
    .from("quiz_attempts")
    .select("score, total_questions, created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Quiz Time! 📝
        </h1>
        <p className="text-gray-500">
          Test your knowledge with a timed 20-question quiz
        </p>
      </div>

      {/* Quiz Info */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quiz Rules</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-bold text-gray-900">20 Questions</p>
              <p className="text-xs text-gray-500">
                Random from all topics
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
            <Clock className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm font-bold text-gray-900">10 Minutes</p>
              <p className="text-xs text-gray-500">
                Auto-submits when time is up
              </p>
            </div>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-gray-600 mb-6">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Questions are randomly selected from all four MASD topics
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Each question has 4 multiple-choice options
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Your score is saved and visible in the Progress section
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            You can take the quiz as many times as you want
          </li>
        </ul>

        <Link
          href="/quiz/take"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
        >
          Start Quiz
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      {/* Recent attempts */}
      {recentAttempts && recentAttempts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Recent Scores
          </h2>
          <div className="space-y-3">
            {recentAttempts.map((attempt, i) => {
              const pct = Math.round(
                (attempt.score / attempt.total_questions) * 100
              );
              const date = new Date(attempt.created_at).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700">
                      {attempt.score}/{attempt.total_questions}
                    </span>
                    <span
                      className={`text-sm font-bold px-2 py-0.5 rounded-lg ${
                        pct >= 90
                          ? "bg-green-100 text-green-700"
                          : pct >= 70
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
