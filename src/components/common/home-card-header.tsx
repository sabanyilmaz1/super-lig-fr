import Image from "next/image";
import { CardHeader, CardTitle } from "../ui/card";

export const HomeCardHeader = ({ title }: { title: string }) => {
  return (
    <CardHeader className=" rounded-t-none  md:rounded-t-lg flex items-center justify-center px-0 py-2 text-center text-white bg-gradient-to-r from-red-500 to-red-700 ">
      <CardTitle className="flex items-center justify-between w-full gap-2 ">
        <Image
          src="/logo.png"
          className=" size-10 md:size-12"
          alt="logo super ligue france"
          width={48}
          height={48}
        />
        <p>{title}</p>
        <div></div>
      </CardTitle>
    </CardHeader>
  );
};
