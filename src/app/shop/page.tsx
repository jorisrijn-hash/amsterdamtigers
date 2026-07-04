import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Shop",
  description: "Officiële Amsterdam Tigers merchandise.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <PageShell
      label="Merchandise"
      title="Shop"
      intro="Jerseys, hoodies en fan gear in de kleuren van de club. De officiële shop opent binnenkort."
    >
      <div className="shell mt-16">
        <p className="font-mono text-sm text-muted-2">Binnenkort meer.</p>
      </div>
    </PageShell>
  );
}
