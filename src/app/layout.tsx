import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ClubsHeader } from "@/components/common/clubs-header";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

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
    "süper lig",
    "foot turquie",
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
    google: "u_16xAONsJtYXt01NKX3NG5Ausr6QOTJNIrjYGmjmHM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${montserrat.variable}`}>
          <div>
            <ClubsHeader />
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
