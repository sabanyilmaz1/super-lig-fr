import { Card, CardContent } from "@/components/ui/card";

import {
  FixtureDisplayDate,
  FixtureDisplayParticipants,
} from "@/components/fixture/fixture-components";
import { HomeCardHeader } from "@/components/common/home-card-header";
import { ScoreOrHour } from "@/components/fixture/score-or-hour";
import { getLastFixtures } from "@/lib/football-api/use-cases/fixture";
import Link from "next/link";

export const DisplayFixtureHome = async () => {
  const data = await getLastFixtures();

  return (
    <Card className="border-2 shadow-lg min-h-96 border-redsuperlig rounded-t-none  md:rounded-t-lg">
      <HomeCardHeader title={`Journée ${data.round}`} />
      <CardContent className="p-0 mt-4">
        {data.groupedFixtures.map((fixtures) => {
          return (
            <div className="mt-4" key={fixtures[0].id}>
              <FixtureDisplayDate
                timestamp={fixtures[0].starting_at_timestamp}
              />
              <div className="grid gap-4">
                {fixtures.map((fixture) => (
                  <div
                    key={fixture.id}
                    className="flex items-start justify-center gap-4 p-3 border-b"
                  >
                    <FixtureDisplayParticipants
                      participants={fixture.participants}
                      isHome={true}
                    />
                    <Link scroll={false} href={`/fixture/${fixture.id}?p=home`}>
                      <ScoreOrHour fixture={fixture} />
                    </Link>
                    <FixtureDisplayParticipants
                      participants={fixture.participants}
                      isHome={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
