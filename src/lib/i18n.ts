/**
 * Lightweight i18n. NL is the default/source locale; EN is a full mirror.
 *
 * This is a working scaffold wired into the most visible strings (hero, CTAs,
 * newsletter). Extending coverage is mechanical: add keys here and swap literals
 * for `t("key")` in components. Kept dependency-free on purpose.
 */

export type Locale = "nl" | "en";

export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";
export const LOCALE_STORAGE_KEY = "at:locale";

export const dict = {
  nl: {
    "hero.tagline": "IJshockey uit de hoofdstad",
    "hero.tickets": "Tickets",
    "hero.viewTeam": "Bekijk het team",
    "hero.scroll": "Scroll",
    "cta.newsletter.title": "Blijf op de hoogte",
    "cta.newsletter.body": "Wedstrijden, nieuws en acties. Direct in je inbox.",
    "cta.newsletter.placeholder": "Je e-mailadres",
    "cta.newsletter.submit": "Inschrijven",
    "cta.newsletter.success": "Bedankt, je bent ingeschreven.",
    "cta.newsletter.error": "Er ging iets mis. Probeer het opnieuw.",
    "lang.nl": "NL",
    "lang.en": "EN",
  },
  en: {
    "hero.tagline": "Ice hockey from the capital",
    "hero.tickets": "Tickets",
    "hero.viewTeam": "Meet the team",
    "hero.scroll": "Scroll",
    "cta.newsletter.title": "Stay in the loop",
    "cta.newsletter.body": "Games, news and offers. Straight to your inbox.",
    "cta.newsletter.placeholder": "Your email address",
    "cta.newsletter.submit": "Subscribe",
    "cta.newsletter.success": "Thanks, you are subscribed.",
    "cta.newsletter.error": "Something went wrong. Please try again.",
    "lang.nl": "NL",
    "lang.en": "EN",
  },
} satisfies Record<Locale, Record<string, string>>;

export type TranslationKey = keyof (typeof dict)["nl"];

export function translate(locale: Locale, key: TranslationKey): string {
  return dict[locale][key] ?? dict[DEFAULT_LOCALE][key] ?? key;
}

export function isLocale(value: unknown): value is Locale {
  return value === "nl" || value === "en";
}
