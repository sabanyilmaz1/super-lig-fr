import { Gender, Participant } from "./base";

export interface Player {
  id: number;
  sport_id: number;
  country_id: number;
  nationality_id: number;
  city_id: number | null;
  position_id: number;
  detailed_position_id: number;
  type_id: number;
  common_name: string;
  firstname: string;
  lastname: string;
  name: string;
  display_name: string;
  image_path: string;
  height: number;
  weight: number;
  date_of_birth: string;
  gender: Gender;
}

export interface PlayerStanding {
  id: number;
  season_id: number;
  player_id: number;
  type_id: number;
  position: number;
  total: number;
  participant_id: number;
  participant: Participant;
  player: Player;
}
