import Link from "next/link";
import products from "@/data/products.json";

interface SuccessProps {
  searchParams: Promise<{
    order_id?: string;
    product_id?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessProps) {
  const { product_id: productId, order_id: orderId } = await searchParams;
  const product = products.find((p) => p.id === productId);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-800/40 p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-xl font-bold text-emerald-300">
          ✓
        </div>
        <h1 className="mb-2 text-2xl font-bold text-white">Order Confirmed!</h1>
        <p className="mb-6 text-sm text-slate-400">
          Thank you for your purchase. Your digital product is ready for download below.
        </p>

        {product ? (
          <div className="mb-6 rounded-xl border border-white/10 bg-navy/60 p-4 text-left">
            <h3 className="font-semibold text-white">{product.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{orderId ? `Order ${orderId}` : "Instant Access Package"}</p>
            <a
              href={product.fileUrl}
              download
              className="mt-4 block w-full rounded-lg bg-brand py-2.5 text-center text-sm font-medium text-white transition hover:bg-brand-hover"
            >
              Download File Now
            </a>
          </div>
        ) : (
          <p className="mb-6 text-sm text-amber-300">
            Product details couldn&apos;t be loaded automatically. Check your email for your files.
          </p>
        )}

        <Link href="/" className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200">
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
}
