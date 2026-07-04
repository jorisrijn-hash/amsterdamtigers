import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageShell({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="pt-32 md:pt-40">
      <div className="shell">
        <Reveal>
          <span className="label">{label}</span>
          <h1 className="display mt-4 text-[clamp(2.5rem,9vw,6rem)]">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {intro}
            </p>
          )}
        </Reveal>
      </div>
      {children}
    </div>
  );
}
