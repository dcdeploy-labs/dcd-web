"use client";

import { useCallback, useEffect, useState } from "react";

export type Currency = "USD" | "INR";

const STORAGE_KEY = "dcd-currency";

/**
 * 1 USD ≈ 85 INR (matches the conversion implied by the dual-currency
 * SKUs in /pricing). Update in one place if the platform rate changes.
 */
export const USD_TO_INR = 85;

/**
 * Currency hook with geo auto-detect + localStorage persistence.
 *
 * - During SSR and the first client render we always return "USD" so
 *   that hydration is stable for the larger user base.
 * - On mount, we read the saved preference from localStorage. If none
 *   is set and the user's timezone is `Asia/Kolkata`, we flip to INR.
 *   Otherwise we stay on USD.
 * - Calling `setCurrency` persists the new choice immediately.
 */
export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>("USD");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "USD" || saved === "INR") {
        setCurrencyState(saved);
        return;
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Asia/Kolkata") {
        setCurrencyState("INR");
      }
    } catch {
      // Ignore SSR/locked-down environments — keep USD default.
    }
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable — still update in-memory.
    }
  }, []);

  return { currency, setCurrency, hydrated } as const;
}

/**
 * Format a numeric amount for a given currency.
 *
 *   formatCurrency(425, "INR") => "₹425"
 *   formatCurrency(5, "USD")   => "$5"
 *   formatCurrency(0.0019, "INR", { decimals: 5 }) => "₹0.00190"
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  opts: { decimals?: number } = {}
): string {
  const decimals = opts.decimals;
  if (currency === "INR") {
    if (typeof decimals === "number") {
      return `₹${amount.toFixed(decimals)}`;
    }
    return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
  }
  if (typeof decimals === "number") {
    return `$${amount.toFixed(decimals)}`;
  }
  return `$${amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

/**
 * Convenience helper to pick a value from a `{ INR, USD }` object map.
 */
export function pickByCurrency<T>(map: Record<Currency, T>, currency: Currency): T {
  return map[currency];
}

export interface CurrencyToggleProps {
  size?: "sm" | "md";
  className?: string;
}

/**
 * Pill-shaped USD / INR toggle that reads + writes the shared currency state.
 */
export function CurrencyToggle({ size = "md", className = "" }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();
  const padding = size === "sm" ? "px-3 py-1 text-[12px]" : "px-5 py-2 text-[14px]";

  return (
    <div className={`bg-[#F1F5F9] border border-border-default rounded-full p-1 inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setCurrency("USD")}
        aria-pressed={currency === "USD"}
        className={`${padding} rounded-full font-bold transition-all ${
          currency === "USD"
            ? "bg-white shadow-sm text-brand"
            : "text-text-muted hover:text-text-heading"
        }`}
      >
        USD
      </button>
      <button
        type="button"
        onClick={() => setCurrency("INR")}
        aria-pressed={currency === "INR"}
        className={`${padding} rounded-full font-bold transition-all ${
          currency === "INR"
            ? "bg-white shadow-sm text-brand"
            : "text-text-muted hover:text-text-heading"
        }`}
      >
        INR
      </button>
    </div>
  );
}
