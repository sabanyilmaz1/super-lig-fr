import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const HomeCardHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-center px-0 py-2 text-center bg-gray-200 rounded-t-md">
      <div className="flex items-center justify-between w-full gap-2 ml-4 ">
        <Skeleton className="w-10 h-10 rounded-full md:w-12 md:h-12" />
        <Skeleton className="w-24 h-4" />
        <div></div>
      </div>
    </div>
  );
};

export const BlogHomeSkeleton = () => {
  return (
    <Card className="border-2 border-gray-300 bg-gray-200 shadow-lg min-h-[400px]">
      <CardContent className="mt-6">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[700px_auto]">
          <Card className="overflow-hidden shadow-none bg-transparent !border-none">
            <CardContent className="space-y-4 !p-0">
              <Skeleton className="h-[250px] w-[95%] rounded-lg"></Skeleton>

              <div className="space-y-4 md:px-6">
                <Skeleton className="w-[70%] h-6"></Skeleton>
                <Skeleton className="w-[30%] h-4"></Skeleton>
                <Skeleton className="w-full h-20"></Skeleton>
                <Skeleton className="w-[20%] h-4"></Skeleton>
              </div>
            </CardContent>
          </Card>

          {/* Articles Récents */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="w-full h-[80px] md:h-[100px] rounded-md"></Skeleton>
                  <Skeleton className="w-[70%] h-6"></Skeleton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const StandingHomeSkeleton = () => {
  return (
    <Card className="border-2 border-gray-300 shadow-lg min-h-96">
      <HomeCardHeaderSkeleton />
      <CardContent className="p-0">
        <Table className="w-full">
          <TableHeader className=" text-[10px]">
            <TableRow>
              {Array.from({ length: 4 }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="w-10 h-4" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 19 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="w-10 h-4" />
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

export const FixtureHomeSkeleton = () => {
  return (
    <Card className="border-2 border-gray-300 shadow-lg min-h-96">
      <HomeCardHeaderSkeleton />
      <CardContent className="p-0 mt-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="mt-4">
            <Skeleton className="w-[70%] mx-auto h-7"></Skeleton>
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-4 p-3 border-b"
              >
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-10 h-10 rounded-full md:w-12 md:h-12" />
                <Skeleton className="w-24 h-4" />
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const StandingHomeStatsSkeleton = () => {
  return (
    <Card className="border-2 border-gray-300 shadow-lg min-h-96">
      <HomeCardHeaderSkeleton />
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="w-[40%] h-7"></Skeleton>
              <Card className="mt-4 bg-gray-200 h-[170px] w-full "></Card>
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-20"></Skeleton>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
