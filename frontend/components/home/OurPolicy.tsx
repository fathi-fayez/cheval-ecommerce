import Image from "next/image";

const policies = [
  {
    icon: "/frontend_assets/exchange_icon.png",
    title: "Easy Exchange Policy",
    text: "We offer hassle-free fragrance exchanges within 7 days.",
  },
  {
    icon: "/frontend_assets/quality_icon.png",
    title: "7 Days Return Policy",
    text: "Return unopened bottles within 7 days for a full refund.",
  },
  {
    icon: "/frontend_assets/support_img.png",
    title: "Best Customer Support",
    text: "Our fragrance specialists are available 24/7 to help you.",
  },
];

export default function OurPolicy() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-3 md:gap-8 md:px-10 md:py-20">
      {policies.map((policy) => (
        <div key={policy.title} className="text-center">
          <Image
            src={policy.icon}
            alt=""
            width={48}
            height={48}
            className="mx-auto mb-4 h-12 w-12 object-contain"
          />
          <p className="text-sm font-semibold sm:text-base">{policy.title}</p>
          <p className="mt-2 text-xs text-muted sm:text-sm">{policy.text}</p>
        </div>
      ))}
    </section>
  );
}
