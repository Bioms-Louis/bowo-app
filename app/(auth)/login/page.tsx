"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, Cloud } from "lucide-react";
import { GoogleButton } from "@/components/auth/GoogleButton";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);
    if (signInError) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    router.push(searchParams.get("redirectTo") ?? "/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel — matches Auth.png */}
      <div className="hidden w-[420px] shrink-0 flex-col justify-between bg-gradient-to-b from-brand-700 via-brand-600 to-brand-500 px-10 py-10 text-white lg:flex">
        <div>
          <p className="text-xl font-bold">BOWO</p>
          <p className="text-xs text-brand-100">Born With Purpose</p>
          <h1 className="mt-10 text-3xl font-bold leading-tight">
            Your journey has purpose. We help you discover it.
          </h1>
          <p className="mt-4 text-sm text-brand-100">
            Document your journey, uncover patterns, and walk intentionally in the
            purpose you were created for.
          </p>
        </div>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <ShieldCheck size={16} /> Secure & private
          </li>
          <li className="flex items-center gap-2">
            <Lock size={16} /> AI-powered insights
          </li>
          <li className="flex items-center gap-2">
            <Cloud size={16} /> Purpose-driven
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center bg-muted-bg px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center justify-end text-sm">
          </div>
          <div className="rounded-2xl border border-border-subtle bg-white p-4 shadow-sm">
            <Link
            href="/"
            className="flex items-center justify-center gap-2"
            >
            <Image
              src="/image/logo.png"
              alt="BOWO — Born With Purpose"
              width={160}
              height={90}
            />
            </Link>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center">Welcome back</h2>
            <p className="mt-1 text-sm text-muted flex items-center justify-center">Sign in to continue your journey</p>

            <div className="mt-6">
              <GoogleButton next={searchParams.get("redirectTo") ?? "/dashboard"} />
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-border-subtle" />
              <span className="text-xs text-muted">or</span>
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <div className="mt-4 flex items-right justify-end">
                  <Link href="/forgot-password" className="text-xs font-medium text-brand-600">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="text-center">
                <span className="text-muted">Don&apos;t have an account?</span>
                <Link href="/signup" className="ml-1 font-small text-brand-600">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
            <p className="text-center mt-2 text-xs text-muted">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
      </div>
    </div>
  );
}
