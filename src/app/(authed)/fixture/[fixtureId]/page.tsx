import { PageSlugHeader } from "@/components/common/header-page";
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
  const { previous } = await searchParams;
  const fixture = await getFixtureById(fixtureId);

  if (!fixture || !fixture.participants) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PageSlugHeader
        title={`${fixture?.participants[0].name} - ${fixture?.participants[1].name}`}
      />
      <div className="container mx-auto p-4">
        {/* Back button */}
        <div>
          <Link
            className="flex items-center gap-2 text-redsuperlig md:text-lg"
            href={`/${previous}`}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour
          </Link>
        </div>
        <div className="mt-6">test</div>
      </div>
    </div>
  );
}
