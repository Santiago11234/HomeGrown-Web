import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — My HomeGrown",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <div className="text-6xl mb-6">🌿</div>
        <h1 className="text-4xl font-black mb-4">Need help?</h1>
        <p className="text-lg opacity-75 mb-10 leading-relaxed">
          We&apos;re a small team and we read every message. Reach out and
          we&apos;ll get back to you as soon as we can.
        </p>
        <a
          href="mailto:support@myhomegrown.app"
          className="inline-block px-10 py-4 rounded-full font-bold text-lg text-white transition-opacity hover:opacity-80"
          style={{ background: "#244b27" }}
        >
          Email us at support@myhomegrown.app
        </a>

        <div className="mt-16 text-left space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Common questions
          </h2>
          {[
            {
              q: "How do I delete my account?",
              a: 'Open the app → Profile tab → tap the settings icon (top right) → scroll down and tap "Delete Account".',
            },
            {
              q: "How do I report a listing or user?",
              a: "On any listing, tap the flag icon. On any profile, tap the ··· menu and choose Report User.",
            },
            {
              q: "When will the app be available on Android?",
              a: "We're iOS-first right now. Android is on our roadmap — follow us on Instagram for updates.",
            },
            {
              q: "How do payments work?",
              a: "Card payments are processed securely by Stripe. Sellers can also accept cash, Venmo, or other methods at pickup.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="rounded-2xl p-6"
              style={{ background: "#E0D3B4" }}
            >
              <p className="font-bold mb-2">{q}</p>
              <p className="opacity-75 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
