import Image from "next/image";
import { Product } from "./ProductReel";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

export default function CartItem({ product }: { product: Product }) {
  const { removeItem } = useCart();
  const { title, image, price, category, id } = product;
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded-lg">
            <div className="relative flex h-full items-center justify-center bg-white">
              <Image
                src={image}
                alt={title}
                fill
                className="absolute object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {title}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {category}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(id)}
                className="flex items-center gap-1 hover:text-slate-900"
              >
                <X className="w-3 h-4" /> Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice({ price: price, options: {} })}
          </span>
        </div>
      </div>
    </div>
  );
}
