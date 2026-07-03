"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { CurrencyToggle, useCurrency } from "../../lib/currency";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const audiences = [
  "Indie hackers",
  "Startup teams",
  "Agency teams",
  "API builders",
  "Bot makers",
  "DevOps-light teams",
];

const problems = [
  "Free tiers expire or sleep unpredictably",
  "Local environments drift from production",
  "Testing database migrations is risky",
  "Cloud pricing feels impossible to predict",
];

const fixes = [
  "Free forever service on a real microVM",
  "Clone production to test real scenarios safely",
  "Per-minute billing with hard spending caps",
  "Bare-metal performance without DevOps work",
];

const lifecycle = [
  {
    n: "01",
    title: "Connect",
    body: "Import a repo or Docker image. We detect framework, build command, ports and health checks.",
  },
  {
    n: "02",
    title: "Deploy",
    body: "We build, snapshot a microVM, attach logs/metrics, and route traffic to a live URL.",
  },
  {
    n: "03",
    title: "Clone",
    body: "Fork production into isolated environments for PR previews, demos, migrations and load tests.",
  },
];

const codeTabs = {
  deploy: {
    label: "Deploy",
    code: `$ git push dcdeploy main
→ Detected: Next.js 14
→ Building image... 1.2s
→ Snapshotting microVM... 187ms
→ Routing fra1 traffic to v2

✔ Live in 4.6s
https://my-saas.dcdeploy.app`,
  },
  clone: {
    label: "Clone env",
    code: `$ dcd env clone production --to pr-142
→ Cloning 3 services
→ Snapshotting Postgres... 412ms
→ Snapshotting microVMs... 187ms
→ Generating isolated env vars

✔ Ready in 3.2s
https://pr-142.acme.dcdeploy.app`,
  },
  logs: {
    label: "Logs",
    code: `$ dcd logs api --follow
[12:44:01] GET /              200 OK 42ms
[12:44:02] GET /api/user      200 OK 18ms
[12:44:03] POST /api/webhook  202    115ms
[12:44:04] GET /dashboard     200 OK 23ms

▼ streaming...`,
  },
};

const features = [
  { title: "Bare-metal compute", body: "AMD EPYC + Intel Gold on NVMe, shaped into microVMs.", icon: "🏗️" },
  { title: "Scale-to-zero", body: "Idle services suspend and resume in under 300ms.", icon: "💤" },
  { title: "Environment cloning", body: "Clone services, databases, secrets and volumes in seconds.", icon: "🌱" },
  { title: "Per-minute billing", body: "Pay for active compute minutes. Hard caps keep invoices sane.", icon: "⏱️" },
  { title: "Custom domains", body: "Managed SSL and domain routing without proxy gymnastics.", icon: "🌐" },
  { title: "Logs & metrics", body: "Runtime logs, CPU/RAM, p99 latency and cost meter in one place.", icon: "📈" },
];

const capabilities = [
  {
    title: "SaaS apps",
    label: "Web",
    body: "Next.js, Django, Rails or Laravel apps with database-backed sessions and background workers.",
    bullets: ["Managed HTTPS", "Custom domains", "Rollback snapshots"],
  },
  {
    title: "APIs & workers",
    label: "Backend",
    body: "Long-running API servers, queues, bots and webhook routers that shouldn't hit function timeouts.",
    bullets: ["Always-on option", "MicroVM isolation", "Per-minute compute"],
  },
  {
    title: "PR previews",
    label: "Teams",
    body: "Every pull request can get a full cloned environment instead of a static frontend-only preview.",
    bullets: ["Cloned DB snapshot", "Isolated secrets", "Auto-destroy"],
  },
  {
    title: "Migration rehearsal",
    label: "Safety",
    body: "Clone prod, run risky schema changes, validate traffic, then discard or promote.",
    bullets: ["Copy-on-write volumes", "Fast rollback", "No user impact"],
  },
];

export default function HomeV3() {
  const [tab, setTab] = useState<keyof typeof codeTabs>("deploy");
  const { currency } = useCurrency();
  const isINR = currency === "INR";
  const sym = isINR ? "₹" : "$";
  const starterPrice = isINR ? "₹425" : "$5";
  const starterCredit = isINR ? "₹255" : "$3";

  return (
    <div className="bg-white text-text-body">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#e7f2f9,transparent_45%),linear-gradient(180deg,#ffffff,rgba(248,250,255,0.7))]"></div>
        <div className="absolute inset-0 circuit-pattern opacity-60"></div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/80 border border-border-blue text-brand rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
              Deploy · Clone · Scale · Sleep
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[48px] md:text-[76px] font-heading font-extrabold text-text-heading leading-[0.96] tracking-[-0.04em] mb-8">
              PAAS FOR
              <br />
              DEVELOPERS
              <br />
              <span className="gradient-text">WHO SHIP.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-[18px] md:text-[20px] text-text-body max-w-xl leading-[1.65] mb-10">
              Deploy apps on bare metal without DevOps. Free forever for side projects, per-minute billing when you grow, and full environment cloning when you need to test safely.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-bold px-8 py-4 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)] text-center">
                Sign up free
              </Link>
              <Link href="/docs" className="bg-white border border-border-default text-text-heading font-bold px-8 py-4 rounded-full hover:border-brand hover:text-brand hover:-translate-y-0.5 transition-all text-center">
                Read the docs
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(14,84,135,0.25)]">
              <div className="flex items-center gap-1.5 px-5 py-4 border-b border-white/10 bg-black/20">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="ml-auto text-[11px] text-slate-500 font-mono">~/dcdeploy</span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.8]">
                <div className="text-white font-bold">$ dcd deploy</div>
                <div className="text-slate-400 mt-2">→ Detected FastAPI + Postgres</div>
                <div className="text-slate-400">→ Building on bare metal...</div>
                <div className="text-slate-400">→ Snapshotting microVM...</div>
                <div className="text-green-400 font-bold mt-3">✔ Live in 5.1s</div>
                <div className="text-brand-light underline underline-offset-2">https://api.dcdeploy.app</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* AUDIENCE CHIPS */}
      <section className="bg-white border-y border-border-default px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3">
          {audiences.map((item) => (
            <span key={item} className="bg-bg-blue-tint border border-border-blue text-brand rounded-full px-4 py-2 text-[13px] font-bold">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* PROBLEM / FIX */}
      <section className="bg-bg-page px-6 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="text-[12px] font-bold uppercase tracking-widest text-brand mb-3">Problem / Fix</div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading leading-[1.08] tracking-[-0.025em]">
              Cloud shouldn't feel like a trap.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-[28px] p-8">
              <div className="text-[13px] font-bold uppercase tracking-widest text-red-600 mb-6">Traditional PaaS</div>
              <div className="space-y-4">
                {problems.map((item) => (
                  <div key={item} className="flex gap-3 text-[15px] text-text-body">
                    <span className="text-red-500 font-bold text-[18px] leading-none">−</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#073a61] to-[#0e5487] border border-brand text-white rounded-[28px] p-8 shadow-[0_20px_60px_rgba(14,84,135,0.2)]">
              <div className="text-[13px] font-bold uppercase tracking-widest text-brand-light mb-6">DCDeploy</div>
              <div className="space-y-4">
                {fixes.map((item) => (
                  <div key={item} className="flex gap-3 text-[15px] text-white">
                    <span className="text-[#fcb817] font-bold text-[18px] leading-none">+</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* LIFECYCLE */}
      <section className="bg-white px-6 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="text-[12px] font-bold uppercase tracking-widest text-brand mb-3">Lifecycle</div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading leading-[1.08] tracking-[-0.025em]">
              Connect to deploy to clone.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {lifecycle.map((step) => (
              <motion.div key={step.n} variants={fadeUp} className="relative bg-white border border-border-default rounded-[28px] p-8 hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_50px_rgba(14,84,135,0.08)] transition-all">
                <div className="text-[48px] font-heading font-extrabold text-brand/15 mb-6 leading-none">{step.n}</div>
                <h3 className="text-[24px] font-heading font-bold text-text-heading mb-3">{step.title}</h3>
                <p className="text-[14px] text-text-muted leading-[1.7]">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CODE TABS */}
      <section className="bg-[#0F172A] px-6 py-28 text-white overflow-hidden relative">
        <div className="absolute inset-0 circuit-pattern opacity-[0.04] invert"></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="relative z-10 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-light text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
              API + CLI first
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-extrabold leading-[1.08] mb-4">
              Everything has a command.
            </h2>
            <p className="text-[15px] text-slate-400 max-w-lg mx-auto">
              Deploy, clone, tail logs, scale and rollback without opening a browser.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {(Object.keys(codeTabs) as Array<keyof typeof codeTabs>).map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
                    tab === key ? "bg-brand text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  {codeTabs[key].label}
                </button>
              ))}
            </div>
            <div className="bg-[#0B1220] border border-white/10 rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-1.5 px-5 py-4 border-b border-white/10 bg-black/30">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <pre className="p-7 md:p-9 font-mono text-[13px] leading-[1.8] text-slate-200 whitespace-pre-wrap overflow-x-auto"><code>{codeTabs[tab].code}</code></pre>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="bg-bg-page px-6 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="text-[12px] font-bold uppercase tracking-widest text-brand mb-3">Features</div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading leading-[1.08] tracking-[-0.025em]">
              The parts developers actually use.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeUp} className="bg-white border border-border-default rounded-[24px] p-7 hover:border-brand hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,84,135,0.08)] transition-all">
                <div className="text-[30px] mb-4">{feature.icon}</div>
                <h3 className="text-[18px] font-heading font-bold text-text-heading mb-2">{feature.title}</h3>
                <p className="text-[14px] text-text-muted leading-[1.7]">{feature.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-white px-6 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <div className="text-[12px] font-bold uppercase tracking-widest text-brand mb-3">Capabilities</div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading leading-[1.08] tracking-[-0.025em]">
              Built for real workloads.
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((cap) => (
              <motion.div key={cap.title} variants={fadeUp} className="bg-white border border-border-default rounded-[28px] p-8 hover:border-brand transition-colors">
                <div className="bg-brand-pale text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-5">{cap.label}</div>
                <h3 className="text-[24px] font-heading font-bold text-text-heading mb-3">{cap.title}</h3>
                <p className="text-[14px] text-text-muted leading-[1.7] mb-5">{cap.body}</p>
                <ul className="space-y-2">
                  {cap.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-[13px] font-medium text-text-body">
                      <span className="w-4 h-4 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PRICING */}
      <section className="bg-bg-page border-y border-border-default px-6 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger} className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="text-[12px] font-bold uppercase tracking-widest text-brand mb-3">Pricing</div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading leading-[1.08] tracking-[-0.025em] mb-5">
              Start free. Scale predictably.
            </h2>
            <CurrencyToggle size="sm" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-[28px] p-7">
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-4">Basic</div>
              <div className="text-[42px] font-heading font-extrabold text-text-heading leading-none mb-2">{sym}0</div>
              <p className="text-[13px] text-text-muted mb-6">Free forever. One service. No credit card.</p>
              <Link href="https://dash.dcdeploy.com" className="block w-full text-center bg-white border border-border-default text-text-heading font-bold py-3 rounded-full hover:border-brand hover:text-brand transition-all">Start free</Link>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white border-2 border-brand rounded-[28px] p-7 shadow-[0_20px_50px_rgba(14,84,135,0.12)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Most popular</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-brand mb-4">Starter</div>
              <div className="text-[42px] font-heading font-extrabold text-brand leading-none mb-2">{starterPrice}</div>
              <p className="text-[13px] text-text-muted mb-6">+{starterCredit} usage credit, always-on VMs, 2 custom domains.</p>
              <Link href="https://dash.dcdeploy.com" className="block w-full text-center bg-[#fcb817] text-[#0F172A] font-bold py-3 rounded-full hover:bg-[#e5a515] transition-all">Choose Starter</Link>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white border border-border-default rounded-[28px] p-7">
              <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-4">Pro</div>
              <div className="text-[42px] font-heading font-extrabold text-text-heading leading-none mb-2">{sym}0+</div>
              <p className="text-[13px] text-text-muted mb-6">Prepaid wallet, unlimited services, SLA and team controls.</p>
              <Link href="/pricing" className="block w-full text-center bg-white border border-border-default text-text-heading font-bold py-3 rounded-full hover:border-brand hover:text-brand transition-all">See details</Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="relative bg-[#0F172A] px-6 py-28 text-white overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand/30 rounded-full blur-[140px]"></div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2 variants={fadeUp} className="text-[40px] md:text-[60px] font-heading font-extrabold leading-[1.05] tracking-[-0.02em] mb-6">
            Start shipping on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">DCDeploy.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[17px] text-slate-300 mb-10 max-w-md mx-auto leading-[1.65]">
            One service, free forever. Upgrade when you outgrow it. Cancel whenever.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-semibold px-8 py-4 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Get started free
            </Link>
            <Link href="/contact" className="text-slate-300 font-semibold px-7 py-4 hover:text-white transition-colors">
              Talk to us →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
