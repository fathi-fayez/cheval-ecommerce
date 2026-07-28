"use client";

import Link from "next/link";
import { useState } from "react";
import OrderItemRow from "@/components/orders/OrderItemRow";
import Title from "@/components/ui/Title";
import { DEMO_ORDERS, type OrderDemoItem } from "@/lib/ordersDemo";

export default function OrdersPage() {
  const [orders] = useState<OrderDemoItem[]>(DEMO_ORDERS);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orders.length === 0 ? (
        <div className="border-y border-border py-16 text-center">
          <p className="text-muted">No orders yet.</p>
          <Link
            href="/collection"
            className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="border-t border-[#d1d1d1]">
          {orders.map((order) => (
            <OrderItemRow key={order.id} item={order} />
          ))}
        </div>
      )}
    </div>
  );
}
