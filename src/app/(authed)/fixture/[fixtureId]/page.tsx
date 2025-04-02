import { PageSlugHeader } from "@/components/common/header-page";
import { MatchInfoPreview } from "@/components/fixture/preview/match-info-preview";
import { ScoreBoardPreview } from "@/components/fixture/preview/score-board-preview";
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
        <div className="mt-2">
          <MatchInfoPreview fixture={fixture} />
          <ScoreBoardPreview fixture={fixture} />
        </div>
      </div>
    </div>
  );
}
