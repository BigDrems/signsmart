import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Dumbbell,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Learn",
      description:
        "Interactive step-by-step lessons with visual explanations of the MASD mnemonic rules.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Dumbbell,
      title: "Practice",
      description:
        "Guided exercises with instant feedback — no pressure, just learning at your own pace.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: ClipboardCheck,
      title: "Quiz",
      description:
        "Timed quizzes with 20 questions to test your accuracy and build confidence.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      icon: TrendingUp,
      title: "Progress",
      description:
        "Track your improvement over time with detailed charts and performance analytics.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const masdLetters = [
    {
      letter: "M",
      word: "Multiplication",
      rule: "Same signs = Positive\nDifferent signs = Negative",
      color: "bg-red-500",
    },
    {
      letter: "A",
      word: "Addition",
      rule: "Same signs = Add & keep sign\nDifferent signs = Subtract",
      color: "bg-blue-500",
    },
    {
      letter: "S",
      word: "Subtraction",
      rule: "Change to addition\nof the opposite",
      color: "bg-green-500",
    },
    {
      letter: "D",
      word: "Division",
      rule: "Same signs = Positive\nDifferent signs = Negative",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">SignSmart</span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-60" />
          <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-yellow-50 blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-green-50 blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">
              Computer-Based Mnemonic Learning Tool
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Making signs simple.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Making math possible.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
            Master integer sign rules with the{" "}
            <strong className="text-gray-800">MASD mnemonic</strong> —
            Multiplication, Addition, Subtraction, Division. Interactive
            lessons, guided practice, timed quizzes, and progress tracking
            designed for Grade 8 students.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300"
            >
              Start Learning Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-base hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* MASD Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              The MASD Mnemonic
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Remember the integer sign rules with four simple letters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {masdLetters.map((item) => (
              <div
                key={item.letter}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} text-white text-2xl font-extrabold mb-4 shadow-md`}
                >
                  {item.letter}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.word}
                </h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {item.rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything You Need to Master Integer Signs
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Four powerful modules designed to help you learn, practice, and
              master the rules
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bgColor}`}
                    >
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-medium text-white mb-4 leading-relaxed">
            &ldquo;Understand the rule. Apply with confidence.&rdquo;
          </blockquote>
          <p className="text-blue-200 text-sm">
            Math Made Simple. Learning Made Meaningful.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Master Integer Sign Rules?
          </h2>
          <p className="text-gray-600 mb-8">
            Join SignSmart and start improving your math accuracy today.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold text-base hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200"
          >
            Get Started Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">
                SignSmart
              </span>
            </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} TUKLAS: Mathematics and
              Computational Science Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
