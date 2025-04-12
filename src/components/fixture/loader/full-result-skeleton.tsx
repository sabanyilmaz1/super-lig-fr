import { Skeleton } from "@/components/ui/skeleton";

export const FullResultSkeleton = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="flex justify-between items-center gap-4 sm:gap-0">
        <Skeleton className="h-8 w-40 md:w-48" />
        <Skeleton className="h-10 w-full sm:w-[200px] md:w-[250px]" />
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col gap-4 mt-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 p-3 sm:p-4 border rounded-lg"
          >
            {/* Mobile view - stacked layout */}
            <div className="flex flex-col sm:hidden gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-6" />
                  <Skeleton className="h-5 w-6" />
                  <Skeleton className="h-5 w-6" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            {/* Desktop view - horizontal layout */}
            <div className="hidden sm:flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-5 w-8" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
