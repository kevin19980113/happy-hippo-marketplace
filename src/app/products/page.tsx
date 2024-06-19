import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";

type ProductsPageProps = {
  searchParams: {
    category?: string;
  };
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  return (
    <MaxWidthWrapper>
      <ProductReel
        title={
          searchParams.category
            ? `${searchParams.category} Items`
            : "Browse Trending Items"
        }
        query={{
          category: searchParams.category,
          limit: 40,
          sort: "desc",
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
