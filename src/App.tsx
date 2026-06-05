import { Suspense, lazy, useState } from "react";
import LandingPage from "./components/LandingPage";
import Quiz from "./components/Quiz";
import { ErrorBoundary } from "./components/ErrorBoundary";

const RealityBreakdown = lazy(() => import("./components/RealityBreakdown"));
const RealityBreakdownContent = lazy(
  () => import("./components/RealityBreakdownContent")
);
const NailTechBlueprint = lazy(() => import("./components/NailTechBlueprint"));

const getDailyRandomNumber = (min: number, max: number): number => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  let hash = 0;

  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash = hash & hash;
  }

  const range = max - min + 1;
  return min + (Math.abs(hash) % range);
};

const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

type Stage =
  | "landing"
  | "quiz"
  | "email-gate"
  | "reality-breakdown-content"
  | "blueprint";

type QuizResultSummary = {
  pct: number;
  band: { label: string };
  worstSection: { id: string; title: string };
  bestSection: { id: string; title: string; pct: number };
};

export default function App() {
  const [stage, setStage] = useState<Stage>("landing");
  const [quizResults, setQuizResults] = useState<QuizResultSummary | null>(null);

  const [takenToday, setTakenToday] = useState(() => {
    const stored = localStorage.getItem("quizTakenToday");
    const storedDate = localStorage.getItem("quizDate");
    const currentDate = getTodayString();

    if (storedDate !== currentDate) {
      const newCount = getDailyRandomNumber(48, 77);
      localStorage.setItem("quizTakenToday", String(newCount));
      localStorage.setItem("quizDate", currentDate);
      return newCount;
    }

    return stored ? parseInt(stored, 10) : getDailyRandomNumber(48, 77);
  });

  const [bonusSpots, setBonusSpots] = useState(() => {
    const stored = localStorage.getItem("bonusSpots");
    return stored ? parseInt(stored, 10) : 26;
  });

  const handleStartQuiz = () => {
    const newCount = takenToday + 1;
    setTakenToday(newCount);
    localStorage.setItem("quizTakenToday", String(newCount));

    const newBonusSpots = bonusSpots - 1;
    const updatedBonusSpots = newBonusSpots <= 0 ? 26 : newBonusSpots;
    setBonusSpots(updatedBonusSpots);
    localStorage.setItem("bonusSpots", String(updatedBonusSpots));

    setStage("quiz");
  };

  const handleAccessRealityBreakdown = (results?: unknown) => {
    setQuizResults((results as QuizResultSummary) || null);
    setStage("email-gate");
  };

  const handleBlueprintAccess = () => {
    setStage("blueprint");
  };

  const handleBackToLanding = () => {
    setStage("landing");
  };

  const handleEmailSubmit = (email: string) => {
    void email;
    setStage("reality-breakdown-content");
  };

  if (stage === "quiz") {
    return (
      <Quiz
        onRequestRealityBreakdown={handleAccessRealityBreakdown}
        onRequestBlueprint={handleBlueprintAccess}
      />
    );
  }

  if (stage === "email-gate") {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div style={{ padding: "40px", fontSize: "24px" }}>
              Loading email access page...
            </div>
          }
        >
          <RealityBreakdown
            onBack={handleBackToLanding}
            onSubmit={handleEmailSubmit}
            quizResults={quizResults}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (stage === "reality-breakdown-content") {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div style={{ padding: "40px", fontSize: "24px" }}>
              Loading free reality breakdown...
            </div>
          }
        >
          <RealityBreakdownContent
            onBack={handleBackToLanding}
            onTakeQuiz={handleStartQuiz}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  if (stage === "blueprint") {
    return (
      <ErrorBoundary>
        <Suspense
          fallback={
            <div style={{ padding: "40px", fontSize: "24px" }}>
              Loading...
            </div>
          }
        >
          <NailTechBlueprint onBack={() => setStage("quiz")} />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <LandingPage
      takenToday={takenToday}
      bonusSpots={bonusSpots}
      onStartQuiz={handleStartQuiz}
      onRealityBreakdown={() => handleAccessRealityBreakdown()}
    />
  );
}