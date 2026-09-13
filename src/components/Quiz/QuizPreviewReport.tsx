import { useState } from "react";
import "./QuizDesign.css";
import "./QuizPreviewReport.css";
import { PreviewReport, isValidEmail } from "./quizPreview";

interface QuizPreviewReportProps {
  preview: PreviewReport;
  onUnlock: (email: string) => void;
  brandName?: string;
  isSubmitting?: boolean;
  submitError?: string;
}

export function QuizPreviewReport({
  preview,
  onUnlock,
  brandName = "Nail Tech Readiness Quiz",
  isSubmitting = false,
  submitError,
}: QuizPreviewReportProps) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const {
    percentage,
    bandName,
    headline,
    revealedSection,
    lockedSections,
    criticalFlags,
    advisoryFlagCount,
  } = preview;

  const showError = touched && !isValidEmail(email);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (isValidEmail(email)) {
      onUnlock(email.trim());
    }
  }

  const unlockedInsightCount = 1 + lockedSections.length; // revealed section + locked ones
  const totalFlagCount = criticalFlags.length + advisoryFlagCount;

  return (
    <div className="quiz-design">
      <div className="quiz-design__results">
        <header className="quiz-design__results-header">
          <div className="quiz-design__score">
            <span className="quiz-design__score-number">{percentage}%</span>
            <span className="quiz-design__score-label">score</span>
          </div>

          <div className="quiz-design__band">{bandName}</div>

          <div className="quiz-design__results-headline">{headline}</div>
        </header>

        <main className="quiz-design__results-body">
          {/* ── Revealed section (the one real, specific insight given for free) ── */}
          <h2 className="quiz-design__results-title">Your Biggest Gap Right Now</h2>

          <div className="quiz-design__section-result">
            <div className="quiz-design__section-top">
              <div className="quiz-design__section-name">
                <span className="quiz-design__section-dot" style={{ background: revealedSection.color }} />
                {revealedSection.title}
              </div>
              <span className="quiz-design__section-percentage">{revealedSection.percentage}%</span>
            </div>

            <div className="quiz-design__bar">
              <div
                className="quiz-design__bar-fill"
                style={{ width: `${revealedSection.percentage}%`, background: revealedSection.color }}
              />
            </div>

            <div className="quiz-design__section-bottom">
              <div className="quiz-design__section-description">{revealedSection.description}</div>
              <span
                className="quiz-design__pill"
                style={{ background: revealedSection.lightColor, color: revealedSection.color }}
              >
                {revealedSection.band}
              </span>
            </div>
          </div>

          {/* ── Critical flags shown in full — safety/legal issues aren't gated ── */}
          {criticalFlags.length > 0 && (
            <section className="quiz-design__flags">
              <h2 className="quiz-design__results-title">Important — Read This First</h2>
              {criticalFlags.map((flag, index) => (
                <div key={index} className="quiz-design__flag quiz-design__flag--critical">
                  <div className="quiz-design__flag-title" style={{ color: "#be123c" }}>
                    Important Consideration
                  </div>
                  <div className="quiz-design__flag-message">{flag.message}</div>
                  {flag.remedy && (
                    <div className="quiz-design__flag-remedy">
                      <strong>What to do:</strong> {flag.remedy}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* ── Locked sections — proof there's more, specific to them ── */}
          <div style={{ marginTop: "28px" }}>
            <h2 className="quiz-design__results-title">The Rest of Your Report Is Ready</h2>
            {lockedSections.map((section) => (
              <div key={section.id} className="quiz-preview__locked-section">
                <span className="quiz-preview__locked-dot" style={{ background: section.color }} />
                <span className="quiz-preview__locked-title">{section.title}</span>
                <span className="quiz-preview__locked-badge">🔒 Locked</span>
              </div>
            ))}
            {advisoryFlagCount > 0 && (
              <p className="quiz-preview__unlock-line">
                +{advisoryFlagCount} more personalized insight{advisoryFlagCount === 1 ? "" : "s"} waiting in your full report
              </p>
            )}
          </div>

          {/* ── Email gate ── */}
          <div className="quiz-preview__gate">
            <div className="quiz-preview__gate-title">Get Your Full Personalized Report</div>

            <ul className="quiz-preview__value-list">
              <li className="quiz-preview__value-item">
                <span className="quiz-preview__value-check">✓</span>
                Your real scores across all {unlockedInsightCount} readiness areas, not just this one
              </li>
              <li className="quiz-preview__value-item">
                <span className="quiz-preview__value-check">✓</span>
                {totalFlagCount > 0
                  ? `Every flagged concern (${totalFlagCount} total) with exactly what to do about each one`
                  : "A full breakdown of what's working and what to strengthen next"}
              </li>
              <li className="quiz-preview__value-item">
                <span className="quiz-preview__value-check">✓</span>
                A specific, step-by-step action plan built around your weakest area
              </li>
            </ul>

            <form className="quiz-preview__form" onSubmit={handleSubmit}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`quiz-preview__input${showError ? " has-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                disabled={isSubmitting}
              />
              {showError && <div className="quiz-preview__input-error">Enter a valid email to unlock your report.</div>}
              {submitError && <div className="quiz-preview__input-error">{submitError}</div>}

              <button type="submit" className="quiz-preview__submit" disabled={isSubmitting}>
                {isSubmitting ? "Unlocking..." : "Unlock My Full Report →"}
              </button>
            </form>

            <div className="quiz-preview__gate-note">
              No spam — just your report and occasional relevant guidance. Unsubscribe anytime.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
