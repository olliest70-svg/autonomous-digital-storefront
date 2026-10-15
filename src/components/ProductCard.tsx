import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { badgeClass } from "@/lib/badges";
import { getProductRating } from "@/data/reviews";
import BuyButton from "./BuyButton";
import Stars from "./Stars";

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

export { formatPrice };

export default function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.id}`;
  const rating = getProductRating(product.id);

  return (
    <article className="group flex flex-col rounded-2xl border border-white/10 bg-slate-800/40 p-6 shadow-xl transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-brand/10">
      {product.badge && (
        <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass(product.badge)}`}>
          {product.badge}
        </span>
      )}
      <h3 className="text-lg font-bold leading-snug text-white">
        <Link href={href} className="transition hover:text-indigo-300 focus:outline-none focus-visible:underline">
          {product.title}
        </Link>
      </h3>
      {rating.count > 0 && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
          <Stars rating={rating.average} size="text-xs" />
          <span>
            {rating.average.toFixed(1)} ({rating.count} {rating.count === 1 ? "review" : "reviews"})
          </span>
        </p>
      )}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{product.description}</p>
      <Link href={href} className="mt-3 w-fit text-sm font-medium text-indigo-300 transition hover:text-indigo-200">
        Learn more →
      </Link>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-2xl font-bold text-white">{formatPrice(product.price, product.currency)}</span>
          <BuyButton productId={product.id} className="px-5 py-2.5 text-sm" />
        </div>
      </div>
    </article>
  );
}
