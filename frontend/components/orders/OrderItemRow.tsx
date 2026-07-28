"use client";

import Image from "next/image";
import { useState } from "react";
import { ORDER_STATUS_LABELS, type OrderDemoItem } from "@/lib/ordersDemo";

type OrderItemRowProps = {
  item: OrderDemoItem;
};

export default function OrderItemRow({ item }: OrderItemRowProps) {
  const [trackMessage, setTrackMessage] = useState("");

  const handleTrack = () => {
    setTrackMessage("Tracking coming soon.");
    window.setTimeout(() => setTrackMessage(""), 2500);
  };

  return (
    <div className="border-b border-[#d1d1d1] py-5 sm:py-6">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8">
        <div className="flex gap-3 sm:gap-4">
          <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface sm:h-[131px] sm:w-[114px]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="114px"
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#494949] sm:text-lg md:text-[22px]">
              {item.name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#494949] sm:mt-3 sm:gap-x-4 sm:text-base md:text-xl">
              <span className="font-light">${item.price}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Volume: {item.volumeMl}ml</span>
            </div>
            <p className="mt-2 text-sm text-[#989898] sm:mt-3 sm:text-base md:text-lg">
              <span className="text-[#3c3c3c]">Date:</span> {item.dateLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:justify-center">
          <span className="h-3 w-3 shrink-0 rounded-full bg-green-500" />
          <span className="text-sm text-[#454545] sm:text-base md:text-xl">
            {ORDER_STATUS_LABELS[item.status]}
          </span>
        </div>

        <div className="md:justify-self-end">
          <button
            type="button"
            onClick={handleTrack}
            className="h-[49px] w-full border border-[#bababa] px-6 text-sm text-[#454545] sm:w-[178px] sm:text-base md:text-xl"
          >
            Track Order
          </button>
          {trackMessage ? (
            <p className="mt-2 text-xs text-muted md:text-right" role="status">
              {trackMessage}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
