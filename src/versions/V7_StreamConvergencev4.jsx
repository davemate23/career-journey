import React, { useState } from 'react';

// ─── Stream definitions ─────────────────────────────────────────
const streams = [
  {
    id: 'systems',
    label: 'Systems & causal reasoning',
    short: 'Systems',
    color: '#7c5cbf',
    startYear: 2006,
    startY: 52,
    markerShape: 'circle',
  },
  {
    id: 'command',
    label: 'Command & operational leadership',
    short: 'Command',
    color: '#c27a3d',
    startYear: 2009,
    startY: 148,
    markerShape: 'square',
  },
  {
    id: 'intelligence',
    label: 'Intelligence & foresight',
    short: 'Intelligence',
    color: '#1a6b94',
    startYear: 2012,
    startY: 268,
    markerShape: 'triangle',
  },
  {
    id: 'frontier',
    label: 'Emerging technology & innovation',
    short: 'Emerging Tech',
    color: '#2a8f7a',
    startYear: 2017,
    startY: 355,
    markerShape: 'diamond',
  },
];

const streamMap = Object.fromEntries(streams.map((s) => [s.id, s]));

// ─── Sector bands ───────────────────────────────────────────────
const sectorBands = [
  { id: 'defence',    label: 'Defence',   start: 2009,   end: 2017,   color: '#475569' },
  { id: 'biopharma1', label: 'Biopharma', start: 2017,   end: 2018.2, color: '#7c3aed' },
  { id: 'health',     label: 'Health',    start: 2018.2, end: 2020,   color: '#059669' },
  { id: 'banking',    label: 'Banking',   start: 2020,   end: 2025,   color: '#dc2626' },
  { id: 'biopharma2', label: 'Biopharma', start: 2025,   end: 2026.4, color: '#7c3aed' },
];

const sectorColor = {
  Defence:   '#64748b',
  Biopharma: '#8b5cf6',
  Health:    '#10b981',
  Banking:   '#e11d48',
};

// ─── Career milestones ──────────────────────────────────────────
const milestones = [
  {
    id: 'army-platoon',
    years: '2010–2011',
    markerYear: 2010.5,
    org: 'British Army',
    sector: 'Defence',
    title: 'Platoon Commander — 50 soldiers, operational readiness',
    shift: 'First command: accountable for 50 soldiers, equipment, welfare, and operational output. The beginning of practical decision-making under real consequence.',
    proofs: [
      'Direct responsibility for vehicle maintenance, repair and operational readiness',
      'Managed personnel careers, welfare and training across trade and military skills',
    ],
    primaryStream: 'command',
    activeStreams: ['command'],
    label: 'Platoon Cmdr',
    labelBelow: false,
  },
  {
    id: 'army-intel',
    years: '2012',
    markerYear: 2012.3,
    org: 'British Army',
    sector: 'Defence',
    title: 'Intelligence & Security Officer — Northern Ireland',
    shift: 'Command and control of security forces across the Province — directing high-threat response, running intelligence analysis, and coordinating with PSNI and external agencies in a live operational environment.',
    proofs: [
      'First-line tasking of teams to high-threat incidents and searches Province-wide',
      'Intelligence analysis, inter-agency liaison and real-time threat assessment',
    ],
    primaryStream: 'intelligence',
    activeStreams: ['command', 'intelligence'],
    label: 'NI Intelligence',
    labelBelow: true,
  },
  {
    id: 'army-dseme',
    years: '2013–2014',
    markerYear: 2013.5,
    org: 'British Army',
    sector: 'Defence',
    title: 'Operations Manager — Defence School of Engineering',
    shift: 'Led organisational change at scale: a 5,000-person relocation, the merger of two training schools, and the redesign of career pipelines — while maintaining operational output and passing all assurance audits.',
    proofs: [
      'Managed the 5,000-person move from Berkshire to Wiltshire, maintaining continuity throughout',
      'Merged two career training pipelines, reducing training times and costs significantly',
      'Lead consultant on OFSTED and MOD assurance, passing all audits',
    ],
    primaryStream: 'command',
    activeStreams: ['command', 'systems'],
    label: 'DSEME Ops',
    labelBelow: false,
  },
  {
    id: 'army-head-eng',
    years: '2014–2017',
    markerYear: 2015.8,
    org: 'British Army',
    sector: 'Defence',
    title: 'Head of Engineering — 1 Regiment RLC (incl. Afghanistan)',
    shift: 'Engineering authority for a 600-person organisation: 54 direct reports, 120+ vehicles, 600 weapon systems, and the Afghanistan drawdown of 2,500 vehicles returned operational under extreme tempo. Applied lean and systems thinking to achieve the highest equipment availability in the region.',
    proofs: [
      'Led Afghanistan equipment drawdown: 2,500 vehicles at extreme operational tempo',
      'Managed engineering relocation from Germany to Oxfordshire with minimal operational impact',
      'Achieved highest equipment availability levels in the region through lean process redesign',
    ],
    primaryStream: 'command',
    activeStreams: ['command', 'systems'],
    label: 'Head of Eng',
    labelBelow: true,
  },
  {
    id: 'astra',
    years: '2017–2018',
    markerYear: 2017.6,
    org: 'AstraZeneca',
    sector: 'Biopharma',
    title: 'Genomics Programme Manager — global R&D',
    shift: 'First major cross-sector transfer: applied military operational discipline to a $30m genomics initiative spanning four continents, managing senior stakeholders, international partners, and a complex science delivery pipeline.',
    proofs: [
      'Orchestrated portfolio across four continents and multiple therapeutic areas',
      'Negotiated $350k in annual supplier savings while improving contract efficiency',
      'Delivered on time and within budget across mixed agile/waterfall methodologies',
    ],
    primaryStream: 'frontier',
    activeStreams: ['command', 'frontier'],
    label: 'AstraZeneca',
    labelBelow: true,
  },
  {
    id: 'hie',
    years: '2018–2020',
    markerYear: 2019,
    org: 'Health Innovation East',
    sector: 'Health',
    title: 'Innovation strategy, funding & AI governance in healthcare',
    shift: 'Broadened from programme delivery into innovation ecosystem leadership — securing £5.4m in funding, establishing AI governance frameworks, and translating emerging technology into NHS adoption.',
    proofs: [
      'First implementation of pharmacogenetics in NHS primary care prescribing',
      'First use of AI and predictive analytics on real patient data for rare disease diagnosis',
      'Authored commercial strategy generating £3m in projected new income streams',
    ],
    primaryStream: 'frontier',
    activeStreams: ['frontier', 'intelligence'],
    label: 'Health Innovation',
    labelBelow: true,
  },
  {
    id: 'santander-ai',
    years: '2020–2022',
    markerYear: 2021,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Enterprise data & AI platform leadership',
    shift: "Shifted from leading programmes to building reusable enterprise capability — AutoML, data mastering, RPA — giving 20,000 people analytical tools they didn't have before.",
    proofs: [
      'Improved data linkage quality from 83% to 98% across the ring-fenced bank',
      'Deployed RPA reducing manual work by 600 hours annually, cutting errors by 20%',
      'Led ML-based pricing optimisation generating bespoke rates for every customer',
    ],
    primaryStream: 'frontier',
    activeStreams: ['frontier', 'systems'],
    label: 'Data & AI',
    labelBelow: true,
  },
  {
    id: 'santander-fc',
    years: '2022–2023',
    markerYear: 2022.4,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Financial crime customer 360',
    shift: 'Applied data capability to a high-consequence domain: turned fragmented customer data into £3.5m in immediate savings and a single-view intelligence layer for financial crime detection across the ring-fenced bank.',
    proofs: [
      'Improved financial crime detection accuracy by 15%',
      'Reduced false positives by 10%, improving customer experience and compliance',
    ],
    primaryStream: 'systems',
    activeStreams: ['systems', 'intelligence'],
    label: 'FinCrime 360',
    labelBelow: false,
  },
  {
    id: 'santander-res',
    years: '2023–2025',
    markerYear: 2023.8,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Operational resilience intelligence',
    shift: 'Built the intelligence function from scratch — OSINT, causal risk models, GenAI-powered analysis — that turned risk from reactive reporting into anticipatory, decision-ready intelligence for senior leadership.',
    proofs: [
      'Reduced time to risk mitigation by 30% through enterprise-wide threat intelligence',
      'Built causal model for predicting systemic risks using Bayesian inference',
      'Deployed GenAI-driven intelligence summaries for emerging risk monitoring',
      'Created executive dashboards providing visibility into change risk across the bank',
    ],
    primaryStream: 'intelligence',
    activeStreams: ['intelligence', 'systems', 'frontier'],
    label: 'Resilience Intel',
    labelBelow: false,
  },
  {
    id: 'gsk',
    years: '2025–present',
    markerYear: 2025.4,
    org: 'GSK',
    sector: 'Biopharma',
    title: 'Director, Risk Management — R&D',
    shift: 'The current synthesis point: leading risk strategy across AI/ML, epidemiology, and development science in a global R&D environment — applying causal reasoning, anticipatory frameworks, and governance to complex scientific decision-making.',
    proofs: [
      'Risk leadership across AI/ML, Development Science, and Epidemiology functions',
      'Embedding anticipatory and intelligence-led risk frameworks in Development Science',
    ],
    primaryStream: 'frontier',
    activeStreams: ['intelligence', 'systems', 'frontier', 'command'],
    isCurrent: true,
    label: 'R&D Risk Leadership',
    labelBelow: true,
  },
];

// ─── Education milestones ───────────────────────────────────────
const education = [
  { id: 'beng',      year: 2007,   label: 'BEng Mech Eng',       institution: 'Nottingham',    stream: 'systems' },
  { id: 'sandhurst', year: 2009.5, label: 'Sandhurst',            institution: 'RMAS',          stream: 'command' },
  { id: 'msc',       year: 2014,   label: 'MSc Info Capability',  institution: 'Cranfield',     stream: 'systems' },
  { id: 'bsc',       year: 2016.2, label: 'BSc Intel & Security', institution: 'Staffordshire', stream: 'intelligence' },
  { id: 'mba',       year: 2020.5, label: 'MBA (Distinction)',    institution: 'Warwick',       stream: 'systems' },
];

const qualChips = [
  'Chartered Manager · CMI',
  'Incorporated Engineer',
  'Afghanistan Operational Service Medal',
];

// ─── SVG layout ─────────────────────────────────────────────────
// V6.4: Convergence happens at the "Now" line. Streams converge there,
// then a single merged river continues rightward into the horizon zone.
const SVG_W         = 1100;
const SVG_H         = 440;
const PLOT_LEFT     = 56;
const CONVERGE_X    = 880;    // streams converge here = "Now" threshold
const HORIZON_RIGHT = 1080;
const YEAR_START    = 2006;
const YEAR_END      = 2026.4;
const CONVERGENCE_Y = 210;
const TICK_YEARS    = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
const EDU_BASELINE  = 412;

// Maps years into the plot area (left edge to convergence point)
const yearToX = (year) =>
  PLOT_LEFT + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * (CONVERGE_X - PLOT_LEFT);

const streamYAt = (stream, year) => {
  const t     = Math.max(0, Math.min(1, (year - YEAR_START) / (YEAR_END - YEAR_START)));
  const eased = t * t;
  return stream.startY + (CONVERGENCE_Y - stream.startY) * eased;
};

const buildStreamPath = (stream) => {
  const from  = Math.max(stream.startYear, YEAR_START);
  const steps = 140;
  const pts   = [];
  for (let i = 0; i <= steps; i++) {
    const yr = from + ((YEAR_END - from) * i) / steps;
    pts.push(`${yearToX(yr).toFixed(1)},${streamYAt(stream, yr).toFixed(1)}`);
  }
  return `M ${pts[0]} ${pts.slice(1).map((p) => `L ${p}`).join(' ')}`;
};

const getMilestonePos = (m) => {
  const s = streamMap[m.primaryStream];
  return { x: yearToX(m.markerYear), y: streamYAt(s, m.markerYear) };
};

const buildJourneyPath = () => {
  const sorted = [...milestones].sort((a, b) => a.markerYear - b.markerYear);
  const points = sorted.map((m) => getMilestonePos(m));
  if (points.length < 2) return '';
  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1], c = points[i];
    const cx1 = p.x + (c.x - p.x) * 0.5;
    const cx2 = p.x + (c.x - p.x) * 0.5;
    d += ` C ${cx1.toFixed(1)},${p.y.toFixed(1)} ${cx2.toFixed(1)},${c.y.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}`;
  }
  return d;
};

// ─── Accessibility: stream shape markers ────────────────────────
const getStreamMarkerPositions = (stream) => {
  const positions = [];
  const from = Math.max(stream.startYear, YEAR_START) + 1.5;
  for (let yr = from; yr < YEAR_END - 0.8; yr += 3) {
    const tooClose = milestones.some((m) => Math.abs(m.markerYear - yr) < 0.6);
    if (!tooClose) positions.push({ x: yearToX(yr), y: streamYAt(stream, yr) });
  }
  return positions;
};

const StreamMarker = ({ x, y, shape, color, opacity }) => {
  const s = 3.2;
  switch (shape) {
    case 'circle':
      return <circle cx={x} cy={y} r={s} fill={color} opacity={opacity} />;
    case 'square':
      return <rect x={x - s} y={y - s} width={s * 2} height={s * 2} fill={color} opacity={opacity} />;
    case 'triangle':
      return <polygon points={`${x},${y - s - 0.5} ${x - s - 0.5},${y + s} ${x + s + 0.5},${y + s}`} fill={color} opacity={opacity} />;
    case 'diamond':
      return <rect x={x - s} y={y - s} width={s * 2} height={s * 2} fill={color} opacity={opacity} transform={`rotate(45, ${x}, ${y})`} />;
    default:
      return null;
  }
};

// ─── Sub-components ─────────────────────────────────────────────
const StreamLegendItem = ({ stream, isActive }) => (
  <div className="flex items-center gap-2 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.35 }}>
    <span className="inline-block h-2 w-8 rounded-full" style={{ backgroundColor: stream.color }} />
    <span style={{ fontSize: 11, fontWeight: 600, color: isActive ? '#334155' : '#94a3b8', letterSpacing: '0.03em' }}>
      {stream.label}
    </span>
  </div>
);

const ProofPoint = ({ text }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: '#94a3b8' }} />
    <span className="text-sm leading-relaxed" style={{ color: '#475569' }}>{text}</span>
  </div>
);

// ─── Main component ─────────────────────────────────────────────
export default function CareerJourneyV6() {
  const [selectedId, setSelectedId] = useState('gsk');
  const active      = milestones.find((m) => m.id === selectedId) || milestones[milestones.length - 1];
  const journeyPath = buildJourneyPath();

  // Horizon zone geometry
  const riverStartX = CONVERGE_X + 8;
  const riverEndX   = HORIZON_RIGHT - 10;
  const riverMidX   = riverStartX + (riverEndX - riverStartX) * 0.42;

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: '#faf9f7', color: '#1e293b', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes drawStream   { from { stroke-dashoffset: 2400; } to { stroke-dashoffset: 0; } }
        @keyframes drawJourney  { from { stroke-dashoffset: 3000; } to { stroke-dashoffset: 0; } }
        @keyframes fadeUp       { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes softPulse    { 0%, 100% { opacity: 0.12; } 50% { opacity: 0.28; } }
        @keyframes mergeReveal  { from { opacity: 0; } to { opacity: 1; } }
        .stream-line  { stroke-dasharray: 2400; animation: drawStream 2.2s cubic-bezier(0.4,0,0.2,1) forwards; }
        .journey-line { stroke-dasharray: 3000; animation: drawJourney 2.8s cubic-bezier(0.4,0,0.2,1) 0.5s forwards; stroke-dashoffset: 3000; }
        .dot-enter    { animation: fadeUp 0.4s ease both; }
        .soft-pulse   { animation: softPulse 3s ease-in-out infinite; }
        .merge-reveal { animation: mergeReveal 0.8s ease 2.2s both; }
      `}</style>

      {/* ── Hero ────────────────────────────────────────────── */}
      <header className="mx-auto max-w-5xl px-6 pt-14 pb-8">
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 14 }}>
          David Carter · Career trajectory
        </p>
        <h1 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)', fontWeight: 400, lineHeight: 1.28, color: '#0f172a', maxWidth: 700 }}>
          How do you make better decisions when the future is too complex to predict?
        </h1>
        <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.75, color: '#64748b', maxWidth: 600 }}>
          A career built across defence, biopharma, healthcare, and banking — four streams of experience converging into a more integrated discipline.
        </p>
      </header>

      {/* ── Stream legend ──────────────────────────────────── */}
      <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-6 pb-5">
        {streams.map((s) => (
          <StreamLegendItem key={s.id} stream={s} isActive={active.activeStreams.includes(s.id)} />
        ))}
      </div>

      {/* ── Convergence diagram ────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ overflow: 'visible' }}>
          <defs>
            {/* Horizon zone background */}
            <linearGradient id="horizonFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#7c5cbf" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#7c5cbf" stopOpacity="0" />
            </linearGradient>
            {/* Threshold vertical line */}
            <linearGradient id="thresholdLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.04" />
              <stop offset="40%"  stopColor="#94a3b8" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.04" />
            </linearGradient>
            {/*
              V6.4 FIX: Use userSpaceOnUse for the river gradient.
              objectBoundingBox (default) fails on horizontal lines
              because the bounding box has zero height.
            */}
            <linearGradient
              id="mergedRiver"
              gradientUnits="userSpaceOnUse"
              x1={String(riverStartX)} y1="0"
              x2={String(riverEndX)}   y2="0"
            >
              <stop offset="0%"   stopColor="#334155" stopOpacity="0.9"  />
              <stop offset="50%"  stopColor="#475569" stopOpacity="0.5"  />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.1"  />
            </linearGradient>
          </defs>

          {/* Sector bands */}
          {sectorBands.map((band) => {
            const bx = yearToX(band.start);
            const bw = yearToX(band.end) - bx;
            return (
              <g key={band.id}>
                <rect x={bx} y={6} width={bw} height={SVG_H - 48} rx={5} fill={band.color} opacity={0.05} />
                <text x={bx + bw / 2} y={SVG_H - 40} textAnchor="middle" fill={band.color} opacity={0.45} fontSize={9.5} fontWeight={700} fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.1em">
                  {band.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Year axis */}
          {TICK_YEARS.map((yr) => {
            const tx = yearToX(yr);
            return (
              <g key={yr}>
                <line x1={tx} y1={SVG_H - 30} x2={tx} y2={SVG_H - 22} stroke="#cbd5e1" strokeWidth={1.2} />
                <text x={tx} y={SVG_H - 8} textAnchor="middle" fill="#94a3b8" fontSize={10.5} fontWeight={600} fontFamily="'Plus Jakarta Sans', sans-serif">
                  {yr === 2026 ? 'Now' : yr}
                </text>
                <line x1={tx} y1={12} x2={tx} y2={SVG_H - 34} stroke="#e2e8f0" strokeWidth={0.5} />
              </g>
            );
          })}

          {/* Stream paths */}
          {streams.map((stream, i) => {
            const isActive = active.activeStreams.includes(stream.id);
            return (
              <path
                key={stream.id}
                d={buildStreamPath(stream)}
                fill="none"
                stroke={stream.color}
                strokeWidth={isActive ? 3 : 1.5}
                strokeLinecap="round"
                opacity={isActive ? 0.7 : 0.12}
                className="stream-line"
                style={{ animationDelay: `${i * 0.15}s`, transition: 'opacity 0.4s, stroke-width 0.4s' }}
              />
            );
          })}

          {/* Accessibility: shape markers */}
          {streams.map((stream) => {
            const isActive = active.activeStreams.includes(stream.id);
            return getStreamMarkerPositions(stream).map((pos, j) => (
              <StreamMarker
                key={`${stream.id}-m${j}`}
                x={pos.x} y={pos.y}
                shape={stream.markerShape}
                color={stream.color}
                opacity={isActive ? 0.4 : 0.1}
              />
            ));
          })}

          {/* Journey path */}
          <path d={journeyPath} fill="none" stroke="#1e293b" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="4 6" opacity={0.25} className="journey-line" />

          {/* ── Horizon zone ─────────────────────────────────
               V6.4: River rendered as a <rect> (not <line>) to
               avoid zero-height bounding box gradient bug.
               Convergence point = CONVERGE_X (880), giving the
               horizon zone 200px of clear space.
          ─────────────────────────────────────────────────── */}

          {/* Horizon wash */}
          <rect
            x={CONVERGE_X} y={12}
            width={HORIZON_RIGHT - CONVERGE_X + 10} height={SVG_H - 50}
            rx={4} fill="url(#horizonFill)"
            className="merge-reveal"
          />

          {/* Threshold vertical */}
          <line
            x1={CONVERGE_X} y1={16}
            x2={CONVERGE_X} y2={SVG_H - 38}
            stroke="url(#thresholdLine)"
            strokeWidth={1.5} strokeDasharray="5 4"
            className="merge-reveal"
          />

          {/* Merge junction */}
          <circle
            cx={CONVERGE_X} cy={CONVERGENCE_Y}
            r={6} fill="#334155" stroke="#faf9f7" strokeWidth={2}
            className="merge-reveal"
          />

          {/*
            V6.5: Tapered river path — starts wide at junction,
            narrows as it fades forward. More organic than a flat rect.
          */}
          <path
            d={`
              M ${riverStartX},${CONVERGENCE_Y - 3.5}
              L ${riverEndX},${CONVERGENCE_Y - 1}
              L ${riverEndX},${CONVERGENCE_Y + 1}
              L ${riverStartX},${CONVERGENCE_Y + 3.5}
              Z
            `}
            fill="url(#mergedRiver)"
            className="merge-reveal"
          />

          {/* Refined chevron arrowhead — open, lighter, more editorial */}
          <path
            d={`
              M ${riverEndX + 2},${CONVERGENCE_Y - 8}
              L ${riverEndX + 14},${CONVERGENCE_Y}
              L ${riverEndX + 2},${CONVERGENCE_Y + 8}
            `}
            fill="none"
            stroke="#475569"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.35}
            className="merge-reveal"
          />

          {/* Label — above river with clearance */}
          <text
            x={riverMidX} y={CONVERGENCE_Y - 46}
            textAnchor="middle"
            fill="#334155" opacity={0.85}
            fontSize={9} fontWeight={700}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            letterSpacing="0.12em"
            className="merge-reveal"
          >
            INTELLIGENCE-LED
          </text>
          <text
            x={riverMidX} y={CONVERGENCE_Y - 33}
            textAnchor="middle"
            fill="#334155" opacity={0.85}
            fontSize={9} fontWeight={700}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            letterSpacing="0.12em"
            className="merge-reveal"
          >
            DECISION-MAKING
          </text>

          {/* Subtitle */}
          <text
            x={riverMidX} y={CONVERGENCE_Y - 20}
            textAnchor="middle"
            fill="#64748b" opacity={0.8}
            fontSize={7.5} fontWeight={500}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontStyle="italic"
            className="merge-reveal"
          >
            an emerging discipline in formation
          </text>

          {/* Cross-stream connectors */}
          {active.activeStreams
            .filter((sid) => sid !== active.primaryStream)
            .map((sid) => {
              const pos     = getMilestonePos(active);
              const targetY = streamYAt(streamMap[sid], active.markerYear);
              return (
                <line
                  key={`conn-${sid}`}
                  x1={pos.x} y1={pos.y} x2={pos.x} y2={targetY}
                  stroke={streamMap[sid].color} strokeWidth={1} strokeDasharray="2 4" opacity={0.3}
                  style={{ transition: 'all 0.4s' }}
                />
              );
            })}

          {/* Education markers */}
          {education.map((ed) => {
            const sx = yearToX(ed.year);
            const stream = streamMap[ed.stream];
            const sy = streamYAt(stream, ed.year);
            return (
              <g key={ed.id} className="dot-enter" style={{ animationDelay: '1.2s' }}>
                <line x1={sx} y1={sy + 6} x2={sx} y2={EDU_BASELINE - 18} stroke="#cbd5e1" strokeWidth={0.7} strokeDasharray="2 3" />
                <rect x={sx - 3.5} y={sy - 3.5} width={7} height={7} rx={1.5} fill="#faf9f7" stroke={stream.color} strokeWidth={1.5} transform={`rotate(45, ${sx}, ${sy})`} />
                <text x={sx} y={EDU_BASELINE - 6} textAnchor="middle" fill="#94a3b8" fontSize={8.5} fontWeight={600} fontFamily="'Plus Jakarta Sans', sans-serif">
                  {ed.label}
                </text>
                <text x={sx} y={EDU_BASELINE + 5} textAnchor="middle" fill="#cbd5e1" fontSize={7.5} fontWeight={500} fontFamily="'Plus Jakarta Sans', sans-serif">
                  {ed.institution}
                </text>
              </g>
            );
          })}

          {/* Career milestone markers */}
          {milestones.map((milestone, i) => {
            const pos        = getMilestonePos(milestone);
            const isSelected = milestone.id === selectedId;
            const stream     = streamMap[milestone.primaryStream];
            const labelY     = milestone.labelBelow ? pos.y + 20 : pos.y - 14;
            return (
              <g
                key={milestone.id}
                onClick={() => setSelectedId(milestone.id)}
                style={{ cursor: 'pointer' }}
                className="dot-enter"
                role="button"
                tabIndex={0}
                aria-label={`Select ${milestone.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(milestone.id); } }}
              >
                <circle cx={pos.x} cy={pos.y} r={16} fill="transparent" />
                {isSelected && <circle cx={pos.x} cy={pos.y} r={14} fill={stream.color} opacity={0.1} className="soft-pulse" />}
                <circle
                  cx={pos.x} cy={pos.y}
                  r={isSelected ? 7 : milestone.isCurrent ? 6 : 4}
                  fill={isSelected ? stream.color : '#faf9f7'}
                  stroke={stream.color} strokeWidth={isSelected ? 2.5 : 1.8}
                  style={{ transition: 'all 0.3s', animationDelay: `${0.6 + i * 0.08}s` }}
                />
                <text
                  x={pos.x} y={labelY} textAnchor="middle"
                  fill={isSelected ? '#0f172a' : '#94a3b8'}
                  fontSize={isSelected ? 10 : 9}
                  fontWeight={isSelected ? 700 : 500}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  style={{ transition: 'all 0.3s' }}
                >
                  {milestone.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Detail panel ───────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-6" style={{ minHeight: 180 }}>
        <div
          key={active.id}
          className="rounded-xl border px-6 py-5"
          style={{ borderColor: `${streamMap[active.primaryStream].color}25`, background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', animation: 'fadeUp 0.3s ease both' }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ color: sectorColor[active.sector] || '#64748b', background: `${sectorColor[active.sector] || '#64748b'}10` }}>
              {active.org}
            </span>
            <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>{active.years}</span>
            {active.isCurrent && <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ color: '#92400e', background: '#fef3c7' }}>Current role</span>}
            <div className="ml-auto flex flex-wrap gap-2">
              {active.activeStreams.map((sid) => (
                <span key={sid} className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: streamMap[sid].color, background: `${streamMap[sid].color}0d` }}>
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: streamMap[sid].color }} />
                  {streamMap[sid].short}
                </span>
              ))}
            </div>
          </div>
          <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)', fontWeight: 700, color: '#0f172a', lineHeight: 1.35, marginBottom: 10 }}>
            {active.title}
          </h3>
          <p className="mb-4" style={{ fontSize: 15, lineHeight: 1.75, color: '#64748b' }}>{active.shift}</p>
          <div className="flex flex-col gap-2">
            {active.proofs.map((proof, i) => <ProofPoint key={i} text={proof} />)}
          </div>
        </div>
      </div>

      {/* ── Closing statement ──────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-xl border px-8 py-8" style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: 14 }}>
            An emerging discipline
          </p>
          <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 'clamp(0.95rem, 2.1vw, 1.15rem)', fontWeight: 700, lineHeight: 1.65, color: '#1e293b', marginBottom: 20 }}>
            Intelligence-led decision-making — built on causal reasoning, anticipatory analytics, and systems thinking — is becoming the defining capability of organisations that lead, rather than react.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: '#64748b', marginBottom: 14 }}>
            Most organisations still treat risk management, intelligence, and data capability as separate functions. The emerging frontier is their integration: building the causal decision infrastructure that lets organisations see further, reason more rigorously, and act with greater confidence under uncertainty. This is not a mature discipline with established playbooks — it is being constructed, now, in the organisations willing to invest in it.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: '#64748b', marginBottom: 14 }}>
            The through-line of this career has been the steady accumulation of capabilities needed for exactly that work. Command decisions at operational tempo. Intelligence operations that turned raw signal into foresight. Data platforms that embedded analytical capability at scale. Causal models that moved risk from reporting to anticipation. Each chapter added a layer; the convergence is the point at which those layers become something more than their parts.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: '#475569', fontWeight: 600 }}>
            The next chapter is about leading at the edge of where this discipline is being built — in the functions, organisations, and teams working to make decision-making more intelligent, anticipatory, and operationally grounded.
          </p>
        </div>
      </section>

      {/* ── Qualifications footer ──────────────────────────── */}
      <footer className="mx-auto max-w-5xl px-6 pt-2 pb-14">
        <div className="flex flex-wrap justify-center gap-2">
          {qualChips.map((chip) => (
            <span key={chip} className="rounded-full border px-3 py-1.5" style={{ borderColor: '#e2e8f0', fontSize: 11, fontWeight: 500, color: '#94a3b8' }}>
              {chip}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
