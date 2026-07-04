import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "History",
  description: "De geschiedenis van het ijshockey in Amsterdam.",
  alternates: { canonical: "/history" },
};

const MILESTONES = [
  { year: "Oprichting", text: "IJshockey keert terug naar de hoofdstad." },
  { year: "Jaap Eden", text: "De Tigers maken de Jaap Edenbaan tot thuishaven." },
  { year: "Vandaag", text: "Een groeiende club met een groeiende achterban." },
];

export default function HistoryPage() {
  return (
    <PageShell
      label="Het verhaal"
      title="History"
      intro="De hoofdstad heeft een rijke ijstraditie. Dit is het verhaal van het ijshockey in Amsterdam."
    >
      <div className="shell mt-14 md:mt-20">
        <Reveal className="relative aspect-[21/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/history-rink.webp"
            alt="Kunstijsbaan Sportfondsenbad, Linnaeusstraat, Amsterdam, 1934"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,10,12,0.85))]" />
          <span className="absolute bottom-4 left-4 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
            Kunstijsbaan Linnaeusstraat, 1934
          </span>
        </Reveal>
      </div>

      <div className="shell mt-16 border-t border-line">
        {MILESTONES.map((m, i) => (
          <Reveal as="div" key={m.year} delay={i * 0.05}>
            <div className="grid grid-cols-[8rem_1fr] gap-6 border-b border-line py-8">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-red">
                {m.year}
              </span>
              <p className="text-base leading-relaxed text-muted">{m.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
