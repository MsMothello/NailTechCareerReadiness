import { QuizSection, QuizOption } from "./quizTypes";

// ─────────────────────────────────────────────────────────────────────────────
// NAIL TECH READINESS QUIZ — question bank
// Fixed set of 12 questions (Body ×3, Money ×3, Clients ×3, Business ×3).
// Every question always appears, in the same order, every time.
// Each question has 4 rephrased variants with identical scoring — one is
// picked at random per question per attempt, so no two attempts read the
// same even though the underlying 12 questions never change.
// ─────────────────────────────────────────────────────────────────────────────

export type SectionId = "body" | "money" | "clients" | "business";

export const SECTIONS: Record<SectionId, QuizSection> = {
  body: { id: "body", title: "Body", color: "#db2777", lightColor: "#fdf2f8" },
  money: { id: "money", title: "Money", color: "#9333ea", lightColor: "#f5f3ff" },
  clients: { id: "clients", title: "Clients", color: "#c026d3", lightColor: "#fdf4ff" },
  business: { id: "business", title: "Business", color: "#be185d", lightColor: "#fdf2f8" },
};

export type FlagLevel = "critical" | "advisory";

export interface QuestionVariant {
  question: string;
  options: QuizOption[];
}

export interface QuestionDef {
  id: string;
  sectionId: SectionId;
  flag?: {
    type: FlagLevel;
    message: string;
    remedy: string;
  };
  variants: QuestionVariant[];
}

const O = (letter: string, text: string, value: number): QuizOption => ({ letter, text, value });

export const QUESTION_DEFS: QuestionDef[] = [
  // ── BODY ──────────────────────────────────────────────────────────────
  {
    id: "B1-chemical",
    sectionId: "body",
    flag: {
      type: "critical",
      message:
        "You indicated a real chemical or respiratory sensitivity. Daily exposure to nail product fumes and dust is unavoidable in this career.",
      remedy:
        "Speak with a doctor who understands occupational chemical exposure before investing in school — this is a medical question, not a willpower question.",
    },
    variants: [
      {
        question: "Do you have any chemical sensitivities, allergies, or respiratory issues?",
        options: [
          O("A", "Yes, significant — I react strongly to chemicals and strong smells regularly", 1),
          O("B", "I have asthma or moderate allergies — unsure how I'd manage daily exposure", 2),
          O("C", "Mild sensitivities but manageable with proper ventilation and masks", 3),
          O("D", "No known sensitivities, allergies, or respiratory issues at all", 4),
        ],
      },
      {
        question:
          "Nail work means daily exposure to strong chemical fumes and fine dust. Do you have any allergies, asthma, or sensitivities that could be triggered by that?",
        options: [
          O("A", "Yes — I have a real reaction to chemical smells and it happens often", 1),
          O("B", "I have asthma or fairly significant allergies and I'm not sure how I'd cope with constant exposure", 2),
          O("C", "I have some mild sensitivities but they're manageable with a mask and good ventilation", 3),
          O("D", "No — I don't have any allergies or respiratory issues that would be affected by this", 4),
        ],
      },
      {
        question:
          "Acrylics, gels, and polish remover produce fumes and dust you'll be breathing in every single day. How does your body typically respond to that kind of exposure?",
        options: [
          O("A", "Badly — I react strongly and it happens on a regular basis", 1),
          O("B", "I have asthma or notable allergies and I honestly don't know how daily exposure would go", 2),
          O("C", "I get mild reactions sometimes but ventilation and a mask keep it under control", 3),
          O("D", "It doesn't affect me — I have no relevant allergies or breathing issues", 4),
        ],
      },
      {
        question:
          "Before committing to this career, it's worth being honest about your body's tolerance for chemicals. Do fumes, dust, or strong smells from nail products cause you any physical reaction?",
        options: [
          O("A", "Yes, definitely — chemical smells set off a strong reaction for me fairly often", 1),
          O("B", "Possibly — I have asthma or moderate allergies and haven't tested them against this kind of exposure", 2),
          O("C", "A little — I notice mild sensitivity but it's fine with proper precautions", 3),
          O("D", "Not at all — I have no chemical sensitivities, allergies, or respiratory concerns", 4),
        ],
      },
    ],
  },
  {
    id: "B2-stamina",
    sectionId: "body",
    flag: {
      type: "critical",
      message:
        "The 8–10 hour fixed-position, repetitive-motion demand of this career is not optional or occasional — it's the daily baseline.",
      remedy: "Get honest input from a doctor or physical therapist before committing financially to school.",
    },
    variants: [
      {
        question: "Are you comfortable being on your feet or seated in a fixed position for 8–10 hours a day?",
        options: [
          O("A", "I already struggle with this in less physically demanding jobs", 1),
          O("B", "I have some existing back, neck, or wrist issues I'd need to manage carefully", 2),
          O("C", "Mostly, with proper breaks and an ergonomic setup", 3),
          O("D", "Yes — I'm physically comfortable with sustained, repetitive work", 4),
        ],
      },
      {
        question:
          "A full workday in this career means 8–10 hours in essentially the same seated position doing detailed hand work. How does your body handle that kind of sustained demand?",
        options: [
          O("A", "Not well — I find this hard even in jobs that are less physically demanding", 1),
          O("B", "I have some back, neck, or wrist issues already that this would likely aggravate", 2),
          O("C", "I can manage it as long as I get regular breaks and set my station up properly", 3),
          O("D", "Very well — sustained, repetitive physical work doesn't bother me", 4),
        ],
      },
      {
        question:
          "This job involves staying in a fixed position for most of an 8–10 hour shift, doing precise hand movements the whole time. Realistically, can your body sustain that?",
        options: [
          O("A", "Realistically, no — I struggle with this kind of demand even at a lower intensity", 1),
          O("B", "I have existing physical issues (back, neck, wrist) that make me unsure", 2),
          O("C", "With breaks and good ergonomics, yes, I think I can handle it", 3),
          O("D", "Yes, without much concern — I'm built for sustained, detailed physical work", 4),
        ],
      },
      {
        question:
          "Nail techs spend most of the day seated in one position doing fine motor work for 8 to 10 hours straight. Is that something your body can genuinely sustain?",
        options: [
          O("A", "No — that level of sustained physical demand is already a struggle for me elsewhere", 1),
          O("B", "I have some existing wrist, neck, or back issues that concern me here", 2),
          O("C", "I believe so, especially with proper breaks and ergonomic setup", 3),
          O("D", "Absolutely — I handle sustained physical and repetitive work well", 4),
        ],
      },
    ],
  },
  {
    id: "B3-contact",
    sectionId: "body",
    flag: {
      type: "advisory",
      message:
        "Discomfort with hands-on physical contact is common early on, but it's worth being honest about now rather than assuming it resolves on its own.",
      remedy: "Talk to a working nail tech about how this actually feels day to day before enrolling.",
    },
    variants: [
      {
        question:
          "Are you emotionally okay with physical contact with strangers — including feet, ingrown nails, and occasional skin conditions?",
        options: [
          O("A", "This makes me genuinely uncomfortable and I'm not sure I'd ever adjust", 1),
          O("B", "A bit squeamish but I think I could get used to it", 2),
          O("C", "Mostly fine — some minor adjustment needed early on", 3),
          O("D", "Completely comfortable — this doesn't bother me at all", 4),
        ],
      },
      {
        question:
          "This job involves close physical contact with strangers every day — hands, feet, ingrown nails, sometimes visible skin conditions. How do you feel about that, honestly?",
        options: [
          O("A", "Genuinely uncomfortable — I doubt I'd ever fully get used to it", 1),
          O("B", "A little squeamish, but I think time and experience would help", 2),
          O("C", "Generally fine, maybe a short adjustment period at the start", 3),
          O("D", "Totally comfortable — none of that bothers me", 4),
        ],
      },
      {
        question:
          "You'll be working hands-on with strangers' feet and hands, including occasional ingrown nails or skin issues, all day, every day. Does that sit okay with you?",
        options: [
          O("A", "Not really — I find this genuinely difficult to imagine getting comfortable with", 1),
          O("B", "A bit, but I expect I'd adjust with more exposure over time", 2),
          O("C", "Yes, for the most part, aside from a brief adjustment period", 3),
          O("D", "Yes, completely — physical contact like this has never bothered me", 4),
        ],
      },
      {
        question:
          "Nail services mean prolonged, hands-on contact with clients' feet and hands — including nails and skin that aren't always in perfect condition. Where are you with that emotionally?",
        options: [
          O("A", "Honestly uncomfortable, and I'm not confident that changes over time", 1),
          O("B", "Somewhat squeamish, but I think I'd get used to it", 2),
          O("C", "Fine overall, maybe some initial getting-used-to", 3),
          O("D", "Completely at ease — this kind of contact has never bothered me", 4),
        ],
      },
    ],
  },

  // ── MONEY ─────────────────────────────────────────────────────────────
  {
    id: "M1-runway",
    sectionId: "money",
    flag: {
      type: "critical",
      message:
        "Without financial reserves or a supplemental income plan, the 6–24 month client-building ramp-up is a serious financial risk — the single most common reason nail techs leave the profession in their first two years.",
      remedy: "Build a specific financial plan that covers this full period before enrolling.",
    },
    variants: [
      {
        question: "Can you financially survive the ramp-up period (typically 6–24 months to build a clientele)?",
        options: [
          O("A", "No — I need reliable income right away", 1),
          O("B", "Not really — I'd need to earn quickly or keep my current job simultaneously", 2),
          O("C", "Somewhat — a few months cushion but I'd need to hustle hard", 3),
          O("D", "Yes — I have savings or income support to cover this period", 4),
        ],
      },
      {
        question:
          "It typically takes 6 to 24 months to build a full client base in this industry. Could you financially get through that stretch with little or unpredictable income?",
        options: [
          O("A", "No — I need dependable income starting right away", 1),
          O("B", "Not really — I'd have to earn money quickly or hold onto another job at the same time", 2),
          O("C", "To some degree — I have a short cushion but would need to work hard to stretch it", 3),
          O("D", "Yes — I have savings or another income source that covers this whole period", 4),
        ],
      },
      {
        question:
          "Building a reliable clientele usually takes somewhere between 6 months and 2 years. Is your financial situation set up to survive that stretch of slow or inconsistent income?",
        options: [
          O("A", "No — I can't go without steady income for any real length of time", 1),
          O("B", "Not really — I'd be relying on quick income or a second job to get by", 2),
          O("C", "Somewhat — I have some savings but would be stretching it thin", 3),
          O("D", "Yes — I'm financially prepared with savings or support that covers the full ramp-up", 4),
        ],
      },
      {
        question:
          "The first 6 to 24 months of this career often come with unpredictable, low income while you build a client base. Can you genuinely afford to weather that?",
        options: [
          O("A", "No — I need consistent income immediately, not later", 1),
          O("B", "Not really — I'd need fast income or a second job running alongside this", 2),
          O("C", "Somewhat — I have a partial cushion, but it would mean hustling hard", 3),
          O("D", "Yes — I have the savings or income support to fully cover this period", 4),
        ],
      },
    ],
  },
  {
    id: "M2-investment",
    sectionId: "money",
    flag: {
      type: "advisory",
      message:
        "If the $3,000–$10,000+ startup investment was new information or currently unaffordable, your financial preparation isn't complete yet.",
      remedy:
        "Build a full, itemized cost estimate — tuition, licensing, tools, products, insurance, living buffer — before committing to a deposit.",
    },
    variants: [
      {
        question: "Are you willing to invest $3,000–$10,000+ in quality education, tools, and products before you earn a dime?",
        options: [
          O("A", "That's beyond what I can commit to financially right now", 1),
          O("B", "I was hoping it would cost much less than that", 2),
          O("C", "I can do it but it would stretch my finances significantly", 3),
          O("D", "Yes — I've budgeted for this and understand it's a necessary investment", 4),
        ],
      },
      {
        question:
          "Getting properly trained and equipped in this field usually costs $3,000 to $10,000 or more, spent before you make any money back. Are you financially ready for that?",
        options: [
          O("A", "No — that's more than I can realistically commit to right now", 1),
          O("B", "I assumed it would cost significantly less than that", 2),
          O("C", "I could manage it, but it would put real strain on my finances", 3),
          O("D", "Yes — I've planned for this and see it as a necessary upfront investment", 4),
        ],
      },
      {
        question:
          "Quality nail school, tools, and starting supplies together typically run $3,000 to $10,000+, and none of it comes back to you until you have paying clients. Is that a cost you can absorb?",
        options: [
          O("A", "Not currently — that figure is out of reach for me right now", 1),
          O("B", "Honestly, I expected it to cost a lot less than that", 2),
          O("C", "I think I could make it work, though it would be a financial stretch", 3),
          O("D", "Yes — I've already budgeted for it and I see it as essential, not optional", 4),
        ],
      },
      {
        question:
          "Before earning a single dollar in this career, you'll likely need to spend $3,000 to $10,000+ on schooling, tools, and product. Are you prepared to make that investment?",
        options: [
          O("A", "No — that amount isn't something I can commit to at this point", 1),
          O("B", "That's a lot more than I was expecting to pay", 2),
          O("C", "I could pull it together, but it would stretch my finances significantly", 3),
          O("D", "Yes — I've planned and budgeted for exactly this kind of investment", 4),
        ],
      },
    ],
  },
  {
    id: "M3-schedule",
    sectionId: "money",
    flag: {
      type: "advisory",
      message: "Evenings and weekends are peak booking time in this industry, not an occasional requirement.",
      remedy: "If your schedule genuinely can't flex, factor that limitation into your income projections before committing to a school.",
    },
    variants: [
      {
        question: "Are you okay with non-traditional hours (evenings/weekends) to build clients?",
        options: [
          O("A", "I can't do evenings/weekends", 1),
          O("B", "Rarely — only sometimes", 2),
          O("C", "For a season while building", 3),
          O("D", "Yes — my schedule can match demand", 4),
        ],
      },
      {
        question:
          "Most clients want appointments in the evenings and on weekends, since that's when they're off work. Can your schedule actually accommodate that?",
        options: [
          O("A", "No — evenings and weekends aren't available to me", 1),
          O("B", "Only occasionally, not as a regular thing", 2),
          O("C", "I could do it temporarily while I'm building my clientele", 3),
          O("D", "Yes — my schedule is flexible enough to match when clients want to book", 4),
        ],
      },
      {
        question:
          "Building a client base usually means working evenings and weekends, since that's peak demand time. Is that realistic for your life right now?",
        options: [
          O("A", "Not realistic at all — those hours are unavailable to me", 1),
          O("B", "Only in rare cases, not consistently", 2),
          O("C", "I'd be willing to do it for a period while I grow my client list", 3),
          O("D", "Yes — I can genuinely work around client demand, including evenings and weekends", 4),
        ],
      },
      {
        question:
          "This career runs on evening and weekend availability far more than a typical 9-to-5. Does your current life allow for that kind of schedule?",
        options: [
          O("A", "No — my evenings and weekends are already committed elsewhere", 1),
          O("B", "Rarely, and only in specific situations", 2),
          O("C", "Temporarily, yes — while I'm working to build up my clientele", 3),
          O("D", "Yes, completely — my schedule can flex to match client demand", 4),
        ],
      },
    ],
  },

  // ── CLIENTS ───────────────────────────────────────────────────────────
  {
    id: "C1-safety",
    sectionId: "clients",
    flag: {
      type: "critical",
      message:
        "Complying with an unsafe service request — even under real client pressure — puts the client's health at direct risk and places your license in jeopardy.",
      remedy: "Develop a clear, practiced refusal response for this exact situation before you're in a professional setting.",
    },
    variants: [
      {
        question: "Can you confidently say \"no\" to unsafe requests (over-filing, MMA, etc.)?",
        options: [
          O("A", "I'd do it to keep the client", 1),
          O("B", "I'd hesitate but might comply", 2),
          O("C", "I can say no with clear guidelines", 3),
          O("D", "I will always refuse unsafe work and explain why", 4),
        ],
      },
      {
        question:
          "A client asks for something you know is unsafe — over-filing the nail plate, using a banned product like MMA. Can you actually say no, even if it risks losing them?",
        options: [
          O("A", "I'd probably go along with it rather than risk losing the client", 1),
          O("B", "I'd try to push back, but I'm not confident I'd hold firm if they insisted", 2),
          O("C", "Yes, I can decline, especially if I have clear professional guidelines to point to", 3),
          O("D", "Yes, without hesitation — I'll always refuse unsafe work and explain exactly why", 4),
        ],
      },
      {
        question:
          "Some clients will ask for things that put their nail health at risk — aggressive filing, unsafe products. When that happens, will you actually hold the line?",
        options: [
          O("A", "Probably not — keeping the client would likely win out", 1),
          O("B", "I'd try, but I might cave under enough pressure", 2),
          O("C", "Yes, I'm comfortable declining when I have clear standards to fall back on", 3),
          O("D", "Absolutely — this is a hard line for me, no exceptions, and I'll explain why", 4),
        ],
      },
      {
        question:
          "Imagine a client insists on an unsafe service — something like over-filing or an unapproved chemical. Are you someone who can refuse, even if it costs you the booking?",
        options: [
          O("A", "Honestly, I'd likely comply to avoid conflict or losing the client", 1),
          O("B", "I'd attempt to refuse but I'm not sure I'd stay firm under real pressure", 2),
          O("C", "Yes, I can turn it down as long as I have clear policies to lean on", 3),
          O("D", "Yes, completely — I refuse unsafe work every time and explain my reasoning", 4),
        ],
      },
    ],
  },
  {
    id: "C2-service",
    sectionId: "clients",
    variants: [
      {
        question:
          "On most days, you'll spend more time managing chatty clients, personalities, and last-minute changes than doing intricate nail art. How does that reality sit with you?",
        options: [
          O("A", "That would be a real problem — I got into this for the art, not for managing people", 1),
          O("B", "I'd find it draining but could push through most days", 2),
          O("C", "I'd accept it as part of the job even if it's not my favorite part", 3),
          O("D", "That's genuinely fine with me — I know this job is about people first, nails second", 4),
        ],
      },
      {
        question:
          "Most of your working day won't be intricate nail art — it'll be conversation, personalities, and last-minute schedule changes. How do you feel about that being the bulk of the job?",
        options: [
          O("A", "That's a real issue for me — I'm here for the craft, not for managing people all day", 1),
          O("B", "It would wear on me, but I think I could get through most days okay", 2),
          O("C", "I'd take it in stride, even though it's not the part I'm most excited about", 3),
          O("D", "Completely fine — I know this career is fundamentally about people, with the art second", 4),
        ],
      },
      {
        question:
          "The honest reality of this job is more talking, listening, and handling last-minute requests than doing creative nail work. Does that change how you feel about the career?",
        options: [
          O("A", "Yes, honestly — I want to focus on the art, not spend my day managing people", 1),
          O("B", "It would be draining, but I could probably manage most of the time", 2),
          O("C", "I can accept that trade-off, even if it's not my favorite part of the job", 3),
          O("D", "Not at all — I already understand this is a people-first job before it's a craft", 4),
        ],
      },
      {
        question:
          "Nail techs spend far more time on client conversation, personality management, and schedule juggling than on the artistic side of the work. How do you feel knowing that?",
        options: [
          O("A", "That's genuinely discouraging — the art is why I want to do this, not managing people", 1),
          O("B", "It would take a toll on me, but I think I'd cope on most days", 2),
          O("C", "I'm okay with that reality even though it's not the part that excites me most", 3),
          O("D", "That's totally fine by me — I already see this as a people-first career", 4),
        ],
      },
    ],
  },
  {
    id: "C3-boundaries",
    sectionId: "clients",
    flag: {
      type: "advisory",
      message: "Difficulty enforcing policies is one of the most common ways nail tech businesses quietly lose money.",
      remedy: "Practise the exact words you'd use in a no-show or late-fee conversation before you need them for real.",
    },
    variants: [
      {
        question: "Can you enforce policies (deposits, late/no-show) without guilt?",
        options: [
          O("A", "I avoid confrontation and let it slide", 1),
          O("B", "I try but usually give in", 2),
          O("C", "I can do it with scripts/practice", 3),
          O("D", "I'm consistent and comfortable enforcing policies", 4),
        ],
      },
      {
        question:
          "A client no-shows or arrives significantly late, and your policy says there's a fee. Can you actually enforce that without feeling guilty about it?",
        options: [
          O("A", "I tend to avoid the confrontation entirely and just let it go", 1),
          O("B", "I try to enforce it, but I usually end up backing down", 2),
          O("C", "I can do it, especially if I've practiced or scripted the conversation ahead of time", 3),
          O("D", "Yes — I'm consistent about enforcing my policies and it doesn't weigh on me", 4),
        ],
      },
      {
        question:
          "You have deposit and late/no-show policies in place. When it's time to actually apply them to a real client, do you follow through, or does guilt get in the way?",
        options: [
          O("A", "Guilt usually wins — I let it slide rather than confront it", 1),
          O("B", "I attempt to enforce it but often cave under the pressure", 2),
          O("C", "With some preparation or a script, I can hold my ground", 3),
          O("D", "I hold the line every time — enforcing policy doesn't bother me", 4),
        ],
      },
      {
        question:
          "Enforcing a no-show fee or deposit policy means having an uncomfortable conversation with a real person. Are you able to do that consistently, without guilt?",
        options: [
          O("A", "Not really — I avoid the confrontation and just absorb the loss", 1),
          O("B", "I try, but I usually end up giving in when pushed", 2),
          O("C", "Yes, particularly if I've rehearsed how to say it", 3),
          O("D", "Yes, completely — I enforce my policies consistently and without hesitation", 4),
        ],
      },
    ],
  },

  // ── BUSINESS ──────────────────────────────────────────────────────────
  {
    id: "BZ1-discipline",
    sectionId: "business",
    flag: {
      type: "advisory",
      message: "Self-employment means no one else manages your schedule, taxes, marketing, or supplies.",
      remedy: "Start building these skills now, or consider a salon-employed path first while you develop them.",
    },
    variants: [
      {
        question: "Are you disciplined enough to be self-employed (if that's your path)?",
        options: [
          O("A", "The business side sounds overwhelming and isn't something I want to manage", 1),
          O("B", "I'd prefer to start employed in a salon and build toward independence", 2),
          O("C", "I believe so — I'm willing to develop the skills I'm missing", 3),
          O("D", "Yes — I have strong self-discipline and business management skills", 4),
        ],
      },
      {
        question:
          "If you go the self-employed route — booth rental or your own suite — no one manages your schedule, taxes, or marketing but you. Do you have the discipline for that?",
        options: [
          O("A", "Honestly, that side of things feels overwhelming and not something I want to take on", 1),
          O("B", "I'd rather start out employed at a salon and work toward independence later", 2),
          O("C", "I think so — I'm willing to build the skills I don't already have", 3),
          O("D", "Yes — self-discipline and business management are genuine strengths of mine", 4),
        ],
      },
      {
        question:
          "Being your own boss in this industry means handling your own taxes, bookings, marketing, and supplies with no one else managing it. Can you honestly say you're disciplined enough for that?",
        options: [
          O("A", "Not really — that responsibility sounds like more than I want to handle", 1),
          O("B", "I'd feel more comfortable starting in a salon job before going independent", 2),
          O("C", "Probably — I'm open to developing whatever skills I'm currently missing", 3),
          O("D", "Definitely — I already have strong self-management and business habits", 4),
        ],
      },
      {
        question:
          "Self-employment in this field means you're your own scheduler, accountant, and marketer. Do you genuinely have the discipline to run that side of the business?",
        options: [
          O("A", "That side of it feels overwhelming, and it's not something I want to manage", 1),
          O("B", "I'd rather work for a salon first and move toward self-employment later", 2),
          O("C", "I think I could, as long as I work on developing the skills I don't yet have", 3),
          O("D", "Yes, without a doubt — business discipline is one of my strengths", 4),
        ],
      },
    ],
  },
  {
    id: "BZ2-education",
    sectionId: "business",
    flag: {
      type: "advisory",
      message: "Nail artistry evolves constantly — techs who stop learning after licensing lose clients to those who don't.",
      remedy: "Budget real time and money for ongoing education from day one rather than assuming your license is the finish line.",
    },
    variants: [
      {
        question: "Are you comfortable with ongoing education and keeping up with trends?",
        options: [
          O("A", "Continuous learning on top of working sounds exhausting to me", 1),
          O("B", "I assumed once I was licensed I'd be set for a while", 2),
          O("C", "I'm willing, though I'd need to budget time and money for it", 3),
          O("D", "Yes — I love learning and keeping current genuinely excites me", 4),
        ],
      },
      {
        question:
          "Techniques and trends in this industry change constantly, which means ongoing classes and practice long after you're licensed. How do you feel about that being a permanent part of the job?",
        options: [
          O("A", "The idea of nonstop learning on top of working sounds exhausting", 1),
          O("B", "I assumed getting licensed would be the finish line, not the starting point", 2),
          O("C", "I'm open to it, though I'd need to plan time and money around it", 3),
          O("D", "I genuinely enjoy that — staying current excites me rather than draining me", 4),
        ],
      },
      {
        question:
          "Licensing is really just the starting point — staying relevant means ongoing classes, new techniques, and constant trend-tracking for the life of your career. Is that appealing or draining to you?",
        options: [
          O("A", "Draining, honestly — the thought of endless learning on top of working wears me out", 1),
          O("B", "I thought being licensed meant I'd be set for a good while", 2),
          O("C", "I can commit to it, as long as I plan for the time and cost involved", 3),
          O("D", "Appealing — I love learning and staying current is something I look forward to", 4),
        ],
      },
      {
        question:
          "This career never really stops requiring you to learn — new techniques, new trends, ongoing classes for years after licensing. How do you feel about that being baked into the job permanently?",
        options: [
          O("A", "That sounds like a lot — continuous learning alongside working feels exhausting", 1),
          O("B", "I figured being licensed would mean I was mostly done learning", 2),
          O("C", "I'm willing to keep learning, provided I can budget the time and money for it", 3),
          O("D", "That excites me — I genuinely enjoy staying current and never really mind the learning curve", 4),
        ],
      },
    ],
  },
  {
    id: "BZ3-niche",
    sectionId: "business",
    variants: [
      {
        question:
          "Are you prepared to stand out in a saturated market — do you have a niche, a brand idea, or a unique angle in mind?",
        options: [
          O("A", "I haven't thought about this — I just want to do nails", 1),
          O("B", "I was planning to follow what's popular and see what works", 2),
          O("C", "I'm starting to think about it but haven't fully figured it out yet", 3),
          O("D", "Yes — I have clear ideas for my niche, brand, and how I'll differentiate", 4),
        ],
      },
      {
        question:
          "This is a crowded market with a lot of nail techs competing for the same clients. Have you thought about what would make someone choose you specifically — a niche, a brand, a unique angle?",
        options: [
          O("A", "Not really — I haven't thought that far ahead, I just want to do the work", 1),
          O("B", "My plan was mostly to follow whatever's trending and adjust from there", 2),
          O("C", "I've started thinking about it, but I don't have anything concrete yet", 3),
          O("D", "Yes — I already have a clear sense of my niche and how I'll stand out", 4),
        ],
      },
      {
        question:
          "With so many nail techs competing for the same clients, standing out matters. Do you have a specific niche, brand identity, or differentiator in mind, or are you still figuring that part out?",
        options: [
          O("A", "I haven't given this any real thought — I'm mainly focused on just doing the work", 1),
          O("B", "I figured I'd just follow whatever's popular and go from there", 2),
          O("C", "I have some early ideas, but nothing solid yet", 3),
          O("D", "Yes, definitely — I have a clear niche and brand direction already worked out", 4),
        ],
      },
      {
        question:
          "In a saturated market, clients need a reason to pick you over the tech down the street. Do you have a niche, brand angle, or something that sets you apart — or is that still an open question?",
        options: [
          O("A", "That's not something I've thought about — my focus is just on the craft itself", 1),
          O("B", "My rough plan was to follow trends and see what sticks", 2),
          O("C", "I've been mulling it over, but I haven't landed on anything definite", 3),
          O("D", "Yes — I know exactly what my niche and differentiation will be", 4),
        ],
      },
    ],
  },
];
