"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );

  return (
    <section className="mt-14 md:mt-20">
      <div className="flex">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`border px-5 py-3 text-sm ${
            activeTab === "description"
              ? "border-border border-b-background bg-background font-medium"
              : "border-border bg-surface text-muted"
          }`}
        >
          Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`border border-l-0 px-5 py-3 text-sm ${
            activeTab === "reviews"
              ? "border-border border-b-background bg-background font-medium"
              : "border-border bg-surface text-muted"
          }`}
        >
          Reviews (122)
        </button>
      </div>

      <div className="border border-t-0 border-border px-5 py-6 text-sm leading-relaxed text-muted sm:px-6">
        {activeTab === "description" ? (
          <div className="space-y-4">
            <p>{product.description}</p>
            <p>
              Concentration: {product.concentration}. Fragrance family:{" "}
              {product.fragranceFamily}. Bottle size: {product.volumeMl}ml.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="mb-1 font-medium text-foreground">Top notes</p>
                <p>{product.notes.top.join(", ") || "—"}</p>
              </div>
              <div>
                <p className="mb-1 font-medium text-foreground">Heart notes</p>
                <p>{product.notes.heart.join(", ") || "—"}</p>
              </div>
              <div>
                <p className="mb-1 font-medium text-foreground">Base notes</p>
                <p>{product.notes.base.join(", ") || "—"}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>
            Customer reviews are coming soon. Be the first to share how this
            fragrance wears for you.
          </p>
        )}
      </div>
    </section>
  );
}
