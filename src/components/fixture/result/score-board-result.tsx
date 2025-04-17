"use client";
import React from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ResultPreview } from "@/lib/football-api/types/result";
import { Score } from "./score";
import { cn } from "@/lib/utils";

interface ScoreBoardPreviewProps {
  fixture: ResultPreview;
}

export const ScoreBoardResult = ({ fixture }: ScoreBoardPreviewProps) => {
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

  console.log(fixture);

  return (
    <div className="rounded-b-lg md:rounded-lg md:mb-12 text-white  max-w-4xl mx-auto h-16">
      <div className="flex items-start justify-between gap-0">
        {/* Home team */}
        <div
          className={cn(
            "flex relative flex-2 items-center md:gap-4 gap-2 w-full h-16",
            "bg-red-300/60 text-black px-2 md:px-0"
          )}
        >
          <div className="md:absolute md:-left-8">
            <Image
              src={homeTeam?.image_path ?? ""}
              alt={homeTeam?.name ?? ""}
              width={64}
              height={64}
              className="md:w-[72px] md:h-[72px] w-12 h-12"
            />
          </div>
          <div>
            {!isMobile && (
              <div className="md:text-xl font-bold md:ml-12">
                {homeTeam?.name}
              </div>
            )}
            {isMobile && (
              <div className="text-sm font-bold ">
                {homeTeam?.short_code ??
                  homeTeam?.name.slice(0, 3).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        {/* Score board /hour */}
        <Score scores={fixture.scores ?? []} />
        {/* Away team */}
        <div
          className={cn(
            "flex relative flex-2 justify-end items-center  md:gap-4 gap-2 w-full h-16",
            "bg-red-300/60 text-black px-2 md:px-0"
          )}
        >
          <div className="">
            {!isMobile && (
              <div className="md:text-xl md:text-right font-bold md:mr-12">
                {awayTeam?.name}
              </div>
            )}
            {isMobile && (
              <div className="text-sm font-bold">
                {awayTeam?.short_code ??
                  awayTeam?.name.slice(0, 3).toUpperCase()}
              </div>
            )}
          </div>
          <div className="md:absolute md:-right-8">
            <Image
              src={awayTeam?.image_path ?? ""}
              alt={awayTeam?.name ?? ""}
              width={64}
              height={64}
              className="md:w-[72px] md:h-[72px] w-12 h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
