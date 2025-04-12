import { Fixture } from "@/lib/football-api/types/fixture";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { ScoreOrHour } from "./score-or-hour";
import { MapPin } from "lucide-react";
import WhistleIcon from "../icon/whistle";
export const FixtureCardInfo = ({
  fixture,
  href,
}: {
  fixture: Fixture;
  href: string;
}) => {
  const participantHome = fixture.participants.find(
    (item) => item.meta.location === "home"
  );
  const participantAway = fixture.participants.find(
    (item) => item.meta.location === "away"
  );

  const referee = fixture.referees?.find((referee) => referee.type_id === 6);

  console.log(fixture);
  return (
    <Link key={fixture.id} scroll={true} href={href}>
      <motion.div
        id={fixture.id.toString()}
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
        cursor-pointer flex flex-col items-center justify-between px-3 py-2 
        border-2 border-redsuperlig/30 rounded-lg 
        md:flex-row hover:bg-redsuperlig/20 
        hover:scale-105 transition-all duration-300 ease-in-out bg-redsuperlig/10`}
      >
        {/* Team & referee */}
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="flex justify-center items-center gap-4">
            <span className="justify-end hidden font-medium md:flex w-44">
              {participantHome?.name}
            </span>
            <Image
              src={participantHome?.image_path || ""}
              className="w-12 h-12 "
              alt={`${participantHome?.name} logo`}
              width={48}
              height={48}
            />
            <ScoreOrHour fixture={fixture} />
            <Image
              src={participantAway?.image_path || ""}
              className="w-12 h-12 "
              alt={`${participantAway?.name} logo`}
              width={48}
              height={48}
            />
            <span className="hidden w-40 font-medium md:flex ">
              {participantAway?.name}
            </span>
          </div>
          {/* Referee */}
          <div className="flex justify-center items-center gap-2">
            <span className=" font-medium ">
              {referee?.referee.name ?? "Pas encore désigné"}
            </span>
            <WhistleIcon />
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col items-center text-redsuperlig text-sm md:text-base">
          {/* Méteo */}
          <div className="md:self-end flex items-center gap-2">
            <span className="font-semibold text-black">
              {Math.round(fixture.weatherreport?.temperature.evening || 0)} °C
            </span>
            <picture>
              <img
                src={fixture.weatherreport?.icon || ""}
                alt={fixture.weatherreport?.description || ""}
              />
            </picture>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">
              {fixture.venue?.name}, {fixture.venue?.city_name}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
