"use client";

import PaymentStatus from "@/components/PaymentStatus";
import { useCart } from "@/hooks/use-cart";
import { getUserAuthData, reDirectToHome } from "@/lib/action";
import { formatPrice } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type InvoiceType = {
  orderId: string;
  email: string;
  productsName: string;
  productsCategory: string;
  productsPrice: string;
  productsQuantity: string;
  productsImage: string;
};

export default function ThankyouPage() {
  const [isPaid, setIsPaid] = useState(false);
  const [invoice, setinvoice] = useState<InvoiceType | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { clearCart } = useCart();

  const fee = 1;

  useEffect(() => {
    const getCheckoutSession = async () => {
      try {
        const sessionId = sessionStorage.getItem("checkout_session_id");

        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        );
        //it should be in a client-side functioncheckout_session_id
        //initialize Stripe(preconnect)

        if (!stripe) throw new Error("Stripe failed to initialize.");

        const checkoutResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout_sessions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: null, sessionId }),
          }
        );
        //get checkout session

        const { paymentStatus, invoice, userId } =
          await checkoutResponse.json();

        const user = await getUserAuthData();

        if (paymentStatus !== "paid" || userId !== user?.id) {
          reDirectToHome();
        }

        setIsPaid(paymentStatus);
        setinvoice(invoice);
        clearCart();
        setIsMounted(true);
      } catch (error) {
        console.log(error);
      }
    };
    getCheckoutSession();
  }, []);

  const orderTotalPrice = invoice?.productsPrice
    .split(", ")
    .reduce((total, price) => {
      return total + Number(price);
    }, 0);

  const productsName = invoice?.productsName.split(", ") || [];
  const productsCategory = invoice?.productsCategory.split(", ") || [];
  const productsPrice = invoice?.productsPrice.split(", ") || [];
  const productsQuantity = invoice?.productsQuantity.split(", ") || [];
  const productsImage = invoice?.productsImage.split(", ") || [];

  const orderProducts = productsName.map((name, index) => {
    return {
      name,
      category: productsCategory[index],
      price: productsPrice[index],
      quantity: productsQuantity[index],
      image: productsImage[index],
    };
  });

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-blue-600">
              Order successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </h1>
            {isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order was processed and your items are goint to be
                delivered. <br />
                We&apos;ve sent your receipt and order details to{" "}
                <span className="font-medium text-gray-900">
                  {invoice?.email}
                </span>
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order, and we&apos;re currently processing
                it. So hang tight and we&apos;ll send you confirmation very
                soon!
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order number.</div>
              {!isMounted ? (
                <Loader2 className="animate-spin size-4 ml-10 mt-4" />
              ) : (
                <div className="mt-2 text-gray-900">{invoice?.orderId}</div>
              )}

              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
                {!isMounted ? (
                  <div className="w-full py-4 flex justify-center">
                    <Loader2 className="animate-spin size-12" />
                  </div>
                ) : (
                  orderProducts?.map((product) => {
                    return (
                      <li key={product.name} className="flex space-x-6 py-6">
                        <div className="relative h-24 w-24">
                          <Image
                            fill
                            src={product.image}
                            alt={`${product.name} image`}
                            className="rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="flex-auto flex flex-col justify-between">
                          <div className="space-y-1">
                            <h3 className="text-gray-900">{product.name}</h3>

                            <p className="my-1">Category: {product.category}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-between gap-y-12">
                          <p className="font-medium text-gray-900 whitespace-normal">
                            {formatPrice({ price: product.price, options: {} })}
                          </p>

                          <p className="font-medium whitespace-nowrap">{`Quantity: ${product.quantity}`}</p>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  {!isMounted ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <p className="text-gray-900">
                      {formatPrice({
                        price: orderTotalPrice || 0,
                        options: {},
                      })}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  {!isMounted ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <p className="text-gray-900">
                      {formatPrice({ price: fee, options: {} })}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  {!isMounted ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <p className="text-base">
                      {formatPrice({
                        price: orderTotalPrice ? orderTotalPrice + fee : 0,
                        options: {},
                      })}
                    </p>
                  )}
                </div>
              </div>

              <PaymentStatus
                isPaid={isPaid}
                orderEmail={invoice?.email || ""}
              />

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/products"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
