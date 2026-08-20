import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  BookOpen,
  Dumbbell,
  ClipboardCheck,
  TrendingUp,
  Trophy,
  Target,
  Flame,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user?.id)
    .single();

  // Get quiz stats
  const { data: quizAttempts } = await supabase
    .from("quiz_attempts")
    .select("score, total_questions, created_at")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  const totalQuizzes = quizAttempts?.length ?? 0;
  const totalCorrect =
    quizAttempts?.reduce((sum, a) => sum + a.score, 0) ?? 0;
  const totalQuestions =
    quizAttempts?.reduce((sum, a) => sum + a.total_questions, 0) ?? 0;
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const latestScore = quizAttempts?.[0]?.score ?? null;
  const latestTotal = quizAttempts?.[0]?.total_questions ?? null;

  const displayName =
    profile?.display_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Student";
  const firstName = displayName.split(" ")[0];

  const modules = [
    {
      href: "/learn",
      icon: BookOpen,
      title: "Learn",
      description:
        "Interactive lessons on the MASD mnemonic — Multiplication, Addition, Subtraction, Division",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      href: "/practice",
      icon: Dumbbell,
      title: "Practice",
      description:
        "Answer questions at your own pace with instant feedback and explanations",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      href: "/quiz",
      icon: ClipboardCheck,
      title: "Quiz",
      description:
        "Take timed 20-question quizzes to test your accuracy and speed",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      href: "/progress",
      icon: TrendingUp,
      title: "Progress",
      description:
        "Track your performance over time with charts and detailed analytics",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Hello, {firstName}! 👋
        </h1>
        <p className="text-gray-500">
          {totalQuizzes > 0
            ? "Welcome back! Keep up the great work."
            : "Welcome to SignSmart! Start with the Learn module to begin."}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
            <p className="text-xs text-gray-500 font-medium">Quizzes Taken</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {overallAccuracy}%
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Overall Accuracy
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
            <Flame className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {latestScore !== null ? `${latestScore}/${latestTotal}` : "—"}
            </p>
            <p className="text-xs text-gray-500 font-medium">Latest Score</p>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Learning Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <Link
              key={mod.href}
              href={mod.href}
              className={`group bg-white rounded-2xl border ${mod.borderColor} p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${mod.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`h-6 w-6 ${mod.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Motivational message */}
      {totalQuizzes > 0 && (
        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <p className="text-sm font-medium text-blue-800">
            {overallAccuracy >= 90
              ? "🏆 Excellent! You're a Sign Rules Master! Keep it up!"
              : overallAccuracy >= 70
              ? "⭐ Great job! You're doing well. A bit more practice and you'll be excellent!"
              : overallAccuracy >= 50
              ? "💪 Good progress! Review the lessons and keep practicing to improve."
              : "🌟 You're just getting started! Head to the Learn module and take your time."}
          </p>
        </div>
      )}
    </div>
  );
}
