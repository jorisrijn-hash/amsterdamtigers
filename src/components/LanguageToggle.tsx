"use client";

import { LOCALES } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <div
      className={`inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${className}`}
      role="group"
      aria-label="Taal / Language"
    >
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-2" aria-hidden>/</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={
              locale === l
                ? "text-paper"
                : "text-muted-2 transition-colors hover:text-muted"
            }
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
