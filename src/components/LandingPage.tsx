import { Sparkles, CheckCircle2, Clock, Gift } from "lucide-react";

type LandingPageProps = {
  takenToday: number;
  bonusSpots: number;
  onStartQuiz: () => void;
  onRealityBreakdown?: () => void;
};

export default function LandingPage({
  takenToday,
  bonusSpots,
  onStartQuiz,
  onRealityBreakdown,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">

<section className="bg-gradient-to-b from-pink-50 to-white py-16 md:py-20 px-4 relative overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwdGVjaG5pY2lhbiUyMG1hbmljdXJlJTIwc2Fsb258ZW58MXx8fHwxNzcwOTI0Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      alt="Nail technician at work"
      className="w-full h-full object-cover opacity-10"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-pink-50/95 via-white/95 to-white"></div>
  </div>

  {/* Hero Content */}
  <div className="max-w-6xl mx-auto relative z-10">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT SIDE — Main Message */}
      <div className="text-center md:text-left">

        {/* Quiz Badge */}
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Clock className="w-4 h-4" />
          90-second quiz • {takenToday} taken today
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Are You Actually Ready
          <span className="block text-pink-600">
            To Be A Nail Tech?
          </span>
        </h1>

        {/* Main Description */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 max-w-xl mx-auto md:mx-0">
        Most aspiring nail technicians spend $3K–$8K and 6+ months before realizing it wasn't the right move.
        </p>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0">
         Do you think you've got what it takes? Take the 90-second quiz and find out.
        </p>

        {/* Benefits */}
        <div className="space-y-3 mb-8 max-w-md mx-auto md:mx-0 text-left">

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <span className="text-gray-700">
              Get your personalized readiness score
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <span className="text-gray-700">
              Discover your next career steps
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <span className="text-gray-700">
              Get a preview of what nail school is really like
            </span>
          </div>

        </div>

        {/* CTA Button */}
        <button
          onClick={onStartQuiz}
          className="w-full md:w-auto px-10 h-14 text-lg rounded-xl text-white font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
        >
          Take the Career Fitness Quiz →
        </button>

        {/* Trust / Reassurance */}
        <div className="mt-5 flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-4 text-sm text-gray-500">
          <span>✓ 100% free</span>
          <span>✓ No credit card required</span>
          <span>✓ Results in 90 seconds</span>
        </div>

      </div>


      {/* RIGHT SIDE — Visual */}
      <div className="relative flex justify-center">

        {/* Main Image Card */}
        <div className="relative w-full max-w-lg">

          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwdGVjaG5pY2lhbiUyMG1hbmljdXJlJTIwc2Fsb258ZW58MXx8fHwxNzcwOTI0Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional nail technician providing a manicure"
              className="w-full h-[420px] object-cover"
            />
          </div>

          {/* Floating Quiz Card */}
          <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-5 max-w-[250px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-xl">💅</span>
              </div>

              <div>
                <p className="font-bold text-gray-900">
                  Career Fitness
                </p>
                <p className="text-sm text-gray-500">
                  Assessment
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Find out if you're ready before investing in nail school.
            </p>
          </div>

          {/* Small Floating Badge */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg px-5 py-3">
            <p className="text-sm font-semibold text-pink-600">
              90 seconds
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>
</section>

      <section className="py-4 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl mb-3 text-center">
            The Reality of Becoming a Nail Tech
          </h2>
          <h3 className="text-xl text-gray-600 mb-6 text-center">
  A quick snapshot of the hidden truths of nail tech life—from emotional labor and licensing requirements to lifestyle impact and physical demands—before you commit to nail school.
</h3>

          <div className="space-y-2 mb-8">
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-700">
                <span className="font-semibold">38% of students drop out of Nail School </span>{" "}
                before finishing their license hours
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-700">
                <span className="font-semibold">
                  Many struggle to book clients
                </span>{" "}
                their first 6–12 months, even with a license
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-700">
                <span className="font-semibold">Burnout hits fast</span> when
                you're not mentally or financially prepared
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="text-center text-lg text-gray-700 font-medium mb-4">
  This isn't about scaring you. It's about making sure you go in prepared to Win.
</p>

      <section className="py-1 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onRealityBreakdown}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 rounded-lg transition-colors text-lg mb-1.5"
          >
            Access The Free Reality Breakdown
          </button>
        </div>
      </section>

      <div className="py-6 px-4">
  <p className="text-center text-xl text-gray-700 max-w-2xl mx-auto">
    Discover the hidden truths about nail tech life—from emotional labor and
    licensing requirements to lifestyle impact and physical demands—before you
    commit to nail school.
  </p>

  <div className="text-center mt-4">
    <a
      href="/reality-breakdown"
   className="font-semibold text-pink-600 transition-opacity duration-1000 animate-pulse"
    >
    FREE REALITY BREAKDOWN →
    </a>
  </div>
</div>

      <section
        id="quiz-unlock"
        className="py-12 px-4 bg-gradient-to-b from-pink-50 to-purple-50"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Take the Quiz Now</h2>

          <p className="text-lg text-gray-700 mb-8">
            Answer 12 quick questions and gain clarity in 90 seconds.
          </p>

          <button
            onClick={onStartQuiz}
            className="w-full h-14 text-lg rounded-lg text-white font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-600 hover:to-purple-600 mb-4"
          >
            Get My Free Results
          </button>

          <p className="text-sm text-gray-600 mb-6">
            Your info is safe. We respect your privacy. Unsubscribe anytime.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500 mb-2">⚡ LIMITED TIME</p>
            <p className="text-gray-700">
              Free personalized roadmap + cost breakdown available only for the
              next{" "}
              <span className="font-semibold text-pink-600">
                {bonusSpots} quiz takers
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-center text-xl mb-8 text-gray-600">
            What Others Are Saying
          </h3>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                "This literally saved me from making a $5K mistake. I thought I
                was ready but the quiz showed me I needed to save more first."
              </p>
              <p className="text-sm font-medium">— Jasmine, 23, Atlanta</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                "I scored Ready and it gave me so much confidence. Enrolled 2
                weeks later and I'm so glad I went for it."
              </p>
              <p className="text-sm font-medium">— Maria, 26, Houston</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-3">
                "Honestly didn't expect much from a free quiz but wow. Knowing
                the real costs upfront changed everything for me."
              </p>
              <p className="text-sm font-medium">— Keyanna, 21, Phoenix</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-purple-600 to-pink-600 text-white">
  <div className="max-w-xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl mb-4">
      Get Clarity Before You Commit
    </h2>

    <p className="text-xl mb-8 text-purple-100">
      90 Seconds now could save you thousands of dollars and months of
      uncertainty.
    </p>

    <style>{`
      @keyframes textPulse {
        0%, 100% {
          opacity: 0.70;
        }
        50% {
          opacity: 1;
        }
      }
    `}</style>

    <button
      onClick={onStartQuiz}
      className="w-full h-14 text-lg rounded-lg mb-6 font-bold active:scale-95 transition-transform"
      style={{
        color: "#BE185D",
        background:
          "linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 50%, #FBCFE8 100%)",
        animation: "textPulse 1.6s ease-in-out infinite",
      }}
    >
      Begin My Nail Tech Journey
    </button>

    <p className="text-lg text-purple-100">
      Join 12,000+ people who took control of their Nail Tech career
    </p>
  </div>
</section>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:hidden z-50">
        <button
          onClick={() =>
            document
              .getElementById("quiz-unlock")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-full h-12 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold"
        >
          Get My Free Career Score
        </button>
      </div>
    </div>
  );
}