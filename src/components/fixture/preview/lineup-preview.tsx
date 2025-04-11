"use client";
import { CardHeaderOther } from "@/components/common/home-card-header";
import { Lineup } from "@/components/lineup/lineup";
import { Card, CardContent } from "@/components/ui/card";
import { FixturePreview } from "@/lib/football-api/types/fixture";
import { Clock } from "lucide-react";
import React from "react";

export const LineupPreview = ({ fixture }: { fixture: FixturePreview }) => {
  const isOfficialLineupsAvailable = fixture.metadata?.find(
    (metadata) => metadata.type_id === 572
  )?.values.confirmed;

  const isPredictable =
    fixture.metadata?.find((metadata) => metadata.type_id === 37072)?.values
      .predictable &&
    fixture.lineups &&
    fixture.lineups?.length > 0;

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
          {!isOfficialLineupsAvailable && !isPredictable && (
            <div>
              <div className="flex flex-col items-center justify-center py-4 px-4 rounded-lg">
                <div className="mb-6 text-primary/70">
                  <Clock className="h-20 w-20" />
                </div>
                <p className="text-base text-gray-700 font-bold mb-6 text-center">
                  Les compositions seront affichées dès qu&apos;elles seront
                  disponibles
                </p>
                <div className="w-full max-w-md space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-md border">
                    <div className="mt-1 text-primary/70">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Compositions probables
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Disponibles 2-3 jours avant le match
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border">
                    <div className="mt-1 text-primary/70">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Compositions officielles
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Disponibles 40 minutes avant le match
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
