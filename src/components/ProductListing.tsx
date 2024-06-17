"use client";

import { Product } from "./ProductReel";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";

type ProductListingProps = {
  product: Product | null;
  index: number;
};

export default function ProductListing({
  product,
  index,
}: ProductListingProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <Link
        className={cn(
          "invisible h-full p-6 w-full cursor-pointer rounded-xl group hover:scale-105 hover:shadow-lg transition-all duration-300 ease",
          {
            "visible animate-in fade-in-5": isVisible,
          }
        )}
        href={`/products/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <div className="w-full h-64 relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              loading="eager"
              className="object-contain absolute"
            />
          </div>
          <h3 className="mt-4 font-medium text-sm text-gray-700 group-hover:text-blue-800">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice({ price: product.price, options: {} })}
          </p>
        </div>
      </Link>
    );
  }
}

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};
