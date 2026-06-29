"use client";

import { useState } from "react";
import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

interface Step {
  id: string;
  label: string;
  title: string;
  desc: string;
  code: string;
  output?: string;
  time: string;
}

const steps: Step[] = [
  {
    id: "install",
    label: "1. Install",
    title: "Install the CLI",
    desc: "Single binary for macOS, Linux and Windows. No runtime dependencies, no Python, no Node.",
    code: `# macOS / Linux
curl -fsSL https://dcdeploy.com/install.sh | sh

# or via Homebrew
brew install dcdeploy/tap/dcd

# or via Scoop (Windows)
scoop install dcd`,
    output: `Installed dcd v1.4.2 to /usr/local/bin/dcd
Run \`dcd --help\` to get started.`,
    time: "~5s",
  },
  {
    id: "login",
    label: "2. Login",
    title: "Authenticate once",
    desc: "Opens a browser, you click 'authorize', you're back at your terminal. SSH keys handled automatically.",
    code: `$ dcd login`,
    output: `→ Opening https://dash.dcdeploy.com/cli/auth
→ Waiting for authorization...
✔ Logged in as you@yourcompany.com
✔ Default org: acme
✔ Default region: fra1`,
    time: "~15s",
  },
  {
    id: "deploy",
    label: "3. Deploy",
    title: "Ship from any directory",
    desc: "Run from your repo root. Auto-detects your stack, builds, and gives you a live URL.",
    code: `$ cd ./my-saas
$ dcd deploy`,
    output: `→ Detected: Next.js 14 (App Router)
→ Service name: my-saas
→ Region: fra1 · Machine: DCD-1
→ Building image... 1.2s
→ Snapshotting microVM... 187ms
→ Routing traffic to v1

✔ Live at https://my-saas.dcdeploy.app (4.6s total)`,
    time: "~5s",
  },
  {
    id: "logs",
    label: "4. Logs",
    title: "Tail logs in real time",
    desc: "Filter by service, follow live, or grep historical. Same UX as Heroku logs but faster.",
    code: `$ dcd logs my-saas --follow

# or grep historical
$ dcd logs my-saas --since 1h | grep ERROR`,
    output: `[12:44:02] GET  /             200 OK    42ms
[12:44:03] POST /api/login   200 OK    115ms
[12:44:04] GET  /dashboard   200 OK    23ms
[12:44:05] GET  /api/me      200 OK    11ms
^ following — Ctrl+C to exit`,
    time: "live",
  },
  {
    id: "scale",
    label: "5. Scale",
    title: "Resize without redeploying",
    desc: "Bump the machine size, change region, or pin to always-on. No downtime.",
    code: `# resize machine
$ dcd scale my-saas --size DCD-3

# pin to always-on (skip idle suspend)
$ dcd scale my-saas --always-on`,
    output: `→ Provisioning DCD-3 microVM in fra1...
→ Snapshot transfer... 412ms
→ Health check passed
✔ my-saas now running on DCD-3 (4 GB RAM, 2 vCPU)`,
    time: "~3s",
  },
  {
    id: "rollback",
    label: "6. Rollback",
    title: "Undo a bad deploy",
    desc: "Every deploy is a snapshot. Roll back to any previous version in one command.",
    code: `# list recent deploys
$ dcd releases my-saas

# rollback to v7
$ dcd rollback my-saas --to v7`,
    output: `→ Restoring v7 (deployed 14m ago)
→ Routing fra1 traffic away from v9...
→ Restoring v7 from snapshot... 203ms
✔ Rolled back to v7`,
    time: "~1s",
  },
];

export default function CliPreview() {
  const [active, setActive] = useState(steps[0].id);
  const step = steps.find((s) => s.id === active) ?? steps[0];

  return (
    <PreviewShell
      eyebrow="CLI"
      title="Six commands to ship."
      description="Side-by-side CLI tour — tabbed sequence of the 6 commands a developer actually uses (install, login, deploy, logs, scale, rollback). Same content can live on /docs as a reference page."
      status="draft"
    >
      <section className="relative bg-bg-page py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bg-blue-tint/30 to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Command line
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              The whole platform <br /> in <span className="gradient-text">six commands.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              No clicking through dashboards if you don't want to. The CLI does everything &mdash; deploy, logs, scale, rollback &mdash; from any terminal.
            </p>
          </div>

          {/* Tab strip */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                  s.id === active
                    ? "bg-brand text-white shadow-md"
                    : "bg-white border border-border-default text-text-muted hover:text-text-heading hover:border-brand"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active step */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Description */}
            <div className="lg:col-span-2 bg-white border border-border-default rounded-3xl p-8 shadow-[0_4px_14px_rgba(14,84,135,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold uppercase tracking-widest text-brand">{step.label}</span>
                <span className="text-[11px] font-mono bg-bg-blue-tint text-brand px-2 py-0.5 rounded-full">{step.time}</span>
              </div>
              <h3 className="text-[24px] font-heading font-bold text-text-heading mb-3 leading-tight">{step.title}</h3>
              <p className="text-[14px] text-text-body leading-[1.7] mb-6">{step.desc}</p>
              <Link href="/docs" className="text-[13px] font-bold text-brand inline-flex items-center gap-1 hover:gap-2 transition-all">
                Reference docs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Terminal */}
            <div className="lg:col-span-3 bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-black/30">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="ml-auto text-[12px] text-slate-500 font-mono">~/projects/{step.id}</span>
              </div>
              <div className="p-6 md:p-7 font-mono text-[13px] leading-[1.8]">
                <pre className="text-slate-100 whitespace-pre-wrap break-all">{step.code}</pre>
                {step.output && (
                  <>
                    <div className="border-t border-white/5 my-4"></div>
                    <pre className="text-slate-400 whitespace-pre-wrap break-all">{step.output}</pre>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-[12px] text-text-muted mt-8">
            CLI source is on GitHub. Same binary works against your own DCDeploy instance if you self-host.
          </p>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Best fit: a dedicated `/cli` page (linked from docs + home). On the home page, condense to 2-3 tabs instead of 6.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Code snippets should be sourced from a single fixture file so they stay in sync with the actual CLI.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Pair with the existing /preview/deploy-demo &mdash; one shows the CLI commands, the other shows what happens behind them.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
