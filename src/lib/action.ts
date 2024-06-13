"use server";

import { redirect } from "next/navigation";

type AccountInfoType = {
  email: string;
  password: string;
};
export async function requestCreateAccount({
  email,
  password,
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
  //   if (!response.ok) {
  //     throw new Error(response.statusText);
  //   }

  //assume we send request to server
  await new Promise((resolve) => setTimeout(resolve, 1000));

  redirect("/verify-email");
}
