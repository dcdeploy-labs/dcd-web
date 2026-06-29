import { PreviewShell } from "../../../components/preview/PreviewShell";

const specs = [
  { label: "CPU", value: "AMD EPYC + Intel Gold", desc: "Latest-gen server-grade silicon. No shared neighbours stealing your cycles." },
  { label: "Storage", value: "NVMe SSD", desc: "Sub-millisecond I/O on every machine. No spinning rust, no network-attached storage hop." },
  { label: "Isolation", value: "MicroVMs", desc: "Each workload runs in its own kernel-level virtual machine. Real isolation, not just containers." },
  { label: "Networking", value: "WireGuard mesh", desc: "Private encrypted overlay between your services. No bytes leak to the public internet." },
];

const regions = [
  { code: "FRA1", city: "Frankfurt", country: "Germany", status: "live", note: "AMD EPYC + Intel Gold · NVMe · WireGuard mesh", lat: 50.11, lng: 8.68 },
  { code: "AMS1", city: "Amsterdam", country: "Netherlands", status: "soon", note: "Targeting Q3 2026", lat: 52.37, lng: 4.89 },
  { code: "SIN1", city: "Singapore", country: "Singapore", status: "soon", note: "Targeting Q4 2026", lat: 1.35, lng: 103.82 },
  { code: "NYC1", city: "New York", country: "USA", status: "planned", note: "Roadmap 2027", lat: 40.71, lng: -74.0 },
  { code: "BLR1", city: "Bangalore", country: "India", status: "planned", note: "Roadmap 2027", lat: 12.97, lng: 77.59 },
];

function statusClasses(status: string) {
  if (status === "live") return "bg-green-500/20 text-green-300 border-green-500/40";
  if (status === "soon") return "bg-amber-500/20 text-amber-300 border-amber-500/40";
  return "bg-slate-500/20 text-slate-400 border-slate-500/40";
}

function statusLabel(status: string) {
  if (status === "live") return "Live";
  if (status === "soon") return "Coming soon";
  return "Planned";
}

export default function InfraPreview() {
  return (
    <PreviewShell
      eyebrow="Infrastructure"
      title="Honest bare-metal story"
      description="Replacement for the 'deploy to 35+ regions worldwide' globe section. Tells the real, current story: one production region (Frankfurt) on real bare metal, with a transparent roadmap for more. Far more credible to developers than fictional numbers."
    >
      <section className="relative bg-[#0F172A] py-32 px-6 overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert"></div>
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-brand/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#4da1db]/20 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="bg-white/10 text-brand-light border border-white/20 text-[13px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest backdrop-blur-md">
              Infrastructure
            </div>
            <h2 className="text-[40px] md:text-[56px] font-heading font-extrabold text-white leading-[1.05] mb-6 max-w-3xl">
              Real metal. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">Real privacy.</span>
            </h2>
            <p className="text-[18px] text-slate-300 max-w-2xl leading-[1.8]">
              We won't tell you we have 35 regions. We have one production region today, more on the way &mdash; and every machine is the kind of hardware most platforms only put behind their enterprise tier.
            </p>
          </div>

          {/* Stat callouts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {specs.map((s, i) => (
              <div key={i} className="bg-[#1E293B]/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-brand-light/40 transition-colors">
                <div className="text-[11px] font-bold uppercase tracking-widest text-brand-light mb-2">{s.label}</div>
                <div className="text-[18px] font-heading font-bold text-white mb-3 leading-tight">{s.value}</div>
                <div className="text-[12px] text-slate-400 leading-[1.5]">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Regions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Region list */}
            <div>
              <h3 className="text-[24px] font-heading font-bold text-white mb-6">Where we run today</h3>
              <div className="space-y-3">
                {regions.map((r) => (
                  <div key={r.code} className="flex items-center gap-4 bg-[#1E293B]/60 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:border-brand-light/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono text-[12px] font-bold text-brand-light shrink-0">{r.code}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-[15px]">{r.city}, <span className="text-slate-400 font-normal">{r.country}</span></div>
                      <div className="text-[12px] text-slate-500 truncate">{r.note}</div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${statusClasses(r.status)} shrink-0`}>
                      {statusLabel(r.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map mockup */}
            <div className="relative bg-[#0B1220] border border-white/10 rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center p-8">
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(77,161,219,0.15)" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="800" height="400" fill="url(#grid)" />
                  {/* Stylised continents */}
                  <path d="M 100 130 Q 150 100 220 110 T 360 130 Q 420 145 460 130 Q 510 115 540 135 L 540 200 Q 480 220 420 210 T 300 200 Q 220 195 150 200 Z" fill="rgba(77,161,219,0.06)" stroke="rgba(77,161,219,0.2)" strokeWidth="1"/>
                  <path d="M 560 150 Q 620 130 680 160 Q 730 180 720 230 Q 680 260 620 250 T 560 220 Z" fill="rgba(77,161,219,0.06)" stroke="rgba(77,161,219,0.2)" strokeWidth="1"/>
                  <path d="M 200 240 Q 240 230 280 250 T 320 290 Q 280 320 240 310 Q 210 290 200 270 Z" fill="rgba(77,161,219,0.06)" stroke="rgba(77,161,219,0.2)" strokeWidth="1"/>
                </svg>
              </div>

              {/* Region dots — positioned roughly */}
              <div className="absolute" style={{ top: "30%", left: "47%" }}>
                <div className="relative">
                  <span className="absolute -inset-3 rounded-full bg-green-400/40 animate-ping"></span>
                  <span className="relative block w-4 h-4 rounded-full bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"></span>
                  <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-green-300 bg-black/50 backdrop-blur px-2 py-0.5 rounded-full border border-green-400/30">FRA1 · Live</span>
                </div>
              </div>
              <div className="absolute" style={{ top: "28%", left: "44%" }}>
                <span className="block w-3 h-3 rounded-full bg-amber-400/80 animate-pulse"></span>
              </div>
              <div className="absolute" style={{ top: "55%", left: "73%" }}>
                <span className="block w-3 h-3 rounded-full bg-amber-400/80 animate-pulse"></span>
              </div>
              <div className="absolute" style={{ top: "35%", left: "22%" }}>
                <span className="block w-2.5 h-2.5 rounded-full bg-slate-400/50"></span>
              </div>
              <div className="absolute" style={{ top: "52%", left: "65%" }}>
                <span className="block w-2.5 h-2.5 rounded-full bg-slate-400/50"></span>
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 font-mono">stylised · not geographically precise</div>
            </div>
          </div>

          {/* Closing note */}
          <div className="bg-gradient-to-br from-brand/10 to-transparent border border-brand/20 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center">
            <h3 className="text-[20px] font-bold text-white mb-3">Why we tell you the truth</h3>
            <p className="text-[15px] text-slate-300 leading-[1.7]">
              We could claim &ldquo;35 regions&rdquo; like everyone else does. But you'd find out the first time your service went down for an hour because every &ldquo;region&rdquo; was actually a single CDN edge in front of one US data centre. We'd rather you know what you're getting.
            </p>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span><strong>Replaces</strong> the existing &ldquo;Global Edge Network &mdash; 35+ regions / 3Tbps / 15ms&rdquo; section on the home page (section 5).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Region data should live in a JSON/CMS doc so we can flip statuses without redeploying.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>The map is intentionally stylised. If we want a real geo map, swap in a lightweight SVG of just the continents or use react-simple-maps.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Stats &ldquo;15ms latency&rdquo; / &ldquo;3Tbps&rdquo; / &ldquo;35+ regions&rdquo; will be removed elsewhere when this lands.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
