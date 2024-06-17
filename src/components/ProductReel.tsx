import { fetchingProductsData } from "@/app/action/action";
import Link from "next/link";
import ProductListing from "./ProductListing";

type ProductReelProps = {
  title: string;
  subTitle?: string;
  href?: string;
  query: { sort: string; limit: number; category: string };
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export default async function ProductReel(props: ProductReelProps) {
  const { title, subTitle, href, query } = props;

  const products: Product[] = await fetchingProductsData(query);

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title && (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          )}
          {subTitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subTitle}</p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>

      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-10 lg:gap-x-8">
            {products.map((product, index) => (
              <ProductListing
                key={`${product.title}-${product.id}`}
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
