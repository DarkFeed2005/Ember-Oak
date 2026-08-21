import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ember & Oak — Specialty Coffee Roasters",
  description:
    "Ember & Oak — small-batch specialty coffee, roasted twice weekly and shipped within 48 hours.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23e5a95c' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M12 3c3.5 0 6 4 6 9s-2.5 9-6 9-6-4-6-9 2.5-9 6-9Z'/%3E%3Cpath d='M12 3c-1.8 2.9-2.1 5.7-.5 9 1.6 3.3 1.1 6.3-1 9'/%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
