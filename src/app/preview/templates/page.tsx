import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Template {
  name: string;
  stack: string;
  desc: string;
  category: "Web" | "API" | "Worker" | "Static";
  size: "DCD-1" | "DCD-2" | "DCD-3";
  time: string;
  icon: string;
  accent: string;
  popular?: boolean;
}

const templates: Template[] = [
  {
    name: "Next.js SaaS Starter",
    stack: "Next.js 14 + Postgres + Stripe",
    desc: "App-router scaffold with auth, billing, and a marketing page. Deploys with a managed Postgres in one click.",
    category: "Web",
    size: "DCD-2",
    time: "~90s",
    icon: "▲",
    accent: "from-slate-900 to-slate-700",
    popular: true,
  },
  {
    name: "Discord Bot",
    stack: "Node.js worker",
    desc: "Persistent worker that listens to gateway events. Always-on by default on Starter; free Basic sleeps when no activity.",
    category: "Worker",
    size: "DCD-1",
    time: "~45s",
    icon: "🤖",
    accent: "from-indigo-600 to-purple-600",
  },
  {
    name: "Cron Job",
    stack: "Any language",
    desc: "Schedule a script to run every minute, hour, or day. Wakes from snapshot, runs, suspends. Pay only for the seconds it executes.",
    category: "Worker",
    size: "DCD-1",
    time: "~30s",
    icon: "⏱️",
    accent: "from-amber-500 to-orange-600",
  },
  {
    name: "FastAPI + Postgres",
    stack: "Python 3.12 + FastAPI + Postgres",
    desc: "Production-shaped Python API with migrations, async DB pool, OpenAPI docs, and pre-wired health checks.",
    category: "API",
    size: "DCD-2",
    time: "~75s",
    icon: "🐍",
    accent: "from-blue-600 to-cyan-600",
    popular: true,
  },
  {
    name: "Django Full Stack",
    stack: "Django + Postgres + Redis",
    desc: "Classic Django scaffold with admin, sessions in Redis, Celery worker, and static files served from edge.",
    category: "Web",
    size: "DCD-3",
    time: "~110s",
    icon: "🦅",
    accent: "from-emerald-700 to-green-600",
  },
  {
    name: "Static Portfolio",
    stack: "Astro / Hugo / Plain HTML",
    desc: "Personal site or blog. Globally cached at the edge, free SSL, custom domain on Starter.",
    category: "Static",
    size: "DCD-1",
    time: "~20s",
    icon: "🎨",
    accent: "from-pink-500 to-rose-500",
  },
  {
    name: "Webhook Router",
    stack: "Express / Hono",
    desc: "Receive webhooks, sign-verify, transform, and fan-out to your services. Built-in retry + dead-letter logging.",
    category: "API",
    size: "DCD-1",
    time: "~40s",
    icon: "🔀",
    accent: "from-violet-600 to-fuchsia-600",
  },
  {
    name: "Telegram Bot",
    stack: "Python worker",
    desc: "Long-polling Telegram bot scaffold with command handlers and a Postgres-backed session store.",
    category: "Worker",
    size: "DCD-1",
    time: "~35s",
    icon: "📨",
    accent: "from-sky-500 to-blue-600",
  },
  {
    name: "Go API",
    stack: "Go 1.22 + chi",
    desc: "Minimal Go HTTP service with structured logging, graceful shutdown, and pgx-based Postgres access.",
    category: "API",
    size: "DCD-1",
    time: "~25s",
    icon: "🐹",
    accent: "from-cyan-500 to-teal-600",
  },
];

const categoryPill: Record<Template["category"], string> = {
  Web: "bg-blue-100 text-brand",
  API: "bg-emerald-100 text-emerald-700",
  Worker: "bg-amber-100 text-amber-700",
  Static: "bg-slate-100 text-slate-700",
};

export default function TemplatesPreview() {
  return (
    <PreviewShell
      eyebrow="Templates"
      title="Deploy something real in under 2 minutes."
      description="One-click starter gallery. Each tile spins up a working app with the right machine size, attached services (Postgres, Redis), and a sample repo cloned to your account. Time-to-live numbers are p50 estimates."
      status="draft"
    >
      <section className="relative bg-bg-page py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bg-blue-tint/30 to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              One-click templates
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Skip the boilerplate. <br />
              <span className="gradient-text">Start from something real.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              Production-shaped starters for the apps developers actually ship. We clone the repo to your account, provision the right services, and deploy &mdash; one click.
            </p>
          </div>

          {/* Templates grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((t) => (
              <div
                key={t.name}
                className="group bg-white border border-border-default rounded-3xl overflow-hidden hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,84,135,0.1)] transition-all duration-300 flex flex-col"
              >
                {/* Visual header */}
                <div className={`bg-gradient-to-br ${t.accent} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center text-[28px]">
                      {t.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      {t.popular && (
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-md">★ Popular</span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-black/30 text-white/90 px-2 py-0.5 rounded-full backdrop-blur-md">{t.size}</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${categoryPill[t.category]}`}>{t.category}</span>
                    <span className="text-[11px] text-text-muted font-mono">deploys in {t.time}</span>
                  </div>
                  <h3 className="text-[18px] font-heading font-bold text-text-heading mb-1 leading-tight group-hover:text-brand transition-colors">{t.name}</h3>
                  <div className="text-[12px] text-text-muted font-mono mb-3 truncate" title={t.stack}>{t.stack}</div>
                  <p className="text-[13px] text-text-body leading-[1.5] mb-5 flex-1">{t.desc}</p>

                  <Link
                    href="https://dash.dcdeploy.com"
                    className="block w-full py-3 text-center rounded-full bg-bg-page border border-border-default text-text-heading font-bold text-[13px] hover:bg-[#fcb817] hover:text-[#0F172A] hover:border-[#fcb817] transition-all"
                  >
                    Deploy &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Closer */}
          <div className="mt-16 bg-white border border-border-default rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-bg-blue-tint border border-border-blue flex items-center justify-center text-[28px]">📦</div>
              <div>
                <h3 className="text-[18px] font-bold text-text-heading mb-1">Want your project added?</h3>
                <p className="text-[14px] text-text-muted">
                  Open-source repo &amp; fits a common pattern? We'll feature it here.
                </p>
              </div>
            </div>
            <Link href="/contact" className="bg-brand text-white text-[14px] font-bold px-5 py-3 rounded-full hover:bg-brand-hover transition-colors shrink-0">
              Submit a template
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Hero and the Free Tier Spotlight &mdash; gives skimming visitors something tangible to click within seconds of landing.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Each &ldquo;Deploy →&rdquo; button should point to a real one-click clone-and-deploy flow in the dashboard. Until that exists, links route to the regular dashboard onboarding.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>p50 deploy times (in template tiles) should be sourced from real metrics per template type.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>&ldquo;Popular&rdquo; (★) tags should be data-driven, not hand-picked.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
