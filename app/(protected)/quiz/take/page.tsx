"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Timer } from "@/components/ui/Timer";
import { ArrowLeft, Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

type Question = {
  id: string;
  topic: string;
  question_text: string;
  options: string[];
  correct_answer: number;
  explanation: string;
};

type Answer = {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  topic: string;
};

export default function QuizTakePage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [startTime] = useState(Date.now());

  const QUIZ_DURATION = 600; // 10 minutes
  const TOTAL_QUESTIONS = 20;

  useEffect(() => {
    const fetchQuestions = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("questions").select("*");

      if (data) {
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const saveResults = useCallback(
    async (finalAnswers: Answer[]) => {
      if (saving) return;
      setSaving(true);

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const score = finalAnswers.filter((a) => a.isCorrect).length;
      const timeTaken = Math.round((Date.now() - startTime) / 1000);

      // Topic breakdown
      const topicBreakdown: Record<string, number> = {};
      finalAnswers.forEach((a) => {
        if (a.isCorrect) {
          topicBreakdown[a.topic] = (topicBreakdown[a.topic] || 0) + 1;
        }
      });

      // Save attempt
      const { data: attempt } = await supabase
        .from("quiz_attempts")
        .insert({
          user_id: user.id,
          score,
          total_questions: finalAnswers.length,
          time_taken_seconds: timeTaken,
          topic_breakdown: topicBreakdown,
        })
        .select("id")
        .single();

      if (attempt) {
        // Save individual responses
        const responses = finalAnswers.map((a) => ({
          attempt_id: attempt.id,
          question_id: a.questionId,
          selected_answer: a.selectedAnswer,
          is_correct: a.isCorrect,
          topic: a.topic,
        }));

        await supabase.from("quiz_responses").insert(responses);
      }

      setSaving(false);
    },
    [saving, startTime]
  );

  const finishQuiz = useCallback(
    (finalAnswers?: Answer[]) => {
      const answersToSave = finalAnswers || answers;
      setFinished(true);
      saveResults(answersToSave);
    },
    [answers, saveResults]
  );

  const handleTimeUp = useCallback(() => {
    finishQuiz();
  }, [finishQuiz]);

  const handleSelectAnswer = (index: number) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;

    const q = questions[currentIndex];
    const newAnswer: Answer = {
      questionId: q.id,
      selectedAnswer: selected,
      isCorrect: selected === q.correct_answer,
      topic: q.topic,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentIndex === questions.length - 1) {
      finishQuiz(newAnswers);
    } else {
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
          Please seed the database first.
        </p>
        <Link href="/quiz" className="text-blue-600 hover:underline">
          ← Back to Quiz
        </Link>
      </div>
    );
  }

  // Results Screen
  if (finished) {
    const score = answers.filter((a) => a.isCorrect).length;
    const total = answers.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    // Topic stats
    const topicStats: Record<string, { correct: number; total: number }> = {};
    answers.forEach((a) => {
      if (!topicStats[a.topic]) {
        topicStats[a.topic] = { correct: 0, total: 0 };
      }
      topicStats[a.topic].total++;
      if (a.isCorrect) topicStats[a.topic].correct++;
    });

    const category =
      pct >= 90
        ? { label: "Excellent", emoji: "🏆", color: "text-green-700", bg: "bg-green-50" }
        : pct >= 70
        ? { label: "Good", emoji: "⭐", color: "text-blue-700", bg: "bg-blue-50" }
        : { label: "Needs Improvement", emoji: "💪", color: "text-amber-700", bg: "bg-amber-50" };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="text-5xl mb-3">{category.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Quiz Complete!
          </h2>
          <p className={`text-sm font-medium ${category.color} mb-6`}>
            {category.label}
          </p>

          {/* Score circle */}
          <div className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-blue-50 border-4 border-blue-200 mb-6">
            <div>
              <span className="text-3xl font-extrabold text-blue-700">
                {score}
              </span>
              <span className="text-lg text-blue-400">/{total}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-bold text-gray-900">{pct}%</p>
              <p className="text-gray-500">Accuracy</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <p className="font-bold text-gray-900">
                {minutes}m {seconds}s
              </p>
              <p className="text-gray-500">Time Taken</p>
            </div>
          </div>

          {/* Topic breakdown */}
          <div className="text-left mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Per-Topic Breakdown
            </h3>
            <div className="space-y-2">
              {Object.entries(topicStats).map(([topic, stats]) => {
                const topicPct = Math.round(
                  (stats.correct / stats.total) * 100
                );
                return (
                  <div
                    key={topic}
                    className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {topic}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {stats.correct}/{stats.total}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          topicPct >= 80
                            ? "bg-green-100 text-green-700"
                            : topicPct >= 60
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {topicPct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question review */}
          <div className="text-left mb-6">
            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Answer Review
            </h3>
            <div className="grid grid-cols-10 gap-1.5">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center h-8 w-8 rounded-lg text-xs font-bold ${
                    a.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  title={`Q${i + 1}: ${a.isCorrect ? "Correct" : "Wrong"}`}
                >
                  {a.isCorrect ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/quiz/take"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Link>
            <Link
              href="/progress"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              View Progress
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz
  const q = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
        <Timer totalSeconds={QUIZ_DURATION} onTimeUp={handleTimeUp} />
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center">
          {q.question_text}
        </h3>
        <p className="text-xs text-center text-gray-400 mb-6 capitalize">
          Topic: {q.topic}
        </p>

        <div className="space-y-3 mb-6">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                selected === index
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  selected === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-gray-800 font-medium">
                {option.replace(/^[A-D]\.\s*/, "")}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-40 disabled:pointer-events-none"
          >
            {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
