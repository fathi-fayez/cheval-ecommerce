"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { addToCart, ApiError } from "@/lib/api";
import type { Product } from "@/types/product";

type ProductInfoProps = {
  product: Product;
};

const BASE_VOLUMES = [50, 75, 100];

export default function ProductInfo({ product }: ProductInfoProps) {
  const volumes = useMemo(() => {
    const set = new Set([...BASE_VOLUMES, product.volumeMl]);
    return Array.from(set).sort((a, b) => a - b);
  }, [product.volumeMl]);

  const [selectedVolume, setSelectedVolume] = useState(product.volumeMl);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleAddToCart = async () => {
    setStatus("loading");
    setMessage("");

    try {
      await addToCart(product._id, 1);
      setStatus("success");
      setMessage("Added to cart.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to add to cart. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-medium sm:text-3xl">{product.name}</h1>

      <p className="mt-2 text-sm text-muted">
        {product.concentration} · {product.fragranceFamily} · {product.category}
      </p>

      <div className="mt-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            src={
              index < 4
                ? "/frontend_assets/star_icon.png"
                : "/frontend_assets/star_dull_icon.png"
            }
            alt=""
            width={16}
            height={16}
            className={index < 4 ? "brightness-0 saturate-100" : ""}
            style={
              index < 4
                ? {
                    filter:
                      "invert(37%) sepia(86%) saturate(1486%) hue-rotate(1deg) brightness(95%) contrast(92%)",
                  }
                : undefined
            }
          />
        ))}
        <span className="ml-1 text-sm text-muted">(122)</span>
      </div>

      <p className="mt-5 text-2xl font-medium sm:text-3xl">${product.price}</p>

      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted md:w-4/5">
        {product.description}
      </p>

      <div className="mt-8">
        <p className="mb-3 text-sm font-medium">Select Volume</p>
        <div className="flex flex-wrap gap-2">
          {volumes.map((volume) => {
            const isSelected = selectedVolume === volume;
            return (
              <button
                key={volume}
                type="button"
                onClick={() => setSelectedVolume(volume)}
                className={`min-w-14 border px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "border-accent bg-surface text-foreground"
                    : "border-border bg-surface text-foreground hover:border-muted"
                }`}
              >
                {volume}ml
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        disabled={status === "loading"}
        className="mt-8 w-fit bg-foreground px-8 py-3 text-sm tracking-wide text-background disabled:opacity-60"
      >
        {status === "loading" ? "ADDING..." : "ADD TO CART"}
      </button>

      {message ? (
        <p
          className={`mt-3 text-sm ${
            status === "error" ? "text-accent" : "text-muted"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <hr className="mt-8 border-border" />

      <div className="mt-5 space-y-1 text-sm text-muted">
        <p>100% Original product.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  );
}
