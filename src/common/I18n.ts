export class I18n {
  locale: string;
  translations: {
    [name: string]: {
      [key: string]: string;
    };
  };
  fallbackLocale: string;
  /**
   *
   * @param {locale} locale
   * @param {translations} translations
   */
  constructor({
    locale,
    translations,
  }: {
    locale: string;
    translations: {
      [name: string]: {
        [key: string]: string;
      };
    };
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
