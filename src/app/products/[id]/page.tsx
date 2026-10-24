import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import { productDetails } from "@/data/productDetails";
import BuyButton from "@/components/BuyButton";
import { formatPrice } from "@/lib/format";
import { badgeClass } from "@/lib/badges";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} | Deep Work Templates`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const details = productDetails[product.id];
  const price = formatPrice(product.price, product.currency);

  return (
    <main className="min-h-screen bg-navy px-6 py-12 text-slate-200">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200">
          ← Back to all products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <section>
            {product.badge && (
              <span className={`mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${badgeClass(product.badge)}`}>
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">{product.title}</h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300">{product.description}</p>

            {details && (
              <>
                <div className="mt-10 rounded-2xl border border-white/10 bg-slate-800/40 p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-white">What&apos;s included</h2>
                  <ul className="mt-5 space-y-3">
                    {details.included.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-300">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-bold text-white">Who is this for</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {details.audience.map((persona) => (
                      <div key={persona.title} className="rounded-xl border border-white/10 bg-slate-800/30 p-5 transition hover:border-brand/60">
                        <h3 className="font-semibold text-white">{persona.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">{persona.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </section>

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-brand/40 bg-slate-800/60 p-6 shadow-xl shadow-brand/10">
              <p className="text-sm uppercase tracking-wide text-slate-400">One-time payment</p>
              <p className="mt-2 text-4xl font-extrabold text-white">{price}</p>
              <BuyButton productId={product.id} label={`Buy Now — ${price}`} className="mt-6 w-full px-6 py-3.5 text-base" />
              <ul className="mt-6 space-y-2 text-sm text-slate-400">
                <li>⚡ Instant digital download</li>
                <li>🔒 Secure checkout via Stripe</li>
                <li>♾️ Lifetime access</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
