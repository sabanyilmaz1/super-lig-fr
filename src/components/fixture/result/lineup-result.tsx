"use client";
import { CardHeaderOther } from "@/components/common/home-card-header";
import { Lineup } from "@/components/lineup/lineup";
import { Card, CardContent } from "@/components/ui/card";
import { FixturePreview } from "@/lib/football-api/types/fixture";
import { ResultPreview } from "@/lib/football-api/types/result";
import React from "react";

export const LineupResult = ({
  fixture,
}: {
  fixture: FixturePreview | ResultPreview;
}) => {
  const isOfficialLineupsAvailable = fixture.metadata?.find(
    (metadata) => metadata.type_id === 572
  )?.values.confirmed;

  const homeTeam = fixture?.participants?.find(
    (participant) => participant.meta.location === "home"
  );
  const awayTeam = fixture?.participants?.find(
    (participant) => participant.meta.location === "away"
  );

  return (
    <Card>
      <CardHeaderOther title="Composition" />
      <CardContent className="px-4 py-0">
        <div className="mt-4">
          {isOfficialLineupsAvailable && (
            <div>
              <Lineup
                lineup={fixture.lineups}
                homeTeam={{
                  id: homeTeam?.id ?? 0,
                  name: homeTeam?.name ?? "",
                  logo: homeTeam?.image_path ?? "",
                }}
                awayTeam={{
                  id: awayTeam?.id ?? 0,
                  name: awayTeam?.name ?? "",
                  logo: awayTeam?.image_path ?? "",
                }}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
