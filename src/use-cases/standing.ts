import { FOOTBALL_SPORTMONK_API_CONSTANTS } from "@/lib/football-api/constants";
import { getDataFromFootballApi } from "@/lib/football-api/get-data";
import { Standing } from "@/lib/football-api/types/standing";

export const getStanding = async () => {
  const standing = await getDataFromFootballApi(
    `standings/live/leagues/${FOOTBALL_SPORTMONK_API_CONSTANTS.LEAGUE_ID}`,
    "participant;details.type;form"
  );
  return standing as Standing[];
};
