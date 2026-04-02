import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";
import SiteShell from "@/components/site/SiteShell";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Explorers Group | Bold Outdoor Adventures and Signature Treks",
  description:
    "Editorial-style outdoor website for treks, camps, safaris, tours, and community-led adventure programs from Explorers Group."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} relative font-body antialiased`}>
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}
