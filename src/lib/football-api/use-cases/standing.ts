import { FOOTBALL_SPORTMONK_API_CONSTANTS } from "@/lib/football-api/constants";
import { getDataFromFootballApi } from "@/lib/football-api/get-data";
import { PlayerStanding } from "@/lib/football-api/types/player-standing";
import { Standing } from "@/lib/football-api/types/standing";

export const getStanding = async () => {
  const standing = await getDataFromFootballApi(
    `standings/live/leagues/${FOOTBALL_SPORTMONK_API_CONSTANTS.LEAGUE_ID}`,
    "participant;details.type;form"
  );
  return standing as Standing[];
};

export const getTopScorers = async () => {
  const topScorers = await getDataFromFootballApi(
    `topscorers/seasons/${FOOTBALL_SPORTMONK_API_CONSTANTS.SEASON_ID}`,
    "participant;player&filters=seasontopscorerTypes:208"
  );
  return topScorers as PlayerStanding[];
};

export const getTopAssists = async () => {
  const topAssists = await getDataFromFootballApi(
    `topscorers/seasons/${FOOTBALL_SPORTMONK_API_CONSTANTS.SEASON_ID}`,
    "participant;player&filters=seasontopscorerTypes:209"
  );
  return topAssists as PlayerStanding[];
};
