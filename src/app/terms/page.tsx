import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — My HomeGrown",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <h1 className="text-4xl font-black mb-2">Terms of Service</h1>
        <p className="opacity-60 mb-10">Last updated: October 2026</p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="opacity-80">
              By downloading or using the My HomeGrown app, you agree to these
              Terms of Service. If you do not agree, please do not use the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Use of the App</h2>
            <p className="opacity-80">
              HomeGrown is a peer-to-peer marketplace for homegrown produce and
              related items sold for local pickup. You must be at least 13 years
              old to use the app. You are responsible for all activity that
              occurs under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Listings & Transactions</h2>
            <ul className="list-disc pl-5 opacity-80 space-y-2">
              <li>Sellers are responsible for accurately describing their products</li>
              <li>All sales are final unless otherwise agreed between buyer and seller</li>
              <li>HomeGrown is not responsible for disputes between buyers and sellers</li>
              <li>Only lawful goods may be listed — no regulated, prohibited, or harmful items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Payments</h2>
            <p className="opacity-80">
              In-app payments are processed by Stripe. By making a purchase, you
              agree to Stripe&apos;s terms of service. HomeGrown collects a platform
              fee on transactions processed through Homegrown Checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. User Content</h2>
            <p className="opacity-80">
              You retain ownership of content you post. By posting, you grant
              HomeGrown a non-exclusive license to display your content within
              the app. You agree not to post content that is illegal, harmful,
              or violates others&apos; rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Community Standards</h2>
            <p className="opacity-80">
              You agree to treat other users with respect. Harassment, spam,
              hate speech, and impersonation are prohibited. We reserve the
              right to remove content or suspend accounts that violate these
              standards.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Account Termination</h2>
            <p className="opacity-80">
              You may delete your account at any time from Settings. We reserve
              the right to suspend or terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Disclaimer of Warranties</h2>
            <p className="opacity-80">
              HomeGrown is provided &quot;as is&quot; without warranty of any kind.
              We do not guarantee the quality, safety, or legality of any item
              listed in the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Limitation of Liability</h2>
            <p className="opacity-80">
              HomeGrown shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the app.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">10. Contact</h2>
            <p className="opacity-80">
              Questions about these terms? Contact us at{" "}
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
