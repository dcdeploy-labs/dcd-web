import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

const phases = [
  { phase: "Phase 1", title: "In-house microVM runtime", status: "building", note: "Forked Firecracker tuned for small-memory workloads. Sub-50ms boot times." },
  { phase: "Phase 2", title: "Snapshot-restore cold starts", status: "next", note: "Resume from a frozen memory snapshot so the first request after sleep lands in <300ms." },
  { phase: "Phase 3", title: "Free-tier auto-suspend", status: "next", note: "Idle Basic services suspend after a configurable window. Pro/Starter VMs stay always-on by default." },
  { phase: "Phase 4", title: "Sandboxed exec API", status: "later", note: "Spawn ephemeral compute sandboxes via API \u2014 think Vercel-style functions but on our metal." },
];

const benefits = [
  { title: "Free really stays free", desc: "Idle hobby projects don't quietly eat platform capacity. We keep the free tier sustainable." },
  { title: "Predictable cold-starts", desc: "Snapshot-restore makes first-byte latency a known quantity. No 'cold container' surprises." },
  { title: "Stronger isolation", desc: "MicroVMs give kernel-level isolation, not just container namespaces. Tenants can't see each other." },
  { title: "Powers new product surface", desc: "Same primitive will back exec sandboxes for build steps, cron jobs, and on-demand workers later." },
];

function statusPill(status: string) {
  if (status === "building") return "bg-amber-500/20 text-amber-200 border-amber-500/40";
  if (status === "next") return "bg-blue-500/20 text-blue-200 border-blue-500/40";
  return "bg-slate-500/20 text-slate-300 border-slate-500/40";
}

function statusLabel(status: string) {
  if (status === "building") return "Now";
  if (status === "next") return "Next";
  return "Later";
}

export default function VoidrunPreview() {
  return (
    <PreviewShell
      eyebrow="Voidrun · Roadmap"
      title="Voidrun \u2014 scale-to-zero, in-house"
      description="A dedicated section that introduces voidrun (our own microVM sandbox runtime) and explains how free-tier services will scale to zero when idle. Sets expectations honestly: it's in active development, here's where we are, here's what changes for you."
      status="draft"
    >
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert"></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-brand/30 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-200 text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Shipping soon
            </div>
            <h2 className="text-[44px] md:text-[64px] font-heading font-extrabold leading-[1.05] mb-6 max-w-3xl">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">voidrun</span>.
            </h2>
            <p className="text-[18px] text-slate-300 max-w-2xl leading-[1.8]">
              Our own microVM sandbox runtime. Free-tier services will suspend when idle and cold-start in under a few hundred milliseconds when traffic returns &mdash; so the free tier stays free, and stays fast.
            </p>
          </div>

          {/* Demo card: lifecycle */}
          <div className="bg-[#1E293B]/60 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden mb-16 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-[12px] font-bold uppercase tracking-widest text-white">Service lifecycle &mdash; what changes with voidrun</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold border border-amber-500/30">PREVIEW</span>
            </div>
            <div className="p-6 md:p-8 font-mono text-[13px] leading-relaxed">
              <div className="text-slate-500 mb-3"># Today (always-on, Basic)</div>
              <div className="text-slate-300 mb-1">[00:00:00] Service <span className="text-brand-light">my-bot</span> running</div>
              <div className="text-slate-300 mb-1">[06:00:00] Service <span className="text-brand-light">my-bot</span> running &mdash; 0 requests last 6h</div>
              <div className="text-slate-300 mb-1">[12:00:00] Service <span className="text-brand-light">my-bot</span> running &mdash; still 0 requests</div>
              <div className="text-amber-300 mb-6">           ^ paying for idle CPU we don't need</div>

              <div className="text-slate-500 mb-3"># With voidrun (coming soon)</div>
              <div className="text-slate-300 mb-1">[00:00:00] Service <span className="text-brand-light">my-bot</span> running</div>
              <div className="text-slate-300 mb-1">[00:05:00] No traffic for 5 min &rarr; <span className="text-amber-300">snapshot &amp; suspend</span></div>
              <div className="text-slate-500 mb-1">[06:00:00] &hellip; (zero compute consumed) &hellip;</div>
              <div className="text-slate-300 mb-1">[12:34:56] Incoming request &rarr; <span className="text-brand-light">restore from snapshot in 187ms</span></div>
              <div className="text-green-400">[12:34:57] Response sent &mdash; 200 OK</div>
            </div>
          </div>

          {/* Why we're building it */}
          <div className="mb-16">
            <h3 className="text-[24px] font-heading font-bold text-white mb-8 text-center">Why we're building it ourselves</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((b) => (
                <div key={b.title} className="bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-brand-light/40 transition-colors">
                  <h4 className="text-[16px] font-bold text-white mb-2">{b.title}</h4>
                  <p className="text-[14px] text-slate-400 leading-[1.6]">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap */}
          <div className="mb-16">
            <h3 className="text-[24px] font-heading font-bold text-white mb-8 text-center">Where we are today</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {phases.map((p) => (
                <div key={p.phase} className="bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{p.phase}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusPill(p.status)}`}>{statusLabel(p.status)}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-white mb-2 leading-tight">{p.title}</h4>
                  <p className="text-[12px] text-slate-400 leading-[1.5]">{p.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ-style honesty card */}
          <div className="bg-gradient-to-br from-brand/15 to-transparent border border-brand/30 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
            <h3 className="text-[20px] font-bold text-white mb-6">What this means for you, right now</h3>
            <ul className="space-y-4 text-[14px] text-slate-300 leading-[1.7]">
              <li className="flex gap-3">
                <span className="text-amber-300 font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">Today:</strong> free Basic services stay always-on. Nothing changes for existing apps.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-300 font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">When voidrun ships:</strong> Basic services will sleep after a configurable idle window. First request after sleep adds &lt;300ms cold-start latency.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-300 font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">If you need always-on now:</strong> the new <Link href="/pricing" className="text-brand-light font-bold underline underline-offset-2 hover:text-white">Starter plan ($5/mo)</Link> guarantees it, with $3 of bundled compute credit.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-300 font-bold shrink-0">&middot;</span>
                <span><strong className="text-white">If your workload can't cold-start:</strong> opt in to always-on per service on Starter or Pro. You'll always have the choice.</span>
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
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Insert as a new section right after the Free Tier Spotlight on the home page \u2014 the natural place to address &ldquo;wait, what happens to the free tier?&rdquo;.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Update the &ldquo;In progress&rdquo; banner inside Free Tier Spotlight to link here once promoted.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>The 4-phase roadmap should live in a CMS (or a constants file) so engineering can flip statuses without a website deploy.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Optionally add a &ldquo;Notify me when voidrun lands&rdquo; email capture at the bottom.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">&rarr;</span>Replace the demo log block with a real terminal recording (asciinema embed) once the feature ships.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
