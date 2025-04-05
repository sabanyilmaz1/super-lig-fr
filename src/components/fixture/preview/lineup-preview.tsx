"use client";
import { CardHeaderOther } from "@/components/common/home-card-header";
import { LegendInfo } from "@/components/common/legend-info";
import { Lineup } from "@/components/lineup/lineup";
import { Card, CardContent } from "@/components/ui/card";
import { FixturePreview } from "@/lib/football-api/types/fixture";
import React from "react";

export const LineupPreview = ({ fixture }: { fixture: FixturePreview }) => {
  console.log("fixture", fixture);
  const isOfficialLineupsAvailable = fixture.metadata?.find(
    (metadata) => metadata.type_id === 572
  )?.values.confirmed;

  const isPredictable = fixture.metadata?.find(
    (metadata) => metadata.type_id === 37072
  )?.values.predictable;

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
        {!isOfficialLineupsAvailable && (
          <div className="flex md:justify-end">
            <LegendInfo>
              Les compositions officielles ne sont pas encore disponibles.
            </LegendInfo>
          </div>
        )}
        <div className="mt-1">
          {!isOfficialLineupsAvailable && !isPredictable && (
            <div>
              <h1 className="text-sm font-bold">
                Pas de composition probable et officielle disponible
              </h1>
            </div>
          )}
          {!isOfficialLineupsAvailable && isPredictable && (
            <div>
              <h1 className="text-sm font-bold">Compositions probables</h1>
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
          {isOfficialLineupsAvailable && (
            <div>
              <h1 className="text-sm font-bold">Compositions officielles</h1>
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
