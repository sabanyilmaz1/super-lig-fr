"use client";
import { ExternalLinkIcon } from "lucide-react";
import { teams } from "@/lib/football-api/teams";
import Image from "next/image";

export const ClubsHeader = () => {
  return (
    <div className="hidden py-3 mx-auto max-w-7xl lg:block">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Club Sites</span>
          <ExternalLinkIcon className="inline-block w-4 h-4" />
        </div>
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => window.open(team.website, "_blank")}
          >
            <Image
              src={team.image_path}
              alt={team.name}
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform ease-in-out hover:scale-125"
              style={{ width: "auto", height: "auto" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
