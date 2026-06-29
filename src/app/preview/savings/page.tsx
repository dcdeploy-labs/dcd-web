"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PreviewShell } from "../../../components/preview/PreviewShell";
import { CurrencyToggle, formatCurrency, useCurrency, USD_TO_INR } from "../../../lib/currency";

type Competitor = "heroku" | "railway" | "render";

interface CompetitorModel {
  id: Competitor;
  name: string;
  // Rough USD pricing
  dynoUsdPerMo: number;       // cost of one always-on small dyno/service per month
  pgUsdPerMo: number;         // cost of one managed Postgres per month
  bandwidthUsdPerGB: number;  // overage rate
  note: string;
}

const competitors: Record<Competitor, CompetitorModel> = {
  heroku: {
    id: "heroku",
    name: "Heroku",
    dynoUsdPerMo: 7, // Eco / Basic dyno
    pgUsdPerMo: 9,   // Mini Postgres
    bandwidthUsdPerGB: 0.0,  // bandwidth included
    note: "Eco/Basic dyno tier · Mini Postgres",
  },
  railway: {
    id: "railway",
    name: "Railway",
    dynoUsdPerMo: 10, // Hobby + usage typical
    pgUsdPerMo: 5,
    bandwidthUsdPerGB: 0.1,
    note: "Hobby plan + usage at typical small-app load",
  },
  render: {
    id: "render",
    name: "Render",
    dynoUsdPerMo: 7, // Starter web service
    pgUsdPerMo: 7,   // Starter Postgres
    bandwidthUsdPerGB: 0.1,
    note: "Starter web service + Starter Postgres",
  },
};

// DCDeploy: per-minute on bare-metal microVMs
const DCD_PER_MIN_USD_DCD2 = 0.000046; // DCD-2 ($2/mo always-on)
const DCD_PER_MIN_USD_DCD1 = 0.000022; // DCD-1
const DCD_PG_DCD1_DB_USD = 5.30;       // Managed PG mini

export default function SavingsPreview() {
  const { currency } = useCurrency();
  const [competitor, setCompetitor] = useState<Competitor>("heroku");
  const [services, setServices] = useState(3);
  const [databases, setDatabases] = useState(1);
  const [uptimePct, setUptimePct] = useState(60); // % of month services are actually serving traffic
  const [bandwidthGB, setBandwidthGB] = useState(50);

  const result = useMemo(() => {
    const comp = competitors[competitor];

    // Competitor (always-on assumed, since most charge for it whether you use it or not)
    const compMonthly =
      services * comp.dynoUsdPerMo +
      databases * comp.pgUsdPerMo +
      Math.max(0, bandwidthGB - 100) * comp.bandwidthUsdPerGB;

    // DCDeploy: per-minute, only the seconds you're serving
    const minutesPerMonth = 43_800 * (uptimePct / 100);
    const dcdComputeUSD = services * DCD_PER_MIN_USD_DCD2 * minutesPerMonth;
    const dcdDbUSD = databases * DCD_PG_DCD1_DB_USD;
    const dcdMonthlyUSD = dcdComputeUSD + dcdDbUSD;

    const savingsUSD = Math.max(0, compMonthly - dcdMonthlyUSD);
    const pct = compMonthly > 0 ? Math.round((savingsUSD / compMonthly) * 100) : 0;

    const toCurrent = (usd: number) => (currency === "INR" ? usd * USD_TO_INR : usd);

    return {
      compMonthly: toCurrent(compMonthly),
      dcdMonthly: toCurrent(dcdMonthlyUSD),
      savings: toCurrent(savingsUSD),
      pct,
      yearlySavings: toCurrent(savingsUSD * 12),
      note: comp.note,
    };
  }, [competitor, services, databases, uptimePct, bandwidthGB, currency]);

  const fmt = (n: number) => formatCurrency(Math.round(n), currency);

  return (
    <PreviewShell
      eyebrow="Savings"
      title="What would this cost on Heroku?"
      description="ROI calculator. Picks a competitor (Heroku / Railway / Render), takes your usage shape, and computes monthly + yearly savings on DCDeploy. Honest competitor pricing inline. Different from /preview/calculator which is absolute pricing."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/40 via-white to-bg-blue-tint/40 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Savings calculator
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              What would this cost <br />
              <span className="gradient-text">on Heroku?</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7] mb-8">
              Tell us what you're running today. We'll show you what you'd save by switching, including realistic per-minute idle savings.
            </p>
            <CurrencyToggle size="sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* INPUTS */}
            <div className="lg:col-span-3 bg-white border border-border-default rounded-[28px] p-8 shadow-[0_8px_32px_rgba(14,84,135,0.06)] space-y-8">
              {/* Competitor */}
              <div>
                <label className="text-[14px] font-bold text-text-heading mb-3 block">Currently on</label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(competitors) as Competitor[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCompetitor(c)}
                      className={`py-3 rounded-xl text-[13px] font-bold transition-all border ${
                        competitor === c
                          ? "bg-brand text-white border-brand shadow-md"
                          : "bg-white text-text-muted border-border-default hover:border-brand hover:text-brand"
                      }`}
                    >
                      {competitors[c].name}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-text-muted mt-2 font-mono">{result.note}</p>
              </div>

              {/* Services */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[14px] font-bold text-text-heading">Services running</label>
                  <span className="text-[20px] font-heading font-extrabold text-brand">{services}</span>
                </div>
                <input type="range" min={1} max={20} step={1} value={services} onChange={(e) => setServices(parseInt(e.target.value, 10))} className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]" />
              </div>

              {/* Databases */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[14px] font-bold text-text-heading">Managed databases</label>
                  <span className="text-[20px] font-heading font-extrabold text-brand">{databases}</span>
                </div>
                <input type="range" min={0} max={5} step={1} value={databases} onChange={(e) => setDatabases(parseInt(e.target.value, 10))} className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]" />
              </div>

              {/* Uptime % */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[14px] font-bold text-text-heading">Actually serving traffic</label>
                  <span className="text-[20px] font-heading font-extrabold text-brand">{uptimePct}%</span>
                </div>
                <input type="range" min={10} max={100} step={5} value={uptimePct} onChange={(e) => setUptimePct(parseInt(e.target.value, 10))} className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]" />
                <p className="text-[12px] text-text-muted mt-2">
                  Most competitors bill always-on regardless. We bill per-minute, so this slider is where DCDeploy savings really kick in.
                </p>
              </div>

              {/* Bandwidth */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[14px] font-bold text-text-heading">Bandwidth / month</label>
                  <span className="text-[20px] font-heading font-extrabold text-brand">{bandwidthGB} GB</span>
                </div>
                <input type="range" min={10} max={500} step={10} value={bandwidthGB} onChange={(e) => setBandwidthGB(parseInt(e.target.value, 10))} className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]" />
              </div>
            </div>

            {/* RESULT */}
            <motion.div
              key={`${competitor}-${services}-${databases}-${uptimePct}-${bandwidthGB}-${currency}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#073a61] via-[#0e5487] to-[#227dbf] rounded-[28px] p-8 text-white shadow-[0_20px_60px_rgba(14,84,135,0.25)] relative overflow-hidden"
            >
              <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>

              <div className="relative z-10">
                <div className="text-[12px] font-bold uppercase tracking-widest opacity-80 mb-2">You'd save</div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-[56px] font-heading font-extrabold leading-none">{fmt(result.savings)}</span>
                  <span className="text-[13px] opacity-80">/month</span>
                </div>
                <div className="text-[14px] text-amber-300 font-bold mb-6">{result.pct}% less than {competitors[competitor].name}</div>

                {/* Side-by-side */}
                <div className="space-y-3 mb-6 text-[13px]">
                  <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="opacity-80">{competitors[competitor].name}</span>
                    <span className="font-bold line-through opacity-60">{fmt(result.compMonthly)}/mo</span>
                  </div>
                  <div className="flex items-center justify-between bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3">
                    <span className="font-bold">DCDeploy</span>
                    <span className="font-bold text-green-200">{fmt(result.dcdMonthly)}/mo</span>
                  </div>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur-md mb-6">
                  <div className="text-[11px] uppercase tracking-widest opacity-80 mb-1">Yearly savings</div>
                  <div className="text-[24px] font-heading font-extrabold">{fmt(result.yearlySavings)}</div>
                </div>

                <Link href="https://dash.dcdeploy.com" className="block w-full text-center bg-[#fcb817] text-[#0F172A] font-bold py-3.5 rounded-full hover:bg-[#e5a515] transition-colors">
                  Switch and start saving →
                </Link>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-[11px] text-text-muted mt-8 max-w-2xl mx-auto">
            Competitor rates are approximations of their public Hobby / Starter plans as of June 2026. Always-on assumed for competitors since most don't offer scale-to-zero. DCDeploy estimate uses per-minute billing on DCD-2 + DCD-1-DB. Bandwidth: DCDeploy includes 100GB free, then bundled flat; competitor overage applied after 100GB.
          </p>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert between the Comparison table and the Free Tier Spotlight on the home page. Or build a dedicated /vs/heroku, /vs/railway, /vs/render landing pages.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Competitor rates need quarterly review &mdash; embed a small &ldquo;Last updated: YYYY-MM&rdquo; footnote so visitors trust the math.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Cap the headline savings (e.g. don't display 99%+) to stay credible. Add a tiny &ldquo;your mileage may vary&rdquo; line if percentages get spicy.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
