import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

const personas = [
  {
    title: "Indie hackers",
    pitch: "Ship your SaaS without burning $50/mo before your first dollar.",
    example: "A Next.js + Postgres SaaS on the free tier indefinitely. Scale up only when paying users show up.",
    accent: "from-rose-500/15 to-rose-500/5",
    border: "border-rose-200",
    iconBg: "bg-rose-100 text-rose-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    ),
    stack: ["Next.js", "Postgres", "Tailwind", "Stripe"],
    metric: "₹0 → ₹85 /mo",
    metricLabel: "Free until product-market fit"
  },
  {
    title: "Seed-stage startups",
    pitch: "Skip the platform engineer hire. Spend that headcount on shipping.",
    example: "Django + Celery backend, Next.js frontend, managed Postgres + Redis, all on per-minute billing.",
    accent: "from-blue-500/15 to-blue-500/5",
    border: "border-blue-200",
    iconBg: "bg-blue-100 text-brand",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
    ),
    stack: ["Django", "Celery", "Redis", "Postgres"],
    metric: "<½ hour",
    metricLabel: "From signup to production"
  },
  {
    title: "Agencies & consultants",
    pitch: "Spin up isolated environments per client. Predictable retainer costs.",
    example: "A workspace per client, microVM isolation, separate billing meters, hand-off SSO when the project ends.",
    accent: "from-purple-500/15 to-purple-500/5",
    border: "border-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    stack: ["Multi-tenant", "RBAC", "SSO", "Per-client billing"],
    metric: "1-click hand-off",
    metricLabel: "Transfer ownership when project ends"
  },
  {
    title: "Side projects & hobbies",
    pitch: "Run that Discord bot or cron job for free. Forever. Without thinking about it.",
    example: "A Discord bot that listens for events, a nightly cron that backs up your photos, a webhook router for your home-lab.",
    accent: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-200",
    iconBg: "bg-amber-100 text-amber-700",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    ),
    stack: ["Bot", "Cron", "Webhook", "Long-running"],
    metric: "DCD-1 forever",
    metricLabel: "Never sleeps, never costs"
  }
];

export default function UseCasesPreview() {
  return (
    <PreviewShell
      eyebrow="Use Cases"
      title="Built for…"
      description="Four-persona grid that helps visitors self-identify in the first viewport. Each card has a concrete example app, the typical stack, and a relevant 'metric' or commitment that matters to that persona."
    >
      <section className="relative bg-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bg-blue-tint/30 to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Use cases
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Built for the way <span className="gradient-text">you ship.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              Whatever you're building &mdash; a side-project bot, a SaaS, a client engagement &mdash; DCDeploy is sized for the way real engineers actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((p) => (
              <div key={p.title} className={`relative bg-white border ${p.border} rounded-[28px] p-8 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(14,84,135,0.1)] transition-all duration-300 overflow-hidden group`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${p.iconBg}`}>{p.icon}</div>
                    <div className="text-right">
                      <div className="text-[20px] font-heading font-extrabold text-text-heading leading-none">{p.metric}</div>
                      <div className="text-[11px] text-text-muted mt-1">{p.metricLabel}</div>
                    </div>
                  </div>

                  <h3 className="text-[24px] font-heading font-bold text-text-heading mb-3 leading-tight">{p.title}</h3>
                  <p className="text-[16px] text-text-body leading-[1.6] mb-5">{p.pitch}</p>

                  <div className="bg-white/70 border border-border-default rounded-2xl p-4 mb-5 backdrop-blur-sm">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-2">Typical app</div>
                    <p className="text-[14px] text-text-body leading-[1.5]">{p.example}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {p.stack.map((tag) => (
                      <span key={tag} className="text-[12px] font-semibold bg-bg-blue-tint text-brand px-3 py-1 rounded-full border border-border-blue">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Start your first project &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Hero and the Pipeline Visualizer on the home page (sections 1 → 2) so visitors self-identify early.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Each card could deep-link to a dedicated /use-cases/&#123;persona&#125; landing page with case studies. Big content investment though.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Replace the fake &ldquo;14,000+ companies&rdquo; logo strip with quotes from real customers in each persona category.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
