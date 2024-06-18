import { NextRequest, NextResponse } from "next/server";
import stripe from "@/config/stripe";
import { CartItem } from "@/hooks/use-cart";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import orderId from "order-id";
import { Product } from "@/components/ProductReel";

export async function POST(req: NextRequest) {
  const { items, sessionId } = await req.json();

  if (sessionId) {
    const sessionData = await getCheckoutSessionData(sessionId);

    if ("error" in sessionData) {
      return NextResponse.json(sessionData);
    }

    return NextResponse.json({
      paymentStatus: sessionData.paymentStatus,
      invoice: sessionData.invoice,
      userId: sessionData.userId,
    });
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log(user?.id);

  if (!user) {
    throw new Error("User is not logged in");
  }

  const lineItems = items.map((item: CartItem) => {
    return {
      price_data: {
        currency: "cad",
        product_data: {
          name: item.product.title,
          images: [item.product.image],
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.quantity,
    };
  });

  lineItems.push({
    price: process.env.STRIPE_TRANSACTION_FEE,
    quantity: 1,
  });

  const orderIdGenerator = orderId(process.env.STRIPE_SECRET_KEY!);
  const order_id = orderIdGenerator.generate();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      client_reference_id: user.id,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          metadata: {
            orderId: order_id,
            email: user.email,
            productsName: items
              .map((item: { product: Product }) => item.product.title)
              .join(", "),
            productsCategory: items
              .map((item: { product: Product }) => item.product.category)
              .join(", "),
            productsPrice: items
              .map((item: { product: Product }) => item.product.price)
              .join(", "),
            productsQuantity: items
              .map((item: { quantity: number }) => item.quantity)
              .join(", "),
            productsImage: items
              .map((item: { product: Product }) => item.product.image)
              .join(", "),
          },
        },
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}

async function getCheckoutSessionData(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      paymentStatus: session.payment_status,
      invoice: session.invoice_creation?.invoice_data.metadata,
      userId: session.client_reference_id,
    };
  } catch (error) {
    return { error: "Error creating checkout session" };
  }
}
