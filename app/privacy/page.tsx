import { LegalPageLayout, LegalSection } from "@/components/marketing/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="[Add date]">
      <p className="rounded-xl bg-brand-50/60 p-4 text-sm text-slate-700">
        This is placeholder content describing how BOWO&apos;s systems actually handle data. It
        is not legal advice and hasn&apos;t been reviewed by an attorney — please have it
        reviewed and customized (including jurisdiction-specific requirements like GDPR, CCPA, or
        NDPR) before publishing it live.
      </p>

      <LegalSection heading="1. What we collect">
        <p>
          When you create an account, we collect your first name, last name, and email address.
          When you use BOWO, we store the journal entries you write, the conversations you have
          with your AI companion, and the insights and Blueprint data generated from that
          content.
        </p>
        <p>
          If you sign up or log in with Google, we receive your name, email address, and profile
          photo from Google as part of that authentication process.
        </p>
      </LegalSection>

      <LegalSection heading="2. How we use your information">
        <p>
          Your journal entries and conversations are used to generate your personal insights and
          Purpose Blueprint. We do not use your private journal content to train any AI models
          beyond generating your own personalized results.
        </p>
      </LegalSection>

      <LegalSection heading="3. Who we share data with">
        <p>
          We use the following third-party service providers to operate BOWO. Each processes a
          limited slice of your data as part of delivering the service:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Supabase — hosts our database and handles authentication and password storage.</li>
          <li>
            Anthropic — processes journal content to generate AI insights and companion
            responses. Content sent to Anthropic is used to generate your response, not to train
            their models, per Anthropic&apos;s API terms.
          </li>
          <li>Web3Forms — processes messages submitted through our contact form.</li>
        </ul>
        <p>We do not sell your personal data to third parties.</p>
      </LegalSection>

      <LegalSection heading="4. Data security">
        <p>
          Your data is encrypted in transit and at rest. Access to your journal entries and
          conversations is restricted to your account only — including from our own admin
          tools, which can see aggregate usage statistics but not the content of your private
          entries.
        </p>
      </LegalSection>

      <LegalSection heading="5. Your rights">
        <p>
          You can request a copy of your data, request corrections, or request deletion of your
          account and all associated data at any time by contacting us using the details below.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact us">
        <p>Questions about this policy can be sent to [add contact email].</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
