"use client";

import { useState } from "react";
import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

type Lang = "curl" | "node" | "python";

interface Endpoint {
  method: "GET" | "POST" | "DELETE";
  path: string;
  title: string;
  desc: string;
  samples: Record<Lang, string>;
  response: string;
}

const endpoints: Endpoint[] = [
  {
    method: "POST",
    path: "/v1/deployments",
    title: "Create a deployment",
    desc: "Trigger a new deploy of a service. The server returns immediately; tail the stream URL to follow build logs.",
    samples: {
      curl: `curl -X POST https://api.dcdeploy.com/v1/deployments \\
  -H "Authorization: Bearer $DCD_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "acme-saas",
    "git_ref": "main"
  }'`,
      node: `import { Dcd } from "dcdeploy";
const dcd = new Dcd(process.env.DCD_TOKEN);

const deploy = await dcd.deployments.create({
  service: "acme-saas",
  git_ref: "main",
});

console.log("Deploy ID:", deploy.id);`,
      python: `from dcdeploy import Client
dcd = Client(token=os.environ["DCD_TOKEN"])

deploy = dcd.deployments.create(
    service="acme-saas",
    git_ref="main",
)

print(f"Deploy ID: {deploy.id}")`,
    },
    response: `{
  "id": "dep_7H2k...",
  "service": "acme-saas",
  "git_ref": "main",
  "status": "queued",
  "created_at": "2026-06-29T12:44:01Z",
  "stream_url": "wss://api.dcdeploy.com/v1/deployments/dep_7H2k.../stream"
}`,
  },
  {
    method: "GET",
    path: "/v1/services/:id/logs",
    title: "Tail logs",
    desc: "Open a WebSocket stream of stdout/stderr from every microVM running the service. Supports filtering and grep.",
    samples: {
      curl: `# WebSocket-aware client
wscat -c "wss://api.dcdeploy.com/v1/services/acme-saas/logs?since=5m&grep=ERROR" \\
  -H "Authorization: Bearer $DCD_TOKEN"`,
      node: `for await (const line of dcd.services.logs("acme-saas", { since: "5m" })) {
  console.log(line.ts, line.level, line.message);
}`,
      python: `for line in dcd.services.logs("acme-saas", since="5m"):
    print(line.ts, line.level, line.message)`,
    },
    response: `{"ts":"12:44:01.812","level":"info","message":"GET / 200 OK 42ms"}
{"ts":"12:44:02.103","level":"info","message":"GET /api/user 200 OK 18ms"}
{"ts":"12:44:03.441","level":"warn","message":"slow query 412ms in /api/search"}`,
  },
  {
    method: "POST",
    path: "/v1/services/:id/scale",
    title: "Scale a service",
    desc: "Change machine size or always-on policy. Restore happens in-place; no rebuild needed.",
    samples: {
      curl: `curl -X POST https://api.dcdeploy.com/v1/services/acme-saas/scale \\
  -H "Authorization: Bearer $DCD_TOKEN" \\
  -d '{ "size": "DCD-3", "always_on": true }'`,
      node: `await dcd.services.scale("acme-saas", {
  size: "DCD-3",
  alwaysOn: true,
});`,
      python: `dcd.services.scale("acme-saas",
    size="DCD-3",
    always_on=True,
)`,
    },
    response: `{
  "service": "acme-saas",
  "size": "DCD-3",
  "always_on": true,
  "applied_at": "2026-06-29T12:44:02Z"
}`,
  },
];

const langLabels: Record<Lang, string> = { curl: "curl", node: "Node.js", python: "Python" };

export default function ApiPreview() {
  const [lang, setLang] = useState<Lang>("curl");
  const [active, setActive] = useState(0);
  const ep = endpoints[active];

  const methodColors: Record<Endpoint["method"], string> = {
    GET: "bg-green-500/20 text-green-300 border-green-500/40",
    POST: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    DELETE: "bg-red-500/20 text-red-300 border-red-500/40",
  };

  return (
    <PreviewShell
      eyebrow="API"
      title="Automate everything."
      description="Three representative API examples with a curl / Node / Python toggle. Side-by-side request + response so visitors can see what they'd actually integrate against."
      status="draft"
    >
      <section className="relative bg-[#0F172A] py-24 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.04] invert"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand/30 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-light text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
              REST API
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-extrabold leading-[1.1] mb-6">
              Every dashboard action <br />
              has a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">REST endpoint.</span>
            </h2>
            <p className="text-[16px] text-slate-300 max-w-2xl mx-auto leading-[1.7]">
              Build custom automations, wire CI workflows, or replace the dashboard entirely. Token auth, JSON in and out, predictable shapes.
            </p>
          </div>

          {/* Endpoint tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {endpoints.map((e, i) => (
              <button
                key={e.path}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold transition-all border ${
                  i === active
                    ? "bg-brand text-white border-brand"
                    : "bg-white/5 text-slate-300 border-white/10 hover:border-brand-light/40 hover:text-white"
                }`}
              >
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${methodColors[e.method]}`}>{e.method}</span>
                <span className="font-mono">{e.path}</span>
              </button>
            ))}
          </div>

          {/* Active endpoint */}
          <div className="text-center mb-6">
            <h3 className="text-[22px] font-heading font-bold text-white mb-1">{ep.title}</h3>
            <p className="text-[14px] text-slate-400 max-w-xl mx-auto">{ep.desc}</p>
          </div>

          {/* Language toggle */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                    l === lang ? "bg-brand text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
          </div>

          {/* Request + response */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Request &mdash; {langLabels[lang]}</span>
                <span className="text-[10px] text-slate-600 font-mono">copy</span>
              </div>
              <pre className="p-5 font-mono text-[12px] leading-[1.7] text-slate-100 overflow-x-auto"><code>{ep.samples[lang]}</code></pre>
            </div>

            <div className="bg-[#0B1220] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Response</span>
                <span className="text-[10px] text-green-300 font-mono">200 OK</span>
              </div>
              <pre className="p-5 font-mono text-[12px] leading-[1.7] text-slate-300 overflow-x-auto"><code>{ep.response}</code></pre>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-[13px] text-slate-400">
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Token-scoped permissions</span>
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Per-org rate limits</span>
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Idempotency-Key supported</span>
            <span className="flex items-center gap-2"><span className="text-green-400">✓</span> Open-source SDKs</span>
          </div>

          <div className="text-center mt-12">
            <Link href="/docs" className="inline-flex items-center gap-2 bg-white text-[#0F172A] font-bold px-6 py-3 rounded-full hover:bg-slate-100 transition-colors">
              Full API reference &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Bento Grid (section 6) and Feature Tabs (section 7). Or replace the API teaser already in /docs.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Snippets should be sourced from a real fixture (and tested in CI) so the docs and the API never drift.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Could be reduced to just one tab + lang on the home page; this richer 3 tabs + 3 langs version belongs on /docs/api.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
