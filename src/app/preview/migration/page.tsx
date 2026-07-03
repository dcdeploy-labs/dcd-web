import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

const recipes = [
  {
    from: "Heroku",
    accent: "from-[#6762A6] to-[#430098]",
    pillBg: "bg-purple-100 text-purple-700",
    icon: "H",
    sub: "Procfile + buildpacks → Dockerfile in 5 minutes",
    bullets: [
      "Detect your buildpack and emit a matching Dockerfile",
      "Import HEROKU_* env vars wholesale",
      "Hobby dyno (512 MB) maps cleanly to DCD-2",
      "Postgres dump-and-restore via dcd db migrate"
    ],
    minutes: "~15 min",
    snippet: `# 1. Generate Dockerfile from your Heroku app
$ dcd init --from heroku my-app

# 2. Import env vars
$ heroku config -s -a my-app | dcd env load

# 3. Migrate Postgres (optional)
$ dcd db migrate --from heroku-postgres-xyz`,
    href: "/docs/migration/heroku"
  },
  {
    from: "Railway",
    accent: "from-[#13111C] to-[#52447b]",
    pillBg: "bg-pink-100 text-pink-700",
    icon: "R",
    sub: "railway.json → dcdeploy.yaml, automatically",
    bullets: [
      "Auto-convert railway.json to dcdeploy.yaml",
      "Match your service template (Postgres, Redis, etc.)",
      "Same git-push workflow, lower per-minute rate",
      "Native scale-to-zero (Railway charges idle)"
    ],
    minutes: "~10 min",
    snippet: `# 1. Convert config
$ dcd convert railway --in railway.json

# 2. Link existing GitHub repo
$ dcd link github.com/you/repo

# 3. Deploy
$ git push dcdeploy main`,
    href: "/docs/migration/railway"
  },
  {
    from: "Render",
    accent: "from-[#46E3B7] to-[#0EA47A]",
    pillBg: "bg-emerald-100 text-emerald-700",
    icon: "•",
    sub: "render.yaml → dcdeploy.yaml, with auto-scaling fixed",
    bullets: [
      "Convert render.yaml blueprint",
      "Free dyno doesn't sleep (Render's does)",
      "Same managed Postgres + Redis abstractions",
      "Migration script handles disk volumes too"
    ],
    minutes: "~12 min",
    snippet: `# 1. Convert blueprint
$ dcd convert render --in render.yaml

# 2. Migrate disks (if any)
$ dcd disk migrate --from render-disk-abc

# 3. Cut over DNS
$ dcd domain switch yourdomain.com`,
    href: "/docs/migration/render"
  }
];

export default function MigrationPreview() {
  return (
    <PreviewShell
      eyebrow="Migration"
      title="From X to DCDeploy"
      description="Three migration recipe cards. Drives high-intent traffic (people Googling 'Heroku alternative'). Each card has a 4-bullet pitch and a 3-step CLI snippet. Real migration tooling needs to exist to make this credible — flag it as 'roadmap' or 'beta' until then."
    >
      <section className="relative bg-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Migration
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Already on Heroku, Railway or Render? <br />
              <span className="gradient-text">Switch in minutes.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              We've built dedicated CLI commands that read your existing config and emit a working DCDeploy setup. You stay in git, you stay in your IDE.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <div key={r.from} className="bg-white border border-border-default rounded-[28px] overflow-hidden shadow-[0_4px_14px_rgba(14,84,135,0.04)] hover:shadow-[0_20px_50px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                {/* Header */}
                <div className={`bg-gradient-to-br ${r.accent} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center font-heading font-bold text-[24px] backdrop-blur-md">{r.icon}</div>
                      <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${r.pillBg}`}>{r.minutes}</span>
                    </div>
                    <div className="text-[12px] font-bold uppercase tracking-widest opacity-70 mb-2">From</div>
                    <h3 className="text-[28px] font-heading font-extrabold mb-2 leading-none">{r.from}</h3>
                    <p className="text-[14px] opacity-80 leading-[1.5]">{r.sub}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-7 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6">
                    {r.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-[14px] text-text-body">
                        <span className="w-5 h-5 rounded-full bg-brand-pale text-brand text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Snippet */}
                  <div className="bg-[#0F172A] rounded-2xl p-5 font-mono text-[12px] leading-[1.7] text-slate-300 mb-6 overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                    </div>
                    <pre className="whitespace-pre overflow-x-auto"><code className="text-slate-300">{r.snippet}</code></pre>
                  </div>

                  <Link href={r.href} className="text-brand text-[14px] font-bold inline-flex items-center gap-1 mt-auto group-hover:gap-2 transition-all">
                    Read the full guide
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-16 bg-bg-page border border-border-default rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[14px] text-text-body">
              <span className="font-bold text-text-heading">Don't see your platform?</span> We've helped teams move from Fly.io, Cloud Run, ECS and DigitalOcean too.
            </div>
            <Link href="/contact" className="bg-brand text-white text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-brand-hover transition-colors shrink-0">
              Talk to migrations
            </Link>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert as a new section between the Bento grid and Feature tabs on the home page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Requires writing the actual <code className="bg-bg-blue-tint text-brand px-1.5 py-0.5 rounded text-[12px]">dcd convert</code> and <code className="bg-bg-blue-tint text-brand px-1.5 py-0.5 rounded text-[12px]">dcd init --from heroku</code> CLI commands &mdash; mark as &ldquo;coming soon&rdquo; until they ship, or hide the &ldquo;Read the full guide&rdquo; links.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Add real migration guide pages at <code className="bg-bg-blue-tint text-brand px-1.5 py-0.5 rounded text-[12px]">/docs/migration/&#123;heroku,railway,render&#125;</code>.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Strong SEO play &mdash; these pages will rank for &ldquo;heroku alternative&rdquo;, &ldquo;migrate off railway&rdquo;, etc.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
