import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SectionResult {
  id: string;
  title: string;
  pct: number;
  band: { label: string };
}

interface QuizResults {
  pct: number;
  band: { label: string; color: string };
  headline: string;
  worstSection: { id: string; title: string; pct: number; insight: { title: string } };
  bestSection: { id: string; title: string; pct: number; insight: { title: string } };
  sectionResults: SectionResult[];
}

interface RequestBody {
  email: string;
  quizResults: QuizResults | null;
}

const CURRICULUM_URL = Deno.env.get("CURRICULUM_URL") ?? "#";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "results@yourdomain.com";

function bandColor(label: string): string {
  if (label === "Strong Foundation") return "#4A148C";
  if (label === "Developing Foundation") return "#880E4F";
  return "#6A1B9A";
}

function buildEmailHtml(email: string, quizResults: QuizResults | null): string {
  const hasResults = quizResults !== null;
  const pct = hasResults ? quizResults.pct : null;
  const bandLabel = hasResults ? quizResults.band.label : null;
  const headline = hasResults ? quizResults.headline : null;
  const sections = hasResults ? quizResults.sectionResults : [];
  const worstSection = hasResults ? quizResults.worstSection : null;
  const color = hasResults ? bandColor(bandLabel!) : "#9333ea";

  const sectionRows = sections.map(s => `
    <tr>
      <td style="padding:8px 0;font-size:14px;color:#374151;font-family:sans-serif;">${s.title}</td>
      <td style="padding:8px 0;text-align:right;">
        <span style="font-size:13px;font-weight:700;color:${bandColor(s.band.label)};font-family:sans-serif;">${s.pct}% &nbsp;</span>
        <span style="font-size:11px;background:#f3f4f6;color:#6b7280;padding:2px 7px;border-radius:4px;font-family:sans-serif;">${s.band.label}</span>
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#db2777,#9333ea);padding:32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.7);">Nail Tech Readiness Quiz</p>
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;">Your Results Are In</h1>
          </td>
        </tr>

        <!-- Score -->
        ${hasResults ? `
        <tr>
          <td style="padding:32px 32px 0;text-align:center;">
            <div style="display:inline-block;background:#fdf2f8;border:2px solid ${color};border-radius:50%;width:80px;height:80px;line-height:80px;text-align:center;margin-bottom:14px;">
              <span style="font-size:26px;font-weight:700;color:${color};">${pct}%</span>
            </div>
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${color};">${bandLabel}</p>
            <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#111827;line-height:1.4;">${headline}</p>
          </td>
        </tr>

        <!-- Section Scores -->
        <tr>
          <td style="padding:0 32px 24px;">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Your Section Scores</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f1f5f9;">
              ${sectionRows}
            </table>
          </td>
        </tr>

        <!-- Biggest gap -->
        ${worstSection && worstSection.pct < 75 ? `
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="background:#fdf2f8;border-left:3px solid #db2777;border-radius:8px;padding:16px;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#be185d;">Your Most Important Gap</p>
              <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#111827;">${worstSection.title}: ${worstSection.pct}%</p>
              <p style="margin:0;font-size:12px;font-weight:600;color:#be185d;">${worstSection.insight.title}</p>
            </div>
          </td>
        </tr>` : ""}
        ` : `
        <!-- No quiz results (direct sign-up) -->
        <tr>
          <td style="padding:32px;text-align:center;">
            <p style="margin:0;font-size:16px;color:#374151;">Take the quiz to get your personalised readiness score, section breakdown, and custom action plan.</p>
          </td>
        </tr>
        `}

        <!-- Divider -->
        <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #f1f5f9;margin:0"></td></tr>

        <!-- Curriculum CTA -->
        <tr>
          <td style="padding:28px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Your Free Bonus</p>
            <h2 style="margin:0 0 10px;font-size:20px;font-weight:700;color:#111827;">Master Nail Technician Training Curriculum</h2>
            <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">Know exactly what to expect in nail school — before your first day. This curriculum breakdown covers every module, skill milestone, and assessment you'll encounter.</p>
            <a href="${CURRICULUM_URL}" style="display:inline-block;background:linear-gradient(135deg,#db2777,#9333ea);color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:.02em;">Download the Curriculum →</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #f1f5f9;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">You're receiving this because you took the Nail Tech Readiness Quiz.</p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">We respect your privacy. No spam — just real insights.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, quizResults }: RequestBody = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — skipping email send");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subject = quizResults
      ? `Your Nail Tech Readiness Results — ${quizResults.pct}% (${quizResults.band.label})`
      : "Your Free Master Nail Technician Training Curriculum";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject,
        html: buildEmailHtml(email, quizResults),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
