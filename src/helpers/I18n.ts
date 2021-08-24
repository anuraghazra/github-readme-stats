export interface ITranslation {
  [key: string]: {
    [locale: string]: string;
  };
}

export default class I18n {
  private locale: string;
  private translation: ITranslation;
  constructor(locale: string, translation?: ITranslation) {
    this.locale = locale;
    this.translation = translation ?? {};
  }

  public setTranslation(translation: ITranslation) {
    this.translation = translation;
  }

  public t(str: string) {
    if (!this.translation[str]) {
      throw new Error(`${str} Translation string not found`);
    }

    if (!this.translation[str][this.locale]) {
      throw new Error(`${str} Translation locale not found`);
    }

    return this.translation[str][this.locale];
  }

  public isLocaleAvailable(locale: string) {
    const key =
      "title" in this.translation ? "title" : Object.keys(this.translation)[0];
    return Object.keys(this.translation[key]).includes(locale.toLowerCase());
  }
}
