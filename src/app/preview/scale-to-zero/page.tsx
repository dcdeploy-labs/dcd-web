"use client";

import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";
import { useCurrency } from "../../../lib/currency";

const steps = [
  {
    n: "01",
    title: "Run on a microVM",
    desc: "Every service boots into its own microVM. Kernel-level isolation, NVMe-backed root, no noisy neighbours.",
  },
  {
    n: "02",
    title: "Watch for idle traffic",
    desc: "Once your service stops receiving requests for the configured idle window, we mark it for suspend.",
  },
  {
    n: "03",
    title: "Snapshot to disk",
    desc: "Memory state is captured to fast local NVMe in a few hundred milliseconds. Zero CPU consumed after.",
  },
  {
    n: "04",
    title: "Resume on demand",
    desc: "An incoming request triggers restore from the snapshot. First byte typically lands in under 300ms.",
  },
];

const benefits = [
  {
    title: "Free really stays free",
    desc: "Idle hobby projects don't quietly burn platform capacity, so we can afford to keep the free tier free.",
  },
  {
    title: "Predictable cold-starts",
    desc: "Snapshot-restore makes first-byte latency a known quantity. No 'cold container' surprises.",
  },
  {
    title: "Stronger isolation",
    desc: "MicroVMs give kernel-level isolation, not just container namespaces. Tenants can't see each other.",
  },
  {
    title: "Same primitive for builds & jobs",
    desc: "The same microVM runtime powers builds, cron jobs, and on-demand workers across the platform.",
  },
];

export default function ScaleToZeroPreview() {
  const { currency } = useCurrency();
  const starterPrice = currency === "INR" ? "\u20b9425/mo" : "$5/mo";

  return (
    <PreviewShell
      eyebrow="Scale-to-zero"
      title="Sleep when idle. Wake instantly."
      description="A dedicated section explaining how DCDeploy's scale-to-zero works today, on microVMs. Replaces the older 'roadmap' framing \u2014 this is current platform functionality, not a teaser."
      status="ready"
    >
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert"></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-brand/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-[#4da1db]/20 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-light text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-light"></span>
              How idle services work
            </div>
            <h2 className="text-[44px] md:text-[64px] font-heading font-extrabold leading-[1.05] mb-6 max-w-3xl">
              Sleep when idle. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">Wake instantly.</span>
            </h2>
            <p className="text-[18px] text-slate-300 max-w-2xl leading-[1.8]">
              Every service runs in its own microVM. When traffic goes quiet, we snapshot the memory and suspend compute. When a request lands, we restore in under 300ms &mdash; so your free service can sit at zero cost without going dark.
            </p>
          </div>

          {/* Lifecycle demo */}
          <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-white">Service lifecycle</span>
              <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold border border-green-500/30">LIVE</span>
            </div>
            <div className="p-6 md:p-8 font-mono text-[13px] leading-relaxed">
              <div className="text-slate-300 mb-1">[00:00:00] Service <span className="text-brand-light">my-bot</span> running on a microVM</div>
              <div className="text-slate-300 mb-1">[00:05:00] No traffic for 5 min &rarr; <span className="text-amber-300">snapshot &amp; suspend</span></div>
              <div className="text-slate-500 mb-1">[06:00:00] &hellip; (zero compute consumed) &hellip;</div>
              <div className="text-slate-300 mb-1">[12:34:56] Incoming request &rarr; <span className="text-brand-light">restore from snapshot in 187ms</span></div>
              <div className="text-green-400">[12:34:57] Response sent &mdash; 200 OK</div>
            </div>
          </div>

          {/* How it works steps */}
          <div className="mb-16">
            <h3 className="text-[24px] font-heading font-bold text-white mb-8 text-center">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => (
                <div key={step.n} className="bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-brand-light/40 transition-colors">
                  <div className="text-[12px] font-bold uppercase tracking-widest text-brand-light mb-3">Step {step.n}</div>
                  <h4 className="text-[16px] font-bold text-white mb-2 leading-tight">{step.title}</h4>
                  <p className="text-[13px] text-slate-400 leading-[1.5]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why microVMs */}
          <div className="mb-16">
            <h3 className="text-[24px] font-heading font-bold text-white mb-8 text-center">Why microVMs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-brand-light/40 transition-colors">
                  <h4 className="text-[16px] font-bold text-white mb-2">{b.title}</h4>
                  <p className="text-[14px] text-slate-400 leading-[1.6]">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* When you need always-on */}
          <div className="bg-gradient-to-br from-brand/15 to-transparent border border-brand/30 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
            <h3 className="text-[20px] font-bold text-white mb-6">When you don't want idle sleep</h3>
            <ul className="space-y-4 text-[14px] text-slate-300 leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-brand-light font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">Latency-sensitive APIs:</strong> if you can't tolerate even a 300ms cold-start on the first request, opt into always-on per service on <Link href="/pricing" className="text-brand-light font-bold underline underline-offset-2 hover:text-white">Starter ({starterPrice})</Link> or Pro.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-light font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">Long-lived connections:</strong> WebSocket and SSE workloads can be pinned to always-on so existing clients aren't dropped.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-light font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">Scheduled jobs &amp; crons:</strong> cron services are scheduled separately &mdash; they wake on their schedule, run, and suspend again, regardless of idle policy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand-light font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">Idle window is configurable:</strong> per-service, from a few minutes up to never-sleep. Default for Basic is conservative; Starter and Pro default to always-on.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Insert as a new section right after the Free Tier Spotlight on the home page &mdash; that's where users start to wonder &ldquo;wait, how can this be free forever?&rdquo;.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>The lifecycle log block could be replaced with a real asciinema or terminal recording from a production service if we want to dial up trust.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>The &ldquo;187ms restore&rdquo; number in the log should be sourced from the actual platform metric so it stays honest. Consider wiring it to a build-time constant fetched from your stats source.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Pair with the <Link href="/preview/infra" className="text-brand font-bold underline underline-offset-2 hover:text-brand-hover">Honest infrastructure</Link> section &mdash; both lean on the microVM story, and together they answer &ldquo;what kind of platform is this, really?&rdquo;.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
