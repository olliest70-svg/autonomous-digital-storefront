"use client";

import { useState } from "react";

export type Badge = "Best Seller" | "Trending" | "New";

export interface Product {
  id: string;
  title: string;
  price: number; // smallest currency unit (cents)
  currency: string;
  description: string;
  fileUrl: string;
  badge?: Badge | string;
}

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-amber-400/15 text-amber-300 ring-amber-400/40",
  Trending: "bg-violet-500/15 text-violet-300 ring-violet-500/40",
  New: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
};

export function formatPrice(amount: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string; downloadUrl: string; orderId: string }
  | { state: "error"; message: string };

export default function ProductCard({ product }: { product: Product }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleBuy() {
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStatus({ state: "error", message: data.error ?? "Checkout failed. Please try again." });
        return;
      }
      setStatus({ state: "success", message: data.message, downloadUrl: data.downloadUrl, orderId: data.orderId });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  const badgeClass = product.badge ? BADGE_STYLES[product.badge] ?? "bg-slate-500/15 text-slate-300 ring-slate-500/40" : "";

  return (
    <article className="group flex flex-col rounded-2xl border border-white/10 bg-slate-800/40 p-6 shadow-xl transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-brand/10">
      {product.badge && (
        <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}>
          {product.badge}
        </span>
      )}
      <h3 className="text-lg font-bold leading-snug text-white">{product.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{product.description}</p>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-2xl font-bold text-white">{formatPrice(product.price, product.currency)}</span>
          <button
            type="button"
            onClick={handleBuy}
            disabled={status.state === "loading"}
            className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-navy disabled:cursor-wait disabled:opacity-60"
          >
            {status.state === "loading" ? "Processing…" : "Buy Now →"}
          </button>
        </div>

        {status.state === "success" && (
          <div role="status" className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
            {status.message}{" "}
            <a href={status.downloadUrl} download className="font-semibold underline hover:text-emerald-200">
              Download
            </a>
            <span className="mt-1 block text-xs text-emerald-400/70">Order {status.orderId}</span>
          </div>
        )}
        {status.state === "error" && (
          <div role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {status.message}
          </div>
        )}
      </div>
    </article>
  );
}
