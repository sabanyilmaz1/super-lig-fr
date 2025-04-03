import { PageHeader } from "@/components/common/header-page";
import { DisplayFixture } from "@/components/fixture/display-fixture";
import { Fixture } from "@/lib/football-api/types/fixture";
import { getLastFixtures } from "@/lib/football-api/use-cases/fixture";
import { Suspense } from "react";

export default async function FixturePage() {
  const data = await getLastFixtures();
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Calendrier en cours"
        subtitle="Suivez le calendrier en cours de la Süper Lig"
      />
      <div className="container p-4 mx-auto ">
        <RenderFixture data={data} />
      </div>
    </div>
  );
}

const RenderFixture = ({
  data,
}: {
  data: {
    groupedFixtures: Fixture[][];
    round: string;
  };
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DisplayFixture data={data} />
    </Suspense>
  );
};
