import { useState } from "react";
import { QuizQuestionScreen, QuizResultsScreen } from "./QuizDesign";
import { QuizPreviewReport } from "./QuizPreviewReport";
import { SECTIONS, SectionId } from "./QuizData";
import { buildQuiz, calcResults, NEXT_STEPS } from "./QuizLogic";
import { buildPreview } from "./quizPreview";
import { QuizQuestion, QuizOption, QuizResults as QuizResultsType } from "./quizTypes";

type Screen = "quiz" | "preview" | "full";

interface NailTechQuizProps {
  brandName?: string;
  // Called when the person submits a valid email to unlock the full report.
  // Wire this to your ESP/CRM/backend — the quiz itself has no opinion on
  // where the lead goes.
  onEmailCapture?: (email: string, results: QuizResultsType) => void | Promise<void>;
  onPrimaryCTA?: () => void;
  onReportCTA?: () => void;
  onProductCTA?: () => void;
  primaryCTAText?: string;
  reportCTAText?: string;
  productCTAText?: string;
}

export default function NailTechQuiz({
  brandName = "Nail Tech Readiness Quiz",
  onEmailCapture,
  onPrimaryCTA,
  onReportCTA,
  onProductCTA,
  primaryCTAText,
  reportCTAText,
  productCTAText,
}: NailTechQuizProps) {
  const [screen, setScreen] = useState<Screen>("quiz");
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildQuiz());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<QuizResultsType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const currentQuestion = questions[currentIndex];

  function handleSelectAnswer(option: QuizOption) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option.letter }));
  }

  function handleNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setResults(calcResults(questions, answers));
      setScreen("preview");
    }
  }

  async function handleUnlock(email: string) {
    if (!results) return;
    setSubmitError(undefined);
    setIsSubmitting(true);
    try {
      await onEmailCapture?.(email, results);
      setScreen("full");
    } catch {
      setSubmitError("Something went wrong — please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRetake() {
    setQuestions(buildQuiz());
    setCurrentIndex(0);
    setAnswers({});
    setResults(null);
    setSubmitError(undefined);
    setScreen("quiz");
  }

  if (screen === "quiz" && currentQuestion) {
    const section = SECTIONS[currentQuestion.sectionId as SectionId];
    return (
      <QuizQuestionScreen
        question={currentQuestion}
        section={section}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentQuestion.id]}
        onSelectAnswer={handleSelectAnswer}
        onNext={handleNext}
        isLastQuestion={currentIndex === questions.length - 1}
        brandName={brandName}
      />
    );
  }

  if (screen === "preview" && results) {
    return (
      <QuizPreviewReport
        preview={buildPreview(results)}
        onUnlock={handleUnlock}
        brandName={brandName}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    );
  }

  if (screen === "full" && results) {
    const worstId = (results.worstSection?.id as SectionId) || "money";
    return (
      <QuizResultsScreen
        results={results}
        onRetake={handleRetake}
        onPrimaryCTA={onPrimaryCTA}
        onReportCTA={onReportCTA}
        onProductCTA={onProductCTA}
        primaryCTAText={primaryCTAText}
        reportCTAText={reportCTAText}
        productCTAText={productCTAText}
        primaryDescription={results.cta}
        nextSteps={NEXT_STEPS[worstId]}
      />
    );
  }

  return null;
}
