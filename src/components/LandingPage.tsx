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
      <section className="bg-gradient-to-b from-pink-50 to-white pt-8 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1659391542239-9648f307c0b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwdGVjaG5pY2lhbiUyMG1hbmljdXJlJTIwc2Fsb258ZW58MXx8fHwxNzcwOTI0Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Nail technician at work"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50/90 to-white/95"></div>
        </div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm mb-6">
            <Clock className="w-4 h-4" />
            2-minute quiz • {takenToday} taken today
          </div>

          <h1 className="text-4xl md:text-5xl mb-4 leading-tight">
            Are You Actually Ready To Be A Nail Tech?
          </h1>

          <p className="text-xl text-gray-600 mb-16 leading-relaxed">
            Most aspiring Nail Techs waste $3K–$8K and 6+ months before realizing it
            wasn't the right move. Find out if you're truly career-fit—before
            you invest in Nail School.
          </p>

          <button
            onClick={onStartQuiz}
            className="w-full h-14 text-lg rounded-lg text-white font-semibold bg-gradient-to-r from-pink-700 to-purple-700
             hover:from-pink-700 hover:to-purple-700 mb-4"
          >
            Start MyFree Quiz Now
          </button>

          <p className="text-sm text-gray-500 mb-2">
            Get instant results + personalized roadmap
          </p>
          <p className="text-sm text-gray-500 mb-6">
            100% free • No credit card • Results in 90 seconds
          </p>
        </div>
      </section>

      <section className="py-1 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onRealityBreakdown}
            className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-4 rounded-lg transition-colors text-lg mb-1.5"
          >
            Access The Free Reality Breakdown
          </button>
          <p className="text-center text-gray-600 text-sm mb-2">
            Get the truth about nail school before taking the full quiz
          </p>
        </div>
      </section>

      <section className="py-4 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl mb-3 text-center">
            The Hard Truth About Nail School
          </h2>

          <div className="space-y-2 mb-8">
            <div className="bg-white p-5 rounded-lg border-l-4 border-red-400">
              <p className="text-gray-700">
                <span className="font-semibold">38% of students drop out</span>{" "}
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

          <p className="text-center text-lg text-gray-700 mb-3">
            This isn't about scaring you. It's about making sure you go in{" "}
            <span className="font-semibold">prepared to win</span>.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 justify-center mb-3">
            <Sparkles className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl md:text-3xl text-center">
              What You Get Free
            </h2>
          </div>

          <p className="text-center text-gray-600 mb-8">
            After completing the 2-minute quiz:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Your Career Fitness Score
                </h3>
                <p className="text-gray-600">
                  Find out if you're in the Ready, Almost Ready, or Not Yet zone
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-2 border-pink-200">
              <Gift className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1 text-pink-900">
                  BONUS: Personalized Next Steps
                </h3>
                <p className="text-gray-700">
                  Custom action plan based on YOUR situation, not generic advice
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border-2 border-pink-200">
              <Gift className="w-6 h-6 text-pink-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-1 text-pink-900">
                  BONUS: Master Nail Technician Training Curriculum
                </h3>
                <p className="text-gray-700">
                  Know exactly what to expect in nail school before your first day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quiz-unlock"
        className="py-12 px-4 bg-gradient-to-b from-pink-50 to-purple-50"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Take the Quiz Now</h2>

          <p className="text-lg text-gray-700 mb-8">
            Answer 12 quick questions. Get clarity in 90 seconds.
          </p>

          <button
            onClick={onStartQuiz}
            className="w-full h-14 text-lg rounded-lg text-white font-semibold bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-700 hover:to-purple-700 mb-4"
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
            2 minutes now could save you thousands of dollars and months of
            uncertainty.
          </p>

          <button
            onClick={onStartQuiz}
            className="w-full h-14 text-lg rounded-lg bg-white mb-6 active:scale-95 transition-transform font-semibold"
            style={{ color: "#A78BCC" }}
          >
            Begin My Nail Tech Journey
          </button>

          <p className="text-lg text-purple-100">
            Join 12,000+ people who took control of their career path
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