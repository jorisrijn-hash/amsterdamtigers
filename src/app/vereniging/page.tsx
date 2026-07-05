import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Vereniging",
  description:
    "Word lid van de Amsterdam Tigers. Trainen en spelen op de Jaap Edenbaan in Amsterdam.",
  alternates: { canonical: "/vereniging" },
};

const INFO = [
  { title: "Trainen", text: "Wekelijkse trainingen op de Jaap Edenbaan, voor alle niveaus." },
  { title: "Teams", text: "Van recreatief tot competitie. Er is een plek die bij je past." },
  { title: "Sfeer", text: "Een hechte club met een groeiende, betrokken achterban." },
];

export default function VerenigingPage() {
  return (
    <PageShell
      label="Vereniging"
      title="Word lid"
      intro="IJshockey spelen in Amsterdam? Nieuw of ervaren, jong of oud; meld je aan en we nemen contact met je op."
    >
      <div className="shell mt-14 grid gap-6 md:grid-cols-3">
        {INFO.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05}>
            <div className="h-full border border-line p-6">
              <h3 className="display text-lg">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="shell mt-20 max-w-xl">
        <Reveal>
          <span className="label">Aanmelden</span>
          <h2 className="display mt-3 text-2xl md:text-3xl">Interesse? Laat het weten</h2>
          <p className="mt-3 text-muted">
            Vul je gegevens in. Dit is een demoformulier; koppel het aan e-mail of
            CRM via <span className="font-mono text-[0.85em]">NEXT_PUBLIC_MEMBERSHIP_ENDPOINT</span>.
          </p>
        </Reveal>
        <div className="mt-6">
          <SignupForm
            source="membership"
            endpoint={process.env.NEXT_PUBLIC_MEMBERSHIP_ENDPOINT}
            withName
            withMessage
            namePlaceholder="Je naam"
            placeholder="Je e-mailadres"
            messagePlaceholder="Iets over jezelf (leeftijd, ervaring, positie)"
            submitLabel="Aanmelden"
            successLabel="Bedankt! We nemen snel contact met je op."
            errorLabel="Er ging iets mis. Probeer het opnieuw."
          />
        </div>
      </div>
    </PageShell>
  );
}
