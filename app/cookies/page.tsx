import { LegalPageLayout, LegalSection } from "@/components/marketing/LegalPageLayout";

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Cookie Policy" updated="[Add date]">
      <p className="rounded-xl bg-brand-50/60 p-4 text-sm text-slate-700">
        This is placeholder content and not legal advice — please review and customize it
        (including adding a cookie-consent banner if required in your users&apos; jurisdictions,
        e.g. under GDPR) before publishing it live.
      </p>

      <LegalSection heading="1. What cookies we use">
        <p>
          BOWO uses essential cookies set by Supabase Auth to keep you signed in and to protect
          your account. These are strictly necessary for the service to function and can&apos;t
          be turned off without breaking login.
        </p>
      </LegalSection>

      <LegalSection heading="2. Analytics">
        <p>
          [If/when you add an analytics tool — e.g. Vercel Analytics, Plausible, Google Analytics
          — describe what it tracks and whether it uses cookies here. BOWO does not currently
          include a third-party analytics or advertising cookie by default.]
        </p>
      </LegalSection>

      <LegalSection heading="3. Managing cookies">
        <p>
          Most browsers let you block or delete cookies through their settings. Because our
          authentication cookies are essential, blocking them will prevent you from staying
          signed in to BOWO.
        </p>
      </LegalSection>

      <LegalSection heading="4. Contact us">
        <p>Questions about this policy can be sent to [add contact email].</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
