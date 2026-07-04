import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { CLUB } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met de Amsterdam Tigers.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { label: "Locatie", value: "Jaap Edenbaan, Amsterdam" },
  { label: "E-mail", value: "info@amsterdamtigers.com", href: "mailto:info@amsterdamtigers.com" },
  { label: "Instagram", value: CLUB.handle, href: CLUB.instagram },
];

export default function ContactPage() {
  return (
    <PageShell
      label="Kom in contact"
      title="Contact"
      intro="Vragen over lidmaatschap, tickets of partnerships? We horen graag van je."
    >
      <div className="shell mt-16 border-t border-line">
        {DETAILS.map((d) => (
          <Reveal as="div" key={d.label}>
            <div className="grid grid-cols-[8rem_1fr] items-center gap-6 border-b border-line py-6">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
                {d.label}
              </span>
              {d.href ? (
                <a
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="display text-lg transition-colors duration-200 ease-out hover:text-red md:text-xl"
                >
                  {d.value}
                </a>
              ) : (
                <span className="display text-lg md:text-xl">{d.value}</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
