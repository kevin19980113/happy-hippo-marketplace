"use server";

import { redirect } from "next/navigation";

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
