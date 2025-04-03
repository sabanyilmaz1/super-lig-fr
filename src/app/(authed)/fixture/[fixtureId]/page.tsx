import { PageSlugHeader } from "@/components/common/header-page";
import { InjuriesPreview } from "@/components/fixture/preview/injuries-preview";
import { MatchInfoPreview } from "@/components/fixture/preview/match-info-preview";
import { ScoreBoardPreview } from "@/components/fixture/preview/score-board-preview";
import { DisplayStandingFixture } from "@/components/standings/display-standing-home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFixtureById } from "@/lib/football-api/use-cases/fixture";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FixturePage({
  params,
  searchParams,
}: {
  params: Promise<{ fixtureId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { fixtureId } = await params;
  const { p } = await searchParams;
  const fixture = await getFixtureById(fixtureId);
  if (!fixture || !fixture.participants) {
    notFound();
  }

  console.log(fixture);

  return (
    <div id={fixtureId} className="min-h-screen">
      <PageSlugHeader title={`Preview`} />
      <div className="container mx-auto px-4 pt-2">
        {/* Back button */}
        <div>
          <Link
            className="flex items-center gap-2 text-redsuperlig md:text-lg"
            href={`/${p}`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </Link>
        </div>
        {/* Desktop */}
        <div className="mt-2 hidden md:block">
          <MatchInfoPreview fixture={fixture} />
          <ScoreBoardPreview fixture={fixture} />
          {/* Onze ou dernier onze */}
          {/* Blessures */}

          <div className="flex gap-4">
            {/* Classement */}
            <div className="md:max-w-md w-full">
              <DisplayStandingFixture
                teamsIds={[
                  fixture.participants[0].id,
                  fixture.participants[1].id,
                ]}
              />
            </div>
            {/* Absences */}
            <InjuriesPreview />
          </div>
        </div>
        {/* Mobile */}
        <div className="mt-2 block md:hidden">
          <MatchInfoPreview fixture={fixture} />
          <ScoreBoardPreview fixture={fixture} />
          <Tabs defaultValue="standing" className="mt-4">
            <TabsList className="mb-2">
              <TabsTrigger value="standing">Classement</TabsTrigger>
              <TabsTrigger value="injuries">Blessures</TabsTrigger>
              <TabsTrigger value="lineup">Composition</TabsTrigger>
            </TabsList>
            <TabsContent value="standing">
              <DisplayStandingFixture
                teamsIds={[
                  fixture.participants[0].id,
                  fixture.participants[1].id,
                ]}
              />
            </TabsContent>
            <TabsContent value="injuries"></TabsContent>
            <TabsContent value="lineup"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
