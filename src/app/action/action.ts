"use server";

import { redirect } from "next/navigation";

export const reDirectToHome = () => {
  redirect("/");
};

export const fetchingProductsData = async ({
  limit,
  sort,
  category,
}: {
  limit: number;
  sort: string;
  category?: string;
}) => {
  const response = await fetch(
    `https://fakestoreapi.com/products${
      category ? `/category/${category}` : ""
    }?limit=${limit}&sort=${sort}`
  );
  const data = await response.json();
  return data;
};

export const fetchingProductDataById = async (id: string) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
};
