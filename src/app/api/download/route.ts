import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import products from "@/data/products.json";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIVATE_DIR = path.join(process.cwd(), "private-downloads");

function forbidden(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  const productId = searchParams.get("product_id");

  if (!sessionId || !productId) {
    return forbidden("session_id and product_id are required");
  }

  const product = products.find((p) => p.id === productId);
  if (!product) return forbidden();

  let session;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("[download] Failed to retrieve Stripe session:", err);
    return forbidden();
  }

  if (session.payment_status !== "paid" || session.metadata?.productId !== product.id) {
    return forbidden();
  }

  // path.basename prevents path traversal via fileUrl.
  const fileName = path.basename(product.fileUrl);
  let file: Buffer;
  try {
    file = await readFile(path.join(PRIVATE_DIR, fileName));
  } catch (err) {
    console.error(`[download] File missing for ${product.id}:`, err);
    return NextResponse.json({ error: "File not available" }, { status: 500 });
  }

  return new NextResponse(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Length": String(file.length),
      "Cache-Control": "private, no-store",
    },
  });
}
