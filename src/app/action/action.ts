"use server";

import { redirect } from "next/navigation";

export const reDirectToHome = () => {
  redirect("/");
};

export const fetchingProductsData = async ({
  limit,
  sort,
}: {
  limit: number;
  sort: string;
}) => {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit}&sort=${sort}`
  );
  const data = await response.json();
  return data;
};
