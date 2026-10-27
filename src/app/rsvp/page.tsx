import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSVP — My HomeGrown",
};

export default function RsvpPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FFF8E8", color: "#563D1F" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <Link href="/" className="text-sm font-semibold opacity-60 hover:opacity-100 mb-8 inline-block">
          ← Back to HomeGrown
        </Link>
        <div className="text-6xl mb-6">🌱</div>
        <h1 className="text-4xl font-black mb-4">Join the waitlist</h1>
        <p className="text-lg opacity-75 mb-10 max-w-md mx-auto leading-relaxed">
          Be the first to know when HomeGrown launches in your neighborhood.
          Drop your email and we&apos;ll reach out.
        </p>

        {/* Replace this form action with your real form handler (e.g. Resend, Mailchimp, or a Supabase edge function) */}
        <form
          action="#"
          method="POST"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="flex-1 px-5 py-4 rounded-full border-2 bg-white outline-none focus:border-[#244b27] transition-colors text-[#563D1F] placeholder-[#A0845C]"
            style={{ borderColor: "#E0D3B4" }}
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-80 whitespace-nowrap"
            style={{ background: "#244b27" }}
          >
            Notify me
          </button>
        </form>

        <p className="text-sm opacity-50 mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
