"use client";

import Link from "next/link";
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
  {
    icon: "🏗️",
    title: "Real bare metal",
    desc: "AMD EPYC + Intel Gold on NVMe. Your service owns its slice of metal — predictable latency, no noisy neighbours.",
  },
  {
    icon: "💤",
    title: "Scale-to-zero on free",
    desc: "MicroVMs suspend when idle and cold-start in under 300ms. That's how the free tier stays free, forever.",
  },
  {
    icon: "🌱",
    title: "Clone production",
    desc: "Spin up a full isolated copy of your stack — services, databases, secrets — in seconds. Test risky changes, throw the clone away.",
  },
];

const deployBenefits = [
  { t: "Auto-detect 40+ frameworks", d: "Push a repo, we figure out the build." },
  { t: "Under 5 seconds, typical", d: "Build + snapshot + route, end-to-end." },
  { t: "Live URL on every push", d: "Share with your team immediately." },
  { t: "One-click rollback", d: "Snapshot-based, no rebuild." },
];

const promises = [
  { no: "No expiring free tier", yes: "Basic is free forever. Run a hobby project for a decade if you want." },
  { no: "No surprise overage bills", yes: "Hard caps and budget alerts. Hit the cap, we pause new minutes — we don't run up a bill." },
  { no: "No 'contact sales' tier", yes: "Every plan is on the pricing page with a real number next to it." },
  { no: "No vendor-locked YAML", yes: "Dockerfile or auto-detection. Everything you write here works on any other platform tomorrow." },
];

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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-bg-blue-tint rounded-full blur-[120px] opacity-50 -z-10"></div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-bg-blue-tint border border-border-blue rounded-full px-3 py-1 text-[11px] font-bold text-brand uppercase tracking-widest mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
            EU-based · Free forever tier
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] md:text-[68px] font-heading font-extrabold text-text-heading leading-[1.02] tracking-[-0.025em] mb-8"
          >
            Ship faster. <br />
            Pay less. <br />
            <span className="gradient-text">Sleep more.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] text-text-body leading-[1.65] max-w-xl mx-auto mb-12"
          >
            A deploy platform for developers who'd rather ship than fight with infrastructure. Real bare metal, per-minute billing, free forever for side projects.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Link
              href="https://dash.dcdeploy.com"
              className="bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]"
            >
              Get started free
            </Link>
            <Link
              href="/pricing"
              className="text-text-body font-semibold px-7 py-3.5 hover:text-brand transition-colors"
            >
              See pricing &rarr;
            </Link>
          </motion.div>

          <motion.p variants={fadeUp} className="text-[12px] text-text-muted">
            No credit card · 1 always-on free service · &lt;300ms cold start
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 — Your stack + 3 differentiators */}
      <section className="bg-bg-page border-y border-border-default py-32 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Stack strip */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-6">
              Auto-detected · Dockerfile catch-all for the rest
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {["Next.js", "Django", "Rails", "Go", "Bun", "FastAPI", "Docker", "Rust"].map((name) => (
                <span
                  key={name}
                  className="text-[18px] md:text-[20px] font-heading font-bold text-text-muted hover:text-text-heading transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="mt-24"
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
                Three things make us different.
              </h2>
              <p className="text-[15px] text-text-muted max-w-lg mx-auto">
                No marketing fluff — just the parts that matter for the way you actually work.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {differentiators.map((d) => (
                <motion.div key={d.title} variants={fadeUp} className="text-center md:text-left">
                  <div className="text-[36px] mb-5 leading-none">{d.icon}</div>
                  <h3 className="text-[20px] font-heading font-bold text-text-heading mb-3 leading-tight">
                    {d.title}
                  </h3>
                  <p className="text-[14px] text-text-muted leading-[1.7]">{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — git push, done */}
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              <span className="font-mono">git push</span>. That's the deploy.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              No YAML to write, no pipelines to configure. We detect your stack and run the deploy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-3">
              <div className="bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(14,84,135,0.15)]">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="ml-auto text-[11px] text-slate-500 font-mono">~/my-saas</span>
                </div>
                <div className="p-6 md:p-7 font-mono text-[13px] leading-[1.8]">
                  <div className="text-white font-bold">$ git push dcdeploy main</div>
                  <div className="text-slate-400 mt-2">→ Detected: Next.js 14</div>
                  <div className="text-slate-400">→ Building image... <span className="text-green-400">1.2s</span></div>
                  <div className="text-slate-400">→ Snapshotting microVM... <span className="text-green-400">187ms</span></div>
                  <div className="text-slate-400">→ Routing fra1 traffic to v2</div>
                  <div className="text-green-400 font-bold mt-3">✔ Live in 4.6s</div>
                  <div className="text-brand-light mt-1 underline underline-offset-2">https://my-saas.dcdeploy.app</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              {deployBenefits.map((b) => (
                <div key={b.t} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text-heading leading-tight mb-1">{b.t}</div>
                    <div className="text-[13px] text-text-muted leading-[1.5]">{b.d}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4 — Pricing */}
      <section className="bg-bg-page border-y border-border-default py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              Simple, transparent pricing.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto mb-8">
              Free forever for one service. Per-minute billing when you scale up.
            </p>
            <CurrencyToggle size="sm" />
          </motion.div>

          {/* Free tier highlight */}
          <motion.div
            variants={fadeUp}
            className="bg-white border-2 border-brand rounded-[28px] p-8 md:p-10 mb-5 relative overflow-hidden shadow-[0_8px_24px_rgba(14,84,135,0.08)]"
          >
            <div className="absolute top-5 right-5 bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Free forever
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-text-heading mb-2">Basic</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[56px] font-heading font-extrabold text-text-heading leading-none">
                    {sym}0
                  </span>
                  <span className="text-text-muted text-[14px]">/forever</span>
                </div>
                <p className="text-[14px] text-text-body leading-[1.6] max-w-md mb-0">
                  1 always-on service · DCD-1 microVM (250 MB RAM, 1 vCPU) · Deploy from any source · <code className="font-mono text-brand">*.dcdeploy.app</code> subdomain with HTTPS · No credit card required.
                </p>
              </div>
              <Link
                href="https://dash.dcdeploy.com"
                className="bg-[#fcb817] text-[#0F172A] font-bold px-7 py-3.5 rounded-full hover:bg-[#e5a515] transition-colors whitespace-nowrap shadow-[0_4px_14px_rgba(252,184,23,0.35)]"
              >
                Start free &rarr;
              </Link>
            </div>
          </motion.div>

          {/* 2-plan strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={fadeUp}
              className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[18px] font-bold text-text-heading">Starter</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-pale text-brand px-2 py-0.5 rounded-full">
                  Most popular
                </span>
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

            <motion.div
              variants={fadeUp}
              className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors"
            >
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="text-[18px] font-bold text-text-heading">Pro</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                  For teams
                </span>
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

      {/* SECTION 5 — Honesty */}
      <section className="py-32 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[44px] font-heading font-bold text-text-heading leading-[1.1] tracking-[-0.015em] mb-4">
              The fine print, in big letters.
            </h2>
            <p className="text-[15px] text-text-muted max-w-lg mx-auto">
              Four things we promise not to do — written down so we can be held to them.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promises.map((p) => (
              <motion.div
                key={p.no}
                variants={fadeUp}
                className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand transition-colors"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
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

      {/* SECTION 6 — Final CTA */}
      <section className="py-32 px-6 bg-bg-page border-t border-border-default">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[40px] md:text-[56px] font-heading font-extrabold text-text-heading leading-[1.05] tracking-[-0.02em] mb-6"
          >
            Ready when you are.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[17px] text-text-muted mb-10 max-w-md mx-auto leading-[1.6]">
            One service, free forever. Upgrade when you outgrow it. Cancel whenever.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="https://dash.dcdeploy.com"
              className="bg-[#fcb817] text-[#0F172A] font-semibold px-8 py-4 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]"
            >
              Get started free
            </Link>
            <Link
              href="/contact"
              className="text-text-body font-semibold px-7 py-4 hover:text-brand transition-colors"
            >
              Talk to us &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
