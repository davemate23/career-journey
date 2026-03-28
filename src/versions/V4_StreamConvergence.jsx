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
  },
  {
    id: 'command',
    label: 'Command & operational leadership',
    short: 'Command',
    color: '#c27a3d',
    startYear: 2009,
    startY: 152,
  },
  {
    id: 'intelligence',
    label: 'Intelligence & foresight',
    short: 'Intelligence',
    color: '#2d7da8',
    startYear: 2012,
    startY: 272,
  },
  {
    id: 'frontier',
    label: 'Frontier technology & innovation',
    short: 'Frontier',
    color: '#2a8f7a',
    startYear: 2017,
    startY: 362,
  },
];

const streamMap = Object.fromEntries(streams.map((s) => [s.id, s]));

// ─── Sector bands ───────────────────────────────────────────────
const sectorBands = [
  { id: 'defence', label: 'Defence', start: 2009, end: 2017, color: '#475569' },
  { id: 'biopharma1', label: 'Biopharma', start: 2017, end: 2018, color: '#7c3aed' },
  { id: 'health', label: 'Health innovation', start: 2018, end: 2020, color: '#059669' },
  { id: 'banking', label: 'Banking', start: 2020, end: 2025, color: '#dc2626' },
  { id: 'biopharma2', label: 'Biopharma', start: 2025, end: 2026.3, color: '#7c3aed' },
];

const sectorColor = {
  Defence: '#64748b',
  Biopharma: '#8b5cf6',
  'Health innovation': '#10b981',
  Banking: '#e11d48',
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
    shift:
      'First command appointment: direct responsibility for 50 soldiers, fleet maintenance, welfare, and trade and military training.',
    proofs: [
      'Responsible for vehicle maintenance, repair and modification across the unit',
      'Managed careers, welfare and operational readiness of all personnel',
    ],
    primaryStream: 'command',
    activeStreams: ['command'],
    label: 'Platoon Cmdr',
  },
  {
    id: 'army-intel',
    years: '2012',
    markerYear: 2012.3,
    org: 'British Army',
    sector: 'Defence',
    title: 'Intelligence & Security Officer — Northern Ireland',
    shift:
      'First-line command and control of security forces across the Province, directing high-threat incident response and intelligence analysis.',
    proofs: [
      'Tasked teams to high-threat and high-risk incidents and searches Province-wide',
      'Intelligence analysis and liaison with internal and external agencies',
    ],
    primaryStream: 'intelligence',
    activeStreams: ['command', 'intelligence'],
    label: 'NI Intelligence',
  },
  {
    id: 'army-afghan',
    years: '2014',
    markerYear: 2014.5,
    org: 'British Army',
    sector: 'Defence',
    title: 'Engineering Manager — Afghanistan (Camp Bastion)',
    shift:
      'Led the engineering drawdown from Afghanistan — 2,500 vehicles returned to operational condition under extreme tempo.',
    proofs: [
      'Oversaw maintenance, repair and redeployment of 250+ vehicles within Camp Bastion',
      'Reported directly to HQ Joint Force Support on equipment support matters',
    ],
    primaryStream: 'command',
    activeStreams: ['command', 'systems'],
    label: 'Afghanistan',
  },
  {
    id: 'army-head-eng',
    years: '2014–2016',
    markerYear: 2015.5,
    org: 'British Army',
    sector: 'Defence',
    title: 'Head of Engineering — 1 Regiment RLC',
    shift:
      'Subject matter expert and engineering lead for a 600-person organisation, managing 120 vehicles, 600 weapon systems, and 54 direct reports across two countries.',
    proofs: [
      'Achieved highest equipment availability levels in the region',
      'Managed relocation of engineering workshop from Germany to Oxfordshire',
      'Designed production processes using lean and continuous improvement methods',
    ],
    primaryStream: 'command',
    activeStreams: ['command', 'systems'],
    label: 'Head of Eng',
  },
  {
    id: 'astra',
    years: '2017–2018',
    markerYear: 2017.6,
    org: 'AstraZeneca',
    sector: 'Biopharma',
    title: 'Genomics Programme Manager — global R&D',
    shift:
      'Transferred operational discipline into a $30m cross-continental genomics initiative, negotiating $350k in supplier savings.',
    proofs: [
      'Orchestrated portfolio spanning four continents and multiple therapeutic areas',
      'Directed pipeline from biological samples to data across organisations and continents',
      'Delivered on time and within budget across mixed agile/waterfall methodologies',
    ],
    primaryStream: 'frontier',
    activeStreams: ['command', 'frontier'],
    label: 'AstraZeneca',
  },
  {
    id: 'hie',
    years: '2018–2020',
    markerYear: 2019,
    org: 'Health Innovation East',
    sector: 'Health innovation',
    title: 'Innovation, funding & AI governance in healthcare',
    shift:
      'Brought AI governance, innovation strategy, and £5.4m in funding to the NHS and emerging health technology.',
    proofs: [
      'First implementation of pharmacogenetics in NHS primary care',
      'First use of AI on real patient data for earlier rare disease diagnosis',
      'Created commercial strategy generating £3m in projected new income',
    ],
    primaryStream: 'frontier',
    activeStreams: ['frontier', 'intelligence'],
    label: 'Health Innovation',
  },
  {
    id: 'santander-ai',
    years: '2020–2022',
    markerYear: 2021,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Enterprise data & AI platform leadership',
    shift:
      "Built the data and AI platforms — AutoML, data mastering, RPA — that gave 20,000 people analytical capability they didn't have.",
    proofs: [
      'Improved data linkage quality from 83% to 98%',
      'Deployed RPA reducing manual work by 600 hours annually',
      'Led ML-based pricing optimisation generating bespoke rates for every customer',
    ],
    primaryStream: 'frontier',
    activeStreams: ['frontier', 'systems'],
    label: 'Data & AI',
  },
  {
    id: 'santander-fc',
    years: '2022–2023',
    markerYear: 2022.4,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Financial crime customer 360',
    shift:
      'Turned fragmented customer data into £3.5m in immediate savings and a single-view intelligence layer for financial crime detection.',
    proofs: [
      'Improved financial crime detection accuracy by 15%',
      'Reduced false positives by 10%, improving customer experience and compliance',
    ],
    primaryStream: 'systems',
    activeStreams: ['systems', 'intelligence'],
    label: 'FinCrime 360',
  },
  {
    id: 'santander-res',
    years: '2023–2025',
    markerYear: 2023.8,
    org: 'Santander UK',
    sector: 'Banking',
    title: 'Operational resilience intelligence',
    shift:
      'Created the intelligence products — OSINT, causal risk models, GenAI-powered analysis — that turned risk from reactive to anticipatory.',
    proofs: [
      'Reduced time to risk mitigation by 30% through enterprise threat intelligence',
      'Built causal model for predicting systemic risks using Bayesian methods',
      'Deployed GenAI-driven intelligence summaries for emerging risk monitoring',
    ],
    primaryStream: 'intelligence',
    activeStreams: ['intelligence', 'systems', 'frontier'],
    label: 'Resilience Intel',
  },
  {
    id: 'gsk',
    years: '2025–present',
    markerYear: 2025.5,
    org: 'GSK',
    sector: 'Biopharma',
    title: 'Director, Risk Management — R&D',
    shift:
      'Now applying the full convergence: AI/ML governance, epidemiology oversight, causal reasoning, and proactive risk leadership in a complex R&D environment.',
    proofs: [
      'Leading risk strategy across AI/ML, Development Science, and Epidemiology',
      'Embedding anticipatory risk frameworks in Development Science',
    ],
    primaryStream: 'command',
    activeStreams: ['command', 'intelligence', 'systems', 'frontier'],
    isCurrent: true,
    label: 'GSK',
  },
];

// ─── Education milestones ───────────────────────────────────────
const education = [
  { id: 'beng', year: 2007, label: 'BEng Mech Eng', institution: 'Nottingham', stream: 'systems' },
  { id: 'sandhurst', year: 2009.5, label: 'Sandhurst', institution: 'RMAS', stream: 'command' },
  { id: 'msc', year: 2013.5, label: 'MSc Info Capability', institution: 'Cranfield', stream: 'systems' },
  { id: 'bsc', year: 2016, label: 'BSc Intel & Security', institution: 'Staffordshire', stream: 'intelligence' },
  { id: 'mba', year: 2020.5, label: 'MBA (Distinction)', institution: 'Warwick', stream: 'systems' },
];

const qualChips = [
  'Chartered Manager · CMI',
  'Incorporated Engineer',
  'APMP · APM',
  'IoD Level 7',
  'Afghanistan Operational Service Medal',
];

const epistrophe = [
  { text: 'In the Army, I learned to lead under pressure.', last: false },
  { text: 'In science and healthcare, I learned to lead across boundaries.', last: false },
  { text: 'In banking, I learned to build the analytical systems that sharpen decisions.', last: false },
  { text: 'Now, I’m building toward better decisions in complex futures.', last: true },
];

// ─── SVG layout ─────────────────────────────────────────────────
const SVG_W = 1100;
const SVG_H = 440;
const PLOT_LEFT = 56;
const PLOT_RIGHT = 985;
const YEAR_START = 2006;
const YEAR_END = 2026.3;
const CONVERGENCE_Y = 210;
const TICK_YEARS = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
const EDU_BASELINE = 410;

const yearToX = (year) =>
  PLOT_LEFT + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * (PLOT_RIGHT - PLOT_LEFT);

const streamYAt = (stream, year) => {
  const t = Math.max(0, Math.min(1, (year - YEAR_START) / (YEAR_END - YEAR_START)));
  const eased = t * t;
  return stream.startY + (CONVERGENCE_Y - stream.startY) * eased;
};

const buildStreamPath = (stream) => {
  const from = Math.max(stream.startYear, YEAR_START);
  const steps = 140;
  const pts = [];

  for (let i = 0; i <= steps; i += 1) {
    const yr = from + ((YEAR_END - from) * i) / steps;
    pts.push(`${yearToX(yr).toFixed(1)},${streamYAt(stream, yr).toFixed(1)}`);
  }

  return `M ${pts[0]} ${pts.slice(1).map((p) => `L ${p}`).join(' ')}`;
};

const getMilestonePos = (milestone) => {
  const stream = streamMap[milestone.primaryStream];
  return { x: yearToX(milestone.markerYear), y: streamYAt(stream, milestone.markerYear) };
};

const buildJourneyPath = () => {
  const sorted = [...milestones].sort((a, b) => a.markerYear - b.markerYear);
  const points = sorted.map((m) => getMilestonePos(m));

  if (points.length < 2) return '';

  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;

  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.5;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.5;
    d += ` C ${cpx1.toFixed(1)},${prev.y.toFixed(1)} ${cpx2.toFixed(1)},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
  }

  return d;
};

// ─── Sub-components ─────────────────────────────────────────────
const StreamLegendItem = ({ stream, isActive }) => (
  <div
    className="flex items-center gap-2 transition-opacity duration-300"
    style={{ opacity: isActive ? 1 : 0.3 }}
  >
    <span
      className="inline-block h-2 w-8 rounded-full"
      style={{ backgroundColor: stream.color }}
    />
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color: isActive ? '#334155' : '#94a3b8',
        letterSpacing: '0.03em',
      }}
    >
      {stream.label}
    </span>
  </div>
);

const ProofPoint = ({ text }) => (
  <div className="flex items-start gap-2.5">
    <span
      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ background: '#94a3b8' }}
    />
    <span className="text-sm leading-relaxed" style={{ color: '#475569' }}>
      {text}
    </span>
  </div>
);

// ─── Main component ─────────────────────────────────────────────
const CareerJourneyV4 = () => {
  const [selectedId, setSelectedId] = useState('gsk');
  const active = milestones.find((m) => m.id === selectedId) || milestones[milestones.length - 1];
  const journeyPath = buildJourneyPath();

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: '#faf9f7',
        color: '#1e293b',
        minHeight: '100vh',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes drawStream {
          from { stroke-dashoffset: 2400; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes drawJourney {
          from { stroke-dashoffset: 3000; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes softPulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.45; }
        }

        .stream-line {
          stroke-dasharray: 2400;
          animation: drawStream 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .journey-line {
          stroke-dasharray: 3000;
          animation: drawJourney 2.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
          stroke-dashoffset: 3000;
        }

        .dot-enter {
          animation: fadeUp 0.4s ease both;
        }

        .soft-pulse {
          animation: softPulse 3s ease-in-out infinite;
        }
      `}</style>

      <header className="mx-auto max-w-5xl px-6 pt-14 pb-8">
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 14,
          }}
        >
          David Carter · Career trajectory
        </p>

        <h1
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)',
            fontWeight: 400,
            lineHeight: 1.28,
            color: '#0f172a',
            maxWidth: 700,
          }}
        >
          How do you make better decisions when the future is too complex to predict?
        </h1>

        <p
          className="mt-4"
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: '#64748b',
            maxWidth: 600,
          }}
        >
          A career built across defence, biopharma, healthcare, and banking — four streams of
          experience converging on one question.
        </p>
      </header>

      <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-6 pb-5">
        {streams.map((stream) => (
          <StreamLegendItem
            key={stream.id}
            stream={stream}
            isActive={active.activeStreams.includes(stream.id)}
          />
        ))}
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ overflow: 'visible' }}>
          {sectorBands.map((band) => {
            const bx = yearToX(band.start);
            const bw = yearToX(band.end) - bx;

            return (
              <g key={band.id}>
                <rect
                  x={bx}
                  y={6}
                  width={bw}
                  height={SVG_H - 48}
                  rx={5}
                  fill={band.color}
                  opacity={0.05}
                />
                <text
                  x={bx + bw / 2}
                  y={SVG_H - 52}
                  textAnchor="middle"
                  fill={band.color}
                  opacity={0.45}
                  fontSize={10}
                  fontWeight={700}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  letterSpacing="0.1em"
                >
                  {band.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {TICK_YEARS.map((yr) => {
            const tx = yearToX(yr);

            return (
              <g key={yr}>
                <line
                  x1={tx}
                  y1={SVG_H - 38}
                  x2={tx}
                  y2={SVG_H - 30}
                  stroke="#cbd5e1"
                  strokeWidth={1.2}
                />
                <text
                  x={tx}
                  y={SVG_H - 14}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={10.5}
                  fontWeight={600}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {yr === 2026 ? 'Now' : yr}
                </text>
                <line
                  x1={tx}
                  y1={12}
                  x2={tx}
                  y2={SVG_H - 42}
                  stroke="#e2e8f0"
                  strokeWidth={0.5}
                />
              </g>
            );
          })}

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
                style={{
                  animationDelay: `${i * 0.15}s`,
                  transition: 'opacity 0.4s, stroke-width 0.4s',
                }}
              />
            );
          })}

          <path
            d={journeyPath}
            fill="none"
            stroke="#1e293b"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="4 6"
            opacity={0.25}
            className="journey-line"
          />

          <circle
            cx={yearToX(YEAR_END)}
            cy={CONVERGENCE_Y}
            r={22}
            fill="#7c5cbf"
            opacity={0.06}
            className="soft-pulse"
          />
          <circle cx={yearToX(YEAR_END)} cy={CONVERGENCE_Y} r={5} fill="#1e293b" opacity={0.5} />

          <text
            x={yearToX(YEAR_END)}
            y={CONVERGENCE_Y - 36}
            textAnchor="middle"
            fill="#64748b"
            fontSize={9}
            fontWeight={600}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            letterSpacing="0.1em"
          >
            BETTER DECISIONS IN
          </text>
          <text
            x={yearToX(YEAR_END)}
            y={CONVERGENCE_Y - 24}
            textAnchor="middle"
            fill="#334155"
            fontSize={9}
            fontWeight={700}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            letterSpacing="0.1em"
          >
            COMPLEX FUTURES
          </text>

          {active.activeStreams
            .filter((sid) => sid !== active.primaryStream)
            .map((sid) => {
              const pos = getMilestonePos(active);
              const targetY = streamYAt(streamMap[sid], active.markerYear);

              return (
                <line
                  key={`conn-${sid}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={pos.x}
                  y2={targetY}
                  stroke={streamMap[sid].color}
                  strokeWidth={1}
                  strokeDasharray="2 4"
                  opacity={0.3}
                  style={{ transition: 'all 0.4s' }}
                />
              );
            })}

          {education.map((ed) => {
            const sx = yearToX(ed.year);
            const stream = streamMap[ed.stream];
            const sy = streamYAt(stream, ed.year);

            return (
              <g key={ed.id} className="dot-enter" style={{ animationDelay: '1.2s' }}>
                <line
                  x1={sx}
                  y1={sy + 6}
                  x2={sx}
                  y2={EDU_BASELINE - 18}
                  stroke="#cbd5e1"
                  strokeWidth={0.7}
                  strokeDasharray="2 3"
                />
                <rect
                  x={sx - 3.5}
                  y={sy - 3.5}
                  width={7}
                  height={7}
                  rx={1.5}
                  fill="#faf9f7"
                  stroke={stream.color}
                  strokeWidth={1.5}
                  transform={`rotate(45, ${sx}, ${sy})`}
                />
                <text
                  x={sx}
                  y={EDU_BASELINE - 6}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={8.5}
                  fontWeight={600}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {ed.label}
                </text>
                <text
                  x={sx}
                  y={EDU_BASELINE + 5}
                  textAnchor="middle"
                  fill="#cbd5e1"
                  fontSize={7.5}
                  fontWeight={500}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {ed.institution}
                </text>
              </g>
            );
          })}

          {milestones.map((milestone, i) => {
            const pos = getMilestonePos(milestone);
            const isSelected = milestone.id === selectedId;
            const stream = streamMap[milestone.primaryStream];

            return (
              <g
                key={milestone.id}
                onClick={() => setSelectedId(milestone.id)}
                style={{ cursor: 'pointer' }}
                className="dot-enter"
                role="button"
                tabIndex={0}
                aria-label={`Select ${milestone.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(milestone.id);
                  }
                }}
              >
                <circle cx={pos.x} cy={pos.y} r={16} fill="transparent" />

                {isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={14}
                    fill={stream.color}
                    opacity={0.1}
                    className="soft-pulse"
                  />
                )}

                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? 7 : milestone.isCurrent ? 6 : 4}
                  fill={isSelected ? stream.color : '#faf9f7'}
                  stroke={stream.color}
                  strokeWidth={isSelected ? 2.5 : 1.8}
                  style={{
                    transition: 'all 0.3s',
                    animationDelay: `${0.6 + i * 0.08}s`,
                  }}
                />

                <text
                  x={pos.x}
                  y={
                    pos.y +
                    (milestone.primaryStream === 'intelligence' ||
                    milestone.primaryStream === 'frontier'
                      ? 20
                      : -14)
                  }
                  textAnchor="middle"
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

      <div className="mx-auto max-w-5xl px-6 py-6" style={{ minHeight: 180 }}>
        <div
          key={active.id}
          className="rounded-xl border px-6 py-5"
          style={{
            borderColor: `${streamMap[active.primaryStream].color}25`,
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            animation: 'fadeUp 0.3s ease both',
          }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold"
              style={{
                color: sectorColor[active.sector] || '#64748b',
                background: `${sectorColor[active.sector] || '#64748b'}10`,
              }}
            >
              {active.org}
            </span>

            <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>
              {active.years}
            </span>

            {active.isCurrent && (
              <span
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{ color: '#92400e', background: '#fef3c7' }}
              >
                Current role
              </span>
            )}

            <div className="ml-auto flex flex-wrap gap-2">
              {active.activeStreams.map((sid) => (
                <span
                  key={sid}
                  className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    color: streamMap[sid].color,
                    background: `${streamMap[sid].color}0d`,
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: streamMap[sid].color }}
                  />
                  {streamMap[sid].short}
                </span>
              ))}
            </div>
          </div>

          <h3
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)',
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.35,
              marginBottom: 10,
            }}
          >
            {active.title}
          </h3>

          <p
            className="mb-4"
            style={{ fontSize: 15, lineHeight: 1.75, color: '#64748b' }}
          >
            {active.shift}
          </p>

          <div className="flex flex-col gap-2">
            {active.proofs.map((proof, i) => (
              <ProofPoint key={i} text={proof} />
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-6 py-10 text-center">
        <div className="flex flex-col gap-3">
          {epistrophe.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: line.last ? 'clamp(1rem, 2.2vw, 1.2rem)' : 'clamp(0.92rem, 2vw, 1.05rem)',
                fontStyle: line.last ? 'normal' : 'italic',
                fontWeight: line.last ? 700 : 400,
                lineHeight: 1.65,
                color: line.last ? '#0f172a' : '#64748b',
              }}
            >
              {line.text}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-2 pb-6 text-center">
        <div
          className="rounded-xl border px-8 py-8"
          style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}
        >
          <p
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(0.92rem, 2vw, 1.1rem)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: '#94a3b8',
              marginBottom: 6,
            }}
          >
            Risk management asks what could go wrong.
          </p>

          <p
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: 'clamp(0.92rem, 2vw, 1.1rem)',
              fontWeight: 700,
              lineHeight: 1.7,
              color: '#1e293b',
            }}
          >
            The harder question is what to do about it — and when.
          </p>

          <p
            className="mt-5"
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: '#64748b',
              maxWidth: 520,
              margin: '20px auto 0',
            }}
          >
            The next chapter is about embedding data, causal reasoning, and systems intelligence
            into how organisations navigate uncertainty — not just report on it.
          </p>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pt-4 pb-14">
        <div className="flex flex-wrap justify-center gap-2">
          {qualChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border px-3 py-1.5"
              style={{
                borderColor: '#e2e8f0',
                fontSize: 11,
                fontWeight: 500,
                color: '#94a3b8',
              }}
            >
              {chip}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default CareerJourneyV4;
