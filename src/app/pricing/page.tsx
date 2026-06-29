"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");

  // Calculator State
  const [services, setServices] = useState(3);
  const [ram, setRam] = useState(1); // GB
  const [requests, setRequests] = useState(50000);
  const [databases, setDatabases] = useState(1);
  const [team, setTeam] = useState(3);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculateCost = () => {
    let cost = 0;
    if (services > 2) cost += (services - 2) * 5;
    if (ram > 0.5) cost += (services) * (ram - 0.5) * 10;
    if (requests > 100000) cost += ((requests - 100000) / 10000) * 0.5;
    if (databases > 0) cost += databases * 10;
    if (team > 1) cost += (team - 1) * 15;
    
    // Pro base
    if (cost > 0 && cost < 20) cost = 20; 
    
    return Math.max(0, Math.round(cost));
  };

  const estimatedCostUSD = calculateCost();
  const estimatedCost = currency === "USD" ? estimatedCostUSD : estimatedCostUSD * 85;
  const recommendedPlan = estimatedCostUSD === 0 ? "Basic" : "Pro";

  const dcdPlans = [
    {
      id: "DCD-1",
      monthlyPrice: { INR: 85, USD: 1 },
      minutePrice: { INR: 0.0019, USD: 0.000022 },
      type: "Shared",
      memory: "250 MB Memory",
      storage: "5 GB Storage",
      cpu: "1 CPU",
    },
    {
      id: "DCD-2",
      monthlyPrice: { INR: 170, USD: 2 },
      minutePrice: { INR: 0.0039, USD: 0.000046 },
      type: "Shared",
      memory: "500 MB Memory",
      storage: "5 GB Storage",
      cpu: "1 CPU",
    },
    {
      id: "DCD-3",
      monthlyPrice: { INR: 340, USD: 4 },
      minutePrice: { INR: 0.0078, USD: 0.000092 },
      type: "Dedicated",
      memory: "1 GB Memory",
      storage: "10 GB Storage",
      cpu: "1 CPU",
    },
    {
      id: "DCD-4",
      monthlyPrice: { INR: 595, USD: 7 },
      minutePrice: { INR: 0.0137, USD: 0.00016 },
      type: "Dedicated",
      memory: "2 GB Memory",
      storage: "10 GB Storage",
      cpu: "1 CPU",
    },
    {
      id: "DCD-5",
      monthlyPrice: { INR: 1190, USD: 14 },
      minutePrice: { INR: 0.0275, USD: 0.00032 },
      type: "Dedicated",
      memory: "4 GB Memory",
      storage: "10 GB Storage",
      cpu: "2 CPU",
    },
    {
      id: "DCD-6",
      monthlyPrice: { INR: 2380, USD: 28 },
      minutePrice: { INR: 0.0550, USD: 0.00065 },
      type: "Dedicated",
      memory: "8 GB Memory",
      storage: "20 GB Storage",
      cpu: "4 CPU",
    },
  ];

  const dbPlans = [
    {
      id: "DCD-1-DB",
      type: "shared",
      memory: "1 GB",
      storage: "3 GB",
      dbStorage: "1 GB",
      cpu: "1 vCPU",
      monthlyPrice: { INR: 450.00, USD: 5.30 },
      minutePrice: { INR: 0.01044, USD: 0.000123 },
    },
    {
      id: "DCD-2-DB",
      type: "dedicated",
      memory: "2 GB",
      storage: "5 GB",
      dbStorage: "2 GB",
      cpu: "1 vCPU",
      monthlyPrice: { INR: 810.00, USD: 9.50 },
      minutePrice: { INR: 0.01872, USD: 0.00022 },
    },
    {
      id: "DCD-3-DB",
      type: "dedicated",
      memory: "4 GB",
      storage: "10 GB",
      dbStorage: "5 GB",
      cpu: "2 vCPU",
      monthlyPrice: { INR: 1620.00, USD: 19.00 },
      minutePrice: { INR: 0.03753, USD: 0.00044 },
    },
    {
      id: "DCD-4-DB",
      type: "dedicated",
      memory: "8 GB",
      storage: "12 GB",
      dbStorage: "8 GB",
      cpu: "2 vCPU",
      monthlyPrice: { INR: 2250.00, USD: 26.50 },
      minutePrice: { INR: 0.05211, USD: 0.00061 },
    },
    {
      id: "DCD-5-DB",
      type: "dedicated",
      memory: "8 GB",
      storage: "20 GB",
      dbStorage: "20 GB",
      cpu: "4 vCPU",
      monthlyPrice: { INR: 3420.00, USD: 40.20 },
      minutePrice: { INR: 0.0792, USD: 0.00093 },
    },
  ];

  const faqs = [
    { q: "Is the Basic tier really free forever?", a: "Yes \u2014 1 service, 1 organization, single environment, on a shared DCD-1 machine, on us. Perfect for personal projects, learning, and proof-of-concepts. No credit card required." },
    { q: "What's different about the Starter plan?", a: "Starter is a fixed $5 (or \u20b9425) per month and includes $3 (\u20b9255) of compute credit. The big differences vs Basic: your VMs stay always-on (no idle scale-down), you can attach 2 custom domains, and you can run any combination of services that fits inside your monthly credit. Anything beyond your $3 credit is billed per-minute at the same rate as Pro." },
    { q: "When will voidrun scale-to-zero land on the free tier?", a: "We're building voidrun \u2014 our own microVM sandbox runtime \u2014 so free services can sleep when idle and cold-start within a few hundred milliseconds when traffic returns. It's in active development. Until it ships, Basic services stay always-on. Starter and Pro VMs will always be opt-in for always-on regardless." },
    { q: "What exactly counts as a \"service\"?", a: "A service is any individual application, worker, or static site you deploy on DCDeploy." },
    { q: "How does per-minute billing work on Pro?", a: "We meter compute down to the second and aggregate per-minute. You only pay for the seconds your workloads actually run. Bandwidth, storage, and managed databases are billed separately and transparently in the dashboard." },
    { q: "Can I set a hard spending limit?", a: "Yes \u2014 budget alerts and hard caps are configurable per organization in the billing dashboard. Hit the cap and we pause new minutes (we don't delete anything)." },
    { q: "Do you offer student or open-source discounts?", a: "Yes. Email us with proof of student status or a link to your OSS repo and we'll credit your wallet." },
  ];

  const formatPrice = (amount: number) => {
    return currency === "INR" 
      ? `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}` 
      : `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const formatMinutePrice = (amount: number) => {
    return currency === "INR" 
      ? `₹${amount.toFixed(5)}` 
      : `$${amount.toFixed(7)}`;
  };

  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 circuit-pattern pointer-events-none z-0"></div>
        
        <h1 className="relative z-10 text-[52px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-4">
          Simple Pricing.<br />
          No <span className="gradient-text">Surprises.</span>
        </h1>
        
        <p className="relative z-10 text-[18px] text-text-body max-w-[600px] mb-10">
          Start free. Scale as you grow. Cancel anytime.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center z-10">
          <div className="bg-[#F1F5F9] border border-border-default rounded-full p-1 inline-flex items-center">
            <button 
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2 rounded-full text-[15px] font-bold transition-all ${currency === "USD" ? "bg-white shadow-sm text-brand" : "text-text-muted hover:text-text-heading"}`}
            >
              USD
            </button>
            <button 
              onClick={() => setCurrency("INR")}
              className={`px-6 py-2 rounded-full text-[15px] font-bold transition-all ${currency === "INR" ? "bg-white shadow-sm text-brand" : "text-text-muted hover:text-text-heading"}`}
            >
              INR
            </button>
          </div>

          <div className="bg-[#F1F5F9] border border-border-default rounded-full p-1 inline-flex items-center">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-[15px] font-semibold transition-all ${!isAnnual ? "bg-white shadow-sm text-text-heading" : "text-text-muted hover:text-text-heading"}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-[15px] font-semibold transition-all flex items-center gap-2 ${isAnnual ? "bg-white shadow-sm text-text-heading" : "text-text-muted hover:text-text-heading"}`}
            >
              Annual
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${isAnnual ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-text-muted'}`}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES SECTION */}
      <section className="relative px-6 pb-32 max-w-6xl mx-auto w-full z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-heading font-bold text-text-heading mb-4">Platform Plans</h2>
           <p className="text-text-body">Start free. Add a card when you need always-on or a custom domain.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1080px] mx-auto items-stretch">
          {/* BASIC PLAN */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-border-default rounded-[32px] p-8 flex flex-col h-full hover:shadow-xl transition-all"
          >
            <div className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 w-max">Free Forever</div>
            <h3 className="text-2xl font-bold text-text-heading mb-2">Basic</h3>
            <div className="text-[44px] font-heading font-extrabold text-text-heading mb-1 leading-none">{formatPrice(0)}</div>
            <div className="text-text-muted font-bold mb-6">/forever</div>
            <p className="text-[14px] text-text-muted mb-8 leading-relaxed">Everything you need to ship a side project on us. No credit card required.</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "1 always-on service today",
                "DCD-1 machine (250 MB RAM, 1 vCPU)",
                "1 organization, 1 environment",
                "*.dcdeploy.app subdomain with HTTPS",
                "Deploy from GitHub, GitLab, or Docker",
                "Real-time logs & metrics",
                "Single region (Frankfurt)",
                "Community support"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-text-body font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">&#10003;</div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-[12px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-6 leading-relaxed">
              <span className="font-bold">Heads up:</span> free services will scale to zero when idle once <a href="/preview/voidrun" className="underline font-semibold">voidrun sandboxes</a> ship. Today they stay always-on.
            </div>

            <Link href="https://dash.dcdeploy.com" className="w-full py-3.5 px-6 text-center rounded-2xl bg-bg-page border border-border-default text-text-heading font-bold hover:bg-[#fcb817] hover:text-[#0F172A] hover:border-[#fcb817] transition-all">
              Start Free
            </Link>
          </motion.div>

          {/* STARTER PLAN (NEW) */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-brand rounded-[32px] p-8 flex flex-col h-full shadow-[0_20px_50px_rgba(14,84,135,0.15)] relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</div>
            <div className="bg-brand-pale text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 w-max">Always-on</div>
            <h3 className="text-2xl font-bold text-text-heading mb-2">Starter</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[44px] font-heading font-extrabold text-brand leading-none">{formatPrice(currency === "USD" ? 5 : 425)}</span>
            </div>
            <div className="text-text-muted font-bold mb-2">/month</div>
            <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[12px] font-bold px-2.5 py-1 rounded-full border border-green-200 w-max mb-6">
              <span>&#43;</span>
              <span>{formatPrice(currency === "USD" ? 3 : 255)} usage credit / month</span>
            </div>
            <p className="text-[14px] text-text-muted mb-8 leading-relaxed">For side projects and small production workloads that need to stay online 24/7. Bring a card &mdash; spend predictably.</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                `${formatPrice(currency === "USD" ? 3 : 255)} of compute credit included every month`,
                "Always-on VMs \u2014 no idle scale-down",
                "2 custom domains with auto-managed SSL",
                "Run any combination of services within credit",
                "DCD-1 or DCD-2 machine sizes",
                "Email support (next business day)",
                "1 organization, up to 2 environments",
                "Everything in Basic"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-text-heading font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">&#10003;</div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="https://dash.dcdeploy.com" className="w-full py-4 text-center bg-[#fcb817] text-[#0F172A] rounded-2xl font-bold hover:bg-[#e5a515] shadow-lg shadow-[#fcb817]/20 transition-all">
              Choose Starter
            </Link>
          </motion.div>

          {/* PRO PLAN */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-border-default rounded-[32px] p-8 flex flex-col h-full hover:shadow-xl transition-all"
          >
            <div className="bg-brand-pale text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 w-max">For Teams</div>
            <h3 className="text-2xl font-bold text-text-heading mb-2">Pro</h3>
            <div className="text-[44px] font-heading font-extrabold text-text-heading mb-1 leading-none">{formatPrice(0)}<span className="text-[28px] align-top">+</span></div>
            <div className="text-text-muted font-bold mb-6">wallet &middot; per-min compute</div>
            <p className="text-[14px] text-text-muted mb-8 leading-relaxed">Pay only for the seconds your workloads run. Top up your prepaid wallet anytime.</p>

            <ul className="space-y-3 mb-8 flex-1">
              {[
                "Unlimited services",
                "All machine sizes (DCD-1 to DCD-6)",
                "Unlimited organizations & environments",
                "Unlimited custom domains",
                "All available regions",
                "Unlimited team members",
                "Autoscaling & scale-to-zero",
                "Full observability \u2014 logs, metrics, alerts",
                "99.5% SLA",
                "Dockerfile builds & optimizations",
                "Dedicated support"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14px] text-text-body font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand/15 text-brand flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">&#10003;</div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="https://dash.dcdeploy.com" className="w-full py-3.5 px-6 text-center rounded-2xl bg-bg-page border border-border-default text-text-heading font-bold hover:bg-[#fcb817] hover:text-[#0F172A] hover:border-[#fcb817] transition-all">
              Top Up & Deploy
            </Link>
          </motion.div>
        </div>
      </section>

      {/* COMPUTE RESOURCE PLANS */}
      <section className="relative px-6 pb-20 max-w-7xl mx-auto w-full z-10 border-t border-border-default pt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-heading font-bold text-text-heading mb-4">Compute Resources</h2>
          <p className="text-text-body">Add instances to your plan as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dcdPlans.map((plan, i) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white border border-border-default rounded-[32px] p-8 hover:shadow-[0_20px_40px_rgba(14,84,135,0.08)] hover:border-brand transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-brand mb-1">{plan.id}</h3>
                  <span className={`text-[12px] font-bold uppercase px-3 py-1 rounded-full ${plan.type === 'Dedicated' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {plan.type}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-text-heading">
                    {formatPrice(isAnnual ? Math.round(plan.monthlyPrice[currency] * 0.8) : plan.monthlyPrice[currency])}
                  </div>
                  <div className="text-[11px] text-text-muted font-medium mt-1 uppercase">
                    {formatMinutePrice(plan.minutePrice[currency])}/min
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[plan.memory, plan.storage, plan.cpu].map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-bg-blue-tint text-brand flex items-center justify-center text-[10px] font-bold shrink-0">&#10003;</div>
                    <span className="text-[15px] text-text-body">{spec}</span>
                  </div>
                ))}
              </div>

                <Link href="https://dash.dcdeploy.com" className="w-full py-4 px-6 text-center rounded-2xl bg-bg-page border border-border-default text-text-heading font-bold hover:bg-[#fcb817] hover:text-[#0F172A] hover:border-[#fcb817] transition-all">
                  Add {plan.id}
                </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DATABASE RESOURCE PLANS */}
      <section className="relative px-6 py-32 bg-bg-page border-y border-border-default overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block bg-brand-pale text-brand text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">Managed Data</div>
            <h2 className="text-3xl font-heading font-bold text-text-heading mb-4">Database Machine Plans</h2>
            <p className="text-text-body max-w-2xl mx-auto">Fully managed database instances with high availability and automated backups.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbPlans.map((plan, i) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-border-default rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start mb-8 pb-8 border-b border-border-default">
                  <div>
                    <h3 className="text-xl font-bold text-text-heading mb-1">{plan.id}</h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${plan.type === 'dedicated' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {plan.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-brand">
                      {formatPrice(isAnnual ? Math.round(plan.monthlyPrice[currency] * 0.8) : plan.monthlyPrice[currency])}
                    </div>
                    <div className="text-[11px] text-text-muted font-bold mt-1 uppercase">
                      {formatMinutePrice(plan.minutePrice[currency])} / min
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
                   <div className="flex flex-col">
                      <span className="text-[11px] text-text-muted font-bold uppercase mb-1">RAM</span>
                      <span className="text-[15px] font-bold text-text-heading">{plan.memory}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] text-text-muted font-bold uppercase mb-1">Compute</span>
                      <span className="text-[15px] font-bold text-text-heading">{plan.cpu}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] text-text-muted font-bold uppercase mb-1">OS Storage</span>
                      <span className="text-[15px] font-bold text-text-heading">{plan.storage}</span>
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] text-text-muted font-bold uppercase mb-1">DB Storage</span>
                      <span className="text-[15px] font-bold text-brand">{plan.dbStorage}</span>
                   </div>
                </div>

                <Link href="https://dash.dcdeploy.com" className="w-full py-4 px-6 text-center rounded-2xl bg-[#fcb817] text-[#0F172A] font-bold hover:bg-[#e5a515] shadow-lg shadow-[#fcb817]/20 transition-all">
                  Deploy DB Instance
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COST CALCULATOR */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-[700px] mx-auto bg-white border border-border-default rounded-[40px] p-8 md:p-12 shadow-[0_32px_64px_rgba(0,0,0,0.05)]">
           <h3 className="text-[28px] font-heading font-bold text-text-heading mb-8 text-center">Custom Usage Estimate</h3>
           
           <div className="flex flex-col gap-8 mb-12">
              <div>
                 <div className="flex justify-between mb-4">
                    <label className="text-[15px] font-bold text-text-heading uppercase tracking-wider">Services</label>
                    <span className="text-[15px] font-bold text-brand">{services}</span>
                 </div>
                 <input type="range" min="1" max="50" value={services} onChange={e => setServices(parseInt(e.target.value))} className="w-full h-2 bg-bg-page rounded-lg appearance-none cursor-pointer accent-brand" />
              </div>

              <div>
                 <div className="flex justify-between mb-4">
                    <label className="text-[15px] font-bold text-text-heading uppercase tracking-wider">RAM per service</label>
                    <span className="text-[15px] font-bold text-brand">{ram}GB</span>
                 </div>
                 <div className="grid grid-cols-4 gap-3">
                    {[0.5, 1, 2, 4].map(val => (
                       <button key={val} onClick={() => setRam(val)} className={`py-3 rounded-2xl text-[14px] font-bold transition-all border ${ram === val ? 'bg-[#fcb817] text-[#0F172A] border-brand shadow-lg shadow-[#fcb817]/20' : 'bg-bg-page text-text-muted border-transparent hover:border-brand/30'}`}>
                         {val === 0.5 ? "512MB" : `${val}GB`}
                       </button>
                    ))}
                 </div>
              </div>

              <div>
                 <div className="flex justify-between mb-4">
                    <label className="text-[15px] font-bold text-text-heading uppercase tracking-wider">Managed Databases</label>
                    <span className="text-[15px] font-bold text-brand">{databases}</span>
                 </div>
                 <input type="range" min="0" max="5" value={databases} onChange={e => setDatabases(parseInt(e.target.value))} className="w-full h-2 bg-bg-page rounded-lg appearance-none cursor-pointer accent-brand" />
              </div>
           </div>

           <div className="bg-[#0F172A] rounded-[32px] p-10 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full blur-[60px]"></div>
             <div className="text-[14px] text-slate-400 font-bold uppercase tracking-widest mb-4">Estimated Monthly Total</div>
             <div className="text-[56px] font-heading font-extrabold text-white leading-none mb-4">{formatPrice(estimatedCost)}</div>
             <div className="inline-block bg-brand/20 text-brand-light text-[13px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
               Matches {recommendedPlan} Plan
             </div>
             <Link href="https://dash.dcdeploy.com" className="w-full py-5 px-6 text-center bg-[#fcb817] text-[#0F172A] rounded-2xl font-bold hover:bg-[#e5a515] transition-all shadow-xl shadow-[#fcb817]/20">
               Get Started with {recommendedPlan}
             </Link>
           </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-32 px-6 bg-bg-page border-t border-border-default">
        <div className="max-w-[700px] mx-auto">
          <h3 className="text-[32px] font-heading font-bold text-text-heading mb-12 text-center">Frequently Asked Questions</h3>
          
          <div className="flex flex-col gap-4">
             {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-border-default rounded-[24px] overflow-hidden transition-all hover:border-brand/30">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
                  >
                    <span className="text-[16px] font-bold text-text-heading">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full bg-bg-blue-tint flex items-center justify-center text-brand transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </button>
                  <AnimatePresence>
                     {openFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                           <p className="px-8 pb-8 text-[15px] text-text-body leading-[1.7] opacity-80">
                             {faq.a}
                           </p>
                        </motion.div>
                     )}
                  </AnimatePresence>
                </div>
             ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
