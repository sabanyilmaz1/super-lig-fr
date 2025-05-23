import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/_vercel/", "/private/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Baiduspider", "YandexBot"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/_vercel/", "/private/"],
      },
    ],
    sitemap: "https://www.super-lig-france.fr/sitemap.xml",
  };
}
