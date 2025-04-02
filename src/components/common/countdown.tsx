"use client";
import { useEffect, useState } from "react";

export const Countdown = ({ timestamp }: { timestamp: number }) => {
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
    <div className="flex items-center justify-center gap-4 bg-redsuperlig rounded-lg p-3">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {days.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Jours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {hours.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Hrs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {seconds.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] text-white/80">Sec</span>
      </div>
    </div>
  );
};
