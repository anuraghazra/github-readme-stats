type Translations = Record<string, Record<string, string>>;

/**
 * I18n translation class.
 */
export class I18n {
  /** The language locale. */
  locale: string | undefined;
  /** The translations object. */
  translations: Translations;
  /** The fallback language locale. */
  fallbackLocale: string;

  constructor({
    locale,
    translations,
  }: {
    locale?: string;
    translations: Translations;
  }) {
    this.locale = locale;
    this.translations = translations;
    this.fallbackLocale = "en";
  }

  t(str: string) {
    if (!this.translations[str]) {
      throw new Error(`${str} Translation string not found`);
    }

    if (!this.translations[str][this.locale || this.fallbackLocale]) {
      throw new Error(`${str} Translation locale not found`);
    }

    return this.translations[str][this.locale || this.fallbackLocale];
  }
}
