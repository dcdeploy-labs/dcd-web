"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden min-h-[60vh] justify-center">
        <div className="absolute inset-0 circuit-pattern pointer-events-none z-0 opacity-40"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg-page to-transparent z-0"></div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="bg-bg-blue-tint text-brand text-[13px] font-bold px-4 py-1.5 rounded-full mb-6 border border-border-blue inline-flex uppercase tracking-widest">
            Our Story
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-[56px] md:text-[72px] font-heading font-extrabold text-text-heading leading-[1.05] tracking-[-0.03em] mb-6">
            We're on a mission to <br />
            <span className="gradient-text">humanize</span> infrastructure.
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-[20px] text-text-body max-w-[700px] leading-[1.7] mb-10 opacity-80">
            DCDeploy was founded by engineers who were tired of fighting their tools. 
            We build for the creators, the dreamers, and the builders.
          </motion.p>
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Founded", value: "2024" },
              { label: "Team Members", value: "45+" },
              { label: "Countries", value: "12" },
              { label: "Investors", value: "$20M+" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-bg-page rounded-3xl border border-border-default hover:border-brand transition-colors"
              >
                <div className="text-[32px] font-heading font-extrabold text-brand mb-2">{stat.value}</div>
                <div className="text-[14px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-32 px-6 bg-white relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-brand to-blue-400 rounded-[40px] rotate-3 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 circuit-pattern opacity-20"></div>
               <div className="absolute inset-12 bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
               </div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-border-default animate-float max-w-[240px]">
               <p className="text-[14px] font-medium text-text-body italic">"We didn't just want to build another hosting provider. We wanted to build a partner for developers."</p>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-[40px] font-heading font-bold text-text-heading leading-tight">Born from frustration, <br/>built with <span className="text-brand">passion.</span></h2>
            <p className="text-[18px] text-text-body leading-[1.8]">
              In 2024, our founders were scaling a high-growth startup and found themselves 
              drowning in infrastructure complexity. The tools available were either too 
              simplistic for production or required a massive DevOps team to maintain.
            </p>
            <p className="text-[18px] text-text-body leading-[1.8]">
              DCDeploy was built to bridge that gap. We've taken the best practices of 
              enterprise infrastructure and wrapped them in an interface that anyone can use. 
              No YAML mastery required, no surprise bills, just pure focus on your code.
            </p>
            <div className="mt-4">
              <Link href="/blog" className="text-brand font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Read our full manifesto &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-32 px-6 bg-[#0F172A] relative overflow-hidden text-white">
        <div className="absolute inset-0 circuit-pattern opacity-5 invert"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[36px] md:text-[52px] font-heading font-bold mb-6">Our Values.</h2>
            <p className="text-[18px] text-slate-400 max-w-2xl mx-auto">The principles that guide every decision we make and every line of code we write.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "Transparency", desc: "No opaque pricing, no hidden limits. We believe in being honest with our users, always.", icon: "💎" },
               { title: "User Autonomy", desc: "You should own your infrastructure, not be locked into it. We build on open standards.", icon: "🔓" },
               { title: "Relentless Speed", desc: "Deployments should be faster than a coffee break. We optimize for every second.", icon: "🚀" }
             ].map((value, i) => (
               <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[32px] p-10 hover:bg-white/10 transition-colors">
                 <div className="text-[40px] mb-8">{value.icon}</div>
                 <h3 className="text-[22px] font-bold mb-4">{value.title}</h3>
                 <p className="text-slate-400 leading-relaxed text-[16px]">{value.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CAREERS CTA */}
      <section className="py-32 px-6 bg-white">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-6xl mx-auto rounded-[40px] bg-bg-page border border-border-default p-12 md:p-20 text-center relative overflow-hidden"
         >
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            
            <h2 className="text-[40px] md:text-[56px] font-heading font-bold text-text-heading mb-6">Want to build the <br/>future with us?</h2>
            <p className="text-[18px] text-text-body max-w-xl mx-auto mb-10 leading-relaxed">
              We're a remote-first team of engineers, designers, and thinkers distributed across the globe. 
              We're always looking for kind, talented people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="px-8 py-4 bg-[#fcb817] text-[#0F172A] rounded-full font-bold shadow-lg shadow-[#fcb817]/20 hover:scale-105 transition-all">View Openings</button>
               <button className="px-8 py-4 bg-white border border-border-default text-text-heading rounded-full font-bold hover:border-brand transition-all">Our Culture</button>
            </div>
         </motion.div>
      </section>

    </div>
  );
}
