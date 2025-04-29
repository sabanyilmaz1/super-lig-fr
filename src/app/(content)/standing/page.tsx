import { PageHeader } from "@/components/common/header-page";
import { DisplayFullStanding } from "@/components/standings/display-full-standing";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Super Lig France - Classement",
  description: "Suivez le classement de la Süper Lig",
};

export default function StandingPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Classement"
        subtitle="Suivez le classement de la Süper Lig"
      />
      <div className="container p-4 mx-auto ">
        <Suspense fallback={<SkeletonStanding />}>
          <DisplayFullStanding />
        </Suspense>
      </div>
    </div>
  );
}

const SkeletonStanding = () => {
  return (
    <Table className="max-w-7xl">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="w-5 h-4"></Skeleton>
          </TableHead>
          <TableHead>
            <Skeleton className="w-56 h-4"></Skeleton>
          </TableHead>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="w-10 h-4"></Skeleton>
            </TableHead>
          ))}
          <TableHead>
            <Skeleton className="w-24 h-4"></Skeleton>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 19 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="w-5 h-4"></Skeleton>
            </TableCell>
            <TableCell>
              <Skeleton className="w-56 h-4"></Skeleton>
            </TableCell>
            {Array.from({ length: 8 }).map((_, index) => (
              <TableCell key={index}>
                <Skeleton className="w-10 h-4"></Skeleton>
              </TableCell>
            ))}
            <TableCell>
              <Skeleton className="w-24 h-4"></Skeleton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
