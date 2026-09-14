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

// ── SECTION DESCRIPTIONS (per section, per tier) — 3 richer variants each ────
// Each is now a fuller mini-analysis (what the score means, why it matters,
// what to actually do about it) rather than a single summary sentence, since
// this text is the main substance of both the free preview's revealed
// section and every section card in the full gated report.
const SECTION_DESCRIPTIONS: Record<SectionId, Record<Tier, string[]>> = {
  body: {
    strong: [
      "Your body and habits are genuinely suited to what this career demands. You've thought about chemical exposure, sustained physical work, and hands-on contact in ways most candidates don't consider until something goes wrong. That kind of foresight is what keeps techs in this career for decades instead of a couple of years — protect it by keeping the same standards (PPE, ergonomics, breaks) once the excitement of a new career settles into routine.",
      "Physically, you're well matched to this work. Chemical exposure, long hours in a fixed position, and hands-on client contact don't seem to be open questions for you the way they are for most candidates. The main risk from here isn't readiness — it's complacency once you're busy, so build your PPE and ergonomic habits into your routine now, before a full schedule makes them feel optional.",
      "You've clearly thought through the physical side of this career — the chemicals, the sustained posture, the hands-on nature of the work — rather than just assuming it will be fine. That's a genuine advantage. Carry that same deliberateness into your first few months on the job, since habits formed in week one tend to be the ones that stick for years.",
    ],
    developing: [
      "The physical demands of this career — long fixed-position hours, daily chemical exposure, and constant hands-on contact — are daily, not occasional. Your responses suggest some of this would be a real challenge worth preparing for, rather than something you'd simply adjust to on the job. A few weeks of deliberate preparation now (ergonomic setup, PPE habits, an honest medical check where relevant) is far cheaper than discovering a limit mid-career.",
      "Some parts of the physical side of this job would likely be a real adjustment for you — whether that's the chemical exposure, the sustained hours, or the hands-on client contact. This is a solvable gap, but it needs to be solved on purpose: talk to a doctor or a working nail tech about the specific part that concerns you, rather than hoping it resolves itself once you're in school.",
      "You're not fully there yet on the physical side. The daily reality of chemicals, long fixed-position hours, and close client contact is worth testing against your own tolerance before enrolling, not after. A short shadow shift with a working tech, or a conversation with a doctor about occupational exposure, would turn this from a guess into an actual answer.",
    ],
    weak: [
      "Your responses raise genuine questions about physical compatibility with this career. This isn't something enthusiasm resolves — get honest input, ideally medical, before investing in school. If the underlying issue turns out to be manageable with the right precautions, you'll enroll with real confidence instead of a nagging doubt; if it isn't, you'll have saved yourself a significant financial and time cost.",
      "There's a real mismatch showing up here between what this career demands physically and where you currently stand. That's worth resolving with a doctor or a working nail tech before you spend on school, since this section covers the parts of the job — chemical exposure, sustained posture, physical contact — that don't have a workaround once you're doing the work daily.",
      "The physical side of this career looks like a genuine sticking point based on your answers. It's worth getting clear, honest input before committing financially — specifically, a conversation with a doctor about the exact demands (fumes, repetitive motion, prolonged sitting) rather than a general 'is this a good career for me' conversation, which won't surface the real risk.",
    ],
  },
  money: {
    strong: [
      "You're thinking in real numbers, real timelines, and a real schedule before you've spent a cent — that puts you ahead of most candidates who don't discover the ramp-up reality until they're already in it. From here, the remaining work is precision: confirm your exact monthly budget for the next two years and stress-test it against a slower-than-expected client build, since even strong plans benefit from a worst-case check.",
      "Your financial planning is already ahead of where most candidates start. You've thought through the ramp-up period, the upfront cost, and your schedule realistically, not just optimistically. The one thing worth double-checking: does your plan account for a 24-month ramp-up specifically, or a shorter one? Building in the longer timeline as your baseline assumption protects you if things move slower than hoped.",
      "Financially, you look genuinely prepared — real numbers and a real plan for the slow early months, rather than hoping it works out. Use that same rigor to build a simple monthly tracking sheet once you start: actual income vs. your projection, so you catch a slower-than-planned ramp-up early rather than a few months in.",
    ],
    developing: [
      "Your financial awareness is above average, but the plan is still general rather than specific. Turning 'roughly prepared' into 'actually protected' is the work left to do here — that means an exact monthly budget for 24 months, an itemized startup cost quote, and a specific answer for how your schedule will actually align with when clients want to book.",
      "You're aware of the financial realities here, but the specifics still need sharpening — exact numbers, not rough estimates, are what separate 'probably fine' from 'actually covered.' Sit down and write out the real monthly gap between your expenses and your likely early income; that single number will tell you exactly how much runway you still need to build.",
      "There's a reasonable financial foundation here, but it's not fully built out yet. A few concrete numbers would take this from a general sense to an actual plan: your total startup cost from an itemized quote, your monthly expenses, and a realistic month-by-month income ramp for the first two years.",
    ],
    weak: [
      "The financial reality of building a nail tech career — startup costs, the ramp-up period, and the schedule needed to build a client base — has real gaps in your current preparation. This is the most common reason nail techs leave within two years, and it's almost always a planning gap rather than a talent gap: the work is fine, but the money runs out before the client base catches up.",
      "This is where the biggest risk sits right now. The startup investment, the slow ramp-up, and the schedule this career demands don't yet have a real plan behind them. Before enrolling, get an itemized cost quote from at least one school, write out 24 months of expected income and expenses side by side, and treat any shortfall as something to solve now, not later.",
      "Financially, this looks like the area most likely to derail things if it isn't addressed before you enroll — the ramp-up period especially is where most new techs get caught off guard. The good news is this is entirely fixable with planning: it just requires real numbers on paper before you commit money you can't get back.",
    ],
  },
  clients: {
    strong: [
      "Client relationships are the real engine of this career, and you appear to understand that already. Holding safety boundaries, enforcing policy, and staying service-first is what fills and keeps a full book, far more than technical skill alone. Keep building on this by rehearsing your hardest conversations (a no-show, an unsafe request) before you're in a real one, so this strength holds up under actual pressure, not just in theory.",
      "You already get what a lot of new techs learn the hard way — that this job runs on people skills as much as technical skill. Boundaries, safety instincts, and service mindset all look solid. The next step is turning these instincts into specific scripts you can use word-for-word, since even strong instincts can wobble the first time you're actually saying no to a real person.",
      "Your instincts with clients — holding a safety line, enforcing policy, staying service-oriented — are already where most techs end up after a few hard years of learning it. Protect that head start by writing your policies down clearly (deposits, no-shows, safety refusals) before your first client, so consistency doesn't depend on how you're feeling that day.",
    ],
    developing: [
      "You have solid instincts, but real-pressure scenarios — an unsafe request, an awkward fee conversation — would likely test you. These are learnable skills that need deliberate practice, specifically: write down the exact words you'd use in your two or three hardest client scenarios, and say them out loud until they feel natural rather than confrontational.",
      "The foundation is there, but specific pressure-moments — refusing an unsafe request, actually charging a no-show fee — are where you'd likely still hesitate. Practice closes that gap faster than experience alone does; rehearsing the conversation before it happens for real removes the improvisation that usually causes people to cave under pressure.",
      "You're not far off, but a few real-world scenarios (an unsafe request, a client pushing back on a policy) would probably catch you off guard right now. Worth rehearsing before it happens for real — talk to a working nail tech about how they actually handle these moments, since hearing real scripts is more useful than imagining your own.",
    ],
    weak: [
      "Client management is likely to be a significant challenge based on your responses — whether that's holding a line under pressure or staying service-first on hard days. This is learnable, but it needs real preparation: start by writing down exactly what you'd say when a client pushes back on safety or policy, since the words matter more than the intention in the actual moment.",
      "This looks like a genuine soft spot — holding boundaries under pressure and staying service-first when it's hard aren't things you seem confident in yet. That's fixable, but it takes deliberate work before you're facing a real client: practice the specific conversations (a no-show fee, an unsafe request) until the words come automatically rather than needing to be invented under pressure.",
      "Client-facing situations appear to be where you'd struggle most right now — enforcing a line, staying professional under pressure. Worth building this skill set before your first real client, ideally by shadowing a working tech through a few of these exact moments so you see what actually works in practice, not just in theory.",
    ],
  },
  business: {
    strong: [
      "You understand that a license is the starting line, not the finish line. Self-discipline, ongoing education, and a plan to stand out are all things you've genuinely thought through. That combination is rare, and it's specifically what separates techs who are still building a thriving business five years in from those who plateaued after their first year.",
      "You're already thinking past the license itself — ongoing learning, self-discipline, and standing out in a crowded market are all on your radar, not afterthoughts. From here, turn that thinking into a written plan: a specific annual education budget, and one clear sentence describing what makes you different from other techs nearby.",
      "The business side of this career — discipline, continued learning, differentiation — looks like something you've genuinely planned for, not just something you'll figure out later. Keep that edge sharp by revisiting your niche and differentiation plan every few months as the market shifts, since what makes you stand out today may need updating in a year.",
    ],
    developing: [
      "You have some of the right instincts, but self-employment discipline, ongoing learning, or a differentiation plan are still underdeveloped — all fixable with deliberate planning rather than personality change. Start with whichever feels weakest: a short small-business basics course, a specific annual education budget, or one clear sentence about what makes you different from the tech down the street.",
      "There's a reasonable foundation here, but parts of the business side — discipline, ongoing education, a real niche — still need more concrete thinking before they're solid. None of these require natural talent; they require specific, written answers, which is work you can do before you ever take on a paying client.",
      "You're partway there on the business side. A bit more specific planning around discipline, continued learning, or standing out would close the remaining gap — pick one area to firm up first, since trying to solve all three at once usually means none of them get done properly.",
    ],
    weak: [
      "Running a nail career long-term takes more than technical skill. Business discipline, ongoing education, and a plan to differentiate don't appear to be part of your planning yet, and this is exactly the gap that causes technically talented techs to struggle financially even when their work is excellent. It's addressable, but it needs specific attention, not just more time practicing the craft.",
      "The business side of this career — self-discipline, staying current, standing out in a crowded market — looks like it hasn't been part of your planning so far. Before you enroll, spend a week specifically researching this: a short business basics course, a look at what similar techs near you actually charge and offer, and a real answer to why a client would pick you.",
      "This looks like an area you haven't spent much time thinking through yet — the parts of the job that come after licensing: running a business, staying current, differentiating yourself. Treat this as seriously as the technical training itself, since it's just as often the reason a nail career doesn't sustain itself long-term.",
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

// ── DIAGNOSTIC (fuller paragraph, built from the weakest section) ───────────
// 3 phrasing variants per tier/section — each now covers the "what", the
// "why it matters", and a concrete "what to do about it" in one paragraph.
const NARRATIVES: Record<Tier, Record<SectionId, string[]>> = {
  strong: {
    body: [
      "You've thought about what this career requires from your body in ways most candidates don't consider until they're already dealing with the consequences. Physical readiness is your strongest area, which means it isn't where your attention needs to go next — the other sections are. Use the same deliberate thinking you've already shown here on whichever area scored lowest in your breakdown below.",
      "Physical readiness is genuinely your strongest area. Most candidates don't think this through until it's already causing problems — you clearly have, and that's a real advantage heading into a physically demanding career. The section breakdown below shows exactly where to redirect that same level of thought next.",
      "You're ahead of the curve physically. The daily realities of this job — chemicals, sustained posture, hands-on contact — don't seem to be blind spots for you the way they are for most people. That's one less thing to worry about as you move into the areas below that need more attention.",
    ],
    money: [
      "What separates nail techs who thrive from those who leave within two years almost always comes down to financial preparation, and yours is in good shape. Your remaining work is refinement, not a rebuild — confirm the exact numbers behind your plan and stress-test them against a slower-than-expected ramp-up. From there, focus your attention on whichever section below scored lowest.",
      "Financial preparation is the single biggest predictor of who makes it through the first two years, and you're already there. What's left is tightening details, not starting over: a written monthly budget for 24 months, and an itemized cost quote if you haven't gotten one yet. The section breakdown below shows where your remaining preparation is best spent.",
      "You've done the hard part financially — planning for the slow ramp-up before it happens rather than during it. From here it's just fine-tuning the specifics. Direct that same rigor toward whichever section scored lowest in your results below.",
    ],
    clients: [
      "The ability to hold safety boundaries, enforce policy, and stay service-first is what builds a loyal, full book over time. Spend your remaining preparation time matching your other sections to this level — this is genuinely one of the harder skills to develop, and you already have it.",
      "Client-facing instincts like yours — safety boundaries, policy enforcement, staying service-oriented — are what actually fill a book long-term. This is a real strength to build the rest of your preparation around; most techs spend years learning what you already seem to understand.",
      "You've already got the piece most techs spend years learning the hard way: how to hold a line with clients without losing them. Everything else can catch up to this — focus your remaining preparation on whichever section below scored lowest.",
    ],
    business: [
      "You already understand that licensing is the starting point, not the destination. This kind of long-term thinking is what separates nail techs who build lasting careers from those who plateau after year one. Use that same forward-thinking on whichever section below needs the most work.",
      "Thinking past the license itself — toward ongoing learning and standing out — is what separates techs with lasting careers from those who plateau. You're already there, which frees you up to focus your remaining preparation on the section below that scored lowest.",
      "You're treating this as a long-term business, not just a skill to learn once. That mindset is what keeps a career going past the first couple of years, and it's rarer than it should be among new candidates.",
    ],
  },
  developing: {
    body: [
      "The physical demands of this career are non-negotiable and daily. Your responses suggest some gaps worth honest attention, ideally from a doctor or a working nail tech, before school — not because the career is wrong for you, but because a few weeks of preparation now beats discovering a limit mid-career.",
      "Some real gaps showed up in the physical side of your readiness. Worth getting honest input, medical if relevant, before this becomes an expensive discovery later. This is a fixable gap, but it needs to be addressed on purpose rather than assumed away.",
      "The day-to-day physical reality of this job — long hours, chemical exposure, hands-on contact — isn't fully accounted for in your current preparation. Worth addressing directly before enrolling, since these are the parts of the job that don't have a workaround once you're doing them daily.",
    ],
    money: [
      "You have genuine interest and some important foundations in place, but the financial side of your planning is still general rather than specific. This is the most fixable type of readiness gap — it just needs real numbers: an exact monthly budget for the next 24 months and an itemized startup cost quote.",
      "There's a decent financial foundation here, but it's still more 'rough idea' than 'actual plan.' This is the easiest gap to close — it just takes sitting down with real numbers rather than general awareness that costs exist.",
      "Your financial thinking is on the right track but not yet concrete enough to rely on. A specific plan, not just general awareness, is what would close this gap — write out the actual monthly shortfall between expenses and expected early income, and treat that number as your real target.",
    ],
    clients: [
      "Client relationships will be both your biggest opportunity and your biggest daily test. Real-pressure scenarios would likely test you, but these are skills you can build deliberately before you're in a professional setting — specifically by rehearsing the exact words for your two or three hardest client situations.",
      "You've got decent instincts with clients, but specific high-pressure moments — an unsafe request, a fee conversation — would likely catch you off guard right now. Practice fixes that faster than experience alone, since rehearsed words hold up better under real pressure than improvised ones.",
      "The foundation for good client relationships is there, but it hasn't been tested against real pressure yet. Rehearsing the hard conversations now beats learning them live in front of an actual client.",
    ],
    business: [
      "You have some of the right instincts, but self-employment discipline, ongoing education, or a differentiation plan are still underdeveloped. None of these are fixed traits — they're specific things you can build before you need them, starting with whichever feels weakest right now.",
      "The business side isn't a blind spot for you, but it's not solid yet either — discipline, ongoing learning, and standing out all need more concrete planning rather than good intentions alone.",
      "You're partway toward treating this like a real business rather than just a skill. A bit more specific planning on the operational side would close the gap, and it's the kind of work you can do entirely before your first paying client.",
    ],
  },
  weak: {
    body: [
      "Your responses raise real questions that need honest answers before you invest in school. Get clarity first, medically if relevant, then build a preparation plan from a place of honest information rather than hope. If the concern turns out to be manageable, you'll enroll with real confidence; if not, you'll have avoided a costly mistake.",
      "The physical side of this career looks like a genuine obstacle based on your answers — not something enthusiasm will resolve. Get real input before spending money on school, specifically a conversation with a doctor about the exact demands rather than a general career conversation.",
      "This is the area most worth pausing on. The physical demands of this job are daily and non-negotiable, and your responses suggest they'd be a real struggle. That's worth resolving now, while it costs nothing but time, rather than after enrollment.",
    ],
    money: [
      "The financial reality of this career has significant gaps in your current preparation right now — not awareness, preparation. This is the single most common reason nail techs leave the profession within two years, and it's almost always solvable with planning, not talent.",
      "Financially, this is the area putting the rest of your plan at risk. The ramp-up period especially is where under-preparation turns into an early exit from the profession. Before enrolling, get real numbers on paper: an itemized cost quote and a 24-month income-versus-expenses projection.",
      "This is the section most likely to derail things if it isn't addressed. Without a real financial plan, the slow early months of this career become a serious problem rather than an expected phase — and that problem is entirely avoidable with a few hours of honest budgeting now.",
    ],
    clients: [
      "Client management is likely to be one of your most significant challenges based on your responses. These skills are learnable, but the time to build them is before your first paying client, not while they're in the chair — start by writing down the exact words for your hardest conversations.",
      "This looks like a genuine weak spot — holding boundaries, staying professional under pressure. It's learnable, but it needs deliberate work before you're facing a real client, ideally through shadowing a working tech through these exact moments.",
      "Client-facing situations appear to be where your preparation is thinnest right now. Worth building this skill set specifically before you're in a professional setting for the first time, since this is the part of the job that doesn't improve just by practicing nail technique.",
    ],
    business: [
      "Running a nail career long-term takes more than technical skill. This side of the career doesn't appear to be part of your planning yet, and it needs specific preparation, not just more time on the craft — this is exactly what causes technically skilled techs to struggle financially.",
      "The business side of this career hasn't been part of your thinking so far — discipline, staying current, differentiating yourself. That's a real gap, not a minor one, and it's worth addressing with the same seriousness as the technical training itself.",
      "This looks like an area you haven't engaged with much yet. Running a business, not just doing the craft, is what actually sustains a career past the first year or two — and it's entirely learnable if you start now rather than after you're already struggling.",
    ],
  },
};

const DIAGNOSTIC_FALLBACK: Record<"strong" | "mixed", string[]> = {
  strong: [
    "Your results show a genuinely strong foundation across all four areas of career readiness. Use your section scores to identify the one or two areas worth refining further before your first day of school.",
    "You're in strong shape across every section. From here, it's about polishing the one or two areas that scored a bit lower than the rest, rather than any kind of major rebuild.",
    "This is a genuinely solid all-around result. Use the section breakdown below to fine-tune rather than overhaul anything — you're closer to ready than most people who take this quiz.",
  ],
  mixed: [
    "Your results show a mixed picture — genuine strengths in some areas and real gaps in others. The gaps are addressable, but they need specific preparation, starting with your lowest section score below.",
    "There's a real mix here — clear strengths alongside clear gaps. Start with whichever section scored lowest; that's where focused preparation will matter most before you commit financially.",
    "You've got real strengths to build on and specific gaps to close. The section breakdown below shows exactly where to focus first, so your remaining preparation time is spent where it counts most.",
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
// 5 specific, actionable items per section (up from 3) for the gated report.
export const NEXT_STEPS: Record<SectionId, string[]> = {
  body: [
    "Speak with a doctor specifically about this career's chemical and physical demands — bring the actual product list (acrylics, gels, acetone) so they can give a real assessment",
    "Research ergonomic workstation setups used by nail techs — invest in the right chair, lighting, and wrist support before the career, not after the injury",
    "Talk to a working nail tech honestly about hands-on client contact and how it actually feels day to day, including how it changed for them after the first month",
    "Ask a local salon if you can shadow a real shift for a few hours before enrolling, to physically test your tolerance rather than guessing",
    "Build a basic PPE and ventilation habit now — mask, downdraft table if possible — so it's routine before your first paying client, not an afterthought",
  ],
  money: [
    "Build your exact ramp-up financial plan — monthly expenses vs. realistic client income month by month for 24 months, not a rough estimate",
    "Get an itemized quote from at least two schools covering tuition, licensing, tools, products, insurance, and a living buffer before you commit a deposit",
    "Map your actual weekly availability against evening/weekend demand to see if your schedule truly supports this career's peak booking times",
    "Set up a simple monthly tracking sheet (actual income vs. your projection) so you can catch a slower-than-planned ramp-up early rather than months in",
    "If the numbers don't currently work, price out a part-time job or reduced course load that stretches your timeline instead of creating a financial cliff",
  ],
  clients: [
    "Write and practise your unsafe-request refusal script out loud before your first client, including how you'll respond if they push back",
    "Practise policy enforcement conversations (deposits, no-shows) out loud — write the exact words you'd use, and put the policy in writing on your booking form",
    "Shadow or speak with a working nail tech specifically about their most difficult client situations and how they actually handled them",
    "Draft your written cancellation and late policy now, before you have a real client, so enforcing it later is pointing to something they already agreed to",
    "Build a short personal reset routine (a few minutes between appointments) so a difficult client doesn't carry over into the next one",
  ],
  business: [
    "Take a short small-business basics course covering taxes, scheduling, and marketing before you need them for real — many community colleges or SBA chapters offer free ones",
    "Build a specific plan and budget for ongoing education in your first two years, not just your initial licensing, including which specific skills you want to develop",
    "Spend a week researching competitors near you and write down one clear thing that would make a client choose you over them",
    "If self-employment still feels overwhelming, research salon-employed positions as a legitimate first step while you build business skills and confidence",
    "Set up a simple system now for tracking income, expenses, and appointments — even a basic spreadsheet — so it's a habit before your business gets busy",
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
