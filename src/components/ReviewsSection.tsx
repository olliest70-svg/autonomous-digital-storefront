import Link from "next/link";
import { reviews as allReviews, summarize, type Review } from "@/data/reviews";
import Stars from "./Stars";

export default function ReviewsSection({ reviews = allReviews }: { reviews?: Review[] }) {
  if (reviews.length === 0) return null;

  const { average, count } = summarize(reviews);
  const verifiedCount = reviews.filter((r) => r.verified).length;
  const countLabel =
    verifiedCount === count
      ? `${count} verified ${count === 1 ? "review" : "reviews"}`
      : `${count} ${count === 1 ? "review" : "reviews"}`;

  return (
    <section id="reviews" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl scroll-mt-8 px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What customers are saying</h2>
          <div className="mt-4 flex flex-col items-center gap-2">
            <Stars rating={average} size="text-2xl" />
            <p className="text-slate-400">
              {average.toFixed(1)} out of 5 — {countLabel}
            </p>
          </div>
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-slate-800 p-6 shadow-lg transition hover:border-brand/50 hover:shadow-brand/10"
            >
              <header className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
                  {review.avatar}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{review.author}</p>
                  <p className="truncate text-xs text-slate-400">
                    {review.location}
                    {review.verified && <span className="text-emerald-400"> · Verified buyer</span>}
                  </p>
                </div>
              </header>

              <div className="mt-4">
                <Stars rating={review.rating} size="text-sm" />
              </div>
              <h3 className="mt-2 font-bold text-white">{review.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{review.body}</p>

              <footer className="mt-5 flex items-center justify-between gap-3">
                <Link
                  href={`/products/${review.productId}`}
                  className="truncate rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-indigo-300 transition hover:border-brand/60 hover:text-indigo-200"
                >
                  {review.productTitle}
                </Link>
                <time className="flex-none text-xs text-slate-500">{review.date}</time>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
