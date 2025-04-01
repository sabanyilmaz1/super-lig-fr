import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.super-lig-france.fr"),
  title: "Super Lig France - L'actualité du championnat turc de football",
  description:
    "Suivez toute l'actualité de la Super Lig turque : résultats, classements, transferts, analyses et news des clubs comme Fenerbahçe, Galatasaray et Beşiktaş.",
  keywords: [
    "super lig",
    "turkey",
    "championnat turque",
    "super lig france",
    "fenerbahce",
    "galatasaray",
    "besiktas",
    "football turc",
    "süper lig",
    "actualité football turc",
  ],
  openGraph: {
    title: "Super Lig France - L'actualité du championnat turc de football",
    description:
      "Suivez toute l'actualité de la Super Lig turque : résultats, classements, transferts, analyses et news des clubs comme Fenerbahçe, Galatasaray et Beşiktaş.",
    type: "website",
    url: "https://www.super-lig-france.fr",
    siteName: "Super Lig France",
    locale: "fr_FR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Super Lig France Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Super Lig France - L'actualité du championnat turc de football",
    description:
      "Suivez toute l'actualité de la Super Lig turque : résultats, classements, transferts, analyses et news des clubs.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Vous devrez remplacer ceci par votre code de vérification Google
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
