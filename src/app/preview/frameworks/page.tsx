import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Framework {
  name: string;
  category: "Web" | "API" | "Compiled" | "Runtime" | "Static";
  detect: string;
  popular?: boolean;
}

const frameworks: Framework[] = [
  // Web
  { name: "Next.js", category: "Web", detect: "next.config.{js,mjs,ts}", popular: true },
  { name: "Remix", category: "Web", detect: "remix.config.js" },
  { name: "SvelteKit", category: "Web", detect: "svelte.config.js" },
  { name: "Nuxt", category: "Web", detect: "nuxt.config.{js,ts}" },
  { name: "Astro", category: "Web", detect: "astro.config.{js,mjs,ts}" },
  { name: "Vite", category: "Web", detect: "vite.config.{js,ts}" },
  // API
  { name: "Express", category: "API", detect: "express in package.json" },
  { name: "NestJS", category: "API", detect: "nest-cli.json" },
  { name: "Fastify", category: "API", detect: "fastify in package.json" },
  { name: "Django", category: "API", detect: "manage.py + django in requirements", popular: true },
  { name: "FastAPI", category: "API", detect: "fastapi in requirements" },
  { name: "Flask", category: "API", detect: "flask in requirements" },
  { name: "Rails", category: "API", detect: "Gemfile with rails gem" },
  { name: "Laravel", category: "API", detect: "composer.json with laravel/framework" },
  { name: "Spring Boot", category: "API", detect: "pom.xml with spring-boot-starter" },
  { name: "Phoenix", category: "API", detect: "mix.exs with phoenix" },
  // Compiled
  { name: "Go", category: "Compiled", detect: "go.mod", popular: true },
  { name: "Rust", category: "Compiled", detect: "Cargo.toml" },
  { name: "Java", category: "Compiled", detect: "pom.xml or build.gradle" },
  { name: ".NET", category: "Compiled", detect: "*.csproj" },
  // Runtimes
  { name: "Node.js", category: "Runtime", detect: "package.json" },
  { name: "Bun", category: "Runtime", detect: "bun.lockb" },
  { name: "Deno", category: "Runtime", detect: "deno.json" },
  { name: "Python", category: "Runtime", detect: "requirements.txt / pyproject.toml" },
  // Static
  { name: "Hugo", category: "Static", detect: "config.toml + hugo binary" },
  { name: "Jekyll", category: "Static", detect: "_config.yml + Gemfile with jekyll" },
  { name: "Static HTML", category: "Static", detect: "index.html at root" },
];

const categoryStyles: Record<Framework["category"], { label: string; bg: string; text: string }> = {
  Web: { label: "Web", bg: "bg-blue-50 border-blue-200", text: "text-blue-700" },
  API: { label: "Backend", bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
  Compiled: { label: "Compiled", bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  Runtime: { label: "Runtime", bg: "bg-purple-50 border-purple-200", text: "text-purple-700" },
  Static: { label: "Static", bg: "bg-slate-100 border-slate-200", text: "text-slate-700" },
};

export default function FrameworksPreview() {
  const grouped = (Object.keys(categoryStyles) as Framework["category"][]).map((cat) => ({
    category: cat,
    style: categoryStyles[cat],
    items: frameworks.filter((f) => f.category === cat),
  }));

  return (
    <PreviewShell
      eyebrow="Frameworks"
      title="Your stack is supported."
      description="A wide grid of auto-detected frameworks and runtimes, grouped by category. Each tile shows what file or signal we look for. Anything not on the list still works via a Dockerfile."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Auto-detected
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Bring any stack. <span className="gradient-text">Skip the YAML.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              Push a repo, we'll figure out what to do with it. Auto-detection for {frameworks.length}+ frameworks &mdash; and anything else builds from a Dockerfile.
            </p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { value: `${frameworks.length}+`, label: "auto-detected frameworks" },
              { value: "*", label: "via Dockerfile" },
              { value: "0", label: "lines of YAML required" },
              { value: "<1s", label: "detection on git push" },
            ].map((stat) => (
              <div key={stat.label} className="bg-bg-blue-tint/40 border border-border-blue rounded-2xl p-4 text-center">
                <div className="text-[28px] font-heading font-extrabold text-brand leading-none mb-1">{stat.value}</div>
                <div className="text-[12px] text-text-muted leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Grouped grid */}
          <div className="space-y-10">
            {grouped.map((group) => (
              <div key={group.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${group.style.bg} ${group.style.text}`}>
                    {group.style.label}
                  </span>
                  <div className="flex-1 h-px bg-border-default"></div>
                  <span className="text-[12px] text-text-muted">{group.items.length}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {group.items.map((f) => (
                    <div
                      key={f.name}
                      className="group relative bg-white border border-border-default rounded-2xl p-4 hover:border-brand hover:shadow-[0_8px_24px_rgba(14,84,135,0.08)] transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-9 h-9 rounded-xl bg-bg-blue-tint border border-border-blue flex items-center justify-center text-[14px] font-mono font-bold text-brand shrink-0">
                          {f.name.charAt(0).toUpperCase()}
                        </div>
                        {f.popular && (
                          <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">★</span>
                        )}
                      </div>
                      <div className="text-[14px] font-bold text-text-heading mb-1 truncate">{f.name}</div>
                      <div className="text-[11px] text-text-muted font-mono truncate" title={f.detect}>
                        {f.detect}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Catch-all */}
          <div className="mt-12 bg-[#0F172A] border border-[#1E293B] rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-[0.06] invert"></div>
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-brand/20 border border-brand/40 flex items-center justify-center text-[24px] shrink-0">
              🐳
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-[20px] font-bold mb-2">Don't see your stack?</h3>
              <p className="text-[14px] text-slate-300 leading-[1.6] max-w-xl">
                If it builds in a container, it runs on DCDeploy. Drop a <code className="bg-white/10 px-1.5 py-0.5 rounded text-brand-light font-mono text-[12px]">Dockerfile</code> at your repo root and we'll pick it up automatically &mdash; no other config needed.
              </p>
            </div>
            <Link href="/docs" className="relative z-10 text-[13px] font-bold text-brand-light hover:text-white transition-colors flex items-center gap-1 shrink-0">
              Dockerfile guide
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="text-center mt-12 text-[12px] text-text-muted">
            ★ marks the most-deployed stacks on the platform this month.
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Pipeline Visualizer and &ldquo;How it works&rdquo; on the home page &mdash; lets a developer scan-confirm their stack works in one glance.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>The detection rules should be sourced from the actual auto-detector (single source of truth). Move <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">frameworks</code> to a shared JSON or fetch from the builder service.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Swap the placeholder first-letter avatars for real brand logos before promoting.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>&ldquo;Most-deployed this month&rdquo; (★) should be a real metric pulled from the stats API.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
