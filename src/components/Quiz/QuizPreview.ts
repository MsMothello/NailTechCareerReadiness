import { QuizResults, SectionResult, QuizFlag } from "./quizTypes";

// ─────────────────────────────────────────────────────────────────────────────
// PREVIEW REPORT
// Takes the full QuizResults (already computed by quizLogic.calcResults) and
// derives a redacted "teaser" view of it: real score, real headline, full
// detail on the single worst section, any critical flags in full (safety/
// legal issues aren't something to gate behind an email), and the other
// three sections shown as locked cards. This is a pure display transform —
// there is only one source of truth for scoring (quizLogic.ts).
// ─────────────────────────────────────────────────────────────────────────────

export interface PreviewSection {
  id: string;
  title: string;
  color: string;
  lightColor: string;
  locked: boolean;
  percentage?: number;
  band?: string;
  description?: string;
}

export interface PreviewReport {
  percentage: number;
  bandName: string;
  headline: string;
  revealedSection: PreviewSection;
  lockedSections: PreviewSection[];
  criticalFlags: QuizFlag[];
  advisoryFlagCount: number;
}

export function buildPreview(results: QuizResults): PreviewReport {
  const { sectionResults, worstSection, headline, percentage, bandName, triggeredFlags } = results;
  const revealed: SectionResult = worstSection || sectionResults[0];

  const lockedSections: PreviewSection[] = sectionResults
    .filter((s) => s.id !== revealed.id)
    .map((s) => ({
      id: s.id,
      title: s.title,
      color: s.color,
      lightColor: s.lightColor,
      locked: true,
    }));

  const revealedSection: PreviewSection = {
    id: revealed.id,
    title: revealed.title,
    color: revealed.color,
    lightColor: revealed.lightColor,
    locked: false,
    percentage: revealed.percentage,
    band: revealed.band,
    description: revealed.description,
  };

  const criticalFlags = triggeredFlags.filter((f) => f.type === "critical");
  const advisoryFlagCount = triggeredFlags.filter((f) => f.type === "advisory").length;

  return {
    percentage,
    bandName,
    headline,
    revealedSection,
    lockedSections,
    criticalFlags,
    advisoryFlagCount,
  };
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
