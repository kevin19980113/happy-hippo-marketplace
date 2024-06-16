"use server";

import { redirect } from "next/navigation";

export const reDirectToHome = () => {
  redirect("/");
};
