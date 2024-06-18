"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, addItem, decreaseItem } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useKindeBrowserClient();

  const cartTotalPrice = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0
  );

  const fee = 1;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("Please Sign in to checkout");
      return;
    }
    setIsLoading(true);
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );
      //it should be in a client-side function
      //initialize Stripe(preconnect)

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout_sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items, sessionId: null }),
        }
      );
      //create checkout session and get session id

      const { sessionId } = await checkoutResponse.json();

      sessionStorage.setItem("checkout_session_id", sessionId);

      const stripeError = await stripe.redirectToCheckout({ sessionId });
      //redirect to checkout page using checkout session id

      if (stripeError) {
        console.log(stripeError.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                items.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && items.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                  aria-hidden="true"
                >
                  <Image
                    src="/hippo-empty-cart.png"
                    alt="empty cart"
                    fill
                    loading="eager"
                  />
                </div>

                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whooops! Nothing to show here yet.
                </p>
              </div>
            )}

            <ul
              className={cn({
                "divide-y devide-gray-200 border-b border-t border-gray-200":
                  isMounted && items.length > 0,
              })}
            >
              {isMounted &&
                items.map(({ product, quantity }) => {
                  return (
                    <li
                      key={`${product.title}-${product.id}`}
                      className="flex pt-6 py-10"
                    >
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain rounded-md w-full h-full sm:h-48 sm:w-48"
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`products/${product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-900"
                                >
                                  {product.title}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                category:{product.category}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatPrice({
                                price: product.price,
                                options: {},
                              })}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeItem(product.id)}
                                variant="ghost"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>

                            <div className="absolute right-0 bottom-0 flex items-center gap-1 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={() => addItem(product)}
                                disabled={isLoading}
                              >
                                +
                              </Button>
                              <div className="size-9 p-1 flex items-center justify-center rounded-xl bg-slate-100">
                                {quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground"
                                onClick={() => decreaseItem(product.id)}
                                disabled={isLoading}
                              >
                                -
                              </Button>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                            <span>Eligible for instant delivery</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice({ price: cartTotalPrice, options: {} })
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction fee</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice({ price: fee, options: {} })
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice({ price: cartTotalPrice + fee, options: {} })
                  ) : (
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full flex gap-6 items-center"
                size="lg"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Checkout"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
