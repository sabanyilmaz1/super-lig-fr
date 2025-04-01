import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Super Lig France",
  description:
    "Toutes les informations sur le championnat turque de football, la Super Lig",
  keywords: [
    "super lig",
    "turkey",
    "championnat turque",
    "super lig france",
    "fenerbahce",
    "galatasaray",
    "besiktas",
  ],
  openGraph: {
    title: "Super Lig France",
    description:
      "Toutes les informations sur le championnat turque de football, la Super Lig",
    type: "website",
    url: "https://super-lig-france.fr",
    siteName: "Super Lig France",
    images: [{ url: "https://www.super-lig-france.fr/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.variable}`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
