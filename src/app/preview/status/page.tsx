import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

type DayStatus = "up" | "degraded" | "down";

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime30d: number;
  lastIncidentDays?: number;
}

// Last 30 days of synthetic uptime data. Hand-tuned to look plausible.
const days: DayStatus[] = [
  "up","up","up","up","up","up","up",
  "up","up","up","up","up","degraded","up",
  "up","up","up","up","up","up","up",
  "up","up","up","degraded","up","up","up",
  "up","up",
];

const systems: SystemStatus[] = [
  { name: "Platform API",  status: "operational", uptime30d: 99.998 },
  { name: "Builder",       status: "operational", uptime30d: 99.94, lastIncidentDays: 5 },
  { name: "Edge Network",  status: "operational", uptime30d: 99.99 },
  { name: "FRA1 region",   status: "operational", uptime30d: 99.985, lastIncidentDays: 14 },
  { name: "Managed Postgres", status: "operational", uptime30d: 99.97 },
  { name: "Managed Redis", status: "operational", uptime30d: 100.0 },
  { name: "Dashboard",     status: "operational", uptime30d: 99.999 },
];

const incidents = [
  { date: "Jun 24, 2026", duration: "12 min", title: "Builder queue backlog after worker rotation", status: "Resolved" },
  { date: "Jun 15, 2026", duration: "5 min",  title: "Brief Postgres failover in FRA1", status: "Resolved" },
];

function dayClasses(s: DayStatus) {
  if (s === "up") return "bg-green-400";
  if (s === "degraded") return "bg-amber-400";
  return "bg-red-500";
}

function statusPill(s: SystemStatus["status"]) {
  if (s === "operational") return { dot: "bg-green-500", text: "text-green-700", label: "Operational" };
  if (s === "degraded")    return { dot: "bg-amber-500", text: "text-amber-700", label: "Degraded" };
  return { dot: "bg-red-500", text: "text-red-700", label: "Down" };
}

export default function StatusPreview() {
  const overallUp = systems.every((s) => s.status === "operational");
  const overallUptime = (systems.reduce((acc, s) => acc + s.uptime30d, 0) / systems.length).toFixed(3);

  return (
    <PreviewShell
      eyebrow="Status"
      title="A status widget you can put on the home page."
      description="Compact, trust-building system health summary. Last-30-days uptime bar grid, per-service status, recent incidents. Hydrates from a real status source once /status exists."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="bg-brand-pale text-brand text-[12px] font-bold px-3 py-1 rounded-full inline-block mb-3 uppercase tracking-widest border border-border-blue">
                System status
              </div>
              <h2 className="text-[28px] md:text-[36px] font-heading font-bold text-text-heading leading-tight">
                {overallUp ? "All systems operational." : "Active incident."}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-3 h-3">
                <span className={`absolute w-3 h-3 rounded-full opacity-75 animate-ping ${overallUp ? "bg-green-400" : "bg-red-400"}`}></span>
                <span className={`relative w-2.5 h-2.5 rounded-full ${overallUp ? "bg-green-500" : "bg-red-500"}`}></span>
              </div>
              <Link href="#" className="text-[13px] font-bold text-brand hover:text-brand-hover transition-colors flex items-center gap-1">
                View full status
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>

          {/* Overall uptime block */}
          <div className="bg-white border border-border-default rounded-3xl p-6 md:p-8 mb-6 shadow-[0_4px_14px_rgba(14,84,135,0.04)]">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className="text-[12px] font-bold uppercase tracking-widest text-text-muted mb-2">Last 30 days &mdash; platform-wide</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-[44px] font-heading font-extrabold text-text-heading leading-none">{overallUptime}%</span>
                  <span className="text-[13px] text-text-muted">uptime</span>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-[12px] text-text-muted mb-1">Target SLA (Pro)</div>
                <div className="text-[18px] font-bold text-brand">99.5%</div>
              </div>
            </div>

            {/* Day bars */}
            <div className="flex items-end gap-[3px] mb-3 h-12">
              {days.map((d, i) => (
                <div
                  key={i}
                  title={`Day ${i + 1}: ${d}`}
                  className={`flex-1 rounded-sm transition-transform hover:scale-y-110 origin-bottom ${dayClasses(d)} ${
                    d === "up" ? "h-full" : d === "degraded" ? "h-3/4" : "h-1/2"
                  }`}
                ></div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-muted font-mono">
              <span>30 days ago</span>
              <span>Today</span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-4 text-[12px] text-text-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-400"></span>Up</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>Degraded</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500"></span>Down</span>
            </div>
          </div>

          {/* Services + Incidents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-border-default rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border-default bg-bg-blue-tint/40">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-text-muted">Services</h3>
              </div>
              <div className="divide-y divide-border-default">
                {systems.map((s) => {
                  const pill = statusPill(s.status);
                  return (
                    <div key={s.name} className="px-6 py-4 flex items-center gap-4">
                      <span className={`w-2.5 h-2.5 rounded-full ${pill.dot} shrink-0`}></span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-bold text-text-heading truncate">{s.name}</div>
                        {s.lastIncidentDays !== undefined && (
                          <div className="text-[11px] text-text-muted">last incident: {s.lastIncidentDays}d ago</div>
                        )}
                      </div>
                      <span className={`text-[12px] font-bold uppercase tracking-widest ${pill.text}`}>{pill.label}</span>
                      <span className="text-[12px] text-text-muted font-mono w-16 text-right hidden sm:inline">{s.uptime30d.toFixed(2)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-border-default rounded-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border-default bg-bg-blue-tint/40">
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-text-muted">Recent incidents</h3>
              </div>
              <div className="divide-y divide-border-default">
                {incidents.map((inc, i) => (
                  <div key={i} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-text-muted font-mono">{inc.date}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{inc.status}</span>
                    </div>
                    <div className="text-[13px] font-semibold text-text-heading leading-snug mb-1">{inc.title}</div>
                    <div className="text-[11px] text-text-muted">Duration: {inc.duration}</div>
                  </div>
                ))}
                <div className="px-6 py-4 text-[12px] text-text-muted text-center">
                  <Link href="#" className="text-brand font-bold hover:text-brand-hover transition-colors">View incident history →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert as a compact block on the home page (likely between Security and Pricing) and link to a full <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/status</code> page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Should hydrate from a real status source &mdash; either an in-house endpoint or a 3rd party (Statuspage, Better Uptime, etc.) with caching at the edge.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Day bars (30 cells) should aggregate per-region uptime; the per-service table should reflect actual component-level health.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Build a real <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/status</code> page next &mdash; it's currently a 404 from the footer.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
