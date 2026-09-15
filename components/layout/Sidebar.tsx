"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  NotebookPen,
  Sparkles,
  ShieldCheck,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/journal", label: "Journal", icon: NotebookPen },
  { href: "/blueprint", label: "Purpose Blueprint", icon: Sparkles },
  { href: "/evidence", label: "Evidence", icon: ShieldCheck },
];

export function Sidebar({
  userName,
  userEmail,
  avatarUrl,
}: {
  userName: string;
  userEmail: string;
  avatarUrl?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the drawer automatically on navigation.
  useEffect(() => setMobileOpen(false), [pathname]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const navLinks = (
    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
      <Link
        href="/settings"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          pathname?.startsWith("/settings")
            ? "bg-brand-50 text-brand-600"
            : "text-slate-600 hover:bg-slate-50"
        )}
      >
        <Settings size={18} />
        Settings
      </Link>
    </nav>
  );

  // Small reusable avatar bubble — falls back to a generic user icon
  // when no avatar_url is set yet, so the layout never looks broken
  // for accounts that haven't uploaded a photo.
  const avatar = (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-50">
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <User size={16} className="text-brand-400" />
      )}
    </div>
  );

  const accountCard = (
    <div className="mt-auto flex items-center gap-3 rounded-lg border border-border-subtle p-3">
      {avatar}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{userName}</p>
        <p className="truncate text-xs text-muted">{userEmail}</p>
      </div>
      <button
        onClick={handleLogout}
        aria-label="Log out"
        className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      >
        <LogOut size={16} />
      </button>
    </div>
  );

  const logo = (
    <Link href="/dashboard" className="flex items-center px-1">
      <Image
        src="/image/logo.png"
        alt="BOWO — Born With Purpose"
        width={150}
        height={150}
      />
    </Link>
  );

  return (
    <>
      {/* Mobile top bar — replaces the sidebar below lg. */}
      <div className="flex items-center justify-between border-b border-border-subtle bg-white px-4 py-3 lg:hidden">
        {logo}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Desktop sidebar — unchanged, lg and up only. */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border-subtle bg-white px-4 py-6 lg:flex">
        <div className="mb-8 px-2">{logo}</div>
        {navLinks}
        {accountCard}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-900/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-white px-4 py-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between px-2">
              {logo}
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            {navLinks}
            {accountCard}
          </div>
        </div>
      )}
    </>
  );
}
