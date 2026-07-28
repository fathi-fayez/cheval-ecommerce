import ProductGrid from "@/components/product/ProductGrid";
import Title from "@/components/ui/Title";
import type { Product } from "@/types/product";

type BestSellerProps = {
  products: Product[];
};

export default function BestSeller({ products }: BestSellerProps) {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-6 sm:px-6 md:px-10">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Title text1="BEST" text2="SELLER" />
        <p className="max-w-2xl text-xs text-muted sm:text-sm">
          Our most-loved fragrances — signatures customers return to again and
          again.
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
