import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/standing"],
      disallow: [],
    },
    sitemap: "https://super-lig-france.fr/sitemap.xml",
  };
}
