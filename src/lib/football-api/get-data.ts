import { FOOTBALL_SPORTMONK_API_CONSTANTS } from "./constants";
type ApiResponse = {
  data: unknown;
  subscription: unknown[];
  rate_limit: unknown;
  timezone: string;
};

export const getDataFromFootballApi = async (
  endpoint: string,
  include: string
) => {
  const response = await fetch(
    `${FOOTBALL_SPORTMONK_API_CONSTANTS.BASE_URL}/${endpoint}?api_token=${FOOTBALL_SPORTMONK_API_CONSTANTS.API_KEY}&include=${include}&locale=fr&timezone=Europe/Paris`
  );
  const data = (await response.json()) as ApiResponse;
  if (!data?.data) {
    return null;
  }
  return data.data;
};
