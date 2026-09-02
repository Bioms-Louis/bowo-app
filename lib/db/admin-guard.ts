import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the current session belongs to an admin. Call this at the
 * top of every admin Server Component / Server Action / Route Handler
 * — do not rely on middleware or client-side checks alone, since a
 * normal user must never be able to reach admin data.
 *
 * Redirects non-admins to /dashboard rather than exposing a 403 with
 * any information about admin routes.
 */
export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/dashboard");

  return { user, supabase };
}
