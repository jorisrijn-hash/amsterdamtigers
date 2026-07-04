import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Regels",
  description: "De spelregels van ijshockey, kort uitgelegd.",
  alternates: { canonical: "/regels" },
};

export default function RegelsPage() {
  return (
    <PageShell
      label="Zo werkt het"
      title="Regels"
      intro="Nieuw bij ijshockey? Van icing tot power play: hier leggen we de basisregels uit zodat je elke wedstrijd kunt volgen."
    >
      <div className="shell mt-16">
        <p className="font-mono text-sm text-muted-2">Binnenkort meer.</p>
      </div>
    </PageShell>
  );
}
