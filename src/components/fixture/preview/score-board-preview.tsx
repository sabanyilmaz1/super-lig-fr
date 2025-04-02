import React from "react";
import { FixturePreview } from "@/lib/football-api/types/fixture";
import Image from "next/image";
import { Countdown } from "@/components/common/countdown";

interface ScoreBoardPreviewProps {
  fixture: FixturePreview;
}

export const ScoreBoardPreview = ({ fixture }: ScoreBoardPreviewProps) => {
  if (!fixture.participants) {
    return null;
  }

  const homeTeam = fixture.participants.find(
    (participant) => participant.meta.location === "home"
  );
  const awayTeam = fixture.participants.find(
    (participant) => participant.meta.location === "away"
  );

  const isNotStarted = fixture.state?.short_name === "NS";

  return (
    <div className=" rounded-lg p-3 mb-6 shadow-md bg-redsuperlig/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        {/* Home team */}
        <div className="flex items-center space-x-4">
          <Image
            src={homeTeam?.image_path ?? ""}
            alt={homeTeam?.name ?? ""}
            width={64}
            height={64}
          />
          <div>
            <div className="md:text-xl font-bold">{homeTeam?.name}</div>
            <div className="text-gray-500 text-xs md:text-base">
              {homeTeam?.short_code ?? homeTeam?.name.slice(0, 3).toUpperCase()}
            </div>
          </div>
        </div>
        {/* Score board /hour */}
        <div className="flex flex-col items-center justify-center">
          {isNotStarted && (
            <Countdown timestamp={fixture.starting_at_timestamp} />
          )}
        </div>

        {/* Away team */}
        <div className="flex items-center gap-4">
          <div className="order-2 md:order-1">
            <div className="md:text-xl font-bold md:text-right">
              {awayTeam?.name}
            </div>
            <div className="text-gray-500 text-xs md:text-base ">
              {awayTeam?.short_code ?? awayTeam?.name.slice(0, 3).toUpperCase()}
            </div>
          </div>
          <Image
            src={awayTeam?.image_path ?? ""}
            alt={awayTeam?.name ?? ""}
            width={64}
            height={64}
          />
        </div>
      </div>
    </div>
  );
};
