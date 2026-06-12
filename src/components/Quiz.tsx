// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// NAIL TECH READINESS QUIZ  v3 — Question Variants
// Each question has 3 rephrased variants — randomly selected on every quiz load
// Same meaning, same scoring (A=1 B=2 C=3 D=4), different words every time
// Architecture: 4 sections × (1 anchor + 2 of 3 pool) = 12 questions
// Combinations: 3 variants × 3 pools × 81 route combinations = 243+ unique quizzes
// ─────────────────────────────────────────────────────────────────────────────

const V = (q, o) => ({ question: q, options: o });
const O = (l, t, s) => ({ letter: l, text: t, score: s });

const QUIZ_DATA = {
  sections: [

    // ── PHYSICAL DEMANDS ──────────────────────────────────────────────────
    {
      id: "physicalDemands",
      title: "Physical Demands",
      color: "#B5006E",
      lightColor: "#FCE4EC",

      anchor: {
        id: "PD-03",
        flag: "critical",
        flagMessage: "You indicated a medical condition that could be significantly aggravated by daily nail product fumes, dust, or glove use. Consult your doctor specifically about this career's chemical and physical demands before investing in school. Some conditions can be managed — but that assessment needs to come from a medical professional who understands the occupational exposure involved.",
        flagRemedy: ["Consult a doctor who specialises in occupational health about chemical and dust exposure before investing in school", "Research NIOSH-approved respirator options and ventilation requirements for your target school or workspace"],
        variants: [
          V(
            "Do you have any respiratory conditions, chemical sensitivities, or skin allergies that could be aggravated by daily nail product fumes, dust, or prolonged glove use?",
            [O("A","Yes — a diagnosed condition that could be significantly affected",1),
             O("B","Possibly — mild sensitivities I haven't fully investigated in this context",2),
             O("C","Minor sensitivities I manage well — not expecting significant issues",3),
             O("D","No relevant conditions at all",4)]
          ),
          V(
            "Are there any health conditions — breathing difficulties, skin sensitivities, or chemical allergies — that regular exposure to nail product fumes, dust, or glove use might make worse?",
            [O("A","Yes — I have a condition that would likely be significantly worsened by that environment",1),
             O("B","Possibly — I have some sensitivities but haven't assessed them in this specific context",2),
             O("C","Nothing serious — minor sensitivities I manage without much difficulty",3),
             O("D","No — nothing that would be relevant to working with nail products daily",4)]
          ),
          V(
            "This career involves daily exposure to chemical fumes, fine dust, and prolonged glove use. Do you have any respiratory, skin, or allergy conditions that could be affected?",
            [O("A","Yes — a diagnosed condition that daily chemical exposure could genuinely worsen",1),
             O("B","Maybe — some sensitivities I'm aware of but haven't assessed properly",2),
             O("C","Very mild sensitivities that don't cause significant issues when managed",3),
             O("D","No — nothing that would be relevant to working with nail products daily",4)]
          ),
        ],
      },

      pool: [
        {
          id: "PD-07",
          flag: "critical",
          flagMessage: "Inconsistent sanitation is a legal and professional non-negotiable — it puts clients at direct risk and places your licence in immediate jeopardy. The standard cannot vary based on schedule pressure or fatigue. If maintaining strict sanitation under all conditions is a genuine challenge, this needs to be resolved before you begin practising professionally.",
          flagRemedy: ["Time your full sanitation protocol and practise running it under schedule pressure until speed and completeness are both non-negotiable", "Build a 10-minute scheduling buffer between clients so time pressure never forces a tradeoff between safety and schedule"],
          variants: [
            V(
              "You're 40 minutes behind schedule. Your full sanitation routine takes 8 minutes. Two clients are already waiting. What do you do?",
              [O("A","Quick wipe and move on — tighten up when things are less pressured",1),
               O("B","Do the most critical parts and skip the rest to save time",2),
               O("C","Complete the full routine, absorb the delay, acknowledge the wait to the next client",3),
               O("D","Complete every step without exception — then use it as a signal to review your scheduling so this doesn't repeat",4)]
            ),
            V(
              "It's a chaotic day — you're running nearly 40 minutes late and still have your complete sanitation protocol to get through. It'll cost you 8 minutes you don't have. What do you do?",
              [O("A","Cut the routine short — a thorough wipe-down will have to do until the pressure is off",1),
               O("B","Get through the parts that matter most and skip what seems lower priority right now",2),
               O("C","Run the full protocol regardless — absorb the time cost and let the waiting client know",3),
               O("D","Do the full routine without cutting a single step — and flag this as a scheduling problem to fix",4)]
            ),
            V(
              "Two clients are in your waiting area, you're behind by 40 minutes, and your full sanitation process takes 8 minutes. How do you handle it?",
              [O("A","Take a shortcut just this once — it's not realistic to be strict when this far behind",1),
               O("B","Prioritise the steps with the most direct infection risk and leave the rest for now",2),
               O("C","Work through the complete routine, accept the delay, and update the waiting client",3),
               O("D","Follow every step of the full routine — then treat the delay as feedback on your scheduling",4)]
            ),
          ],
        },
        {
          id: "PD-05",
          variants: [
            V(
              "Can your body sustain repetitive fine motor work in a largely fixed position for a full 8–10 hour shift — including toward the end of the day?",
              [O("A","Very difficult — sustained fixed-position work is a significant physical challenge for me",1),
               O("B","Manageable for a few hours but real doubts about sustaining it through a full daily schedule",2),
               O("C","I can handle it with proper breaks and ergonomic awareness",3),
               O("D","Not a concern — I sustain this consistently without significant performance drop",4)]
            ),
            V(
              "This career means spending most of your working day in a fixed position doing detailed, precise hand work — for up to ten hours. How realistically does your body handle that kind of sustained demand?",
              [O("A","Honestly not well — staying in one position doing repetitive work for that long would be a real problem",1),
               O("B","Fine for a while but genuine doubts about maintaining that over a full day every day",2),
               O("C","I manage with the right habits in place — breaks, posture awareness, and deliberate self-care",3),
               O("D","This isn't a concern — I can maintain both physical comfort and work quality through a full shift",4)]
            ),
            V(
              "Nail tech shifts involve eight to ten hours of sustained precision work in largely the same physical position. By the end of a long day, how well does your body typically hold up?",
              [O("A","I struggle significantly — this level of physical demand would be a real ongoing challenge",1),
               O("B","Fine early on but genuinely unsure about maintaining performance right through to the last client",2),
               O("C","I handle it reasonably well when disciplined about ergonomics and recovery habits",3),
               O("D","I consistently sustain this level of demand without it significantly affecting my work quality",4)]
            ),
          ],
        },
        {
          id: "PD-08",
          variants: [
            V(
              "Are you committed to wearing masks, adequate ventilation, and gloves consistently throughout every working day — not occasionally?",
              [O("A","I'd find it uncomfortable and I'm not confident I'd maintain it reliably all day",1),
               O("B","I understand its importance but haven't built the habit yet — this would need deliberate effort",2),
               O("C","I'm prepared to use PPE consistently — still building the specific professional habits",3),
               O("D","Non-negotiable for me — I treat protective equipment as standard practice, not optional",4)]
            ),
            V(
              "Protecting yourself from cumulative chemical and dust exposure means wearing a mask, gloves, and ensuring proper ventilation — every day, for every service. Is that a commitment you'd genuinely maintain?",
              [O("A","Honestly I'd find it hard to keep up — PPE all day feels uncomfortable and I'd probably slip",1),
               O("B","I know I should and would try — but it's not a habit I currently have and I'd need to build it",2),
               O("C","Yes — I'd wear PPE consistently and understand why, even if I'm still refining the specifics",3),
               O("D","Absolutely — this is how I protect my long-term career and I'd treat it as completely non-negotiable",4)]
            ),
            V(
              "The long-term health of a nail tech's career depends on consistently protecting yourself — mask, ventilation, gloves — from day one. How reliably would you actually maintain that?",
              [O("A","Not very reliably if I'm honest — I'd probably be inconsistent once the novelty wore off",1),
               O("B","I'd make a genuine effort but it's not a natural habit yet and I'd need to build it deliberately",2),
               O("C","I'd be consistent about it — I understand the cumulative risk and that's a strong enough reason",3),
               O("D","Without fail — this is a professional standard I'd hold to regardless of how busy or tired I was",4)]
            ),
          ],
        },
      ],
    },

    // ── BUSINESS ACUMEN ───────────────────────────────────────────────────
    {
      id: "businessAcumen",
      title: "Business Acumen",
      color: "#4A148C",
      lightColor: "#EDE7F6",

      anchor: {
        id: "BA-06",
        flag: "critical",
        flagMessage: "Without financial reserves or a supplemental income plan, the 6–18 month client-building period is a serious financial risk. This is one of the most common reasons nail techs leave the profession in their first two years. Before enrolling, build a specific financial plan that covers this period in full.",
        flagRemedy: ["Build a month-by-month budget for your full ramp-up period: map your fixed costs against your realistic early client income for 18 months", "Identify exactly how you'll cover months 1–6: specific savings amount, confirmed part-time work, or confirmed support — make it concrete, not approximate"],
        variants: [
          V(
            "Building a loyal client base typically takes 6–18 months. Do you have savings, supplemental income, or financial support to cover that period?",
            [O("A","No — without consistent early income I'd be in financial difficulty quickly",1),
             O("B","Some buffer but not enough to cover the full 6–18 month ramp-up",2),
             O("C","Reasonable plan — reserves, part-time work, or support would cover most of it",3),
             O("D","Solid plan — savings, supplemental income, or confirmed support covers the full timeline",4)]
          ),
          V(
            "Most nail techs don't have a full client book straight out of school — building one realistically takes six to eighteen months. Is your financial situation set up to handle that gap?",
            [O("A","No — I'd need to be earning well fairly quickly or I'd run into serious money problems",1),
             O("B","Partially — some runway but not enough to comfortably cover the full potential duration",2),
             O("C","I've thought this through — reserves or supplemental income would carry me through most of it",3),
             O("D","Yes — a solid, specific plan that covers me for the full length of the ramp-up period",4)]
          ),
          V(
            "Between qualifying and having a reliably full schedule, there's often an unpredictable stretch of six to eighteen months. Have you made concrete plans for how you'll manage financially during that time?",
            [O("A","Not really — I haven't fully planned for that gap and would struggle if income was slow",1),
             O("B","Some savings, but if it stretched toward 18 months I'd be in real difficulty",2),
             O("C","A reasonable combination of savings, possible part-time work, or support that covers most of it",3),
             O("D","Yes — a specific, realistic financial plan built around the full ramp-up timeline",4)]
          ),
        ],
      },

      pool: [
        {
          id: "BA-08",
          flag: "advisory",
          flagMessage: "Difficulty enforcing policies with clients you like is one of the most common ways nail tech businesses quietly lose money. This skill can be built deliberately — practise the language, find a mentor, rehearse the conversation before you're in it.",
          flagRemedy: ["Write your exact response for this no-show scenario and practise saying it out loud — the words you have ready in advance are the ones you'll actually use", "Find a working nail tech who enforces policies consistently and ask how they frame it — borrow their language until you develop your own"],
          variants: [
            V(
              "A loyal 8-month client no-shows, apologises sincerely, and has referred clients to you. Your policy charges 50% for no-shows. What do you do?",
              [O("A","Waive the fee — she's loyal, the mistake was genuine, and the relationship matters more",1),
               O("B","Waive it this time with a warning — a first genuine offence earns one pass",2),
               O("C","Apply the fee warmly — the policy applies regardless of reason or relationship",3),
               O("D","Apply the fee, document it, note internally that a repeat triggers prepayment — enforced kindly but clearly",4)]
            ),
            V(
              "One of your most reliable clients — coming for eight months and having sent friends your way — completely forgets her appointment. She's genuinely embarrassed and sorry. Your booking policy states 50% for no-shows. What happens?",
              [O("A","Let it go — her loyalty makes applying the policy feel wrong for a genuine first mistake",1),
               O("B","Give her one free pass and make clear it would be charged next time — loyalty earns one grace",2),
               O("C","Apply the fee warmly and without making it awkward — the policy exists for everyone",3),
               O("D","Charge the fee, keep a record, note that a second occurrence moves her to prepayment — no drama, just consistent",4)]
            ),
            V(
              "A client you've seen regularly for almost a year — who's referred people to you — ghosts an appointment and immediately apologises. Your policy calls for a 50% no-show charge. How do you handle it?",
              [O("A","Let it slide — her history and genuine remorse make applying the policy feel wrong",1),
               O("B","Skip the charge this once but be clear the policy kicks in from here — one pass for loyalty",2),
               O("C","Charge the 50%, do it warmly, and move on — the policy is the policy regardless of who it is",3),
               O("D","Apply the charge, document it as a first occurrence, note internally that a repeat means prepayment going forward — professionally and kindly",4)]
            ),
          ],
        },
        {
          id: "BA-03",
          flag: "advisory",
          flagMessage: "If the $3,000–$10,000+ startup investment was new information or is currently unaffordable, your financial preparation isn't complete yet. Build a full, itemised cost estimate — tuition, licensing, tools, products, insurance, living buffer — before committing to a school deposit.",
          flagRemedy: ["Build a complete itemised cost list: tuition + licensing fees + tools kit + starter products + insurance + 3-month living buffer — get to a specific total, not a range", "Set a concrete savings target with a date — 'I will have $X by [date]' — and work backwards from your enrolment plan"],
          variants: [
            V(
              "Are you financially prepared to invest $3,000–$10,000+ in education, licensing, tools, and products before earning your first dollar as a licensed nail tech?",
              [O("A","That figure is higher than I expected — significantly changes my planning",1),
               O("B","Knew there'd be costs but underestimated the total — not currently ready for that",2),
               O("C","Aware of the range and working toward it — nearly financially ready",3),
               O("D","Fully accounted for — financially and psychologically prepared to make that commitment",4)]
            ),
            V(
              "Getting licensed and properly set up in this profession typically costs between $3,000 and $10,000 — before a single paying client walks through the door. Is that something you've genuinely planned and budgeted for?",
              [O("A","That's significantly more than I had in mind — I'd need to completely rethink my financial timeline",1),
               O("B","I knew it wouldn't be cheap but the actual range is higher than I'd budgeted for — not there yet",2),
               O("C","I'm aware of the full cost range and working toward having it covered — nearly ready",3),
               O("D","I've fully planned for this — I know exactly what I need and I'm financially prepared to commit",4)]
            ),
            V(
              "The total upfront investment in nail school, licensing, tools, and starter supplies can reach $10,000 before you earn a cent. Where do you genuinely stand with that financial reality?",
              [O("A","This changes my planning significantly — I'm not financially ready for this commitment",1),
               O("B","I had some sense of the costs but underestimated the total — I'd need more time to prepare",2),
               O("C","I've done the research and I'm almost there — a few more months of saving and I'll be ready",3),
               O("D","I've already fully prepared for this investment — it's accounted for and I'm committed to making it",4)]
            ),
          ],
        },
        {
          id: "BA-14",
          variants: [
            V(
              "A new client says your $95 quote seems expensive and mentions a nearby tech charging $60. What do you say?",
              [O("A","Offer a small discount — a new client at $80 beats no client at $95",1),
               O("B","Hold the rate but feel uncertain — the comparison makes me question my pricing",2),
               O("C","Explain what the price reflects and hold it confidently — if $60 is her budget, that's okay",3),
               O("D","Hold confidently, briefly explain the value, let her decide — you're not competing with a $60 service",4)]
            ),
            V(
              "You quote a prospective client $95 for a full set. She pushes back immediately, telling you she's found the same thing for $60 elsewhere. How do you respond?",
              [O("A","Come down a little — landing a new client at $80 or $85 is worth more than holding firm and losing her",1),
               O("B","Stick to $95 but feel the pressure — the comparison plants a seed of doubt about my pricing",2),
               O("C","Explain clearly what justifies the price and hold it — whether she books or not is her decision",3),
               O("D","Hold the rate completely, explain the value briefly and without apology, and let her make the call",4)]
            ),
            V(
              "Before she books, a new client tells you your $95 full set feels high — she can get it for $60 elsewhere. What's your response?",
              [O("A","Offer a small reduction to close the booking — flexibility on price gets the client through the door",1),
               O("B","Keep the price but feel rattled — a direct comparison like that makes me question my rates",2),
               O("C","Stand by the $95, explain what makes the service worth it, and leave the decision with her",3),
               O("D","Quote the price once, explain the value once, and be completely at ease if she goes elsewhere",4)]
            ),
          ],
        },
      ],
    },

    // ── CLIENT RELATIONS ──────────────────────────────────────────────────
    {
      id: "clientRelations",
      title: "Client Relations",
      color: "#7B1FA2",
      lightColor: "#F3E5F5",

      anchor: {
        id: "CR-05",
        flag: "critical",
        flagMessage: "Complying with an unsafe service request — even under significant client pressure — puts the client's health at direct risk and places your licence in jeopardy. This line must be absolute. Before practising professionally, develop a clear, practised response for exactly this situation.",
        flagRemedy: ["Write your exact refusal script for this scenario and rehearse it out loud until the words are automatic — not improvised in the moment", "Roleplay the scenario with someone who pushes back hard — build the emotional muscle before you face it with a real client"],
        variants: [
          V(
            "A client pressures you to apply product over a visible infection on her nail. You know it's contraindicated. She insists. What do you do?",
            [O("A","Likely comply — losing the client or creating a scene feels worse than proceeding",1),
             O("B","Try to talk her out of it — not confident I'd hold firm if she kept pushing",2),
             O("C","Explain clearly, offer a safe alternative, and decline regardless of pressure",3),
             O("D","Decline without hesitation, explain professionally, end the service if she continues — licence and client health are both non-negotiable",4)]
          ),
          V(
            "You spot a clear sign of infection on a client's nail before starting. She knows it's there, dismisses your concern, and wants you to proceed anyway. What do you do?",
            [O("A","Go ahead — refusing would risk the relationship and create an awkward confrontation",1),
             O("B","Make my concern known but probably back down if she pushes hard enough",2),
             O("C","Decline to work over it, explain my reasons clearly, and offer whatever safe alternative I can",3),
             O("D","Refuse immediately and without wavering — explain it professionally, offer an alternative, and end the appointment if she continues pressing",4)]
          ),
          V(
            "Midway through your pre-service check you notice something that makes proceeding a clear contraindication. The client wants you to ignore it and carry on. How do you handle it?",
            [O("A","Probably carry on — the pressure to not make it a big deal would likely win out",1),
             O("B","Push back a bit, but not confident I'd refuse entirely if she kept insisting",2),
             O("C","Make the call professionally — explain what I've noticed, offer what I can safely do, and decline the rest",3),
             O("D","Stop the service, explain the specific reason calmly, and don't resume unless the situation changes — no amount of pressure changes the answer",4)]
          ),
        ],
      },

      pool: [
        {
          id: "CR-04",
          variants: [
            V(
              "You're running on time. A client arrives 30 minutes late and insists on her full service. Your next client is already waiting. What do you do?",
              [O("A","Fit her in and work faster — turning away a client feels wrong even if I fall further behind",1),
               O("B","Offer a shorter version of the service within the remaining time before my next client",2),
               O("C","Explain I can't complete the full service, offer reduced service or reschedule, hold the line",3),
               O("D","Apply my late policy, offer the earliest rebook slot, and move to my next client without guilt or disruption",4)]
            ),
            V(
              "Your schedule is running perfectly — until a client shows up half an hour late expecting her complete appointment. Someone else is already in the waiting area. What's your move?",
              [O("A","Squeeze her in and pick up the pace — I'd rather fall behind than turn someone away",1),
               O("B","Do as much of the service as the time allows before my next client starts",2),
               O("C","Let her know I can't do the full service now, give her the options, and follow through on whichever she chooses",3),
               O("D","Apply the late policy, give her the next available slot, and move on — professionally, without guilt",4)]
            ),
            V(
              "Everything is on schedule until a client arrives 30 minutes behind. The next client is already there. She expects her full appointment regardless. How do you respond?",
              [O("A","Try to fit it all in by moving faster — sending her away feels like the worse outcome",1),
               O("B","Do what I can in the time that's realistically left without pushing the next client back too far",2),
               O("C","Be upfront that the full service isn't possible now, offer a reduced version or reschedule, and hold that position",3),
               O("D","Follow my late policy, offer to rebook her at the soonest available time, and proceed with my next client — calm, clear, no drama",4)]
            ),
          ],
        },
        {
          id: "CR-02",
          variants: [
            V(
              "You had almost no sleep after a family emergency. Six clients are booked. The first is upbeat and chatty for the full hour. How do you handle it?",
              [O("A","Let her know briefly you're having a hard day — clients appreciate honesty over pretending",1),
               O("B","Get through it as best you can — not at full capacity and she'll probably sense it",2),
               O("C","Deliver the service professionally and stay as warm and engaged as you can manage throughout",3),
               O("D","Deliver full service to your standard with genuine warmth — then deliberately reset before the next client",4)]
            ),
            V(
              "Something serious happened at home last night and you barely slept. You have a full day of clients — and your first one is high-energy and wants to talk the whole time. What do you do?",
              [O("A","Be honest with her — briefly mention you're having a difficult day rather than putting on an act",1),
               O("B","Do my best but accept I'm not at full capacity — she'll probably pick up on it anyway",2),
               O("C","Keep it professional and as warm as possible — don't let my personal situation affect her experience",3),
               O("D","Deliver the same standard I always would, stay fully present and warm, then take a moment to reset before client two",4)]
            ),
            V(
              "You're coming in after a genuinely difficult night — a personal crisis and very little sleep. The day is fully booked. Your first client settles in and starts chatting enthusiastically. How do you manage the next hour?",
              [O("A","Mention briefly that it's a tough day — it feels better than pretending everything is fine",1),
               O("B","Push through but accept the reality that I'm not at my best — it'll probably show somewhat",2),
               O("C","Stay professional and warm throughout — keep my personal situation completely separate from how I show up",3),
               O("D","Show up the same way I would on my best day — genuinely warm and fully present — then create space to decompress before client two",4)]
            ),
          ],
        },
        {
          id: "CR-12",
          variants: [
            V(
              "Your closest friend of 14 years messages to book a full set and adds: 'You'll sort me out with mates rates, yeah? 😊'. Your full set is $95. What do you say?",
              [O("A","Offer a significant discount — charging her anywhere near full price feels wrong given your history",1),
               O("B","Give a one-off launch discount but explain going forward it'll be your standard rate",2),
               O("C","Charge the standard $95, explain warmly that you keep one consistent policy for everyone",3),
               O("D","Charge your full rate from the first appointment, handle any awkwardness warmly but without backing down",4)]
            ),
            V(
              "A close friend you've known your whole adult life wants to book a full set and casually drops in a message asking about a mates' discount. Your rate is $95. How do you respond?",
              [O("A","Give her a meaningful discount — her friendship means you can't charge her what you'd charge a stranger",1),
               O("B","Offer something off this time as a goodwill gesture but be clear the full rate applies going forward",2),
               O("C","Charge your standard $95 — explain that you keep your pricing consistent for everyone, including people you love",3),
               O("D","Quote the full rate without hesitation, deal with any discomfort warmly, and don't move on it",4)]
            ),
            V(
              "Your best friend texts to book in and casually mentions expecting a friends-and-family price. You've been inseparable for years. Your full set is $95. What do you say back?",
              [O("A","Sort her out with a real discount — there's something wrong about charging your closest friend full rate",1),
               O("B","Give her a break on the first one but let her know it'll be full price after — a one-time gesture",2),
               O("C","Message back warmly, tell her the rate is $95, and explain that you keep pricing the same for everyone",3),
               O("D","Reply with your standard rate, handle whatever response comes with genuine warmth, and hold the line",4)]
            ),
          ],
        },
      ],
    },

    // ── REALITY CHECK ─────────────────────────────────────────────────────
    {
      id: "realityCheck",
      title: "Reality Check",
      color: "#AD1457",
      lightColor: "#FCE4EC",

      anchor: {
        id: "RC-04",
        flag: "critical",
        flagMessage: "Evenings and weekends are the primary earning windows in this industry — not occasional requirements, but the norm. If your life genuinely cannot accommodate those hours, the most financially valuable booking slots are largely unavailable to you. Factor this clearly into your income projections before committing to a school.",
        flagRemedy: ["Map your genuinely available evening and weekend hours against the minimum weekly client targets needed to hit your income goal — see if the numbers work on paper first", "Have the concrete scheduling conversation now with everyone whose routine impacts yours — childcare, partners, second jobs — before you're mid-school and realising it doesn't work"],
        variants: [
          V(
            "Evenings and weekends are peak booking time in this industry — consistently, not occasionally. Does your current life genuinely accommodate that schedule?",
            [O("A","Difficult — my evenings and weekends are largely committed to other responsibilities",1),
             O("B","Sometimes, but a schedule built around those hours would create real ongoing tension",2),
             O("C","With some adjustment, yes — I've thought through how to make it work practically",3),
             O("D","Completely — my life accommodates it and my support system fully understands what it means",4)]
          ),
          V(
            "Most of your potential clients work 9-to-5 — which means your busiest booking times will be evenings and weekends, every week. Is your life genuinely set up for that?",
            [O("A","Honestly no — my evenings and weekends are committed to things I can't easily move around",1),
             O("B","In theory yes, but making it the consistent norm would create real friction in my personal life",2),
             O("C","It would take some adjustment, but I've thought about it and have a realistic plan",3),
             O("D","Yes — fully. My schedule works for this and the people around me understand what it actually involves",4)]
          ),
          V(
            "Nail tech clients are available when they're not at work — which means your schedule will be built around evenings and weekends as the rule, not the exception. Does your current life genuinely allow for that?",
            [O("A","Not really — the people and commitments in my life make those hours largely unavailable to me",1),
             O("B","On a good week yes — but sustained over months and years it would create real pressure",2),
             O("C","Yes, with some intentional rearrangement — I've given this real thought and have a workable plan",3),
             O("D","Completely — my personal schedule and support system are fully compatible with this reality",4)]
          ),
        ],
      },

      pool: [
        {
          id: "RC-03",
          variants: [
            V(
              "What percentage of a working nail tech's week do you think involves creative nail art or anything genuinely social-media worthy?",
              [O("A","More than 40% — creative work is a significant and regular part of the job",1),
               O("B","Around 20–40% — enough to keep the creative side meaningfully alive",2),
               O("C","Around 10–20% — mostly practical work but with a real creative element",3),
               O("D","Under 10% for most techs — the vast majority is infills, removal, and basic manicures",4)]
            ),
            V(
              "If you followed a working nail tech for a full five-day week, what proportion of that time do you think would involve the kind of creative, visually exciting work that ends up on Instagram?",
              [O("A","More than half — the creative work is what most of the job actually looks like",1),
               O("B","Maybe a quarter to a third — a meaningful chunk even if it's not the majority",2),
               O("C","Something like 10 to 20 per cent — most of the week is practical but the creative work is there",3),
               O("D","Less than one in ten services — almost all of the week is infills, basic manicures, and removal",4)]
            ),
            V(
              "Scroll through any nail tech's Instagram and it looks like creative art all the time. What percentage of a real working week do you think that actually represents?",
              [O("A","A large chunk — the posted work isn't far off what the day-to-day actually looks like",1),
               O("B","Maybe a fifth to a third of the week — enough that it stays a real part of the job",2),
               O("C","Somewhere around 10 to 20 per cent — most clients want practical services but creative work comes through",3),
               O("D","Well under 10 per cent — the posts are highlights from months of infills, removals, and basic sets",4)]
            ),
          ],
        },
        {
          id: "RC-01",
          variants: [
            V(
              "Set aside the appealing parts. What honestly drives you most toward nail technology — and will that sustain you through unglamorous, financially uncertain early years?",
              [O("A","Primarily the creative side — nail art and being part of the beauty world excite me most",1),
               O("B","Flexibility and independence — lifestyle drives me more than the craft itself",2),
               O("C","A mix of creativity, client relationships, and building something real — I know early years will test it",3),
               O("D","Something specific, grounded, and durable — I've examined it honestly against the full reality and my reasons hold up",4)]
            ),
            V(
              "Forget the attractive elements of this career for a moment. What is the real reason you want to become a nail tech — and is it strong enough to carry you through the slow, difficult, financially unpredictable early years?",
              [O("A","Honestly the creative and visual appeal is the main thing — what I imagine doing day-to-day is what draws me",1),
               O("B","The lifestyle factors — flexibility, being my own boss, setting my own schedule — those drive me more than anything",2),
               O("C","A genuine combination of creativity, the client relationship, and the satisfaction of building something — realistic about the early years being hard",3),
               O("D","My reasons are specific, durable, and have survived my honest assessment of what this career actually involves",4)]
            ),
            V(
              "Strip away the things that look good about nail technology. What's actually behind your decision to pursue it — and will that honestly survive two years of repetitive work, inconsistent income, and slow growth?",
              [O("A","The creative output is what drew me — the art, the aesthetics, being surrounded by the beauty industry",1),
               O("B","The autonomy and flexibility are my primary drivers — I want to control my own time and build something for myself",2),
               O("C","Multiple things — the craft, the client connections, the sense of building something that's mine — and I'm aware the early stages are hard",3),
               O("D","Something specific and honest that I've tested against the full picture of this career — and it still holds up",4)]
            ),
          ],
        },
        {
          id: "RC-07",
          flag: "advisory",
          flagMessage: "Impatience with slow foundational practice is one of the most reliable predictors of poor long-term technique. Techs who rush past basics produce inconsistent work — and inconsistent work is what clients notice and what costs a career its reputation before it's been properly built.",
          flagRemedy: ["Reframe repetition as investment: each practice session builds the muscle memory your future clients will rely on — track your measurable improvement so slow progress becomes visible", "Ask an experienced nail tech what they wish they had drilled harder in school — use their answer as your deliberate practice priority"],
          variants: [
            V(
              "You're in nail school, week two. Your instructor says you'll practise the same basic oval shape every day for four more weeks. A classmate says: 'This is a waste of time.' Your honest reaction?",
              [O("A","Feel the same — four weeks on one shape feels excessive, I'd want to move on faster too",1),
               O("B","Understand why but would genuinely struggle to stay motivated through that level of repetition",2),
               O("C","Accept and commit to it — though I'd probably explore advanced techniques in my own time",3),
               O("D","Find it genuinely valuable — getting that shape perfectly consistent is exactly what separates reliable technique from unreliable",4)]
            ),
            V(
              "It's your second week of nail school. The instructor announces the class will spend the next month on a single foundational shape — nothing else. The person next to you mutters that they could be learning actual techniques by now. What's your genuine response?",
              [O("A","I'm privately agreeing — a full month on one shape when there's so much else to learn feels like overkill",1),
               O("B","I get why it's necessary but staying motivated through four weeks of the same thing would be genuinely hard",2),
               O("C","I'll commit to it — but I'd probably work on other things on the side so I don't feel completely stalled",3),
               O("D","I think my classmate is missing the point — the only way to build consistent technique is to repeat the fundamentals until they're automatic",4)]
            ),
            V(
              "Three weeks into nail school and the curriculum still hasn't moved past basic shaping. A classmate says the instructor is being ridiculous — they want to be doing nail art. How do you actually feel about it?",
              [O("A","Honestly a bit the same — I'm eager to get to more exciting work and the pace is testing my patience",1),
               O("B","I understand the reasoning but four to five weeks of the same exercise would genuinely challenge my motivation",2),
               O("C","I'm fine with it in principle — but I'd find ways to keep myself creatively stimulated outside of class",3),
               O("D","I think it's exactly right — speed through the fundamentals and you build a technical ceiling you never break through",4)]
            ),
          ],
        },
      ],
    },
  ],
};

// ── SECTION DESCRIPTIONS — one-liner shown on results scoreboard ─────────────
const SECTION_DESCRIPTIONS = {
  physicalDemands:  "Can your body handle the daily physical demands of this career?",
  businessAcumen:   "Are you financially prepared for the costs and slow income ramp-up?",
  clientRelations:  "Can you manage difficult clients and hold firm professional boundaries?",
  realityCheck:     "Do your expectations match what this career actually looks like?",
};

// ── SECTION INSIGHTS — specific commentary per section per score tier ──────────
const SECTION_INSIGHTS = {
  physicalDemands: {
    strong: {
      title: "Physically Well-Matched",
      body: "Your body and habits are genuinely suited to what this career demands. You've thought about chemical exposure, PPE, ergonomics, and long-term sustainability in ways most candidates never consider until something goes wrong. This section isn't your problem — protect what you've built here by maintaining those standards from day one, not gradually."
    },
    developing: {
      title: "Physical Readiness Has Gaps",
      body: "The demands of this career — 8–10 hours of fixed-position precision work, daily chemical exposure, eye strain, and sustained fine motor performance — are non-negotiable features of the job. Your responses suggest some of these would create real challenges. That doesn't rule out the career, but it means building specific habits and getting honest medical clarity before you invest in school."
    },
    weak: {
      title: "Significant Physical Concerns",
      body: "Your responses raise genuine questions about physical compatibility with this career. Whether it's the sustained posture demands, the chemical environment, the precision requirements under fatigue, or a combination — this isn't something positive thinking resolves. A conversation with a doctor who understands the occupational exposure is the right first step, not a school deposit."
    },
  },
  businessAcumen: {
    strong: {
      title: "Business Thinking Is Sound",
      body: "You're thinking in real numbers, real timelines, and real financial structure — before you've spent a cent. That places you in a small minority of aspiring nail techs who are actually prepared to survive the early years financially. Most don't discover the ramp-up reality until they're already in it. You already know what you're walking into."
    },
    developing: {
      title: "The Numbers Need Sharpening",
      body: "Your financial awareness is above average, but your responses suggest the plan is still in general terms rather than specific ones. The difference between 'roughly prepared' and 'actually protected' in this area is the difference between making it through year one and not. You need exact figures: client targets, weekly income minimums, ramp-up buffer, and a policy enforcement plan you'll actually follow through on."
    },
    weak: {
      title: "This Is Your Most Urgent Gap",
      body: "The financial reality of building a nail tech career — the startup investment, the 6–18 month client ramp-up, the income variability, the policy enforcement, the pricing structure — has significant gaps in your awareness right now. This is the single most common reason nail techs leave the profession within the first two years. Not lack of skill. Lack of financial preparation. Entering school without closing these gaps is one of the most expensive mistakes a new nail tech can make."
    },
  },
  clientRelations: {
    strong: {
      title: "Strong Client Instincts",
      body: "Client relationships are the real engine of this career — not skill level, not nail art, not location. You appear to understand this at a level most candidates don't reach until years into the profession. Your ability to hold boundaries, absorb difficult dynamics without being destabilised, and separate your personal circumstances from your professional performance is what fills and keeps a full book."
    },
    developing: {
      title: "Client Skills Need Real Practice",
      body: "You have solid instincts, but your responses suggest there are scenarios where you'd struggle under real pressure — enforcing policies face-to-face, managing emotionally draining clients without absorbing the weight, or maintaining full professionalism on genuinely difficult personal days. In a repeat-business industry, every difficult client relationship you can't navigate costs you months of income, not just one appointment."
    },
    weak: {
      title: "Client Management Will Challenge You",
      body: "Whether it's the people-pleasing instinct, difficulty enforcing policies, managing emotionally demanding clients, or showing up at your professional standard regardless of personal circumstances — your responses suggest real work is needed here before you're in a professional setting. These are learnable skills. But they need deliberate practice and honest self-work, not just awareness that a gap exists."
    },
  },
  realityCheck: {
    strong: {
      title: "Expectations Grounded in Reality",
      body: "The gap between what candidates imagine nail technology looks like and what it actually involves is the single biggest predictor of early career exit. You appear to have already closed that gap. The disappointments that drive most new techs out — the repetitive majority, the slow income growth, the evenings and weekends — won't be disappointments to you. They'll just be part of the job you already understood you were choosing."
    },
    developing: {
      title: "A Few Illusions Still in Place",
      body: "Your expectations are largely realistic, but some of your responses suggest a picture that's still slightly rosier than the reality working nail techs actually live. Possibly around the proportion of creative work, the speed of income growth, or the emotional demands of sustained client interaction. Small misalignments in expectation compound over time — the bigger the gap between what you expected and what you find, the more likely you are to leave before you've genuinely had a chance to succeed."
    },
    weak: {
      title: "The Career You're Imagining Isn't the Career You'd Enter",
      body: "Your responses suggest a significant gap between the nail tech career on social media and the nail tech career that actual working professionals live. That gap — between expectation and reality — is not a calibration issue. It's the difference between thriving in your first two years and leaving the profession before you've had a real chance to build something. The most important work you can do right now isn't finding a school. It's spending real time understanding what working nail techs actually do, earn, and experience on a typical unglamorous Tuesday."
    },
  },
};

function getSectionTier(pct) {
  if (pct >= 75) return "strong";
  if (pct >= 50) return "developing";
  return "weak";
}

// ── PERSONALISED HEADLINE — reads their specific pattern ──────────────────────
function getHeadline(sectionResults, overallPct) {
  const sorted = [...sectionResults].sort((a, b) => b.pct - a.pct);
  const best   = sorted[0];
  const worst  = sorted[sorted.length - 1];

  const combos = {
    businessAcumen_physicalDemands:  "Your hands are ready. Your finances aren't — yet.",
    businessAcumen_clientRelations:  "You'd be brilliant with clients. The business side would bury you.",
    businessAcumen_realityCheck:     "You understand what you're signing up for. You just can't afford it yet.",
    physicalDemands_businessAcumen:  "The financial groundwork is solid. Your body and habits need attention.",
    physicalDemands_clientRelations:  "Your instincts with clients are strong. The physical demands are your real question mark.",
    physicalDemands_realityCheck:    "Your expectations are grounded. Your physical readiness needs work.",
    clientRelations_businessAcumen:  "You know how to run a business. Building real client relationships is the challenge.",
    clientRelations_physicalDemands: "Physically you're built for this. Client relationships are the real challenge.",
    clientRelations_realityCheck:    "You see the career clearly. Client dynamics are where you'd struggle.",
    realityCheck_businessAcumen:    "Your financial preparation is solid. Your picture of the career needs grounding.",
    realityCheck_physicalDemands:   "Your body's ready for the demands. Your expectations need grounding.",
    realityCheck_clientRelations:   "You'd connect well with clients. Your picture of the career needs grounding.",
  };

  const key = `${worst.id}_${best.id}`;
  if (combos[key]) return combos[key];

  if (overallPct >= 75) return "You're more prepared than most people who've already enrolled.";
  if (overallPct >= 50) return "The potential is real. A few critical gaps stand between you and a smart start.";
  return "This is not the right moment. But it could be — with the right preparation.";
}

// ── DIAGNOSTIC NARRATIVE — 2 sharp paragraphs from their actual pattern ───────
function getDiagnostic(sectionResults, flags, overallPct) {
  const sorted  = [...sectionResults].sort((a, b) => b.pct - a.pct);
  const worst   = sorted[sorted.length - 1];

  const narratives = {
    strong: {
      businessAcumen: [
        "What separates nail techs who thrive from those who leave the profession within two years almost always comes down to financial preparation — and yours is in good shape. You've thought through the investment, the ramp-up, and the income gap before it becomes a crisis rather than after.",
        "Your remaining work is refinement: tightening the specific numbers, confirming your school choice, and making sure every other section of your readiness is as solid as your financial foundation."
      ],
      realityCheck: [
        "You already understand what this career actually involves — the repetitive majority, the unglamorous daily reality, the slow build. That clarity is an advantage most candidates don't develop until they're already mid-school and second-guessing their decision.",
        "Focus your remaining preparation on the practical steps: the financial plan, the school research, and the specific habits that will protect your health and business from day one."
      ],
      clientRelations: [
        "The ability to manage client relationships with consistency, warmth, and firm professional boundaries is what builds a loyal, full book over time. Your responses suggest you have a genuine foundation in this area — which is rarer than most candidates realise.",
        "Spend your remaining preparation time ensuring the business and physical sides of your readiness match the client instincts you've already developed."
      ],
      physicalDemands: [
        "You've thought about what this career requires from your body — the sustained posture demands, the chemical environment, the self-care disciplines — in ways most candidates don't consider until they're already in pain.",
        "Physical readiness is your foundation. Build the rest of your preparation — financial planning, school research, and realistic expectations — to the same standard."
      ],
    },
    developing: {
      businessAcumen: [
        "You have genuine interest in this career and some important foundations in place — but your responses suggest the financial side of your planning is still in general terms rather than specific ones. That gap tends to show up most painfully in the 6–18 months after qualifying, when income is inconsistent and the reserves you didn't quite save feel very real.",
        "The good news: this is the most fixable type of readiness gap. It requires research, specific planning, and honest number-crunching — not a personality change. Your preparation guide is essentially a financial workbook for the first two years of a nail tech career."
      ],
      realityCheck: [
        "Your mental picture of this career is still slightly shaped by the version you see on social media. The proportion of creative work, the pace of income growth, the scheduling reality — some of these are still calibrated to the aspirational version rather than the actual one.",
        "This doesn't make the career wrong for you. It means one of the most valuable things you can do right now is talk to two or three working nail techs — not influencers, but people who are quietly building a full book — and ask them what their week actually looks like."
      ],
      clientRelations: [
        "Client relationships will be both your biggest opportunity and your biggest daily test in this career. Your responses suggest you have the instincts, but there are scenarios — enforcing policies with people you like, managing emotionally heavy appointments, showing up professionally on your worst days — where you'd face real pressure.",
        "These are skills, not personality traits. They can be built deliberately with practice, mentorship, and specific language work before you're in a professional setting."
      ],
      physicalDemands: [
        "The physical demands of this career are non-negotiable and they're daily — not occasional. Your responses suggest some gaps in how prepared your body, habits, and self-care disciplines currently are for what eight to ten hours of sustained precision work actually requires.",
        "This is a preparation gap, not necessarily a fundamental incompatibility — but it needs to be addressed honestly before school, not optimistically after it."
      ],
    },
    weak: {
      businessAcumen: [
        "The most important thing your results are telling you is this: the financial reality of building a nail tech career has significant gaps in your current preparation. Not awareness — preparation. Knowing the costs exist and knowing exactly how you'll fund them, survive the ramp-up, enforce your policies, and price for profit are completely different things.",
        "Every year, technically talented nail techs leave the profession not because they can't do the work, but because they can't sustain the business that lets them do the work. Your preparation guide exists precisely to close this gap before it costs you."
      ],
      realityCheck: [
        "The career you're imagining and the career you'd actually be entering have a meaningful gap between them right now. That gap — around the day-to-day reality, the income timeline, the schedule demands, the repetitive majority — is the number one driver of early career exit in this industry.",
        "The most important work you can do right now isn't finding the right school. It's getting a completely honest picture of what this career actually looks like for someone in their first two years. That's what our preparation resources are built to give you."
      ],
      clientRelations: [
        "Client management is going to be one of your most significant challenges in this career based on your responses. The combination of policy enforcement, emotional labour, professional consistency under personal pressure, and boundary-holding with people you know — these are demanding skills that need deliberate development.",
        "They are absolutely learnable. But the time to build them is before your first paying client sits down in your chair, not while they're in it."
      ],
      physicalDemands: [
        "Your responses in the physical demands section raise real questions that need honest answers before you invest in school. Whether it's the chemical exposure, the sustained posture requirements, the fine motor demands under fatigue, or a medical condition that could be aggravated — these aren't concerns that disappear with enthusiasm and willpower.",
        "Get medical clarity first. Speak with a doctor who understands occupational chemical exposure. Then build a preparation plan from a place of honest information."
      ],
    },
  };

  const tier = getSectionTier(worst.pct);
  const worstId = worst.id;

  if (narratives[tier] && narratives[tier][worstId]) {
    return narratives[tier][worstId];
  }

  if (overallPct >= 75) {
    return [
      "Your results show a genuinely strong foundation across all four areas of career readiness. You've done the kind of thinking about this career that most candidates only do after they're already enrolled — or after they've already struggled.",
      "Use your section scores to identify the one or two areas worth refining further before your first day of school. The strongest starts come from people who use this period of preparation to strengthen what's already working."
    ];
  }

  return [
    "Your results show a mixed picture — genuine strengths in some areas and real gaps in others. That's the most honest and useful thing a readiness quiz can tell you, because it means you can see exactly where to focus rather than starting school and finding out the hard way.",
    "The gaps your results identified are addressable. But they need specific preparation — not just more time thinking about it. Your preparation plan starts with your lowest section score."
  ];
}

// ── CTA — section-specific, grounded in Reality Breakdown content ─────────────
function getCTA(worstSection, overallPct) {
  const ctas = {
    businessAcumen: {
      description: "Inside: the exact financial model, income benchmarks, and break-even math your school won't give you.",
      btn: "Access The Free Reality Breakdown →"
    },
    realityCheck: {
      description: "Inside: the week-by-week reality most candidates don't see until they're already enrolled — and second-guessing.",
      btn: "Access The Free Reality Breakdown →"
    },
    clientRelations: {
      description: "Inside: the policy scripts, client scenarios, and boundary frameworks that separate techs who build full books from those who burn out.",
      btn: "Access The Free Reality Breakdown →"
    },
    physicalDemands: {
      description: "Inside: the occupational health data, daily exposure realities, and the physical checklist to complete before you invest a cent.",
      btn: "Access The Free Reality Breakdown →"
    },
  };

  if (overallPct >= 75) {
    return {
      description: "Inside: the checklist strong candidates use to convert their preparation into a profitable, sustainable first year.",
      btn: "Access The Free Reality Breakdown →"
    };
  }

  return ctas[worstSection] || ctas.businessAcumen;
}

// ── BANDS — minimal, logic only ───────────────────────────────────────────────
const BANDS = {
  strong:     { label: "Strong Foundation",     sub: "Ready to take the next step",        minScore: 37, color: "#4A148C", bg: "#EDE7F6" },
  developing: { label: "Developing Foundation", sub: "Targeted preparation recommended",   minScore: 25, color: "#880E4F", bg: "#FCE4EC" },
  gaps:       { label: "Significant Gaps",      sub: "Important groundwork needed first",  minScore: 0,  color: "#6A1B9A", bg: "#F3E5F5" },
};

const SECTION_BANDS = [
  { min: 75, label: "Strong",          color: "#4A148C", bg: "#EDE7F6" },
  { min: 50, label: "Developing",      color: "#880E4F", bg: "#FCE4EC" },
  { min: 0,  label: "Needs Work",      color: "#6A1B9A", bg: "#F3E5F5" },
];

// ── QUIZ LOGIC ────────────────────────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function buildQuiz() {
  const sectionBlocks = QUIZ_DATA.sections.map((section) => {
    const block = [];
    const av = pick(section.anchor.variants);
    block.push({ id: section.anchor.id, flag: section.anchor.flag, flagMessage: section.anchor.flagMessage, question: av.question, options: av.options, sectionId: section.id, sectionTitle: section.title, sectionColor: section.color });
    [...section.pool].sort(() => Math.random() - 0.5).slice(0, 2).forEach((q) => {
      const v = pick(q.variants);
      block.push({ id: q.id, flag: q.flag, flagMessage: q.flagMessage, question: v.question, options: v.options, sectionId: section.id, sectionTitle: section.title, sectionColor: section.color });
    });
    return block.sort(() => Math.random() - 0.5);
  });
  return sectionBlocks.sort(() => Math.random() - 0.5).flat();
}

function calcResults(questions, answers) {
  const sectionScores = {}, sectionMaxes = {}, triggeredFlags = [];
  QUIZ_DATA.sections.forEach((s) => { sectionScores[s.id] = 0; sectionMaxes[s.id] = 0; });

  questions.forEach((q, i) => {
    const sel = answers[i];
    if (sel == null) return;
    sectionScores[q.sectionId] += q.options[sel].score;
    sectionMaxes[q.sectionId] += 4;
    if (q.flag && sel === 0) triggeredFlags.push({ code: q.id, level: q.flag, message: q.flagMessage, remedy: q.flagRemedy || [] });
  });

  const totalScore = Object.values(sectionScores).reduce((a, b) => a + b, 0);
  const totalMax   = Object.values(sectionMaxes).reduce((a, b) => a + b, 0);
  const pct        = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

  let band = BANDS.strong;
  if (totalScore < BANDS.developing.minScore) band = BANDS.gaps;
  else if (totalScore < BANDS.strong.minScore) band = BANDS.developing;
  if (triggeredFlags.some(f => f.level === "critical")) {
    if (band === BANDS.strong) band = BANDS.developing;
    else if (band === BANDS.developing) band = BANDS.gaps;
  }

  const sectionResults = QUIZ_DATA.sections.map((s) => {
    const p  = sectionMaxes[s.id] > 0 ? Math.round((sectionScores[s.id] / sectionMaxes[s.id]) * 100) : 0;
    const sb = SECTION_BANDS.find((b) => p >= b.min) || SECTION_BANDS[2];
    const tier = getSectionTier(p);
    const insight = SECTION_INSIGHTS[s.id][tier];
    return { id: s.id, title: s.title, color: s.color, pct: p, band: sb, insight };
  });

  const sorted      = [...sectionResults].sort((a, b) => b.pct - a.pct);
  const bestSection = sorted[0];
  const worstSection= sorted[sorted.length - 1];
  const headline    = getHeadline(sectionResults, pct);
  const diagnostic  = getDiagnostic(sectionResults, triggeredFlags, pct);
  const cta         = getCTA(worstSection.id, pct);

  return { pct, totalScore, band, sectionResults, triggeredFlags, bestSection, worstSection, headline, diagnostic, cta };
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .qr{min-height:100vh;background:linear-gradient(160deg,#fdf2f8 0%,#f9fafb 55%,#f5f3ff 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;padding:20px 16px 40px}
  .card{width:100%;max-width:660px;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.07),0 12px 40px rgba(0,0,0,0.09),0 0 0 1px rgba(0,0,0,0.04)}
  .q-header{padding:26px 32px 20px;border-bottom:1px solid #f1f5f9}
  .q-brand{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#9ca3af;margin-bottom:18px}
  .q-track{height:3px;background:#f1f5f9;border-radius:2px;overflow:hidden;margin-bottom:10px}
  .q-fill{height:100%;border-radius:2px;transition:width .45s cubic-bezier(.4,0,.2,1)}
  .q-meta{display:flex;justify-content:space-between;align-items:center}
  .q-section{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .q-num{font-size:11px;color:#9ca3af}
  .q-body{padding:28px 32px 0}
  .q-text{font-family:'DM Serif Display',serif;font-size:19px;line-height:1.48;color:#111827;margin-bottom:22px}
  .opts{display:flex;flex-direction:column;gap:8px}
  .opt{display:flex;align-items:flex-start;gap:12px;background:#fff;border:1.5px solid #e5e7eb;border-radius:11px;padding:13px 15px;cursor:pointer;text-align:left;transition:background .15s,border-color .15s,transform .15s;width:100%}
  .opt:hover{background:#fdf2f8;border-color:#f9a8d4;transform:translateY(-1px)}
  .opt.sel{border-color:var(--sc);background:#fdf2f8}
  .opt-ltr{flex-shrink:0;width:26px;height:26px;border-radius:7px;background:#f3f4f6;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#9ca3af;transition:background .15s,color .15s;margin-top:1px}
  .opt.sel .opt-ltr{background:var(--sc);color:#fff}
  .opt-txt{font-size:13.5px;line-height:1.55;color:#6b7280;transition:color .15s}
  .opt.sel .opt-txt{color:#111827}
  .q-footer{padding:20px 32px 28px}
  .next-btn{width:100%;padding:15px;border-radius:11px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:.02em;transition:opacity .18s,transform .18s}
  .next-btn:disabled{background:#f3f4f6;color:#d1d5db;cursor:not-allowed}
  .next-btn:not(:disabled){background:linear-gradient(135deg,#db2777 0%,#9333ea 100%);color:#fff}
  .next-btn:not(:disabled):hover{opacity:.88;transform:translateY(-1px)}

  .res{padding:0}
  .res-top{padding:32px 32px 28px;background:linear-gradient(135deg,#fdf2f8 0%,#f5f3ff 100%);border-bottom:1px solid #f1f5f9}
  .res-score-row{display:flex;align-items:center;gap:20px;margin-bottom:20px}
  .res-score-circle{flex-shrink:0;width:72px;height:72px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid;background:#fff}
  .res-score-num{font-size:22px;font-weight:700;line-height:1}
  .res-score-pct{font-size:10px;font-weight:600;letter-spacing:.06em;opacity:.7;margin-top:2px}
  .res-band-block{flex:1}
  .res-band-tag{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-bottom:6px}
  .res-band-name{font-family:'DM Serif Display',serif;font-size:22px;line-height:1.2;color:#111827}
  .res-band-sub{font-size:12px;color:#6b7280;opacity:.6;margin-top:4px}
  .res-headline{font-family:'DM Serif Display',serif;font-size:20px;line-height:1.4;color:#111827;margin-bottom:0}
  .res-body{padding:28px 32px;background:#fff}
  .res-diag{margin-bottom:28px}
  .res-diag p{font-size:14px;line-height:1.75;color:#374151;margin-bottom:12px}
  .res-diag p:last-child{margin-bottom:0}
  .divider{height:1px;background:#f1f5f9;margin:24px 0}
  .sec-label{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#9ca3af;margin-bottom:16px}
  .sec-card{border-radius:12px;padding:16px;margin-bottom:10px;border:1px solid #f1f5f9}
  .sec-card-head{display:flex;align-items:center;gap:10px;margin-bottom:10px}
  .sec-card-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .sec-card-name{font-size:12px;font-weight:600;color:#374151;flex:1}
  .sec-card-bar-track{flex:2;height:3px;background:#e5e7eb;border-radius:2px;overflow:hidden}
  .sec-card-bar-fill{height:100%;border-radius:2px;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
  .sec-card-pct{font-size:11px;font-weight:700;width:34px;text-align:right;flex-shrink:0}
  .sec-card-pill{font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px}
  .sec-card-body{font-size:13px;line-height:1.65;color:#6b7280}
  .sec-card-insight{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px}

  .gap-callout{border-radius:14px;padding:20px;margin-bottom:24px;border-left:3px solid}
  .gap-callout-tag{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px}
  .gap-callout-title{font-family:'DM Serif Display',serif;font-size:18px;margin-bottom:10px;color:#111827}
  .gap-callout-body{font-size:13px;line-height:1.7;color:#374151}

  .flag-block{margin-bottom:24px}
  .flag-card{border-radius:10px;padding:15px;margin-bottom:10px}
  .flag-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}
  .flag-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
  .flag-lbl{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
  .flag-code{font-size:10px;color:#9ca3af;margin-left:auto}
  .flag-msg{font-size:13px;line-height:1.65}

  .cta-block{background:linear-gradient(135deg,#fdf2f8 0%,#f5f3ff 100%);border:1px solid #f9a8d4;border-radius:16px;padding:24px;margin-bottom:24px}
  .cta-description{font-size:14px;line-height:1.6;color:#be185d;font-weight:500;margin-bottom:16px}
  .cta-btn{display:block;width:100%;padding:16px;background:linear-gradient(135deg,#db2777 0%,#9333ea 100%);color:#fff;border:none;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;letter-spacing:.02em;transition:opacity .18s,transform .18s;text-align:center}
  .cta-btn:hover{opacity:.88;transform:translateY(-1px)}
  .cta-btn-secondary{display:block;width:100%;padding:14px;background:transparent;color:#db2777;border:1.5px solid #db2777;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;letter-spacing:.02em;transition:all .18s;text-align:center;margin-top:10px}
  .cta-btn-secondary:hover{background:#fdf2f8;border-color:#be185d;color:#be185d;transform:translateY(-1px)}
  .cta-divider{display:flex;align-items:center;gap:10px;margin:14px 0}
  .cta-divider-line{flex:1;height:1px;background:#f1f5f9}
  .cta-divider-txt{font-size:11px;color:#d1d5db;font-weight:500}
  .cta-note{font-size:11px;color:#9ca3af;text-align:center;margin-top:10px}

  .step-item{display:flex;gap:11px;margin-bottom:12px;align-items:flex-start}
  .step-num{flex-shrink:0;width:22px;height:22px;border-radius:6px;background:#fce7f3;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#be185d;margin-top:1px}
  .step-txt{font-size:13px;line-height:1.6;color:#374151}
  .retake{width:100%;margin-top:20px;padding:14px;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:#6b7280;cursor:pointer;transition:all .18s}
  .retake:hover{color:#111827;border-color:#9ca3af;background:#f9fafb}
  .band-legend{display:flex;gap:12px;margin-top:14px;flex-wrap:wrap}
  .band-legend-item{display:flex;align-items:center;gap:5px;font-size:10px;color:#9ca3af}
  .band-legend-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
  .strength-callout{border-radius:14px;padding:20px;margin-bottom:24px;border-left:3px solid}
  .flag-remedy{margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,.06)}
  .flag-remedy-label{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#9ca3af;margin-bottom:7px}
  .flag-remedy-item{display:flex;gap:7px;margin-bottom:6px;font-size:12px;line-height:1.6;color:#374151}
  .flag-remedy-arrow{flex-shrink:0;font-weight:700}
  @media(max-width:480px){.res-top,.res-body{padding-left:20px;padding-right:20px}.q-header,.q-body,.q-footer{padding-left:20px;padding-right:20px}.q-text{font-size:17px}.res-score-circle{width:58px;height:58px}.res-headline{font-size:18px}}
`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function QuestionScreen({ question, index, total, answer, onAnswer, onNext }) {
  const pct = (index / total) * 100;
  const sc  = question.sectionColor;
  return (
    <div className="card" style={{"--sc": sc}}>
      <div className="q-header">
        <div className="q-brand">Nail Tech Readiness Quiz</div>
        <div className="q-track"><div className="q-fill" style={{width:`${pct}%`,background:sc}}/></div>
        <div className="q-meta">
          <span className="q-section" style={{color:sc}}>{question.sectionTitle}</span>
          <span className="q-num">{index+1} / {total}</span>
        </div>
      </div>
      <div className="q-body">
        <p className="q-text">{question.question}</p>
        <div className="opts">
          {question.options.map((opt,i)=>(
            <button key={i} className={`opt${answer===i?" sel":""}`} onClick={()=>onAnswer(i)}>
              <span className="opt-ltr">{opt.letter}</span>
              <span className="opt-txt">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="q-footer">
        <button className="next-btn" disabled={answer==null} onClick={onNext}>
          {index+1===total?"See My Results →":"Next →"}
        </button>
      </div>
    </div>
  );
}

function ResultsScreen({ results, onRetake, onRequestRealityBreakdown, onRequestBlueprint }) {
  const { pct, band, sectionResults, triggeredFlags, worstSection, bestSection, headline, diagnostic, cta } = results;
  const critFlags = triggeredFlags.filter(f=>f.level==="critical");
  const advFlags  = triggeredFlags.filter(f=>f.level==="advisory");

  const nextSteps = {
    businessAcumen: [
      "Build your exact ramp-up financial plan — monthly expenses vs. realistic client income month by month for 18 months",
      "Calculate your true service price: product cost + overhead + hourly target = your real minimum",
      "Write and practise your no-show, late, and deposit policy scripts out loud before your first client",
    ],
    realityCheck: [
      "Find two working nail techs — not influencers — and ask them what a typical Tuesday actually looks like",
      "Research the specific licensing requirements in your state or country directly from the licensing authority",
      "Map your exact enrolment timeline: school start date, financial readiness date, and life circumstances to resolve first",
    ],
    clientRelations: [
      "Practise policy enforcement conversations out loud — write the exact words you'd use and say them to yourself",
      "Shadow or speak with a working nail tech specifically about their most difficult client situations",
      "Identify your personal emotional triggers and build a 2-minute reset habit for between appointments",
    ],
    physicalDemands: [
      "Speak with a doctor specifically about this career's chemical and physical demands before committing financially",
      "Research ergonomic workstation setups used by nail techs — invest in the setup before the career, not after the injury",
      "Build your PPE habit now — mask, ventilation awareness, glove tolerance — before school, not during it",
    ],
  };

  const steps = nextSteps[worstSection.id] || nextSteps.businessAcumen;

  return (
    <div className="card">
      {/* Top — score + band + headline */}
      <div className="res-top">
        <div className="res-score-row">
          <div className="res-score-circle" style={{borderColor:band.color,background:band.bg}}>
            <span className="res-score-num" style={{color:band.color}}>{pct}%</span>
            <span className="res-score-pct" style={{color:band.color}}>score</span>
          </div>
          <div className="res-band-block">
            <div className="res-band-tag" style={{color:band.color}}>{band.label}</div>
            <div className="res-band-name">{band.sub}</div>
            <div className="res-band-sub" style={{color:band.color}}>12 questions · 4 sections</div>
          </div>
        </div>
        <p className="res-headline">{headline}</p>
      </div>

      <div className="res-body">
        {/* Section breakdown — compact scoreboard */}
        <div className="sec-label">Your Section Results</div>
        {sectionResults.map(s=>(
          <div key={s.id} className="sec-card" style={{background:`${s.color}11`}}>
            <div className="sec-card-head">
              <div className="sec-card-dot" style={{background:s.color}}/>
              <span className="sec-card-name">{s.title}</span>
              <div className="sec-card-bar-track">
                <div className="sec-card-bar-fill" style={{width:`${s.pct}%`,background:s.color}}/>
              </div>
              <span className="sec-card-pct" style={{color:s.color}}>{s.pct}%</span>
              <span className="sec-card-pill" style={{background:s.band.bg,color:s.band.color}}>{s.band.label}</span>
            </div>
            <div className="sec-card-body" style={{fontSize:"12px",color:"#9ca3af",marginTop:"2px"}}>{SECTION_DESCRIPTIONS[s.id]}</div>
          </div>
        ))}

        {/* Best section callout */}
        {bestSection && bestSection.pct >= 65 && bestSection.id !== worstSection.id && (
          <>
            <div className="divider"/>
            <div className="strength-callout" style={{background:`${bestSection.color}0d`,borderLeftColor:bestSection.color}}>
              <div className="gap-callout-tag" style={{color:bestSection.color}}>What You're Doing Right</div>
              <div className="gap-callout-title">{bestSection.title}: {bestSection.pct}%</div>
              <div style={{fontSize:"12px",color:bestSection.color,fontWeight:600,marginTop:"6px"}}>{bestSection.insight.title}</div>
            </div>
          </>
        )}

        {/* Biggest gap callout */}
        {worstSection.pct < 75 && (
          <>
            <div className="divider"/>
            <div className="gap-callout" style={{background:"#fdf2f8",borderLeftColor:"#db2777"}}>
              <div className="gap-callout-tag" style={{color:"#be185d"}}>Your Most Important Gap</div>
              <div className="gap-callout-title">{worstSection.title}: {worstSection.pct}%</div>
              <div style={{fontSize:"12px",color:"#be185d",fontWeight:600,marginTop:"6px"}}>{worstSection.insight.title}</div>
            </div>
          </>
        )}

        {/* Flags */}
        {triggeredFlags.length > 0 && (
          <>
            <div className="divider"/>
            <div className="sec-label">Advisories</div>
            <div style={{fontSize:"11px",color:"#9ca3af",marginBottom:"8px"}}>Full details included in your emailed report.</div>
            <div className="flag-block">
              {[...critFlags, ...advFlags].map(f=>{
                const isCrit = f.level === "critical";
                return (
                  <div key={f.code} className="flag-card" style={{background:isCrit?"#fff5f5":"#f5f3ff",border:`1px solid ${isCrit?"#fca5a5":"#ddd6fe"}`,padding:"14px 16px"}}>
                    <div className="flag-head">
                      <div className="flag-dot" style={{background:isCrit?"#ef4444":"#7c3aed"}}/>
                      <span className="flag-lbl" style={{color:isCrit?"#b91c1c":"#7c3aed"}}>{isCrit?"Critical — act on this first":"Advisory"}</span>
                      <span className="flag-code">{f.code}</span>
                    </div>
                    <div className="flag-msg" style={{color:isCrit?"#7f1d1d":"#4c1d95"}}>{f.message}</div>
                    {f.remedy && f.remedy.length > 0 && (
                      <div className="flag-remedy">
                        <div className="flag-remedy-label">What to do</div>
                        {f.remedy.map((r,i)=>(
                          <div key={i} className="flag-remedy-item">
                            <span className="flag-remedy-arrow">→</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="divider"/>

        {/* CTA */}
        <div className="cta-block">
          <div className="cta-description">{cta.description}</div>
          <button className="cta-btn" onClick={() => onRequestRealityBreakdown(results)}>
            Access The Free Reality Breakdown →
          </button>
          <div className="cta-divider">
            <div className="cta-divider-line"/>
            <span className="cta-divider-txt">or</span>
            <div className="cta-divider-line"/>
          </div>
          <button className="cta-btn-secondary" onClick={onRequestBlueprint}>
            Get The Nail Tech Success Blueprint →
          </button>
          <div className="cta-note">Instant access · Built for nail school candidates</div>
        </div>

        {/* Next steps */}
        <div className="sec-label">Recommended Next Steps</div>
        {steps.slice(0,2).map((step,i)=>(
          <div key={i} className="step-item">
            <div className="step-num">{i+1}</div>
            <p className="step-txt">{step}</p>
          </div>
        ))}

        <button className="retake" onClick={onRetake}>Retake the Quiz</button>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Quiz({
  onRequestRealityBreakdown,
  onRequestBlueprint,
}: {
  onRequestRealityBreakdown?: (results?: unknown) => void;
  onRequestBlueprint?: () => void;
}) {
  const [screen,    setScreen]   = useState("quiz");
  const [questions, setQuestions]= useState(()=>buildQuiz());
  const [currentQ,  setCurrentQ] = useState(0);
  const [answers,   setAnswers]  = useState({});
  const [results,   setResults]  = useState(null);

  function retake() { setQuestions(buildQuiz()); setCurrentQ(0); setAnswers({}); setResults(null); setScreen("quiz"); }
  function answer(i) { setAnswers(prev=>({...prev,[currentQ]:i})); }
  function next() {
    if (currentQ+1 < questions.length) { setCurrentQ(p=>p+1); }
    else { setResults(calcResults(questions,answers)); setScreen("results"); }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="qr">
        {screen==="quiz"&&questions[currentQ]&&(
          <QuestionScreen question={questions[currentQ]} index={currentQ} total={questions.length} answer={answers[currentQ]??null} onAnswer={answer} onNext={next}/>
        )}
        {screen==="results"&&results&&(
          <ResultsScreen
  results={results}
  onRetake={retake}
  onRequestRealityBreakdown={onRequestRealityBreakdown}
  onRequestBlueprint={onRequestBlueprint}
/>
        )}
      </div>
    </>
  );
}