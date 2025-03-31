"use client";
import Image from "next/image";
import { Activity, BarChart3, Star } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { teams } from "@/lib/football-api/teams";
import logo from "../../public/logo.png";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#E20613] to-[#1C1C1C] overflow-hidden">
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-4 pb-20 sm:pt-24 sm:pb-24 lg:pb-32 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center md:hidden">
            <Image
              src={logo}
              alt="super lig logo"
              placeholder="blur"
              className="max-w-32 h-auto"
            />
          </div>
          <div className="hidden md:block">
            <Caroussel />
          </div>
          <h1 className="mb-4 text-xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Vivez la passion de la Super Lig
          </h1>
          <p className="max-w-3xl mx-auto mb-8 text-base text-blue-100 sm:text-2xl">
            Plongez au cœur du football turc avec des analyses approfondies, des
            statistiques en direct et une communauté passionnée.
          </p>

          {/* Nouvelle section de fonctionnalités principales */}
          <div className="grid max-w-3xl grid-cols-1 gap-8 mx-auto mb-12 sm:grid-cols-3">
            <Feature Icon={Activity} title="Scores en direct" />
            <Feature Icon={Star} title="Notes de joueurs" />
            <Feature Icon={BarChart3} title="Analyses détaillées" />
          </div>

          <div className="flex justify-center mb-8 space-x-4">
            <Link href={"/home"}>
              <Button
                variant="outline"
                className="text-black bg-white hover:bg-blue-50"
              >
                Connexion
              </Button>
            </Link>
          </div>
        </motion.div>
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-2 mt-4"
        ></motion.div>
      </div>
    </div>
  );
}

const Caroussel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teams.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 1000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative z-20 w-full py-6 mb-8 overflow-hidden">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="relative">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex flex-col items-center justify-center flex-none w-1/4 px-2 sm:w-1/5 md:w-1/6 lg:w-1/8"
              >
                <div className="flex items-center justify-center mb-2 bg-white rounded-full w-18 h-18 sm:w-16 sm:h-16">
                  <Image
                    src={team.image_path}
                    alt={team.name}
                    className="w-12 h-12"
                    width={48}
                    height={48}
                  />
                </div>
                <span className="text-xs font-semibold text-center text-white sm:text-sm">
                  {team.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  Icon,
  title,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
}) => (
  <div className="flex flex-col items-center">
    <div className="p-3 mb-3 bg-black rounded-full">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-white">{title}</h3>
  </div>
);
