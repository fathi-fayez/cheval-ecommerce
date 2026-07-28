import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product?id=${product._id}`}
      className="group block cursor-pointer text-foreground"
    >
      <div className="overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={500}
          className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <p className="mt-3 text-sm text-muted">{product.name}</p>
      <p className="mt-1 text-sm font-medium">${product.price}</p>
    </Link>
  );
}
