import { Lineup as LineupType } from "@/lib/football-api/types/fixture";
export const getFormation = (players: LineupType[]) => {
  const rowNumbers = players
    .map((player) => {
      if (!player.formation_field) return null;
      const [row] = player.formation_field.split(":");
      return parseInt(row, 10);
    })
    .filter((row): row is number => row !== null && !isNaN(row));

  const rowCounts: Record<number, number> = {};
  rowNumbers.forEach((row) => {
    rowCounts[row] = (rowCounts[row] || 0) + 1;
  });

  const formation = Object.keys(rowCounts)
    .map(Number)
    .sort((a, b) => a - b)
    .filter((row) => row !== 1 || rowCounts[row] > 1)
    .map((row) => rowCounts[row])
    .join("-");

  return formation;
};
