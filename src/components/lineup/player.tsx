import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";

export const Player = ({
  imagePath,
  jerseyNumber,
  name,
  isHome,
}: {
  imagePath: string;
  jerseyNumber: number;
  name: string;
  isHome: boolean;
}) => {
  return (
    <div className="flex flex-col items-center md:items-start  ">
      <div
        className={cn(
          "relative flex items-center justify-center font-bold text-white rounded-full shadow-md w-9 h-9 md:w-10 md:h-10",
          isHome ? "bg-black" : "bg-white"
        )}
      >
        {imagePath && !imagePath.includes("placeholder") ? (
          <Image
            src={imagePath}
            alt={name}
            className="rounded-full  md:w-auto"
            width={64}
            height={64}
          />
        ) : (
          <User className="w-6 h-6 text-white" />
        )}
        <div
          className={cn(
            "absolute flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full -bottom-1 -right-1",
            isHome ? "text-gray-800 bg-white" : "text-white bg-black"
          )}
        >
          {jerseyNumber}
        </div>
      </div>
      <div className="mt-1 text-center">
        <p className=" text-[10px] min-w-16 max-w-20 md:max-w-none font-semibold text-white">
          {name}
        </p>
      </div>
    </div>
  );
};

// export const BenchPlayer = ({
//   imagePath,
//   jerseyNumber,
//   commonName,
//   isHome,
// }: {
//   imagePath: string;
//   jerseyNumber: number;
//   commonName: string;
//   isHome: boolean;
// }) => {
//   return (
//     <div
//       className={cn(
//         "relative flex items-center justify-center font-bold text-white rounded-full shadow-md w-8 h-8",
//         isHome ? "bg-black" : "bg-white"
//       )}
//     >
//       {imagePath && !imagePath.includes("placeholder") ? (
//         <img
//           src={imagePath}
//           alt={commonName}
//           className="object-cover w-full h-full rounded-full"
//         />
//       ) : (
//         <User className="w-4 h-4 text-white" />
//       )}
//       <div
//         className={cn(
//           "absolute flex items-center justify-center w-4 h-4 text-[8px] font-bold rounded-full -bottom-1 -right-1",
//           isHome ? "text-gray-800 bg-white" : "text-white bg-black"
//         )}
//       >
//         {jerseyNumber}
//       </div>
//     </div>
//   );
// };
