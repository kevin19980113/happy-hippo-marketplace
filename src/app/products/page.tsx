import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";

const ProductsPage = () => {
  return (
    <MaxWidthWrapper>
      <ProductReel
        title="Browse high-quality assets"
        query={{
          limit: 40,
          sort: "desc",
        }}
      />
    </MaxWidthWrapper>
  );
};

export default ProductsPage;
