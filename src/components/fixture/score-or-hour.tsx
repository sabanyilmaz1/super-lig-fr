import { LIVE_STATE, LIVE_STATE_NAME } from "@/lib/football-api/constants";
import { Fixture } from "@/lib/football-api/types/fixture";
import { cn } from "@/lib/utils";

export const ScoreOrHour = ({
  fixture,
  isFixture = false,
}: {
  fixture: Fixture;
  isFixture?: boolean;
}) => {
  const isLive = LIVE_STATE.includes(fixture.state?.developer_name ?? "");
  const matchNotStarted = fixture.state?.developer_name === "NS";

  return (
    <div>
      <div
        className={cn(
          "flex w-[70px] py-1 px-3 bg-redsuperlig justify-center font-bold text-white rounded-lg text-sm",
          isFixture && "w-[80px] md:w-[100px] text-xl md:text-2xl md:py-3 py-2"
        )}
      >
        {!matchNotStarted ? (
          <Score fixture={fixture} />
        ) : (
          fixture.starting_at?.split(" ")[1].split(":").slice(0, 2).join(":")
        )}
      </div>
      {isLive && (
        <div
          className={cn(
            "flex items-center justify-center gap-1 mt-1 font-semibold text-center text-redsuperlig text-xs"
          )}
        >
          <div className="animate-pulse">🔴</div>
          <div>
            LIVE{" "}
            <span>
              {
                LIVE_STATE_NAME[
                  fixture.state?.developer_name as keyof typeof LIVE_STATE_NAME
                ]
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Score = ({ fixture }: { fixture: Fixture }) => {
  const homeScore = fixture.scores?.find(
    (f) => f.description === "CURRENT" && f.score.participant === "home"
  );
  const awayScore = fixture.scores?.find(
    (f) => f.description === "CURRENT" && f.score.participant === "away"
  );
  return (
    <div className="font-bold">
      {homeScore?.score.goals} - {awayScore?.score.goals}
    </div>
  );
};
