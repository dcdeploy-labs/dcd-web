import Link from "next/link";

const sections = [
  {
    slug: "scale-to-zero",
    eyebrow: "Scale-to-zero",
    title: "Sleep when idle. Wake instantly.",
    desc: "Explains how every service runs in its own microVM, suspends on idle, and cold-starts in under 300ms. Lifecycle log, four how-it-works steps, four why-microVMs benefits, and an 'always-on opt-out' card.",
    home: "Insert directly after the Free Tier Spotlight on the home page",
    icon: "💤",
    accent: "bg-gradient-to-br from-indigo-50 to-indigo-100",
    tags: ["microVMs", "Free tier", "How it works"],
  },
  {
    slug: "live-stats",
    eyebrow: "Live Pulse",
    title: "Platform stats",
    desc: "Four animated count-up counters showing requests served, deployments, services running, and uptime. Hydrate from the stats API at build/revalidate time.",
    home: "Add as section between Bento grid and Feature tabs",
    icon: "📈",
    accent: "bg-gradient-to-br from-blue-50 to-blue-100",
    tags: ["Trust", "Stats", "Animated"],
  },
  {
    slug: "comparison",
    eyebrow: "Comparison",
    title: "Why DCDeploy vs the rest",
    desc: "Side-by-side feature table comparing DCDeploy with Heroku, Railway, Render and Fly.io on the dimensions that matter (free tier, per-min billing, bare metal, scale-to-zero, EU residency).",
    home: "Add as section right before Pricing",
    icon: "⚖️",
    accent: "bg-gradient-to-br from-amber-50 to-amber-100",
    tags: ["Conversion", "Comparison"],
  },
  {
    slug: "infra",
    eyebrow: "Infrastructure",
    title: "Honest bare-metal story",
    desc: "Replacement for the fictional 35-region globe. Tells the real story: Frankfurt today, AMD EPYC + Intel Gold + NVMe, microVMs + WireGuard mesh, more locations coming.",
    home: "Replace Global Edge Network section on home",
    icon: "🏗️",
    accent: "bg-gradient-to-br from-slate-100 to-slate-200",
    tags: ["Trust", "Honest"],
  },
  {
    slug: "migration",
    eyebrow: "Migration",
    title: "From X to DCDeploy",
    desc: "Three side-by-side cards for migrating from Heroku, Railway and Render with a CLI snippet and rough timing for each. Drives high-intent traffic.",
    home: "Add as section after Bento grid",
    icon: "🚚",
    accent: "bg-gradient-to-br from-green-50 to-green-100",
    tags: ["Conversion", "SEO"],
  },
  {
    slug: "use-cases",
    eyebrow: "Use Cases",
    title: "Built for…",
    desc: "Grid of 4 personas with a concrete example app each: indie hackers (Next.js SaaS), startups (Django API), agencies (multi-tenant), side projects (Discord bot).",
    home: "Add as section between Hero and Pipeline visualizer",
    icon: "🎯",
    accent: "bg-gradient-to-br from-purple-50 to-purple-100",
    tags: ["Self-identify"],
  },
  {
    slug: "calculator",
    eyebrow: "Calculator",
    title: "Inline cost calculator",
    desc: "Lite version of the /pricing page calculator. Three sliders (RAM, requests, services) → 'You'd pay ~₹X/month'. Removes price uncertainty at first impression.",
    home: "Add as section after Free Tier Spotlight",
    icon: "🧮",
    accent: "bg-gradient-to-br from-rose-50 to-rose-100",
    tags: ["Conversion", "Interactive"],
  },
];

export default function PreviewIndexPage() {
  return (
    <div className="flex flex-col w-full bg-bg-page min-h-screen">
      {/* HERO */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-border-default bg-white">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-60"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-amber-100 border border-amber-300 text-amber-800 text-[12px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-2 mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Internal review
          </div>
          <h1 className="text-[40px] md:text-[56px] font-heading font-extrabold text-text-heading leading-[1.05] tracking-[-0.02em] mb-6">
            Candidate sections <br/>
            <span className="gradient-text">for the new home page.</span>
          </h1>
          <p className="text-[18px] text-text-body max-w-2xl leading-[1.7] mb-2">
            Each card below is a self-contained section preview. Open one, give it a look, and tell us which to promote into the main home page (or kill).
          </p>
          <p className="text-[14px] text-text-muted">
            {sections.length} candidates · all routes static · not linked from the public nav.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((s) => (
            <Link
              key={s.slug}
              href={`/preview/${s.slug}`}
              className="group relative bg-white border border-border-default rounded-3xl overflow-hidden shadow-[0_4px_14px_rgba(14,84,135,0.04)] hover:shadow-[0_20px_40px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className={`h-32 ${s.accent} flex items-center justify-center text-[56px]`}>
                <span aria-hidden="true">{s.icon}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-brand uppercase tracking-widest">{s.eyebrow}</span>
                </div>
                <h2 className="text-[20px] font-bold text-text-heading mb-2 leading-tight group-hover:text-brand transition-colors">{s.title}</h2>
                <p className="text-[14px] text-text-muted leading-[1.6] mb-5 flex-1">{s.desc}</p>
                <div className="text-[12px] text-text-body mb-4 bg-bg-blue-tint/50 border border-border-blue rounded-lg px-3 py-2">
                  <span className="font-semibold text-brand">If promoted: </span>
                  {s.home}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-text-muted bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                    ))}
                  </div>
                  <div className="text-brand text-[13px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Open
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Help row */}
        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-border-default rounded-2xl p-6">
            <div className="text-[18px] mb-2">✅</div>
            <h3 className="text-[15px] font-bold text-text-heading mb-1">Promote</h3>
            <p className="text-[13px] text-text-muted">Comment "promote: live-stats" on the PR and we'll move it onto the home page.</p>
          </div>
          <div className="bg-white border border-border-default rounded-2xl p-6">
            <div className="text-[18px] mb-2">✏️</div>
            <h3 className="text-[15px] font-bold text-text-heading mb-1">Revise</h3>
            <p className="text-[13px] text-text-muted">Tell us what to change (copy, layout, numbers) and we'll iterate before promoting.</p>
          </div>
          <div className="bg-white border border-border-default rounded-2xl p-6">
            <div className="text-[18px] mb-2">🗑️</div>
            <h3 className="text-[15px] font-bold text-text-heading mb-1">Kill</h3>
            <p className="text-[13px] text-text-muted">If a candidate doesn't fit, say so and we'll remove the page in the next pass.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
