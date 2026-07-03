"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { CurrencyToggle, useCurrency } from "../lib/currency";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("Deploy");
  const [activeStep, setActiveStep] = useState(1);
  const tabs = ["Deploy", "Observe", "Scale", "Collaborate", "Secure"];
  const { currency } = useCurrency();
  const isINR = currency === "INR";
  const sym = isINR ? "\u20b9" : "$";

  const { scrollYProgress } = useScroll();

  const tabContent: Record<string, { checklist: string[], terminal: React.ReactNode }> = {
    "Deploy": {
      checklist: ["Auto-detect 40+ frameworks", "Live streaming build logs", "Preview URLs for every PR", "One-click instant rollback", "Monorepo native support"],
      terminal: (
        <>
          <div className="text-brand-light font-bold mb-4">$ dcd deploy --production</div>
          <div className="text-slate-400 mb-2">› Initializing build environment...</div>
          <div className="text-slate-400 mb-2">› Detected framework: <span className="text-white font-bold">Next.js 14</span></div>
          <div className="text-slate-400 mb-2">› Installing dependencies... <span className="text-green-400 px-2 rounded font-semibold ml-2">1.2s</span></div>
          <div className="text-slate-400 mb-6">› Building static segments...</div>
          <div className="animate-pulse flex gap-2">
             <div className="w-2 h-4 bg-brand"></div> 
             <span className="text-brand">Uploading assets to Edge Network...</span>
          </div>
        </>
      )
    },
    "Observe": {
      checklist: ["Real-time traffic metrics", "Automatic error tracking", "Custom log filtering", "Performance Web Vitals", "Usage & quota alerts"],
      terminal: (
        <>
          <div className="text-brand-light font-bold mb-4">$ dcd logs --follow --env prod</div>
          <div className="text-slate-500 mb-2">[12:44:02] Connected to production stream...</div>
          <div className="text-green-400 mb-2">GET /api/v1/user/profile 200 OK (42ms)</div>
          <div className="text-green-400 mb-2">GET /_next/static/chunks/main.js 200 OK (12ms)</div>
          <div className="text-amber-400 mb-2">POST /api/webhook 202 Accepted (115ms)</div>
          <div className="text-slate-300 mt-4 animate-pulse">_ Waiting for new logs...</div>
        </>
      )
    },
    "Scale": {
      checklist: ["Global edge distribution", "Auto-scaling compute", "Smart asset caching", "Load balancing at edge", "Zero-downtime upgrades"],
      terminal: (
        <>
          <div className="text-brand-light font-bold mb-4">$ dcd scale --min 3 --max 20</div>
          <div className="text-slate-400 mb-2">› Scaling cluster "main-api" across 35 regions...</div>
          <div className="text-slate-400 mb-2">› US-East-1 (N. Virginia): <span className="text-green-400">Active</span></div>
          <div className="text-slate-400 mb-2">› EU-West-1 (Dublin): <span className="text-green-400">Active</span></div>
          <div className="text-slate-400 mb-2">› AP-South-1 (Mumbai): <span className="text-green-400">Active</span></div>
          <div className="text-white font-bold mt-4">✔ Successfully scaled to 20 potential nodes.</div>
        </>
      )
    },
    "Collaborate": {
      checklist: ["Granular RBAC roles", "Team activity feeds", "Shared env variables", "Project ownership transfer", "Organization audit logs"],
      terminal: (
        <>
          <div className="text-brand-light font-bold mb-4">$ dcd team add sarah@company.com</div>
          <div className="text-slate-400 mb-2">› Checking organization seats... [14/20 used]</div>
          <div className="text-slate-400 mb-2">› Assigning role: <span className="text-white font-bold">Senior Engineer</span></div>
          <div className="text-slate-400 mb-4">› Sending invitation email...</div>
          <div className="text-green-400 font-bold">✔ Sarah has been invited to the project.</div>
          <div className="text-slate-500 mt-4 font-mono italic"># Updated 14s ago by admin</div>
        </>
      )
    },
    "Secure": {
      checklist: ["Automatic managed TLS/SSL", "Enterprise DDoS protection", "Environment secret encryption", "IP Access Whitelisting", "Advanced Threat Detection"],
      terminal: (
        <>
          <div className="text-brand-light font-bold mb-4">$ dcd secure --audit</div>
          <div className="text-slate-400 mb-2">› Scanning environment variables... <span className="text-green-400">Safe</span></div>
          <div className="text-slate-400 mb-2">› Checking SSL certificates... <span className="text-green-400">Valid</span></div>
          <div className="text-slate-400 mb-2">› DDoS Firewall Status: <span className="text-green-400">Active (L7)</span></div>
          <div className="text-slate-400 mb-4">› Secret management: <span className="text-white">AES-256 GCM</span></div>
          <div className="bg-green-500/10 text-green-400 p-2 rounded border border-green-500/20 text-xs">
            SECURITY SCORE: 100/100 - NO VULNERABILITIES FOUND
          </div>
        </>
      )
    }
  };

  const steps = [
    { num: "01", title: "Connect Your Repositories", body: "Link GitHub, GitLab, or Bitbucket. We sync instantly." },
    { num: "02", title: "Add Your Configuration", body: "Set environment variables and build commands. Or let us auto-detect — we support 40+ frameworks." },
    { num: "03", title: "Connect Your Services", body: "Add databases, Redis, and third-party integrations in one click. No YAML required." },
    { num: "04", title: "Share Your Deploy Link", body: "Get a live URL the moment your build completes. Share previews with your team instantly." },
  ];

  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden bg-white">
        {/* Background Patterns */}
        <div className="absolute inset-0 circuit-pattern pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-[400px] perspective-grid pointer-events-none opacity-60"></div>
        
        {/* Animated Grid Floor Glow */}
        <div className="absolute bottom-0 inset-x-0 h-[200px] bg-gradient-to-t from-bg-blue-tint to-transparent"></div>

        {/* Top Badge */}
        <motion.div 
          initial="hidden" animate="show" variants={fadeUp}
          className="relative z-10 flex items-center gap-2 bg-bg-blue-tint border border-border-blue text-brand rounded-full px-4 py-1.5 text-[13px] font-semibold mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-brand animate-pulse shadow-[0_0_8px_rgba(14,84,135,0.8)]"></span>
          Smart Deployment Made Simple
        </motion.div>

        {/* Headline */}
        <motion.div 
          initial="hidden" animate="show" transition={{ delay: 0.1 }} variants={fadeUp}
          className="relative z-10 text-center max-w-4xl mb-6"
        >
          <h1 className="text-[56px] md:text-[72px] font-heading font-extrabold text-text-heading leading-[1.05] tracking-[-0.02em]">
            Revolutionizing Your <br />
            Deployments with <br />
            <span className="gradient-text">Scalable Technology</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p 
          initial="hidden" animate="show" transition={{ delay: 0.2 }} variants={fadeUp}
          className="relative z-10 text-center text-[18px] md:text-[20px] text-text-body max-w-[600px] mb-10 leading-[1.7]"
        >
          Empowering you with next-gen cloud solutions. Deploy any stack in under 3 minutes, anywhere in the world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial="hidden" animate="show" transition={{ delay: 0.3 }} variants={fadeUp}
          className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mb-20"
        >
          <Link href="https://dash.dcdeploy.com" className="px-8 py-3.5 bg-[#fcb817] text-[#0F172A] text-[16px] font-semibold rounded-full shadow-[0_4px_14px_rgba(14,84,135,0.35)] hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all">
            Get Started For Free
          </Link>
          <Link href="/docs" className="px-8 py-3.5 bg-white text-text-body border-[1.5px] border-border-default text-[16px] font-semibold rounded-full hover:border-[#CBD5E1] hover:text-text-heading hover:-translate-y-0.5 transition-all">
            Explore Documentation
          </Link>
        </motion.div>

        {/* 3D Isometric Floating Visual */}
        <motion.div 
          initial="hidden" animate="show" transition={{ delay: 0.5 }} variants={fadeUp}
          className="relative z-10 w-full max-w-[900px] mt-8 flex justify-center perspective-[1200px]"
        >
          {/* Cloud Blobs behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-pale rounded-full blur-[100px] -z-10 opacity-60"></div>

          {/* Main 3D Shape Mockup */}
          <div className="relative w-[320px] h-[360px] animate-[float_4s_ease-in-out_infinite]" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateZ(-15deg)' }}>
             <div className="absolute bottom-0 w-full h-[60px] bg-[#0F172A] rounded-xl shadow-2xl" style={{ transform: 'translateZ(0px)' }}></div>
             <div className="absolute bottom-[40px] w-full h-[180px] bg-white rounded-xl opacity-100 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl" style={{ transform: 'translateZ(40px)' }}>
                <img 
                  src="/dash.png" 
                  alt="DCDeploy Dashboard Screenshot"
                  className="w-full h-full object-cover opacity-90"
                />
             </div>
             <div className="absolute bottom-[200px] w-full h-[100px] bg-gradient-to-br from-[#0e5487] to-[#073a61] rounded-xl shadow-[0_20px_60px_rgba(14,84,135,0.5)] border border-white/10" style={{ transform: 'translateZ(80px)' }}>
                <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                   <div className="w-20 h-2 bg-white/30 rounded-full"></div>
                   <div className="w-32 h-2 bg-white/30 rounded-full"></div>
                   <div className="w-16 h-2 bg-white/30 rounded-full"></div>
                </div>
             </div>
          </div>

          {/* Floating Accessory Cards Element */}
          <div className="absolute top-[8%] -left-[10%] bg-white p-4 rounded-[16px] shadow-[0_12px_40px_rgba(14,84,135,0.12)] border border-border-default animate-[float_3s_ease-in-out_infinite] flex items-center gap-3">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
             <div className="flex flex-col">
               <span className="text-[14px] font-semibold text-text-heading">Deploy successful</span>
               <span className="text-[12px] text-text-muted">my-saas-app • 23s ago</span>
             </div>
          </div>

          <div className="absolute top-[25%] -right-[8%] bg-white p-5 rounded-[16px] shadow-[0_12px_40px_rgba(14,84,135,0.12)] border border-border-default animate-[float_3.5s_ease-in-out_infinite] flex flex-col gap-3">
             <span className="text-[14px] font-semibold text-brand">Performance • 98/100</span>
             <div className="flex items-end gap-1.5 h-10">
                <div className="w-4 bg-brand-pale rounded-t-sm h-[40%]"></div>
                <div className="w-4 bg-[#93C5FD] rounded-t-sm h-[70%]"></div>
                <div className="w-4 bg-brand rounded-t-sm h-[100%]"></div>
             </div>
          </div>

          <div className="absolute bottom-[25%] -left-[15%] bg-white py-3 px-5 rounded-[16px] shadow-[0_12px_40px_rgba(14,84,135,0.12)] border border-border-default animate-[float_4s_ease-in-out_infinite] flex items-center gap-3">
             <div className="w-8 h-8 bg-bg-blue-tint rounded-full flex items-center justify-center text-brand text-[14px]">🌍</div>
             <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-text-heading">35+ Regions</span>
                <span className="text-[12px] text-text-muted">Global Edge Network</span>
             </div>
          </div>

          <div className="absolute bottom-[12%] -right-[15%] bg-[#0F172A] py-3 px-5 rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-[#1E293B] animate-[float_4.5s_ease-in-out_infinite] flex items-center gap-3">
             <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">✓</div>
             <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-white">99.99% Uptime</span>
                <span className="text-[12px] text-slate-400">Guaranteed SLA</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: LOGOS */}
      <motion.section 
        initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={fadeUp}
        className="bg-white border-t border-b border-[#F1F5F9] py-16 px-6"
      >
        <p className="text-center text-[13px] font-semibold text-text-muted tracking-[0.08em] uppercase mb-10">
          Trusted by engineering teams at 14,000+ companies
        </p>
        <div className="max-w-6xl mx-auto overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex items-center justify-between opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {["Acme Corp", "GlobalTech", "Nexus", "Starlight", "Horizon", "Quantum"].map((item) => (
              <h3 key={item} className="text-2xl font-bold text-slate-400">{item}</h3>
            ))}
          </div>
        </div>
      </motion.section>

      {/* NEW SECTION 3: PIPELINE VISUALIZER */}
      <section className="relative bg-white pt-32 pb-24 px-6 overflow-hidden">
         <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-6xl mx-auto flex flex-col items-center"
         >
            <motion.div variants={fadeUp} className="bg-brand-pale text-brand text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
               The Pipeline
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading text-center mb-6 leading-tight">
               From <span className="text-[#0F172A] border-b-4 border-brand/30">git push</span> to <span className="gradient-text">global impact.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-text-body text-center max-w-2xl mb-16 leading-[1.7]">
               We've eliminated the friction of traditional CI/CD. DCDeploy intelligently orchestrates your builds, manages your databases, and distributes your entire stack automatically.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full relative">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                  {[
                     { title: "Git Push", desc: "Commit to any branch. We listen for webhooks instantly for both FE and BE repos.", icon: "📦" },
                     { title: "Docker Build", desc: "Provide your Dockerfile path and we'll build, optimize and deploy your container instantly.", icon: "⚙️" },
                     { title: "Asset Optimization", desc: "Automatic compression and hashing for your frontend assets to ensure lightning speed.", icon: "✨" },
                     { title: "Managed Databases", desc: "1-click PostgreSQL and Redis clusters. Provisioned and connected to your app in seconds.", icon: "🗄️" },
                     { title: "Backend Clusters", desc: "Deploy long-running background workers and serverless functions with auto-scaling.", icon: "☁️" },
                     { title: "Global Impact", desc: "Your entire stack is distributed across 35+ regions worldwide with 99.99% uptime.", icon: "🚀" }
                  ].map((node, i) => (
                     <motion.div 
                        key={i}
                        whileHover={{ y: -8 }}
                        className="bg-white border border-border-default rounded-2xl p-6 shadow-sm hover:shadow-[0_12px_40px_rgba(14,84,135,0.12)] transition-all flex flex-col items-center text-center group"
                     >
                        <div className="w-16 h-16 bg-bg-blue-tint rounded-2xl flex items-center justify-center text-[28px] mb-6 border border-border-blue group-hover:scale-110 transition-transform">
                           {node.icon}
                        </div>
                        <h3 className="text-[18px] font-bold text-text-heading mb-3">{node.title}</h3>
                        <p className="text-[14px] text-text-muted leading-relaxed">{node.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </motion.div>         </motion.div>
      </section>

      {/* SECTION 4: HOW IT WORKS */}
      <section className="relative bg-bg-page pt-32 pb-32 px-6">
        {/* Top Cloud Blob SVG Divider */}
        <div className="absolute top-0 inset-x-0 -translate-y-[99%]">
          <svg viewBox="0 0 1440 120" className="w-full h-auto text-bg-page fill-current" preserveAspectRatio="none">
            <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.div variants={fadeUp} className="bg-brand-pale text-brand text-[13px] font-semibold px-4 py-1.5 rounded-full mb-4 inline-block uppercase tracking-wider">
              Developer Experience
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading leading-tight mb-4">
              Deploy Smarter. Work Better.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <motion.div 
                  variants={fadeUp} 
                  key={step.num} 
                  onClick={() => setActiveStep(i + 1)}
                  className={`p-6 flex gap-6 cursor-pointer transition-all duration-300 ${activeStep === i + 1 ? 'bg-white border border-border-default shadow-[0_8px_32px_rgba(14,84,135,0.08)] rounded-2xl relative' : 'border border-transparent opacity-60 hover:opacity-100'}`}
                >
                  {activeStep === i + 1 && <div className="absolute left-0 top-6 bottom-6 w-1 bg-brand rounded-r-md"></div>}
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-[15px] transition-colors ${activeStep === i + 1 ? 'bg-brand text-white shadow-md' : 'bg-slate-200 text-slate-500'}`}>
                    {step.num}
                  </div>
                  <div>
                    <h3 className={`text-[18px] font-semibold transition-colors mb-2 ${activeStep === i + 1 ? 'text-text-heading' : 'text-text-muted'}`}>{step.title}</h3>
                    <p className="text-[15px] text-text-muted leading-[1.6]">{step.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Mockup */}
            <motion.div variants={fadeUp} className="relative h-full">
              <div className="bg-white border border-border-default rounded-[24px] shadow-[0_20px_60px_rgba(14,84,135,0.12)] overflow-hidden h-full">
                {/* Header */}
                <div className="flex items-center px-5 py-4 border-b border-border-default bg-[#F8FAFF]">
                   <div className="flex gap-2 mr-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   <div className="flex-1 text-center text-[13px] font-semibold text-text-muted font-mono tracking-wide">
                    {activeStep === 1 && "connect.dcdeploy.app"}
                    {activeStep === 2 && "config.dcdeploy.app"}
                    {activeStep === 3 && "services.dcdeploy.app"}
                    {activeStep === 4 && "dashboard.dcdeploy.app"}
                   </div>
                </div>
                {/* Body */}
                <div className="flex flex-col md:flex-row h-[420px]">
                   <div className="w-full md:w-20 border-r border-border-default bg-[#F8FAFF] flex md:flex-col items-center py-6 px-4 gap-6 shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-bg-blue-tint border border-border-blue flex items-center justify-center shadow-sm">
                         <div className="w-5 h-5 bg-brand rounded-md"></div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-200"></div>
                      <div className="w-8 h-8 rounded-lg bg-slate-200 mt-auto"></div>
                   </div>
                   <div className="flex-1 p-8 relative bg-white bg-[radial-gradient(#F1F5F9_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden">
                      
                      {activeStep === 1 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
                          <h3 className="text-[18px] font-bold text-text-heading mb-4">Connect Repository</h3>
                          <div className="flex-1 rounded-xl border border-border-default overflow-hidden shadow-sm bg-slate-50">
                             <img src="/gitconfig.png" alt="Git Configuration" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      )}

                      {activeStep === 2 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
                          <h3 className="text-[18px] font-bold text-text-heading mb-4">Build Configuration</h3>
                          <div className="flex-1 rounded-xl border border-border-default overflow-hidden shadow-sm bg-slate-50">
                             <img src="/formfill.png" alt="Form Configuration" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      )}

                      {activeStep === 3 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
                          <h3 className="text-[18px] font-bold text-text-heading mb-4">Add Services</h3>
                          <div className="flex-1 rounded-xl border border-border-default overflow-hidden shadow-sm bg-slate-50">
                             <img src="/add database.png" alt="Add Database" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      )}

                      {activeStep === 4 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
                          <h3 className="text-[18px] font-bold text-text-heading mb-4">Share Your Project</h3>
                          <div className="flex-1 rounded-xl border border-border-default overflow-hidden shadow-sm bg-slate-50">
                             <img src="/shareservice.png" alt="Share Service" className="w-full h-full object-cover" />
                          </div>
                        </motion.div>
                      )}

                   </div>
                </div>
              </div>

              {/* Floating Element 1 */}
              <motion.div 
                 animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -top-8 -right-8 bg-white border border-border-default rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-4 flex items-center gap-4 z-10"
              >
                 <div className="w-10 h-10 rounded-full bg-brand-pale flex items-center justify-center text-brand text-xl">📄</div>
                 <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-text-heading">142 KB</span>
                    <span className="text-[12px] text-text-muted">Total bundle size</span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION 5: GLOBAL EDGE NETWORK */}
      <section className="relative bg-[#0F172A] pt-32 pb-32 px-6 overflow-hidden text-white">
         <div className="absolute inset-0 circuit-pattern opacity-[0.05] invert -z-0"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/20 rounded-full blur-[120px] -z-0"></div>

         <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16"
         >
            <motion.div variants={fadeUp} className="flex-1 flex flex-col items-start text-left">
               <div className="bg-white/10 text-brand-light border border-white/20 text-[13px] font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider backdrop-blur-md">
                 Global Network
               </div>
               <h2 className="text-[36px] md:text-[52px] font-heading font-extrabold mb-6 leading-tight text-white">
                  Deploy instantly to <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#4da1db]">35+ regions worldwide.</span>
               </h2>
               <p className="text-[18px] text-slate-300 mb-10 leading-[1.8] max-w-xl">
                  Your users shouldn't have to wait. DCDeploy automatically provisions your application across our enterprise-grade Edge Network, ensuring millisecond latency regardless of where your customers are.
               </p>
               
               <div className="grid grid-cols-2 gap-8 w-full max-w-lg border-t border-white/10 pt-8">
                  <div>
                     <div className="text-[36px] font-extrabold text-white mb-2">15ms</div>
                     <div className="text-[14px] text-slate-400">Avg Global Latency</div>
                  </div>
                  <div>
                     <div className="text-[36px] font-extrabold text-[#4da1db] mb-2">3Tbps</div>
                     <div className="text-[14px] text-slate-400">Network Capacity</div>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex-1 relative w-full aspect-square max-w-[500px]">
               {/* Abstract Globe / Nodes Visualization */}
               <div className="w-full h-full rounded-full border border-white/10 bg-[#1E293B]/50 backdrop-blur-3xl shadow-[0_0_80px_rgba(14,84,135,0.3)] relative flex items-center justify-center p-8">
                  <div className="absolute inset-0 rounded-full border border-brand/30 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <div className="absolute inset-8 rounded-full border border-brand-light/20 border-dashed animate-spin-slow"></div>
                  
                  {/* Central Node */}
                  <div className="w-24 h-24 bg-gradient-to-br from-[#0e5487] to-[#073a61] rounded-full shadow-[0_0_40px_rgba(14,84,135,0.8)] z-10 flex items-center justify-center relative">
                     <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                  </div>

                  {/* Connecting Nodes (Simulated Regions) */}
                  {[
                     { top: "15%", left: "30%", pulse: "2s" }, { top: "25%", left: "75%", pulse: "3s" },
                     { top: "65%", left: "85%", pulse: "2.5s" }, { top: "80%", left: "40%", pulse: "4s" },
                     { top: "50%", left: "12%", pulse: "3.5s" }, { top: "35%", left: "50%", pulse: "2.8s" }
                  ].map((pos, i) => (
                     <div key={i} className="absolute w-4 h-4 rounded-full bg-brand-light shadow-[0_0_15px_#4da1db]" style={{ top: pos.top, left: pos.left, animation: `pulse ${pos.pulse} infinite`}}>
                        <div className="absolute inset-y-1/2 right-1/2 w-32 h-[1px] bg-gradient-to-l from-brand-light to-transparent origin-right -rotate-45 opacity-40"></div>
                     </div>
                  ))}
               </div>
            </motion.div>
         </motion.div>
      </section>

      {/* SECTION 6: CORE FEATURES BENTO GRID */}
      <section className="bg-white py-[120px] px-6">
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading mb-6">Everything You Need to Ship</h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto">Built for developers who value speed, simplicity, and rock-solid reliability at scale.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
            {/* Big Card Left */}
            <motion.div variants={fadeUp} className="md:col-span-1 md:row-span-2 relative bg-gradient-to-br from-[#073a61] via-[#0e5487] to-[#227dbf] rounded-[24px] p-10 overflow-hidden flex flex-col justify-between text-white shadow-[0_12px_40px_rgba(14,84,135,0.25)] hover:shadow-[0_20px_60px_rgba(14,84,135,0.35)] hover:-translate-y-2 transition-all duration-300 group">
               <div>
                 <div className="w-14 h-14 mb-8 text-white opacity-90 group-hover:scale-110 transition-transform">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 16 4-4 4 4"/></svg>
                 </div>
                 <h3 className="text-[28px] font-heading font-bold mb-4 leading-tight">Zero-Config<br/>Deployments</h3>
                 <p className="text-[16px] opacity-80 leading-[1.7]">Push code and go live in seconds. Native auto-detection and optimization for 40+ modern frontend and backend frameworks.</p>
               </div>
               <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 font-mono text-[14px] flex items-center justify-between border border-white/20">
                 <span>Average time to live:</span>
                 <span className="text-brand-pale font-bold flex items-center gap-1"><span className="text-amber-300">⚡</span> 23s</span>
               </div>
               {/* Pattern overlay */}
               <div className="absolute inset-0 circuit-pattern opacity-[0.1] -z-0"></div>
            </motion.div>

            {/* Top Right */}
            <motion.div variants={fadeUp} className="md:col-span-1 md:row-span-1 bg-white border border-border-default rounded-[24px] p-8 shadow-[0_8px_24px_rgba(14,84,135,0.06)] hover:border-brand hover:shadow-[0_12px_40px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center relative overflow-hidden group">
               <h3 className="text-[22px] font-heading font-bold text-text-heading mb-3 group-hover:text-brand transition-colors">Serverless Databases</h3>
               <p className="text-[15px] text-text-muted leading-[1.6] max-w-[200px]">1-click managed PostgreSQL and Redis clusters for your apps.</p>
               <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 text-brand group-hover:scale-110 group-hover:opacity-20 transition-all duration-500">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
               </div>
            </motion.div>

            {/* Middle Right */}
            <motion.div variants={fadeUp} className="md:col-span-1 md:row-span-1 bg-[#F0F9FF] border border-[#BAE6FD] rounded-[24px] p-8 shadow-[0_8px_24px_rgba(14,84,135,0.06)] hover:shadow-[0_12px_40px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center relative overflow-hidden">
               <div className="text-[48px] font-heading font-extrabold text-brand mb-2 leading-none">99.99%</div>
               <h3 className="text-[16px] font-bold text-text-heading mb-6">Guaranteed Uptime SLA</h3>
               <div className="flex gap-2">
                 {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className="flex-1 h-8 rounded-md bg-[#10B981] shadow-sm"></div>)}
               </div>
            </motion.div>

            {/* Bottom Left Small */}
            <motion.div variants={fadeUp} className="md:col-span-1 md:row-span-1 bg-[#FFF7ED] border border-[#FED7AA] rounded-[24px] p-8 shadow-[0_8px_24px_rgba(14,84,135,0.06)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-[14px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-[24px] shadow-inner">$</div>
                  <h3 className="text-[22px] font-heading font-bold text-[#92400E]">Opaque Billing. <br/>Gone.</h3>
               </div>
               <p className="text-[15px] text-[#B45309]">Real-time cost meters prevent surprise overages at scale.</p>
            </motion.div>

            {/* Bottom Right Wide */}
            <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-1 bg-white border border-border-default rounded-[24px] p-8 shadow-[0_8px_24px_rgba(14,84,135,0.06)] hover:border-brand hover:shadow-[0_12px_40px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-8 group">
               <div className="flex-1">
                 <div className="w-12 h-12 rounded-[14px] bg-bg-blue-tint text-brand flex items-center justify-center mb-6 shadow-inner group-hover:bg-brand group-hover:text-white transition-colors">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                 </div>
                 <h3 className="text-[24px] font-heading font-bold text-text-heading mb-3">Advanced Collaboration</h3>
                 <p className="text-[15px] text-text-muted leading-[1.6]">Invite unlimited developers, assign granular RBAC permissions, and stream team audit logs seamlessly.</p>
               </div>
               <div className="flex -space-x-4 bg-[#F8FAFF] p-4 rounded-3xl border border-border-default">
                 <div className="w-14 h-14 rounded-full border-[3px] border-white bg-blue-500 flex items-center justify-center text-white text-[14px] font-bold z-[4] shadow-md">JD</div>
                 <div className="w-14 h-14 rounded-full border-[3px] border-white bg-purple-500 flex items-center justify-center text-white text-[14px] font-bold z-[3] shadow-md">AM</div>
                 <div className="w-14 h-14 rounded-full border-[3px] border-white bg-green-500 flex items-center justify-center text-white text-[14px] font-bold z-[2] shadow-md">CH</div>
                 <div className="w-14 h-14 rounded-full border-[3px] border-white bg-white border-dashed flex items-center justify-center text-brand text-[20px] font-bold z-[1] shadow-md">+</div>
               </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* SECTION 7: FEATURE TABS */}
      <section className="relative bg-[#F8FAFF] pt-24 pb-32 px-6">
        <div className="absolute top-0 inset-x-0 -translate-y-[99%]">
          <svg viewBox="0 0 1440 120" className="w-full h-auto text-[#F8FAFF] fill-current" preserveAspectRatio="none">
             <path d="M0,60 C320,0 420,120 720,60 C1020,0 1120,120 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
             <div className="bg-brand-pale text-brand text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 mx-auto w-max uppercase tracking-wider">Under The Hood</div>
             <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading text-center mb-16 max-w-2xl">The technical details that make the difference.</h2>
          </motion.div>

          {/* Tabs Container */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="flex flex-wrap justify-center items-center bg-white border border-border-default rounded-full p-1.5 mb-16 shadow-[0_4px_14px_rgba(0,0,0,0.03)]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-[15px] font-bold transition-all ${activeTab === tab ? "bg-brand text-white shadow-md" : "text-text-muted hover:text-text-heading hover:bg-slate-50"}`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full min-h-[400px]"
          >
            {/* Left Checklist */}
            <div className="flex flex-col gap-6">
              {tabContent[activeTab].checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-border-default shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-brand-pale flex items-center justify-center text-brand text-[14px] font-bold shrink-0">&#10003;</div>
                  <span className="text-[16px] text-text-heading font-semibold">{item}</span>
                </div>
              ))}
              <Link href="/docs" className="text-brand font-bold text-[16px] mt-6 hover:underline inline-flex items-center gap-2 px-4">
                Explore Documentation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Right Terminal */}
            <div className="w-full bg-[#0F172A] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] overflow-hidden border border-[#1E293B]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1E293B] bg-[#0F172A]">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 </div>
                 <div className="text-[#64748B] text-[12px] font-mono font-semibold">~/projects/dcdeploy</div>
                 <div className="w-12"></div> {/* Spacer */}
              </div>
              <div className="p-8 font-mono text-[14px] leading-relaxed text-slate-300 h-[320px]">
                {tabContent[activeTab].terminal}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SOCIAL PROOF */}
      <section className="bg-white py-[120px] px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6">Loved by developers worldwide.</h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto">Don't just take our word for it. Join thousands of engineers who have upgraded their infrastructure experience.</p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 lg:columns-4 gap-6 space-y-6">
            {[
              { text: "Migrated from Heroku in 90 minutes. Cut our infra costs by 60%. The real-time logs alone justified the switch.", author: "Aditya R.", role: "CTO @ TechFlow", bg: "bg-blue-500" },
              { text: "Finally a platform that actually works for non-DevOps people. My whole team deployed confidently on day one.", author: "Sarah M.", role: "Product Engineer", bg: "bg-purple-500" },
              { text: "The rollback button saved us at 2am during a production incident. One click. Back to working. We'll never leave.", author: "James L.", role: "SRE @ Nexus Labs", bg: "bg-green-500" },
              { text: "Pricing is completely transparent. I've never once been surprised by a bill in 14 months. That trust is priceless.", author: "Priya K.", role: "Indie Founder", bg: "bg-amber-500" },
              { text: "80+ services across 3 teams. The RBAC and org hierarchy is exactly what enterprise teams need from day one.", author: "Marcus T.", role: "VP Engineering", bg: "bg-indigo-500" },
              { text: "Deploys that took 8 minutes on our old CI now take 42 seconds. The speed improvement is genuinely shocking.", author: "Fatima A.", role: "Backend Engineer", bg: "bg-pink-500" },
              { text: "Docs are actually good. Set up Postgres, Redis, and a custom domain in under 15 minutes from zero.", author: "Leo W.", role: "Junior Developer", bg: "bg-blue-400" },
              { text: "The live cost meter in the UI changed how our team thinks about infrastructure spend. A total game changer.", author: "Ana B.", role: "Startup CTO", bg: "bg-teal-500" }
            ].map((quote, i) => (
              <motion.div variants={fadeUp} key={i} className="break-inside-avoid bg-white border border-border-default rounded-[24px] p-8 shadow-[0_4px_14px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(14,84,135,0.12)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-1 mb-6 text-[#F59E0B] text-[20px]">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-[16px] text-text-body leading-[1.8] font-body mb-8">"{quote.text}"</p>
                <div className="flex items-center gap-4 border-t border-[#F1F5F9] pt-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-[15px] shadow-sm ${quote.bg}`}>
                    {quote.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-text-heading">{quote.author}</span>
                    <span className="text-[13px] text-text-muted">{quote.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 9: STATS ROW */}
      <section className="px-6 py-12">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto bg-gradient-to-br from-[#073a61] via-[#0e5487] to-[#227dbf] rounded-[32px] py-[80px] shadow-[0_20px_60px_rgba(14,84,135,0.25)] relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern opacity-[0.1] mix-blend-overlay -z-0"></div>
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/20 relative z-10 w-full px-12">
            {[
              { num: "2.4M+", label: "Deployments", desc: "per month globally" },
              { num: "35", label: "Global regions", desc: "edge nodes active" },
              { num: "99.99%", label: "Uptime SLA", desc: "financially guaranteed" },
              { num: "<3 min", label: "Avg deploy", desc: "from push to live" }
            ].map((stat, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-center py-8 md:py-0 text-center hover:scale-105 transition-transform duration-300">
                <div className="text-[48px] md:text-[64px] font-heading font-extrabold text-white mb-2 leading-none drop-shadow-md">{stat.num}</div>
                <div className="text-[18px] text-white font-bold mb-1">{stat.label}</div>
                <div className="text-[14px] text-white/70">{stat.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION 10: INTEGRATIONS MARQUEE */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-[32px] font-heading font-bold text-text-heading mb-4">Integrates with everything you use.</motion.h2>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-text-muted">Connect your favorite tools and workflows in seconds.</motion.p>
        </div>
        
        <div className="flex overflow-hidden relative group">
          <div className="flex animate-marquee whitespace-nowrap gap-12 py-4">
            {[
              "GitHub", "GitLab", "Bitbucket", "Slack", "Discord", "Terraform", "Docker", "Sentry", "New Relic", "Datadog", "LogRocket", "Stripe"
            ].map((tool) => (
              <div key={tool} className="flex items-center gap-3 bg-white border border-border-default px-6 py-4 rounded-2xl shadow-sm hover:border-brand hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 bg-bg-blue-tint rounded-lg flex items-center justify-center font-bold text-brand">
                  {tool[0]}
                </div>
                <span className="text-[18px] font-semibold text-text-heading">{tool}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex animate-marquee whitespace-nowrap gap-12 py-4" aria-hidden="true">
            {[
              "GitHub", "GitLab", "Bitbucket", "Slack", "Discord", "Terraform", "Docker", "Sentry", "New Relic", "Datadog", "LogRocket", "Stripe"
            ].map((tool) => (
              <div key={`${tool}-clone`} className="flex items-center gap-3 bg-white border border-border-default px-6 py-4 rounded-2xl shadow-sm hover:border-brand hover:shadow-md transition-all cursor-default">
                <div className="w-8 h-8 bg-bg-blue-tint rounded-lg flex items-center justify-center font-bold text-brand">
                  {tool[0]}
                </div>
                <span className="text-[18px] font-semibold text-text-heading">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 11: SECURITY & PROTECTION */}
      <section className="py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-[0.03] invert"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="bg-brand/20 text-brand-light border border-brand/30 text-[12px] font-bold px-4 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest">
                Enterprise Ready
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-[40px] md:text-[56px] font-heading font-extrabold text-white mb-6 leading-tight">
                Security that's <br/>
                <span className="text-brand-light">non-negotiable.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[18px] text-slate-400 mb-10 leading-relaxed max-w-lg">
                We handle the complexity of infrastructure security so you can focus on building. From end-to-end encryption to DDoS protection, we&apos;ve got you covered.
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Automatic SSL", desc: "Managed TLS certificates for all domains." },
                  { title: "DDoS Mitigation", desc: "Enterprise-grade protection at the edge." },
                  { title: "Private Networking", desc: "Isolated VPCs for sensitive workloads." },
                  { title: "Audit Logs", desc: "Track every action across your organization." }
                ].map((item, i) => (
                  <motion.div variants={fadeUp} key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-brand-light shrink-0">✓</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-[14px]">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, rotateY: 30 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative perspective-[1000px]"
            >
              <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-10 rounded-[40px] shadow-2xl overflow-hidden group">
                 <div className="absolute inset-0 bg-brand/5 group-hover:bg-brand/10 transition-colors"></div>
                 <div className="relative z-20 flex flex-col items-center text-center">
                   <div className="w-24 h-24 bg-brand rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(14,84,135,0.4)] animate-float">
                      <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Enterprise Grade Security</h3>
                   <p className="text-slate-400 mb-8">Multi-layered protection for your infrastructure and data.</p>
                   <div className="flex gap-3">
                      <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-[12px] font-bold text-slate-300">End-to-End Encryption</div>
                      <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-[12px] font-bold text-slate-300">DDoS Protection</div>
                   </div>
                 </div>              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 11.5: FREE TIER SPOTLIGHT */}
      <section className="relative bg-white py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-bg-blue-tint/40 to-white pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-brand-pale rounded-full blur-[120px] opacity-50 -z-0 pointer-events-none"></div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="bg-bg-blue-tint text-brand text-[13px] font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-widest border border-border-blue">
              Free Forever
            </div>
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
              Start free. <span className="gradient-text">Ship forever.</span>
            </h2>
            <p className="text-[18px] text-text-body max-w-2xl mx-auto leading-[1.7]">
              No credit card. No 14-day trial countdown. Spin up a service and keep it running &mdash; on real bare metal, on us.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative rounded-[32px] bg-white border border-border-default shadow-[0_20px_60px_rgba(14,84,135,0.08)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* LEFT: What's included */}
              <div className="p-10 md:p-14">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[64px] font-heading font-extrabold text-text-heading leading-none">{sym}0</span>
                  <span className="text-text-muted font-semibold text-[16px]">/forever</span>
                </div>
                <p className="text-[13px] text-text-muted font-semibold uppercase tracking-wider mb-8">Basic plan &mdash; no card on file</p>

                <h3 className="text-[20px] font-bold text-text-heading mb-2">Everything below is yours from day one</h3>
                <p className="text-[14px] text-text-muted mb-8">No asterisks. No surprise overages. Upgrade only when you outgrow it.</p>

                <div className="space-y-4 mb-10">
                  {[
                    { title: "1 always-on service", desc: "Web service, worker, or cron \u2014 your choice." },
                    { title: "DCD-1 machine", desc: "250 MB RAM \u00b7 5 GB NVMe \u00b7 1 vCPU on shared bare metal." },
                    { title: "Deploy from anywhere", desc: "GitHub, GitLab, Bitbucket, or any Docker registry." },
                    { title: "Automatic HTTPS", desc: "Free SSL on a *.dcdeploy.app subdomain." },
                    { title: "Real-time logs & metrics", desc: "Stream stdout and watch RAM / CPU as it runs." },
                    { title: "Per-minute billing on overage", desc: "Scale up only when you need to. Pay only for what you use." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17L4 12"/></svg>
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-text-heading">{item.title}</div>
                        <div className="text-[14px] text-text-muted leading-[1.5]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link href="https://dash.dcdeploy.com" className="px-7 py-3.5 bg-[#fcb817] text-[#0F172A] font-semibold rounded-full shadow-[0_4px_14px_rgba(252,184,23,0.35)] hover:bg-[#e5a515] hover:-translate-y-0.5 transition-all text-center">
                    Get Started Free &rarr;
                  </Link>
                  <Link href="/pricing" className="px-7 py-3.5 bg-white border border-border-default text-text-body font-semibold rounded-full hover:border-brand hover:text-brand transition-all text-center">
                    See Full Pricing
                  </Link>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-text-muted mb-6">
                  <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">&#10003;</span> No credit card required</span>
                  <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">&#10003;</span> Cancel anytime</span>
                  <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">&#10003;</span> No vendor lock-in</span>
                </div>

                {/* Scale-to-zero callout */}
                <div className="flex items-start gap-3 bg-bg-blue-tint border border-border-blue rounded-xl px-4 py-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest bg-brand text-white px-2 py-0.5 rounded-full shrink-0 mt-0.5">microVMs</span>
                  <p className="text-[13px] text-text-body leading-[1.5]">
                    Free services <span className="font-bold text-text-heading">sleep when idle</span> and cold-start in under 300ms via microVM snapshots &mdash; that's how we keep the free tier free. Need always-on? Move to <Link href="/pricing" className="font-bold text-brand underline underline-offset-2 hover:text-brand-hover">Starter</Link>.
                  </p>
                </div>
              </div>

              {/* RIGHT: Mock invoice + when to upgrade */}
              <div className="p-10 md:p-14 bg-gradient-to-br from-[#F8FAFF] to-bg-blue-tint border-t lg:border-t-0 lg:border-l border-border-default flex flex-col gap-8 justify-between">

                {/* Mock receipt visual */}
                <div className="bg-white rounded-2xl border border-border-default shadow-sm p-6 font-mono text-[13px]">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-default">
                    <span className="text-text-muted text-[11px] uppercase tracking-wider font-semibold">Your monthly invoice</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">PREVIEW</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-body">DCD-1 &middot; 1 service</span>
                    <span className="text-text-heading">{sym}0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-body">Bandwidth (10 GB)</span>
                    <span className="text-text-heading">{sym}0.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-body">SSL &amp; subdomain</span>
                    <span className="text-text-heading">{sym}0.00</span>
                  </div>
                  <div className="flex justify-between mb-4 pb-4 border-b border-border-default">
                    <span className="text-text-body">Platform fee</span>
                    <span className="text-text-heading">{sym}0.00</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-bold">
                    <span className="text-text-heading">Total this month</span>
                    <span className="text-brand">{sym}0.00</span>
                  </div>
                  <div className="text-[11px] text-text-muted mt-3">No payment method on file.</div>
                </div>

                {/* When to upgrade */}
                <div>
                  <h4 className="text-[16px] font-bold text-text-heading mb-2">Upgrade to Pro when you need:</h4>
                  <p className="text-[13px] text-text-muted mb-5">Same per-minute billing model. You choose the machine size, we meter the seconds.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Custom domains",
                      "Multiple services",
                      "Team members",
                      "Autoscaling & scale-to-zero",
                      "Production SLA",
                      "Priority support"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-text-body bg-white rounded-lg border border-border-default px-3 py-2.5 hover:border-brand transition-colors">
                        <span className="text-brand font-bold">&rarr;</span>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/pricing" className="text-[14px] font-bold text-brand inline-flex items-center gap-1 mt-6 hover:gap-2 transition-all">
                    Compare plans <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 12: PRICING */}
      <section className="py-32 bg-white px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div variants={fadeUp} className="bg-brand-pale text-brand text-[13px] font-bold px-4 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest">Pricing</motion.div>
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6">Simple, scalable pricing.</motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-text-muted max-w-2xl mx-auto mb-8">Start for free and scale as you grow. No hidden fees or surprise overages.</motion.p>
            <motion.div variants={fadeUp} className="inline-flex">
              <CurrencyToggle size="sm" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {[
              {
                name: "Basic",
                price: `${sym}0`,
                suffix: "/forever",
                desc: "Ship a side project for free. No credit card.",
                features: [
                  "1 always-on service today",
                  "DCD-1 machine (250 MB RAM, 1 vCPU)",
                  "*.dcdeploy.app subdomain with HTTPS",
                  "Deploy from GitHub, GitLab, or Docker",
                  "Real-time logs & metrics",
                  "Community support"
                ],
                badge: "Free forever",
                badgeStyle: "bg-slate-100 text-slate-600",
                cta: "Start Free",
                highlight: false
              },
              {
                name: "Starter",
                price: isINR ? "\u20b9425" : "$5",
                suffix: "/month",
                pill: isINR ? "+\u20b9255 usage credit / mo" : "+$3 usage credit / mo",
                desc: "For side projects that need to stay online 24/7.",
                features: [
                  `${isINR ? "\u20b9255" : "$3"} of compute credit included monthly`,
                  "Always-on VMs \u2014 no idle scale-down",
                  "2 custom domains with auto-managed SSL",
                  "DCD-1 or DCD-2 machine sizes",
                  "Email support (next business day)",
                  "Everything in Basic"
                ],
                badge: "Always-on",
                badgeStyle: "bg-brand-pale text-brand",
                cta: "Choose Starter",
                highlight: true
              },
              {
                name: "Pro",
                price: `${sym}0+`,
                suffix: "wallet \u00b7 per-min compute",
                desc: "Pay-as-you-go for teams and production workloads.",
                features: [
                  "Unlimited services",
                  "All machine sizes (DCD-1 to DCD-6)",
                  "Unlimited custom domains",
                  "All available regions",
                  "Autoscaling & scale-to-zero",
                  "99.5% SLA, dedicated support"
                ],
                badge: "For teams",
                badgeStyle: "bg-purple-100 text-purple-700",
                cta: "Top Up & Deploy",
                highlight: false
              }
            ].map((plan, i) => (
              <motion.div
                variants={fadeUp}
                key={i}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-[32px] border flex flex-col h-full ${plan.highlight ? 'border-2 border-brand bg-white shadow-[0_20px_50px_rgba(14,84,135,0.15)] relative' : 'border-border-default bg-[#F8FAFF]'} transition-all`}
              >
                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">Most Popular</div>}
                <div className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full inline-block w-max mb-4 ${plan.badgeStyle}`}>{plan.badge}</div>
                <h3 className="text-[20px] font-bold text-text-heading mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-[44px] font-heading font-extrabold leading-none ${plan.highlight ? "text-brand" : "text-text-heading"}`}>{plan.price}</span>
                  <span className="text-text-muted font-semibold text-[14px]">{plan.suffix}</span>
                </div>
                {plan.pill && (
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-bold px-2 py-1 rounded-full border border-green-200 w-max mt-3 mb-1">{plan.pill}</div>
                )}
                <p className="text-text-muted mb-6 mt-4 text-[14px] leading-relaxed">{plan.desc}</p>
                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.highlight ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'}`}>
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17L4 12"/></svg>
                      </div>
                      <span className="text-[13px] font-medium text-text-body leading-[1.5]">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="https://dash.dcdeploy.com"
                  className={`block w-full py-3.5 text-center rounded-full font-bold text-[14px] transition-all ${plan.highlight ? 'bg-[#fcb817] text-[#0F172A] hover:bg-[#e5a515] shadow-lg shadow-[#fcb817]/20' : 'bg-white border border-border-default text-text-heading hover:border-brand hover:text-brand'}`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* NEW SECTION 13: FAQ */}
      <section className="py-32 bg-[#F8FAFF] px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading mb-6">Frequently Asked Questions</motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-text-muted">Everything you need to know about the platform.</motion.p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "How does the free tier work?", a: "Our Basic tier includes everything you need to host a service for free. You get 1 service, a global CDN, and automatic SSL forever." },
              { q: "Can I use my own domain?", a: "Yes, you can connect unlimited custom domains to any project on the Pro plan." },
              { q: "Do you support monorepos?", a: "Absolutely. DCDeploy has native support for monorepos. You can configure multiple apps from a single repository with ease." },
              { q: "What happens if I exceed my limits?", a: "We don't believe in surprise bills. If you're approaching your limit, we'll notify you. We never shut down your app for minor overages." },
              { q: "Is my data secure?", a: "We take security seriously. We use industry-standard encryption, multi-layered isolation, and enterprise-grade security protocols for all sensitive data." }            ].map((faq, i) => (
              <motion.div 
                variants={fadeUp} 
                key={i}
                className="bg-white border border-border-default rounded-[24px] overflow-hidden group"
              >
                <details className="w-full">
                  <summary className="flex items-center justify-between p-8 cursor-pointer list-none font-bold text-text-heading text-[18px] group-hover:text-brand transition-colors">
                    {faq.q}
                    <span className="w-8 h-8 rounded-full bg-bg-blue-tint flex items-center justify-center text-brand group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <div className="px-8 pb-8 text-text-body leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 10: BLOG TEASER */}
      <section className="relative bg-[#F8FAFF] pt-32 pb-32 px-6">
        <div className="absolute top-0 inset-x-0 -translate-y-[99%]">
          <svg viewBox="0 0 1440 120" className="w-full h-auto text-[#F8FAFF] fill-current" preserveAspectRatio="none">
            <path d="M0,60 C320,120 420,0 720,60 C1020,120 1120,0 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div variants={fadeUp}>
              <h2 className="text-[36px] md:text-[48px] font-heading font-bold text-text-heading mb-4">Latest Insights</h2>
              <p className="text-[18px] text-text-body">Read our newest tutorials and engineering deep-dives.</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="px-6 py-3 bg-white border border-border-default text-text-heading rounded-full text-[15px] font-bold mt-6 md:mt-0 shadow-sm hover:border-brand hover:text-brand transition-all inline-block">
                View All Articles &rarr;
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Deploy Next.js 14 to production in 3 clicks", bg: "bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]", badge: "TUTORIAL", time: "5 min", color: "text-blue-600" },
              { title: "How we cut deploy times by 40% with Dockerfile optimization", bg: "bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]", badge: "ENGINEERING", time: "8 min", color: "text-green-600" },
              { title: "DCDeploy vs Railway vs Render: honest comparison", bg: "bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5]", badge: "GUIDE", time: "12 min", color: "text-orange-600" },
            ].map((post, i) => (
              <motion.div variants={fadeUp} key={i} className="bg-white border border-border-default rounded-[24px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(14,84,135,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer">
                 <div className={`h-[220px] w-full ${post.bg} p-8 flex items-start relative`}>
                   <div className={`bg-white/80 backdrop-blur ${post.color} text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm`}>{post.badge}</div>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                   <h3 className="text-[20px] font-bold text-text-heading leading-[1.4] mb-4 group-hover:text-brand transition-colors">{post.title}</h3>
                   <p className="text-[15px] text-text-muted mb-8 flex-1 leading-[1.6]">Learn how to configure your application correctly and streamline your deployment workflows.</p>
                   <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-6 mt-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">AC</div>
                        <span className="text-[13px] text-text-muted font-semibold">Alex C. • {post.time}</span>
                      </div>
                   </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 11: FINAL CTA BANNER */}
      <section className="bg-white py-[120px] px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="max-w-6xl mx-auto rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_80px_rgba(14,84,135,0.15)] bg-gradient-to-br from-[#073a61] to-[#0e5487] relative">
          <div className="absolute inset-0 circuit-pattern opacity-[0.1] -z-0 mix-blend-overlay"></div>
          
          {/* Left Half */}
          <div className="md:w-[55%] p-12 md:p-20 relative z-10 flex flex-col justify-center">
            <h2 className="text-[40px] md:text-[52px] font-heading font-bold text-white mb-6 leading-tight">Ready to ship <br/>faster than ever?</h2>
            <p className="text-[18px] text-blue-100 mb-10 max-w-md leading-relaxed">Join thousands of developers building scalable applications without the DevOps friction.</p>
            <div className="flex flex-col sm:flex-row gap-4">
               <Link href="https://dash.dcdeploy.com" className="bg-[#fcb817] text-[#0F172A] font-bold px-8 py-4 rounded-full text-[16px] hover:bg-[#e5a515] hover:scale-105 transition-all shadow-lg text-center">Start Deploying Free</Link>
               <Link href="/contact" className="bg-[#fcb817] border border-[#227dbf] text-[#0F172A] font-bold px-8 py-4 rounded-full text-[16px] hover:bg-[#e5a515] transition-all text-center flex items-center justify-center">Talk To Sales</Link>
            </div>
          </div>
          
          {/* Right Half */}
          <div className="md:w-[45%] bg-[#0F172A] p-12 relative z-10 flex items-center justify-center min-h-[400px]">
             <div className="absolute inset-0 border-l border-white/10"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand/30 rounded-full blur-[80px] -z-0"></div>
             
             {/* Floating Terminal Code Mockup */}
             <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="w-full max-w-[360px] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-6 font-mono text-[13px] leading-[1.8]">
                   <div className="text-slate-300">$ git commit -m "Launch feature"</div>
                   <div className="text-slate-300">$ git push origin main</div>
                   <div className="text-slate-500 mt-2">› DCDeploy detected changes.</div>
                   <div className="text-brand-light">› Building application... 1.2s</div>
                   <div className="text-brand-light">› Deploying to Edge Network...</div>
                   <div className="text-[#10B981] font-bold mt-2">✔ Deployment Live!</div>
                   <div className="text-white mt-1 border-b border-white/20 inline-block">https://app.dcdeploy.app</div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
