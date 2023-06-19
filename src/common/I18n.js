/**
 * I18n translation class.
 */
class I18n {
  constructor({ locale, translations }) {
    this.locale = locale;
    this.translations = translations;
    this.fallbackLocale = "en";
  }

  t(str) {
    const locale = this.locale || this.fallbackLocale;

    if (!this.translations[str]) {
      throw new Error(`${str} Translation string not found`);
    }

    if (!this.translations[str][locale]) {
      throw new Error(`'${str}' translation not found for locale '${locale}'`);
    }

    return this.translations[str][locale];
  }
}

export { I18n };
export default I18n;
