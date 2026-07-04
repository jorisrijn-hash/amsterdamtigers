"use client";

import { useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import type { Player } from "@/lib/players";
import { Crest } from "./Crest";

const spring = { stiffness: 170, damping: 18, mass: 0.6 };

export function PlayerCard({
  player,
  fill = false,
}: {
  player: Player;
  index?: number;
  fill?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, spring);
  const ry = useSpring(0, spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`group relative aspect-[3/4] overflow-hidden bg-ink-2 ${
        fill ? "w-full" : "w-[clamp(15rem,26vw,19rem)] shrink-0 snap-start"
      }`}
    >
      {/* Portrait */}
      {player.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={player.photo}
          alt={player.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#20242a_0%,#111318_60%,#0b0d10_100%)]">
          <Crest className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]" />
        </div>
      )}

      {/* Optional jersey number watermark */}
      {player.number != null && (
        <span
          className="display pointer-events-none absolute right-3 top-2 text-[5.5rem] leading-none text-[color-mix(in_oklch,var(--paper)_16%,transparent)] mix-blend-overlay"
          aria-hidden
        >
          {player.number}
        </span>
      )}

      {/* Gradient + meta */}
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(8,10,12,0.92))] p-4 pt-16">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <p className="display truncate text-lg leading-tight">{player.name}</p>
            {player.position && (
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
                {player.position}
              </p>
            )}
          </div>
          {player.number != null && (
            <span className="font-mono text-sm text-muted">
              #{String(player.number).padStart(2, "0")}
            </span>
          )}
        </div>
        <span
          className="mt-3 block h-[2px] w-8 bg-red transition-[width] duration-300 ease-out group-hover:w-full"
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
