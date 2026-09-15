import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url")
    .eq("id", user.id)
    .single();

  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");

  return (
    <div className="flex min-h-screen flex-col bg-muted-bg lg:flex-row">
      <Sidebar
        userName={fullName || "Your Journey"}
        userEmail={user.email ?? ""}
        avatarUrl={profile?.avatar_url ?? null}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <AIChatWidget />
    </div>
  );
}
