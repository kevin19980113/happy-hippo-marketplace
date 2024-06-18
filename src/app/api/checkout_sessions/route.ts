import { NextRequest, NextResponse } from "next/server";
import stripe from "@/config/stripe";
import { CartItem } from "@/hooks/use-cart";

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  const lineItems = items.map((item: CartItem) => {
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item.product.title,
        },
        unit_amount: item.product.price * 100,
      },
      quantity: 1,
    };
  });

  lineItems.push({
    price: process.env.STRIPE_TRANSACTION_FEE,
    quantity: 1,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}
