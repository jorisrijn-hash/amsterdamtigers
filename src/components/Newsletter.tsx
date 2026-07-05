"use client";

import { useI18n } from "./I18nProvider";
import { SignupForm } from "./SignupForm";
import { Reveal } from "./Reveal";

const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

export function Newsletter() {
  const { t } = useI18n();
  return (
    <section className="border-t border-line py-20 md:py-28" aria-label="Nieuwsbrief">
      <div className="shell grid gap-8 md:grid-cols-2 md:items-center">
        <Reveal>
          <span className="label">Nieuwsbrief</span>
          <h2 className="display mt-3 text-[clamp(1.8rem,5vw,3rem)]">
            {t("cta.newsletter.title")}
          </h2>
          <p className="mt-4 max-w-md text-muted">{t("cta.newsletter.body")}</p>
        </Reveal>
        <Reveal>
          <SignupForm
            source="newsletter"
            endpoint={ENDPOINT}
            placeholder={t("cta.newsletter.placeholder")}
            submitLabel={t("cta.newsletter.submit")}
            successLabel={t("cta.newsletter.success")}
            errorLabel={t("cta.newsletter.error")}
          />
        </Reveal>
      </div>
    </section>
  );
}
