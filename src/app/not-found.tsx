import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-[120px] font-heading font-extrabold text-brand/10 leading-none mb-4 select-none">
        404
      </div>
      <h2 className="text-3xl font-heading font-bold text-text-heading mb-4 text-center">
        Page Not Found
      </h2>
      <p className="text-text-body text-[16px] mb-10 text-center max-w-md">
        The page you are looking for might have been moved, renamed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-[#fcb817] text-[#0F172A] font-bold rounded-full shadow-lg shadow-[#fcb817]/20 hover:bg-[#e5a515] transition-all"
      >
        Back to Dashboard &rarr;
      </Link>
    </div>
  );
}
