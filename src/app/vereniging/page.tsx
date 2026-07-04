import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Vereniging",
  description: "Ledenportaal van de Amsterdam Tigers.",
  alternates: { canonical: "/vereniging" },
};

export default function VerenigingPage() {
  return (
    <PageShell
      label="Ledenportaal"
      title="Vereniging"
      intro="Toegang voor leden, spelers en staf. Roosters, documenten en interne communicatie op één plek."
    >
      <div className="shell mt-16">
        <p className="font-mono text-sm text-muted-2">Login volgt binnenkort.</p>
      </div>
    </PageShell>
  );
}
