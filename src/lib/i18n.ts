/**
 * Lightweight i18n. NL is the default/source locale; EN is a full mirror.
 *
 * Client-context translation: covers client components only (not server
 * components or SEO metadata). For true site-wide i18n incl. subpages/metadata,
 * migrate to next-intl with `[locale]` routing.
 */

export type Locale = "nl" | "en";

export const LOCALES: Locale[] = ["nl", "en"];
export const DEFAULT_LOCALE: Locale = "nl";
export const LOCALE_STORAGE_KEY = "at:locale";

export const dict = {
  nl: {
    // Nav
    "nav.news": "Nieuws",
    "nav.team": "Team",
    "nav.matches": "Wedstrijden",
    "nav.rules": "Regels",
    "nav.history": "History",
    "nav.shop": "Shop",
    "nav.partner": "Partner",
    "nav.contact": "Contact",
    "nav.association": "Vereniging",

    // Hero
    "hero.tagline": "IJshockey uit de hoofdstad",
    "hero.tickets": "Tickets",
    "hero.viewTeam": "Bekijk het team",
    "hero.scroll": "Scroll",

    // News section
    "news.heading": "Nieuws",
    "news.cta": "Alle updates",

    // Team section
    "team.label": "De selectie",
    "team.title": "Het team",
    "team.cta": "Bekijk het team",

    // Social section
    "social.cta": "Volg op Instagram",

    // Newsletter
    "cta.newsletter.title": "Blijf op de hoogte",
    "cta.newsletter.body": "Wedstrijden, nieuws en acties. Direct in je inbox.",
    "cta.newsletter.placeholder": "Je e-mailadres",
    "cta.newsletter.submit": "Inschrijven",
    "cta.newsletter.success": "Bedankt, je bent ingeschreven.",
    "cta.newsletter.error": "Er ging iets mis. Probeer het opnieuw.",

    // Status bar
    "status.nextGame": "Volgende wedstrijd",
    "status.tickets": "Tickets",
    "status.seasonOver": "Seizoen afgelopen",
    "status.home": "thuis",
    "status.away": "uit",

    // Footer
    "footer.tagline": "IJshockey op de Jaap Edenbaan, hartje Amsterdam.",
    "footer.follow": "Volg",
    "footer.login": "Vereniging login",

    // Language
    "lang.nl": "NL",
    "lang.en": "EN",
  },
  en: {
    "nav.news": "News",
    "nav.team": "Team",
    "nav.matches": "Matches",
    "nav.rules": "Rules",
    "nav.history": "History",
    "nav.shop": "Shop",
    "nav.partner": "Partner",
    "nav.contact": "Contact",
    "nav.association": "Membership",

    "hero.tagline": "Ice hockey from the capital",
    "hero.tickets": "Tickets",
    "hero.viewTeam": "Meet the team",
    "hero.scroll": "Scroll",

    "news.heading": "News",
    "news.cta": "All updates",

    "team.label": "The selection",
    "team.title": "The team",
    "team.cta": "Meet the team",

    "social.cta": "Follow on Instagram",

    "cta.newsletter.title": "Stay in the loop",
    "cta.newsletter.body": "Games, news and offers. Straight to your inbox.",
    "cta.newsletter.placeholder": "Your email address",
    "cta.newsletter.submit": "Subscribe",
    "cta.newsletter.success": "Thanks, you are subscribed.",
    "cta.newsletter.error": "Something went wrong. Please try again.",

    "status.nextGame": "Next game",
    "status.tickets": "Tickets",
    "status.seasonOver": "Season over",
    "status.home": "home",
    "status.away": "away",

    "footer.tagline": "Ice hockey at the Jaap Edenbaan, the heart of Amsterdam.",
    "footer.follow": "Follow",
    "footer.login": "Member login",

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
