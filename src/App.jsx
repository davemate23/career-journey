import React, { useMemo, useState } from 'react';
import V3Interactive from './versions/V3_Interactive';
import V4StreamConvergence from './versions/V4_StreamConvergence';
import V5StreamConvergencev2 from './versions/V5_StreamConvergencev2';
import V6StreamConvergencev3 from './versions/V6_StreamConvergencev3';
import V7StreamConvergencev4 from './versions/V7_StreamConvergencev4';
import V8StreamConvergencev5 from './versions/V8_StreamConvergencev5';
import V9StreamConvergencev6 from './versions/V9_StreamConvergencev6';

/*
  SWITCHER MODE
  - true  = show the version selector / compare UI
  - false = render only the final chosen version (Option A)
*/
const USE_SWITCHER = false;

/*
  OPTION A FINALISATION
*/
const FINAL_VERSION_KEY = 'v9';

/*
  VERSION REGISTRY
*/
const versions = {
  v3: { label: 'V3 Interactive', component: V3Interactive },
  v4: { label: 'V4 Stream convergence', component: V4StreamConvergence },
  v5: { label: 'V5 Stream Convergence v2', component: V5StreamConvergencev2 },
  v6: { label: 'V6 Stream Convergence v3', component: V6StreamConvergencev3 },
  v7: { label: 'V7 Stream Convergence v4', component: V7StreamConvergencev4 },
  v8: { label: 'V8 Stream Convergence v5', component: V8StreamConvergencev5 },
  v9: { label: 'V9 Stream Convergence v6', component: V9StreamConvergencev6 },

  // Add future entries here:
  // v5: { label: 'V5 Executive panel', component: V5ExecutivePanel },
  // v6: { label: 'V6 Print tuned', component: V6PrintTuned },
};

function VersionSelect({ value, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
      >
        {Object.entries(versions).map(([key, version]) => (
          <option key={key} value={key}>
            {version.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function App() {
  const versionKeys = Object.keys(versions);

  const safeFinalKey = versions[FINAL_VERSION_KEY] ? FINAL_VERSION_KEY : versionKeys[0];

  const [primaryKey, setPrimaryKey] = useState(safeFinalKey);
  const [compareMode, setCompareMode] = useState(false);
  const [compareKey, setCompareKey] = useState(
    versionKeys.length > 1
      ? versionKeys.find((key) => key !== safeFinalKey) || safeFinalKey
      : safeFinalKey
  );

  const PrimaryComponent = useMemo(() => {
    return versions[primaryKey]?.component || versions[safeFinalKey].component;
  }, [primaryKey, safeFinalKey]);

  const CompareComponent = useMemo(() => {
    return versions[compareKey]?.component || versions[safeFinalKey].component;
  }, [compareKey, safeFinalKey]);

  const FinalComponent = versions[safeFinalKey].component;

  if (!USE_SWITCHER) {
    return <FinalComponent />;
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Career infographic versions
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-950">
                Compare iterations without creating separate apps
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Use single view for normal review. Turn on compare mode to inspect two versions side by side.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <VersionSelect
                value={primaryKey}
                onChange={setPrimaryKey}
                label="Primary"
              />

              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Compare mode</span>
              </label>

              {compareMode && (
                <VersionSelect
                  value={compareKey}
                  onChange={setCompareKey}
                  label="Comparison"
                />
              )}
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Later, for Option A:</span>{' '}
            set <code>USE_SWITCHER = false</code> and update <code>FINAL_VERSION_KEY</code> to the chosen winner.
          </div>
        </div>

        {!compareMode ? (
          <PrimaryComponent />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            <section>
              <div className="mb-2 px-1 text-sm font-semibold text-slate-600">
                {versions[primaryKey]?.label || 'Primary'}
              </div>
              <PrimaryComponent />
            </section>

            <section>
              <div className="mb-2 px-1 text-sm font-semibold text-slate-600">
                {versions[compareKey]?.label || 'Comparison'}
              </div>
              <CompareComponent />
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
