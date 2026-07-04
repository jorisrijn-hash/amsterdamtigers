import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Partner",
  description: "Word partner van de Amsterdam Tigers.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <PageShell
      label="Samenwerken"
      title="Partner"
      intro="Verbind je merk aan het ijshockey in Amsterdam. Van boarding tot hoofdsponsor: er is altijd een pakket dat past."
    >
      <div className="shell mt-16">
        <a href="mailto:info@amsterdamtigers.com" className="btn">
          Neem contact op
        </a>
      </div>
    </PageShell>
  );
}
