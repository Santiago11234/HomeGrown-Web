import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy — My HomeGrown",
};

const SUPPORT_EMAIL = "support@myhomegrown.app";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="opacity-80 space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const Email = () => (
  <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">
    {SUPPORT_EMAIL}
  </a>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <h1 className="text-4xl font-black mb-2">Privacy Policy</h1>
        <p className="opacity-60 mb-10">Last updated: November 2026</p>

        <div className="space-y-8 leading-relaxed">
          <Section title="1. About This Policy">
            <p>
              This Privacy Policy explains what information My HomeGrown (&quot;HomeGrown&quot;, &quot;we&quot;,
              &quot;us&quot;) collects through our mobile app and this website, how we use it, and the choices
              you have. It should be read together with our{" "}
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>
              .
            </p>
          </Section>

          <Section title="2. Information You Give Us">
            <Bullets
              items={[
                <><strong>Account details:</strong> your name, email address, and username.</>,
                <><strong>Photos:</strong> profile pictures and photos you add to listings or posts.</>,
                <><strong>Listings and activity:</strong> items you list, purchases, ratings, and reviews.</>,
                <><strong>Support requests:</strong> anything you send us when you contact support.</>,
              ]}
            />
          </Section>

          <Section title="3. Location">
            <p>
              We use your general location (city or neighborhood) to show nearby listings and to show
              other users roughly where your listings are. We do not collect your precise GPS location
              unless you give the app permission, and you can turn that permission off at any time in
              your device settings.
            </p>
          </Section>

          <Section title="4. Payment Information">
            <p>
              Payments are processed by Stripe. Card details go directly to Stripe and are never stored on
              our servers. If you sell on HomeGrown, Stripe may collect identity and bank account details
              from you to verify your identity and send payouts; that information is handled under{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stripe&apos;s Privacy Policy
              </a>
              . We receive limited information from Stripe, such as whether a payment succeeded.
            </p>
          </Section>

          <Section title="5. How We Use Your Information">
            <Bullets
              items={[
                "To run the HomeGrown marketplace and connect buyers with nearby sellers",
                "To process payments and platform fees through Stripe",
                "To send transaction confirmations and important account notices",
                "To keep HomeGrown safe, including preventing fraud and enforcing our Terms",
                "To respond to support requests",
                "To fix problems and improve the app",
              ]}
            />
          </Section>

          <Section title="6. What Other Users Can See">
            <p>
              HomeGrown is a community marketplace, so some information is visible to other users: your
              username, profile picture, listings and their photos, the general area of your listings,
              and the ratings and reviews you give and receive. Pickup details you share with another
              user, such as an address or meeting place, are visible to that user.
            </p>
          </Section>

          <Section title="7. How We Share Information">
            <p>
              We do not sell your personal information, and we do not share it for targeted advertising.
              We share information only:
            </p>
            <Bullets
              items={[
                "With service providers that help us run HomeGrown: Supabase (database, storage, and sign-in), Stripe (payments), and Expo (app infrastructure). They may only use your information to provide their services to us.",
                "When required by law, or to protect the safety, rights, or property of our users, the public, or HomeGrown.",
                "As part of a merger, acquisition, or sale of assets, in which case we will let you know before your information is subject to a different privacy policy.",
              ]}
            />
          </Section>

          <Section title="8. How Long We Keep Information">
            <p>
              We keep your information while your account is active. When you delete your account, we
              delete your profile, listings, and photos. We may keep limited records, such as transaction
              history, for as long as needed to meet legal, tax, and accounting obligations, resolve
              disputes, or prevent fraud. Reviews you left for others may remain without your name
              attached. Stripe keeps its own payment records under its policies.
            </p>
          </Section>

          <Section title="9. Security">
            <p>
              We use reasonable safeguards to protect your information, including access controls on our
              database. No method of storing or sending data is completely secure, so we cannot guarantee
              absolute security. Please use a strong password and keep it private.
            </p>
          </Section>

          <Section title="10. Your Choices and Rights">
            <Bullets
              items={[
                "You can view and edit most of your information in the app.",
                "You can delete your account at any time from Settings in the app.",
                <>You can ask us for a copy of your data, or to correct or delete it, by emailing <Email />.</>,
              ]}
            />
            <p>
              Depending on where you live (for example, California or the European Union), you may have
              additional rights under local privacy law. We will honor those requests as required by law
              and will not treat you differently for using them. We may need to verify your identity
              before acting on a request.
            </p>
          </Section>

          <Section title="11. Age Requirement">
            <p>
              HomeGrown is only for people 18 and older and is not directed to children. We do not
              knowingly collect personal information from anyone under 18. If you believe a minor has
              given us information, contact us and we will delete it.
            </p>
          </Section>

          <Section title="12. Where Information Is Processed">
            <p>
              HomeGrown and our service providers are based in the United States. If you use HomeGrown
              from outside the U.S., your information will be transferred to and processed in the U.S.
            </p>
          </Section>

          <Section title="13. This Website">
            <p>
              This website does not use advertising or tracking cookies. Like most websites, our hosting
              provider may record basic technical information, such as IP addresses and browser type, to
              deliver the site and keep it secure.
            </p>
          </Section>

          <Section title="14. Changes to This Policy">
            <p>
              We may update this policy from time to time. If we make significant changes, we will let
              you know in the app or by email before they take effect. The date at the top shows when it
              was last updated.
            </p>
          </Section>

          <Section title="15. Contact">
            <p>
              For privacy questions or requests, contact us at <Email />.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
