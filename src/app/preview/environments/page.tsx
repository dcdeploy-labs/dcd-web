import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Clone {
  name: string;
  purpose: string;
  age: string;
  cost: string;
  status: "live" | "running" | "queued";
  accent: string;
}

const clones: Clone[] = [
  {
    name: "pr-142-checkout-redesign",
    purpose: "PR preview · Per-pull-request ephemeral env",
    age: "live for 23m",
    cost: "$0.04",
    status: "live",
    accent: "from-blue-500 to-indigo-600",
  },
  {
    name: "load-test-2026-06-29",
    purpose: "Hammer the API at 5k RPS, throw it away after",
    age: "live for 8m",
    cost: "$0.01",
    status: "live",
    accent: "from-amber-500 to-orange-600",
  },
  {
    name: "migration-rehearsal",
    purpose: "Cloned with prod data · Run risky DB migration first",
    age: "live for 1h 12m",
    cost: "$0.11",
    status: "live",
    accent: "from-violet-500 to-purple-600",
  },
  {
    name: "demo-acme-corp",
    purpose: "Investor demo · Fresh data, real services",
    age: "live for 4h 38m",
    cost: "$0.48",
    status: "live",
    accent: "from-emerald-500 to-green-600",
  },
  {
    name: "pricing-experiment-b",
    purpose: "A/B infra test · Redis instead of in-memory cache",
    age: "queued",
    cost: "—",
    status: "queued",
    accent: "from-slate-500 to-slate-700",
  },
];

const useCases = [
  {
    icon: "🔀",
    title: "PR preview environments",
    desc: "Every pull request gets its own clone with the merged branch deployed. Share the URL in a PR comment.",
    accent: "bg-blue-50 border-blue-200",
  },
  {
    icon: "💥",
    title: "Load testing in isolation",
    desc: "Clone prod, throw 50k RPS at it, watch it cope, discard. Real numbers without ever putting paying users at risk.",
    accent: "bg-amber-50 border-amber-200",
  },
  {
    icon: "🗃️",
    title: "Migration rehearsal",
    desc: "Clone with a recent snapshot. Run the risky ALTER TABLE. If it explodes, blow the clone away and try again.",
    accent: "bg-violet-50 border-violet-200",
  },
  {
    icon: "🎬",
    title: "Demo environments",
    desc: "Spin up a clone for an investor pitch, a sales demo, or a customer onboarding session. Tear it down after.",
    accent: "bg-emerald-50 border-emerald-200",
  },
  {
    icon: "🧪",
    title: "A/B infrastructure tests",
    desc: "Same code, different config. Clone-A on Redis, clone-B on in-memory cache. Compare side-by-side.",
    accent: "bg-rose-50 border-rose-200",
  },
  {
    icon: "🎓",
    title: "Onboarding sandboxes",
    desc: "Give every new hire their own clone to break safely. Reset to base whenever they want.",
    accent: "bg-cyan-50 border-cyan-200",
  },
];

const cloned = [
  { label: "Services", detail: "All microVMs cloned · same image, same config, fresh runtime" },
  { label: "Databases", detail: "Snapshot-restore from the parent · ready in 100–400ms" },
  { label: "Env vars & secrets", detail: "Copied at clone-time · edit per-env without touching prod" },
  { label: "Disk volumes", detail: "Copy-on-write so big disks clone fast and cheaply" },
];

const statusPill: Record<Clone["status"], { label: string; cls: string }> = {
  live:    { label: "Live", cls: "bg-green-500/20 text-green-300 border-green-500/40" },
  running: { label: "Running", cls: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  queued:  { label: "Queued", cls: "bg-slate-500/20 text-slate-400 border-slate-500/40" },
};

export default function EnvironmentsPreview() {
  return (
    <PreviewShell
      eyebrow="Environments"
      title="Clone production. Break things safely."
      description="Pitch for environments-as-a-service: spin up a full isolated copy of your stack — services, databases, configs, secrets — in seconds. Run risky migrations, load tests, per-PR previews, demos. Discard with a single command."
      status="draft"
    >
      {/* HERO */}
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>
        <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-brand-pale rounded-full blur-[120px] opacity-60"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Environments as a service
            </div>
            <h2 className="text-[40px] md:text-[60px] font-heading font-extrabold text-text-heading mb-6 leading-[1.05] tracking-[-0.02em]">
              Clone production. <br />
              <span className="gradient-text">Break things safely.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7] mb-8">
              An environment isn't just a config flag &mdash; it's your services, your databases, your secrets, your volumes. Clone the whole thing in seconds. Run risky changes, then keep what worked and throw away what didn't.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
                Try it now &rarr;
              </Link>
              <Link href="/docs" className="bg-white border border-border-default text-text-body font-semibold px-7 py-3.5 rounded-full hover:border-brand hover:text-brand transition-all">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PARENT + CLONES VISUAL */}
      <section className="bg-bg-page py-20 px-6 border-y border-border-default">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* PARENT */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="bg-white border-2 border-brand rounded-[28px] shadow-[0_20px_60px_rgba(14,84,135,0.15)] overflow-hidden">
                <div className="bg-gradient-to-br from-[#073a61] to-[#0e5487] p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Parent environment</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">Live</span>
                    </div>
                    <h3 className="text-[24px] font-heading font-extrabold mb-1">production</h3>
                    <p className="text-[12px] text-blue-100 font-mono">acme-saas / acme</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { name: "frontend", size: "DCD-2", icon: "▲" },
                    { name: "api", size: "DCD-3", icon: "🌐" },
                    { name: "worker", size: "DCD-1", icon: "⚙️" },
                    { name: "Postgres", size: "DCD-2-DB", icon: "🐘" },
                  ].map((s) => (
                    <div key={s.name} className="flex items-center gap-3 bg-bg-blue-tint/40 border border-border-blue rounded-xl px-3 py-2">
                      <span className="text-[16px]">{s.icon}</span>
                      <span className="text-[13px] font-mono font-bold text-text-heading flex-1">{s.name}</span>
                      <span className="text-[11px] text-brand font-mono">{s.size}</span>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-border-default">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-text-muted">Monthly cost</span>
                    <span className="font-bold text-text-heading">~$28 / mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CLONES */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-border-default flex-1"></div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-text-muted">
                  → cloned from production →
                </span>
                <div className="h-px bg-border-default flex-1"></div>
              </div>

              <div className="space-y-3">
                {clones.map((c) => (
                  <div
                    key={c.name}
                    className="group bg-white border border-border-default rounded-2xl overflow-hidden hover:border-brand hover:shadow-[0_8px_24px_rgba(14,84,135,0.08)] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-stretch">
                      <div className={`w-1.5 bg-gradient-to-b ${c.accent}`}></div>
                      <div className="flex-1 p-4 flex items-center gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-mono font-bold text-text-heading truncate">{c.name}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border ${statusPill[c.status].cls}`}>
                              {statusPill[c.status].label}
                            </span>
                          </div>
                          <div className="text-[12px] text-text-muted leading-tight">{c.purpose}</div>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] font-mono">
                          <span className="text-text-muted">{c.age}</span>
                          <span className="text-brand font-bold">{c.cost}</span>
                          <button className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-red-600 transition-all text-[11px] font-bold">
                            destroy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add clone CTA */}
                <button className="w-full border-2 border-dashed border-border-default rounded-2xl p-4 text-[13px] font-bold text-text-muted hover:border-brand hover:text-brand hover:bg-white transition-all flex items-center justify-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  Clone production again
                </button>
              </div>

              <p className="text-[11px] text-text-muted text-center mt-6">
                Each clone bills per-minute. Destroy it and the meter stops. Most clones live for under an hour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT GETS CLONED */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-[28px] md:text-[36px] font-heading font-bold text-text-heading mb-3">What gets cloned</h3>
            <p className="text-[15px] text-text-muted max-w-xl mx-auto">A clone is the whole stack &mdash; not just a config file with a different name.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cloned.map((c) => (
              <div key={c.label} className="bg-bg-page border border-border-default rounded-2xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-text-heading mb-1">{c.label}</div>
                  <div className="text-[13px] text-text-muted leading-[1.6]">{c.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-bg-page py-20 px-6 border-y border-border-default">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-[28px] md:text-[36px] font-heading font-bold text-text-heading mb-3">Six things people clone for</h3>
            <p className="text-[15px] text-text-muted max-w-xl mx-auto">Most teams discover three more after the first month.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u) => (
              <div key={u.title} className={`bg-white border ${u.accent} rounded-2xl p-6 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(14,84,135,0.08)] transition-all`}>
                <div className="text-[28px] mb-3">{u.icon}</div>
                <h4 className="text-[16px] font-heading font-bold text-text-heading mb-2 leading-tight">{u.title}</h4>
                <p className="text-[13px] text-text-muted leading-[1.6]">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI / HOW-IT-WORKS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-[28px] md:text-[36px] font-heading font-bold text-text-heading mb-3">Two commands. That's it.</h3>
            <p className="text-[15px] text-text-muted max-w-xl mx-auto">From dashboard or CLI &mdash; whichever fits the workflow.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* CLI */}
            <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="ml-auto text-[12px] text-slate-500 font-mono">~/acme-saas</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.8]">
                <div className="text-white font-bold">$ dcd env clone production --to load-test-feb</div>
                <div className="text-slate-400 mt-2">→ Cloning 3 services from production...</div>
                <div className="text-slate-400">→ Snapshotting Postgres... <span className="text-green-400">412ms</span></div>
                <div className="text-slate-400">→ Snapshotting microVMs... <span className="text-green-400">187ms</span></div>
                <div className="text-slate-400">→ Generating new env vars (PG_URL, etc)</div>
                <div className="text-slate-400">→ Routing internal traffic to load-test-feb</div>
                <div className="text-green-400 font-bold mt-3">✔ Environment ready in 3.2s</div>
                <div className="text-brand-light mt-3">https://load-test-feb.acme.dcdeploy.app</div>
                <div className="border-t border-white/5 my-4"></div>
                <div className="text-slate-500"># run your tests, then:</div>
                <div className="text-white font-bold">$ dcd env destroy load-test-feb</div>
                <div className="text-slate-400 mt-2">✔ Destroyed in 0.8s · final bill: <span className="text-amber-300">$0.04</span></div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {[
                { n: "01", title: "Pick a parent env", desc: "Usually production, but any environment can be a parent." },
                { n: "02", title: "Run `dcd env clone`", desc: "Or click 'Clone' in the dashboard. Microvm snapshots and DB snapshots run in parallel." },
                { n: "03", title: "Use the new env", desc: "Gets its own URL, its own services, its own data. Fully isolated from the parent." },
                { n: "04", title: "Discard or promote", desc: "Throw the clone away when done — or promote it to replace the parent." },
              ].map((s) => (
                <div key={s.n} className="bg-bg-page border border-border-default rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand text-white font-heading font-extrabold text-[14px] flex items-center justify-center shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-text-heading mb-1">{s.title}</h4>
                    <p className="text-[13px] text-text-muted leading-[1.5]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BILLING TRANSPARENCY */}
      <section className="bg-[#0F172A] py-20 px-6 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-6 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-light">Billing</span>
          </div>
          <h3 className="text-[28px] md:text-[36px] font-heading font-bold mb-6 leading-tight">
            Clones bill by the minute, like everything else.
          </h3>
          <p className="text-[15px] text-slate-400 leading-[1.7] mb-8">
            A clone that lives for 12 minutes costs you 12 minutes of compute. Destroy it, the meter stops. No standing reservation fees, no &ldquo;environment add-on&rdquo; surcharge, no surprise &ldquo;you forgot to delete this&rdquo; bill at month-end &mdash; we'll auto-destroy clones idle for over 24h on Basic/Starter (configurable on Pro).
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-colors">
            See pricing &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>This is a flagship product story &mdash; almost certainly deserves its own home-page section AND a dedicated <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/environments</code> page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Best home-page slot: between How it works (section 4) and Global Edge Network. Strong companion to /preview/scale-to-zero.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>The CLI commands (<code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">dcd env clone</code>, <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">dcd env destroy</code>) need to actually exist before this goes public.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Auto-destroy-after-24h default for Basic/Starter should be confirmed with engineering. The promise is in the billing section.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Strong fit for GitHub Actions integration: automatic clone-on-PR + destroy-on-merge.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
