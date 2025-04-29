import { ParticipantWithMeta } from "./base";
import { Formation, Lineup, Metadata, Venue } from "./fixture";

export interface ResultPreview {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number | null;
  aggregate_id: number | null;
  round_id: number;
  state_id: number;
  venue_id: number;
  name: string;
  starting_at: string;
  result_info: unknown | null;
  // state: State | null;
  leg: string;
  details: unknown | null;
  length: number;
  placeholder: boolean;
  has_odds: boolean;
  has_premium_odds: boolean;
  starting_at_timestamp: number;
  lineups: Lineup[] | null;
  // sidelined: Sidelined[] | null;
  formations: Formation[] | null;
  participants: ParticipantWithMeta[] | null;
  venue: Venue | null;
  metadata: Metadata[] | null;
  scores: Score[] | null;
  events: Event[] | null;
}

export interface Score {
  description: string;
  fixture_id: number;
  id: number;
  participant_id: number;
  score: { goals: number; participant: string };
  type_id: number;
}

export interface Event {
  id: number;
  fixture_id: number;
  period_id: number;
  participant_id: number;
  type_id: number;
  section: string;
  player_id: number | null;
  related_player_id: number | null;
  player_name: string | null;
  related_player_name: string | null;
  result: string | null;
  info: string | null;
  addition: string | null;
  minute: number;
  extra_minute: number | null;
  injured: boolean | null;
  on_bench: boolean | null;
  coach_id: number | null;
  sub_type_id: number | null;
  detailed_period_id: number;
  sort_order: number;
  player: EventPlayer | null;
  participant: EventParticipant | null;
  type: EventType | null;
}

export interface EventPlayer {
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
  gender: string;
}

export interface EventParticipant {
  id: number;
  sport_id: number;
  country_id: number;
  venue_id: number;
  gender: string;
  name: string;
  short_code: string | null;
  image_path: string;
  founded: number;
  type: string;
  placeholder: boolean;
  last_played_at: string;
}

export interface EventType {
  id: number;
  name: string;
  code: string;
  developer_name: string;
  model_type: string;
  stat_group: string | null;
}
