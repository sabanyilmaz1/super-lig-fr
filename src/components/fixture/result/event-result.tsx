"use client";
import { CardHeaderOther } from "@/components/common/home-card-header";
import { Card, CardContent } from "@/components/ui/card";
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
  const homeEvents = events.filter((event) => event.participant?.id === homeId);
  const awayEvents = events.filter((event) => event.participant?.id === awayId);

  return (
    <Card className="">
      <CardHeaderOther title="Résumé" />
      <CardContent className="font-normal flex items-start justify-between py-4 text-sm px-2 md:px-6">
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
      </CardContent>
    </Card>
  );
};

const EventItem = ({ event }: { event: Event }) => {
  const EventItemListComponent = {
    [EVENT_TYPE_NAME.GOAL]: EventGoalItem,
    [EVENT_TYPE_NAME.YELLOWCARD]: EventYellowCardItem,
    [EVENT_TYPE_NAME.REDCARD]: EventRedCardItem,
    [EVENT_TYPE_NAME.PENALTY]: EventPenaltyItem,
    [EVENT_TYPE_NAME.MISSED_PENALTY]: EventMissedPenaltyItem,
    [EVENT_TYPE_NAME.YELLOWREDCARD]: EventRedCardItem,
  };

  const eventType = event.type
    ?.developer_name as keyof typeof EventItemListComponent;
  const Component = EventItemListComponent[eventType];

  if (!Component) return null;

  return (
    <div className="flex items-center justify-start gap-2 text-left text-xs md:text-sm">
      <Component event={event} />
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://my.sportmonks.com/img/events/goal.svg"
        alt="yellow card"
        width={14}
        height={14}
      />
      <EventNameItem event={event} />
    </div>
  );
};

const EventYellowCardItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://my.sportmonks.com/img/events/yellowcard.svg"
        alt="yellow card"
        width={14}
        height={14}
      />
      <EventNameItem event={event} />
    </div>
  );
};

const EventRedCardItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://my.sportmonks.com/img/events/redcard.svg"
        alt="yellow card"
        width={20}
        height={20}
      />
      <EventNameItem event={event} />
    </div>
  );
};

const EventPenaltyItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://my.sportmonks.com/img/events/goal.svg"
        alt="yellow card"
        width={14}
        height={14}
      />
      <div className="flex items-center gap-1">
        <EventNameItem event={event} />
        <span className="text-[10px]">(P)</span>
      </div>
    </div>
  );
};

const EventMissedPenaltyItem = ({ event }: { event: Event }) => {
  return (
    <div className="flex items-center gap-2">
      <EventMinuteItem event={event} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://my.sportmonks.com/img/events/missed_penalty.svg"
        alt="missed penalty"
        width={12}
        height={12}
      />
      <div className="flex items-center gap-1">
        <EventNameItem event={event} />
        <span className="text-[10px]">(P)</span>
      </div>
    </div>
  );
};
