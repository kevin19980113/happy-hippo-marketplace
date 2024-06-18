"use server";

import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/hooks/use-cart";

type AccountInfoType = {
  email: string;
  password: string;
  name: string;
};

type LoginType = {
  email: string;
  password: string;
};
export async function requestCreateAccount({
  email,
  password,
  name,
}: AccountInfoType) {
  //   const response = await fetch("/api/auth/create-account", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //if something went wrong, throw an error
  //assume we send request to server
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (false) {
    return { error: "Something went wrong!" };
  }

  return redirect("/verify-email");
}

export async function requestLogin({ email, password }: LoginType) {
  //assume we send request to server
  await new Promise((resolve) => setTimeout(resolve, 1000));

  //if something went wrong, throw an error
  //assume we send request to server
  if (false) {
    return { error: "Something went wrong!" };
  }

  return redirect("/");
}

export async function redirectToCheckout(cartDetails: CartItem[], stripe: any) {
  try {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY!
    );
    //can not initialize stripe in server action

    if (!stripe) throw new Error("Stripe failed to initialize.");

    const checkoutResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/checkout_sessions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartDetails }),
      }
    );

    const { sessionId } = await checkoutResponse.json();
    const stripeError = await stripe.redirectToCheckout({ sessionId });

    if (stripeError) {
      console.log(stripeError.error);
    }
  } catch (error) {
    console.log(error);
  }
}
