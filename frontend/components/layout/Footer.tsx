import Link from "next/link";

const companyLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Delivery" },
  { href: "/contact", label: "Privacy policy" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr] md:gap-16 md:px-10 md:py-16">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="font-serif text-2xl tracking-wide sm:text-[28px]"
          >
            CHEVAL.
          </Link>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted md:mx-0">
            Cheval is a perfume atelier crafting refined fragrances inspired by
            motion, elegance, and the quiet power of scent. Discover signatures
            for every mood — from fresh daylight to nocturnal trail.
          </p>
        </div>

        <div className="text-center md:text-left">
          <h3 className="mb-5 text-base font-semibold tracking-wide">
            COMPANY
          </h3>
          <ul className="hidden flex-col gap-2 text-sm text-muted md:flex">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted md:hidden">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="mb-5 text-base font-semibold tracking-wide">
            GET IN TOUCH
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>+1-212-456-7890</li>
            <li>contact@cheval.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted sm:text-sm">
        Copyright 2026 © cheval.com — All Rights Reserved.
      </div>
    </footer>
  );
}
