import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

const pillars = [
  {
    title: "Frankfurt, Germany",
    sub: "Your compute, storage, logs and backups all live in our FRA1 region. Nothing leaves EU jurisdiction unless you explicitly opt in to another region.",
    icon: "📍",
  },
  {
    title: "GDPR-compliant by default",
    sub: "DPA available on request. Sub-processor list public. Data-deletion requests honoured within 30 days end-to-end.",
    icon: "📜",
  },
  {
    title: "No US-routed control plane",
    sub: "Our admin APIs, billing, and customer support tooling run in Frankfurt too. We don't trombone your dashboard data through US-East.",
    icon: "🌍",
  },
  {
    title: "Customer data is yours",
    sub: "We don't train models on it, sell it, or share it with ad networks. The only people who can read your logs are people you invite to your org.",
    icon: "🔐",
  },
];

const facts = [
  { label: "Region", value: "FRA1 · Frankfurt, DE" },
  { label: "Jurisdiction", value: "European Union (GDPR)" },
  { label: "Backups retained", value: "14 days, in-region" },
  { label: "DPA", value: "Available on request" },
  { label: "Sub-processors", value: "Public list, opt-out per item" },
  { label: "Data export", value: "Self-serve, JSON or stream" },
];

export default function EuResidencyPreview() {
  return (
    <PreviewShell
      eyebrow="EU residency"
      title="Built for European data, in Europe."
      description="Trust section positioned for European customers and regulated industries. Calm, policy-focused tone. Establishes data-sovereignty bona fides without scary GDPR jargon."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/40 via-white to-white pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[28px]">🇪🇺</span>
                <span className="bg-brand-pale text-brand text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-border-blue">EU Residency</span>
              </div>
              <h2 className="text-[36px] md:text-[52px] font-heading font-bold text-text-heading mb-6 leading-tight">
                Your data stays <br />
                <span className="gradient-text">in Europe.</span>
              </h2>
              <p className="text-[17px] text-text-body leading-[1.7] mb-8">
                Everything you deploy &mdash; compute, storage, logs, backups, and the dashboard that manages it all &mdash; runs in our Frankfurt region under EU law. We won't quietly mirror your traffic through US-East.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-full hover:bg-brand-hover transition-colors">
                  Request a DPA
                </Link>
                <Link href="#" className="inline-flex items-center justify-center gap-2 bg-white border border-border-default text-text-heading font-semibold px-6 py-3 rounded-full hover:border-brand hover:text-brand transition-colors">
                  Sub-processor list
                </Link>
              </div>
            </div>

            <div className="bg-white border border-border-default rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(14,84,135,0.08)]">
              <div className="bg-bg-blue-tint/60 px-6 py-4 border-b border-border-default flex items-center justify-between">
                <span className="text-[12px] font-bold uppercase tracking-widest text-brand">Data sheet</span>
                <span className="text-[10px] font-mono text-text-muted">v2026-06</span>
              </div>
              <dl className="divide-y divide-border-default">
                {facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-2 gap-4 px-6 py-3 items-center">
                    <dt className="text-[13px] text-text-muted font-medium">{f.label}</dt>
                    <dd className="text-[13px] text-text-heading font-bold text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Pillars */}
          <h3 className="text-[24px] font-heading font-bold text-text-heading mb-8 text-center">Four commitments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white border border-border-default rounded-3xl p-7 hover:border-brand hover:shadow-[0_12px_30px_rgba(14,84,135,0.08)] transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-bg-blue-tint border border-border-blue flex items-center justify-center text-[24px]">{p.icon}</div>
                  <h4 className="text-[18px] font-heading font-bold text-text-heading leading-tight">{p.title}</h4>
                </div>
                <p className="text-[14px] text-text-muted leading-[1.7]">{p.sub}</p>
              </div>
            ))}
          </div>

          {/* Honesty note */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 max-w-3xl mx-auto flex gap-4">
            <span className="text-[20px] shrink-0">💡</span>
            <div>
              <h4 className="text-[14px] font-bold text-amber-900 mb-1">A note on multi-region</h4>
              <p className="text-[13px] text-amber-800 leading-[1.6]">
                We'll open more regions over time. When we do, opt-in will be explicit per-service, not a silent migration. If you opted into FRA1, you stay in FRA1 unless you ask otherwise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Best fit: a dedicated /eu page that ranks for &ldquo;Heroku alternative GDPR&rdquo; / &ldquo;EU data residency PaaS&rdquo; etc. Also linkable from a small &ldquo;EU-based&rdquo; badge in the Nav or Footer.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Sub-processor list and DPA need to actually exist as documents before this goes public.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>If we hit SOC2 / ISO27001 later, add badges here.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
