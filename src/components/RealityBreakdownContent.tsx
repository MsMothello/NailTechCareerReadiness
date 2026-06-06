import { type MouseEvent } from "react";

type RealityBreakdownContentProps = {
  onBack?: () => void;
  onTakeQuiz?: () => void;
};

const REALITY_BREAKDOWN_CSS = `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .reality-breakdown-content-page {
      font-family: 'DM Sans', sans-serif;
      background: #f0f4f9;
      color: #1a1a2e;
      padding: 60px 24px 80px;
    }
.reality-back-button {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 100;
  border: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.92);
  color: #be185d;
  border-radius: 999px;
  padding: 10px 16px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  cursor: pointer;
}

.reality-back-button:hover {
  background: #ffffff;
}

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pop {
      0%   { transform: scale(0.85); opacity: 0; }
      70%  { transform: scale(1.04); }
      100% { transform: scale(1);    opacity: 1; }
    }

    /* ── Section Header ── */
    .section-header { max-width: 900px; margin: 0 auto 44px; animation: fadeUp .5s ease both; }
    .section-header h1 { font-size: 2.4rem; font-weight: 800; color: #111827; margin-bottom: 8px; }
    .section-header p  { font-size: 1rem; color: #6b7280; }

    /* ── Hero ── */
    .hero {
      max-width: 900px; margin: 0 auto 32px;
      background: linear-gradient(135deg, #fdf4ff 0%, #fef2f9 50%, #f5f3ff 100%);
      border-radius: 20px;
      padding: 44px 48px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.06);
      position: relative; overflow: hidden;
      animation: fadeUp .5s ease both;
    }
    @media (max-width: 700px) { .hero { padding: 34px 26px; } }
    .hero::before {
      content: ''; position: absolute;
      top: -100px; right: -100px;
      width: 280px; height: 280px;
      background: radial-gradient(circle, rgba(168,85,247,0.14), transparent 70%);
      border-radius: 50%; pointer-events: none;
    }
    .hero::after {
      content: ''; position: absolute;
      bottom: -120px; left: -80px;
      width: 240px; height: 240px;
      background: radial-gradient(circle, rgba(236,72,153,0.10), transparent 70%);
      border-radius: 50%; pointer-events: none;
    }
    .hero-inner { position: relative; z-index: 1; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.7);
      border: 1px solid #ddd6fe;
      border-radius: 50px;
      padding: 6px 14px;
      font-size: 0.72rem; font-weight: 700;
      color: #6d28d9;
      margin-bottom: 22px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    }
    .hero-badge .dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: linear-gradient(135deg, #ec4899, #a855f7);
      display: inline-block;
    }
    .hero h1 {
      font-size: 2.4rem; font-weight: 800;
      line-height: 1.15;
      margin: 0 0 16px;
      letter-spacing: -0.02em;
      color: #111827;
    }
    .hero h1 .hl {
      background: linear-gradient(135deg, #be185d 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
    @media (max-width: 640px) { .hero h1 { font-size: 1.85rem; } }
    .hero-sub {
      font-size: 1rem; line-height: 1.65;
      color: #6b7280;
      margin: 0 0 28px;
      max-width: 620px;
    }
    .hero-stats {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0;
      border-top: 1px solid rgba(124, 58, 237, 0.12);
      padding-top: 22px;
    }
    @media (max-width: 640px) {
      .hero-stats { grid-template-columns: 1fr; gap: 14px; padding-top: 18px; }
    }
    .hero-stat {
      padding: 0 22px;
      border-right: 1px solid rgba(124, 58, 237, 0.12);
    }
    .hero-stat:first-child { padding-left: 0; }
    .hero-stat:last-child { padding-right: 0; border-right: none; }
    @media (max-width: 640px) {
      .hero-stat { border-right: none; padding: 0; }
    }
    .hero-stat .hs-num {
      font-size: 1.55rem; font-weight: 800;
      color: #111827;
      line-height: 1;
      margin-bottom: 6px;
      letter-spacing: -0.01em;
    }
    .hero-stat .hs-label {
      font-size: 0.78rem; color: #6b7280; line-height: 1.45;
    }

    /* ── Card ── */
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 36px;
      max-width: 900px;
      margin: 0 auto 28px;
      box-shadow: 0 2px 16px rgba(0,0,0,0.07);
      animation: fadeUp .5s ease both;
    }
    .card:nth-child(2)  { animation-delay:.05s }
    .card:nth-child(3)  { animation-delay:.10s }
    .card:nth-child(4)  { animation-delay:.15s }
    .card:nth-child(5)  { animation-delay:.20s }
    .card:nth-child(6)  { animation-delay:.25s }
    .card:nth-child(7)  { animation-delay:.30s }
    .card:nth-child(8)  { animation-delay:.35s }
    .card:nth-child(9)  { animation-delay:.40s }
    .card:nth-child(10) { animation-delay:.45s }
    .card:nth-child(11) { animation-delay:.50s }
    .card:nth-child(12) { animation-delay:.55s }
    .card:nth-child(13) { animation-delay:.60s }
    .card:nth-child(14) { animation-delay:.65s }
    .card:nth-child(n+15) { animation-delay:.70s }

    /* ── Card Header ── */
    .card-header { display: flex; align-items: center; gap: 18px; margin-bottom: 28px; }
    .card-icon-wrap {
      width: 60px; height: 60px; border-radius: 18px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .card-icon-wrap svg { width: 32px; height: 32px; }
    .ci-red    { background: linear-gradient(135deg,#fde8e8,#ffc5c5); }
    .ci-pink   { background: linear-gradient(135deg,#fce7f3,#fbcfe8); }
    .ci-green  { background: linear-gradient(135deg,#d1fae5,#a7f3d0); }
    .ci-blue   { background: linear-gradient(135deg,#dbeafe,#bfdbfe); }
    .ci-purple { background: linear-gradient(135deg,#ede9fe,#ddd6fe); }
    .ci-orange { background: linear-gradient(135deg,#ffedd5,#fed7aa); }
    .ci-indigo { background: linear-gradient(135deg,#e0e7ff,#c7d2fe); }
    .ci-teal   { background: linear-gradient(135deg,#ccfbf1,#99f6e4); }

    .card-header-text h2 { font-size: 1.4rem; font-weight: 700; color: #111827; }
    .card-header-text p  { font-size: 0.9rem; color: #6b7280; margin-top: 2px; }

    /* ── Two-column ── */
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 40px; }
    @media (max-width: 640px) { .two-col { grid-template-columns: 1fr; } }

    /* ── Sub-sections with colored icon bullets ── */
    .sub-section { padding-left: 0; margin-bottom: 24px; }
    .sub-section:last-child { margin-bottom: 0; }
    .sub-section-title {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 12px;
    }
    .sub-section-title .dot {
      width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0;
    }
    .sub-section-title h3 { font-size: 0.95rem; font-weight: 700; color: #111827; }

    .sub-section ul { list-style: none; padding-left: 20px; }
    .sub-section ul li {
      font-size: 0.88rem; color: #374151; padding: 4px 0; line-height: 1.5;
      display: flex; align-items: flex-start; gap: 8px;
    }
    .sub-section ul li .bullet { flex-shrink: 0; margin-top: 6px; width: 6px; height: 6px; border-radius: 50%; }

    /* ── Alert box ── */
    .alert-box { border-radius: 14px; padding: 18px 20px; display: flex; gap: 14px; align-items: flex-start; }
    .alert-box .alert-icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .alert-box .alert-icon svg { width: 20px; height: 20px; }
    .alert-box .alert-body {}
    .alert-box .alert-title { font-size: 0.92rem; font-weight: 700; margin-bottom: 5px; }
    .alert-box p { font-size: 0.84rem; line-height: 1.55; }
    .alert-box.red   { background:#fff5f5; border:1px solid #fca5a5; }
    .alert-box.red   .alert-icon { background:#fee2e2; }
    .alert-box.red   .alert-title { color:#b91c1c; }
    .alert-box.red   p { color:#9b2121; }
    .alert-box.orange { background:#fff7ed; border:1px solid #fed7aa; }
    .alert-box.orange .alert-icon { background:#ffedd5; }
    .alert-box.orange .alert-title { color:#9a3412; }
    .alert-box.orange p { color:#7c2d12; }

    /* ── Perception Grid ── */
    .perception-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
      max-width: 900px; margin: 0 auto 28px; animation: fadeUp .5s ease both;
    }
    @media (max-width: 600px) { .perception-grid { grid-template-columns: 1fr; } }
    .perception-card { border-radius: 18px; padding: 26px 24px; }
    .perception-card.see { background: linear-gradient(135deg,#fdf4ff,#fce7f3); border: 1px solid #f0abfc; }
    .perception-card.get { background: #fafafa; border: 1px solid #e5e7eb; }
    .perception-card .p-title { font-size: 1rem; font-weight: 700; color: #111827; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .perception-card .p-icon-wrap { width: 34px; height: 34px; border-radius: 10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .perception-card .p-icon-wrap svg { width: 18px; height: 18px; }
    .perception-card.see .p-icon-wrap { background: #e9d5ff; }
    .perception-card.get .p-icon-wrap { background: #fde68a; }
    .perception-card ul { list-style: none; }
    .perception-card ul li {
      font-size: 0.88rem; color: #374151; padding: 9px 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      display: flex; align-items: flex-start; gap: 10px; line-height: 1.45;
    }
    .perception-card ul li:last-child { border-bottom: none; }
    .p-li-icon { width: 22px; height: 22px; flex-shrink: 0; }

    /* ── Three column mini cards ── */
    .three-col { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 20px; }
    @media (max-width: 700px) { .three-col { grid-template-columns: 1fr; } }
    .mini-card { border-radius: 14px; padding: 20px; }
    .mini-card.purple { background:#f5f3ff; border:1px solid #e9d5ff; }
    .mini-card.teal   { background:#e0f2fe; border:1px solid #bae6fd; }
    .mini-card.yellow { background:#fefce8; border:1px solid #fef08a; }
    .mini-card .mini-icon-wrap { width: 44px; height: 44px; border-radius: 12px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; }
    .mini-card .mini-icon-wrap svg { width: 24px; height: 24px; }
    .mini-card.purple .mini-icon-wrap { background:#ede9fe; }
    .mini-card.teal   .mini-icon-wrap { background:#bae6fd; }
    .mini-card.yellow .mini-icon-wrap { background:#fef08a; }
    .mini-card h3 { font-size: 0.95rem; font-weight: 700; color: #111827; margin-bottom: 8px; }
    .mini-card p  { font-size: 0.83rem; color: #374151; line-height: 1.55; }

    /* ── Reality box ── */
    .reality-box { background: linear-gradient(135deg,#f3e8ff,#fce7f3); border-radius: 16px; padding: 28px 32px; margin-top: 4px; }
    .reality-box .rb-header { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
    .reality-box .rb-header svg { width:20px; height:20px; }
    .reality-box h3 { font-size: 1rem; font-weight: 700; color: #111827; }
    .reality-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 40px; }
    @media (max-width: 600px) { .reality-cols { grid-template-columns: 1fr; } }
    .reality-cols .col-title { font-size: 0.85rem; font-weight: 700; color: #111827; margin-bottom: 10px; display:flex; align-items:center; gap:6px; }
    .reality-cols .col-title svg { width:16px; height:16px; }
    .reality-cols ul { list-style: none; }
    .reality-cols ul li { font-size: 0.85rem; color: #374151; padding: 5px 0; display:flex; align-items:flex-start; gap:8px; line-height:1.4; }
    .reality-cols ul li svg { width:14px; height:14px; flex-shrink:0; margin-top:2px; }

    /* ── Income Timeline ── */
    .income-timeline { margin-bottom: 28px; }
    .section-title { font-size: 1rem; font-weight: 700; color: #111827; margin-bottom: 16px; display:flex; align-items:center; gap:8px; }
    .section-title svg { width:18px; height:18px; }
    .timeline-row {
      display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px;
      padding: 14px 16px; border-radius: 12px; background: #f9fafb; border: 1px solid #f1f5f9;
      transition: background .2s;
    }
    .timeline-row:hover { background: #f0f4ff; }
    .timeline-badge {
      display: flex; align-items: center; gap: 6px;
      font-size: 0.75rem; font-weight: 700; border-radius: 8px;
      padding: 5px 12px; white-space: nowrap; min-width: 110px;
    }
    .timeline-badge svg { width: 12px; height: 12px; flex-shrink:0; }
    .badge-red    { background:#fde8e8; color:#b91c1c; border:1px solid #fca5a5; }
    .badge-orange { background:#fff3e0; color:#c2510f; border:1px solid #fdba74; }
    .badge-yellow { background:#fffde7; color:#92690a; border:1px solid #fde68a; }
    .badge-green  { background:#d1fae5; color:#065f46; border:1px solid #6ee7b7; }
    .timeline-text strong { display:block; font-size:.95rem; font-weight:700; color:#111827; }
    .timeline-text span   { font-size:.82rem; color:#6b7280; }

    /* ── Cost Grid ── */
    .cost-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
    @media (max-width: 600px) { .cost-grid { grid-template-columns: 1fr; } }
    .cost-box { border-radius:16px; padding:22px 24px; }
    .cost-box.pink  { background:#fff5f5; border:1px solid #fca5a5; }
    .cost-box.peach { background:#fffaf5; border:1px solid #fbd5b5; }
    .cost-box .cost-title { font-size:.95rem; font-weight:700; color:#111827; display:flex; align-items:center; gap:10px; margin-bottom:16px; }
    .cost-box .cost-title .ctitle-icon { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .cost-box .cost-title .ctitle-icon svg { width:16px; height:16px; }
    .cost-box.pink  .ctitle-icon { background:#fecaca; }
    .cost-box.peach .ctitle-icon { background:#fed7aa; }
    .cost-row { display:flex; justify-content:space-between; font-size:.85rem; color:#374151; padding:7px 0; border-bottom:1px solid rgba(0,0,0,.05); }
    .cost-row:last-of-type { border-bottom:none; }
    .cost-total { display:flex; justify-content:space-between; font-size:.9rem; font-weight:700; color:#111827; margin-top:12px; padding-top:12px; border-top:1.5px solid rgba(0,0,0,.1); }

    /* ── Math Alert ── */
    .math-alert { border:2px solid #fbbf24; background:linear-gradient(135deg,#fffbeb,#fff0e6); border-radius:14px; padding:22px 26px; display:flex; gap:16px; align-items:flex-start; }
    .math-alert .ma-icon { flex-shrink:0; width:42px; height:42px; background:#fef08a; border-radius:12px; display:flex; align-items:center; justify-content:center; }
    .math-alert .ma-icon svg { width:22px; height:22px; }
    .math-alert .ma-body .math-title { font-size:.95rem; font-weight:700; color:#92400e; margin-bottom:8px; }
    .math-alert .ma-body p { font-size:.85rem; color:#374151; line-height:1.6; margin-bottom:6px; }
    .math-alert .ma-body p:last-child { margin-bottom:0; }
    .math-alert .ma-body p strong { color:#111827; }

    /* ── Licensing Table ── */
    .lic-table { width:100%; border-collapse:collapse; margin-top:20px; }
    .lic-table th { font-size:.78rem; font-weight:700; color:#6b7280; text-transform:uppercase; letter-spacing:.06em; padding:8px 14px; text-align:left; border-bottom:2px solid #e5e7eb; }
    .lic-table td { font-size:.85rem; color:#374151; padding:11px 14px; border-bottom:1px solid #f1f5f9; }
    .lic-table tr:last-child td { border-bottom:none; }
    .lic-table tr:hover td { background:#f9fafb; }
    .lic-badge { display:inline-flex; align-items:center; gap:4px; font-size:.72rem; font-weight:700; padding:3px 9px; border-radius:6px; }
    .lic-badge svg { width:10px; height:10px; }
    .lb-red    { background:#fde8e8; color:#b91c1c; }
    .lb-orange { background:#fff3e0; color:#c2510f; }
    .lb-green  { background:#d1fae5; color:#065f46; }

    /* ── Tax Boxes ── */
    .tax-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
    @media (max-width: 600px) { .tax-grid { grid-template-columns: 1fr; } }
    .tax-box { border-radius:16px; padding:22px 24px; }
    .tax-box.orange { background:#fff7ed; border:1px solid #fbd5b5; }
    .tax-box.blue   { background:#eff6ff; border:1px solid #bfdbfe; }
    .tax-box .tax-title { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
    .tax-box .tax-title .ti { width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .tax-box .tax-title .ti svg { width:18px; height:18px; }
    .tax-box.orange .ti { background:#fed7aa; }
    .tax-box.blue   .ti { background:#bfdbfe; }
    .tax-box .tax-title h4 { font-size:.95rem; font-weight:700; color:#111827; }
    .tax-box ul { list-style:none; }
    .tax-box ul li { font-size:.85rem; color:#374151; padding:4px 0; line-height:1.5; display:flex; align-items:flex-start; gap:8px; }
    .tax-box ul li svg { flex-shrink:0; margin-top:4px; width:12px; height:12px; }
    .tax-highlight { background:linear-gradient(135deg,#fffbeb,#fff0e6); border:2px solid #fbbf24; border-radius:14px; padding:18px 22px; display:flex; gap:14px; align-items:flex-start; }
    .tax-highlight .th-icon { flex-shrink:0; width:36px; height:36px; background:#fef08a; border-radius:10px; display:flex; align-items:center; justify-content:center; }
    .tax-highlight .th-icon svg { width:20px; height:20px; }
    .tax-highlight p { font-size:.85rem; color:#374151; line-height:1.65; }
    .tax-highlight p strong { color:#111827; }

    /* ── Stat Grid ── */
    .stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    @media (max-width: 580px) { .stat-grid { grid-template-columns: 1fr; } }
    .stat-card { border-radius:16px; padding:24px; position:relative; overflow:hidden; transition:transform .2s, box-shadow .2s; }
    .stat-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.1); }
    .stat-card .stat-bg { position:absolute; right:-10px; top:-10px; opacity:.12; }
    .stat-card .stat-bg svg { width:80px; height:80px; }
    .stat-card.s-red    { background:#fff5f5; border:1px solid #fca5a5; }
    .stat-card.s-orange { background:#fff7ed; border:1px solid #fbd5b5; }
    .stat-card.s-purple { background:#f5f3ff; border:1px solid #ddd6fe; }
    .stat-card.s-teal   { background:#f0fdfa; border:1px solid #99f6e4; }
    .stat-card.s-peach  { background:#fff7ed; border:1px solid #fed7aa; }
    .stat-card.s-pink   { background:#fdf2f8; border:1px solid #fbcfe8; }
    .stat-card .stat-num { font-size:2.1rem; font-weight:800; line-height:1; margin-bottom:8px; position:relative; z-index:1; }
    .stat-card.s-red    .stat-num { color:#dc2626; }
    .stat-card.s-orange .stat-num { color:#ea580c; }
    .stat-card.s-purple .stat-num { color:#7c3aed; }
    .stat-card.s-teal   .stat-num { color:#0d9488; }
    .stat-card.s-peach  .stat-num { color:#ea580c; }
    .stat-card.s-pink   .stat-num { color:#db2777; }
    .stat-card .stat-label { font-size:.88rem; font-weight:700; color:#111827; margin-bottom:6px; position:relative; z-index:1; }
    .stat-card .stat-desc  { font-size:.82rem; color:#6b7280; line-height:1.55; position:relative; z-index:1; }

    /* ── Instagram Gap ── */
    .insta-gap { background:#1e2030; border-radius:16px; padding:26px 28px; margin-top:24px; display:flex; gap:18px; align-items:flex-start; }
    .insta-gap .ig-icon { flex-shrink:0; width:44px; height:44px; background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045); border-radius:12px; display:flex; align-items:center; justify-content:center; }
    .insta-gap .ig-icon svg { width:22px; height:22px; }
    .insta-gap h3 { font-size:.95rem; font-weight:700; color:#fff; margin-bottom:8px; }
    .insta-gap p  { font-size:.87rem; color:#94a3b8; line-height:1.75; }

    /* ── Lifestyle ── */
    .lifestyle-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; }
    @media (max-width: 640px) { .lifestyle-grid { grid-template-columns: 1fr; } }
    .lifestyle-col h3 { font-size:.95rem; font-weight:700; color:#111827; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
    .lifestyle-col h3 svg { width:16px; height:16px; }
    .lifestyle-col ul  { list-style:none; }
    .lifestyle-col ul li { font-size:.85rem; color:#374151; padding:5px 0; display:flex; align-items:flex-start; gap:8px; line-height:1.45; }
    .lifestyle-col ul li svg { flex-shrink:0; margin-top:3px; width:13px; height:13px; }

    /* ── Day Box ── */
    .day-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:16px; padding:22px 24px; }
    .day-box h3 { font-size:.95rem; font-weight:700; color:#111827; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
    .day-box h3 svg { width:16px; height:16px; }
    .day-row { display:flex; gap:14px; padding:8px 0; border-bottom:1px solid #f1f5f9; font-size:.84rem; align-items:flex-start; }
    .day-row:last-child { border-bottom:none; }
    .day-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:5px; }
    .day-time { font-weight:700; color:#111827; min-width:66px; flex-shrink:0; }
    .day-desc { color:#374151; }
    .day-row.rough .day-dot  { background:#ef4444; }
    .day-row.rough .day-desc { color:#dc2626; font-weight:500; }
    .day-row:not(.rough) .day-dot { background:#d1d5db; }

    /* ── Career Paths ── */
    .paths-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:20px; }
    @media (max-width: 700px) { .paths-grid { grid-template-columns:1fr; } }
    .path-card { border-radius:16px; padding:22px; transition:transform .2s, box-shadow .2s; }
    .path-card:hover { transform:translateY(-3px); box-shadow:0 8px 24px rgba(0,0,0,.1); }
    .path-card .path-icon-wrap { width:46px; height:46px; border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:12px; }
    .path-card .path-icon-wrap svg { width:24px; height:24px; }
    .path-card h3 { font-size:.93rem; font-weight:700; color:#111827; margin-bottom:4px; }
    .path-card .path-income { font-size:.78rem; font-weight:700; margin-bottom:8px; }
    .path-card p { font-size:.81rem; color:#374151; line-height:1.55; }
    .path-card.p1 { background:#f0fdf4; border:1px solid #bbf7d0; } .path-card.p1 .path-icon-wrap { background:#bbf7d0; } .path-card.p1 .path-income { color:#15803d; }
    .path-card.p2 { background:#f5f3ff; border:1px solid #ddd6fe; } .path-card.p2 .path-icon-wrap { background:#ddd6fe; } .path-card.p2 .path-income { color:#6d28d9; }
    .path-card.p3 { background:#eff6ff; border:1px solid #bfdbfe; } .path-card.p3 .path-icon-wrap { background:#bfdbfe; } .path-card.p3 .path-income { color:#1d4ed8; }
    .path-card.p4 { background:#fdf2f8; border:1px solid #fbcfe8; } .path-card.p4 .path-icon-wrap { background:#fbcfe8; } .path-card.p4 .path-income { color:#be185d; }
    .path-card.p5 { background:#fff7ed; border:1px solid #fed7aa; } .path-card.p5 .path-icon-wrap { background:#fed7aa; } .path-card.p5 .path-income { color:#c2410c; }
    .path-card.p6 { background:#fefce8; border:1px solid #fef08a; } .path-card.p6 .path-icon-wrap { background:#fef08a; } .path-card.p6 .path-income { color:#a16207; }
    .paths-note { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:16px 20px; display:flex; gap:12px; align-items:flex-start; }
    .paths-note svg { flex-shrink:0; width:18px; height:18px; margin-top:1px; }
    .paths-note p { font-size:.85rem; color:#374151; line-height:1.65; }
    .paths-note p strong { color:#111827; }

    /* ── Citation badge ── */
    .cite {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: .7rem; font-weight: 700; color: #1d4ed8;
      background: #eff6ff; border: 1px solid #bfdbfe;
      border-radius: 5px; padding: 1px 6px; margin-left: 6px;
      text-decoration: none; vertical-align: middle;
      white-space: nowrap; cursor: pointer;
    }
    .cite:hover { background: #dbeafe; }
    .cite svg { width: 9px; height: 9px; }

    /* ── Sources footer in card ── */
    .sources-row {
      margin-top: 20px; padding-top: 16px;
      border-top: 1px solid #f1f5f9;
      display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
    }
    .sources-row .src-label { font-size: .75rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .05em; margin-right: 4px; }
    .source-tag {
      font-size: .72rem; color: #6b7280;
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 6px; padding: 3px 8px;
      text-decoration: none;
    }
    .source-tag:hover { background: #f3f4f6; color: #374151; }

    /* ── Success Stories ── */
    .success-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 20px; }
    @media (max-width: 700px) { .success-grid { grid-template-columns: 1fr; } }
    .success-card {
      border-radius: 16px; padding: 22px;
      border: 1px solid #e5e7eb;
      transition: transform .2s, box-shadow .2s;
    }
    .success-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.08); }
    .success-card.s1 { background: linear-gradient(160deg,#f0fdf4,#f5f3ff); border-color: #d1fae5; }
    .success-card.s2 { background: linear-gradient(160deg,#eff6ff,#fdf2f8); border-color: #bfdbfe; }
    .success-card.s3 { background: linear-gradient(160deg,#fffbeb,#fff7ed); border-color: #fde68a; }
    .success-avatar {
      width: 48px; height: 48px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; margin-bottom: 14px; flex-shrink: 0;
    }
    .success-card.s1 .success-avatar { background: #d1fae5; }
    .success-card.s2 .success-avatar { background: #dbeafe; }
    .success-card.s3 .success-avatar { background: #fef08a; }
    .success-card .success-name { font-size: .95rem; font-weight: 700; color: #111827; margin-bottom: 2px; }
    .success-card .success-role { font-size: .75rem; font-weight: 600; margin-bottom: 12px; }
    .success-card.s1 .success-role { color: #15803d; }
    .success-card.s2 .success-role { color: #1d4ed8; }
    .success-card.s3 .success-role { color: #92400e; }
    .success-card blockquote { font-size: .83rem; color: #374151; line-height: 1.65; font-style: italic; border-left: 3px solid #e5e7eb; padding-left: 12px; margin-bottom: 14px; }
    .success-card.s1 blockquote { border-color: #6ee7b7; }
    .success-card.s2 blockquote { border-color: #93c5fd; }
    .success-card.s3 blockquote { border-color: #fde68a; }
    .success-card .success-path { font-size: .78rem; color: #6b7280; line-height: 1.5; }
    .success-card .success-path strong { color: #111827; }

    .success-note { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px 18px; display: flex; gap: 10px; align-items: flex-start; }
    .success-note svg { flex-shrink: 0; width: 16px; height: 16px; margin-top: 2px; }
    .success-note p { font-size: .8rem; color: #374151; line-height: 1.6; }
    .success-note p strong { color: #111827; }

    /* ── Pre-School Skills ── */
    .skills-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 24px; }
    @media (max-width: 700px) { .skills-grid { grid-template-columns: 1fr; } }
    .skill-card {
      border-radius: 14px; padding: 20px;
      border: 1px solid transparent;
      transition: transform .2s, box-shadow .2s;
    }
    .skill-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,.08); }
    .skill-card .sk-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
    .skill-card .sk-icon svg { width: 22px; height: 22px; }
    .skill-card h3 { font-size: .9rem; font-weight: 700; color: #111827; margin-bottom: 6px; }
    .skill-card p  { font-size: .82rem; color: #374151; line-height: 1.6; }
    .skill-card .sk-tag { display: inline-block; font-size: .68rem; font-weight: 700; padding: 2px 8px; border-radius: 5px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .04em; }

    .skill-card.free  { background: #f0fdf4; border-color: #bbf7d0; }
    .skill-card.free  .sk-icon { background: #bbf7d0; }
    .skill-card.free  .sk-tag  { background: #dcfce7; color: #15803d; }

    .skill-card.low   { background: #eff6ff; border-color: #bfdbfe; }
    .skill-card.low   .sk-icon { background: #bfdbfe; }
    .skill-card.low   .sk-tag  { background: #dbeafe; color: #1d4ed8; }

    .skill-card.prep  { background: #fdf2f8; border-color: #fbcfe8; }
    .skill-card.prep  .sk-icon { background: #fbcfe8; }
    .skill-card.prep  .sk-tag  { background: #fce7f3; color: #be185d; }

    .preschool-tip { background: linear-gradient(135deg,#eff6ff,#f5f3ff); border: 1px solid #c7d2fe; border-radius: 14px; padding: 18px 22px; display: flex; gap: 14px; align-items: flex-start; }
    .preschool-tip .pt-icon { flex-shrink: 0; width: 38px; height: 38px; background: #e0e7ff; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
    .preschool-tip .pt-icon svg { width: 20px; height: 20px; }
    .preschool-tip p { font-size: .85rem; color: #374151; line-height: 1.65; }
    .preschool-tip p strong { color: #111827; }

    /* ── Closing Note ── */
    .closing-note {
      max-width:900px; margin:0 auto 28px;
      background:linear-gradient(135deg,#f0f9ff,#f0fdf4);
      border:1px solid #bae6fd; border-radius:18px; padding:28px 36px;
      text-align:center; display:flex; flex-direction:column; align-items:center; gap:14px;
    }
    .closing-note .cn-icon { width:52px; height:52px; background:linear-gradient(135deg,#bae6fd,#bbf7d0); border-radius:16px; display:flex; align-items:center; justify-content:center; }
    .closing-note .cn-icon svg { width:26px; height:26px; }
    .closing-note p { font-size:.95rem; color:#374151; line-height:1.8; max-width:680px; }

    /* ── Footer ── */
    .site-footer {
      max-width:900px; margin: 40px auto 0;
      padding-top:24px; border-top:1px solid #e5e7eb;
      display:flex; flex-wrap:wrap; gap:14px 24px; justify-content:space-between; align-items:center;
    }
    .site-footer .ft-brand { font-size:.85rem; font-weight:700; color:#374151; }
    .site-footer .ft-links { display:flex; flex-wrap:wrap; gap:18px; }
    .site-footer .ft-links a { font-size:.78rem; color:#6b7280; text-decoration:none; }
    .site-footer .ft-links a:hover { color:#374151; }
    .site-footer .ft-copy { font-size:.75rem; color:#9ca3af; width:100%; text-align:center; padding-top:14px; }

    /* ── CTA ── */
    .cta-section { text-align:center; padding:50px 20px 20px; }
    .cta-section p { font-size:1.1rem; color:#374151; margin-bottom:24px; }
    .cta-btn {
      display:inline-flex; align-items:center; gap:10px;
      background: linear-gradient(135deg, #ff2d9b, #a020f0);
      color:#fff; font-family:'DM Sans',sans-serif;
      font-size:1rem; font-weight:700; padding:18px 48px;
      border-radius:50px; border:none; cursor:pointer;
      text-decoration:none; letter-spacing:.02em;
      box-shadow:0 4px 24px rgba(160,32,240,.35);
      transition:transform .2s, box-shadow .2s;
    }
    .cta-btn svg { width:20px; height:20px; }
    .cta-btn:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(160,32,240,.45); }
  `;

const REALITY_BREAKDOWN_HTML = `<!-- ══ HERO ══ -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-badge">
      <span class="dot"></span>
      The Unfiltered Reality · 8-Minute Read · Updated 2026
    </div>
    <h1>Before you spend <span class="hl">$8,000 on nail school</span>, read this.</h1>
    <p class="hero-sub">The honest breakdown of the money, physical demands, lifestyle, and longevity of a nail tech career — so you walk in with eyes open instead of learning it the expensive way.</p>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="hs-num">$34.6K</div>
        <div class="hs-label">Median income — before taxes &amp; overhead</div>
      </div>
      <div class="hero-stat">
        <div class="hs-num">~28%</div>
        <div class="hs-label">Leave the industry every year</div>
      </div>
      <div class="hero-stat">
        <div class="hs-num">6–18 mo</div>
        <div class="hs-label">To build a sustainable client base</div>
      </div>
    </div>
  </div>
</section>

<!-- ══ WHAT YOU SEE vs GET ══ -->
<div class="perception-grid">
  <div class="perception-card see">
    <div class="p-title">
      <div class="p-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#a855f7"/></svg>
      </div>
      What You See
    </div>
    <ul>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#f3e8ff"/><path d="M11 6l1.5 4.6H17l-3.9 2.8 1.5 4.6L11 15.2l-3.7 2.8 1.5-4.6L5 10.6h4.5L11 6z" fill="#a855f7"/></svg>
        Stunning nail art on social media
      </li>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#f3e8ff"/><path d="M11 6l1.5 4.6H17l-3.9 2.8 1.5 4.6L11 15.2l-3.7 2.8 1.5-4.6L5 10.6h4.5L11 6z" fill="#a855f7"/></svg>
        Flexible schedule &amp; creative freedom
      </li>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#f3e8ff"/><path d="M11 6l1.5 4.6H17l-3.9 2.8 1.5 4.6L11 15.2l-3.7 2.8 1.5-4.6L5 10.6h4.5L11 6z" fill="#a855f7"/></svg>
        Your own boss, beautiful salon vibes
      </li>
    </ul>
  </div>
  <div class="perception-card get">
    <div class="p-title">
      <div class="p-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19h20L12 2z" fill="#f59e0b"/><path d="M12 9v5M12 16.5v.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>
      </div>
      What You Actually Get
    </div>
    <ul>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#fef9c3"/><path d="M11 5L3 18h16L11 5z" fill="#f59e0b"/><path d="M11 10v4M11 15.5v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
        8-12 hour days bent over, repetitive strain
      </li>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#fef9c3"/><path d="M11 5L3 18h16L11 5z" fill="#f59e0b"/><path d="M11 10v4M11 15.5v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
        Full bookings necessary to cover expenses, little flexibility
      </li>
      <li>
        <svg class="p-li-icon" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="11" fill="#fef9c3"/><path d="M11 5L3 18h16L11 5z" fill="#f59e0b"/><path d="M11 10v4M11 15.5v.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
        Overhead costs, no-shows, difficult clients
      </li>
    </ul>
  </div>
</div>

<!-- ══ LICENSING & LEGAL ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-orange">
      <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" fill="#f97316" opacity=".2"/><rect x="4" y="2" width="16" height="20" rx="2" stroke="#f97316" stroke-width="1.5"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="18" r="4" fill="#f97316"/><path d="M16.5 18l1 1 2-2" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Licensing &amp; Legal Requirements</h2>
      <p>What you must do before you can legally charge a single client</p>
    </div>
  </div>
  <div class="two-col" style="margin-bottom:20px;">
    <div>
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#f97316"></div><h3>Education Hours Required</h3></div>
        <ul>
          <li><div class="bullet" style="background:#f97316"></div>Most U.S. states: 300–600 cosmetology/nail hours</li>
          <li><div class="bullet" style="background:#f97316"></div>New state? Approval required, extra training may apply</li>
          <li><div class="bullet" style="background:#f97316"></div>Program length: 3–12 months depending on state</li>
          <li><div class="bullet" style="background:#f97316"></div>Hours must be completed at an accredited school</li>
        </ul>
      </div>
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#eab308"></div><h3>State Board Exam</h3></div>
        <ul>
          <li><div class="bullet" style="background:#eab308"></div>Written (theory) exam — anatomy, sanitation, safety</li>
          <li><div class="bullet" style="background:#eab308"></div>Practical (hands-on) exam — live model or mannequin</li>
          <li><div class="bullet" style="background:#eab308"></div>Must pass both to receive license</li>
          <li><div class="bullet" style="background:#eab308"></div>Retake fees apply if you fail ($50–$150 per attempt)</li>
        </ul>
      </div>
    </div>
    <div>
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#06b6d4"></div><h3>Ongoing Requirements</h3></div>
        <ul>
          <li><div class="bullet" style="background:#06b6d4"></div>License renewal every 1–2 years (varies by state)</li>
          <li><div class="bullet" style="background:#06b6d4"></div>Continuing education units (CEUs) often required</li>
          <li><div class="bullet" style="background:#06b6d4"></div>Failure to renew = illegal to practice = income stops</li>
          <li><div class="bullet" style="background:#06b6d4"></div>Salon/booth must pass separate health inspections</li>
        </ul>
      </div>
      <div class="alert-box orange">
        <div class="alert-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19h20L12 2z" fill="#f97316"/><path d="M12 9v5M12 16.5v.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="alert-body">
          <div class="alert-title">Working Unlicensed = Serious Consequences</div>
          <p>Fines up to $5,000, criminal charges in some states, and permanent damage to your ability to get licensed. Never practice before your license is issued.</p>
        </div>
      </div>
    </div>
  </div>
  <table class="lic-table">
    <thead><tr><th>Requirement</th><th>Timeline</th><th>Cost Estimate</th><th>Urgency</th></tr></thead>
    <tbody>
      <tr><td>Complete accredited nail program</td><td>3–12 months</td><td>$3,000–$8,000</td><td><span class="lic-badge lb-red"><svg viewBox="0 0 10 10" fill="#b91c1c"><circle cx="5" cy="5" r="5"/></svg>Required</span></td></tr>
      <tr><td>State board exam (written + practical)</td><td>After school</td><td>$100–$300</td><td><span class="lic-badge lb-red"><svg viewBox="0 0 10 10" fill="#b91c1c"><circle cx="5" cy="5" r="5"/></svg>Required</span></td></tr>
      <tr><td>Business license / DBA registration</td><td>Before first client</td><td>$50–$200</td><td><span class="lic-badge lb-red"><svg viewBox="0 0 10 10" fill="#b91c1c"><circle cx="5" cy="5" r="5"/></svg>Required</span></td></tr>
      <tr><td>Professional liability insurance</td><td>Before first client</td><td>$300–$600/yr</td><td><span class="lic-badge lb-orange"><svg viewBox="0 0 10 10" fill="#c2510f"><circle cx="5" cy="5" r="5"/></svg>Strongly advised</span></td></tr>
      <tr><td>License renewal + CEUs</td><td>Every 1–2 years</td><td>$50–$300/cycle</td><td><span class="lic-badge lb-green"><svg viewBox="0 0 10 10" fill="#065f46"><circle cx="5" cy="5" r="5"/></svg>Ongoing</span></td></tr>
    </tbody>
  </table>
</div>

<!-- ══ PHYSICAL DEMANDS ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-red">
      <svg viewBox="0 0 24 24" fill="none"><path d="M13 3L5 13h6l-2 8 8-10h-6l2-8z" fill="#ef4444"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Physical Demands</h2>
      <p>Your body is your business—until it breaks down</p>
    </div>
  </div>
  <div class="two-col">
    <div>
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#ef4444"></div><h3>Standing &amp; Posture</h3></div>
        <ul>
          <li><div class="bullet" style="background:#ef4444"></div>8-12 hours/day on your sit</li>
          <li><div class="bullet" style="background:#ef4444"></div>Hunched over with hands at awkward angles</li>
          <li><div class="bullet" style="background:#ef4444"></div>70% of techs report chronic back/neck pain</li>
          <li><div class="bullet" style="background:#ef4444"></div>Varicose veins common by year 3</li>
        </ul>
      </div>
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#f97316"></div><h3>Repetitive Strain</h3></div>
        <ul>
          <li><div class="bullet" style="background:#f97316"></div>Carpal tunnel syndrome risk</li>
          <li><div class="bullet" style="background:#f97316"></div>Thumb and wrist tendonitis</li>
          <li><div class="bullet" style="background:#f97316"></div>Hand tremors from overuse</li>
          <li><div class="bullet" style="background:#f97316"></div>These injuries = no income</li>
        </ul>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:22px;">
      <div class="sub-section">
        <div class="sub-section-title"><div class="dot" style="background:#eab308"></div><h3>Chemical Exposure</h3></div>
        <ul>
          <li><div class="bullet" style="background:#eab308"></div>Daily exposure to acrylic monomers, acetone, formaldehyde</li>
          <li><div class="bullet" style="background:#eab308"></div>Respiratory issues even with ventilation</li>
          <li><div class="bullet" style="background:#eab308"></div>Skin sensitivity and allergic reactions</li>
          <li><div class="bullet" style="background:#eab308"></div>Headaches, dizziness if poorly ventilated</li>
        </ul>
      </div>
      <div class="alert-box red">
        <div class="alert-icon"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444"/><path d="M12 7v6M12 15.5v.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="alert-body">
          <div class="alert-title">Real Talk: Injury = Career Crisis</div>
          <p>No sick pay. No disability insurance unless you buy it yourself. One bad case of tendonitis can wipe out months of income.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══ EMOTIONAL LABOR ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-pink">
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12z" fill="#ec4899" opacity=".3"/><path d="M12 21C12 21 3 15 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12z" stroke="#ec4899" stroke-width="1.5"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Emotional Labor</h2>
      <p>The invisible work that drains you most</p>
    </div>
  </div>
  <div class="three-col">
    <div class="mini-card purple">
      <div class="mini-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="#7c3aed" stroke-width="1.5"/><circle cx="15" cy="8" r="3" stroke="#7c3aed" stroke-width="1.5"/><path d="M3 19c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6" stroke="#7c3aed" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <h3>Managing Personalities</h3>
      <p>Anxious clients, demanding clients, chatty clients who run you late, clients who go silent and leave bad reviews.</p>
    </div>
    <div class="mini-card teal">
      <div class="mini-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#0891b2" stroke-width="1.5"/><circle cx="12" cy="12" r="3" stroke="#0891b2" stroke-width="1.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#0891b2" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <h3>Unrealistic Expectations</h3>
      <p>"I want these Pinterest nails in 45 minutes for $30." You must educate, upsell, and manage disappointment—constantly.</p>
    </div>
    <div class="mini-card yellow">
      <div class="mini-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19h20L12 2z" fill="#eab308" opacity=".3"/><path d="M12 2L2 19h20L12 2z" stroke="#ca8a04" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5M12 16.5v.5" stroke="#ca8a04" stroke-width="1.8" stroke-linecap="round"/></svg>
      </div>
      <h3>Performance Pressure</h3>
      <p>Every set must be perfect. One mistake = lost client, potential bad review, income hit. No room for "off days."</p>
    </div>
  </div>
  <div class="reality-box">
    <div class="rb-header">
      <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#a855f7" opacity=".2"/><rect x="3" y="3" width="18" height="18" rx="3" stroke="#a855f7" stroke-width="1.5"/><path d="M8 12h8M12 8v8" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round"/></svg>
      <h3>Weekly Reality Check</h3>
    </div>
    <div class="reality-cols">
      <div>
        <div class="col-title"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" stroke-width="1.5"/><path d="M5 8l2 2 4-4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>You WILL deal with:</div>
        <ul>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#fee2e2"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>No-shows who don't apologize</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#fee2e2"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>Last-minute cancellations</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#fee2e2"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>Clients who blame you for their nail damage</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#fee2e2"/><path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg>Requests to "just squeeze me in"</li>
        </ul>
      </div>
      <div>
        <div class="col-title"><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#16a34a" stroke-width="1.5"/><path d="M5 8l2 2 4-4" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>You MUST maintain:</div>
        <ul>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dcfce7"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Warm, friendly demeanor at all times</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dcfce7"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Professional boundaries without seeming cold</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dcfce7"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Empathy even when you're exhausted</li>
          <li><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" fill="#dcfce7"/><path d="M4.5 7l2 2 3-3" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Positive online presence and engagement</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- ══ FINANCIAL REALITY ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-green">
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#22c55e" opacity=".2"/><circle cx="12" cy="12" r="9" stroke="#22c55e" stroke-width="1.5"/><path d="M12 7v1.5M12 15.5V17M9.5 10.5a2.5 2.5 0 0 1 5 0c0 1.4-.9 2-2.5 2.5s-2.5 1.1-2.5 2.5a2.5 2.5 0 0 0 5 0" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Financial Reality</h2>
      <p>The math most people skip before enrolling</p>
    </div>
  </div>
  <div class="income-timeline">
    <div class="section-title">
      <svg viewBox="0 0 24 24" fill="none"><path d="M3 17l4-8 4 5 3-3 4 6" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Realistic Income Timeline
    </div>
    <div class="timeline-row">
      <div class="timeline-badge badge-red"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#b91c1c" stroke-width="1.5"/><path d="M6 4v3M6 8.5v.5" stroke="#b91c1c" stroke-width="1.5" stroke-linecap="round"/></svg>Months 0-3</div>
      <div class="timeline-text"><strong>$200–$800/month</strong><span>Few clients, still building skills, heavy marketing effort</span></div>
    </div>
    <div class="timeline-row">
      <div class="timeline-badge badge-orange"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#c2510f" stroke-width="1.5"/><path d="M4 6l2 2 2-2" stroke="#c2510f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Months 4-8</div>
      <div class="timeline-text"><strong>$1,200–$2,500/month</strong><span>Repeat clients starting, but still inconsistent booking</span></div>
    </div>
    <div class="timeline-row">
      <div class="timeline-badge badge-yellow"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#92690a" stroke-width="1.5"/><path d="M4 6l2 2 2-2" stroke="#92690a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Months 9-18</div>
      <div class="timeline-text"><strong>$2,500–$4,000/month</strong><span>Solid client base, but overhead costs eating into profit</span></div>
    </div>
    <div class="timeline-row">
      <div class="timeline-badge badge-green"><svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#065f46" stroke-width="1.5"/><path d="M4 6l1.5 1.5 2.5-3" stroke="#065f46" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Year 2+</div>
      <div class="timeline-text"><strong>$3,500–$6,000/month (if fully booked)</strong><span>Top 20% of techs. Requires constant hustle, perfect retention, no time off</span></div>
    </div>
  </div>
  <div class="cost-grid">
    <div class="cost-box pink">
      <div class="cost-title">
        <div class="ctitle-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M3 17l4-6h10l4 6H3z" fill="#ef4444" opacity=".3"/><path d="M3 17l4-6h10l4 6H3z" stroke="#ef4444" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        Upfront Costs
      </div>
      <div class="cost-row"><span>Licensing &amp; training</span><span>$3,000–$8,000</span></div>
      <div class="cost-row"><span>Starter kit &amp; supplies</span><span>$1,500–$3,000</span></div>
      <div class="cost-row"><span>Booth/suite deposit</span><span>$500–$1,500</span></div>
      <div class="cost-total"><span>Total investment</span><span>$5,000–$12,500</span></div>
    </div>
    <div class="cost-box peach">
      <div class="cost-title">
        <div class="ctitle-icon"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#f97316" stroke-width="1.5"/><path d="M3 9h18M8 2v4M16 2v4" stroke="#f97316" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        Monthly Overhead
      </div>
      <div class="cost-row"><span>Booth/suite rent</span><span>$400–$1,200</span></div>
      <div class="cost-row"><span>Products &amp; supplies</span><span>$200–$500</span></div>
      <div class="cost-row"><span>Insurance, licenses</span><span>$100–$200</span></div>
      <div class="cost-row"><span>Marketing (social media ads)</span><span>$100–$300</span></div>
      <div class="cost-total"><span>Total monthly</span><span>$800–$2,200</span></div>
    </div>
  </div>
  <div class="math-alert">
    <div class="ma-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 19h20L12 2z" fill="#fbbf24" opacity=".4"/><path d="M12 2L2 19h20L12 2z" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 9v5M12 16.5v.5" stroke="#92400e" stroke-width="1.8" stroke-linecap="round"/></svg></div>
    <div class="ma-body">
      <div class="math-title">⚠ The Math Nobody Talks About</div>
      <p>To net $3,000/month after overhead, you need to gross $5,000–$6,000. At $60/full set, that's 83–100 full sets per month, or 20–25 clients per week.</p>
      <p><strong>That's a full schedule with zero cancellations, no slow weeks, and no time off. Most techs never hit this consistently.</strong></p>
    </div>
  </div>
</div>

<!-- ══ TAXES & BUSINESS ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-indigo">
      <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" fill="#6366f1" opacity=".2"/><rect x="4" y="2" width="16" height="20" rx="2" stroke="#6366f1" stroke-width="1.5"/><path d="M8 8h8M8 12h5M14 16l2-2 2 2" stroke="#6366f1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Taxes &amp; Business Reality</h2>
      <p>The financial admin nobody teaches you in nail school</p>
    </div>
  </div>
  <div class="tax-grid">
    <div class="tax-box orange">
      <div class="tax-title">
        <div class="ti"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#f97316" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#f97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4>Self-Employment Tax Shock</h4>
      </div>
      <ul>
        <li><svg viewBox="0 0 12 12" fill="#f97316"><circle cx="6" cy="6" r="5"/></svg>You pay 15.3% self-employment tax on top of income tax</li>
        <li><svg viewBox="0 0 12 12" fill="#f97316"><circle cx="6" cy="6" r="5"/></svg>No employer covering your half of Social Security</li>
        <li><svg viewBox="0 0 12 12" fill="#f97316"><circle cx="6" cy="6" r="5"/></svg>Quarterly estimated taxes due (Jan, Apr, Jun, Sep)</li>
        <li><svg viewBox="0 0 12 12" fill="#f97316"><circle cx="6" cy="6" r="5"/></svg>Miss them and face IRS penalties + interest</li>
        <li><svg viewBox="0 0 12 12" fill="#f97316"><circle cx="6" cy="6" r="5"/></svg>Set aside 25–35% of every payment for taxes</li>
      </ul>
    </div>
    <div class="tax-box blue">
      <div class="tax-title">
        <div class="ti"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#3b82f6" stroke-width="1.5"/><path d="M8 12h8M8 8h5M8 16h3" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/></svg></div>
        <h4>Business Admin You Must Handle</h4>
      </div>
      <ul>
        <li><svg viewBox="0 0 12 12" fill="#3b82f6"><circle cx="6" cy="6" r="5"/></svg>Track every expense and receipt (deductible supplies)</li>
        <li><svg viewBox="0 0 12 12" fill="#3b82f6"><circle cx="6" cy="6" r="5"/></svg>Invoice clients or use POS/booking software</li>
        <li><svg viewBox="0 0 12 12" fill="#3b82f6"><circle cx="6" cy="6" r="5"/></svg>Separate business and personal bank accounts</li>
        <li><svg viewBox="0 0 12 12" fill="#3b82f6"><circle cx="6" cy="6" r="5"/></svg>Consider LLC for liability protection ($50–$500/yr)</li>
        <li><svg viewBox="0 0 12 12" fill="#3b82f6"><circle cx="6" cy="6" r="5"/></svg>Hire a CPA — nail techs often overpay taxes without one</li>
      </ul>
    </div>
  </div>
  <div class="tax-highlight">
    <div class="th-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M13 3L5 13h6l-2 8 8-10h-6l2-8z" fill="#f59e0b"/></svg></div>
    <p><strong>Real example:</strong> You gross $4,000 in a month. After $1,400 overhead and $1,050 in taxes (26%), you take home ~$1,550. That's not $4,000 — it's $1,550. Most new techs don't plan for this and face serious cash flow problems in year one.</p>
  </div>
</div>

<!-- ══ DID YOU KNOW ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-purple">
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#a855f7" opacity=".2"/><circle cx="12" cy="12" r="9" stroke="#a855f7" stroke-width="1.5"/><path d="M12 8v1M12 11v5" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Did You Know?</h2>
      <p>The numbers most schools don't put in their brochures</p>
    </div>
  </div>
  <div class="stat-grid">
    <div class="stat-card s-red">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="35" stroke="#ef4444" stroke-width="6"/></svg></div>
      <div class="stat-num">~28%</div>
      <div class="stat-label">annual employee turnover rate<a href="https://www.nailsmag.com" target="_blank" class="cite"><svg viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="#1d4ed8" stroke-width="1.3" stroke-linecap="round"/></svg>NAILS Mag</a></div>
      <div class="stat-desc">High churn driven by physical pain, burnout, and unpredictable income — making staff retention a constant challenge.</div>
    </div>
    <div class="stat-card s-orange">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><path d="M40 10L70 65H10L40 10z" stroke="#f97316" stroke-width="6"/></svg></div>
      <div class="stat-num">$34.6K</div>
      <div class="stat-label">median annual income (BLS 2024)<a href="https://www.bls.gov/oes/current/oes395092.htm" target="_blank" class="cite"><svg viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="#1d4ed8" stroke-width="1.3" stroke-linecap="round"/></svg>BLS.gov</a></div>
      <div class="stat-desc">That's ~$16.66/hr. In your first 1–2 years building a clientele, expect significantly less before overhead.</div>
    </div>
    <div class="stat-card s-purple">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><rect x="10" y="10" width="60" height="60" rx="10" stroke="#a855f7" stroke-width="6"/></svg></div>
      <div class="stat-num">21%</div>
      <div class="stat-label">report nose, eye & skin irritation<a href="https://pmc.ncbi.nlm.nih.gov" target="_blank" class="cite"><svg viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="#1d4ed8" stroke-width="1.3" stroke-linecap="round"/></svg>PMC Study</a></div>
      <div class="stat-desc">Published nail salon health study found 1 in 5 techs develop irritation — even with ventilation in place.</div>
    </div>
    <div class="stat-card s-teal">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><path d="M10 40a30 30 0 1 1 60 0" stroke="#0d9488" stroke-width="6"/></svg></div>
      <div class="stat-num">6–18 mo</div>
      <div class="stat-label">to build a sustainable client base</div>
      <div class="stat-desc">During this time, you'll likely need another income source to survive financially.</div>
    </div>
    <div class="stat-card s-peach">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><path d="M20 60V30l20-15 20 15v30H20z" stroke="#ea580c" stroke-width="6"/></svg></div>
      <div class="stat-num">30–40%</div>
      <div class="stat-label">of income goes to overhead</div>
      <div class="stat-desc">Booth rent, supplies, insurance, marketing — all deducted before you see a dollar of take-home pay.</div>
    </div>
    <div class="stat-card s-pink">
      <div class="stat-bg"><svg viewBox="0 0 80 80" fill="none"><path d="M40 70C40 70 10 50 10 28a15 15 0 0 1 30-5 15 15 0 0 1 30 5c0 22-30 42-30 42z" stroke="#db2777" stroke-width="6"/></svg></div>
      <div class="stat-num">90%</div>
      <div class="stat-label">of nail salons offer no health insurance<a href="https://www.nailsmag.com" target="_blank" class="cite"><svg viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2v4" stroke="#1d4ed8" stroke-width="1.3" stroke-linecap="round"/></svg>NAILS Mag</a></div>
      <div class="stat-desc">Don't work = don't eat. Getting sick or injured is a genuine financial crisis with no safety net.</div>
    </div>
  </div>
  <div class="insta-gap">
    <div class="ig-icon">
      <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke="#fff" stroke-width="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="#fff"/></svg>
    </div>
    <div>
      <h3>The Instagram Reality Gap:</h3>
      <p>The techs posting perfect nails and "fully booked" stories? Many are working 60–70 hour weeks, living paycheck to paycheck, and one bad review away from empty schedules. The highlight reel doesn't show the NSAIDs they pop daily for pain, the panic when rent is due, or the smile they fake while redoing work for free.</p>
    </div>
  </div>
  <div class="sources-row">
    <span class="src-label">Sources</span>
    <a href="https://www.bls.gov/oes/current/oes395092.htm" target="_blank" class="source-tag">U.S. Bureau of Labor Statistics 2024</a>
    <a href="https://pmc.ncbi.nlm.nih.gov" target="_blank" class="source-tag">PMC Nail Salon Health Study</a>
    <a href="https://www.nailsmag.com" target="_blank" class="source-tag">NAILS Magazine Industry Data</a>
    <a href="https://www.osha.gov/nail-salons" target="_blank" class="source-tag">OSHA Nail Salon Safety</a>
  </div>
</div>


<!-- ══ LIFESTYLE IMPACT ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-blue">
      <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#3b82f6" stroke-width="1.5"/><path d="M12 7v5l3 3" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Lifestyle Impact</h2>
      <p>What you sacrifice for those "flexible hours"</p>
    </div>
  </div>
  <div class="lifestyle-grid">
    <div>
      <div class="lifestyle-col" style="margin-bottom:28px;">
        <h3><svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="#6b7280" stroke-width="1.5"/><path d="M2 6h12M6 2v4M10 2v4" stroke="#6b7280" stroke-width="1.2" stroke-linecap="round"/></svg>Your Schedule Reality</h3>
        <ul>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#fee2e2"/><path d="M4 4l5 5M9 4l-5 5" stroke="#ef4444" stroke-width="1.4" stroke-linecap="round"/></svg>Evenings: 5-9pm (peak booking time)</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#fee2e2"/><path d="M4 4l5 5M9 4l-5 5" stroke="#ef4444" stroke-width="1.4" stroke-linecap="round"/></svg>Saturdays: Fully booked or you're losing money</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#fee2e2"/><path d="M4 4l5 5M9 4l-5 5" stroke="#ef4444" stroke-width="1.4" stroke-linecap="round"/></svg>Sundays: Often your catch-up/prep day</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#fee2e2"/><path d="M4 4l5 5M9 4l-5 5" stroke="#ef4444" stroke-width="1.4" stroke-linecap="round"/></svg>Holidays: Major revenue opportunities, not days off</li>
        </ul>
      </div>
      <div class="lifestyle-col">
        <h3><svg viewBox="0 0 16 16" fill="none"><path d="M8 14s-6-4-6-8a6 6 0 0 1 12 0c0 4-6 8-6 8z" stroke="#6b7280" stroke-width="1.5"/></svg>Social Life Trade-Offs</h3>
        <ul>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#f3f4f6"/><path d="M4 6.5h5" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round"/></svg>Miss most weekend social events</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#f3f4f6"/><path d="M4 6.5h5" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round"/></svg>Can't commit to evening plans</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#f3f4f6"/><path d="M4 6.5h5" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round"/></svg>Vacation = lost income + stressed clients</li>
          <li><svg viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" fill="#f3f4f6"/><path d="M4 6.5h5" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round"/></svg>Hard to maintain relationships outside industry</li>
        </ul>
      </div>
    </div>
    <div class="day-box">
      <h3><svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#3b82f6" stroke-width="1.5"/><path d="M8 5v3l2 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>A Day in the Real Life</h3>
      <div class="day-row">         <div class="day-dot"></div><span class="day-time">8:00 AM</span><span class="day-desc">Set up station, prep for day</span></div>
      <div class="day-row">         <div class="day-dot"></div><span class="day-time">9:00 AM</span><span class="day-desc">First client (full set, 90 min)</span></div>
      <div class="day-row rough">   <div class="day-dot"></div><span class="day-time">10:30 AM</span><span class="day-desc">Client shows 20 min late, rushes you</span></div>
      <div class="day-row">         <div class="day-dot"></div><span class="day-time">12:00 PM</span><span class="day-desc">Scarf down lunch in 15 min</span></div>
      <div class="day-row">         <div class="day-dot"></div><span class="day-time">12:30 PM</span><span class="day-desc">Back-to-back fills (no breaks)</span></div>
      <div class="day-row rough">   <div class="day-dot"></div><span class="day-time">5:00 PM</span><span class="day-desc">Feet aching, wrist sore, 3 more hours</span></div>
      <div class="day-row rough">   <div class="day-dot"></div><span class="day-time">8:00 PM</span><span class="day-desc">Last client complains, redo for free</span></div>
      <div class="day-row">         <div class="day-dot"></div><span class="day-time">9:30 PM</span><span class="day-desc">Clean station, prep tomorrow, respond to DMs</span></div>
      <div class="day-row rough">   <div class="day-dot"></div><span class="day-time">10:30 PM</span><span class="day-desc">Home. Exhausted. Do it again tomorrow.</span></div>
    </div>
  </div>
</div>

<!-- ══ CAREER GROWTH ══ -->
<div class="card">
  <div class="card-header">
    <div class="card-icon-wrap ci-teal">
      <svg viewBox="0 0 24 24" fill="none"><path d="M5 17l4-8 4 4 3-5 4 9" stroke="#0d9488" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="6" r="3" fill="#0d9488" opacity=".3"/><circle cx="18" cy="6" r="3" stroke="#0d9488" stroke-width="1.5"/></svg>
    </div>
    <div class="card-header-text">
      <h2>Career Growth Paths</h2>
      <p>Where this career can actually take you — if you survive the first 2 years</p>
    </div>
  </div>
  <div class="paths-grid">
    <div class="path-card p1">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><path d="M3 21h18M6 21V9l6-6 6 6v12" stroke="#15803d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="9" y="15" width="6" height="6" rx="1" stroke="#15803d" stroke-width="1.5"/></svg></div>
      <h3>Salon / Suite Owner</h3>
      <div class="path-income">$60K–$150K+/yr potential</div>
      <p>Lease a full salon or suite, hire other techs, earn from their booth rent. Requires business skills and significant capital.</p>
    </div>
    <div class="path-card p2">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><path d="M4 19l8-14 8 14H4z" stroke="#6d28d9" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 19v-5h6v5" stroke="#6d28d9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h3>Nail Educator / Trainer</h3>
      <div class="path-income">$40–$200/hour teaching</div>
      <p>Teach at beauty schools, run private classes, create online courses. Requires 3–5 years of strong technique and reputation.</p>
    </div>
    <div class="path-card p3">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="#1d4ed8" stroke-width="1.5"/><path d="M3 10h18M7 6V4M17 6V4" stroke="#1d4ed8" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <h3>Brand / Product Rep</h3>
      <div class="path-income">$45K–$80K + commissions</div>
      <p>Represent nail brands at shows, do demos, train other techs. Requires an established industry presence and following.</p>
    </div>
    <div class="path-card p4">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#be185d" stroke-width="1.5"/><circle cx="12" cy="17" r="1.5" fill="#be185d"/><path d="M9 6h6M9 9h4" stroke="#be185d" stroke-width="1.5" stroke-linecap="round"/></svg></div>
      <h3>Content Creator</h3>
      <div class="path-income">Variable — $0 to $10K+/mo</div>
      <p>Monetize your nail content via brand deals, tutorials, and courses. Highly competitive and unpredictable income.</p>
    </div>
    <div class="path-card p5">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="#c2410c" stroke-width="1.5" stroke-linejoin="round"/></svg></div>
      <h3>High-End / Specialty Niche</h3>
      <div class="path-income">$150–$400+ per set</div>
      <p>Specialize in nail art or extensions and command premium pricing. Takes years to develop and a loyal premium clientele.</p>
    </div>
    <div class="path-card p6">
      <div class="path-icon-wrap"><svg viewBox="0 0 24 24" fill="none"><path d="M15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-6z" stroke="#a16207" stroke-width="1.5" stroke-linejoin="round"/><path d="M15 3v6h6" stroke="#a16207" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 13l2 2 4-4" stroke="#a16207" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h3>Session / Editorial</h3>
      <div class="path-income">$300–$1,500+ per day</div>
      <p>Work on photo shoots, films, fashion shows. Highly competitive, requires agent or industry connections, irregular work.</p>
    </div>
  </div>
  <div class="paths-note">
    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#16a34a" stroke-width="1.5"/><path d="M9 12l2 2 4-4" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <p><strong>The honest truth:</strong> Most of these paths require 3–5+ years of experience, a strong portfolio, and an audience or network. They are not the default outcome — they are hard-earned exits from the daily client grind.</p>
  </div>
</div>

<!-- ══ CLOSING NOTE ══ -->
<div class="closing-note">
  <div class="cn-icon">
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="#0891b2" stroke-width="1.5"/><path d="M12 8v1M12 11v5" stroke="#0891b2" stroke-width="2" stroke-linecap="round"/></svg>
  </div>
  <p>This isn't designed to discourage you—it's designed to prepare you. Nail technology can be rewarding for the right person, but it requires clear-eyed understanding of what you're signing up for.</p>
</div>

<!-- ══ TEASER HINT ══ -->
<div style="max-width:900px;margin:0 auto 12px;text-align:center;padding:32px 24px 0;">
  <p style="font-size:1rem;color:#6b7280;line-height:1.8;">
    Success in nail technology is real — but it's earned, not handed to you at graduation. The techs who make it work don't have more talent. They have a <strong style="color:#111827;">clearer starting point</strong>, THE STARTING POINT NAIL SCHOOL DOESN'T GIVE YOU IN PLAIN LANGUAGE.
  </p>
</div>

<!-- ══ CTA ══ -->
<div class="cta-section">
  <p style="font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a855f7;margin-bottom:10px;">The Roadmap to a Career that Lasts</p>
  <h2 style="font-size:2rem;font-weight:800;color:#111827;margin-bottom:12px;line-height:1.2;">The Nail Tech Success Blueprint</h2>
  <p style="font-size:.97rem;color:#6b7280;max-width:520px;margin:0 auto 28px;line-height:1.75;">A step-by-step guide to building a profitable, sustainable nail tech career from day one. 8 modules. Templates included. Lifetime access.</p>

  <a href="REPLACE_WITH_CHECKOUT_URL" target="_blank" rel="noopener noreferrer" class="cta-btn" style="font-size:1.05rem;padding:20px 56px;">
    <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" fill="#fff"/></svg>
    Get the Blueprint — $97
  </a>

  <p style="font-size:.78rem;color:#9ca3af;margin-top:12px;">One-time payment · Instant digital access · 8 modules + templates · Lifetime updates</p>

  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e7eb;">
    <p style="font-size:.85rem;color:#9ca3af;margin-bottom:12px;">Not ready to commit? Take the free 2-minute fit quiz first.</p>
    <a href="https://nail-tech-career-fit-uy8n.bolt.host" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;font-size:.92rem;font-weight:700;color:#fff;text-decoration:none;border-radius:50px;padding:13px 30px;background:linear-gradient(135deg, rgba(236,72,153,0.75) 0%, rgba(168,85,247,0.75) 100%);transition:all .2s;box-shadow:0 4px 14px rgba(168,85,247,0.20);" onmouseover="this.style.background='linear-gradient(135deg, rgba(236,72,153,0.9) 0%, rgba(168,85,247,0.9) 100%)';this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 18px rgba(168,85,247,0.28)'" onmouseout="this.style.background='linear-gradient(135deg, rgba(236,72,153,0.75) 0%, rgba(168,85,247,0.75) 100%)';this.style.transform='translateY(0)';this.style.boxShadow='0 4px 14px rgba(168,85,247,0.20)'">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fff" stroke-width="1.6"/><path d="M12 8v1M12 11v5" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>
      Take the Reality Check Quiz
    </a>
  </div>
</div>

<!-- ══ FOOTER ══ -->
<footer class="site-footer">
  <div class="ft-brand">Nailtechcareerreadiness.com · The Nail Tech Success Blueprint</div>
  <div class="ft-links">
    <a href="REPLACE_WITH_CONTACT_URL">Contact</a>
    <a href="REPLACE_WITH_PRIVACY_URL">Privacy</a>
    <a href="REPLACE_WITH_TERMS_URL">Terms</a>
    <a href="REPLACE_WITH_REFUND_URL">Refund Policy</a>
  </div>
  <div class="ft-copy">© 2026 Nailtechcareerreadiness.com. All rights reserved. This guide is for educational purposes; individual results vary.</div>
</footer>`;

export default function RealityBreakdownContent({
  onBack,
  onTakeQuiz,
}: RealityBreakdownContentProps) {
  function handleContentClick(event: MouseEvent<HTMLDivElement>) {
    const clickedLink = (event.target as HTMLElement).closest("a");

    if (!clickedLink) return;

    const href = clickedLink.getAttribute("href");

    if (!href) return;

    if (href === "https://nail-tech-career-fit-uy8n.bolt.host") {
      event.preventDefault();
      if (onTakeQuiz) {
        onTakeQuiz();
      } else if (onBack) {
        onBack();
      }
      return;
    }

    if (href.startsWith("REPLACE_WITH_")) {
      event.preventDefault();
      return;
    }
  }

  return (
    <>
      <style>{REALITY_BREAKDOWN_CSS}</style>

      <div className="reality-breakdown-content-page" onClick={handleContentClick}>
        {onBack && (
  <button
    type="button"
    onClick={onBack}
    className="reality-back-button"
  >
    ← Back
  </button>
)}

        <div dangerouslySetInnerHTML={{ __html: REALITY_BREAKDOWN_HTML }} />
      </div>
    </>
  );
}
