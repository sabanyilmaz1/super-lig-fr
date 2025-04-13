"use client";
import React, { use, useActionState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getResultsByRound } from "@/lib/football-api/use-cases/result";
import { Fixture } from "@/lib/football-api/types/fixture";
import { FixtureCardInfo } from "./fixture-card-info";
import { FullResultSkeleton } from "./loader/full-result-skeleton";

export const DisplayFullResult = ({
  promiseResults,
}: {
  promiseResults: Promise<{
    results: Fixture[];
    round: string;
  }>;
}) => {
  const resultsData = use(promiseResults);

  //state initial
  const initialState = {
    message: "",
    currentRound: parseInt(resultsData.round),
    data: resultsData.results,
  };
  const [isPending, startTransition] = useTransition();
  const [state, formAction, pending] = useActionState(
    getResultsByRound,
    initialState
  );
  const rounds = Array.from(
    { length: parseInt(resultsData.round) },
    (_, i) => i + 1
  );

  if (pending || isPending) {
    return <FullResultSkeleton />;
  }

  return (
    <form
      className="flex flex-col items-center  md:max-w-5xl mx-auto"
      action={formAction}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-xl font-extrabold md:text-2xl text-redsuperlig">
          Journée {state.currentRound}
        </h1>
        <Select
          name="currentRound"
          value={state.currentRound.toString()}
          onValueChange={(value) => {
            const formData = new FormData();
            formData.append("currentRound", value);
            startTransition(() => {
              formAction(formData);
            });
          }}
        >
          <SelectTrigger className="md:max-w-xs w-full max-w-[200px]">
            <SelectValue placeholder="Sélectionner une journée" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {rounds.map((round) => (
                <SelectItem key={round} value={round.toString()}>
                  Journée {round}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Content */}
      <div className="flex flex-col gap-4 md:gap-6 w-full mt-8">
        {state.data.map((fixture) => (
          <FixtureCardInfo
            key={fixture.id}
            fixture={fixture}
            href={`/results/${fixture.id}?p=results`}
          />
        ))}
      </div>
    </form>
  );
};
