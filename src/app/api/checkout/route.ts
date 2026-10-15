import { NextResponse } from "next/server";
import products from "@/data/products.json";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

interface CheckoutBody {
  productId?: unknown;
}

function getBaseUrl(request: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(request.url).origin;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId } = body ?? {};
  if (typeof productId !== "string" || productId.trim() === "") {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  try {
    const stripe = getStripe();
    const baseUrl = getBaseUrl(request);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: product.currency,
            unit_amount: product.price,
            product_data: {
              name: product.title,
              description: product.description.slice(0, 500),
            },
          },
        },
      ],
      metadata: { productId: product.id },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL" }, { status: 502 });
    }

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error("[checkout] Failed to create Stripe session:", err);
    const message = err instanceof Error ? err.message : "Unable to start checkout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
