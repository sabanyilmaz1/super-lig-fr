import React from "react";

export const LegendInfo = ({ children }: { children: React.ReactNode }) => {
  return (
    <legend className=" text-[10px] md:text-xs italic font-medium md:text-end bg-gray-100 p-2 rounded-lg w-fit my-2 self-end">
      {children}
    </legend>
  );
};
