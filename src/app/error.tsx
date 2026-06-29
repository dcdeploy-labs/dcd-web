"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-8">
        ⚠️
      </div>
      <h2 className="text-3xl font-heading font-bold text-text-heading mb-4 text-center">
        Something went wrong!
      </h2>
      <p className="text-text-body text-[16px] mb-10 text-center max-w-md">
        We encountered an unexpected error. Our team has been notified. 
        Please try refreshing the page or head back home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-[#fcb817] text-[#0F172A] font-bold rounded-full shadow-lg shadow-[#fcb817]/20 hover:bg-[#e5a515] transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-8 py-3 bg-white border border-border-default text-text-heading font-bold rounded-full hover:border-brand transition-all flex items-center justify-center"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
