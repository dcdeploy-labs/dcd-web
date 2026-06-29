"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PreviewShell } from "../../../components/preview/PreviewShell";
import { CurrencyToggle, formatCurrency, useCurrency } from "../../../lib/currency";

interface Machine {
  id: string;
  ram: number;
  vcpu: number;
  perMin: { INR: number; USD: number };
  monthly: { INR: number; USD: number };
}

const MACHINES: Machine[] = [
  { id: "DCD-1", ram: 0.25, vcpu: 1, perMin: { INR: 0.0019, USD: 0.000022 }, monthly: { INR: 85, USD: 1 } },
  { id: "DCD-2", ram: 0.5,  vcpu: 1, perMin: { INR: 0.0039, USD: 0.000046 }, monthly: { INR: 170, USD: 2 } },
  { id: "DCD-3", ram: 1,    vcpu: 1, perMin: { INR: 0.0078, USD: 0.000092 }, monthly: { INR: 340, USD: 4 } },
  { id: "DCD-4", ram: 2,    vcpu: 1, perMin: { INR: 0.0137, USD: 0.00016  }, monthly: { INR: 595, USD: 7 } },
  { id: "DCD-5", ram: 4,    vcpu: 2, perMin: { INR: 0.0275, USD: 0.00032  }, monthly: { INR: 1190, USD: 14 } },
  { id: "DCD-6", ram: 8,    vcpu: 4, perMin: { INR: 0.0550, USD: 0.00065  }, monthly: { INR: 2380, USD: 28 } },
];

function pickMachine(ramGB: number): Machine {
  return MACHINES.find((m) => m.ram >= ramGB) ?? MACHINES[MACHINES.length - 1];
}

export default function CalculatorPreview() {
  const { currency } = useCurrency();
  const [services, setServices] = useState(2);
  const [ram, setRam] = useState(0.5);
  const [uptime, setUptime] = useState(80);

  const machine = useMemo(() => pickMachine(ram), [ram]);

  const cost = useMemo(() => {
    if (services <= 1 && ram <= 0.25 && uptime <= 100) {
      return { isFree: true, monthly: 0, perMinute: 0, scaleToZeroSavings: 0, machine };
    }
    const minutesPerMonth = 43_800 * (uptime / 100);
    const perMin = machine.perMin[currency];
    const monthly = perMin * minutesPerMonth * services;
    const fullUptimeCost = perMin * 43_800 * services;
    const scaleToZeroSavings = Math.max(0, fullUptimeCost - monthly);
    return { isFree: false, monthly, perMinute: perMin, scaleToZeroSavings, machine };
  }, [services, ram, uptime, machine, currency]);

  const fmtMoney = (n: number) => formatCurrency(Math.round(n), currency);
  const fmtPerMin = (n: number) =>
    currency === "INR" ? `\u20b9${n.toFixed(4)}` : `$${n.toFixed(7)}`;

  return (
    <PreviewShell
      eyebrow="Calculator"
      title="Inline cost calculator"
      description="A 3-slider lite version of the calculator that lives on /pricing. Drag the sliders and the right pane recomputes in real time. Lower the upfront friction by giving visitors a clear answer to 'how much will this actually cost me?' before they even sign up."
    >
      <section className="relative bg-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/40 via-white to-bg-blue-tint/40 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Pricing calculator
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              See your bill <span className="gradient-text">before</span> you sign up.
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7] mb-8">
              Drag the sliders. We compute what you'd actually pay, on the cheapest machine size that fits.
            </p>
            <CurrencyToggle size="sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* SLIDERS */}
            <div className="lg:col-span-3 bg-white border border-border-default rounded-[28px] p-8 md:p-10 shadow-[0_8px_32px_rgba(14,84,135,0.06)] space-y-10">
              {/* Services */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="services" className="text-[14px] font-bold text-text-heading">Services running</label>
                  <span className="text-[24px] font-heading font-extrabold text-brand">{services}</span>
                </div>
                <input
                  id="services"
                  type="range"
                  min={1}
                  max={20}
                  step={1}
                  value={services}
                  onChange={(e) => setServices(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-2 font-mono">
                  <span>1</span><span>5</span><span>10</span><span>15</span><span>20+</span>
                </div>
              </div>

              {/* RAM per service */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="ram" className="text-[14px] font-bold text-text-heading">RAM per service</label>
                  <span className="text-[24px] font-heading font-extrabold text-brand">{ram < 1 ? `${ram * 1000} MB` : `${ram} GB`}</span>
                </div>
                <input
                  id="ram"
                  type="range"
                  min={0.25}
                  max={8}
                  step={0.25}
                  value={ram}
                  onChange={(e) => setRam(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-2 font-mono">
                  <span>250M</span><span>1G</span><span>2G</span><span>4G</span><span>8G</span>
                </div>
                <div className="text-[12px] text-text-muted mt-2">
                  Picks the cheapest machine that fits: <span className="font-bold text-brand">{machine.id}</span>
                </div>
              </div>

              {/* Uptime */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="uptime" className="text-[14px] font-bold text-text-heading">Uptime (scale-to-zero)</label>
                  <span className="text-[24px] font-heading font-extrabold text-brand">{uptime}%</span>
                </div>
                <input
                  id="uptime"
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={uptime}
                  onChange={(e) => setUptime(parseInt(e.target.value, 10))}
                  className="w-full h-2 rounded-full bg-slate-200 appearance-none cursor-pointer accent-[#0e5487]"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-2 font-mono">
                  <span>10%</span><span>40%</span><span>70%</span><span>100%</span>
                </div>
                <div className="text-[12px] text-text-muted mt-2">
                  Lower = more idle time = fewer billed minutes. Most APIs sit at <span className="font-bold">~30%</span>.
                </div>
              </div>
            </div>

            {/* RESULT */}
            <motion.div
              key={`${services}-${ram}-${uptime}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-[#073a61] via-[#0e5487] to-[#227dbf] rounded-[28px] p-8 md:p-10 text-white shadow-[0_20px_60px_rgba(14,84,135,0.25)] relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay"></div>

              <div className="relative z-10 flex-1 flex flex-col">
                <div className="text-[12px] font-bold uppercase tracking-widest opacity-80 mb-2">You would pay</div>

                {cost.isFree ? (
                  <>
                    <div className="text-[64px] font-heading font-extrabold leading-none mb-2">{formatCurrency(0, currency)}</div>
                    <div className="text-[14px] opacity-80 mb-6">/month &mdash; fits the free Basic plan.</div>
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md mb-6">
                      <div className="text-[13px] font-bold mb-2">Why it's free</div>
                      <ul className="text-[12px] opacity-80 space-y-1">
                        <li>• 1 service on a DCD-1 machine</li>
                        <li>• Included in Basic forever</li>
                        <li>• No credit card required</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[64px] font-heading font-extrabold leading-none">{fmtMoney(cost.monthly)}</span>
                      <span className="text-[14px] opacity-80">/month</span>
                    </div>
                    <div className="text-[13px] opacity-80 mb-6">
                      That's <span className="font-mono font-bold">{fmtPerMin(cost.perMinute)}</span> per minute, per service, on <span className="font-bold">{cost.machine.id}</span>.
                    </div>

                    {cost.scaleToZeroSavings > 0 && (
                      <div className="bg-green-500/15 border border-green-400/30 rounded-2xl p-4 backdrop-blur-md mb-6">
                        <div className="flex items-center gap-2 text-[13px] font-bold text-green-200 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                          Scale-to-zero savings
                        </div>
                        <div className="text-[12px] opacity-90">
                          You'd pay <span className="font-mono font-bold">{fmtMoney(cost.scaleToZeroSavings)}</span> less per month vs always-on, because we don't charge for idle minutes.
                        </div>
                      </div>
                    )}
                  </>
                )}

                <Link href="https://dash.dcdeploy.com" className="mt-auto block w-full text-center bg-[#fcb817] text-[#0F172A] font-bold py-3.5 rounded-full hover:bg-[#e5a515] transition-colors">
                  {cost.isFree ? "Start free →" : "Top up & deploy →"}
                </Link>
                <Link href="/pricing" className="text-center text-[13px] mt-3 underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity">
                  See full price book
                </Link>
              </div>
            </motion.div>
          </div>

          <p className="text-center text-[12px] text-text-muted mt-8">
            Estimate based on current public pricing. Compute hours are pro-rated to the second. Bandwidth, storage, and managed databases priced separately.
          </p>
        </div>
      </section>

      {/* IMPLEMENTATION NOTES */}
      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Insert directly after the Free Tier Spotlight on the home page (because the free tier is the answer for the smallest users; this is the answer for everyone else).</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Machine SKUs (DCD-1…DCD-6) and pricing live in this file. Pull them from the same source of truth as /pricing.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Add a 4th slider for bandwidth / requests if the per-request cost is material.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Currency toggle is wired to the shared <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">useCurrency</code> hook &mdash; auto-INR for users in <code className="bg-bg-blue-tint text-brand text-[12px] px-1.5 py-0.5 rounded">Asia/Kolkata</code>, USD everywhere else, persisted to localStorage.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
