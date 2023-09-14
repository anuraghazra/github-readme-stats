const FALLBACK_LOCALE = "en";

/**
 * I18n translation class.
 */
class I18n {
  /**
   * Constructor.
   *
   * @param {Object} options Options.
   * @param {string=} options.locale Locale.
   * @param {Object} options.translations Translations.
   */
  constructor({ locale, translations }) {
    this.locale = locale || FALLBACK_LOCALE;
    this.translations = translations;
  }

  /**
   * Get translation.
   *
   * @param {string} str String to translate.
   * @returns {string} Translated string.
   */
  t(str) {
    if (!this.translations[str]) {
      throw new Error(`${str} Translation string not found`);
    }

    if (!this.translations[str][this.locale]) {
      throw new Error(
        `'${str}' translation not found for locale '${this.locale}'`,
      );
    }

    return this.translations[str][this.locale];
  }
}

export { I18n };
export default I18n;
