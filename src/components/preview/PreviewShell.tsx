import Link from "next/link";
import type { ReactNode } from "react";

export interface PreviewShellProps {
  eyebrow: string;
  title: string;
  description: string;
  status?: "draft" | "ready";
  children: ReactNode;
}

export function PreviewShell({ eyebrow, title, description, status = "draft", children }: PreviewShellProps) {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Preview banner */}
      <div className="sticky top-[68px] z-40 bg-[#0F172A] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4 text-[13px]">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 ${status === "ready" ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status === "ready" ? "bg-green-400" : "bg-amber-400"} animate-pulse`}></span>
              {status === "ready" ? "Ready" : "Draft"}
            </span>
            <span className="text-white/40 hidden sm:inline">Preview</span>
            <span className="text-white/40 hidden sm:inline">/</span>
            <span className="font-semibold truncate">{eyebrow}</span>
          </div>
          <Link href="/preview" className="text-white/70 hover:text-white transition-colors flex items-center gap-1 shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span className="hidden sm:inline">All previews</span>
          </Link>
        </div>
      </div>

      {/* Section description */}
      <section className="bg-bg-blue-tint/30 border-b border-border-default px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[12px] font-bold text-brand uppercase tracking-widest mb-3">{eyebrow}</div>
          <h1 className="text-[32px] md:text-[40px] font-heading font-bold text-text-heading mb-3 leading-tight">{title}</h1>
          <p className="text-[16px] text-text-muted max-w-3xl leading-relaxed">{description}</p>
        </div>
      </section>

      {/* Section content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
