import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "My HomeGrown — Local Produce, From Your Neighbors",
  description:
    "Buy and sell homegrown vegetables, fruit, eggs, and herbs from people in your neighborhood.",
  metadataBase: new URL("https://myhomegrown.app"),
  openGraph: {
    title: "My HomeGrown",
    description: "Local produce, from your neighbors.",
    url: "https://myhomegrown.app",
    siteName: "My HomeGrown",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-poppins)]">
        {children}
      </body>
    </html>
  );
}
