"use client";
import { BallIcon } from "@/components/icon/ball";
import SubstitutionIcon from "@/components/icon/substitution";
import { YellowCardIcon } from "@/components/icon/yellow-card";
import { Badge } from "@/components/ui/badge";
import { EVENT_TYPE_NAME } from "@/lib/football-api/constants";
import { Event } from "@/lib/football-api/types/result";
import React from "react";

type EventResultProps = {
  events: Event[] | null;
  homeId: number | undefined;
  awayId: number | undefined;
};

export const EventResult = ({ events, homeId, awayId }: EventResultProps) => {
  if (!events) return null;

  console.log("events", events);
  const homeEvents = events.filter((event) => event.participant?.id === homeId);
  const awayEvents = events.filter((event) => event.participant?.id === awayId);

  console.log("homeEvents", homeEvents);
  console.log("awayEvents", awayEvents);

  return (
    <div className="border-2 border-redsuperlig font-normal rounded-md flex items-start justify-between px-10 max-w-2xl mx-auto py-4 text-sm">
      {/* Home Events */}
      <div className="space-y-1">
        {homeEvents
          .sort((a, b) => a.minute - b.minute)
          .map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
      </div>
      {/* Away Events */}
      <div className="space-y-1">
        {awayEvents
          .sort((a, b) => a.minute - b.minute)
          .map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
};

const EventItem = ({ event }: { event: Event }) => {
  const EventItemListComponent = {
    [EVENT_TYPE_NAME.GOAL]: EventGoalItem,
    [EVENT_TYPE_NAME.YELLOWCARD]: EventYellowCardItem,
    [EVENT_TYPE_NAME.REDCARD]: EventRedCardItem,
    [EVENT_TYPE_NAME.SUBSTITUTION]: EventSubstitutionItem,
    [EVENT_TYPE_NAME.VAR_CARD]: EventVarCardItem,
  };

  const Component =
    EventItemListComponent[
      event.type?.developer_name as keyof typeof EventItemListComponent
    ];

  return (
    <div className="flex items-center justify-start gap-2 text-left text-xs">
      {Component && <Component event={event} />}
    </div>
  );
};

const EventNameItem = ({ event }: { event: Event }) => {
  return <div>{event.player?.display_name}</div>;
};

const EventMinuteItem = ({ event }: { event: Event }) => {
  return <div className=" italic text-black/80 w-5">{event.minute}&apos;</div>;
};

const EventGoalItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      <BallIcon className="w-4 h-4" />
      <EventNameItem event={event} />
      <Badge
        className=" h-4 text-[10px] border-2 border-redsuperlig/45 text-redsuperlig font-semibold px-2 w-9"
        variant="outline"
      >
        {event.result}
      </Badge>
    </div>
  );
};

const EventYellowCardItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      <div className="w-4 flex justify-end">
        <YellowCardIcon />
      </div>
      <EventNameItem event={event} />
    </div>
  );
};

const EventRedCardItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      <EventNameItem event={event} />
    </div>
  );
};

const EventSubstitutionItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-end gap-2">
      <EventMinuteItem event={event} />
      <div className="w-4 flex justify-end">
        <SubstitutionIcon />
      </div>
      <EventNameItem event={event} />
      <span className="text-[10px]">({event.related_player_name})</span>
    </div>
  );
};

const EventVarCardItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventNameItem event={event} />
      <EventMinuteItem event={event} />
    </div>
  );
};
