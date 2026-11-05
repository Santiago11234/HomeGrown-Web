import Link from "next/link";
import Aurora from "./components/Aurora";
import HomegrownLogo from "./components/HomegrownLogo";
import CurrentYear from "./components/CurrentYear";
import SpotlightCard from "./components/SpotlightCard";
import RotatingText from "./components/RotatingText";
import MeadowHero from "./components/MeadowHero";
import Reveal from "./components/Reveal";

const INSTAGRAM_URL = "https://www.instagram.com/myhomegrownapp";
const APP_STORE_URL = "#";

const features = [
  {
    title: "Grown by your neighbors",
    description:
      "Browse real produce — vegetables, fruit, eggs, herbs, and more — listed by people in your neighborhood.",
  },
  {
    title: "Local pickup",
    description:
      "Everything is sold for local pickup. No shipping, no middlemen. Just fresh food from someone nearby.",
  },
  {
    title: "Community built in",
    description:
      "Follow your favorite growers, join local communities, and share what's growing in your garden.",
  },
  {
    title: "Safe and secure",
    description:
      "Payments are handled by Stripe. Rate sellers after pickup to keep the community trustworthy.",
  },
];

const steps = [
  {
    title: "Find",
    body: "Browse nearby listings of fresh produce grown right in your neighborhood.",
  },
  {
    title: "Buy",
    body: "Pay securely through the app with Stripe, then coordinate a local pickup.",
  },
  {
    title: "Enjoy",
    body: "Get fresh food, leave a review, and help build a trustworthy local food community.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFF8E8", color: "#563D1F" }}>

      <MeadowHero className="min-h-[760px] sm:min-h-[820px]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <HomegrownLogo width={148} />
        <div className="flex items-center gap-6 text-sm font-semibold">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Instagram
          </a>
          <Link href="/support" className="hover:opacity-60 transition-opacity">
            Support
          </Link>
          <a
            href={APP_STORE_URL}
            className="px-5 py-2 rounded-full text-white font-bold text-sm transition-all hover:opacity-85 hover:scale-[1.02]"
            style={{ background: "#244b27" }}
          >
            Download
          </a>
        </div>
      </nav>

      {/* Hero — copy sits in the sky above the 3D meadow */}
      <section className="flex flex-col items-center text-center px-6 pt-10 sm:pt-14 pb-40">
        <Reveal className="flex flex-col items-center" distance={24}>
          <span
            className="mb-6 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] backdrop-blur-sm"
            style={{ color: "#244b27", background: "rgba(255,248,232,0.75)", border: "1px solid rgba(36,75,39,0.18)" }}
          >
            Local food, close to home
          </span>
          {/* Headline with rotating produce word */}
          <h1
            className="font-black mb-8 max-w-4xl"
            style={{ color: "#563D1F", lineHeight: 1.05 }}
          >
            <span className="text-5xl sm:text-6xl lg:text-7xl block">Fresh</span>
            <div className="flex justify-center" style={{ color: "#244b27" }}>
              <RotatingText
                texts={["tomatoes", "herbs", "basil", "honey", "garlic", "zucchini", "peaches"]}
                rotationInterval={2000}
                splitBy="characters"
                staggerDuration={0.025}
                mainClassName="text-5xl sm:text-6xl lg:text-7xl font-black"
              />
            </div>
            <span className="text-5xl sm:text-6xl lg:text-7xl block mt-1">
              from your neighbors.
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl max-w-lg mb-10 leading-relaxed"
            style={{ color: "#563D1F", opacity: 0.72 }}
          >
            My HomeGrown connects you with local growers to buy and sell
            homegrown vegetables, fruit, eggs, herbs, and more — for local pickup.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a
              href={APP_STORE_URL}
              className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base shadow-lg transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#244b27" }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M14.5 10.5c0-2.21 1.79-3.21 1.79-3.21s-1-1.79-3.5-1.79c-1.5 0-2.5.79-3.29.79S8 5.5 6.5 5.5C4.21 5.5 2 7.5 2 11c0 2.21.79 4 1.79 4 .5 0 1-.29 1.71-.29.71 0 1.5.29 2 .29s.79-.29 1.5-.29c.5 0 1 .29 1.71.29 1 0 2-1.79 2-4zM12.5 3.71C13 3 13.5 2 13.5 1c-1 0-2 .71-2.5 1.29-.5.79-1 1.71-1 2.71 1 0 1.79-.71 2.5-1.29z"
                  fill="white"
                />
              </svg>
              Download on App Store
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-bold text-base border-2 transition-all hover:opacity-70 backdrop-blur-sm"
              style={{ borderColor: "#563D1F", color: "#563D1F", background: "rgba(255,248,232,0.6)" }}
            >
              Follow on Instagram
            </a>
          </div>
        </Reveal>
      </section>
      </MeadowHero>

      {/* Features — editorial list */}
      <section className="py-24 px-6" style={{ background: "#FFF8E8" }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2
              className="text-3xl sm:text-4xl font-black mb-16"
              style={{ color: "#244b27" }}
            >
              Local food. Real community.
            </h2>
          </Reveal>

          <div>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} distance={28}>
                <div className="h-px" style={{ background: "rgba(36,75,39,0.13)" }} />
                <div className="grid grid-cols-1 sm:grid-cols-[5fr_7fr] gap-3 sm:gap-16 py-7">
                  <h3
                    className="text-base font-bold leading-snug"
                    style={{ color: "#244b27" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#563D1F", opacity: 0.72 }}
                  >
                    {f.description}
                  </p>
                </div>
              </Reveal>
            ))}
            <div className="h-px" style={{ background: "rgba(36,75,39,0.13)" }} />
          </div>
        </div>
      </section>

      {/* Steps — 3 SpotlightCards on the same cream */}
      <section className="pb-24 px-6" style={{ background: "#FFF8E8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12} className="h-full [&>*]:h-full">
              <SpotlightCard
                spotlightColor="#8FAA7C"
                intensity={0.12}
                spotlightSize={260}
                softness={0.85}
                borderGlow={0.45}
                surface="#244b27"
                border="rgba(143,170,124,0.2)"
                shadow="0 1px 2px rgba(36,75,39,0.08), 0 12px 32px -12px rgba(36,75,39,0.18)"
              >
                <h3
                  className="text-2xl font-black mb-3"
                  style={{ color: "#FFF8E8" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#FFF8E8", opacity: 0.7 }}
                >
                  {s.body}
                </p>
              </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative py-28 px-6 text-center overflow-hidden"
        style={{ background: "#244b27", color: "#FFF8E8" }}
      >
        <Aurora
          colorStops={["#1a3a1d", "#244b27", "#8FAA7C"]}
          amplitude={0.8}
          blend={0.4}
          speed={0.4}
        />
        <div className="relative z-10">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Download HomeGrown.<br />It&apos;s free.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg mb-10 max-w-md mx-auto" style={{ opacity: 0.75 }}>
              Buy and sell fresh produce with people right around the corner.
              Available now on iOS.
            </p>
          </Reveal>
          <Reveal delay={0.2} distance={24}>
          <a
            href={APP_STORE_URL}
            className="inline-block px-10 py-4 rounded-full font-bold text-base transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "#FFF8E8", color: "#244b27" }}
          >
            Download Free on iOS
          </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-xs text-center"
        style={{ background: "#FFF8E8", color: "#563D1F", opacity: 0.65 }}
      >
        <Reveal distance={16}>
        <div className="flex justify-center mb-4">
          <HomegrownLogo width={120} />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-3">
          <Link href="/privacy" className="hover:opacity-100 underline underline-offset-2">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:opacity-100 underline underline-offset-2">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:opacity-100 underline underline-offset-2">
            Support
          </Link>
          <Link href="/rsvp" className="hover:opacity-100 underline underline-offset-2">
            RSVP
          </Link>
        </div>
        <p>© <CurrentYear /> My HomeGrown. All rights reserved.</p>
        </Reveal>
      </footer>
    </div>
  );
}
