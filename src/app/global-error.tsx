"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-text-heading">A critical error occurred</h2>
          <p className="text-text-body mb-8">We're sorry for the inconvenience. Please try again.</p>
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-[#fcb817] text-[#0F172A] font-bold rounded-full"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
