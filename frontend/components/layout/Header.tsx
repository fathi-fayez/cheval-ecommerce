"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/collection", label: "COLLECTION" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

type HeaderProps = {
  cartCount?: number;
};

export default function Header({ cartCount = 0 }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cheval_token");
    }
    setProfileOpen(false);
    setLogoutMessage("Signed out.");
    window.setTimeout(() => setLogoutMessage(""), 2500);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 md:px-10">
        <Link
          href="/"
          className="font-serif text-2xl tracking-wide sm:text-[28px]"
        >
          CHEVAL<span className="text-foreground">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm tracking-wide text-foreground"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-[1.5px] w-1/2 -translate-x-1/2 bg-foreground transition-opacity ${
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          <button type="button" aria-label="Search" className="cursor-pointer">
            <Image
              src="/frontend_assets/search_icon.png"
              alt=""
              width={20}
              height={20}
            />
          </button>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              aria-label="Account menu"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              className="cursor-pointer"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <Image
                src="/frontend_assets/profile_icon.png"
                alt=""
                width={20}
                height={20}
              />
            </button>

            {profileOpen ? (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-3 w-[180px] border border-border bg-background px-4 py-3 shadow-md"
              >
                <a
                  href="#"
                  role="menuitem"
                  className="block py-1.5 text-sm text-[#5b5b5b] hover:text-foreground"
                  onClick={(event) => {
                    event.preventDefault();
                    setProfileOpen(false);
                  }}
                >
                  My Profile
                </a>
                <Link
                  href="/orders"
                  role="menuitem"
                  className="block py-1.5 text-sm text-[#5b5b5b] hover:text-foreground"
                  onClick={() => setProfileOpen(false)}
                >
                  Orders
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className="block w-full py-1.5 text-left text-sm text-[#5b5b5b] hover:text-foreground"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>

          <Link href="/cart" aria-label="Cart" className="relative">
            <Image
              src="/frontend_assets/cart_icon.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="absolute -right-1.5 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] leading-none text-background">
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="cursor-pointer md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Image
              src="/frontend_assets/menu_icon.png"
              alt=""
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>

      {logoutMessage ? (
        <p className="pb-2 text-center text-xs text-muted" role="status">
          {logoutMessage}
        </p>
      ) : null}

      <div
        className={`fixed inset-0 z-50 bg-background transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="font-serif text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            CHEVAL.
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/frontend_assets/cross_icon.png"
              alt=""
              width={16}
              height={16}
            />
          </button>
        </div>
        <nav className="mt-8 flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/orders"
            className="text-sm tracking-widest"
            onClick={() => setMenuOpen(false)}
          >
            ORDERS
          </Link>
        </nav>
      </div>
    </header>
  );
}
