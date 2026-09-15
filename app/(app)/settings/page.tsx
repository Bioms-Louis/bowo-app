import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarUploader } from "@/components/settings/AvatarUploader";
import { ProfileNameForm } from "@/components/settings/ProfileNameForm";
import { PasswordForm } from "@/components/settings/PasswordForm";
import { Mail } from "lucide-react";

export default async function SettingsPage() {
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

  return (
    <div className="mx-auto max-w-2xl p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-muted">Manage your profile and account security.</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>

          <AvatarUploader userId={user.id} initialUrl={profile?.avatar_url ?? null} />

          <div className="mt-6 border-t border-border-subtle pt-6">
            <ProfileNameForm
              userId={user.id}
              initialFirstName={profile?.first_name ?? null}
              initialLastName={profile?.last_name ?? null}
            />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email address</CardTitle>
          </CardHeader>
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3">
            <Mail size={16} className="shrink-0 text-slate-400" />
            <p className="text-sm text-slate-700">{user.email}</p>
          </div>
          <p className="mt-2 text-xs text-muted">
            Your email address is tied to your account and can&apos;t be changed.
          </p>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <PasswordForm />
        </Card>
      </div>
    </div>
  );
}
