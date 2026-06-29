import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

type Cell = "yes" | "no" | "partial" | string;

interface Row {
  feature: string;
  dcdeploy: Cell;
  heroku: Cell;
  railway: Cell;
  render: Cell;
  fly: Cell;
  note?: string;
}

const rows: Row[] = [
  { feature: "Always-free tier", dcdeploy: "yes", heroku: "no", railway: "partial", render: "partial", fly: "partial", note: "Heroku killed the free tier in 2022. Railway gives a one-time $5 credit. Render free dynos sleep after 15 min." },
  { feature: "Per-minute billing", dcdeploy: "yes", heroku: "no", railway: "yes", render: "no", fly: "yes" },
  { feature: "Bare-metal compute", dcdeploy: "yes", heroku: "no", railway: "no", render: "no", fly: "no", note: "Most competitors run shared cloud VMs. We run AMD EPYC + Intel Gold on NVMe." },
  { feature: "Scale-to-zero", dcdeploy: "yes", heroku: "no", railway: "no", render: "partial", fly: "yes" },
  { feature: "BYO Dockerfile", dcdeploy: "yes", heroku: "yes", railway: "yes", render: "yes", fly: "yes" },
  { feature: "Managed Postgres", dcdeploy: "yes", heroku: "yes", railway: "yes", render: "yes", fly: "yes" },
  { feature: "Managed Redis", dcdeploy: "yes", heroku: "yes", railway: "yes", render: "yes", fly: "no" },
  { feature: "Microvm isolation", dcdeploy: "yes", heroku: "no", railway: "no", render: "no", fly: "yes" },
  { feature: "Private WireGuard mesh", dcdeploy: "yes", heroku: "no", railway: "no", render: "no", fly: "yes" },
  { feature: "EU data residency", dcdeploy: "yes", heroku: "yes", railway: "no", render: "partial", fly: "yes" },
  { feature: "Transparent dashboard pricing", dcdeploy: "yes", heroku: "partial", railway: "yes", render: "yes", fly: "partial" },
];

const competitors = [
  { id: "dcdeploy", name: "DCDeploy", highlight: true, badge: "You're here", color: "bg-brand text-white" },
  { id: "heroku", name: "Heroku", color: "bg-purple-100 text-purple-700" },
  { id: "railway", name: "Railway", color: "bg-pink-100 text-pink-700" },
  { id: "render", name: "Render", color: "bg-emerald-100 text-emerald-700" },
  { id: "fly", name: "Fly.io", color: "bg-violet-100 text-violet-700" },
];

function Mark({ value }: { value: Cell }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 font-bold text-[14px]">~</span>
    );
  }
  return <span className="text-[13px] font-semibold text-text-body">{value}</span>;
}

export default function ComparisonPreview() {
  return (
    <PreviewShell
      eyebrow="Comparison"
      title="Why DCDeploy vs the rest"
      description="Honest, factual side-by-side. Each row is something developers actually evaluate on. Hover any row to see a footnote where one exists. Numbers should be reviewed and updated quarterly to stay accurate."
    >
      <section className="relative bg-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-50"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Side-by-side
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              See how we <span className="gradient-text">stack up.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              No marketing fluff &mdash; just what each platform actually does today.
            </p>
          </div>

          {/* Table */}
          <div className="bg-white border border-border-default rounded-[24px] shadow-[0_20px_60px_rgba(14,84,135,0.06)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[760px]">
                <thead>
                  <tr className="border-b border-border-default bg-bg-blue-tint/40">
                    <th className="px-6 py-5 text-[12px] font-bold text-text-muted uppercase tracking-widest w-[40%]">Feature</th>
                    {competitors.map((c) => (
                      <th key={c.id} className={`px-4 py-5 text-center ${c.highlight ? "bg-brand/5" : ""}`}>
                        <div className="flex flex-col items-center gap-1">
                          <span className={`text-[14px] font-bold ${c.highlight ? "text-brand" : "text-text-heading"}`}>{c.name}</span>
                          {c.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand text-white px-2 py-0.5 rounded-full">{c.badge}</span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-border-default last:border-b-0 group hover:bg-bg-blue-tint/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#FBFCFE]"}`}>
                      <td className="px-6 py-4">
                        <div className="text-[14px] font-semibold text-text-heading">{row.feature}</div>
                        {row.note && (
                          <div className="text-[12px] text-text-muted mt-1 max-w-md opacity-0 group-hover:opacity-100 transition-opacity">{row.note}</div>
                        )}
                      </td>
                      <td className={`px-4 py-4 text-center ${competitors[0].highlight ? "bg-brand/5" : ""}`}><Mark value={row.dcdeploy} /></td>
                      <td className="px-4 py-4 text-center"><Mark value={row.heroku} /></td>
                      <td className="px-4 py-4 text-center"><Mark value={row.railway} /></td>
                      <td className="px-4 py-4 text-center"><Mark value={row.render} /></td>
                      <td className="px-4 py-4 text-center"><Mark value={row.fly} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[13px] text-text-muted">
            <span className="flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-700"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span> Full support</span>
            <span className="flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 text-amber-600 font-bold text-[12px]">~</span> Partial / with caveats</span>
            <span className="flex items-center gap-2"><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-red-500"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span> Not supported</span>
            <span className="flex items-center gap-2 italic">Hover a row for notes</span>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="https://dash.dcdeploy.com" className="inline-flex items-center gap-2 bg-[#fcb817] text-[#0F172A] font-semibold px-7 py-3.5 rounded-full hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all shadow-[0_4px_14px_rgba(252,184,23,0.35)]">
              Try DCDeploy Free &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert as a new section right before the Free Tier Spotlight on the home page.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Move competitor data into a JSON file so it can be reviewed/updated independently of the page (claims need quarterly audit).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Consider linking each competitor cell to a footnote source (e.g. "Heroku free tier ended 2022", linked to Heroku's blog post) to defend the claim.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Add a column-highlight on hover so it's easier to read a single competitor down.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
