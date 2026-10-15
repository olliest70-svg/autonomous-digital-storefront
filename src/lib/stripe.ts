import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily creates the server-side Stripe client so that builds succeed even
 * when STRIPE_SECRET_KEY is not present at build time.
 */
export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}
