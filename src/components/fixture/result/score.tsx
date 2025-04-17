import { Score as ScoreType } from "@/lib/football-api/types/result";
import React from "react";

const SCORE_STATE = {
  fullTime: "2ND_HALF",
  firstHalf: "1ST_HALF",
};

export const Score = ({ scores }: { scores: ScoreType[] }) => {
  const scoreFullTime = scores.filter(
    (score) => score.description === SCORE_STATE.fullTime
  );
  const scoreFullTimeScore = `${
    scoreFullTime.find((score) => score.score.participant === "home")?.score
      .goals
  } - ${
    scoreFullTime.find((score) => score.score.participant === "away")?.score
      .goals
  }`;
  const scoreFirstHalf = scores.filter(
    (score) => score.description === SCORE_STATE.firstHalf
  );
  const scoreFirstHalfScore = `${
    scoreFirstHalf.find((score) => score.score.participant === "home")?.score
      .goals
  } - ${
    scoreFirstHalf.find((score) => score.score.participant === "away")?.score
      .goals
  }`;

  console.log(scoreFullTimeScore, scoreFirstHalfScore);
  return (
    <div className=" w-full flex-2 md:flex-1 bg-redsuperlig text-white flex flex-col justify-center items-center border-r-2 border-l-2 md:border-r-4 md:border-l-4 rounded-b-3xl border-white h-24">
      <span className="font-extrabold text-3xl md:text-5xl">
        {scoreFullTimeScore}
      </span>
      <span className=" font-semibold text-xs">
        1er MT : {scoreFirstHalfScore}
      </span>
    </div>
  );
};
