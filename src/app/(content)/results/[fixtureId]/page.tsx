import { PageSlugHeader } from "@/components/common/header-page";
import { MatchInfoPreview } from "@/components/fixture/preview/match-info-preview";
import { EventResult } from "@/components/fixture/result/event-result";
import { LineupResult } from "@/components/fixture/result/lineup-result";
import { ScoreBoardResult } from "@/components/fixture/result/score-board-result";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getResultById } from "@/lib/football-api/use-cases/result";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ fixtureId: string }>;
}) {
  const { fixtureId } = await params;
  const fixture = await getResultById(fixtureId);
  if (!fixture || !fixture.participants) {
    notFound();
  }
  const homeName = fixture.participants.find(
    (participant) => participant.meta.location === "home"
  )?.name;
  const awayName = fixture.participants.find(
    (participant) => participant.meta.location === "away"
  )?.name;
  return {
    title: `${homeName} - ${awayName}`,
    description: `Avant match, retrouvez les dernières informations sur le match ${homeName} - ${awayName}`,
  };
}

export default async function ResultPageByFixtureId({
  params,
  searchParams,
}: {
  params: Promise<{ fixtureId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { fixtureId } = await params;
  const { p } = await searchParams;
  const fixture = await getResultById(fixtureId);
  if (!fixture || !fixture.participants) {
    notFound();
  }

  const homeId = fixture.participants.find(
    (participant) => participant.meta.location === "home"
  )?.id;
  const awayId = fixture.participants.find(
    (participant) => participant.meta.location === "away"
  )?.id;

  return (
    <div id={fixtureId} className="min-h-screen">
      <PageSlugHeader title={`Résultat`} />
      <div className="container mx-auto px-4 pt-2 ">
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
        <div className="mt-2 ">
          <MatchInfoPreview fixture={fixture} />
          <ScoreBoardResult fixture={fixture} />
          <Tabs defaultValue="lineup" className="mt-12 md:max-w-3xl mx-auto">
            <TabsList className="mb-2">
              <TabsTrigger value="events">Résumé</TabsTrigger>
              <TabsTrigger value="score">Stats</TabsTrigger>
              <TabsTrigger value="lineup">Équipe</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="comments">Commentaires</TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <EventResult
                events={fixture.events}
                homeId={homeId}
                awayId={awayId}
              />
            </TabsContent>
            <TabsContent value="lineup">
              <LineupResult fixture={fixture} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
