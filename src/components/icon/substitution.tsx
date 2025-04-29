import Image from "next/image";
import React from "react";

interface SubstitutionIconProps {
  size?: number;
  color?: string;
}

const SubstitutionIcon: React.FC<SubstitutionIconProps> = () => {
  return (
    <Image
      src="/icons/sub.svg"
      alt="Substitution"
      width={120}
      height={120}
      className="w-full h-full"
    />
  );
};

export default SubstitutionIcon;
