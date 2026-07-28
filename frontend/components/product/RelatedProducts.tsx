import ProductGrid from "@/components/product/ProductGrid";
import Title from "@/components/ui/Title";
import type { Product } from "@/types/product";

type RelatedProductsProps = {
  products: Product[];
};

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
