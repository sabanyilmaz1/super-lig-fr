"use client";
import { Fixture } from "@/lib/football-api/types/fixture";
import {
  formatTimestampToFrenchDate,
  formatTimestampToTime,
} from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import { ScoreOrHour } from "./score-or-hour";
import Image from "next/image";
import Link from "next/link";

export const DisplayFixture = ({
  data,
}: {
  data: {
    groupedFixtures: Fixture[][];
    round: string;
  };
}) => {
  const dates = data.groupedFixtures.map((fixture) =>
    formatTimestampToFrenchDate(fixture[0].starting_at_timestamp)
  );

  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDate();
    const isMatchDay = dates.find((item) => {
      const dayNumber = parseInt(item.split(" ")[1]);
      return dayNumber === today;
    });

    if (!isMatchDay) {
      return dates[0];
    }
    return isMatchDay;
  });

  return (
    <div>
      <SelectDate
        dates={dates}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="flex flex-col gap-4">
        {data.groupedFixtures
          .find((fixture) =>
            fixture.some(
              (f) =>
                formatTimestampToFrenchDate(f.starting_at_timestamp) ===
                selectedDay
            )
          )
          ?.map((fixture) => {
            const participantHome = fixture.participants.find(
              (item) => item.meta.location === "home"
            );
            const participantAway = fixture.participants.find(
              (item) => item.meta.location === "away"
            );
            return (
              <Link
                key={fixture.id}
                scroll={true}
                href={`/fixture/${fixture.id}?p=fixture`}
              >
                <motion.div
                  id={fixture.id.toString()}
                  initial={{ opacity: 0, y: 1 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    cursor-pointer flex flex-col items-center justify-between p-3 
                    border-2 border-redsuperlig/30 rounded-lg 
                    md:flex-row md:p-4 hover:bg-gray-50 
                    hover:scale-105 transition-all duration-300 ease-in-out  `}
                >
                  <div className="flex items-center gap-4">
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
                  <div className="flex flex-col items-center gap-4 mt-2 md:flex-row">
                    {/* Mettre du contenu ici */}
                    {formatTimestampToTime(fixture.starting_at_timestamp)}
                  </div>
                </motion.div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

const SelectDate = ({
  dates,
  selectedDay,
  setSelectedDay,
}: {
  dates: string[];
  selectedDay: string;
  setSelectedDay: (date: string) => void;
}) => {
  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {dates.map((date) => (
        <Button
          key={date}
          variant={selectedDay === date ? "default" : "outline"}
          className={`flex-shrink-0 h-16 ${
            selectedDay === date ? "bg-redsuperlig text-white" : ""
          }`}
          onClick={() => setSelectedDay(date)}
        >
          <div>
            <div className="text-left">{date.split(" ")[0]}</div>
            <div className="text-left">
              {date.split(" ").slice(1).join(" ")}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
