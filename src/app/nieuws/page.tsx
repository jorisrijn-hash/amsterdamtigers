import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Nieuws",
  description: "Het laatste nieuws rond de Amsterdam Tigers.",
  alternates: { canonical: "/nieuws" },
};

export default function NieuwsPage() {
  return (
    <PageShell
      label="Updates"
      title={"Nieuws."}
      intro="Wedstrijdverslagen, transfers en clubnieuws. Het volledige archief verschijnt hier."
    >
      <div className="shell mt-16">
        <p className="font-mono text-sm text-muted-2">Binnenkort meer.</p>
      </div>
    </PageShell>
  );
}
