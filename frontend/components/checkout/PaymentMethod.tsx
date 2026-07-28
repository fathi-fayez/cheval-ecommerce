"use client";

import Image from "next/image";

export type PaymentMethodValue = "stripe" | "razorpay" | "cod";

type PaymentMethodProps = {
  value: PaymentMethodValue;
  onChange: (value: PaymentMethodValue) => void;
};

const options: {
  id: PaymentMethodValue;
  label?: string;
  logo?: { src: string; alt: string; width: number; height: number };
}[] = [
  {
    id: "stripe",
    logo: {
      src: "/frontend_assets/stripe_logo.png",
      alt: "Stripe",
      width: 55,
      height: 23,
    },
  },
  {
    id: "razorpay",
    logo: {
      src: "/frontend_assets/razorpay_logo.png",
      alt: "Razorpay",
      width: 90,
      height: 20,
    },
  },
  {
    id: "cod",
    label: "CASH ON DELIVERY",
  },
];

export default function PaymentMethod({ value, onChange }: PaymentMethodProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {options.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className="flex h-[53px] min-w-[160px] flex-1 items-center gap-3 border border-[#b3b3b3] px-3 sm:max-w-[204px]"
            aria-pressed={selected}
          >
            <span
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                selected
                  ? "border-green-600 bg-green-600"
                  : "border-[#b3b3b3] bg-background"
              }`}
            >
              {selected ? (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              ) : null}
            </span>
            {option.logo ? (
              <Image
                src={option.logo.src}
                alt={option.logo.alt}
                width={option.logo.width}
                height={option.logo.height}
                className="h-5 w-auto object-contain"
              />
            ) : (
              <span className="text-xs tracking-wide text-[#a6a6a6] uppercase sm:text-sm">
                {option.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
