import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { NEXT_GAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wedstrijden",
  description: "Speelschema, uitslagen en tickets van de Amsterdam Tigers.",
  alternates: { canonical: "/wedstrijden" },
};

export default function WedstrijdenPage() {
  return (
    <PageShell
      label="Speelschema & tickets"
      title="Wedstrijden"
      intro="Thuis op de Jaap Edenbaan. Het volledige speelschema en de ticketverkoop vind je hier zodra het nieuwe seizoen begint."
    >
      <div className="shell mt-16">
        <div className="flex flex-wrap items-center gap-4 border border-line p-6">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-2">
            Status
          </span>
          <span className="display text-xl">{NEXT_GAME.status}</span>
        </div>
      </div>
    </PageShell>
  );
}
