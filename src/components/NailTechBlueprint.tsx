import { ArrowLeft, CheckCircle } from 'lucide-react';

interface NailTechBlueprintProps {
  onBack: () => void;
}

const included = [
  {
    title: "The Financial Survival Guide",
    body: "Month-by-month ramp-up budget, true startup cost calculator, pricing formula, and the policy scripts that protect your income from day one.",
  },
  {
    title: "The Reality Workbook",
    body: "30 days of structured prep that closes the gap between the career you're imagining and the one you'd actually enter — with real income data and working-tech insights.",
  },
  {
    title: "Client Relations Masterclass",
    body: "Real scripts for enforcing policies, managing difficult appointments, holding professional standards on your worst days, and building the loyal book that sustains a career.",
  },
  {
    title: "Physical Sustainability Playbook",
    body: "The ergonomic setup, PPE protocol, chemical exposure management, and daily self-care disciplines used by techs who stay in this career for decades.",
  },
  {
    title: "School Selection Framework",
    body: "The exact questions to ask before signing anything, red flags to watch for, and a comparison checklist for evaluating every school you're considering.",
  },
  {
    title: "90-Day Pre-Enrolment Roadmap",
    body: "A week-by-week action plan from today to your first day of school — covering financial prep, mindset, research, and the practical steps most candidates skip.",
  },
];

export default function NailTechBlueprint({ onBack }: NailTechBlueprintProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Results
        </button>

        {/* Hero */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-10 text-white text-center">
            <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-3">The Complete Package</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The Nail Tech<br />Success Blueprint
            </h1>
            <p className="text-pink-100 text-base max-w-md mx-auto leading-relaxed">
              Everything the quiz identified you need — in one structured preparation system built specifically for serious nail tech candidates.
            </p>
          </div>

          <div className="px-8 py-8">
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-5">What's Inside</p>
            <div className="space-y-4">
              {included.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-100 px-8 py-8 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="text-center mb-6">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Investment</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">Coming Soon</p>
              <p className="text-gray-500 text-sm">Pricing will be announced shortly — join the waitlist to be notified first.</p>
            </div>

            <button
              disabled
              className="w-full py-4 rounded-xl font-bold text-sm tracking-wide bg-gray-100 text-gray-400 cursor-not-allowed"
            >
              Get Instant Access — Available Soon
            </button>

            <p className="text-center text-gray-400 text-xs mt-3">
              30-day money-back guarantee · Instant digital delivery
            </p>
          </div>
        </div>

        {/* Trust line */}
        <p className="text-center text-gray-400 text-xs">
          Built for candidates who took the readiness quiz and are serious about starting strong.
        </p>
      </div>
    </div>
  );
}
