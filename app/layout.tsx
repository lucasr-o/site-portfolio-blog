import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucas-reis.com"),
  title: "Lucas Reis — Security Engineer (AppSec)",
  description:
    "Security engineer (AppSec) and pentester. Computer Science at UFABC and coordinator of the Green Team Hacker Club.",
  keywords: [
    "AppSec",
    "security engineer",
    "penetration testing",
    "pentest",
    "Green Team",
    "UFABC",
    "Lucas Reis",
  ],
  authors: [{ name: "Lucas Reis" }],
  openGraph: {
    title: "Lucas Reis — Security Engineer (AppSec)",
    description:
      "Security engineer (AppSec) and pentester. CS at UFABC, coordinator of the Green Team Hacker Club.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Reis — Security Engineer (AppSec)",
    description:
      "Security engineer (AppSec) and pentester. CS at UFABC, coordinator of the Green Team Hacker Club.",
  },
};

export const viewport: Viewport = {
  themeColor: "#060809",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jetbrains.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
