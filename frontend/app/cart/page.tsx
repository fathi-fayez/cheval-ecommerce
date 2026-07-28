"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CartItemRow from "@/components/cart/CartItemRow";
import CartTotals from "@/components/cart/CartTotals";
import Title from "@/components/ui/Title";
import {
  DEMO_CART_ITEMS,
  getCartSubtotal,
  type CartDemoItem,
} from "@/lib/cartDemo";

export default function CartPage() {
  const [items, setItems] = useState<CartDemoItem[]>(DEMO_CART_ITEMS);

  const subtotal = useMemo(() => getCartSubtotal(items), [items]);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="mb-8">
        <Title text1="YOUR" text2="CART" />
      </div>

      {items.length === 0 ? (
        <div className="border-y border-border py-16 text-center">
          <p className="text-muted">Your cart is empty.</p>
          <Link
            href="/collection"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="border-t border-border">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-end md:mt-16">
            <div className="w-full max-w-md">
              <CartTotals subtotal={subtotal} />
              <Link
                href="/place-order"
                className="mt-8 ml-auto block w-fit bg-foreground px-8 py-3.5 text-center text-sm tracking-wide text-background uppercase"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
