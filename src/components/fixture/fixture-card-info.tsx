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

  return (
    <Link key={fixture.id} scroll={true} href={href}>
      <motion.div
        id={fixture.id.toString()}
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`
        cursor-pointer flex flex-col rounded-2xl shadow-lg hover:bg-redsuperlig/20 px-8 pb-2 pt-4
        hover:scale-105 transition-all duration-300 ease-in-out bg-gradient-to-r from-red-50 to-red-100 `}
      >
        {/* Team */}
        <div className="grid grid-cols-3 items-center md:mb-2 mb-8">
          {/* Home */}
          <div>
            <Image
              src={participantHome?.image_path || ""}
              className="w-12 h-12 "
              alt={`${participantHome?.name} logo`}
              width={48}
              height={48}
            />
            <p className="font-bold mt-4 md:text-xl">{participantHome?.name}</p>
          </div>
          <div className="flex justify-center">
            <ScoreOrHour fixture={fixture} isFixture={true} />
          </div>
          {/* Away */}
          <div className="flex flex-col items-end">
            <Image
              src={participantAway?.image_path || ""}
              className="w-12 h-12 "
              alt={`${participantAway?.name} logo`}
              width={48}
              height={48}
            />
            <p className="font-bold mt-4 md:text-xl">{participantAway?.name}</p>
          </div>
        </div>

        {/* Info Sup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0">
          <div>
            <div className="flex md:justify-start items-center gap-2">
              <WhistleIcon />
              <span className=" font-medium text-gray-600 text-xs ">
                {referee?.referee.name ?? "Pas encore désigné"}
              </span>
            </div>
          </div>
          <div className="hidden md:flex md:justify-center items-center md:gap-2 text-xs">
            {fixture.weatherreport?.temperature.evening && (
              <span className="text-gray-600">
                {Math.round(fixture.weatherreport?.temperature.evening || 0)} °C
              </span>
            )}
            {fixture.weatherreport?.icon && (
              <picture>
                <img
                  src={fixture.weatherreport?.icon || ""}
                  alt={fixture.weatherreport?.description || ""}
                  className="w-7 h-7 md:w-8 md:h-8"
                />
              </picture>
            )}
          </div>
          <div className="flex md:justify-end items-center gap-1">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-xs text-gray-600">
              {fixture.venue?.name}, {fixture.venue?.city_name}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
