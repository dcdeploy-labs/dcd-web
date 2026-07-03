"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [activeDepartment, setActiveDepartment] = useState<"sales" | "support">("sales");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 circuit-pattern pointer-events-none z-0 opacity-40"></div>
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 flex flex-col items-center text-center z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-bg-blue-tint text-brand text-[13px] font-bold px-4 py-1.5 rounded-full mb-6 border border-border-blue inline-flex uppercase tracking-widest">
            Contact Us
          </div>
          <h1 className="text-[48px] md:text-[64px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-6">
            How can we <span className="gradient-text">help?</span>
          </h1>
          <p className="text-[18px] text-text-body leading-[1.7] opacity-80">
            Have a question about our platform, pricing, or high-volume solutions? 
            Our team is here to help you ship faster.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: INFO CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Department Toggle */}
            <div className="bg-[#F1F5F9] p-1 rounded-2xl flex gap-1 mb-4">
              <button 
                onClick={() => setActiveDepartment("sales")}
                className={`flex-1 py-3 rounded-xl font-bold text-[14px] transition-all ${activeDepartment === "sales" ? "bg-white text-brand shadow-sm" : "text-text-muted hover:text-text-heading"}`}
              >
                Sales Inquiries
              </button>
              <button 
                onClick={() => setActiveDepartment("support")}
                className={`flex-1 py-3 rounded-xl font-bold text-[14px] transition-all ${activeDepartment === "support" ? "bg-white text-brand shadow-sm" : "text-text-muted hover:text-text-heading"}`}
              >
                Technical Support
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDepartment}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeDepartment === "sales" ? (
                  <div className="bg-white border border-border-default rounded-[32px] p-8 shadow-sm">
                    <h3 className="text-[20px] font-bold text-text-heading mb-4">Sales Inquiries</h3>
                    <p className="text-text-body text-[15px] mb-8 leading-relaxed">
                      Looking for high-volume pricing, custom SLAs, or a demo for your team? 
                      Our sales engineers are ready to chat.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-bg-blue-tint rounded-2xl border border-border-blue">
                        <span className="text-2xl">📧</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Email Us</span>
                          <span className="text-[15px] font-bold text-brand">sales@dcdeploy.app</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white border border-border-default rounded-2xl">
                        <span className="text-2xl">📅</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Book a Demo</span>
                          <span className="text-[15px] font-bold text-text-heading">calendly.com/dcdeploy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-border-default rounded-[32px] p-8 shadow-sm">
                    <h3 className="text-[20px] font-bold text-text-heading mb-4">Technical Support</h3>
                    <p className="text-text-body text-[15px] mb-8 leading-relaxed">
                      Encountering an issue with your deployment? Our engineering team is available 24/7 
                      for Pro customers.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-bg-blue-tint rounded-2xl border border-border-blue">
                        <span className="text-2xl">🛠️</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Support Ticket</span>
                          <span className="text-[15px] font-bold text-brand">support.dcdeploy.app</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white border border-border-default rounded-2xl">
                        <span className="text-2xl">📚</span>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-text-muted uppercase tracking-wider">Help Center</span>
                          <span className="text-[15px] font-bold text-text-heading">Read Documentation &rarr;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Social / Office */}
            <div className="bg-[#0F172A] rounded-[32px] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 rounded-full blur-[50px]"></div>
               <h4 className="text-[18px] font-bold mb-6">Global Presence</h4>
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <span className="text-slate-400">📍</span>
                   <div>
                     <p className="font-bold text-[14px]">San Francisco</p>
                     <p className="text-[13px] text-slate-400">44 Tehama St, San Francisco, CA 94105</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <span className="text-slate-400">🐦</span>
                   <div>
                     <p className="font-bold text-[14px]">Twitter / X</p>
                     <p className="text-[13px] text-slate-400">@dcdeploy</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:col-span-7 bg-white border border-border-default rounded-[40px] p-8 md:p-12 shadow-xl shadow-brand/5">
            {formState === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 font-bold">✓</div>
                <h2 className="text-[28px] font-heading font-bold text-text-heading mb-4">Message Sent!</h2>
                <p className="text-text-body mb-8 max-w-sm">
                  Thanks for reaching out. A team member will get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="text-brand font-bold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Work Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="john@company.com" 
                      className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px]" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Company</label>
                    <input 
                      type="text" 
                      placeholder="Acme Corp" 
                      className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Project URL (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="dcdeploy.app/my-project" 
                      className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px]" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Subject</label>
                  <select className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px] appearance-none cursor-pointer">
                    <option>General Inquiry</option>
                    <option>Sales Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Billing Question</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-text-heading uppercase tracking-wider">Message</label>
                  <textarea 
                    required 
                    rows={5} 
                    placeholder="Tell us how we can help..." 
                    className="w-full px-5 py-4 bg-bg-page border border-border-default rounded-2xl focus:outline-none focus:border-brand transition-colors text-[15px] resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={formState === "submitting"}
                  type="submit" 
                  className="w-full py-5 bg-[#fcb817] text-[#0F172A] font-bold rounded-2xl shadow-lg shadow-[#fcb817]/20 hover:bg-[#e5a515] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {formState === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : "Send Message"}
                </button>
                <p className="text-center text-[12px] text-text-muted">
                  By clicking send, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-24 px-6 bg-bg-page border-t border-border-default">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[32px] font-heading font-bold text-text-heading mb-4">Quick Answers</h2>
            <p className="text-[16px] text-text-body mb-10 opacity-70">Looking for a faster answer? Check out our help center or search our docs.</p>
            <div className="flex flex-wrap justify-center gap-4">
               {["Billing Guide", "Custom Domains", "Database Migration", "SSL Certificates", "Monorepos"].map((topic) => (
                 <Link key={topic} href="/docs" className="px-6 py-3 bg-white border border-border-default rounded-xl font-semibold text-[14px] hover:border-brand hover:text-brand transition-all shadow-sm">
                   {topic} &rarr;
                 </Link>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
}
