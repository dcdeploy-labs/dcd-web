import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Row {
  dim: string;
  bare: { headline: string; sub: string };
  serverless: { headline: string; sub: string };
}

const rows: Row[] = [
  {
    dim: "Cold start",
    bare: { headline: "<300ms from snapshot", sub: "Snapshot-restore on demand. Predictable." },
    serverless: { headline: "1–5s, sometimes more", sub: "Spins a container; depends on language runtime and cold-cache." },
  },
  {
    dim: "Latency consistency",
    bare: { headline: "Stable p99", sub: "No oversubscription. Your service owns its slice of metal." },
    serverless: { headline: "Long-tail spikes", sub: "Noisy-neighbour drag and request multiplexing on a shared invoker." },
  },
  {
    dim: "Memory ceiling",
    bare: { headline: "Up to 8 GB on DCD-6", sub: "And we'll roll bigger SKUs as you ask for them." },
    serverless: { headline: "1–10 GB typical cap", sub: "Hard to run anything that needs to hold state in RAM." },
  },
  {
    dim: "Execution time",
    bare: { headline: "Run as long as you want", sub: "Long-lived workers, WebSocket servers, ML inference. Not a problem." },
    serverless: { headline: "15-minute hard cap", sub: "Most serverless platforms kill requests at 5–15 min." },
  },
  {
    dim: "Local file system",
    bare: { headline: "Real NVMe disk", sub: "Persistent disk volumes available. SQLite-on-disk works." },
    serverless: { headline: "Ephemeral /tmp", sub: "Vanishes between invocations. Lambdas can't keep state." },
  },
  {
    dim: "Cost model",
    bare: { headline: "Per-minute, micro-cents", sub: "Plus scale-to-zero when idle. You pay for what runs." },
    serverless: { headline: "Per-invocation + duration", sub: "Cheap at trivial loads, expensive at scale once you cross the inflection." },
  },
  {
    dim: "Isolation",
    bare: { headline: "MicroVM (kernel-level)", sub: "Each service in its own VM. Genuine multi-tenant safety." },
    serverless: { headline: "Process or container", sub: "Shared kernel; container escapes have historically happened." },
  },
];

export default function BareMetalPreview() {
  return (
    <PreviewShell
      eyebrow="Bare metal vs Serverless"
      title="Why we picked bare metal."
      description="Explainer for prospects coming from serverless platforms. Seven head-to-head dimensions, each with a one-line headline and a sub explaining the nuance. Honest, not preachy."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/30 via-white to-bg-blue-tint/30 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Architecture
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Real metal beats <br />
              <span className="gradient-text">someone else's fleet.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              Serverless solved one problem (zero-management) and introduced another (unpredictable latency, weird limits, surprise bills). We picked the parts that work and dropped the rest.
            </p>
          </div>

          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            <div className="md:col-span-3"></div>
            <div className="md:col-span-4 bg-brand text-white rounded-2xl p-5 text-center shadow-[0_12px_30px_rgba(14,84,135,0.25)]">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">Our approach</div>
              <div className="text-[20px] font-heading font-bold">DCDeploy on bare metal</div>
              <div className="text-[12px] opacity-80 mt-1">+ microVMs for isolation</div>
            </div>
            <div className="md:col-span-5 bg-slate-100 text-slate-700 rounded-2xl p-5 text-center">
              <div className="text-[11px] font-bold uppercase tracking-widest opacity-70 mb-1">Common alternative</div>
              <div className="text-[20px] font-heading font-bold">Typical serverless</div>
              <div className="text-[12px] opacity-70 mt-1">(Lambda / Cloud Run / Functions)</div>
            </div>
          </div>

          {/* Rows */}
          <div className="mt-4 space-y-3">
            {rows.map((row) => (
              <div key={row.dim} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                <div className="md:col-span-3 bg-white border border-border-default rounded-2xl px-5 py-4 flex items-center">
                  <span className="text-[14px] font-heading font-bold text-text-heading">{row.dim}</span>
                </div>
                <div className="md:col-span-4 bg-white border-2 border-brand/30 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand shrink-0" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-[14px] font-bold text-text-heading">{row.bare.headline}</span>
                  </div>
                  <div className="text-[12px] text-text-muted leading-[1.5] pl-6">{row.bare.sub}</div>
                </div>
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-400 shrink-0" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    <span className="text-[14px] font-bold text-slate-700">{row.serverless.headline}</span>
                  </div>
                  <div className="text-[12px] text-slate-500 leading-[1.5] pl-6">{row.serverless.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Closer */}
          <div className="mt-16 bg-gradient-to-br from-[#073a61] to-[#0e5487] rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
            <div className="relative z-10">
              <h3 className="text-[24px] font-heading font-bold mb-3">When you should NOT pick bare metal</h3>
              <p className="text-[15px] text-blue-100 leading-[1.7] max-w-2xl mx-auto mb-6">
                If your workload is a true once-a-day cron that runs for 50ms and never again, Lambda is fine. Bare metal earns its keep when you have steady traffic, long-running connections, or unpredictable spikes &mdash; which is most real apps.
              </p>
              <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-6 py-3 rounded-full hover:bg-[#e5a515] transition-colors">
                Try the platform free &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert as a separate /architecture or /why-bare-metal page; on the home page, condense to 3-4 rows instead of 7.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Pair with /preview/infra (which covers the *what* of our bare-metal infra). This page covers the *why*.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Numbers like '15-minute hard cap' and 'p99 long tails' are competitor-specific; verify them against current Lambda/Cloud Run docs before going public.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
