"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Target,
  Trophy,
  TrendingUp,
  BarChart3,
  Loader2,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

type QuizAttempt = {
  id: string;
  score: number;
  total_questions: number;
  time_taken_seconds: number | null;
  topic_breakdown: Record<string, number> | null;
  created_at: string;
};

const topicColors: Record<string, string> = {
  multiplication: "#e74c3c",
  addition: "#3498db",
  subtraction: "#27ae60",
  division: "#f39c12",
};

export default function ProgressPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("quiz_attempts")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });

        if (data) setAttempts(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const totalQuizzes = attempts.length;
  const totalCorrect = attempts.reduce((sum, a) => sum + a.score, 0);
  const totalQuestions = attempts.reduce(
    (sum, a) => sum + a.total_questions,
    0
  );
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const category =
    overallAccuracy >= 90
      ? {
          label: "Excellent",
          emoji: "🏆",
          color: "text-green-700",
          bg: "bg-green-50",
          border: "border-green-200",
        }
      : overallAccuracy >= 70
      ? {
          label: "Good",
          emoji: "⭐",
          color: "text-blue-700",
          bg: "bg-blue-50",
          border: "border-blue-200",
        }
      : overallAccuracy >= 50
      ? {
          label: "Fair",
          emoji: "💪",
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
        }
      : {
          label: "Needs Improvement",
          emoji: "📚",
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
        };

  // Line chart data
  const lineData = attempts.map((a, i) => ({
    name: `Quiz ${i + 1}`,
    score: Math.round((a.score / a.total_questions) * 100),
    date: new Date(a.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  // Topic breakdown across all attempts
  const topicTotals: Record<string, { correct: number; total: number }> = {
    multiplication: { correct: 0, total: 0 },
    addition: { correct: 0, total: 0 },
    subtraction: { correct: 0, total: 0 },
    division: { correct: 0, total: 0 },
  };

  attempts.forEach((a) => {
    if (a.topic_breakdown) {
      Object.entries(a.topic_breakdown).forEach(([topic, correct]) => {
        if (topicTotals[topic]) {
          topicTotals[topic].correct += correct;
        }
      });
    }
    // Estimate total questions per topic (assume equal distribution)
    const perTopic = Math.round(a.total_questions / 4);
    Object.keys(topicTotals).forEach((topic) => {
      topicTotals[topic].total += perTopic;
    });
  });

  const barData = Object.entries(topicTotals).map(([topic, stats]) => ({
    name: topic.charAt(0).toUpperCase() + topic.slice(1),
    topic,
    accuracy:
      stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
  }));

  if (totalQuizzes === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Your Progress 📊
          </h1>
          <p className="text-gray-500">
            Track your performance over time
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            No Quiz Data Yet
          </h2>
          <p className="text-gray-500 mb-4">
            Take your first quiz to start tracking your progress!
          </p>
          <a
            href="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Take a Quiz
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Your Progress 📊
        </h1>
        <p className="text-gray-500">
          Track your performance and improvement over time
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Accuracy */}
        <div
          className={`bg-white rounded-2xl border ${category.border} p-5 text-center`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-500">
              Overall Accuracy
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-1">
            {overallAccuracy}%
          </p>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${category.bg} ${category.color}`}
          >
            {category.emoji} {category.label}
          </span>
        </div>

        {/* Total quizzes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-500">
              Quizzes Taken
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-1">
            {totalQuizzes}
          </p>
          <span className="text-sm text-gray-500">
            {totalCorrect} correct out of {totalQuestions}
          </span>
        </div>

        {/* Best score */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-500">
              Best Score
            </span>
          </div>
          <p className="text-4xl font-extrabold text-gray-900 mb-1">
            {Math.max(...attempts.map((a) => a.score))}/
            {attempts[0]?.total_questions}
          </p>
          <span className="text-sm text-gray-500">
            {Math.round(
              (Math.max(...attempts.map((a) => a.score)) /
                (attempts[0]?.total_questions || 20)) *
                100
            )}
            % accuracy
          </span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Score over time */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Quiz Scores Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, "Score"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-600" />
            Accuracy by Topic
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, "Accuracy"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell
                      key={entry.topic}
                      fill={topicColors[entry.topic] || "#6b7280"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent quiz history */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          Quiz History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2.5 px-3 text-gray-500 font-medium">
                  Date
                </th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">
                  Score
                </th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">
                  Accuracy
                </th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">
                  Time
                </th>
                <th className="text-center py-2.5 px-3 text-gray-500 font-medium">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {[...attempts].reverse().map((a, i) => {
                const pct = Math.round(
                  (a.score / a.total_questions) * 100
                );
                const time = a.time_taken_seconds
                  ? `${Math.floor(a.time_taken_seconds / 60)}m ${
                      a.time_taken_seconds % 60
                    }s`
                  : "—";
                const rating =
                  pct >= 90
                    ? { label: "Excellent", cls: "bg-green-100 text-green-700" }
                    : pct >= 70
                    ? { label: "Good", cls: "bg-blue-100 text-blue-700" }
                    : {
                        label: "Needs Work",
                        cls: "bg-amber-100 text-amber-700",
                      };

                return (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2.5 px-3 text-gray-700">
                      {new Date(a.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2.5 px-3 text-center font-medium text-gray-900">
                      {a.score}/{a.total_questions}
                    </td>
                    <td className="py-2.5 px-3 text-center font-medium text-gray-900">
                      {pct}%
                    </td>
                    <td className="py-2.5 px-3 text-center text-gray-600">
                      {time}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-lg text-xs font-bold ${rating.cls}`}
                      >
                        {rating.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Motivational message */}
      <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <p className="text-sm font-medium text-blue-800">
          {overallAccuracy >= 90
            ? "🏆 Outstanding! You've mastered the integer sign rules. Keep it up!"
            : overallAccuracy >= 70
            ? "⭐ Great progress! You're doing well. A little more practice and you'll be excellent!"
            : overallAccuracy >= 50
            ? "💪 You're improving! Focus on your weakest topics and keep practicing."
            : "📚 Every expert was once a beginner. Review the lessons and keep trying!"}
        </p>
      </div>
    </div>
  );
}
