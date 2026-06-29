import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Screen {
  title: string;
  desc: string;
  annotations: { x: string; y: string; label: string; sub: string; side: "left" | "right" }[];
  preview: React.ReactNode;
}

function DashboardSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(14,84,135,0.18)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/40">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 text-[11px] text-slate-500 font-mono">dash.dcdeploy.com</span>
      </div>
      {/* App body */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-44 bg-[#0F172A] border-r border-white/5 p-4 flex-col gap-1 shrink-0">
          <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2 px-2">Workspace</div>
          {["Services", "Databases", "Domains", "Team", "Billing", "Settings"].map((item, i) => (
            <div
              key={item}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] ${
                i === 0 ? "bg-brand/20 text-brand-light font-bold border border-brand/30" : "text-slate-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></span>
              {item}
            </div>
          ))}
        </div>
        {/* Content area */}
        <div className="flex-1 bg-[#0F172A] p-5 min-h-[320px]">{children}</div>
      </div>
    </div>
  );
}

const screens: Screen[] = [
  {
    title: "Services dashboard",
    desc: "Every service you've deployed, with live status, region, machine size, and the last deploy's age. Click in for logs, metrics, and rollback.",
    annotations: [
      { x: "8%", y: "30%", label: "Live status", sub: "Idle services pulse amber. Sleeping services dim to grey.", side: "left" },
      { x: "82%", y: "62%", label: "One-click rollback", sub: "Snapshot-restore from this menu.", side: "right" },
      { x: "55%", y: "12%", label: "Quick deploy", sub: "Same as `dcd deploy` from the CLI.", side: "right" },
    ],
    preview: (
      <DashboardSkeleton>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[15px] font-bold text-white">Services</div>
            <div className="text-[11px] text-slate-500 font-mono">3 active · 1 sleeping</div>
          </div>
          <button className="text-[11px] font-bold bg-[#fcb817] text-[#0F172A] px-3 py-1.5 rounded-full">+ Deploy</button>
        </div>
        <div className="space-y-2">
          {[
            { name: "acme-saas", region: "fra1", size: "DCD-2", state: "live", age: "2m ago" },
            { name: "billing-api", region: "fra1", size: "DCD-1", state: "live", age: "1h ago" },
            { name: "discord-bot", region: "fra1", size: "DCD-1", state: "sleeping", age: "9h ago" },
            { name: "metrics-cron", region: "fra1", size: "DCD-1", state: "live", age: "3m ago" },
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <span className={`w-2 h-2 rounded-full ${s.state === "live" ? "bg-green-400" : "bg-slate-500"}`}></span>
              <span className="text-[12px] font-bold text-white flex-1 truncate font-mono">{s.name}</span>
              <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">{s.region}</span>
              <span className="text-[10px] text-brand-light font-mono">{s.size}</span>
              <span className="text-[10px] text-slate-500 font-mono">{s.age}</span>
            </div>
          ))}
        </div>
      </DashboardSkeleton>
    ),
  },
  {
    title: "Real-time logs",
    desc: "Stream stdout from every microVM. Filter by service, environment, or grep substring. Pause to scroll back.",
    annotations: [
      { x: "12%", y: "20%", label: "Service filter", sub: "Multi-select across services.", side: "left" },
      { x: "82%", y: "50%", label: "Live tail", sub: "WebSocket stream. Pause anytime.", side: "right" },
    ],
    preview: (
      <DashboardSkeleton>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[15px] font-bold text-white">Logs · acme-saas</div>
            <div className="text-[11px] text-green-400 font-mono">● live tail · fra1</div>
          </div>
          <div className="flex gap-1 text-[10px] font-mono">
            <span className="bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded-md">grep: 200</span>
            <span className="bg-brand/20 border border-brand/30 text-brand-light px-2 py-1 rounded-md">last 5m</span>
          </div>
        </div>
        <div className="bg-black/40 rounded-lg p-3 font-mono text-[11px] leading-[1.7] space-y-1">
          <div className="text-slate-500">[12:44:01] <span className="text-green-400">GET</span> /              200 OK  42ms</div>
          <div className="text-slate-500">[12:44:02] <span className="text-green-400">GET</span> /api/user      200 OK  18ms</div>
          <div className="text-slate-500">[12:44:03] <span className="text-amber-400">POST</span> /api/webhook  202     115ms</div>
          <div className="text-slate-500">[12:44:04] <span className="text-green-400">GET</span> /dashboard     200 OK  23ms</div>
          <div className="text-slate-500">[12:44:05] <span className="text-red-400">GET</span>  /api/missing   404     8ms</div>
          <div className="text-brand-light">▼ streaming...</div>
        </div>
      </DashboardSkeleton>
    ),
  },
  {
    title: "Metrics & cost meter",
    desc: "RAM, CPU, request rate, and a per-second cost counter. Spot regressions and runaway bills before invoice day.",
    annotations: [
      { x: "10%", y: "25%", label: "Live cost meter", sub: "Updates per minute. No surprise bills.", side: "left" },
      { x: "75%", y: "55%", label: "Per-service breakdown", sub: "Click in for traces.", side: "right" },
    ],
    preview: (
      <DashboardSkeleton>
        <div className="text-[15px] font-bold text-white mb-3">Metrics</div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Cost (today)</div>
            <div className="text-[18px] font-bold text-brand-light">$0.84</div>
            <div className="text-[10px] text-slate-500 font-mono">↓ 12% vs yesterday</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">Requests / s</div>
            <div className="text-[18px] font-bold text-white">23.4</div>
            <div className="text-[10px] text-slate-500 font-mono">avg last 5m</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-[10px] uppercase text-slate-500 tracking-wider mb-1">p99 latency</div>
            <div className="text-[18px] font-bold text-white">142ms</div>
            <div className="text-[10px] text-green-400 font-mono">healthy</div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 h-20 relative overflow-hidden">
          <svg viewBox="0 0 200 60" className="w-full h-full">
            <polyline fill="none" stroke="#4da1db" strokeWidth="1.5" points="0,40 15,38 30,42 45,35 60,30 75,25 90,28 105,20 120,18 135,22 150,15 165,12 180,18 200,10" />
            <polyline fill="rgba(77,161,219,0.15)" stroke="none" points="0,40 15,38 30,42 45,35 60,30 75,25 90,28 105,20 120,18 135,22 150,15 165,12 180,18 200,10 200,60 0,60" />
          </svg>
        </div>
      </DashboardSkeleton>
    ),
  },
];

function Annotation({ a, label }: { a: Screen["annotations"][number]; label: number }) {
  return (
    <div
      className="absolute hidden md:flex items-center"
      style={{ left: a.x, top: a.y, transform: "translate(-50%, -50%)" }}
    >
      {/* Pin */}
      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
        <span className="absolute w-6 h-6 rounded-full bg-brand/40 animate-ping"></span>
        <span className="relative w-5 h-5 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center shadow-md">
          {label}
        </span>
      </div>
      {/* Label */}
      <div
        className={`bg-white border border-border-default rounded-xl px-3 py-2 shadow-lg w-48 ${
          a.side === "left" ? "order-first mr-3" : "ml-3"
        }`}
      >
        <div className="text-[12px] font-bold text-text-heading leading-tight">{a.label}</div>
        <div className="text-[10px] text-text-muted leading-snug mt-0.5">{a.sub}</div>
      </div>
    </div>
  );
}

export default function DashboardPreview() {
  return (
    <PreviewShell
      eyebrow="Dashboard"
      title="A guided tour of the product."
      description="Three annotated screenshots of the dashboard with numbered pins explaining the parts that matter. Use mock screens here; swap for real product captures before promoting."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Inside the dashboard
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Less clicking. <span className="gradient-text">More shipping.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              The UI is designed for developers, not 9-to-5 cloud operators. Every action is one click; everything else is a CLI command.
            </p>
          </div>

          <div className="space-y-24">
            {screens.map((screen, idx) => (
              <div key={screen.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-brand mb-2">Screen 0{idx + 1}</div>
                  <h3 className="text-[28px] font-heading font-bold text-text-heading mb-4 leading-tight">{screen.title}</h3>
                  <p className="text-[16px] text-text-body leading-[1.7] mb-6">{screen.desc}</p>
                  <ul className="space-y-2 text-[14px]">
                    {screen.annotations.map((a, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span>
                          <strong className="text-text-heading">{a.label}.</strong>{" "}
                          <span className="text-text-muted">{a.sub}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  {screen.preview}
                  {screen.annotations.map((a, i) => (
                    <Annotation key={i} a={a} label={i + 1} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Open the dashboard &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Replace the mocked-up screens with real screen recordings or high-fidelity captures of the actual dashboard.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Best home-page slot: between How it works (section 4) and Global Edge Network. Or use as a dedicated /product page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Annotations are responsive-hidden below md breakpoint; mobile shows them as a numbered list under the screen.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
