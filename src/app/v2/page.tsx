"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CurrencyToggle, useCurrency } from "../../lib/currency";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const differentiators = [
  { icon: "🏗️", title: "Real bare metal", desc: "AMD EPYC + Intel Gold on NVMe. Your service owns its slice of metal \u2014 predictable latency, no noisy neighbours.", accent: "from-blue-500/15 to-blue-500/0" },
  { icon: "💤", title: "Scale-to-zero on free", desc: "MicroVMs suspend when idle and cold-start in under 300ms. That's how the free tier stays free, forever.", accent: "from-indigo-500/15 to-indigo-500/0" },
  { icon: "🌱", title: "Clone production", desc: "Spin up a full isolated copy of your stack \u2014 services, databases, secrets \u2014 in seconds. Test risky changes, throw the clone away.", accent: "from-emerald-500/15 to-emerald-500/0" },
];

const deployLines = [
  { kind: "cmd",  text: "$ git push dcdeploy main" },
  { kind: "log",  text: "→ Detected: Next.js 14" },
  { kind: "log",  text: "→ Building image... 1.2s" },
  { kind: "log",  text: "→ Snapshotting microVM... 187ms" },
  { kind: "log",  text: "→ Routing fra1 traffic to v2" },
  { kind: "ok",   text: "✔ Live in 4.6s" },
  { kind: "url",  text: "https://my-saas.dcdeploy.app" },
] as const;

const pipelineSteps = [
  { label: "Receive", icon: "📥", afterLine: 0 },
  { label: "Build",   icon: "⚙️",  afterLine: 2 },
  { label: "Snap",    icon: "📸",  afterLine: 3 },
  { label: "Live",    icon: "✅",  afterLine: 5 },
];

const clones = [
  { name: "pr-142-checkout", purpose: "PR preview \u00b7 auto-deploys on push",   age: "23m",   cost: "$0.04", color: "from-blue-500 to-indigo-600" },
  { name: "load-test-jun-29", purpose: "5k RPS load test, discard after",         age: "8m",    cost: "$0.01", color: "from-amber-500 to-orange-600" },
  { name: "demo-acme-corp",   purpose: "Investor demo with fresh data",            age: "4h",    cost: "$0.48", color: "from-emerald-500 to-green-600" },
];

const cloneUseCases = ["PR previews", "Load tests", "Migration rehearsal", "Demos", "A/B infra tests"];

const lifecycleLog = [
  { t: "[00:00:00]", txt: "Service running on a microVM",          style: "text-slate-300" },
  { t: "[00:05:00]", txt: "No traffic for 5 min → snapshot & suspend", style: "text-amber-300" },
  { t: "[06:00:00]", txt: "… zero compute consumed …",              style: "text-slate-500" },
  { t: "[12:34:56]", txt: "Request → restore from snapshot in 187ms", style: "text-brand-light" },
  { t: "[12:34:57]", txt: "✔ Response sent — 200 OK",               style: "text-green-400" },
];

const lifecycleSteps = [
  { n: "01", title: "Run on a microVM",   desc: "Kernel-level isolation, NVMe-backed." },
  { n: "02", title: "Watch for idle",     desc: "After your idle window, mark for suspend." },
  { n: "03", title: "Snapshot to disk",   desc: "Memory captured to NVMe in milliseconds." },
  { n: "04", title: "Resume on demand",   desc: "First byte typically in under 300ms." },
];

const personas = [
  { title: "Indie hackers",     pitch: "Ship your SaaS without burning $50/mo before your first dollar.",  metric: "₹0 → ₹85", metricSub: "until product-market fit", icon: "🚀",  accent: "from-rose-500/15 to-rose-500/0", border: "border-rose-200" },
  { title: "Seed startups",     pitch: "Skip the platform engineer hire. Spend the headcount on shipping.", metric: "<½ hr",    metricSub: "to production",            icon: "🌱", accent: "from-blue-500/15 to-blue-500/0",  border: "border-blue-200" },
  { title: "Agencies",          pitch: "One workspace per client. Hand off SSO when the project ends.",    metric: "1-click",  metricSub: "ownership transfer",       icon: "👥", accent: "from-purple-500/15 to-purple-500/0", border: "border-purple-200" },
  { title: "Side projects",     pitch: "Run that Discord bot or cron for free, forever. Stop thinking about it.", metric: "Forever", metricSub: "on DCD-1",            icon: "🤖", accent: "from-amber-500/15 to-amber-500/0", border: "border-amber-200" },
];

const comparisonRows: { feature: string; values: ("yes" | "no" | "partial")[] }[] = [
  { feature: "Always-free tier",        values: ["yes", "no", "partial", "partial"] },
  { feature: "Per-minute billing",      values: ["yes", "no", "yes",     "no"] },
  { feature: "Bare-metal compute",      values: ["yes", "no", "no",      "no"] },
  { feature: "Scale-to-zero",           values: ["yes", "no", "no",      "partial"] },
  { feature: "EU data residency",       values: ["yes", "yes", "no",     "partial"] },
];

const compCols = ["DCDeploy", "Heroku", "Railway", "Render"];

const migrationCards = [
  { from: "Heroku",  time: "~15 min", subline: "Procfile + buildpacks → Dockerfile",       bullets: ["Auto-detect buildpack", "Import HEROKU_* env vars", "Postgres dump-and-restore"], accent: "from-[#6762A6] to-[#430098]" },
  { from: "Railway", time: "~10 min", subline: "railway.json → dcdeploy.yaml, auto-convert", bullets: ["Match service template", "Same git-push workflow", "Lower per-minute rate"],   accent: "from-[#13111C] to-[#52447b]" },
  { from: "Render",  time: "~12 min", subline: "render.yaml → dcdeploy.yaml",                bullets: ["Convert blueprint", "Free dynos don't sleep", "Disk volumes migrate too"],     accent: "from-[#46E3B7] to-[#0EA47A]" },
];

const promises = [
  { no: "No expiring free tier",      yes: "Basic is free forever. Run a hobby project for a decade if you want." },
  { no: "No surprise overage bills",  yes: "Hard caps and budget alerts. Hit the cap, we pause — we don't run up a bill." },
  { no: "No 'contact sales' tier",    yes: "Every plan is on the pricing page with a real number next to it." },
  { no: "No vendor-locked YAML",      yes: "Dockerfile or auto-detection. Everything works on any other platform tomorrow." },
];

function Mark({ value }: { value: "yes" | "no" | "partial" }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-red-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
      </span>
    );
  }
  return <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-50 text-amber-600 font-bold text-[14px]">~</span>;
}

function AnimatedDeploy() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < deployLines.length) {
      const id = setTimeout(() => setVisibleLines((n) => n + 1), 420);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setVisibleLines(0), 2800);
    return () => clearTimeout(id);
  }, [visibleLines]);

  const activeStepIdx = useMemo(() => {
    let active = -1;
    pipelineSteps.forEach((step, i) => {
      if (visibleLines > step.afterLine) active = i;
    });
    return active;
  }, [visibleLines]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Terminal */}
      <div className="lg:col-span-3 bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-auto text-[11px] text-slate-500 font-mono">~/my-saas</span>
        </div>
        <div className="p-6 md:p-7 font-mono text-[13px] leading-[1.8] min-h-[280px]">
          {deployLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={`${visibleLines === 0 ? "reset" : "run"}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={
                line.kind === "cmd"
                  ? "text-white font-bold"
                  : line.kind === "ok"
                  ? "text-green-400 font-bold mt-2"
                  : line.kind === "url"
                  ? "text-brand-light underline underline-offset-2"
                  : "text-slate-400"
              }
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines < deployLines.length && (
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} className="inline-block w-2 h-4 bg-brand-light mt-1" />
          )}
        </div>
      </div>
      {/* Pipeline */}
      <div className="lg:col-span-2 bg-[#1E293B]/60 border border-white/10 rounded-3xl backdrop-blur-md p-6 flex flex-col">
        <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-5">Pipeline</div>
        <div className="flex flex-col gap-3 flex-1">
          {pipelineSteps.map((step, i) => {
            const active = activeStepIdx >= i;
            const current = activeStepIdx === i && visibleLines < deployLines.length;
            return (
              <div key={step.label} className={`flex items-center gap-3 rounded-2xl px-3 py-3 border transition-all duration-300 ${active ? "bg-brand/20 border-brand/40 text-white" : "bg-white/5 border-white/5 text-slate-500"}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[16px] shrink-0 transition-all ${active ? "bg-brand text-white shadow-[0_0_16px_rgba(14,84,135,0.6)]" : "bg-white/5"}`}>
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0 text-[13px] font-bold">{step.label}</div>
                {current ? (
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                  </span>
                ) : active ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HomeV2() {
  const { currency } = useCurrency();
  const isINR = currency === "INR";
  const sym = isINR ? "\u20b9" : "$";
  const starterPrice = isINR ? "\u20b9425" : "$5";
  const starterCredit = isINR ? "\u20b9255" : "$3";

  return (
    <div className="bg-white text-text-body">
      {/* SECTION 1 — Hero */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-bg-blue-tint rounded-full blur-[120px] opacity-60 -z-10"></div>
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-bg-blue-tint border border-border-blue rounded-full px-3 py-1 text-[11px] font-bold text-brand uppercase tracking-widest mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
            EU-based · Free forever tier
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-[44px] md:text-[68px] font-heading font-extrabold text-text-heading leading-[1.02] tracking-[-0.025em] mb-8">
            Ship faster. <br />
            Pay less. <br />
            <span className="gradient-text">Sleep more.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-text-body leading-[1.65] max-w-xl mx-auto mb-12">
            A deploy platform for developers who'd rather ship than fight with infrastructure. Real bare metal, per-minute billing, free forever for side projects.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Get started free
            </Link>
            <Link href="/pricing" className="text-text-body font-semibold px-7 py-3.5 hover:text-brand transition-colors">
              See pricing &rarr;
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[12px] text-text-muted">
            No credit card · 1 always-on free service · &lt;300ms cold start
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 — Frameworks strip */}
      <section className="bg-bg-page border-y border-border-default py-20 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp} className="max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-6">
            Auto-detected · Dockerfile catch-all for the rest
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 mb-3">
            {["Next.js", "Django", "Rails", "Go", "Bun", "FastAPI", "Docker", "Rust", "Astro", "SvelteKit"].map((name) => (
              <span key={name} className="text-[18px] md:text-[20px] font-heading font-bold text-text-muted hover:text-text-heading transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
          <p className="text-[12px] text-text-muted">+ 17 more · <Link href="/preview/frameworks" className="text-brand font-bold hover:underline">see full list</Link></p>
        </motion.div>
      </section>

      {/* SECTION 3 — Three differentiators */}
      <section className="py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Three things make us different.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              No marketing fluff — just the parts that matter for the way you actually work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <motion.div key={d.title} variants={fadeUp} className={`relative bg-white border border-border-default rounded-3xl p-7 overflow-hidden hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_50px_rgba(14,84,135,0.1)] transition-all duration-300 group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${d.accent} opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                <div className="relative z-10">
                  <div className="text-[34px] mb-5 leading-none group-hover:scale-110 transition-transform origin-left">{d.icon}</div>
                  <h3 className="text-[20px] font-heading font-bold text-text-heading mb-3 leading-tight">{d.title}</h3>
                  <p className="text-[14px] text-text-muted leading-[1.7]">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 4 — Animated deploy demo */}
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.04] invert pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand/30 rounded-full blur-[120px]"></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-6xl mx-auto relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-6 backdrop-blur-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-green-300">Live demo</span>
            </div>
            <h2 className="text-[32px] md:text-[48px] font-heading font-extrabold leading-[1.05] mb-4">
              <span className="font-mono text-brand-light">git push</span>. That's the deploy.
            </h2>
            <p className="text-[15px] text-slate-400 max-w-lg mx-auto">
              No YAML to write, no pipelines to configure. We detect your stack and ship it.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <AnimatedDeploy />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 5 — Environments / clone production */}
      <section className="relative py-32 px-6 overflow-hidden bg-white">
        <div className="absolute top-[20%] right-[5%] w-[420px] h-[420px] bg-emerald-100 rounded-full blur-[140px] opacity-50 -z-10"></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Flagship · Environments as a service
            </div>
            <h2 className="text-[32px] md:text-[48px] font-heading font-bold text-text-heading leading-[1.05] tracking-[-0.015em] mb-4">
              Clone production. <br className="md:hidden" />
              <span className="gradient-text">Break things safely.</span>
            </h2>
            <p className="text-[16px] text-text-muted max-w-xl mx-auto leading-[1.6]">
              An environment isn't a config flag &mdash; it's your services, databases, secrets, volumes. Clone the whole thing in seconds.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch mb-10">
            {/* Parent */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="bg-white border-2 border-brand rounded-[24px] shadow-[0_20px_60px_rgba(14,84,135,0.12)] overflow-hidden h-full flex flex-col">
                <div className="bg-gradient-to-br from-[#073a61] to-[#0e5487] p-5 text-white relative overflow-hidden">
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Parent</span>
                      <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">Live</span>
                    </div>
                    <h3 className="text-[20px] font-heading font-extrabold">production</h3>
                  </div>
                </div>
                <div className="p-5 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">Services</div>
                  <div className="space-y-2">
                    {[
                      { name: "frontend", icon: "▲" },
                      { name: "api", icon: "🌐" },
                      { name: "worker", icon: "⚙️" },
                      { name: "postgres", icon: "🐘" },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center gap-2.5 bg-bg-blue-tint/50 border border-border-blue rounded-lg px-3 py-1.5">
                        <span className="text-[14px]">{s.icon}</span>
                        <span className="text-[12px] font-mono font-bold text-text-heading">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clones */}
            <motion.div variants={fadeUp} className="lg:col-span-3 flex flex-col gap-3 justify-center">
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px bg-border-default flex-1"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">cloned in seconds</span>
                <div className="h-px bg-border-default flex-1"></div>
              </div>
              {clones.map((c) => (
                <div key={c.name} className="group flex items-stretch bg-white border border-border-default rounded-2xl overflow-hidden hover:border-brand hover:shadow-[0_8px_24px_rgba(14,84,135,0.08)] transition-all">
                  <div className={`w-1.5 bg-gradient-to-b ${c.color}`}></div>
                  <div className="flex-1 p-3.5 flex items-center gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-mono font-bold text-text-heading truncate">{c.name}</div>
                      <div className="text-[11px] text-text-muted">{c.purpose}</div>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-mono shrink-0">
                      <span className="text-text-muted">{c.age}</span>
                      <span className="text-brand font-bold">{c.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Use case chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {cloneUseCases.map((u) => (
              <span key={u} className="text-[12px] font-bold text-text-body bg-bg-blue-tint border border-border-blue rounded-full px-3 py-1.5">{u}</span>
            ))}
          </motion.div>

          {/* CLI */}
          <motion.div variants={fadeUp} className="bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <div className="p-5 font-mono text-[12px] leading-[1.8]">
              <div className="text-white font-bold">$ dcd env clone production --to load-test</div>
              <div className="text-slate-400">→ Cloning 4 services + Postgres snapshot...</div>
              <div className="text-green-400 font-bold">✔ Ready in 3.2s · <span className="text-brand-light">load-test.acme.dcdeploy.app</span></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 6 — Scale-to-zero lifecycle */}
      <section className="bg-bg-page border-y border-border-default py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="text-[12px]">💤</span>
              Scale-to-zero on microVMs
            </div>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Sleep when idle. <span className="gradient-text">Wake instantly.</span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-xl mx-auto leading-[1.6]">
              Idle services suspend to disk and cold-start in under 300ms. That's how the free tier stays free.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#0B1220] border border-[#1E293B] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] mb-10">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white">Service lifecycle</span>
              <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold border border-green-500/30">LIVE</span>
            </div>
            <div className="p-6 font-mono text-[12px] leading-[1.85]">
              {lifecycleLog.map((line, i) => (
                <div key={i} className={line.style}>
                  <span className="text-slate-600">{line.t}</span> {line.txt}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {lifecycleSteps.map((s) => (
              <motion.div key={s.n} variants={fadeUp} className="bg-white border border-border-default rounded-2xl p-5 hover:border-indigo-300 transition-colors">
                <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-2">Step {s.n}</div>
                <h4 className="text-[14px] font-bold text-text-heading mb-1 leading-tight">{s.title}</h4>
                <p className="text-[12px] text-text-muted leading-[1.55]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 7 — Use cases / personas */}
      <section className="py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Built for the way <span className="gradient-text">you ship.</span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              Indie hackers, agencies, startups, side-project tinkerers — sized for the way real engineers work.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {personas.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className={`relative bg-white border ${p.border} rounded-3xl p-7 overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(14,84,135,0.08)] transition-all duration-300 group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
                <div className="relative z-10 flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="text-[32px] mb-3 leading-none">{p.icon}</div>
                    <h3 className="text-[20px] font-heading font-bold text-text-heading mb-2 leading-tight">{p.title}</h3>
                    <p className="text-[14px] text-text-body leading-[1.6]">{p.pitch}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[20px] font-heading font-extrabold text-text-heading leading-none">{p.metric}</div>
                    <div className="text-[10px] text-text-muted mt-1 leading-tight max-w-[110px]">{p.metricSub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 8 — Comparison */}
      <section className="bg-bg-page border-y border-border-default py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              See how we <span className="gradient-text">stack up.</span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              Honest, factual side-by-side. No marketing fluff — just what each platform does today.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-[24px] shadow-[0_8px_24px_rgba(14,84,135,0.06)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-border-default bg-bg-blue-tint/40">
                    <th className="px-5 py-4 text-[11px] font-bold text-text-muted uppercase tracking-widest w-[36%]">Feature</th>
                    {compCols.map((col, i) => (
                      <th key={col} className={`px-3 py-4 text-center ${i === 0 ? "bg-brand/5" : ""}`}>
                        <span className={`text-[13px] font-bold ${i === 0 ? "text-brand" : "text-text-heading"}`}>{col}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, ri) => (
                    <tr key={row.feature} className={`border-b border-border-default last:border-b-0 hover:bg-bg-blue-tint/20 transition-colors ${ri % 2 === 0 ? "bg-white" : "bg-[#FBFCFE]"}`}>
                      <td className="px-5 py-3.5 text-[14px] font-semibold text-text-heading">{row.feature}</td>
                      {row.values.map((v, vi) => (
                        <td key={vi} className={`px-3 py-3.5 text-center ${vi === 0 ? "bg-brand/5" : ""}`}>
                          <Mark value={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-[12px] text-text-muted">
            <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-700"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>Full support</span>
            <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px]">~</span>Partial</span>
            <span className="flex items-center gap-1.5"><span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-50 text-red-500"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>Not supported</span>
            <span className="opacity-70">·</span>
            <Link href="/preview/comparison" className="text-brand font-bold hover:underline">See 11-row version &rarr;</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 9 — Migration recipes */}
      <section className="py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-6">
              <span className="text-[12px]">🚚</span>
              Switching is fast
            </div>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Already on a deploy platform? <br className="hidden md:block" />
              <span className="gradient-text">Switch in minutes.</span>
            </h2>
            <p className="text-[15px] text-text-muted max-w-xl mx-auto">
              CLI commands read your existing config and emit a working DCDeploy setup. You stay in git.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {migrationCards.map((r) => (
              <motion.div key={r.from} variants={fadeUp} className="bg-white border border-border-default rounded-[24px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,84,135,0.1)] transition-all duration-300 flex flex-col">
                <div className={`bg-gradient-to-br ${r.accent} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">From</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full backdrop-blur-md">{r.time}</span>
                    </div>
                    <h3 className="text-[24px] font-heading font-extrabold mb-1">{r.from}</h3>
                    <p className="text-[12px] opacity-80 leading-[1.5]">{r.subline}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <ul className="space-y-2.5 mb-5">
                    {r.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2.5 text-[13px] text-text-body">
                        <span className="w-4 h-4 rounded-full bg-brand-pale text-brand text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/preview/migration" className="text-brand text-[12px] font-bold inline-flex items-center gap-1 mt-auto hover:gap-2 transition-all">
                    Full recipe &rarr;
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 10 — Pricing */}
      <section className="bg-bg-page border-y border-border-default py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Simple, transparent pricing.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto mb-8">
              Free forever for one service. Per-minute billing when you scale up.
            </p>
            <CurrencyToggle size="sm" />
          </motion.div>
          <motion.div variants={fadeUp} className="bg-white border-2 border-brand rounded-[28px] p-8 md:p-10 mb-5 relative overflow-hidden shadow-[0_8px_24px_rgba(14,84,135,0.08)]">
            <div className="absolute top-5 right-5 bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Free forever</div>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-text-heading mb-2">Basic</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[56px] font-heading font-extrabold text-text-heading leading-none">{sym}0</span>
                  <span className="text-text-muted text-[14px]">/forever</span>
                </div>
                <p className="text-[14px] text-text-body leading-[1.6] max-w-md">
                  1 always-on service · DCD-1 microVM · Deploy from any source · <code className="font-mono text-brand">*.dcdeploy.app</code> subdomain with HTTPS · No credit card.
                </p>
              </div>
              <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-bold px-7 py-3.5 rounded-full hover:bg-[#e5a515] transition-colors whitespace-nowrap shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
                Start free &rarr;
              </Link>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[18px] font-bold text-text-heading">Starter</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-pale text-brand px-2 py-0.5 rounded-full">Most popular</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[32px] font-heading font-extrabold text-brand leading-none">{starterPrice}</span>
                <span className="text-text-muted text-[13px]">/month</span>
              </div>
              <p className="text-[13px] text-text-muted leading-[1.6] mb-5">
                +{starterCredit} compute credit. Always-on VMs. 2 custom domains. DCD-1 / DCD-2 sizes.
              </p>
              <Link href="/pricing" className="text-brand text-[13px] font-bold hover:text-brand-hover inline-flex items-center gap-1 hover:gap-2 transition-all">
                Plan details &rarr;
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[18px] font-bold text-text-heading">Pro</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">For teams</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[32px] font-heading font-extrabold text-text-heading leading-none">{sym}0+</span>
                <span className="text-text-muted text-[13px]">wallet · per-min compute</span>
              </div>
              <p className="text-[13px] text-text-muted leading-[1.6] mb-5">
                Prepaid wallet. Unlimited services. All machine sizes. Autoscaling. 99.5% SLA.
              </p>
              <Link href="/pricing" className="text-brand text-[13px] font-bold hover:text-brand-hover inline-flex items-center gap-1 hover:gap-2 transition-all">
                Plan details &rarr;
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 11 — Honesty / no-BS */}
      <section className="py-32 px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-6">No BS</div>
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              The fine print, in big letters.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              Four things we promise not to do — written down so we can be held to them.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promises.map((p) => (
              <motion.div key={p.no} variants={fadeUp} className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </div>
                  <h3 className="text-[16px] font-heading font-bold text-text-heading leading-tight">{p.no}</h3>
                </div>
                <div className="flex items-start gap-3 pl-9">
                  <p className="text-[13px] text-text-muted leading-[1.6]">{p.yes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 12 — Final CTA */}
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/30 rounded-full blur-[140px]"></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 variants={fadeUp} className="text-[40px] md:text-[60px] font-heading font-extrabold leading-[1.05] tracking-[-0.02em] mb-6">
            Ready when <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">you are.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[17px] text-slate-300 mb-10 max-w-md mx-auto leading-[1.65]">
            One service, free forever. Upgrade when you outgrow it. Cancel whenever.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-semibold px-8 py-4 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Get started free
            </Link>
            <Link href="/contact" className="text-slate-300 font-semibold px-7 py-4 hover:text-white transition-colors">
              Talk to us &rarr;
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-[12px] text-slate-500">
            No credit card · ~5s typical deploy · Cancel anytime
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
