import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

import {
  CardHeaderOther,
  HomeCardHeader,
} from "@/components/common/home-card-header";
import {
  Standing,
  StandingDetail,
  TypeDeveloperName,
} from "@/lib/football-api/types/standing";
import Image from "next/image";
import { getStanding } from "@/lib/football-api/use-cases/standing";
import { cn } from "@/lib/utils";

type ColumnConfig = {
  header: string;
  className: string;
  key: string;
  accessor: (
    team: Standing
  ) => number | { name: string; image: string } | undefined;
};

const tabConfig: ColumnConfig[] = [
  {
    header: "Pos",
    className: "w-11",
    key: "position",
    accessor: (team: Standing) => team.position,
  },
  {
    header: "Club",
    className: "w-[186px]",
    key: "club",
    accessor: (team: Standing) => ({
      name: team.participant.name.slice(0, 14),
      image: team.participant.image_path,
    }),
  },
  {
    header: "J",
    className: "w-5",
    key: "matches",
    accessor: (team: Standing) =>
      team.details.find(
        (detail: StandingDetail) =>
          detail.type.developer_name === TypeDeveloperName.OVERALL_MATCHES
      )?.value,
  },
  {
    header: "Diff",
    className: "w-10",
    key: "diff",
    accessor: (team: Standing) =>
      team.details.find(
        (detail: StandingDetail) =>
          detail.type.developer_name ===
          TypeDeveloperName.OVERALL_GOAL_DIFFERENCE
      )?.value,
  },
  {
    header: "Pts",
    className: "w-10",
    key: "points",
    accessor: (team: Standing) => team.points,
  },
];

export const DisplayStandingHome = async () => {
  const standing = await getStanding();
  const renderCellContent = (
    column: ColumnConfig,
    team: Standing,
    position: number
  ): ReactNode => {
    const value = column.accessor(team);
    if (column.key === "club" && value && typeof value === "object") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={value.image || ""}
            alt={`Logo du club ${value.name}`}
            width={20}
            height={20}
            className="w-5 h-5 object-contain"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="font-bold text-redsuperlig">{value.name || ""}</p>
        </div>
      );
    }
    if (column.key === "position" && value && typeof value === "number") {
      return (
        <div
          className={cn(
            "flex items-center justify-center text-black p-1.5 rounded-md font-bold",
            position === 1 && "bg-blue-700 text-white",
            position === 2 && "bg-blue-400 text-black",
            position === 3 && "bg-red-800 text-white",
            position === 4 && "bg-amber-400 text-black",
            (position === 16 ||
              position === 17 ||
              position === 18 ||
              position === 19) &&
              "bg-red-600 text-white"
          )}
        >
          <p className="">{value}.</p>
        </div>
      );
    }
    return String(value);
  };

  return (
    <Card className="border-2 shadow-lg min-h-96 border-redsuperlig rounded-xl">
      <HomeCardHeader title="Classement" />
      <CardContent className="p-0">
        <Table className="w-full">
          <TableHeader className=" text-[10px]">
            <TableRow>
              {tabConfig.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {standing &&
              standing.map((team) => (
                <TableRow className="!px-4 md:!py-3" key={team.participant.id}>
                  {tabConfig.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(column.className, "py-2")}
                    >
                      {renderCellContent(column, team, team.position)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const DisplayStandingFixture = async ({
  teamsIds,
}: {
  teamsIds?: number[];
}) => {
  const standing = await getStanding();
  const renderCellContent = (
    column: ColumnConfig,
    team: Standing,
    position: number
  ): ReactNode => {
    const value = column.accessor(team);

    if (column.key === "club" && value && typeof value === "object") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={value.image || ""}
            alt={value.name || ""}
            width={12}
            height={12}
            className="w-5 h-5 object-contain"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="font-semibold text-redsuperlig text-sm">
            {value.name || ""}
          </p>
        </div>
      );
    }
    if (column.key === "position" && value && typeof value === "number") {
      return (
        <div
          className={cn(
            "flex items-center justify-center text-black p-1.5 rounded-md font-bold",
            position === 1 && "bg-blue-700 text-white",
            position === 2 && "bg-blue-400 text-white",
            position === 3 && "bg-red-800 text-white",
            position === 4 && "bg-amber-400 text-white",
            (position === 16 ||
              position === 17 ||
              position === 18 ||
              position === 19) &&
              "bg-red-500 text-white"
          )}
        >
          <p className="">{value}.</p>
        </div>
      );
    }
    return String(value);
  };

  return (
    <Card className="border-2 shadow-lg min-h-96 border-redsuperlig rounded-xl">
      <CardHeaderOther title="Classement" />
      <CardContent className="p-0">
        <Table className="w-full">
          <TableHeader className=" text-[10px] ">
            <TableRow>
              {tabConfig.map((column) => (
                <TableHead
                  key={column.key}
                  className={`${column.className} h-7 md:h-10`}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {standing &&
              standing.map((team) => (
                <TableRow key={team.participant.id}>
                  {tabConfig.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`${column.className} text-xs md:text-sm p-2 ${
                        teamsIds?.includes(team.participant.id)
                          ? "bg-redsuperlig/20"
                          : ""
                      }`}
                    >
                      {renderCellContent(column, team, team.position)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
