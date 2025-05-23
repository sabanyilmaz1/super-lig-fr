import { FOOTBALL_SPORTMONK_API_CONSTANTS } from "../constants";
import { getDataFromFootballApi } from "../get-data";
import { Fixture, FixturePreview, Round } from "../types/fixture";

export const getAllRounds = async () => {
  const rounds = await getDataFromFootballApi(
    `rounds/seasons/${FOOTBALL_SPORTMONK_API_CONSTANTS.SEASON_ID}`,
    ""
  );
  return rounds as Round[];
};

const getFixturesByDateRange = async (startDate: string, endDate: string) => {
  const fixtures = await getDataFromFootballApi(
    `fixtures/between/${startDate}/${endDate}`,
    "participants;scores;state;venue;weatherReport;referees.referee"
  );
  return fixtures as Fixture[];
};

export const getLastFixtures = async () => {
  const allRounds = await getAllRounds();
  let currentRound: Round | undefined = undefined;
  if (allRounds) {
    currentRound = allRounds.find((round) => round.is_current === true);
    if (currentRound?.finished === true) {
      const intRound = parseInt(currentRound.name);
      currentRound = allRounds?.find(
        (round) => parseInt(round.name) === intRound + 1
      );
    }

    const currentRoundName = currentRound?.name || "";
    const startingDate = currentRound?.starting_at || "";
    const endingDate = currentRound?.ending_at || "";
    const fixtures = await getFixturesByDateRange(startingDate, endingDate);
    const groupedFixtures = fixtures?.reduce((acc: Fixture[][], fixture) => {
      const date = fixture.starting_at.split(" ")[0];
      const existingGroup = acc.find(
        (group) => group[0].starting_at.split(" ")[0] === date
      );

      if (existingGroup) {
        existingGroup.push(fixture);
      } else {
        acc.push([fixture]);
      }

      return acc;
    }, []);
    return {
      groupedFixtures: groupedFixtures,
      round: currentRoundName,
    } as {
      groupedFixtures: Fixture[][];
      round: string;
    };
  } else {
    return {
      groupedFixtures: [],
      round: "",
    };
  }
};

export const getFixtureById = async (fixtureId: string) => {
  const fixture = await getDataFromFootballApi(
    `fixtures/${fixtureId}`,
    "formations;lineups.player;sidelined.sideline.player;metadata;sidelined.sideline.team;participants;venue;state"
  );
  return fixture as FixturePreview;
};
