import { Lineup as LineupType } from "@/lib/football-api/types/fixture";
import React from "react";
import { getFormation } from "./get-formation";
import { Field } from "./field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Player } from "./player";
import { formatPlayerName } from "./format-name";

interface LineupProps {
  lineup: LineupType[] | null;
  homeTeam: {
    id: number;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: number;
    name: string;
    logo: string;
  };
}

export const Lineup = ({ lineup, homeTeam, awayTeam }: LineupProps) => {
  if (!lineup) {
    return null;
  }

  const homeLineup = [...lineup].filter(
    (player) => player.team_id === homeTeam.id
  );
  const awayLineup = [...lineup].filter(
    (player) => player.team_id === awayTeam.id
  );

  const homeFormation = getFormation(homeLineup).split("-").map(Number);
  const awayFormation = getFormation(awayLineup).split("-").map(Number);

  const homeGoalkeeper = homeLineup.find(
    (player) => player.formation_field === "1:1"
  );
  const awayGoalkeeper = awayLineup.find(
    (player) => player.formation_field === "1:1"
  );

  return (
    <div className="flex flex-col gap-4 my-4">
      <Tabs defaultValue="home">
        <TabsList className="mb-2">
          <TabsTrigger value="home">{homeTeam.name}</TabsTrigger>
          <TabsTrigger value="away">{awayTeam.name}</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <Field>
            <Player
              imagePath={homeGoalkeeper?.player?.image_path || ""}
              jerseyNumber={1}
              name={homeGoalkeeper?.player?.common_name || ""}
              isHome={true}
            />
            {homeFormation.map((formation, row) => {
              return (
                <div
                  className="flex flex-row-reverse justify-evenly w-full md:flex-col-reverse md:justify-evenly md:gap-2"
                  key={row}
                >
                  {Array.from({ length: formation }).map((_, colunm) => {
                    const player = homeLineup.find(
                      (p) => p.formation_field === `${row + 2}:${colunm + 1}`
                    );
                    const name = formatPlayerName(player?.player?.display_name);
                    return (
                      <div key={colunm}>
                        <Player
                          imagePath={player?.player?.image_path || ""}
                          jerseyNumber={player?.jersey_number || 0}
                          name={name || ""}
                          isHome={true}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Field>
        </TabsContent>
        <TabsContent value="away">
          <Field>
            <Player
              imagePath={awayGoalkeeper?.player?.image_path || ""}
              jerseyNumber={1}
              name={awayGoalkeeper?.player?.common_name || ""}
              isHome={false}
            />
            {awayFormation.map((formation, row) => {
              return (
                <div
                  className="flex flex-row justify-evenly w-full md:flex-col md:justify-evenly md:gap-2"
                  key={row}
                >
                  {Array.from({ length: formation }).map((_, colunm) => {
                    const player = awayLineup.find(
                      (p) => p.formation_field === `${row + 2}:${colunm + 1}`
                    );
                    const name = formatPlayerName(player?.player?.display_name);
                    return (
                      <div key={colunm}>
                        <Player
                          imagePath={player?.player?.image_path || ""}
                          jerseyNumber={player?.jersey_number || 0}
                          name={name || ""}
                          isHome={true}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Field>
        </TabsContent>
      </Tabs>
    </div>
  );
};
