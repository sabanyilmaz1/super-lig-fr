import { ParticipantWithMeta } from "@/lib/football-api/types/base";
import { formatTimestampToFrenchDate } from "@/lib/utils";
import Image from "next/image";

export const FixtureDisplayDate = ({
  timestamp,
}: {
  timestamp: string | number;
}) => {
  return (
    <p className="text-lg font-light text-center text-redsuperligx">
      {formatTimestampToFrenchDate(timestamp)}
    </p>
  );
};

export const FixtureDisplayParticipants = ({
  participants,
  isHome,
}: {
  participants: ParticipantWithMeta[];
  isHome: boolean;
}) => {
  const participantAway = participants.find(
    (participant) => participant.meta.location === "away"
  );
  const participantHome = participants.find(
    (participant) => participant.meta.location === "home"
  );
  return (
    <div>
      {isHome && (
        <div className="flex items-center justify-start gap-2 md:w-24">
          <p className="font-extrabold uppercase text-end max-w-10 w-full">
            {participantHome?.name.slice(0, 3)}
          </p>
          <div className="flex justify-end">
            <Image
              src={participantHome?.image_path ?? ""}
              alt={participantHome?.name ?? ""}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </div>
      )}
      {!isHome && (
        <div className="flex items-center justify-end gap-2 md:w-24">
          <div className="flex items-end gap-2">
            <Image
              src={participantAway?.image_path ?? ""}
              alt={participantAway?.name ?? ""}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <p className="font-extrabold uppercase text-start max-w-10 w-full">
            {participantAway?.name.slice(0, 3)}
          </p>
        </div>
      )}
    </div>
  );
};
