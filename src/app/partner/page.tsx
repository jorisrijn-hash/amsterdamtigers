import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SponsorLink } from "@/components/SponsorLink";
import {
  sponsorsByTier,
  PARTNER_BENEFITS,
  PARTNER_CONTACT_EMAIL,
} from "@/lib/partners";

export const metadata: Metadata = {
  title: "Partner",
  description:
    "Word partner van de Amsterdam Tigers. Zichtbaarheid, bereik en netwerk in de regio Amsterdam.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  const tiers = sponsorsByTier();

  return (
    <PageShell
      label="Partners & sponsoring"
      title="Partner"
      intro="Onze partners maken ijshockey in Amsterdam mogelijk. Samen bouwen we aan de club en aan zichtbaarheid voor jouw merk."
    >
      {/* Sponsor tiers */}
      <div className="shell mt-14 space-y-14 md:mt-20">
        {tiers.map(({ tier, sponsors }) => (
          <Reveal key={tier}>
            <div className="mb-6 flex items-center gap-4">
              <span className="label">{tier}</span>
              <span className="h-px flex-1 bg-line" aria-hidden />
            </div>
            <div className="grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-4">
              {sponsors.map((s) => (
                <SponsorLink key={s.name} sponsor={s} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Value props */}
      <div className="shell mt-24">
        <Reveal>
          <h2 className="display text-2xl md:text-3xl">Waarom partner worden</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PARTNER_BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="h-full border border-line p-6">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-red">
                  0{i + 1}
                </span>
                <h3 className="display mt-3 text-lg">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="shell mt-20">
        <Reveal className="flex flex-wrap items-center justify-between gap-6 border border-line p-8 md:p-10">
          <div>
            <h2 className="display text-2xl md:text-3xl">Word partner</h2>
            <p className="mt-2 max-w-md text-muted">
              Interesse in een samenwerking? Neem contact op voor het partnerpakket.
            </p>
          </div>
          <a
            href={`mailto:${PARTNER_CONTACT_EMAIL}?subject=Partnerschap%20Amsterdam%20Tigers`}
            data-cursor
            className="btn"
          >
            Neem contact op
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
