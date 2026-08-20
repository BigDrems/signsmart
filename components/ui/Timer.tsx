"use client";

import { useState, useEffect, useCallback } from "react";

type TimerProps = {
  totalSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
};

export function Timer({ totalSeconds, onTimeUp, isPaused = false }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = (secondsLeft / totalSeconds) * 100;

  const isLow = secondsLeft <= 60;
  const isCritical = secondsLeft <= 30;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={`transition-all duration-1000 ${
              isCritical
                ? "text-red-500"
                : isLow
                ? "text-amber-500"
                : "text-blue-500"
            }`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span
        className={`text-lg font-bold tabular-nums ${
          isCritical
            ? "text-red-600 animate-pulse"
            : isLow
            ? "text-amber-600"
            : "text-gray-900"
        }`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
