import Link from "next/link";
import type Stripe from "stripe";
import products from "@/data/products.json";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

interface SuccessProps {
  searchParams: Promise<{ session_id?: string }>;
}

type SessionResult =
  | { ok: true; session: Stripe.Checkout.Session }
  | { ok: false; error: string };

async function loadSession(sessionId: string | undefined): Promise<SessionResult> {
  if (!sessionId) return { ok: false, error: "No checkout session was provided." };
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return { ok: true, session };
  } catch (err) {
    console.error("[success] Failed to retrieve Stripe session:", err);
    return { ok: false, error: "We couldn't verify your checkout session." };
  }
}

export default async function SuccessPage({ searchParams }: SuccessProps) {
  const { session_id: sessionId } = await searchParams;
  const result = await loadSession(sessionId);

  const session = result.ok ? result.session : null;
  const isPaid = session?.payment_status === "paid";
  const product = products.find((p) => p.id === session?.metadata?.productId);
  const productName = session?.line_items?.data[0]?.description ?? product?.title ?? "Your digital product";
  const amountPaid =
    session?.amount_total != null ? formatPrice(session.amount_total, session.currency ?? "usd") : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-800/40 p-8 text-center shadow-xl">
        {session ? (
          <>
            <div
              className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${
                isPaid ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
              }`}
            >
              {isPaid ? "✓" : "…"}
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white">{isPaid ? "Payment Successful!" : "Payment Pending"}</h1>
            <p className="mb-6 text-sm text-slate-400">
              {isPaid
                ? "Thank you for your purchase. Your digital product is ready for download below."
                : "Your payment hasn't been confirmed yet. Refresh this page in a moment."}
            </p>

            <div className="mb-6 rounded-xl border border-white/10 bg-navy/60 p-4 text-left">
              <h3 className="font-semibold text-white">{productName}</h3>
              {amountPaid && (
                <p className="mt-1 text-sm text-slate-300">
                  Amount paid: <span className="font-semibold text-white">{amountPaid}</span>
                </p>
              )}
              {session.customer_details?.email && (
                <p className="mt-1 text-xs text-slate-500">Receipt sent to {session.customer_details.email}</p>
              )}
              {isPaid && product && (
                <a
                  href={product.fileUrl}
                  download
                  className="mt-4 block w-full rounded-lg bg-brand py-2.5 text-center text-sm font-medium text-white transition hover:bg-brand-hover"
                >
                  Download File Now
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-bold text-white">Order Not Found</h1>
            <p className="mb-6 text-sm text-amber-300">{result.ok ? "" : result.error}</p>
          </>
        )}

        <Link href="/" className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200">
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
}
