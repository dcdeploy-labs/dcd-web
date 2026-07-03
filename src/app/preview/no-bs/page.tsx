import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Promise {
  no: string;
  why: string;
  yes: string;
  category: "Billing" | "Lock-in" | "Support" | "Onboarding";
}

const promises: Promise[] = [
  {
    no: "No expiring free tier",
    why: "Most platforms give you a trial and then quietly start charging or shut you down after 30 days.",
    yes: "Basic is free forever. Run your hobby project for a decade if you want.",
    category: "Billing",
  },
  {
    no: "No surprise overage bills",
    why: "You shouldn't need a finance degree to predict your invoice. Big platforms profit from your confusion.",
    yes: "Per-minute metering with hard caps. Hit the cap, we pause new minutes — we don't run up a bill.",
    category: "Billing",
  },
  {
    no: "No 'contact sales' tier",
    why: "If a feature isn't listed on the pricing page, it's a tax on your time.",
    yes: "Every plan is on the pricing page with a real number next to it. Enterprise gets a contract, not a secret feature set.",
    category: "Billing",
  },
  {
    no: "No vendor-locked YAML",
    why: "Some platforms invent proprietary config formats so you can't leave without a rewrite.",
    yes: "Dockerfile, Procfile, or auto-detection. Everything you write here works on any other platform tomorrow.",
    category: "Lock-in",
  },
  {
    no: "No ingress / egress traps",
    why: "Charging you to read your own data is a hostage situation, not a service.",
    yes: "Inbound bandwidth is free. Outbound is flat and bundled. No 'data transfer' line items.",
    category: "Billing",
  },
  {
    no: "No required Slack to get help",
    why: "Funnelling support through a community Slack is a way to make it look like there are humans.",
    yes: "Real ticketing on Starter and Pro. Engineers respond, not bots. Discord exists for community, not as a support helpdesk.",
    category: "Support",
  },
  {
    no: "No 14-day trial countdown",
    why: "Anxiety-driven onboarding doesn't help you ship. It helps us close deals.",
    yes: "Take your time on Basic. Move up when your product is ready, not when our timer says so.",
    category: "Onboarding",
  },
  {
    no: "No dark patterns to leave",
    why: "Some platforms make account deletion a multi-step confirmation gauntlet, or hide it entirely.",
    yes: "Delete an org from the dashboard in two clicks. Export everything via the API. Walk away whenever.",
    category: "Lock-in",
  },
];

const categoryColor: Record<Promise["category"], string> = {
  Billing: "bg-amber-100 text-amber-700 border-amber-200",
  "Lock-in": "bg-purple-100 text-purple-700 border-purple-200",
  Support: "bg-blue-100 text-brand border-border-blue",
  Onboarding: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export default function NoBSPreview() {
  return (
    <PreviewShell
      eyebrow="No BS"
      title="Things we promise not to do."
      description="An opinionated, anti-marketing manifesto. Eight things competitors do that we explicitly won't. Punchier than the comparison table — different tone, different job. Best used as a 'why we're different' section near the end of the page."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/30 via-white to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest">
              No BS
            </div>
            <h2 className="text-[40px] md:text-[60px] font-heading font-extrabold text-text-heading mb-6 leading-[1.05] tracking-[-0.02em]">
              The fine print, <br />
              <span className="gradient-text">in big letters.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              We've all been burned by a deploy platform. Here's eight things we explicitly won't do &mdash; written down so we can be held to them.
            </p>
          </div>

          {/* Promises grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promises.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-border-default rounded-3xl overflow-hidden hover:shadow-[0_20px_40px_rgba(14,84,135,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header — the NO */}
                <div className="p-6 pb-4 border-b border-border-default bg-gradient-to-br from-red-50/40 to-white">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </div>
                      <h3 className="text-[18px] font-heading font-bold text-text-heading leading-tight">{p.no}</h3>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${categoryColor[p.category]}`}>
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[13px] text-text-muted leading-[1.6] pl-10">{p.why}</p>
                </div>

                {/* Body — the YES */}
                <div className="p-6 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <p className="text-[14px] text-text-body font-medium leading-[1.6]">{p.yes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closer */}
          <div className="mt-16 bg-[#0F172A] rounded-3xl p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-[0.06] invert"></div>
            <div className="relative z-10">
              <p className="text-[20px] md:text-[24px] font-heading font-bold leading-[1.4] mb-3 max-w-2xl mx-auto">
                If we ever break one of these, you can email us, screenshot in hand, and we'll fix it.
              </p>
              <p className="text-[14px] text-slate-400 mb-8">That's the entire policy.</p>
              <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
                Start free &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert near the bottom of the home page, between Pricing and Final CTA. Works as a final reassurance pass before signup.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Pair well with the Comparison table (different tone &mdash; comparison is analytical, this is values-driven).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Each promise should be enforceable in product. Review with engineering before promoting &mdash; e.g. confirm hard spending caps actually pause minutes, account-delete actually exists, etc.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Consider committing these to a public &ldquo;manifesto&rdquo; page at <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">/manifesto</code> with a versioned changelog so it stays accountable.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
