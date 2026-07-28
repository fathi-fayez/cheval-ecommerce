import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
      <div className="flex flex-col border border-border sm:flex-row">
        <div className="flex w-full items-center justify-center bg-surface py-12 sm:w-1/2 sm:py-0">
          <div className="px-8 text-foreground">
            <div className="flex items-center gap-2">
              <span className="h-[2px] w-8 bg-foreground" />
              <p className="text-xs font-medium tracking-widest sm:text-sm">
                OUR BESTSELLERS
              </p>
            </div>

            <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl lg:text-[56px]">
              Latest Arrivals
            </h1>

            <Link
              href="/collection"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-widest sm:text-sm"
            >
              SHOP NOW
              <span className="h-[1.5px] w-10 bg-foreground sm:w-12" />
            </Link>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <Image
            src="/frontend_assets/hero_img.png"
            alt="Cheval latest perfume arrivals"
            width={800}
            height={900}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
