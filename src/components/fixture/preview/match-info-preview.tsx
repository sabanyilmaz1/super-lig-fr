import { FixturePreview } from "@/lib/football-api/types/fixture";
import { formatDateFrShort } from "@/lib/utils";
import { Calendar1Icon, ClockIcon, HouseIcon } from "lucide-react";
import React from "react";

export const MatchInfoPreview = ({ fixture }: { fixture: FixturePreview }) => {
  const hour = fixture.starting_at
    .split(" ")[1]
    .split(":")
    .slice(0, 2)
    .join(":");

  // date in format "Lun 2 Avr 2025"
  const date = formatDateFrShort(fixture.starting_at.split(" ")[0]);

  return (
    <div className="border border-redsuperlig/30 lg:w-[70%] xl:w-[50%] mx-auto rounded-t-2xl text-redsuperlig text-xs py-2 px-4 flex justify-center gap-4">
      <div className="flex items-center gap-2">
        <Calendar1Icon className="w-4 h-4" />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon className="w-4 h-4" />
        <span>Coup d&apos;envoi: {hour}</span>
      </div>
      <div className="flex items-center gap-2">
        <HouseIcon className="w-4 h-4" />
        <span>
          {fixture.venue?.name}, {fixture.venue?.city_name}
        </span>
      </div>
    </div>
  );
};
