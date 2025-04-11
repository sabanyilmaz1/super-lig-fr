"use client";
import { CardHeaderOther } from "@/components/common/home-card-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ParticipantWithMeta } from "@/lib/football-api/types/base";
import { FixturePreview, Sidelined } from "@/lib/football-api/types/fixture";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

export const InjuriesPreview = ({ fixture }: { fixture: FixturePreview }) => {
  if (!fixture.sidelined || fixture.sidelined.length === 0) {
    return (
      <Card className=" h-fit border-2 border-redsuperlig rounded-lg p-4">
        <CardHeader className="p-2">
          <CardTitle>Absences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center ">
            <div className="p-3 mb-4 rounded-full bg-yellow-50">
              <Heart size={40} className="text-yellow-600" />
            </div>
            <p className="mb-2 font-bold text-gray-800">Aucune absence</p>
            <p className="text-gray-500">
              Aucune absence n&apos;a été enregistrée pour ce match.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const idHome = fixture.participants?.find(
    (p: ParticipantWithMeta) => p.meta.location === "home"
  )?.id;

  const idAway = fixture.participants?.find(
    (p: ParticipantWithMeta) => p.meta.location === "away"
  )?.id;

  const sidelinedHome = fixture.sidelined.filter(
    (item: Sidelined) => item.participant_id === idHome
  );

  const sidelinedAway = fixture.sidelined.filter(
    (item: Sidelined) => item.participant_id === idAway
  );

  const participantHome = fixture.participants?.find((p) => p.id === idHome);

  const participantAway = fixture.participants?.find((p) => p.id === idAway);

  return (
    <Card className=" h-fit border-2 border-redsuperlig rounded-xl">
      <CardHeaderOther title="Absences" />
      <CardContent className="p-2 flex flex-col">
        <legend className=" text-[10px] md:text-xs italic font-medium md:text-end bg-gray-100 p-2 rounded-lg w-fit my-2 self-end">
          * Suspension peut etre aussi pour les joueurs non-enregistrés pour la
          saison.
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ListSidelined
              sidelined={sidelinedHome}
              participant={participantHome}
            />
          </div>
          <div>
            <ListSidelined
              sidelined={sidelinedAway}
              participant={participantAway}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ListSidelined = ({
  sidelined,
  participant,
}: {
  sidelined: Sidelined[];
  participant: ParticipantWithMeta | undefined;
}) => {
  if (sidelined.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Image
            src={participant?.image_path || ""}
            alt={participant?.name || ""}
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="text-sm md:text-base">{participant?.name}</p>
        </div>
        <hr className="w-full h-1 bg-gray-200" />
        <div className="flex flex-col items-center justify-center text-sm">
          <div className="p-3 mb-4 rounded-full bg-yellow-50">
            <Heart size={40} className="text-yellow-600" />
          </div>
          <p className="mb-2 font-bold text-gray-800">Aucune absence</p>
          <p className="text-gray-500 px-4 text-center">
            du coté de {participant?.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Image
          src={participant?.image_path || ""}
          alt={participant?.name || ""}
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="text-sm md:text-base">{participant?.name}</p>
      </div>
      <hr className="w-full h-1 bg-gray-200" />
      <ScrollArea className="md:h-[300px]">
        <div className="flex flex-col gap-3">
          {sidelined.map((item: Sidelined) => (
            <div key={item.id} className="flex items-center gap-2">
              <Image
                src={item.sideline.player.image_path}
                alt={item.sideline.player.display_name}
                width={36}
                height={36}
                className="rounded-full"
              />
              <div>
                <p className="text-sm md:text-base">
                  {item.sideline.player.display_name}
                </p>
                <span
                  className={cn(
                    "px-2 py-1 mr-2 text-[10px] md:text-xs  rounded",
                    item.sideline.category === ("injury" as string)
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  )}
                >
                  {item.sideline.category === ("injury" as string)
                    ? "Blessure"
                    : "Suspension*"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
