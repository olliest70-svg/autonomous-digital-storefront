const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-amber-400/15 text-amber-300 ring-amber-400/40",
  Trending: "bg-violet-500/15 text-violet-300 ring-violet-500/40",
  New: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/40",
};

const FALLBACK = "bg-slate-500/15 text-slate-300 ring-slate-500/40";

export function badgeClass(badge?: string): string {
  return badge ? BADGE_STYLES[badge] ?? FALLBACK : "";
}
