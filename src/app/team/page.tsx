import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { PlayerCard } from "@/components/PlayerCard";
import { PLAYERS } from "@/lib/players";

export const metadata: Metadata = {
  title: "Team",
  description: "De volledige selectie van de Amsterdam Tigers.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <PageShell
      label="De selectie"
      title="Het team"
      intro="Van de blauwe lijn tot de slotsirene. Maak kennis met de spelers die de Tigers op het ijs vertegenwoordigen."
    >
      <div className="shell mt-14 md:mt-20">
        <Reveal className="mb-6 flex items-baseline gap-4">
          <h2 className="display text-2xl md:text-3xl">Spelers</h2>
          <span className="font-mono text-xs text-muted-2">
            {String(PLAYERS.length).padStart(2, "0")}
          </span>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PLAYERS.map((player) => (
            <Reveal key={player.name}>
              <PlayerCard player={player} fill />
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
