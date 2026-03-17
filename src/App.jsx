import React, { useState } from 'react';
import {
  Activity,
  Building2,
  Cpu,
  Download,
  GraduationCap,
  Loader2,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';

const capabilityStyles = {
  leadership: {
    label: 'Operational leadership & command',
    short: 'Leadership',
    color: '#334155',
    tint: '#e2e8f0',
  },
  intelligence: {
    label: 'Intelligence, security & resilience thinking',
    short: 'Intelligence',
    color: '#0369a1',
    tint: '#e0f2fe',
  },
  systems: {
    label: 'Systems, causality & data/AI',
    short: 'Systems & AI',
    color: '#4338ca',
    tint: '#e0e7ff',
  },
  transfer: {
    label: 'Cross-sector transfer & enterprise leadership',
    short: 'Cross-sector',
    color: '#047857',
    tint: '#d1fae5',
  },
};

const sectorStyles = {
  Defence: { color: '#1e293b', tint: '#e2e8f0' },
  Pharma: { color: '#6d28d9', tint: '#ede9fe' },
  'Health innovation': { color: '#047857', tint: '#d1fae5' },
  Banking: { color: '#be123c', tint: '#ffe4e6' },
  'R&D risk': { color: '#d97706', tint: '#fef3c7' },
  Default: { color: '#475569', tint: '#f1f5f9' },
};

const organisationBands = [
  { id: 'army', org: 'British Army', sector: 'Defence', start: 2009, end: 2017 },
  { id: 'astra', org: 'AstraZeneca', sector: 'Pharma', start: 2017, end: 2018 },
  { id: 'hie', org: 'Health Innovation East', sector: 'Health innovation', start: 2018, end: 2020 },
  { id: 'santander', org: 'Santander UK', sector: 'Banking', start: 2020, end: 2024.8 },
  { id: 'gsk', org: 'GSK', sector: 'R&D risk', start: 2025, end: 2026 },
];

const qualifications = [
  {
    year: '2006',
    title: 'BEng Mechanical Engineering',
    value:
      'Established an early foundation in physical systems, mechanism, control and cause-and-effect reasoning — a thread that later developed into a stronger interest in causality and systems thinking.',
  },
  {
    year: '2013',
    title: 'MSc Information Capability',
    value:
      'Deepened understanding of information exploitation, capability design and systems framing.',
  },
  {
    year: '2015',
    title: 'BSc Intelligence & Security',
    value:
      'Added structured analytical methods, security thinking and geopolitical context.',
  },
  {
    year: '2019',
    title: 'MBA (Distinction)',
    value:
      'Strengthened commercial judgement, macroeconomic thinking and data-led decision framing.',
  },
];

const analyticalThemes = [
  'Complexity',
  'Causality',
  'Control thinking',
  'General systems thinking',
];

const milestones = [
  {
    id: 'army',
    index: '01',
    years: '2009–2017',
    start: 2009,
    end: 2017,
    lane: 0,
    org: 'British Army',
    sector: 'Defence',
    timelineLabel: 'Army foundation',
    title: 'Command, planning, engineering and leadership under pressure',
    summary:
      'Built the operating system: officer training, troop command, engineering accountability, intelligence/security, logistics, operational planning, welfare and leadership in demanding environments.',
    detail:
      'This phase established both foundational and more advanced leadership practice. It includes early command responsibility, engineering and asset management, intelligence and security responsibilities, operational planning, logistics and the management of people and welfare under pressure. It also shaped an enduring view that leadership depends on making sound decisions under uncertainty.',
    why:
      'This is the base layer of the career. The later shifts into science, data, resilience and strategic risk all rest on this combination of command judgement, structured planning and responsibility for people and outcomes.',
    shift: 'From leadership training to leadership in complex operational settings',
    streams: ['leadership', 'intelligence', 'systems'],
    current: false,
  },
  {
    id: 'astra',
    index: '02',
    years: '2017–2018',
    start: 2017,
    end: 2018,
    lane: 1,
    org: 'AstraZeneca',
    sector: 'Pharma',
    timelineLabel: 'AstraZeneca',
    title: 'Genomics programme leadership',
    summary:
      'Transferred operational discipline into complex science delivery, supplier leadership and significant commercial accountability.',
    detail:
      'This was the first major cross-sector transfer: applying structured planning, delivery discipline and stakeholder management in a high-value scientific environment with budgetary and supplier responsibility.',
    why:
      'It demonstrated that the earlier operating model could travel effectively beyond defence and into science-led commercial delivery.',
    shift: 'Transferred operational discipline into complex science delivery',
    streams: ['leadership', 'transfer'],
    current: false,
  },
  {
    id: 'hie',
    index: '03',
    years: '2018–2020',
    start: 2018,
    end: 2020,
    lane: 0,
    org: 'Health Innovation East',
    sector: 'Health innovation',
    timelineLabel: 'Health innovation',
    title: 'Innovation, funding and governance leadership',
    summary:
      'Broadened from programme delivery into innovation, external funding, board-level engagement and early AI governance themes.',
    detail:
      'The profile widened here from delivery leadership into innovation ecosystems: funding, governance, strategic coordination and the practical oversight of emerging technology themes in health.',
    why:
      'This expanded the career from execution and delivery into broader cross-organisational and board-facing work.',
    shift: 'Broadened from delivery into innovation and governance',
    streams: ['transfer', 'systems'],
    current: false,
  },
  {
    id: 'santander-platforms',
    index: '04',
    years: '2020–2021',
    start: 2020,
    end: 2021.7,
    lane: 1,
    org: 'Santander UK',
    sector: 'Banking',
    timelineLabel: 'Data & AI platforms',
    title: 'Enterprise Data & AI platform leadership',
    summary:
      'Built enterprise capability in data, automation and AI, shifting from leading programmes to building reusable platforms at scale.',
    detail:
      'This marks the builder phase clearly: enterprise data and AI enablement, platform thinking, automation, broader accessibility and the infrastructure needed for wider organisational leverage.',
    why:
      'It shows a move from delivering complex work to building capabilities that let many other teams perform better.',
    shift: 'Moved from programme leadership to enterprise capability-building',
    streams: ['systems', 'transfer'],
    current: false,
  },
  {
    id: 'santander-fc',
    index: '05',
    years: '2022',
    start: 2022,
    end: 2022.9,
    lane: 0,
    org: 'Santander UK',
    sector: 'Banking',
    timelineLabel: 'Financial Crime',
    title: 'Financial Crime Customer 360',
    summary:
      'Applied systems and data leadership to a domain-critical risk problem, linking data quality and mastering to better detection and decision support.',
    detail:
      'This phase moved from generic enterprise capability into high-consequence application, where customer mastering and data quality directly affected risk understanding and decision effectiveness.',
    why:
      'It showed the ability to apply technical and data capability in a business-critical risk domain rather than remaining at platform level alone.',
    shift: 'Applied enterprise data leadership to a domain-critical risk challenge',
    streams: ['systems', 'intelligence'],
    current: false,
  },
  {
    id: 'santander-resilience',
    index: '06',
    years: '2023–2024',
    start: 2023,
    end: 2024.8,
    lane: 1,
    org: 'Santander UK',
    sector: 'Banking',
    timelineLabel: 'Resilience intelligence',
    title: 'Operational Resilience Intelligence',
    summary:
      'Brought intelligence, OSINT, technology and resilience thinking together to create more proactive risk insight.',
    detail:
      'This is where the through-line becomes most explicit: intelligence products, external threat monitoring, systems thinking and emerging risk interpretation brought together into a proactive resilience and risk capability.',
    why:
      'It makes clear that the trajectory is not just about data or delivery, but about improving how emerging risk is understood and acted upon.',
    shift: 'Turned intelligence and technology into proactive risk insight',
    streams: ['intelligence', 'systems', 'transfer'],
    current: false,
  },
  {
    id: 'gsk',
    index: '07',
    years: '2025–present',
    start: 2025,
    end: 2026,
    lane: 0,
    org: 'GSK',
    sector: 'R&D risk',
    timelineLabel: 'GSK risk leadership',
    title: 'Director, Risk Management',
    summary:
      'Now applying accumulated experience at the intersection of AI/ML, epidemiology, Development Science, governance and strategic R&D risk.',
    detail:
      'The current role brings together the main strands of the journey: operational discipline, intelligence framing, systems thinking, data and AI understanding, and a stronger orientation towards proactive, causal and systemic risk leadership in a technically complex R&D environment.',
    why:
      'This is the current synthesis point: earlier experience translated into strategic risk leadership in science and development.',
    shift: 'From resilience intelligence to strategic R&D risk leadership',
    streams: ['leadership', 'intelligence', 'systems', 'transfer'],
    current: true,
  },
];

const tickYears = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getSectorMeta = (sector) => sectorStyles[sector] || sectorStyles.Default;

const getSectorIcon = (sector) => {
  switch (sector) {
    case 'Defence':
      return ShieldCheck;
    case 'Pharma':
    case 'Health innovation':
      return Activity;
    case 'Banking':
      return Building2;
    case 'R&D risk':
      return Target;
    default:
      return Target;
  }
};

const StreamPill = ({ streamKey, compact = false }) => {
  const stream = capabilityStyles[streamKey];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{
        color: stream.color,
        backgroundColor: stream.tint,
        borderColor: stream.tint,
      }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: stream.color }}
      />
      {compact ? stream.short : stream.label}
    </span>
  );
};

const ThemePill = ({ label }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
    {label}
  </span>
);

const CareerTrajectoryMap = () => {
  const [selectedId, setSelectedId] = useState('gsk');

  const activeMilestone =
    milestones.find((milestone) => milestone.id === selectedId) ||
    milestones[milestones.length - 1];

  const activeSector = getSectorMeta(activeMilestone.sector);
  const ActiveIcon = getSectorIcon(activeMilestone.sector);

  const SVG_WIDTH = 1200;
  const SVG_HEIGHT = 290;
  const LEFT = 92;
  const RIGHT = 36;
  const START_YEAR = 2006;
  const END_YEAR = 2026;
  const AXIS_Y = 162;
  const plotWidth = SVG_WIDTH - LEFT - RIGHT;

  const yearToX = (year) => {
    const safeYear = clamp(year, START_YEAR, END_YEAR);
    return LEFT + ((safeYear - START_YEAR) / (END_YEAR - START_YEAR)) * plotWidth;
  };

  const handleTimelineKey = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900" id="career-map-root">
      <div
        id="print-shell"
        className="mx-auto w-full max-w-[1240px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                David Carter · Career trajectory
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                David Carter — Career Trajectory
              </h1>
              <p className="mt-3 max-w-5xl text-base font-medium leading-7 text-slate-800">
                From operational leadership and systems discipline to intelligence-led, strategic risk leadership.
              </p>
              <p className="mt-3 max-w-5xl text-sm leading-6 text-slate-700">
                This trajectory has been shaped by a consistent focus on how leaders make better decisions under uncertainty. It begins with command, planning and engineering responsibility, develops through intelligence and systems thinking, and expands into science delivery, innovation governance, enterprise data and AI, resilience intelligence, and strategic R&amp;D risk leadership.
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="no-print inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              <Download size={14} />
              Print / export
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              Operational foundation
            </span>
            <span>→</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              Cross-sector capability-building
            </span>
            <span>→</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
              Strategic risk leadership
            </span>
          </div>
        </div>

        <div className="grid gap-6 border-b border-slate-200 px-6 py-5 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="avoid-break">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-slate-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                Career trajectory
              </h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-700">
              This career is best understood not as a series of sector moves, but as a progression
              in how uncertainty is understood, managed and acted upon. It begins with operational
              command and planning, develops through systems and intelligence discipline, and
              expands into science delivery, innovation governance, enterprise data and AI,
              resilience intelligence, and strategic risk leadership.
            </p>

            <div className="mt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Distinctive features of the path
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <StreamPill streamKey="leadership" />
                <StreamPill streamKey="intelligence" />
                <StreamPill streamKey="systems" />
                <StreamPill streamKey="transfer" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Network size={16} className="text-slate-500" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Analytical themes
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                A quieter but consistent thread running through the journey is interest in systems,
                causality, complexity and control: first through engineering, then through
                intelligence and data, and now more explicitly through proactive risk thinking.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {analyticalThemes.map((theme) => (
                  <ThemePill key={theme} label={theme} />
                ))}
              </div>
            </div>
          </section>

          <aside
            className="avoid-break rounded-2xl border border-slate-200 bg-slate-50 p-4"
            style={{
              boxShadow:
                selectedId === 'gsk'
                  ? '0 0 0 1px rgba(217,119,6,0.12) inset'
                  : 'none',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Current strategic position
                </p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-950">
                  {activeMilestone.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                    style={{
                      color: activeSector.color,
                      backgroundColor: activeSector.tint,
                    }}
                  >
                    {activeMilestone.org}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {activeMilestone.years}
                  </span>
                  {activeMilestone.current && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
                      Current role
                    </span>
                  )}
                </div>
              </div>

              <div
                className="rounded-xl p-3"
                style={{ backgroundColor: activeSector.tint }}
                aria-hidden="true"
              >
                <ActiveIcon size={18} style={{ color: activeSector.color }} />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                What changed
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">{activeMilestone.shift}</p>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-700">{activeMilestone.detail}</p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Why it matters
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">{activeMilestone.why}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeMilestone.streams.map((streamKey) => (
                <StreamPill key={streamKey} streamKey={streamKey} compact />
              ))}
            </div>
          </aside>
        </div>

        <section className="avoid-break border-b border-slate-200 px-6 py-5">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck size={16} className="text-slate-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Key inflection points
            </h2>
          </div>

          <p className="mb-4 text-sm leading-6 text-slate-700">
            Read left to right as a progression from operational leadership into cross-sector
            capability-building and then into strategic risk leadership.
          </p>

          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full"
            role="img"
            aria-label="Career timeline showing seven major inflection points across defence, pharma, health innovation, banking and R&D risk."
          >
            <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#ffffff" />

            {organisationBands.map((band) => {
              const bandMeta = getSectorMeta(band.sector);
              const x = yearToX(band.start);
              const width = Math.max(10, yearToX(band.end) - x);

              return (
                <g key={band.id}>
                  <rect
                    x={x}
                    y="18"
                    width={width}
                    height="22"
                    rx="11"
                    fill={bandMeta.tint}
                  />
                  <text
                    x={x + 8}
                    y="32"
                    fill={bandMeta.color}
                    fontSize="11"
                    fontWeight="700"
                  >
                    {band.org}
                  </text>
                </g>
              );
            })}

            <line
              x1={LEFT}
              y1={AXIS_Y}
              x2={SVG_WIDTH - RIGHT}
              y2={AXIS_Y}
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {tickYears.map((year) => {
              const x = yearToX(year);
              return (
                <g key={year}>
                  <line
                    x1={x}
                    y1={AXIS_Y - 10}
                    x2={x}
                    y2={AXIS_Y + 10}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={258}
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {year === 2026 ? 'Now' : year}
                  </text>
                  <line
                    x1={x}
                    y1={50}
                    x2={x}
                    y2={AXIS_Y - 14}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {milestones.map((milestone) => {
              const sectorMeta = getSectorMeta(milestone.sector);
              const selected = milestone.id === selectedId;
              const x1 = yearToX(milestone.start);
              const x2 = yearToX(milestone.end);
              const width = Math.max(26, x2 - x1);
              const midpoint = x1 + width / 2;
              const barY = milestone.lane === 0 ? 78 : 182;
              const labelY = milestone.lane === 0 ? 68 : 230;
              const connectorY1 = milestone.lane === 0 ? barY + 18 : AXIS_Y;
              const connectorY2 = milestone.lane === 0 ? AXIS_Y : barY;

              return (
                <g
                  key={milestone.id}
                  onClick={() => setSelectedId(milestone.id)}
                  onKeyDown={(event) => handleTimelineKey(event, milestone.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select ${milestone.title}`}
                  style={{ cursor: 'pointer', outline: 'none' }}
                >
                  <line
                    x1={midpoint}
                    y1={connectorY1}
                    x2={midpoint}
                    y2={connectorY2}
                    stroke={selected ? sectorMeta.color : '#cbd5e1'}
                    strokeWidth={selected ? '2.5' : '1.5'}
                  />

                  <rect
                    x={x1}
                    y={barY}
                    width={width}
                    height="18"
                    rx="9"
                    fill={selected ? sectorMeta.tint : '#f8fafc'}
                    stroke={selected ? sectorMeta.color : '#cbd5e1'}
                    strokeWidth={selected ? '2.5' : '1.5'}
                  />

                  <circle
                    cx={midpoint}
                    cy={AXIS_Y}
                    r={selected ? '7' : '5'}
                    fill={selected ? sectorMeta.color : '#94a3b8'}
                  />

                  <text
                    x={midpoint}
                    y={labelY}
                    textAnchor="middle"
                    fill={selected ? '#0f172a' : '#475569'}
                    fontSize="11"
                    fontWeight={selected ? '700' : '600'}
                  >
                    {milestone.timelineLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </section>

        <section className="border-b border-slate-200 px-6 py-5">
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap size={16} className="text-slate-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Formal development
            </h2>
          </div>

          <p className="mb-4 text-sm leading-6 text-slate-700">
            Formal development reinforcing the trajectory, rather than sitting apart from it.
          </p>

          <div
            id="qualification-grid"
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}
          >
            {qualifications.map((qualification) => (
              <div
                key={qualification.title}
                className="card rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {qualification.year}
                </p>
                <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-950">
                  {qualification.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{qualification.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-slate-500" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Ongoing intellectual interests
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              These themes do not need to dominate the graphic, but they help explain the logic of
              the trajectory: a sustained interest in how systems behave, how causes propagate, and
              how leaders can make better decisions in complex environments.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {analyticalThemes.map((theme) => (
                <ThemePill key={`secondary-${theme}`} label={theme} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-5">
          <div className="mb-3 flex items-center gap-2">
            <Building2 size={16} className="text-slate-500" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Milestone summaries
            </h2>
          </div>

          <div
            id="milestone-grid"
            className="grid gap-3"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {milestones.map((milestone) => {
              const sectorMeta = getSectorMeta(milestone.sector);
              const Icon = getSectorIcon(milestone.sector);
              const selected = milestone.id === selectedId;

              return (
                <button
                  key={milestone.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedId(milestone.id)}
                  className="card rounded-2xl border p-4 text-left transition"
                  style={{
                    borderColor: selected ? sectorMeta.color : '#e2e8f0',
                    backgroundColor: selected ? '#ffffff' : '#f8fafc',
                    boxShadow: selected
                      ? `0 0 0 1px ${sectorMeta.color} inset`
                      : 'none',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        {milestone.years}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-950">
                        {milestone.title}
                      </h3>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {milestone.current && (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-800">
                          Current
                        </span>
                      )}
                      <div
                        className="rounded-xl p-2"
                        style={{ backgroundColor: sectorMeta.tint }}
                        aria-hidden="true"
                      >
                        <Icon size={15} style={{ color: sectorMeta.color }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{
                        color: sectorMeta.color,
                        backgroundColor: sectorMeta.tint,
                      }}
                    >
                      {milestone.org}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {milestone.index}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700">{milestone.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {milestone.streams.map((streamKey) => (
                      <StreamPill key={streamKey} streamKey={streamKey} compact />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-slate-200 px-6 py-3">
          <p className="text-xs leading-5 text-slate-500">
            Read as a guided executive walk-through: chronology, inflection points and the
            increasingly explicit focus on better decisions under uncertainty.
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: A4 landscape;
              margin: 10mm;
            }

            @media print {
              body {
                margin: 0;
                background: white !important;
              }

              .no-print {
                display: none !important;
              }

              #career-map-root {
                min-height: auto !important;
                background: white !important;
                padding: 0 !important;
              }

              #print-shell {
                max-width: none !important;
                width: 100% !important;
                border: none !important;
                box-shadow: none !important;
                border-radius: 0 !important;
              }

              .card,
              .avoid-break,
              section,
              aside,
              svg {
                break-inside: avoid;
                page-break-inside: avoid;
              }

              #qualification-grid {
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
              }

              #milestone-grid {
                grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
              }

              * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          `,
        }}
      />
    </div>
  );
};

export default CareerTrajectoryMap;