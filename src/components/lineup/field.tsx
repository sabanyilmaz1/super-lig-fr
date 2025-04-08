import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";

const Field = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return <FieldVertical>{children}</FieldVertical>;
  }
  return <FieldHorizontal>{children}</FieldHorizontal>;
};

const FieldVertical = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full mx-auto">
      <div className="overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-green-600 to-green-800">
        <div className="relative w-full h-[450px]">
          <div className="absolute inset-0 flex flex-col">
            <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full top-1/2 left-1/2 border-opacity-30"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 bg-opacity-30"></div>
            <div className="absolute top-0 w-36 h-24 transform -translate-x-1/2 border-b-2 border-l-2 border-r-2 border-white left-1/2 border-opacity-30"></div>
            <div className="absolute bottom-0 w-36 h-24 transform -translate-x-1/2 border-t-2 border-l-2 border-r-2 border-white left-1/2 border-opacity-30"></div>
          </div>
          <div className="flex flex-col items-center justify-between h-[90%] w-full py-5 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FieldHorizontal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full px-4 mx-auto md:px-0 md:m-0">
      <div className="overflow-hidden rounded-lg shadow-xl bg-gradient-to-b from-green-600 to-green-800">
        <div className="relative w-full h-full md:h-[350px]">
          <div className="absolute inset-0 flex flex-col">
            <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full top-1/2 left-1/2 border-opacity-30"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white bg-opacity-30"></div>
            <div className="absolute left-0 top-1/2 w-20 h-48 transform -translate-y-1/2 border-t-2 border-b-2 border-r-2 border-white border-opacity-30"></div>
            <div className="absolute right-0 top-1/2 w-20 h-48 transform -translate-y-1/2 border-t-2 border-b-2 border-l-2 border-white border-opacity-30"></div>
          </div>
          <div className="flex items-center justify-between h-full w-[90%] gap-5 px-5 md:gap-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Field, FieldVertical, FieldHorizontal };
