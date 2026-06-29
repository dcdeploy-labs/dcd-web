import { PreviewShell } from "../../../components/preview/PreviewShell";

// Synthetic but plausible data — wire to a real metrics API before promoting.
const deployBars = [
  18, 22, 28, 25, 31, 29, 34, 30, 26, 33, 38, 41, 36, 42, 45, 39, 44, 49, 47, 52, 55, 50, 58, 61, 57, 63, 66, 60, 68, 71,
];
const p99Build = [
  72, 70, 74, 71, 68, 65, 67, 62, 60, 64, 58, 55, 57, 54, 52, 50, 48, 51, 46, 44, 42, 40, 41, 38, 36, 37, 34, 32, 33, 30,
]; // seconds, descending = improving
const bandwidth = [
  1.2, 1.4, 1.3, 1.5, 1.7, 1.6, 1.9, 1.8, 2.1, 2.0, 2.4, 2.2, 2.5, 2.7, 2.6, 2.9, 3.1, 2.8, 3.2, 3.4, 3.0, 3.5, 3.7, 3.3, 3.8, 4.0, 3.6, 4.2, 4.4, 4.1,
]; // TB / day
const coldStart = [12, 28, 41, 36, 18, 9, 5, 3, 1]; // bucket counts: 100ms,150,200,250,300,350,400,450,500ms+

function maxOf(arr: number[]) {
  return Math.max(...arr);
}

function BarChart({ data, color }: { data: number[]; color: string }) {
  const max = maxOf(data);
  return (
    <div className="flex items-end gap-[3px] h-32">
      {data.map((v, i) => (
        <div
          key={i}
          title={`Day ${i + 1}: ${v}`}
          className="flex-1 rounded-t-sm hover:opacity-80 transition-opacity"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            minHeight: "2px",
          }}
        ></div>
      ))}
    </div>
  );
}

function LineChart({ data, stroke }: { data: number[]; stroke: string }) {
  const max = maxOf(data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 600;
  const h = 130;
  const stepX = w / (data.length - 1);
  const points = data
    .map((v, i) => `${i * stepX},${h - ((v - min) / range) * (h - 10) - 5}`)
    .join(" ");
  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${stroke.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${stroke.replace("#", "")})`} />
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Histogram({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const max = maxOf(data);
  return (
    <div className="flex flex-col gap-2 h-32 justify-end">
      {data.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-14 text-[10px] text-slate-500 font-mono shrink-0 text-right">{labels[i]}</span>
          <div className="flex-1 h-4 bg-white/5 rounded-sm overflow-hidden">
            <div
              className="h-full rounded-sm transition-all"
              style={{ width: `${(v / max) * 100}%`, backgroundColor: color }}
            ></div>
          </div>
          <span className="w-8 text-[10px] text-slate-400 font-mono text-right shrink-0">{v}</span>
        </div>
      ))}
    </div>
  );
}

const sumDeploys = deployBars.reduce((a, b) => a + b, 0);

export default function OpenMetricsPreview() {
  return (
    <PreviewShell
      eyebrow="Open metrics"
      title="Receipts, not slogans."
      description="Four time-series + distribution charts of platform-wide operational metrics: deploys, build p99, bandwidth, cold-start distribution. Live-updates from the stats API. Different job from /preview/live-stats (which is counters) — this is trends."
      status="draft"
    >
      <section className="relative bg-[#0F172A] py-24 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.04] invert"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-brand/20 rounded-full blur-[140px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-12 flex-col md:flex-row gap-4 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-4 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-green-300">Last 30 days · auto-updates</span>
              </div>
              <h2 className="text-[32px] md:text-[44px] font-heading font-extrabold leading-tight mb-2">Open platform metrics.</h2>
              <p className="text-[14px] text-slate-400 max-w-xl">No marketing fluff &mdash; charts of what's actually happening, refreshed nightly from production.</p>
            </div>
            <a href="#" className="text-[12px] font-bold text-brand-light hover:text-white transition-colors flex items-center gap-1 shrink-0">
              View raw JSON →
            </a>
          </div>

          {/* Chart grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Deploys per day */}
            <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[14px] font-bold text-white">Deploys per day</h3>
                <span className="text-[10px] font-mono text-slate-500">30d</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[28px] font-heading font-extrabold text-white leading-none">{sumDeploys.toLocaleString()}</span>
                <span className="text-[12px] text-green-400 font-mono">+18% vs last month</span>
              </div>
              <BarChart data={deployBars} color="#4da1db" />
            </div>

            {/* p99 build time */}
            <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[14px] font-bold text-white">p99 build time</h3>
                <span className="text-[10px] font-mono text-slate-500">30d trend</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[28px] font-heading font-extrabold text-white leading-none">{p99Build[p99Build.length - 1]}s</span>
                <span className="text-[12px] text-green-400 font-mono">↓ improving</span>
              </div>
              <LineChart data={p99Build} stroke="#4ade80" />
            </div>

            {/* Bandwidth */}
            <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[14px] font-bold text-white">Bandwidth served</h3>
                <span className="text-[10px] font-mono text-slate-500">TB / day</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[28px] font-heading font-extrabold text-white leading-none">{bandwidth[bandwidth.length - 1].toFixed(1)} TB</span>
                <span className="text-[12px] text-blue-300 font-mono">peak yesterday</span>
              </div>
              <LineChart data={bandwidth} stroke="#a78bfa" />
            </div>

            {/* Cold-start distribution */}
            <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[14px] font-bold text-white">Cold-start latency</h3>
                <span className="text-[10px] font-mono text-slate-500">% of restores</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[28px] font-heading font-extrabold text-white leading-none">187ms</span>
                <span className="text-[12px] text-amber-300 font-mono">p50</span>
              </div>
              <Histogram
                data={coldStart}
                labels={["100ms", "150ms", "200ms", "250ms", "300ms", "350ms", "400ms", "450ms", "500ms+"]}
                color="#fbbf24"
              />
            </div>
          </div>

          {/* Honesty note */}
          <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md text-center text-[13px] text-slate-400">
            All numbers aggregated across customer services, anonymised. We publish the raw JSON behind these charts because we'd rather you trust the data than the marketing.
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Wire to a real metrics endpoint. Aggregate at build time (ISR) so we're not querying live on every request.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Could replace OR complement /preview/live-stats. live-stats = totals; open-metrics = trends.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Publishing real numbers means we need to be ready for awkward weeks. Skip publishing on incidents until they're resolved.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
