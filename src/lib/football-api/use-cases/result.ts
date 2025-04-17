"use server";
"server-only";

import { getDataFromFootballApi } from "../get-data";
import { Fixture, Round } from "../types/fixture";
import { ResultPreview } from "../types/result";
import { getAllRounds } from "./fixture";

type ResultState = {
  message: string;
  currentRound: number;
  data: Fixture[];
};

const getResultsByDateRange = async (startDate: string, endDate: string) => {
  const results = await getDataFromFootballApi(
    `fixtures/between/${startDate}/${endDate}`,
    "participants;scores;state;venue;weatherReport;referees.referee"
  );
  return results as Fixture[];
};

export const getLastResults = async () => {
  const allRounds = await getAllRounds();
  let currentRound: Round | undefined = undefined;
  if (allRounds) {
    currentRound = allRounds.find((round) => round.is_current === true);
    if (currentRound) {
      const intRound = parseInt(currentRound?.name || "0");
      currentRound = allRounds.find(
        (round) => parseInt(round.name) === intRound - 1
      );
    }
    const currentRoundName = currentRound?.name || "";
    const startingDate = currentRound?.starting_at || "";
    const endingDate = currentRound?.ending_at || "";
    const results = await getResultsByDateRange(startingDate, endingDate);
    return {
      results: results,
      round: currentRoundName,
    };
  } else {
    return {
      results: [],
      round: "",
    };
  }
};

export const getResultsByRound = async (
  prevState: ResultState,
  formData: FormData
) => {
  const newCurrentRound = formData.get("currentRound");
  const allRounds = await getAllRounds();
  let currentRound: Round | undefined = undefined;
  if (allRounds) {
    currentRound = allRounds.find(
      (round) => parseInt(round.name) === parseInt(newCurrentRound as string)
    );
    if (currentRound) {
      const startingDate = currentRound?.starting_at || "";
      const endingDate = currentRound?.ending_at || "";
      const results = await getResultsByDateRange(startingDate, endingDate);
      return {
        message: "Matchs trouvés",
        currentRound: parseInt(newCurrentRound as string),
        data: results,
      };
    } else {
      return {
        message: "Pas de matchs trouvés",
        currentRound: parseInt(newCurrentRound as string),
        data: [],
      };
    }
  }
  return {
    message: "Pas de matchs trouvés",
    currentRound: parseInt(newCurrentRound as string),
    data: [],
  };
};

export const getResultById = async (fixtureId: string) => {
  const fixture = await getDataFromFootballApi(
    `fixtures/${fixtureId}`,
    "formations;lineups.player;sidelined.sideline.player;metadata;sidelined.sideline.team;participants;venue;state;scores"
  );
  return fixture as ResultPreview;
};
