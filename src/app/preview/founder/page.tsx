import Link from "next/link";
import { PreviewShell } from "../../../components/preview/PreviewShell";

export default function FounderPreview() {
  return (
    <PreviewShell
      eyebrow="Founder note"
      title="Why we built DCDeploy."
      description="Short personal note from the founders. Humanises the brand, sets the tone for the rest of the site. Replace placeholder text with the actual founder's voice before promoting."
      status="draft"
    >
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-blue-tint/40 via-white to-bg-blue-tint/30 pointer-events-none"></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-brand-pale rounded-full blur-[120px] opacity-50"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Letterhead */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-default">
            <div className="flex items-center gap-3">
              <span className="text-[28px]">✍️</span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-brand">A note from the founders</div>
                <div className="text-[12px] text-text-muted">Updated June 2026</div>
              </div>
            </div>
            <div className="hidden sm:block bg-bg-blue-tint border border-border-blue text-brand text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Hand-written
            </div>
          </div>

          {/* Body */}
          <article className="prose-like space-y-6 text-[17px] text-text-body leading-[1.8]">
            <p className="text-[22px] font-heading font-bold text-text-heading leading-[1.4]">
              We started DCDeploy because we got tired of paying $400 a month to keep a hobby project alive.
            </p>

            <p>
              Most of the modern deploy platforms started honest and useful. Heroku was magic in 2010. Vercel was magic in 2018. Then they all did the same thing &mdash; raised prices, killed the free tier, added a &ldquo;contact sales&rdquo; column, and stopped serving the developer who just wants to <em>ship something</em>.
            </p>

            <p>
              DCDeploy is our attempt to fix that. We bought our own metal in Frankfurt. We wrote a microVM runtime so the free tier could actually stay free without bankrupting us. We priced everything per-minute, so you only pay for the seconds your code runs.
            </p>

            <p>
              We're not trying to be a billion-dollar IPO. We're trying to be the platform we wanted to use in 2018: cheap enough for hobby projects, serious enough for production, honest enough that you don't have to read three blog posts to understand your invoice.
            </p>

            <p>
              If we ever break that promise, you can email us, screenshot in hand, and we'll fix it.
            </p>

            <p className="text-text-muted text-[15px]">
              &mdash; The DCDeploy team
            </p>
          </article>

          {/* Signature row */}
          <div className="mt-12 pt-8 border-t border-border-default grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { initials: "FN", role: "CEO / Co-founder", name: "Founder Name" },
              { initials: "F2", role: "CTO / Co-founder", name: "Co-founder Name" },
              { initials: "F3", role: "Engineering Lead", name: "Eng Lead Name" },
            ].map((p) => (
              <div key={p.initials} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand text-white font-heading font-bold flex items-center justify-center shadow-sm">
                  {p.initials}
                </div>
                <div>
                  <div className="text-[14px] font-bold text-text-heading">{p.name}</div>
                  <div className="text-[12px] text-text-muted">{p.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border border-border-default rounded-3xl p-8 shadow-sm">
            <div>
              <h3 className="text-[18px] font-bold text-text-heading mb-1">Read more from us</h3>
              <p className="text-[14px] text-text-muted">Engineering notes, architecture deep-dives, and the occasional rant.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/blog" className="bg-brand text-white text-[14px] font-bold px-5 py-3 rounded-full hover:bg-brand-hover transition-colors">
                Read the blog
              </Link>
              <Link href="/contact" className="bg-white border border-border-default text-text-heading text-[14px] font-bold px-5 py-3 rounded-full hover:border-brand hover:text-brand transition-colors">
                Say hi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-page py-20 px-6 border-t border-border-default">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[20px] font-bold text-text-heading mb-6">If we promote this</h3>
          <ul className="space-y-3 text-[14px] text-text-body">
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Rewrite the body copy in the founder's actual voice. The placeholder text captures the tone but the founder should sign off on every sentence.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Replace placeholder names + initials with real founder names. Add real headshots once the team approves.</li>
            <li className="flex gap-3"><span className="text-brand font-bold shrink-0">→</span>Best home-page slot: near the bottom, between &ldquo;No BS&rdquo; (if we ship that) and the Final CTA. Or as a dedicated /about extension.</li>
          </ul>
        </div>
      </section>
    </PreviewShell>
  );
}
