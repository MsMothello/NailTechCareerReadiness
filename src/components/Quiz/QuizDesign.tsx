import React from "react";
import "./QuizDesign.css";

import {
  QuizSection,
  QuizQuestion,
  QuizResults,
  QuizOption,
} from "./quizTypes";

type QuestionScreenProps = {
  question: QuizQuestion;
  section: QuizSection;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onSelectAnswer: (answer: QuizOption) => void;
  onNext: () => void;
  isLastQuestion?: boolean;
  brandName?: string;
};

type ResultsScreenProps = {
  results: QuizResults;
  onPrimaryCTA?: () => void;
  onReportCTA?: () => void;
  onProductCTA?: () => void;
  onRetake?: () => void;
  primaryCTAText?: string;
  reportCTAText?: string;
  productCTAText?: string;
  primaryDescription?: string;
  nextSteps?: string[];
};

/* =========================================================
   QUESTION SCREEN
========================================================= */

export function QuizQuestionScreen({
  question,
  section,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isLastQuestion = false,
  brandName = "Career Readiness Quiz",
}: QuestionScreenProps) {
  const progress =
    ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div
      className="quiz-design"
      style={
        {
          "--section-color": section.color,
          "--section-light": section.lightColor,
        } as React.CSSProperties
      }
    >
      <div className="quiz-design__card">

        <header className="quiz-design__header">

          <div className="quiz-design__brand">
            {brandName}
          </div>

          <div className="quiz-design__progress-track">
            <div
              className="quiz-design__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="quiz-design__meta">
            <span>{section.title}</span>

            <span>
              {questionIndex + 1} / {totalQuestions}
            </span>
          </div>

        </header>

        <main>

          <div className="quiz-design__question">
            {question.question}
          </div>

          <div className="quiz-design__options">

            {question.options.map((option) => {
              const isSelected =
                selectedAnswer === option.letter;

              return (
                <button
                  key={option.letter}
                  type="button"
                  className={`quiz-design__option ${
                    isSelected ? "is-selected" : ""
                  }`}
                  onClick={() =>
                    onSelectAnswer(option)
                  }
                >

                  <span className="quiz-design__option-letter">
                    {option.letter}
                  </span>

                  <span className="quiz-design__option-text">
                    {option.text}
                  </span>

                </button>
              );
            })}

          </div>

        </main>

        <footer className="quiz-design__footer">

          <button
            type="button"
            className="quiz-design__next"
            disabled={!selectedAnswer}
            onClick={onNext}
          >
            {isLastQuestion
              ? "See My Results"
              : "Next"}
          </button>

        </footer>

      </div>
    </div>
  );
}

/* =========================================================
   RESULTS SCREEN
========================================================= */

export function QuizResultsScreen({
  results,
  onPrimaryCTA,
  onReportCTA,
  onProductCTA,
  onRetake,
  primaryCTAText = "Continue →",
  reportCTAText = "Get a Detailed Report →",
  productCTAText = "Explore the Roadmap →",
  primaryDescription = "Use your results to understand where you stand and what to focus on next.",
  nextSteps = [],
}: ResultsScreenProps) {

  const {
    percentage,
    band,
    bandName,
    headline,
    diagnostic,
    sectionResults,
    triggeredFlags,
    worstSection,
    bestSection,
  } = results;

  const criticalFlags =
    triggeredFlags.filter(
      (flag) => flag.type === "critical"
    );

  const advisoryFlags =
    triggeredFlags.filter(
      (flag) => flag.type === "advisory"
    );

  return (
    <div className="quiz-design">

      <div className="quiz-design__results">

        {/* =========================
            RESULTS HEADER
        ========================= */}

        <header className="quiz-design__results-header">

          <div className="quiz-design__score">

            <span className="quiz-design__score-number">
              {percentage}%
            </span>

            <span className="quiz-design__score-label">
              score
            </span>

          </div>

          <div className="quiz-design__band">
            {bandName || band}
          </div>

          <div className="quiz-design__results-headline">
            {headline}
          </div>

        </header>

        {/* =========================
            RESULTS BODY
        ========================= */}

        <main className="quiz-design__results-body">

          {diagnostic && (
            <div className="quiz-design__callout">
              <div className="quiz-design__callout-title">
                Your Overall Readiness
              </div>

              <div className="quiz-design__callout-text">
                {diagnostic}
              </div>
            </div>
          )}

          {/* Section Results */}

          <section style={{ marginTop: "28px" }}>

            <h2 className="quiz-design__results-title">
              Your Section Results
            </h2>

            {sectionResults.map((section) => (
              <div
                key={section.id}
                className="quiz-design__section-result"
              >

                <div className="quiz-design__section-top">

                  <div className="quiz-design__section-name">

                    <span
                      className="quiz-design__section-dot"
                      style={{
                        background: section.color,
                      }}
                    />

                    {section.title}

                  </div>

                  <span className="quiz-design__section-percentage">
                    {section.percentage}%
                  </span>

                </div>

                <div className="quiz-design__bar">

                  <div
                    className="quiz-design__bar-fill"
                    style={{
                      width: `${section.percentage}%`,
                      background: section.color,
                    }}
                  />

                </div>

                <div className="quiz-design__section-bottom">

                  <div className="quiz-design__section-description">
                    {section.description}
                  </div>

                  <span
                    className="quiz-design__pill"
                    style={{
                      background: section.lightColor,
                      color: section.color,
                    }}
                  >
                    {section.band}
                  </span>

                </div>

              </div>
            ))}

          </section>

          {/* =========================
              BEST SECTION
          ========================= */}

          {bestSection &&
            bestSection.percentage >= 65 && (
              <div className="quiz-design__callout">

                <div className="quiz-design__callout-title">
                  What You're Doing Right
                </div>

                <div className="quiz-design__callout-text">
                  <strong>
                    {bestSection.title}
                  </strong>{" "}
                  is currently one of your strongest areas
                  at {bestSection.percentage}%.
                </div>

              </div>
            )}

          {/* =========================
              WORST SECTION
          ========================= */}

          {worstSection &&
            worstSection.percentage < 75 && (
              <div className="quiz-design__callout">

                <div className="quiz-design__callout-title">
                  Your Most Important Gap
                </div>

                <div className="quiz-design__callout-text">
                  <strong>
                    {worstSection.title}
                  </strong>{" "}
                  is the area that would benefit most
                  from focused preparation.
                </div>

              </div>
            )}

          {/* =========================
              FLAGS
          ========================= */}

          {triggeredFlags.length > 0 && (
            <section className="quiz-design__flags">

              <h2 className="quiz-design__results-title">
                Important Insights
              </h2>

              {criticalFlags.map((flag, index) => (
                <div
                  key={`critical-${index}`}
                  className="quiz-design__flag quiz-design__flag--critical"
                >

                  <div
                    className="quiz-design__flag-title"
                    style={{ color: "#be123c" }}
                  >
                    Important Consideration
                  </div>

                  <div className="quiz-design__flag-message">
                    {flag.message}
                  </div>

                  {flag.remedy && (
                    <div className="quiz-design__flag-remedy">
                      <strong>What to do:</strong>{" "}
                      {flag.remedy}
                    </div>
                  )}

                </div>
              ))}

              {advisoryFlags.map((flag, index) => (
                <div
                  key={`advisory-${index}`}
                  className="quiz-design__flag quiz-design__flag--advisory"
                >

                  <div
                    className="quiz-design__flag-title"
                    style={{ color: "#a16207" }}
                  >
                    Watch This Area
                  </div>

                  <div className="quiz-design__flag-message">
                    {flag.message}
                  </div>

                  {flag.remedy && (
                    <div className="quiz-design__flag-remedy">
                      <strong>What to do:</strong>{" "}
                      {flag.remedy}
                    </div>
                  )}

                </div>
              ))}

            </section>
          )}

          {/* =========================
              CTA
          ========================= */}

          <section className="quiz-design__cta">

            <div className="quiz-design__cta-text">
              {primaryDescription}
            </div>

            {onPrimaryCTA && (
              <button
                type="button"
                className="quiz-design__primary-cta"
                onClick={onPrimaryCTA}
              >
                {primaryCTAText}
              </button>
            )}

            {(onReportCTA || onProductCTA) && (
              <div className="quiz-design__divider">
                or
              </div>
            )}

            {onReportCTA && (
              <button
                type="button"
                className="quiz-design__secondary-cta"
                onClick={onReportCTA}
              >
                {reportCTAText}
              </button>
            )}

            {onProductCTA && (
              <button
                type="button"
                className="quiz-design__secondary-cta"
                onClick={onProductCTA}
              >
                {productCTAText}
              </button>
            )}

            <div className="quiz-design__cta-note">
              Personalized insights · Built around your answers
            </div>

          </section>

          {/* =========================
              NEXT STEPS
          ========================= */}

          {nextSteps.length > 0 && (
            <section className="quiz-design__next-steps">

              <h2 className="quiz-design__results-title">
                Recommended Next Steps
              </h2>

              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="quiz-design__next-step"
                >

                  <span className="quiz-design__next-step-number">
                    {index + 1}
                  </span>

                  <span className="quiz-design__next-step-text">
                    {step}
                  </span>

                </div>
              ))}

            </section>
          )}

          {/* Retake */}

          {onRetake && (
            <button
              type="button"
              className="quiz-design__retake"
              onClick={onRetake}
            >
              Retake the Quiz
            </button>
          )}

        </main>

      </div>

    </div>
  );
}