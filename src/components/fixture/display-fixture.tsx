"use client";
import { Fixture } from "@/lib/football-api/types/fixture";
import { formatTimestampToFrenchDate } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { FixtureCardInfo } from "./fixture-card-info";

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
      <div className="flex flex-col md:gap-4 gap-6 md:max-w-4xl">
        {data.groupedFixtures
          .find((fixture) =>
            fixture.some(
              (f) =>
                formatTimestampToFrenchDate(f.starting_at_timestamp) ===
                selectedDay
            )
          )
          ?.map((fixture) => (
            <FixtureCardInfo
              key={fixture.id}
              fixture={fixture}
              href={`/fixture/${fixture.id}?p=fixture`}
            />
          ))}
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
  const year = new Date().getFullYear();

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {dates.map((date) => (
        <Button
          key={date}
          variant={selectedDay === date ? "default" : "outline"}
          className={` h-full hover:bg-red-700/80 hover:text-white ${
            selectedDay === date ? "bg-red-700 text-white" : ""
          }`}
          onClick={() => setSelectedDay(date)}
        >
          <div className="flex flex-col items-center rounded-xl min-w-[80px] text-xs md:text-sm">
            <div>{date.split(" ")[0]}</div>
            <div className=" text-sm md:text-xl">{date.split(" ")[1]}</div>
            <div>
              {date.split(" ")[2]} {year}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};
