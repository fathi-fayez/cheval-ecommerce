import ProductGrid from "@/components/product/ProductGrid";
import Title from "@/components/ui/Title";
import type { Product } from "@/types/product";

type LatestCollectionProps = {
  products: Product[];
};

export default function LatestCollection({ products }: LatestCollectionProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:px-10 md:py-16">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="max-w-2xl text-xs text-muted sm:text-sm">
          Discover our newest perfume compositions — crafted for presence,
          memory, and everyday elegance.
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
