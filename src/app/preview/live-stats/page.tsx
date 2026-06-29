"use client";

import { useEffect, useState } from "react";
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

const liveFeedSeed = [
  { repo: "saas-frontend", user: "ayesha", region: "fra1", status: "live", time: 2 },
  { repo: "billing-api", user: "marcus", region: "fra1", status: "building", time: 8 },
  { repo: "indie-blog", user: "priya", region: "fra1", status: "live", time: 14 },
  { repo: "discord-bot", user: "tom", region: "fra1", status: "live", time: 27 },
  { repo: "ml-inference", user: "diego", region: "fra1", status: "live", time: 41 },
  { repo: "static-portfolio", user: "neha", region: "fra1", status: "live", time: 58 },
  { repo: "webhook-router", user: "leo", region: "fra1", status: "live", time: 73 },
];

export default function LiveStatsPreview() {
  const [feed, setFeed] = useState(liveFeedSeed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFeed((prev) => {
        const next = [...prev];
        const head = next.shift();
        if (head) next.push({ ...head, time: head.time + Math.floor(Math.random() * 30) + 10 });
        return next;
      });
      setTick((t) => t + 1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <PreviewShell
      eyebrow="Live Pulse"
      title="Live platform stats"
      description="Animated counters that count up the first time they scroll into view, plus a fake 'live deploys' feed that rotates every few seconds. Numbers below are placeholders — swap in your real platform stats before promoting."
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
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

          {/* Live deploy feed */}
          <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold uppercase tracking-widest text-white">Live deploy feed</span>
                <span className="text-[11px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full font-bold border border-green-500/30">STREAMING</span>
              </div>
              <span className="text-[12px] text-slate-400 font-mono">tick #{tick}</span>
            </div>
            <div className="divide-y divide-white/5">
              {feed.slice(0, 5).map((entry, i) => (
                <motion.div
                  key={`${entry.repo}-${tick}-${i}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="px-6 py-4 flex items-center gap-4 font-mono text-[13px]"
                >
                  <div className="flex items-center gap-2 w-24 shrink-0">
                    {entry.status === "live" ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                        <span className="text-green-400 font-bold uppercase text-[11px] tracking-widest">Live</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span className="text-amber-300 font-bold uppercase text-[11px] tracking-widest">Build</span>
                      </>
                    )}
                  </div>
                  <span className="text-slate-300 truncate flex-1">
                    <span className="text-white/80">@{entry.user}</span>
                    <span className="text-slate-500"> pushed </span>
                    <span className="text-brand-light">{entry.repo}</span>
                  </span>
                  <span className="text-slate-500 hidden sm:inline">{entry.region}</span>
                  <span className="text-slate-500 w-16 text-right">{entry.time}s ago</span>
                </motion.div>
              ))}
            </div>
            <div className="px-6 py-3 bg-black/20 text-[12px] text-slate-500 flex items-center justify-between">
              <span>Auto-refreshing every 3.5s</span>
              <span className="text-slate-400 hover:text-white cursor-pointer transition-colors">View status page &rarr;</span>
            </div>
          </div>

          <p className="text-center text-[12px] text-slate-500 mt-8">
            Numbers reset on every page load (this is a preview). On the real home page they would hydrate from a metrics endpoint or be cached at the edge with ISR.
          </p>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Bento grid features (section 6) and Feature tabs (section 7) on the home page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Wire counters to a real metrics endpoint (e.g. <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/api/stats</code>) rendered server-side with ISR (revalidate every 60s).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Replace the fake live feed with the last N recently-completed deploys (with opt-in from customers, or use anonymised data).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>This section will <strong>replace</strong> the existing "2.4M+ Deployments / 35 Regions / 99.99% / &lt;3 min" fake stats banner.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
