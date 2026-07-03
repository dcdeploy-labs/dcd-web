import Link from "next/link";

export default function ChangelogPage() {
  const changelogs = [
    {
      version: "v2.4.0",
      type: "New Feature",
      typeColor: "bg-green-100 text-green-700",
      date: "April 24, 2026",
      title: "Introducing Managed Redis",
      desc: "You can now provision and manage Redis instances directly from your DCDeploy dashboard. Managed Redis instances automatically inject connection strings into your connected services securely.",
      bullets: [
        "1-click provisioning for Redis 7.x",
        "Automatic connection string injection via REDIS_URL",
        "High availability and automatic failover in Pro and Scale plans",
        "Integrated metrics for memory and connection tracking"
      ],
      hasImage: false
    },
    {
      version: "v2.3.2",
      type: "Improvement",
      typeColor: "bg-blue-100 text-brand",
      date: "April 12, 2026",
      title: "Optimized Dockerfile-based Builds",
      desc: "We've upgraded our build infrastructure to support direct Dockerfile execution. Provide your Dockerfile path and we'll handle the build, caching system dependencies more aggressively to reduce deployment times.",
      bullets: [
        "Up to 40% faster builds via Docker layer caching",
        "Support for custom Dockerfile paths per service",
        "Smaller final image sizes with multi-stage build support"
      ],
      hasImage: true
    },
    {
      version: "v2.3.1",
      type: "Fix",
      typeColor: "bg-amber-100 text-amber-700",
      date: "March 28, 2026",
      title: "Resolved WebSocket Connection Drops",
      desc: "Addressed an issue in our edge routing layer that caused long-lived WebSocket connections to drop prematurely when traversing certain regions.",
      bullets: [],
      hasImage: false
    },
    {
      version: "v2.3.0",
      type: "New Feature",
      typeColor: "bg-green-100 text-green-700",
      date: "March 15, 2026",
      title: "Custom Domain Wildcard SSL",
      desc: "Pro and Scale customers can now attach wildcard domains (*.example.com) to their projects. We automatically provision and renew wildcard SSL certificates via Let's Encrypt.",
      bullets: [
        "Support for unlimited subdomains mapping to a single service",
        "Automatic certificate provisioning and renewal"
      ],
      hasImage: false
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 flex flex-col items-center text-center overflow-hidden border-b border-[#F1F5F9]">
        <div className="absolute inset-0 circuit-pattern pointer-events-none z-0"></div>
        
        <h1 className="relative z-10 text-[52px] font-heading font-extrabold text-text-heading leading-[1.1] tracking-[-0.02em] mb-4">
          What's <span className="gradient-text">New.</span>
        </h1>
        
        <p className="relative z-10 text-[18px] text-text-body max-w-[600px]">
          New updates and improvements to DCDeploy.
        </p>
      </section>

      {/* CONTENT LAYOUT */}
      <section className="py-16 px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12">
         
         {/* Sidebar Nav */}
         <aside className="w-full md:w-[240px] shrink-0 md:sticky top-[100px] self-start">
            <h3 className="font-semibold text-text-heading mb-4 px-3">2026</h3>
            <ul className="flex flex-col gap-1">
               <li><a href="#" className="block px-3 py-2 text-[14px] bg-bg-blue-tint text-brand font-medium rounded-lg">April 2026</a></li>
               <li><a href="#" className="block px-3 py-2 text-[14px] text-text-muted hover:text-text-heading hover:bg-slate-50 rounded-lg">March 2026</a></li>
               <li><a href="#" className="block px-3 py-2 text-[14px] text-text-muted hover:text-text-heading hover:bg-slate-50 rounded-lg">February 2026</a></li>
               <li><a href="#" className="block px-3 py-2 text-[14px] text-text-muted hover:text-text-heading hover:bg-slate-50 rounded-lg">January 2026</a></li>
            </ul>
            <h3 className="font-semibold text-text-heading mt-8 mb-4 px-3">2025</h3>
            <ul className="flex flex-col gap-1">
               <li><a href="#" className="block px-3 py-2 text-[14px] text-text-muted hover:text-text-heading hover:bg-slate-50 rounded-lg">December 2025</a></li>
               <li><a href="#" className="block px-3 py-2 text-[14px] text-text-muted hover:text-text-heading hover:bg-slate-50 rounded-lg">November 2025</a></li>
            </ul>
         </aside>

         {/* Main Content Feed */}
         <div className="flex flex-col flex-1 border-l border-border-default md:pl-12 ml-4 md:ml-0 relative">
            {changelogs.map((log, i) => (
              <article key={i} className={`relative pb-16 ${i !== changelogs.length - 1 ? 'border-b border-border-default mb-16' : ''}`}>
                 {/* Timeline dot */}
                 <div className="absolute left-[-5px] md:left-[-53px] top-6 w-[10px] h-[10px] rounded-full bg-brand ring-4 ring-white"></div>
                 
                 <div className="font-mono text-[13px] text-text-muted mb-4 pt-4 ml-6 md:ml-0">{log.date}</div>
                 
                 <div className="ml-6 md:ml-0">
                   <div className="flex items-center gap-2 mb-4">
                     <span className="bg-brand text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{log.version}</span>
                     <span className={`${log.typeColor} text-[11px] font-bold px-2 py-0.5 rounded-full`}>{log.type}</span>
                   </div>
                   
                   <h2 className="text-[22px] font-heading font-semibold text-text-heading mb-4">{log.title}</h2>
                   <p className="text-[16px] text-text-body leading-[1.7] mb-6">{log.desc}</p>
                   
                   {log.bullets.length > 0 && (
                     <ul className="flex flex-col gap-3 mb-6">
                       {log.bullets.map((b, idx) => (
                         <li key={idx} className="flex items-start gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0"></div>
                           <span className="text-[15px] text-text-body leading-snug">{b}</span>
                         </li>
                       ))}
                     </ul>
                   )}

                   {log.hasImage && (
                     <div className="mt-6 w-full h-[240px] bg-bg-page border border-border-default rounded-xl overflow-hidden flex items-center justify-center">
                       <span className="text-text-muted text-[14px] font-medium">[ UI Mockup Screenshot ]</span>
                     </div>
                   )}
                 </div>
              </article>
            ))}
         </div>

      </section>

    </div>
  );
}
