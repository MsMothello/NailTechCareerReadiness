import { ArrowLeft } from "lucide-react";
import { NEXT_STEPS } from "./Quiz";

interface SectionResult {
  id: string;
  title: string;
  color: string;
  pct: number;
  band: { label: string; color: string; bg: string };
  insight: { title: string; body: string };
}

interface Flag {
  code: string;
  level: string;
  message: string;
  remedy: string[];
}

interface DetailedReportResults {
  pct: number;
  band: { label: string; sub: string; color: string; bg: string };
  headline: string;
  diagnostic: string[];
  sectionResults: SectionResult[];
  triggeredFlags: Flag[];
  bestSection: SectionResult;
  worstSection: SectionResult;
}

interface DetailedReportProps {
  results: DetailedReportResults | null;
  email?: string | null;
  onBack: () => void;
}

export default function DetailedReport({ results, email, onBack }: DetailedReportProps) {
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-600">
            No results to report yet — take the quiz first.
          </div>
        </div>
      </div>
    );
  }

  const { pct, band, headline, diagnostic, sectionResults, triggeredFlags, bestSection, worstSection } = results;
  const critFlags = triggeredFlags.filter((f) => f.level === "critical");
  const advFlags = triggeredFlags.filter((f) => f.level === "advisory");
  const orderedFlags = [...critFlags, ...advFlags];
  const steps = NEXT_STEPS[worstSection.id] || NEXT_STEPS.businessAcumen;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-10 text-center">
            <p className="text-xs uppercase tracking-widest text-white/70 mb-2">
              Nail Tech Readiness Quiz
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Detailed Report</h1>
            {email && (
              <p className="text-white/80 text-sm mt-3">Prepared for {email}</p>
            )}
          </div>

          <div className="p-8 md:p-10 space-y-10">
            {/* Score + band + headline */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div
                className="flex-shrink-0 w-24 h-24 rounded-full flex flex-col items-center justify-center border-2"
                style={{ borderColor: band.color, background: band.bg }}
              >
                <span className="text-2xl font-bold" style={{ color: band.color }}>
                  {pct}%
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: band.color }}>
                  score
                </span>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: band.color }}>
                  {band.label}
                </div>
                <p className="text-xl font-semibold text-gray-900 leading-snug">{headline}</p>
                <p className="text-sm text-gray-500 mt-1">{band.sub}</p>
              </div>
            </div>

            {/* Diagnostic narrative */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Your Diagnostic
              </h2>
              <div className="space-y-3">
                {diagnostic.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section breakdown with full insight */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Section-by-Section Breakdown
              </h2>
              <div className="space-y-4">
                {sectionResults.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-xl p-5 border"
                    style={{ background: `${s.color}0d`, borderColor: `${s.color}33` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="font-semibold text-gray-800 flex-1">{s.title}</span>
                      <span className="text-sm font-bold" style={{ color: s.color }}>
                        {s.pct}%
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{ background: s.band.bg, color: s.band.color }}
                      >
                        {s.band.label}
                      </span>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: s.color }}>
                      {s.insight.title}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.insight.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Strength + gap callouts */}
            <section className="grid sm:grid-cols-2 gap-4">
              <div
                className="rounded-xl p-5 border-l-4"
                style={{ background: `${bestSection.color}0d`, borderLeftColor: bestSection.color }}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: bestSection.color }}>
                  What You're Doing Right
                </div>
                <div className="font-semibold text-gray-900">
                  {bestSection.title}: {bestSection.pct}%
                </div>
                <p className="text-sm font-medium mt-1" style={{ color: bestSection.color }}>
                  {bestSection.insight.title}
                </p>
              </div>
              <div className="rounded-xl p-5 border-l-4 bg-pink-50" style={{ borderLeftColor: "#db2777" }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-pink-700">
                  Your Most Important Gap
                </div>
                <div className="font-semibold text-gray-900">
                  {worstSection.title}: {worstSection.pct}%
                </div>
                <p className="text-sm font-medium mt-1 text-pink-700">{worstSection.insight.title}</p>
              </div>
            </section>

            {/* Flags + remedies */}
            {orderedFlags.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Advisories
                </h2>
                <div className="space-y-3">
                  {orderedFlags.map((f) => {
                    const isCrit = f.level === "critical";
                    return (
                      <div
                        key={f.code}
                        className="rounded-xl p-5 border"
                        style={{
                          background: isCrit ? "#fff5f5" : "#f5f3ff",
                          borderColor: isCrit ? "#fca5a5" : "#ddd6fe",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: isCrit ? "#ef4444" : "#7c3aed" }}
                          />
                          <span
                            className="text-[10px] font-bold uppercase tracking-wide"
                            style={{ color: isCrit ? "#b91c1c" : "#7c3aed" }}
                          >
                            {isCrit ? "Critical — act on this first" : "Advisory"}
                          </span>
                          <span className="text-[10px] text-gray-400 ml-auto">{f.code}</span>
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isCrit ? "#7f1d1d" : "#4c1d95" }}
                        >
                          {f.message}
                        </p>
                        {f.remedy && f.remedy.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-black/5">
                            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">
                              What to do
                            </div>
                            {f.remedy.map((r, i) => (
                              <div key={i} className="flex gap-2 text-sm text-gray-700 mb-1.5 leading-relaxed">
                                <span className="font-bold flex-shrink-0">→</span>
                                <span>{r}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* All recommended next steps */}
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Recommended Next Steps
              </h2>
              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <button
              onClick={onBack}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
