"use client";

import { useEffect, useState } from "react";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function diff(target: number, now: number): Parts {
  const ms = Math.max(0, target - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms <= 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Live countdown to an ISO datetime. Renders inert until mounted (no SSR skew). */
export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(diff(target, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells: [string, number][] = [
    ["dagen", parts?.days ?? 0],
    ["uur", parts?.hours ?? 0],
    ["min", parts?.minutes ?? 0],
    ["sec", parts?.seconds ?? 0],
  ];

  return (
    <div className="flex gap-4 sm:gap-6" role="timer" aria-label="Aftellen tot de volgende wedstrijd">
      {cells.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="display text-3xl tabular-nums sm:text-4xl">
            {parts ? pad(value) : "--"}
          </span>
          <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted-2">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
