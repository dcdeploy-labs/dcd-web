"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "log"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "url"; text: string };

interface Scenario {
  id: string;
  label: string;
  stack: string;
  lines: Line[];
}

const scenarios: Scenario[] = [
  {
    id: "nextjs",
    label: "Next.js",
    stack: "Next.js 14",
    lines: [
      { kind: "cmd", text: "$ git push dcdeploy main" },
      { kind: "log", text: "› Receiving objects... 100%" },
      { kind: "log", text: "› Detected: Next.js 14 (App Router)" },
      { kind: "log", text: "› Building image... 1.2s" },
      { kind: "log", text: "› Snapshotting microVM... 187ms" },
      { kind: "log", text: "› Routing fra1 traffic to v2" },
      { kind: "ok", text: "✔ Deployed in 4.6s" },
      { kind: "url", text: "https://acme-saas.dcdeploy.app" },
    ],
  },
  {
    id: "python",
    label: "Python",
    stack: "FastAPI",
    lines: [
      { kind: "cmd", text: "$ git push dcdeploy main" },
      { kind: "log", text: "› Detected: Python 3.12 + requirements.txt" },
      { kind: "log", text: "› Installing 24 packages... 2.1s" },
      { kind: "log", text: "› Found uvicorn entrypoint" },
      { kind: "log", text: "› Snapshotting microVM... 142ms" },
      { kind: "log", text: "› Health check: /healthz → 200 OK" },
      { kind: "ok", text: "✔ Deployed in 5.9s" },
      { kind: "url", text: "https://billing-api.dcdeploy.app" },
    ],
  },
  {
    id: "docker",
    label: "Docker",
    stack: "Dockerfile",
    lines: [
      { kind: "cmd", text: "$ git push dcdeploy main" },
      { kind: "log", text: "› Found Dockerfile at ./Dockerfile" },
      { kind: "log", text: "› Building image (cached layers: 6/8)... 3.4s" },
      { kind: "log", text: "› Pushing to internal registry" },
      { kind: "log", text: "› Snapshotting microVM... 211ms" },
      { kind: "log", text: "› Routing fra1 traffic to v5" },
      { kind: "ok", text: "✔ Deployed in 8.2s" },
      { kind: "url", text: "https://worker.dcdeploy.app" },
    ],
  },
];

const pipelineSteps = [
  { label: "Receive", icon: "📥", afterLine: 1 },
  { label: "Build", icon: "⚙️", afterLine: 3 },
  { label: "Snapshot", icon: "📸", afterLine: 4 },
  { label: "Route", icon: "🌐", afterLine: 5 },
  { label: "Live", icon: "✅", afterLine: 7 },
];

const LINE_DELAY = 380; // ms between lines
const PAUSE_AT_END = 2400; // ms hold at end before next scenario

export default function DeployDemoPreview() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [paused, setPaused] = useState(false);

  const scenario = scenarios[scenarioIdx];

  // Drive the line-by-line reveal
  useEffect(() => {
    if (paused) return;
    if (visibleLines < scenario.lines.length) {
      const id = setTimeout(() => setVisibleLines((n) => n + 1), LINE_DELAY);
      return () => clearTimeout(id);
    }
    // End of scenario — pause, then advance
    const id = setTimeout(() => {
      setVisibleLines(0);
      setScenarioIdx((i) => (i + 1) % scenarios.length);
    }, PAUSE_AT_END);
    return () => clearTimeout(id);
  }, [visibleLines, paused, scenario.lines.length]);

  const activeStepIdx = useMemo(() => {
    let active = -1;
    pipelineSteps.forEach((step, i) => {
      if (visibleLines > step.afterLine) active = i;
    });
    return active;
  }, [visibleLines]);

  const restart = () => {
    setVisibleLines(0);
  };

  return (
    <PreviewShell
      eyebrow="Deploy Demo"
      title="From git push to live, on a loop."
      description="An animated terminal that streams a realistic deploy session, with a 5-step pipeline visualiser that lights up alongside. Cycles between Next.js, Python and Docker examples so visitors see their stack land."
      status="draft"
    >
      <section className="relative bg-[#0F172A] py-24 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.04] invert"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/30 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-[12px] font-bold uppercase tracking-widest text-green-300">Live demo</span>
            </div>
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold leading-[1.05] mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">git push</span>. That's it.
            </h2>
            <p className="text-[16px] text-slate-300 max-w-xl mx-auto leading-[1.7]">
              Watch a real deploy session end-to-end. Same code path Next.js, Python and Docker workloads take in production.
            </p>
          </div>

          {/* Scenario tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
              {scenarios.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setScenarioIdx(i);
                    setVisibleLines(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all ${
                    i === scenarioIdx
                      ? "bg-brand text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* TERMINAL */}
            <div className="lg:col-span-3 bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="text-[12px] text-slate-500 font-mono">~/{scenario.stack.toLowerCase().replace(/\s+/g, "-")}</span>
                <button
                  onClick={restart}
                  className="text-slate-400 hover:text-white text-[11px] font-mono font-bold transition-colors flex items-center gap-1"
                  aria-label="Replay"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  replay
                </button>
              </div>

              <div className="p-6 md:p-8 font-mono text-[13px] leading-[1.8] min-h-[360px]">
                {scenario.lines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={`${scenarioIdx}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
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
                {visibleLines < scenario.lines.length && (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-brand-light mt-1"
                  ></motion.div>
                )}
              </div>
            </div>

            {/* PIPELINE */}
            <div className="lg:col-span-2 bg-[#1E293B]/60 border border-white/10 rounded-3xl backdrop-blur-md p-6 md:p-8 flex flex-col">
              <div className="text-[12px] font-bold uppercase tracking-widest text-slate-400 mb-6">Pipeline</div>

              <div className="flex flex-col gap-3 flex-1">
                {pipelineSteps.map((step, i) => {
                  const active = activeStepIdx >= i;
                  const current = activeStepIdx === i && visibleLines < scenario.lines.length;
                  return (
                    <div
                      key={step.label}
                      className={`flex items-center gap-4 rounded-2xl p-4 border transition-all duration-300 ${
                        active
                          ? "bg-brand/20 border-brand/40 text-white"
                          : "bg-white/5 border-white/5 text-slate-500"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-[18px] shrink-0 transition-all ${
                          active
                            ? "bg-brand text-white shadow-[0_0_20px_rgba(14,84,135,0.6)]"
                            : "bg-white/5"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-bold">{step.label}</div>
                        <div className="text-[11px] text-slate-500">step {i + 1} of {pipelineSteps.length}</div>
                      </div>
                      {current && (
                        <span className="relative flex w-2 h-2 shrink-0">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                          <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500"></span>
                        </span>
                      )}
                      {active && !current && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 shrink-0">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-[12px] text-slate-400">
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="font-bold hover:text-white transition-colors"
                >
                  {paused ? "▶ Resume" : "⏸ Pause"}
                </button>
                <span className="font-mono">{visibleLines}/{scenario.lines.length}</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Try it with your repo &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert directly after the Hero on the home page &mdash; pairs naturally with the &ldquo;get started in 60 seconds&rdquo; positioning.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Could replace the existing Pipeline Visualizer (section 3) since this is more concrete.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Scenarios + timing numbers (4.6s, 187ms, etc.) should be sourced from real p50 metrics so the demo stays honest.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Add more scenarios for Bun, Go, Rust if those are stable on the platform.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
