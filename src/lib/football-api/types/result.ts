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
}

export interface Score {
  description: string;
  fixture_id: number;
  id: number;
  participant_id: number;
  score: { goals: number; participant: string };
  type_id: number;
}
