"use client";

import { useState, useEffect, useCallback, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { QuestionCard } from "@/components/ui/QuestionCard";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link";

type Question = {
  id: string;
  topic: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

export default function PracticeTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = use(params);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ attempted: 0, correct: 0 });

  const topicLabel =
    topic === "all"
      ? "All Topics"
      : topic.charAt(0).toUpperCase() + topic.slice(1);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();

    let query = supabase.from("questions").select("*");

    if (topic !== "all") {
      query = query.eq("topic", topic);
    }

    const { data, error } = await query;

    if (data && !error) {
      // Shuffle
      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setCurrentIndex(0);
      setStats({ attempted: 0, correct: 0 });
    }
    setLoading(false);
  }, [topic]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = (_selectedIndex: number, isCorrect: boolean) => {
    setStats((prev) => ({
      attempted: prev.attempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          No questions available
        </h2>
        <p className="text-gray-500 mb-4">
          Make sure you&apos;ve seeded the database with questions.
        </p>
        <Link href="/practice" className="text-blue-600 hover:underline">
          ← Back to topics
        </Link>
      </div>
    );
  }

  const isComplete = currentIndex >= questions.length - 1 && stats.attempted > 0 && stats.attempted >= questions.length;

  if (isComplete) {
    const accuracy =
      stats.attempted > 0
        ? Math.round((stats.correct / stats.attempted) * 100)
        : 0;

    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Practice Complete!
          </h2>
          <p className="text-gray-500 mb-6">
            You answered {stats.correct} out of {stats.attempted} correctly
          </p>

          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-blue-50 mb-6">
            <span className="text-3xl font-bold text-blue-700">
              {accuracy}%
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={fetchQuestions}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Practice Again
            </button>
            <Link
              href="/practice"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Choose Topic
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/practice"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Topics
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">
            ✅ {stats.correct}/{stats.attempted}
          </span>
          <span className="font-medium text-gray-700">{topicLabel}</span>
        </div>
      </div>

      <QuestionCard
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        questionText={q.question_text}
        options={q.options}
        correctAnswer={q.correct_answer}
        explanation={q.explanation}
        showFeedback={true}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
