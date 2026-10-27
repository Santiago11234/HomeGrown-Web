import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — My HomeGrown",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="opacity-60 mb-10">Last updated: October 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Information We Collect</h2>
            <p className="opacity-80">
              When you create an account, we collect your name, email address, and
              username. When you list or purchase produce, we collect your general
              location (city/neighborhood), product listings, and transaction
              history. We do not collect precise GPS coordinates without your
              explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 opacity-80 space-y-2">
              <li>To operate the HomeGrown marketplace and connect buyers with sellers</li>
              <li>To process payments securely through Stripe</li>
              <li>To send you transaction confirmations and account notifications</li>
              <li>To improve the app and user experience</li>
              <li>To respond to support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Information We Share</h2>
            <p className="opacity-80">
              We do not sell your personal information. We share limited data
              with third-party service providers only as necessary to operate
              the app, including Supabase (database/auth), Stripe (payments),
              and Expo (app infrastructure). Each provider is subject to their
              own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Data Storage & Security</h2>
            <p className="opacity-80">
              Your data is stored securely using Supabase infrastructure with
              row-level security. Payment information is handled entirely by
              Stripe and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Your Rights</h2>
            <p className="opacity-80">
              You may delete your account at any time from the app&apos;s Settings
              screen. Deleting your account permanently removes your profile,
              listings, and associated data. You may also contact us at{" "}
              <a href="mailto:support@myhomegrown.app" className="underline">
                support@myhomegrown.app
              </a>{" "}
              to request a copy of your data or ask any privacy-related questions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Children&apos;s Privacy</h2>
            <p className="opacity-80">
              HomeGrown is not directed to children under 13. We do not knowingly
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Changes to This Policy</h2>
            <p className="opacity-80">
              We may update this policy from time to time. We will notify you of
              significant changes via the app or email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Contact</h2>
            <p className="opacity-80">
              For privacy questions, contact us at{" "}
              <a href="mailto:support@myhomegrown.app" className="underline">
                support@myhomegrown.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
