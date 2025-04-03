"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useEffect, useState } from "react";

export const Countdown = ({ timestamp }: { timestamp: number }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [countdown, setCountdown] = useState(() => {
    const now = new Date().getTime();
    return timestamp * 1000 - now;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = timestamp * 1000 - now;

      setCountdown(distance);
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return (
    <div className="flex items-center justify-center gap-4 bg-redsuperlig rounded-lg p-2 md:p-3 w-full md:w-auto">
      <div className="flex flex-col items-center">
        <span className="md:text-2xl text-sm md:font-bold text-white">
          {days.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Jours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="md:text-2xl text-sm md:font-bold text-white">
          {hours.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Hrs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="md:text-2xl text-sm md:font-bold text-white">
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Min</span>
      </div>
      {!isMobile && (
        <div className="flex flex-col items-center">
          <span className="md:text-2xl md:font-bold text-white">
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] text-white/80">Sec</span>
        </div>
      )}
    </div>
  );
};
