import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { ApiError, getProduct, getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return {
      title: `${product.name} | Cheval`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product | Cheval",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product: Product;
  try {
    product = await getProduct(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    notFound();
  }

  let related: Product[] = [];
  try {
    const relatedRaw = await getProducts({
      category: product.category,
      limit: 6,
    });
    related = relatedRaw.filter((item) => item._id !== product._id).slice(0, 5);
  } catch {
    related = [];
  }

  return (
    <div className="mx-auto max-w-350 px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery
          name={product.name}
          image={product.image}
          images={product.images}
        />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
