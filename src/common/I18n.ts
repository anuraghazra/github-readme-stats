export class I18n {
  locale: string | undefined;
  translations: Record<string, Record<string, string>>;
  fallbackLocale: string;

  constructor({
    locale,
    translations,
  }: {
    locale?: string;
    translations: Record<string, Record<string, string>>;
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
