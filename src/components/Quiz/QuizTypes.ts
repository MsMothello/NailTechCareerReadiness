export type QuizSection = {
  id: string;
  title: string;
  color: string;
  lightColor: string;
};

export type QuizOption = {
  letter: string;
  text: string;
  value?: number;
};

export type QuizQuestion = {
  id: string;
  sectionId: string;
  question: string;
  options: QuizOption[];
};

export type SectionResult = {
  id: string;
  title: string;
  percentage: number;
  band: string;
  description: string;
  color: string;
  lightColor: string;
};

export type QuizFlag = {
  type: "critical" | "advisory";
  sectionId: string;
  message: string;
  remedy?: string;
};

export type QuizResults = {
  percentage: number;
  band: string;
  bandName: string;
  headline: string;
  diagnostic: string;
  cta: string;
  sectionResults: SectionResult[];
  triggeredFlags: QuizFlag[];
  worstSection?: SectionResult;
  bestSection?: SectionResult;
};