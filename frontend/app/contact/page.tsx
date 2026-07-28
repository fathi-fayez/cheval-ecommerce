import Image from "next/image";
import type { Metadata } from "next";
import NewsletterBox from "@/components/ui/NewsletterBox";
import Title from "@/components/ui/Title";

export const metadata: Metadata = {
  title: "Contact Us | Cheval",
  description:
    "Get in touch with Cheval — store location, contact details, and career opportunities.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="mb-10 flex justify-center md:mb-14">
        <Title text1="CONTACT" text2="US" />
      </div>

      <section className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
        <div className="relative mx-auto aspect-square w-full max-w-[598px] overflow-hidden bg-surface md:mx-0 md:w-1/2">
          <Image
            src="/frontend_assets/contact_img.png"
            alt="Cheval workspace and contact"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-lg font-semibold uppercase text-[#4e4e4e] sm:text-xl md:text-2xl">
            Our Store
          </h2>
          <div className="mt-4 space-y-1 text-sm leading-[1.8] text-[#6d6d6d] sm:text-base md:text-lg">
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
            <p className="pt-4">Tel: (415) 555-0132</p>
            <p>Email: contact@cheval.com</p>
          </div>

          <h2 className="mt-10 text-lg font-semibold uppercase text-[#4e4e4e] sm:mt-12 sm:text-xl md:text-2xl">
            Careers at Cheval
          </h2>
          <p className="mt-4 text-sm leading-[1.8] text-[#6d6d6d] sm:text-base md:text-lg">
            Learn more about our teams and job openings.
          </p>
          <button
            type="button"
            className="mt-6 border border-foreground px-8 py-3.5 text-sm text-[#303030] sm:mt-8"
          >
            Explore Jobs
          </button>
        </div>
      </section>

      <NewsletterBox />
    </div>
  );
}
