import { requireAdmin } from "@/lib/db/admin-guard";
import Link from "next/link";
import { LayoutGrid, Users, BarChart3 } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin(); // redirects non-admins before any admin data is fetched

  return (
    <div className="flex min-h-screen bg-muted-bg">
      <aside className="w-64 shrink-0 border-r border-border-subtle bg-white px-4 py-6">
        <p className="mb-8 px-2 text-base font-bold text-brand-600">BOWO Admin</p>
        <nav className="space-y-1 text-sm font-medium text-slate-600">
          <Link href="/admin/overview" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50">
            <LayoutGrid size={18} /> Overview
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50">
            <Users size={18} /> Users
          </Link>
          <Link href="/admin/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50">
            <BarChart3 size={18} /> Analytics
          </Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
