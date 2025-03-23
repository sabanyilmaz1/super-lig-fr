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

import { HomeCardHeader } from "@/components/common/home-card-header";
import {
  Standing,
  StandingDetail,
  TypeDeveloperName,
} from "@/lib/football-api/types/standing";
import Image from "next/image";
import { getStanding } from "@/use-cases/standing";

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
    team: Standing
  ): ReactNode => {
    const value = column.accessor(team);

    if (column.key === "club" && value && typeof value === "object") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={value.image || ""}
            alt={value.name || ""}
            className="w-5 h-5"
            width={20}
            height={20}
          />
          <p className="font-bold text-redsuperlig">{value.name || ""}</p>
        </div>
      );
    }

    return String(value);
  };

  return (
    <Card className="border-2 shadow-lg min-h-96 border-redsuperlig">
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
                <TableRow className="!px-4 !py-3" key={team.participant.id}>
                  {tabConfig.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {renderCellContent(column, team)}
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
