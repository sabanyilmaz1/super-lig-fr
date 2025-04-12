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
      <div className="flex flex-col gap-4">
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
