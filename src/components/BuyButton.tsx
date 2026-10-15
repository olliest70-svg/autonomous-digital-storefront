"use client";

import { useState } from "react";

type Status = { state: "idle" } | { state: "loading" } | { state: "error"; message: string };

interface BuyButtonProps {
  productId: string;
  label?: string;
  className?: string;
}

/** Starts Stripe Checkout for a product and redirects to the hosted checkout page. */
export default function BuyButton({ productId, label = "Buy Now →", className = "" }: BuyButtonProps) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleBuy() {
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok || typeof data.url !== "string") {
        setStatus({ state: "error", message: data.error ?? "Checkout failed. Please try again." });
        return;
      }
      // Redirect to Stripe-hosted Checkout; keep loading state while navigating.
      window.location.href = data.url;
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleBuy}
        disabled={status.state === "loading"}
        className={`rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-navy disabled:cursor-wait disabled:opacity-60 ${className}`}
      >
        {status.state === "loading" ? "Redirecting…" : label}
      </button>
      {status.state === "error" && (
        <div role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {status.message}
        </div>
      )}
    </div>
  );
}
