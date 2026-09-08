"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#about", label: "About" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#contact", label: "Contact" },
  { href: "/resources", label: "Resources" },
];

export function MarketingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="relative z-50 px-8 py-5 bg-background lg:px-16">
      <style>{`
        @media (min-width: 1024px) {
          .bowo-mobile-toggle,
          .bowo-mobile-menu {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex items-center justify-between">
        <Link
            href="/"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
        <Image
          src="/image/logo.png"
          alt="BOWO — Born With Purpose"
          width={160}
          height={50}
          className="h-auto w-40 object-contain"
          priority
        />
      </Link>

        {/* Main nav */}
      <nav className="hidden items-center gap-10 lg:flex">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className={
              i === 0
                ? "border-b-2 border-brand-500 pb-1 text-sm font-medium text-brand-600"
                : "text-sm font-medium text-slate-600 hover:text-slate-900"
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden flex items-center gap-5 lg:flex">
        <Link href="/login" className="text-sm font-medium text-slate-700">
          Log in
        </Link>
        <Link href="/signup">
          <Button size="lg" className="rounded-full">Start Your Journey</Button>
        </Link>
      </div>

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="bowo-mobile-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="bowo-mobile-menu sticky inset-x-0 bottom-0 top-[100px] z-40 overflow-y-auto bg-brand-50 px-8 py-6 rounded-lg lg:hidden"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={
                  i === 0
                    ? "rounded-full bg-brand-50 px-3 py-3 text-base font-medium text-brand-600"
                    : "rounded-full px-3 py-3 text-base font-medium text-slate-600 hover:bg-slate-50"
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-border-subtle pt-4">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="rounded-full px-3 py-3 text-center text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Log in
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button size="lg" className="w-full rounded-full">
                Start Your Journey
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
