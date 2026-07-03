import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Customer {
  name: string;
  industry: string;
  size: "Indie" | "Startup" | "Scaleup" | "Agency";
  pull: string;
  context: string;
  color: string;
  initials: string;
}

// EVERY ENTRY BELOW IS A PLACEHOLDER. Replace before promoting.
const customers: Customer[] = [
  {
    name: "[ Customer A ]",
    industry: "SaaS · Dev tools",
    size: "Startup",
    pull: "Cut our infra bill from $1.4k/mo to under $300 without changing a single line of app code.",
    context: "Migrated 6 services + 1 Postgres from Heroku in an afternoon.",
    color: "from-blue-500 to-indigo-600",
    initials: "CA",
  },
  {
    name: "[ Customer B ]",
    industry: "AI · Inference",
    size: "Scaleup",
    pull: "Cold-starts dropped from 4s on Lambda to 200ms here. P99 latency is finally predictable.",
    context: "Runs 12 model-inference services across Frankfurt.",
    color: "from-violet-500 to-purple-600",
    initials: "CB",
  },
  {
    name: "[ Customer C ]",
    industry: "Agency · Multi-tenant",
    size: "Agency",
    pull: "We spin up a workspace per client engagement, hand it off via SSO when the project ends. Saves us a week per project.",
    context: "Manages 80+ services across 14 active client workspaces.",
    color: "from-emerald-500 to-green-600",
    initials: "CC",
  },
  {
    name: "[ Customer D ]",
    industry: "Indie · SaaS",
    size: "Indie",
    pull: "Free tier ran my MVP for 11 months. Moved to Starter when I hit my first 100 paying users. Still under $20/mo.",
    context: "Single Next.js app, scale-to-zero off-hours.",
    color: "from-amber-500 to-orange-600",
    initials: "CD",
  },
  {
    name: "[ Customer E ]",
    industry: "Fintech · EU regulated",
    size: "Startup",
    pull: "DPA signed in 48 hours. Frankfurt-only residency made our compliance review a non-event.",
    context: "5 services + private network for internal tooling.",
    color: "from-rose-500 to-pink-600",
    initials: "CE",
  },
  {
    name: "[ Customer F ]",
    industry: "Community · Discord bot",
    size: "Indie",
    pull: "Bot stays online for 12k users on Starter. With scale-to-zero on the free worker, my background jobs cost literally pennies.",
    context: "1 Discord bot, 2 cron workers, free-tier sleeps when idle.",
    color: "from-sky-500 to-cyan-600",
    initials: "CF",
  },
];

const sizePill: Record<Customer["size"], string> = {
  Indie: "bg-amber-100 text-amber-700",
  Startup: "bg-blue-100 text-brand",
  Scaleup: "bg-purple-100 text-purple-700",
  Agency: "bg-emerald-100 text-emerald-700",
};

export default function ShowcasePreview() {
  return (
    <PreviewShell
      eyebrow="Showcase"
      title="Built with DCDeploy."
      description="Customer story gallery. EVERY entry is placeholder copy until we have real, named customers happy to be quoted. Use this as a layout reference, then swap in real testimonials before promoting."
      status="draft"
    >
      {/* PLACEHOLDER BANNER — visible inside the preview itself */}
      <div className="bg-amber-100 border-y border-amber-300 text-amber-900 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-3 text-[13px]">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full shrink-0">Placeholder</span>
          <p className="leading-[1.5]">
            All names, quotes and stats below are layout-only placeholders. <strong>Do not promote</strong> until replaced with real, opt-in customer content.
          </p>
        </div>
      </div>

      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/30 via-white to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Customer stories
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Built with <span className="gradient-text">DCDeploy.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              Indie founders, agencies, and growth-stage teams ship on us. Here's how a few of them are using the platform.
            </p>
          </div>

          {/* Customer cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {customers.map((c) => (
              <div
                key={c.name}
                className="bg-white border border-border-default rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,84,135,0.1)] transition-all flex flex-col"
              >
                {/* Header band */}
                <div className={`bg-gradient-to-br ${c.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">{c.industry}</div>
                      <div className="text-[18px] font-heading font-bold leading-tight">{c.name}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center font-heading font-bold text-[14px]">
                      {c.initials}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block w-max mb-4 ${sizePill[c.size]}`}>{c.size}</span>
                  <p className="text-[16px] text-text-heading font-heading font-bold leading-[1.4] mb-4 italic">&ldquo;{c.pull}&rdquo;</p>
                  <p className="text-[13px] text-text-muted leading-[1.6] mt-auto">{c.context}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Submit CTA */}
          <div className="mt-16 bg-bg-page border border-border-default rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-bg-blue-tint border border-border-blue flex items-center justify-center text-[28px]">📣</div>
              <div>
                <h3 className="text-[18px] font-bold text-text-heading mb-1">Building on us?</h3>
                <p className="text-[14px] text-text-muted">
                  We'll send you stickers and add you here. Yes, both.
                </p>
              </div>
            </div>
            <Link href="/contact" className="bg-brand text-white text-[14px] font-bold px-5 py-3 rounded-full hover:bg-brand-hover transition-colors shrink-0">
              Tell us your story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-red-600 font-bold shrink-0">!</span><strong>Do not promote</strong> until every &ldquo;[ Customer X ]&rdquo; entry is replaced with a real, opt-in customer name and quote. The team learned the lesson on fake testimonials already; we shouldn't repeat it.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Set up an outreach pipeline: 4 happy customers signing a one-line testimonial release is enough to launch this.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Real logos should replace the gradient blocks. Customer-controlled SVG/PNG hosted on our CDN to avoid hotlink rot.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Home-page slot: replace the fake &ldquo;14,000+ companies&rdquo; logo strip in section 2.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
