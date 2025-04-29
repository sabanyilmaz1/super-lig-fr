import { getLastFixtures } from "@/lib/football-api/use-cases/fixture";
import { getLastResults } from "@/lib/football-api/use-cases/result";
import { Fixture } from "@/lib/football-api/types/fixture";

export default async function sitemap() {
  const baseUrl = "https://www.super-lig-france.fr";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/standing`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fixture`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const fixtures = await getLastFixtures();
  const results = await getLastResults();

  const fixtureRoutes = fixtures.groupedFixtures
    .flat()
    .map((fixture: Fixture) => ({
      url: `${baseUrl}/fixture/${fixture.id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  const resultRoutes = results.results.map((fixture: Fixture) => ({
    url: `${baseUrl}/results/${fixture.id}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...fixtureRoutes, ...resultRoutes];
}
