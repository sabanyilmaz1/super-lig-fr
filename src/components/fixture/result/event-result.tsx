"use client";
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
    <div className="border rounded-md grid grid-cols-2 items-start max-w-2xl mx-auto py-4 text-sm">
      {/* Home Events */}
      <div className="flex flex-col items-center justify-center">
        {homeEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
      {/* Away Events */}
      <div className="flex flex-col items-center justify-center">
        {awayEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const EventItem = ({ event }: { event: Event }) => {
  return <div>{event.player?.display_name}</div>;
};
