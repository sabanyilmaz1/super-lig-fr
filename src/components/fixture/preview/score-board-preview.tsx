"use client";
import React from "react";
import { FixturePreview } from "@/lib/football-api/types/fixture";
import Image from "next/image";
import { Countdown } from "@/components/common/countdown";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ScoreBoardPreviewProps {
  fixture: FixturePreview;
}

export const ScoreBoardPreview = ({ fixture }: ScoreBoardPreviewProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
    <div className="rounded-b-lg md:rounded-lg p-3 md:mb-6 shadow-md bg-redsuperlig/10">
      <div className="flex items-center justify-between gap-2 md:gap-0">
        {/* Home team */}
        <div className="flex items-center md:gap-4 gap-2">
          <Image
            src={homeTeam?.image_path ?? ""}
            alt={homeTeam?.name ?? ""}
            width={64}
            height={64}
            className="md:w-16 md:h-16 w-12 h-12"
          />
          <div>
            {!isMobile && (
              <div className="md:text-xl font-bold">{homeTeam?.name}</div>
            )}
            <div className="md:text-gray-500 md:text-xs text-black font-extrabold md:font-normal">
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
        <div className="flex  items-center md:gap-4 gap-2">
          <div className="">
            {!isMobile && (
              <div className="md:text-xl md:text-right font-bold">
                {awayTeam?.name}
              </div>
            )}
            <div className="md:text-gray-500 md:text-xs text-black font-extrabold md:font-normal">
              {awayTeam?.short_code ?? awayTeam?.name.slice(0, 3).toUpperCase()}
            </div>
          </div>
          <Image
            src={awayTeam?.image_path ?? ""}
            alt={awayTeam?.name ?? ""}
            width={64}
            height={64}
            className="md:w-16 md:h-16 w-12 h-12"
          />
        </div>
      </div>
    </div>
  );
};
