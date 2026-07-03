import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="flex flex-col w-full bg-white relative min-h-screen">
      
      {/* HEADER / SEARCH */}
      <section className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto w-full border-b border-[#F1F5F9]">
        <div className="absolute inset-0 circuit-pattern pointer-events-none opacity-[0.5] z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="bg-bg-blue-tint text-brand text-[13px] font-semibold px-4 py-1.5 rounded-full mb-6 border border-border-blue inline-flex">
            Documentation
          </div>
          
          <h1 className="text-[44px] md:text-[52px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-6">
            How can we <span className="gradient-text">help?</span>
          </h1>
          
          <div className="w-full relative mt-4 shadow-[0_8px_32px_rgba(14,84,135,0.12)] rounded-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input type="text" placeholder="Search documentation, guides, API..." className="w-full bg-white border-2 border-transparent focus:border-brand pl-14 pr-6 py-4 rounded-full text-[16px] text-text-heading placeholder-text-muted shadow-sm outline-none transition-all" />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="bg-slate-100 text-text-muted text-[11px] font-bold px-2 py-1 rounded shadow-sm border border-border-default">⌘K</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK START */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-[24px] font-heading font-bold text-text-heading mb-6">Quick Start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-bg-page border border-border-default rounded-2xl p-6 group cursor-pointer hover:border-brand hover:shadow-[0_8px_24px_rgba(14,84,135,0.08)] transition-all flex flex-col items-start">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-brand font-bold flex items-center justify-center mb-4">1</div>
             <h3 className="text-[18px] font-semibold text-text-heading mb-2">Connect Repository</h3>
             <p className="text-[14px] text-text-muted mb-4 line-clamp-2">Connect GitHub, GitLab or Bitbucket to import your code.</p>
             <span className="text-brand text-[13px] font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Import repo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
           </div>
           
           <div className="bg-bg-page border border-border-default rounded-2xl p-6 group cursor-pointer hover:border-brand hover:shadow-[0_8px_24px_rgba(14,84,135,0.08)] transition-all flex flex-col items-start relative overflow-hidden">
             <div className="w-10 h-10 rounded-full bg-blue-100 text-brand font-bold flex items-center justify-center mb-4">2</div>
             <h3 className="text-[18px] font-semibold text-text-heading mb-2">Configure Build</h3>
             <p className="text-[14px] text-text-muted mb-4 line-clamp-2">Set up environment variables, build commands, and root directory.</p>
             <span className="text-brand text-[13px] font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Configuration guide <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
             
             {/* Fake pulse indicator */}
             <div className="absolute top-6 right-6 w-3 h-3 bg-brand rounded-full animate-pulse shadow-[0_0_8px_rgba(14,84,135,0.5)]"></div>
           </div>
           
           <div className="bg-gradient-to-br from-[#073a61] to-[#0e5487] rounded-2xl p-6 group cursor-pointer hover:shadow-[0_8px_24px_rgba(14,84,135,0.3)] transition-all flex flex-col items-start text-white relative h-full">
             <div className="absolute inset-0 circuit-pattern opacity-10"></div>
             <div className="relative z-10 flex flex-col h-full w-full">
               <div className="w-10 h-10 rounded-full bg-white/20 text-white font-bold flex items-center justify-center mb-4">3</div>
               <h3 className="text-[18px] font-semibold mb-2">Deploy & Live</h3>
               <p className="text-[14px] text-white/80 mb-4 line-clamp-2">Push your code and get a live URL in seconds.</p>
               <span className="text-white text-[13px] font-semibold mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">Deployment basics <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
             </div>
           </div>
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full border-t border-[#F1F5F9]">
        <h2 className="text-[24px] font-heading font-bold text-text-heading mb-8">Browse by topic</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {[
             { title: "Framework Guides", icon: "📦", links: ["Next.js", "React", "Vue", "SvelteKit", "Nuxt"] },
             { title: "Platform Features", icon: "⚙️", links: ["Edge Network", "Serverless Functions", "Cron Jobs", "Static Assets", "Image Optimization"] },
             { title: "Databases", icon: "💽", links: ["PostgreSQL", "Redis", "MySQL", "Connection Strings", "Backups"] },
             { title: "Networking", icon: "🌐", links: ["Custom Domains", "SSL Certificates", "Redirects", "Headers", "Firewall Rules"] },
             { title: "Observability", icon: "📊", links: ["Build Logs", "Runtime Logs", "Usage Metrics", "Alerts", "Integrations"] },
             { title: "Account & Billing", icon: "💳", links: ["Teams", "RBAC", "Invoices", "Usage Limits", "SAML SSO"] },
           ].map((cat, i) => (
             <div key={i} className="bg-white border border-border-default rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-10 bg-bg-blue-tint rounded-xl flex items-center justify-center text-[20px]">{cat.icon}</div>
                   <h3 className="text-[18px] font-semibold text-text-heading">{cat.title}</h3>
                </div>
                <ul className="flex flex-col gap-3">
                   {cat.links.map((link, j) => (
                      <li key={j}>
                        <a href="#" className="text-[14px] text-text-muted hover:text-brand transition-colors flex items-center gap-2">
                           <span className="w-1 h-1 rounded-full bg-slate-300"></span> {link}
                        </a>
                      </li>
                   ))}
                </ul>
                <a href="#" className="text-[13px] font-semibold text-brand mt-6 inline-block hover:underline">View all {cat.title.toLowerCase()} &rarr;</a>
             </div>
           ))}
        </div>
      </section>

      {/* API REFERENCE TEASER */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full">
         <div className="bg-[#0F172A] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg overflow-hidden relative border border-[#1E293B]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 blur-[100px] rounded-full -z-0 translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="md:w-1/2 relative z-10">
               <div className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full inline-flex mb-4 uppercase tracking-wider backdrop-blur-md border border-white/10">For Developers</div>
               <h2 className="text-[32px] font-heading font-bold text-white mb-4">API Reference</h2>
               <p className="text-[16px] text-slate-300 mb-8 leading-[1.7]">Build custom automations, integrate with your internal tools, and manage your DCDeploy resources programmatically using our RESTful API.</p>
               <button className="px-6 py-3 bg-white text-[#0F172A] font-semibold rounded-full hover:bg-slate-100 transition-colors">
                  Explore API Docs
               </button>
            </div>
            
            <div className="md:w-1/2 relative z-10 w-full">
               <div className="bg-slate-900 border border-slate-700/50 p-4 rounded-xl font-mono text-[13px] w-full shadow-2xl">
                  <div className="flex gap-2 mb-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-slate-400 mb-2"># Create a new deployment</div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">curl</span> -X POST <span className="text-brand-light">https://api.dcdeploy.app/v1/deployments</span> \
                  </div>
                  <div className="text-slate-300 ml-4">
                    -H <span className="text-amber-300">"Authorization: Bearer $DCD_TOKEN"</span> \
                  </div>
                  <div className="text-slate-300 ml-4">
                    -H <span className="text-amber-300">"Content-Type: application/json"</span> \
                  </div>
                  <div className="text-slate-300 ml-4">
                    -d <span className="text-green-400">'{'{"project_id": "prj_xyz123"}'}'</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full mb-12 flex flex-col md:flex-row gap-6">
         <div className="flex-1 bg-bg-page border border-border-blue rounded-2xl p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-border-default shrink-0">🤝</div>
            <div>
               <h3 className="text-[20px] font-semibold text-text-heading mb-2">Community Support</h3>
               <p className="text-[14px] text-text-muted mb-4">Join our Discord community to ask questions, share projects, and learn from other developers.</p>
               <a href="#" className="text-brand font-semibold text-[14px]">Join Discord server &rarr;</a>
            </div>
         </div>
         <div className="flex-1 bg-bg-page border border-border-default rounded-2xl p-8 flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-border-default shrink-0">✉️</div>
            <div>
               <h3 className="text-[20px] font-semibold text-text-heading mb-2">Contact Support</h3>
               <p className="text-[14px] text-text-muted mb-4">Pro and Scale customers get direct access to our engineering team for priority assistance.</p>
               <a href="#" className="text-text-heading font-semibold text-[14px] hover:text-brand transition-colors">Open a ticket &rarr;</a>
            </div>
         </div>
      </section>

    </div>
  );
}
