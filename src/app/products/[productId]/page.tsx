import { fetchingProductDataById } from "@/lib/action";
import AddToCartButton from "@/components/AddToCartButton";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel, { Product } from "@/components/ProductReel";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params;

  const product: Product = await fetchingProductDataById(productId);

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-center lg:col-start-2 lg:row-start-1">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadCumb, i) => (
                <li key={breadCumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadCumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadCumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 && (
                      <span className="text-sm text-gray-500 px-4">/</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.title}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-bold text-gray-900">
                  {formatPrice({ price: product.price, options: {} })}
                </p>

                <span className="text-sm text-gray-500 pl-8">|</span>

                <div className="ml-4 border-1 text-muted-foreground border-gray-300 pl-4">
                  {product.category}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="w-5 h-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                loading="eager"
                className="absolute object-contain"
              ></Image>
            </div>
          </div>

          <div className="w-full mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div className="w-full">
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-muted flex justify-center">
                <div className="group inline-flex text-sm text-muted">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ limit: 6, category: product.category, sort: "desc" }}
        title={`Similar ${product.category}`}
        subTitle={`Browse similar high-quality ${product.category} just like ${product.title}`}
      />
    </MaxWidthWrapper>
  );
}
