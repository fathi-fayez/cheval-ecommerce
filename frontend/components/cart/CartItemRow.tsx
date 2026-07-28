"use client";

import Image from "next/image";
import type { CartDemoItem } from "@/lib/cartDemo";

type CartItemRowProps = {
  item: CartDemoItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export default function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border py-5 sm:grid-cols-[auto_1fr_auto_auto_auto] sm:gap-6 md:gap-10">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface sm:h-[130px] sm:w-[110px]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="110px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-[#494949] sm:text-lg md:text-[22px]">
          {item.name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-4 sm:gap-4">
          <p className="text-base font-light text-[#494949] sm:text-xl md:text-2xl">
            ${item.price}
          </p>
          <span className="flex h-9 min-w-12 items-center justify-center bg-surface px-2 text-sm text-foreground sm:h-[50px] sm:min-w-[50px] sm:text-xl">
            {item.volumeMl}ml
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4 sm:hidden">
          <label className="sr-only" htmlFor={`qty-mobile-${item.id}`}>
            Quantity
          </label>
          <input
            id={`qty-mobile-${item.id}`}
            type="number"
            min={1}
            value={item.quantity}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (!Number.isNaN(next) && next >= 1) {
                onQuantityChange(item.id, next);
              }
            }}
            className="h-10 w-16 border border-border px-2 text-center text-base outline-none"
          />
          <button
            type="button"
            aria-label={`Remove ${item.name}`}
            onClick={() => onRemove(item.id)}
            className="p-1"
          >
            <Image
              src="/frontend_assets/bin_icon.png"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      <div className="hidden sm:block">
        <label className="sr-only" htmlFor={`qty-${item.id}`}>
          Quantity
        </label>
        <input
          id={`qty-${item.id}`}
          type="number"
          min={1}
          value={item.quantity}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (!Number.isNaN(next) && next >= 1) {
              onQuantityChange(item.id, next);
            }
          }}
          className="h-[50px] w-[100px] border border-border px-3 text-center text-xl font-light text-[#494949] outline-none md:w-[140px] md:text-[26px]"
        />
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.name}`}
        onClick={() => onRemove(item.id)}
        className="hidden p-2 sm:block"
      >
        <Image
          src="/frontend_assets/bin_icon.png"
          alt=""
          width={22}
          height={22}
        />
      </button>
    </div>
  );
}
