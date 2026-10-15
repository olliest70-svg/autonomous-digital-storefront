export interface Review {
  id: string;
  productId: string; // matches product id in products.json
  productTitle: string; // short product name
  author: string;
  location: string; // e.g. "Austin, TX" or "London, UK"
  avatar: string; // initials, e.g. "SJ"
  rating: number; // 1–5
  title: string;
  body: string;
  date: string; // e.g. "October 2026"
  /** True only when the reviewer is confirmed as a paying customer (e.g. matched to a paid Stripe session). */
  verified?: boolean;
}

/**
 * Real customer reviews only. The homepage reviews section and the
 * per-product rating strips stay hidden while this list is empty.
 *
 * Example entry:
 * {
 *   id: "rev_001",
 *   productId: "prod_freelancer_business_os",
 *   productTitle: "Freelancer Business OS",
 *   author: "Jane Doe",
 *   location: "Austin, TX",
 *   avatar: "JD",
 *   rating: 5,
 *   title: "Replaced three tools for me",
 *   body: "Exact words from the customer, with their permission.",
 *   date: "October 2026",
 *   verified: true,
 * }
 */
export const reviews: Review[] = [];

export interface RatingSummary {
  average: number;
  count: number;
}

export function summarize(list: Review[]): RatingSummary {
  if (list.length === 0) return { average: 0, count: 0 };
  const total = list.reduce((sum, r) => sum + r.rating, 0);
  return { average: Math.round((total / list.length) * 10) / 10, count: list.length };
}

export function getProductRating(productId: string, list: Review[] = reviews): RatingSummary {
  return summarize(list.filter((r) => r.productId === productId));
}
