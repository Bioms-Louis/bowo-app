import Link from "next/link";
import { Sparkles } from "lucide-react";
import Image from "next/image";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.2 22H1l8.1-9.3L0.7 2h7.3l5 6.3L18.9 2zm-1.2 18h1.9L6.4 4H4.4l13.3 16z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 9h3V5.5h-3C11.5 5.5 10 7 10 9.3V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.6c0-.4.3-.6.5-.6z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7.2" cy="7.8" r="1.3" />
      <rect x="6.2" y="10.5" width="2" height="7" />
      <path d="M10.8 10.5h2v1c.5-.7 1.3-1.2 2.4-1.2 2 0 3 1.3 3 3.8v3.4h-2v-3c0-1.2-.4-2-1.5-2s-1.7.8-1.7 2v3h-2v-7z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: XIcon, label: "X (Twitter)", href: "#" },
  { icon: InstagramIcon, label: "Instagram", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
];

const PRODUCT_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#blueprint", label: "Purpose Blueprint" },
  { href: "/#ai-companion", label: "AI Companion" },
];

const COMPANY_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/resources", label: "Resources" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto max-w-6xl px-8 py-16 lg:px-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/image/logo.png"
                    alt="BOWO — Born With Purpose"
                    width={160}
                    height={50}
                    className="h-auto w-40 object-contain"
                    priority
                />
            </Link>
            <p className="mt-4 max-w-[220px] text-sm text-muted">
              Document your journey, uncover meaningful patterns, and walk intentionally in your
              purpose.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle text-slate-500 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Product</p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-brand-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Company</p>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-muted hover:text-brand-600">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row">
          <p className="text-xs text-muted">© {year} BOWO. All rights reserved.</p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs text-muted hover:text-brand-600">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
