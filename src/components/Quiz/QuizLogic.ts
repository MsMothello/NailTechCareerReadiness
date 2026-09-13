import { QuizQuestion, QuizResults, SectionResult, QuizFlag } from "./quizTypes";
import { QUESTION_DEFS, SECTIONS, SectionId } from "./quizData";

const SECTION_ORDER: SectionId[] = ["body", "money", "clients", "business"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── BUILD A QUIZ ATTEMPT ─────────────────────────────────────────────────────
// Fixed 12 questions, fixed order — only the WORDING (variant) is randomized
// per question, per attempt. Guarantees a new combination of phrasing every
// time the quiz is taken, while every quiz-taker answers the same 12
// underlying questions in the same order.
export function buildQuiz(): QuizQuestion[] {
  return QUESTION_DEFS.map((def) => {
    const variant = pick(def.variants);
    return {
      id: def.id,
      sectionId: def.sectionId,
      question: variant.question,
      options: variant.options,
    };
  });
}

// ── SCORE TIERS ───────────────────────────────────────────────────────────
type Tier = "strong" | "developing" | "weak";

function getTier(pct: number): Tier {
  if (pct >= 75) return "strong";
  if (pct >= 50) return "developing";
  return "weak";
}

const TIER_LABEL: Record<Tier, string> = {
  strong: "Strong",
  developing: "Developing",
  weak: "Needs Work",
};

// ── SECTION DESCRIPTIONS (per section, per tier) — 3 phrasing variants each ──
// Same meaning every time, different wording, so two attempts landing in the
// same section/tier don't read as identical.
const SECTION_DESCRIPTIONS: Record<SectionId, Record<Tier, string[]>> = {
  body: {
    strong: [
      "Your body and habits are genuinely suited to what this career demands. You've thought about chemical exposure, sustained physical work, and hands-on contact in ways most candidates don't consider until something goes wrong.",
      "Physically, you're well matched to this work. Chemical exposure, long hours in a fixed position, and hands-on client contact don't seem to be open questions for you the way they are for most candidates.",
      "You've clearly thought through the physical side of this career — the chemicals, the sustained posture, the hands-on nature of the work — rather than just assuming it will be fine.",
    ],
    developing: [
      "The physical demands of this career — long fixed-position hours, daily chemical exposure, and constant hands-on contact — are daily, not occasional. Your responses suggest some of this would be a real challenge worth preparing for.",
      "Some parts of the physical side of this job would likely be a real adjustment for you — whether that's the chemical exposure, the sustained hours, or the hands-on client contact. Worth addressing before you commit.",
      "You're not fully there yet on the physical side. The daily reality of chemicals, long fixed-position hours, and close client contact is worth testing against your own tolerance before enrolling.",
    ],
    weak: [
      "Your responses raise genuine questions about physical compatibility with this career. This isn't something enthusiasm resolves — get honest input, ideally medical, before investing in school.",
      "There's a real mismatch showing up here between what this career demands physically and where you currently stand. That's worth resolving with a doctor or a working nail tech before you spend on school.",
      "The physical side of this career looks like a genuine sticking point based on your answers. It's worth getting clear, honest input before committing financially.",
    ],
  },
  money: {
    strong: [
      "You're thinking in real numbers, real timelines, and a real schedule before you've spent a cent — that puts you ahead of most candidates who don't discover the ramp-up reality until they're already in it.",
      "Your financial planning is already ahead of where most candidates start. You've thought through the ramp-up period, the upfront cost, and your schedule realistically, not just optimistically.",
      "Financially, you look genuinely prepared — real numbers and a real plan for the slow early months, rather than hoping it works out.",
    ],
    developing: [
      "Your financial awareness is above average, but the plan is still general rather than specific. Turning 'roughly prepared' into 'actually protected' is the work left to do here.",
      "You're aware of the financial realities here, but the specifics still need sharpening — exact numbers, not rough estimates, are what separate 'probably fine' from 'actually covered.'",
      "There's a reasonable financial foundation here, but it's not fully built out yet. A few concrete numbers would take this from a general sense to an actual plan.",
    ],
    weak: [
      "The financial reality of this career — startup costs, the ramp-up period, and the schedule needed to build a client base — has real gaps in your current preparation. This is the most common reason nail techs leave within two years.",
      "This is where the biggest risk sits right now. The startup investment, the slow ramp-up, and the schedule this career demands don't yet have a real plan behind them.",
      "Financially, this looks like the area most likely to derail things if it isn't addressed before you enroll — the ramp-up period especially is where most new techs get caught off guard.",
    ],
  },
  clients: {
    strong: [
      "Client relationships are the real engine of this career, and you appear to understand that already. Holding safety boundaries, enforcing policy, and staying service-first is what fills and keeps a full book.",
      "You already get what a lot of new techs learn the hard way — that this job runs on people skills as much as technical skill. Boundaries, safety instincts, and service mindset all look solid.",
      "Your instincts with clients — holding a safety line, enforcing policy, staying service-oriented — are already where most techs end up after a few hard years of learning it.",
    ],
    developing: [
      "You have solid instincts, but real-pressure scenarios — an unsafe request, an awkward fee conversation — would likely test you. These are learnable skills that need deliberate practice.",
      "The foundation is there, but specific pressure-moments — refusing an unsafe request, actually charging a no-show fee — are where you'd likely still hesitate. Practice closes that gap.",
      "You're not far off, but a few real-world scenarios (an unsafe request, a client pushing back on a policy) would probably catch you off guard right now. Worth rehearsing before it happens for real.",
    ],
    weak: [
      "Client management is likely to be a significant challenge based on your responses — whether that's holding a line under pressure or staying service-first on hard days. This is learnable, but needs real preparation.",
      "This looks like a genuine soft spot — holding boundaries under pressure and staying service-first when it's hard aren't things you seem confident in yet. That's fixable, but it takes deliberate work.",
      "Client-facing situations appear to be where you'd struggle most right now — enforcing a line, staying professional under pressure. Worth building this skill set before your first real client.",
    ],
  },
  business: {
    strong: [
      "You understand that a license is the starting line, not the finish line. Self-discipline, ongoing education, and a plan to stand out are all things you've genuinely thought through.",
      "You're already thinking past the license itself — ongoing learning, self-discipline, and standing out in a crowded market are all on your radar, not afterthoughts.",
      "The business side of this career — discipline, continued learning, differentiation — looks like something you've genuinely planned for, not just something you'll figure out later.",
    ],
    developing: [
      "You have some of the right instincts, but self-employment discipline, ongoing learning, or a differentiation plan are still underdeveloped — all fixable with deliberate planning.",
      "There's a reasonable foundation here, but parts of the business side — discipline, ongoing education, a real niche — still need more concrete thinking before they're solid.",
      "You're partway there on the business side. A bit more specific planning around discipline, continued learning, or standing out would close the remaining gap.",
    ],
    weak: [
      "Running a nail career long-term takes more than technical skill. Business discipline, ongoing education, and a plan to differentiate don't appear to be part of your planning yet.",
      "The business side of this career — self-discipline, staying current, standing out in a crowded market — looks like it hasn't been part of your planning so far.",
      "This looks like an area you haven't spent much time thinking through yet — the parts of the job that come after licensing: running a business, staying current, differentiating yourself.",
    ],
  },
};

// ── HEADLINES — 3 phrasing variants per best/worst combo ─────────────────────
const HEADLINE_COMBOS: Record<string, string[]> = {
  body_money: [
    "Your financial planning is solid. Physical readiness is where the real risk sits.",
    "Money-wise, you're in good shape. It's your body's readiness that needs a closer look.",
    "You've got the financial side handled. The physical demands are the real open question.",
  ],
  body_clients: [
    "You'd connect brilliantly with clients. Physical readiness is your open question.",
    "Client relationships look like a real strength. Your body's readiness for the work is less certain.",
    "People skills aren't your problem here — physical readiness is what needs attention.",
  ],
  body_business: [
    "You think like a business owner. Physical readiness needs honest attention.",
    "The business mindset is there. It's your body's readiness for the daily grind that's in question.",
    "You've got the long game figured out on the business side — physical readiness is what's left to address.",
  ],
  money_body: [
    "Your body is ready for this work. Your finances aren't — yet.",
    "Physically, you're prepared. It's the financial runway that needs work.",
    "You can handle the physical demands. Money is the piece that isn't sorted yet.",
  ],
  money_clients: [
    "You'd be excellent with clients. The financial planning hasn't caught up yet.",
    "People skills are a clear strength. Your financial preparation is lagging behind them.",
    "Clients would love working with you. The money side of this hasn't been worked out yet.",
  ],
  money_business: [
    "You know how to run a business. Funding the runway to get there is the gap.",
    "Business instincts are strong. It's the financial cushion to get you there that's missing.",
    "You've got the business mindset down. What's missing is the money to survive getting started.",
  ],
  clients_body: [
    "Physically you're built for this. Client relationships are your real question mark.",
    "Your body can handle the work. It's how you'll handle clients that needs more thought.",
    "The physical demands aren't a concern for you. Client-facing skills are where the real work is.",
  ],
  clients_money: [
    "Your finances are in order. Client-facing skills need more work.",
    "Money isn't the issue here — how you'll handle real clients is.",
    "You've got a solid financial plan. Client relationships are the piece that needs building.",
  ],
  clients_business: [
    "You're business-minded and organized. Client relationships need real development.",
    "The business fundamentals are strong. It's the people-facing side that needs more attention.",
    "You've thought through the business side well. Client skills are where the gap actually is.",
  ],
  business_body: [
    "You're physically prepared. The business side needs real attention.",
    "Your body's ready for the work. Running the business itself is the part that isn't yet.",
    "Physically, you're set. It's the business fundamentals that still need building.",
  ],
  business_money: [
    "Financially sound and ready. Business operations are what's underdeveloped.",
    "You've got the money side handled. Running the business day-to-day is the open question.",
    "Your finances are prepared. It's the operational side of the business that needs work.",
  ],
  business_clients: [
    "Great instincts with people. The business operations side needs real development.",
    "Client relationships come naturally to you. Running the business behind them is what needs work.",
    "You'd do well with clients. It's the business machinery behind the scenes that's underdeveloped.",
  ],
};

const HEADLINE_FALLBACK: Record<"strong" | "mixed" | "weak", string[]> = {
  strong: [
    "You're more prepared than most people who've already enrolled.",
    "Across the board, you're genuinely ahead of where most candidates start.",
    "This is about as strong a starting position as this quiz sees.",
  ],
  mixed: [
    "The potential is real. A few critical gaps stand between you and a smart start.",
    "There's real potential here, alongside a few gaps worth closing first.",
    "You've got real strengths to build on, and a few specific things to fix before you commit.",
  ],
  weak: [
    "This is not the right moment. But it could be — with the right preparation.",
    "Right now isn't the time to enroll. With the right preparation, it could be soon.",
    "This isn't a 'never' — it's a 'not yet, until a few things are in place.'",
  ],
};

function getHeadline(sectionResults: SectionResult[], overallPct: number): string {
  const sorted = [...sectionResults].sort((a, b) => b.percentage - a.percentage);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const key = `${worst.id}_${best.id}`;
  if (HEADLINE_COMBOS[key]) return pick(HEADLINE_COMBOS[key]);
  if (overallPct >= 75) return pick(HEADLINE_FALLBACK.strong);
  if (overallPct >= 50) return pick(HEADLINE_FALLBACK.mixed);
  return pick(HEADLINE_FALLBACK.weak);
}

// ── DIAGNOSTIC (single paragraph, built from the weakest section) ───────────
// 3 phrasing variants per tier/section — same underlying message, different words.
const NARRATIVES: Record<Tier, Record<SectionId, string[]>> = {
  strong: {
    body: [
      "You've thought about what this career requires from your body in ways most candidates don't consider until they're already dealing with the consequences. Physical readiness is your foundation — build the rest of your preparation to the same standard.",
      "Physical readiness is genuinely your strongest area. Most candidates don't think this through until it's already causing problems — you clearly have. Use that same level of thought on the other sections.",
      "You're ahead of the curve physically. The daily realities of this job — chemicals, sustained posture, hands-on contact — don't seem to be blind spots for you the way they are for most people.",
    ],
    money: [
      "What separates nail techs who thrive from those who leave within two years almost always comes down to financial preparation, and yours is in good shape. Your remaining work is refinement, not a rebuild.",
      "Financial preparation is the single biggest predictor of who makes it through the first two years, and you're already there. What's left is tightening details, not starting over.",
      "You've done the hard part financially — planning for the slow ramp-up before it happens rather than during it. From here it's just fine-tuning.",
    ],
    clients: [
      "The ability to hold safety boundaries, enforce policy, and stay service-first is what builds a loyal, full book over time. Spend your remaining preparation time matching your other sections to this level.",
      "Client-facing instincts like yours — safety boundaries, policy enforcement, staying service-oriented — are what actually fill a book long-term. This is a real strength to build the rest of your preparation around.",
      "You've already got the piece most techs spend years learning the hard way: how to hold a line with clients without losing them. Everything else can catch up to this.",
    ],
    business: [
      "You already understand that licensing is the starting point, not the destination. This kind of long-term thinking is what separates nail techs who build lasting careers from those who plateau after year one.",
      "Thinking past the license itself — toward ongoing learning and standing out — is what separates techs with lasting careers from those who plateau. You're already there.",
      "You're treating this as a long-term business, not just a skill to learn once. That mindset is what keeps a career going past the first couple of years.",
    ],
  },
  developing: {
    body: [
      "The physical demands of this career are non-negotiable and daily. Your responses suggest some gaps worth honest attention, ideally from a doctor or a working nail tech, before school.",
      "Some real gaps showed up in the physical side of your readiness. Worth getting honest input, medical if relevant, before this becomes an expensive discovery later.",
      "The day-to-day physical reality of this job — long hours, chemical exposure, hands-on contact — isn't fully accounted for in your current preparation. Worth addressing directly before enrolling.",
    ],
    money: [
      "You have genuine interest and some important foundations in place, but the financial side of your planning is still general rather than specific. This is the most fixable type of readiness gap — it just needs real numbers.",
      "There's a decent financial foundation here, but it's still more 'rough idea' than 'actual plan.' This is the easiest gap to close — it just takes sitting down with real numbers.",
      "Your financial thinking is on the right track but not yet concrete enough to rely on. A specific plan, not just general awareness, is what would close this gap.",
    ],
    clients: [
      "Client relationships will be both your biggest opportunity and your biggest daily test. Real-pressure scenarios would likely test you, but these are skills you can build deliberately before you're in a professional setting.",
      "You've got decent instincts with clients, but specific high-pressure moments — an unsafe request, a fee conversation — would likely catch you off guard right now. Practice fixes that.",
      "The foundation for good client relationships is there, but it hasn't been tested against real pressure yet. Rehearsing the hard conversations now beats learning them live.",
    ],
    business: [
      "You have some of the right instincts, but self-employment discipline, ongoing education, or a differentiation plan are still underdeveloped. None of these are fixed traits — they're specific things you can build before you need them.",
      "The business side isn't a blind spot for you, but it's not solid yet either — discipline, ongoing learning, and standing out all need more concrete planning.",
      "You're partway toward treating this like a real business rather than just a skill. A bit more specific planning on the operational side would close the gap.",
    ],
  },
  weak: {
    body: [
      "Your responses raise real questions that need honest answers before you invest in school. Get clarity first, medically if relevant, then build a preparation plan from a place of honest information.",
      "The physical side of this career looks like a genuine obstacle based on your answers — not something enthusiasm will resolve. Get real input before spending money on school.",
      "This is the area most worth pausing on. The physical demands of this job are daily and non-negotiable, and your responses suggest they'd be a real struggle.",
    ],
    money: [
      "The financial reality of this career has significant gaps in your current preparation right now — not awareness, preparation. This is the single most common reason nail techs leave the profession within two years.",
      "Financially, this is the area putting the rest of your plan at risk. The ramp-up period especially is where under-preparation turns into an early exit from the profession.",
      "This is the section most likely to derail things if it isn't addressed. Without a real financial plan, the slow early months of this career become a serious problem rather than an expected phase.",
    ],
    clients: [
      "Client management is likely to be one of your most significant challenges based on your responses. These skills are learnable, but the time to build them is before your first paying client, not while they're in the chair.",
      "This looks like a genuine weak spot — holding boundaries, staying professional under pressure. It's learnable, but it needs deliberate work before you're facing a real client.",
      "Client-facing situations appear to be where your preparation is thinnest right now. Worth building this skill set specifically before you're in a professional setting for the first time.",
    ],
    business: [
      "Running a nail career long-term takes more than technical skill. This side of the career doesn't appear to be part of your planning yet, and it needs specific preparation, not just more time on the craft.",
      "The business side of this career hasn't been part of your thinking so far — discipline, staying current, differentiating yourself. That's a real gap, not a minor one.",
      "This looks like an area you haven't engaged with much yet. Running a business, not just doing the craft, is what actually sustains a career past the first year or two.",
    ],
  },
};

const DIAGNOSTIC_FALLBACK: Record<"strong" | "mixed", string[]> = {
  strong: [
    "Your results show a genuinely strong foundation across all four areas of career readiness. Use your section scores to identify the one or two areas worth refining further before your first day of school.",
    "You're in strong shape across every section. From here, it's about polishing the one or two areas that scored a bit lower than the rest.",
    "This is a genuinely solid all-around result. Use the section breakdown to fine-tune rather than overhaul anything.",
  ],
  mixed: [
    "Your results show a mixed picture — genuine strengths in some areas and real gaps in others. The gaps are addressable, but they need specific preparation, starting with your lowest section score.",
    "There's a real mix here — clear strengths alongside clear gaps. Start with whichever section scored lowest; that's where focused preparation will matter most.",
    "You've got real strengths to build on and specific gaps to close. The section breakdown below shows exactly where to focus first.",
  ],
};

function getDiagnostic(sectionResults: SectionResult[], overallPct: number): string {
  const sorted = [...sectionResults].sort((a, b) => b.percentage - a.percentage);
  const worst = sorted[sorted.length - 1];
  const tier = getTier(worst.percentage);
  const options = NARRATIVES[tier]?.[worst.id as SectionId];
  if (options && options.length > 0) return pick(options);
  if (overallPct >= 75) return pick(DIAGNOSTIC_FALLBACK.strong);
  return pick(DIAGNOSTIC_FALLBACK.mixed);
}

// ── CTA (single description string) — 3 phrasing variants per section ───────
const CTA_TEXT: Record<SectionId, string[]> = {
  body: [
    "Your biggest gap right now is physical readiness. A focused plan can close it before you enroll.",
    "Physical readiness is what needs the most attention right now — and it's addressable with the right plan before you commit to school.",
    "The clearest next step is closing the gap in physical readiness. A focused plan can get you there before you enroll.",
  ],
  money: [
    "Your biggest gap right now is financial preparation — the #1 reason nail techs leave the profession early. A focused plan can close it before you enroll.",
    "Financial preparation is your most urgent gap — and it's the single biggest reason techs leave the profession early. Worth closing before you commit.",
    "The clearest next step is building a real financial plan. This is the gap that most often ends careers before they really start.",
  ],
  clients: [
    "Your biggest gap right now is client-facing skills. A focused plan built around real scenarios can close it before you enroll.",
    "Client-facing skills are where the real work is right now — and they're buildable with focused, scenario-based practice before you enroll.",
    "The clearest next step is building client-facing confidence through real scenario practice, before you're facing them for the first time live.",
  ],
  business: [
    "Your biggest gap right now is the business side of this career. A focused plan can close it before you enroll.",
    "The business side of this career is your biggest open gap right now — and it's very learnable with the right focused plan.",
    "The clearest next step is building out the business side of your preparation — discipline, ongoing learning, differentiation — before you commit.",
  ],
};

const CTA_STRONG: string[] = [
  "You're in strong shape across the board. A short, targeted plan can turn this readiness score into a confident start.",
  "You're already well-prepared overall. A short, targeted plan is all that's left to turn this into a confident start.",
  "This is a strong result across every section. A brief, focused plan can carry this readiness straight into a confident enrollment.",
];

function getCTA(worstSectionId: SectionId, overallPct: number): string {
  if (overallPct >= 75) return pick(CTA_STRONG);
  const options = CTA_TEXT[worstSectionId];
  return options ? pick(options) : pick(CTA_TEXT.money);
}

// ── NEXT STEPS (exported for the container to pass to QuizResultsScreen) ────
export const NEXT_STEPS: Record<SectionId, string[]> = {
  body: [
    "Speak with a doctor specifically about this career's chemical and physical demands before committing financially",
    "Research ergonomic workstation setups used by nail techs — invest in the setup before the career, not after the injury",
    "Talk to a working nail tech honestly about hands-on client contact and how it actually feels day to day",
  ],
  money: [
    "Build your exact ramp-up financial plan — monthly expenses vs. realistic client income month by month for 24 months",
    "Get an itemized quote covering tuition, licensing, tools, products, and a living buffer before you commit a deposit",
    "Map your actual weekly availability against evening/weekend demand to see if your schedule truly supports this career",
  ],
  clients: [
    "Write and practise your unsafe-request refusal script out loud before your first client",
    "Practise policy enforcement conversations (deposits, no-shows) out loud — write the exact words you'd use",
    "Shadow or speak with a working nail tech specifically about their most difficult client situations",
  ],
  business: [
    "Take a short small-business basics course covering taxes, scheduling, and marketing before you need them for real",
    "Build a specific plan and budget for ongoing education in your first two years, not just your initial licensing",
    "Spend a week researching competitors near you and write down one clear thing that would make a client choose you",
  ],
};

// ── BANDS (overall) ─────────────────────────────────────────────────────────
interface BandDef {
  slug: string;
  bandName: string;
  minScore: number;
}
const BANDS: Record<"strong" | "developing" | "gaps", BandDef> = {
  strong: { slug: "strong", bandName: "Strong Foundation", minScore: 37 },
  developing: { slug: "developing", bandName: "Developing Foundation", minScore: 25 },
  gaps: { slug: "gaps", bandName: "Significant Gaps", minScore: 0 },
};

// ── SCORE AN ATTEMPT ──────────────────────────────────────────────────────
// answers: map of questionId -> selected option letter (matches the
// `selectedAnswer` string prop that QuizDesign's QuestionScreen expects).
export function calcResults(questions: QuizQuestion[], answers: Record<string, string>): QuizResults {
  const sectionScores: Record<SectionId, number> = { body: 0, money: 0, clients: 0, business: 0 };
  const sectionMaxes: Record<SectionId, number> = { body: 0, money: 0, clients: 0, business: 0 };
  const triggeredFlags: QuizFlag[] = [];

  // Look up flag definitions by question id (QuizQuestion itself carries no
  // flag field per quizTypes.ts, so we go back to the source definitions).
  const flagById = new Map(QUESTION_DEFS.map((d) => [d.id, d.flag]));

  questions.forEach((q) => {
    const letter = answers[q.id];
    if (!letter) return;
    const option = q.options.find((o) => o.letter === letter);
    if (!option) return;
    const value = option.value ?? 0;
    const sectionId = q.sectionId as SectionId;
    sectionScores[sectionId] += value;
    sectionMaxes[sectionId] += 4;

    const flagDef = flagById.get(q.id);
    if (flagDef && value === 1) {
      triggeredFlags.push({
        type: flagDef.type,
        sectionId,
        message: flagDef.message,
        remedy: flagDef.remedy,
      });
    }
  });

  const totalScore = Object.values(sectionScores).reduce((a, b) => a + b, 0);
  const totalMax = Object.values(sectionMaxes).reduce((a, b) => a + b, 0);
  const percentage = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  let bandDef: BandDef = BANDS.strong;
  if (totalScore < BANDS.developing.minScore) bandDef = BANDS.gaps;
  else if (totalScore < BANDS.strong.minScore) bandDef = BANDS.developing;

  if (triggeredFlags.some((f) => f.type === "critical")) {
    if (bandDef === BANDS.strong) bandDef = BANDS.developing;
    else if (bandDef === BANDS.developing) bandDef = BANDS.gaps;
  }

  const sectionResults: SectionResult[] = SECTION_ORDER.map((id) => {
    const pct = sectionMaxes[id] > 0 ? Math.round((sectionScores[id] / sectionMaxes[id]) * 100) : 0;
    const tier = getTier(pct);
    const section = SECTIONS[id];
    return {
      id,
      title: section.title,
      percentage: pct,
      band: TIER_LABEL[tier],
      description: pick(SECTION_DESCRIPTIONS[id][tier]),
      color: section.color,
      lightColor: section.lightColor,
    };
  });

  const sorted = [...sectionResults].sort((a, b) => b.percentage - a.percentage);
  const bestSection = sorted[0];
  const worstSection = sorted[sorted.length - 1];

  return {
    percentage,
    band: bandDef.slug,
    bandName: bandDef.bandName,
    headline: getHeadline(sectionResults, percentage),
    diagnostic: getDiagnostic(sectionResults, percentage),
    cta: getCTA(worstSection.id as SectionId, percentage),
    sectionResults,
    triggeredFlags,
    worstSection,
    bestSection,
  };
}
