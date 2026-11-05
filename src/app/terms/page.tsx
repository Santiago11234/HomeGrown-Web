import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service — My HomeGrown",
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

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <h1 className="text-4xl font-black mb-2">Terms of Service</h1>
        <p className="opacity-60 mb-10">Last updated: November 2026</p>

        <div className="space-y-8 leading-relaxed">
          <Section title="1. Agreement to These Terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the My HomeGrown mobile app and
              website (together, &quot;HomeGrown&quot;, &quot;we&quot;, &quot;us&quot;). By creating an account or
              using HomeGrown, you agree to these Terms and to our{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
              . If you do not agree, do not use HomeGrown.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 18 years old to create an account or use HomeGrown. By using
              HomeGrown, you confirm that you are 18 or older and able to enter into a binding agreement.
            </p>
          </Section>

          <Section title="3. Your Account">
            <p>
              You agree to provide accurate information and keep it up to date. You are responsible for
              keeping your login credentials secure and for all activity under your account. Tell us
              right away at <Email /> if you believe your account has been accessed without permission.
            </p>
          </Section>

          <Section title="4. How HomeGrown Works">
            <p>
              HomeGrown is a peer-to-peer marketplace that lets people list, discover, and buy homegrown
              produce and related items for local pickup. HomeGrown is not the buyer or seller of any
              item. Each sale is an agreement directly between the buyer and the seller. We do not grow,
              inspect, store, handle, or deliver any item, and we do not guarantee that any listing,
              user, or transaction will meet your expectations.
            </p>
          </Section>

          <Section title="5. Seller Responsibilities">
            <p>If you list items on HomeGrown, you agree that:</p>
            <Bullets
              items={[
                "Your listings are accurate, including what the item is, how it was grown or made, its quantity, and its price.",
                "You will follow all laws that apply to you, including local cottage food, food safety, labeling, permit, and sales tax rules. These rules vary by location and it is your responsibility to know them.",
                "You will disclose common allergens and any treatments used (for example, pesticides) when relevant.",
                "You will only sell items you have the right to sell, and you will keep food safe and handled hygienically until pickup.",
                "You are responsible for reporting and paying any taxes on your sales.",
              ]}
            />
          </Section>

          <Section title="6. Prohibited Items">
            <p>You may not list or sell:</p>
            <Bullets
              items={[
                "Alcohol, tobacco, nicotine, cannabis, or other controlled substances",
                "Raw (unpasteurized) milk or other items your local law does not allow to be sold from a home",
                "Meat, poultry, or seafood that requires a license or inspection to sell where you live",
                "Live animals, medicines, supplements, or anything that makes health claims",
                "Weapons, recalled items, stolen items, or anything else that is illegal to sell",
                "Items that are spoiled, contaminated, or otherwise unsafe",
              ]}
            />
            <p>We may remove any listing at our discretion.</p>
          </Section>

          <Section title="7. Buying and Pickup">
            <Bullets
              items={[
                "Pickup details are arranged between the buyer and seller. We recommend meeting in a well-lit public place or doorstep pickup in daylight, and letting someone know your plans.",
                "Inspect items at pickup. Use your own judgment about the freshness and safety of any food before eating it.",
                "Sales are final unless the buyer and seller agree otherwise. Refunds, if any, are handled between the buyer and seller.",
              ]}
            />
          </Section>

          <Section title="8. Payments and Fees">
            <p>
              Payments in HomeGrown are processed by Stripe. By making or receiving payments, you also
              agree to Stripe&apos;s terms, including the{" "}
              <a
                href="https://stripe.com/legal/connect-account"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Stripe Connected Account Agreement
              </a>{" "}
              for sellers. Sellers may need to give Stripe identity and bank details to receive payouts.
            </p>
            <p>
              HomeGrown charges a platform fee on transactions paid through the app. The fee is shown in
              the app before you list or pay. We may change our fees with notice in the app; changes do
              not affect transactions already completed.
            </p>
          </Section>

          <Section title="9. Ratings and Reviews">
            <p>
              Ratings and reviews must reflect a real transaction and your honest experience. Do not
              offer or accept anything in exchange for a review, and do not post reviews of yourself. We
              may remove reviews that break these rules.
            </p>
          </Section>

          <Section title="10. Your Content">
            <p>
              You keep ownership of the photos, listings, reviews, and other content you post. By posting,
              you give HomeGrown a non-exclusive, worldwide, royalty-free license to host, display,
              reproduce, and adapt that content as needed to operate and improve HomeGrown. This license
              ends when you delete the content or your account, except where others have already shared
              it or we must keep it by law.
            </p>
            <p>
              You confirm that you have the rights to everything you post, including photos, and that
              your content does not break any law or anyone else&apos;s rights.
            </p>
          </Section>

          <Section title="11. Community Standards">
            <p>
              Treat other users with respect. Harassment, threats, hate speech, spam, scams, fake
              listings, and impersonation are not allowed. Do not use HomeGrown to collect other
              users&apos; personal information or to move a transaction off-platform to avoid fees.
              Do not attempt to disrupt, reverse-engineer, or access HomeGrown in unauthorized ways.
            </p>
          </Section>

          <Section title="12. Suspension and Termination">
            <p>
              You can delete your account at any time from Settings in the app. We may remove content,
              limit features, or suspend or close accounts that break these Terms, put other users at
              risk, or expose HomeGrown to legal liability. Sections 10 and 13 to 16 continue to apply
              after your account is closed.
            </p>
          </Section>

          <Section title="13. Disclaimers">
            <p>
              HomeGrown is provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any
              kind, whether express or implied, including warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not guarantee the quality, safety,
              legality, or accuracy of any item, listing, or user, and we do not guarantee that
              HomeGrown will be uninterrupted or error-free.
            </p>
          </Section>

          <Section title="14. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, HomeGrown will not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or for any loss of profits, data,
              or goodwill, arising from your use of HomeGrown, any item bought or sold, or any
              interaction with another user, including at pickup.
            </p>
            <p>
              To the fullest extent permitted by law, our total liability for any claim relating to
              HomeGrown is limited to the greater of the platform fees you paid us in the 12 months before
              the claim or $100. Some places do not allow these limits, so they may not fully apply to
              you.
            </p>
          </Section>

          <Section title="15. Disputes Between Users">
            <p>
              Disputes about an item or transaction are between the buyer and the seller. We may choose
              to help, but we are not required to. To the extent permitted by law, you release HomeGrown
              from claims arising out of disputes with other users.
            </p>
          </Section>

          <Section title="16. Indemnification">
            <p>
              You agree to defend and hold HomeGrown harmless from claims, losses, and expenses
              (including reasonable legal fees) that arise from your content, your listings or sales, your
              breach of these Terms, or your violation of any law or anyone else&apos;s rights.
            </p>
          </Section>

          <Section title="17. Apple App Store">
            <p>If you downloaded HomeGrown from Apple&apos;s App Store, the following also applies:</p>
            <Bullets
              items={[
                "These Terms are between you and HomeGrown only, not Apple. HomeGrown, not Apple, is responsible for the app and its content.",
                "Apple has no obligation to provide maintenance or support for the app.",
                "If the app fails to meet any applicable warranty, you may notify Apple and Apple may refund the purchase price (if any). Apple has no other warranty obligation for the app.",
                "HomeGrown, not Apple, is responsible for addressing any claims relating to the app, including product liability, legal or regulatory compliance, consumer protection, and intellectual property claims.",
                "You confirm that you are not located in a country subject to a U.S. government embargo and are not on any U.S. government list of prohibited or restricted parties.",
                "Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against you.",
              ]}
            />
          </Section>

          <Section title="18. Changes to These Terms">
            <p>
              We may update these Terms from time to time. If we make significant changes, we will let
              you know in the app or by email before they take effect. Continuing to use HomeGrown after
              changes take effect means you accept the updated Terms.
            </p>
          </Section>

          <Section title="19. General">
            <p>
              If any part of these Terms is found unenforceable, the rest stays in effect. Our not
              enforcing a provision is not a waiver of it. These Terms, together with our Privacy Policy,
              are the entire agreement between you and HomeGrown about using the service.
            </p>
          </Section>

          <Section title="20. Contact">
            <p>
              Questions about these Terms? Contact us at <Email />.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}
