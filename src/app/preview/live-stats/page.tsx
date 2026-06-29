"use client";

import { motion } from "framer-motion";
import { PreviewShell } from "../../../components/preview/PreviewShell";
import { CountUp } from "../../../components/preview/CountUp";

const stats = [
  {
    label: "Requests served",
    value: 18_472_390,
    suffix: "",
    sub: "Across all customer workloads, last 30 days",
    accent: "from-blue-500/20 to-blue-500/0",
    color: "text-brand",
  },
  {
    label: "Deployments",
    value: 12_840,
    suffix: "",
    sub: "Successful production deploys this month",
    accent: "from-green-500/20 to-green-500/0",
    color: "text-green-600",
  },
  {
    label: "Services running",
    value: 3_217,
    suffix: "",
    sub: "Currently live across our fleet",
    accent: "from-purple-500/20 to-purple-500/0",
    color: "text-purple-600",
  },
  {
    label: "Uptime",
    value: 99.987,
    decimals: 3,
    suffix: "%",
    sub: "Rolling 90-day platform availability",
    accent: "from-amber-500/20 to-amber-500/0",
    color: "text-amber-600",
  },
];

export default function LiveStatsPreview() {
  return (
    <PreviewShell
      eyebrow="Live Pulse"
      title="Live platform stats"
      description="Four headline counters that count up the first time they scroll into view. The numbers below are placeholders — on the real home page they would hydrate from a stats API and be cached at the edge with ISR."
    >
      {/* THE CANDIDATE SECTION */}
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand/30 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-[12px] font-bold uppercase tracking-widest text-green-300">
                Live · updating now
              </span>
            </div>
            <h2 className="text-[36px] md:text-[56px] font-heading font-extrabold leading-[1.05] mb-6">
              The platform, in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">
                real time.
              </span>
            </h2>
            <p className="text-[18px] text-slate-400 max-w-2xl mx-auto leading-[1.7]">
              Every number below is generated from production traffic across the DCDeploy fleet. No marketing fluff &mdash; what you see is what we're running.
            </p>
          </div>

          {/* Counter grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="relative bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden backdrop-blur-md hover:border-brand-light/40 transition-colors group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`text-[40px] md:text-[52px] font-heading font-extrabold leading-none mb-3 ${s.color}`}>
                    <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </div>
                  <div className="text-[14px] font-bold text-white mb-2">{s.label}</div>
                  <div className="text-[12px] text-slate-400 leading-[1.5]">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-[12px] text-slate-500 mt-10">
            Counters re-animate on every page load (this is a preview). On the real home page they would hydrate from a stats API and be cached at the edge with ISR.
          </p>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Bento grid features (section 6) and Feature tabs (section 7) on the home page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Wire counters to the platform stats API (e.g. <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/api/stats</code>) rendered server-side with ISR (revalidate every 60s) so the numbers stay fresh without a per-request fetch.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>This section will <strong>replace</strong> the existing &ldquo;2.4M+ Deployments / 35 Regions / 99.99% / &lt;3 min&rdquo; fake stats banner.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>If you want to add more counters later, just push more entries into the <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">stats</code> array at the top of this file &mdash; the grid is responsive (2 cols on mobile, 4 on desktop).</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
