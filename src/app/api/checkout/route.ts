import { NextResponse } from "next/server";
import products from "@/data/products.json";

interface CheckoutBody {
  productId?: unknown;
  email?: unknown;
}

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId, email } = body ?? {};

  if (typeof productId !== "string" || productId.trim() === "") {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }
  if (email !== undefined && typeof email !== "string") {
    return NextResponse.json({ error: "email must be a string" }, { status: 400 });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      success: true,
      orderId: `ord_${Date.now()}`,
      downloadUrl: product.fileUrl,
      message: "Your download is ready.",
    },
    { status: 200 }
  );
}
