import Image from "next/image";
import type { Metadata } from "next";
import NewsletterBox from "@/components/ui/NewsletterBox";
import Title from "@/components/ui/Title";

export const metadata: Metadata = {
  title: "About Us | Cheval",
  description:
    "Learn about Cheval — a perfume atelier crafting refined fragrances for modern elegance.",
};

const reasons = [
  {
    title: "Quality Assurance:",
    text: "We meticulously select and vet each fragrance to ensure it meets our stringent quality standards.",
  },
  {
    title: "Convenience:",
    text: "With our user-friendly interface and hassle-free ordering process, shopping for scent has never been easier.",
  },
  {
    title: "Exceptional Customer Service:",
    text: "Our team of dedicated fragrance specialists is here to assist you every step of the way.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="mb-10 flex justify-center md:mb-14">
        <Title text1="ABOUT" text2="US" />
      </div>

      <section className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-12 lg:gap-16">
        <div className="relative aspect-[686/697] w-full overflow-hidden bg-surface md:w-1/2">
          <Image
            src="/frontend_assets/about_img.png"
            alt="Cheval perfume lifestyle"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col justify-center text-sm leading-[1.8] text-[#6d6d6d] md:w-1/2 sm:text-base md:text-lg">
          <p>
            Cheval was born out of a passion for olfactory craft and a desire to
            make exceptional fragrance accessible online. Our journey began with
            a simple idea: a place where customers can discover, explore, and
            wear scents that feel personal — from the comfort of home.
          </p>
          <p className="mt-6">
            Since our inception, we have worked to curate a refined selection of
            eaux de parfum, eaux de toilette, and signature compositions. From
            fresh citrus to dark woods and soft florals, every bottle is chosen
            for character, quality, and lasting presence.
          </p>
          <p className="mt-8 font-bold text-[#6d6d6d]">Our Mission</p>
          <p className="mt-4">
            Our mission at Cheval is to empower customers with choice,
            convenience, and confidence. We are dedicated to a seamless shopping
            experience that exceeds expectations — from browsing and ordering to
            delivery and beyond.
          </p>
        </div>
      </section>

      <section className="mt-16 md:mt-24">
        <div className="mb-8">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>

        <div className="grid border border-[#ababab] md:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={`px-6 py-10 sm:px-10 sm:py-14 ${
                index > 0
                  ? "border-t border-[#ababab] md:border-t-0 md:border-l"
                  : ""
              }`}
            >
              <p className="text-sm font-semibold uppercase text-[#2a2a2a] sm:text-base">
                {reason.title}
              </p>
              <p className="mt-5 text-sm leading-[1.8] text-[#6d6d6d] sm:text-base">
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
