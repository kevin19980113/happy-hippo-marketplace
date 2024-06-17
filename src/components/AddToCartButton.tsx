"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "./ProductReel";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className={`w-full ${isSuccess ? "hover:bg-blue-400" : ""}`}
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
}
