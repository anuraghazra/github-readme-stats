import "@testing-library/jest-dom";
import I18n from "../src/helpers/I18n";

const withTitleTranslation = {
  title: {
    en: "Hello",
    cn: "你好",
    fr: "Bonjour",
  },
  subtitle: {
    cn: "世界",
    fr: "Monde",
  },
  description: {
    en: "Good Morning!",
    cn: "早上好",
    fr: "Bonjour",
  },
};

const withoutTitleTranslation = {
  subtitle: {
    cn: "世界",
    fr: "Monde",
  },
  description: {
    en: "Welcome to Earth",
    cn: "欢迎来到地球",
    fr: "Bienvenue sur Terre",
  },
};

describe("isLocaleAvailable", () => {
  it("should check based on 'title' when translation has 'title' field", () => {
    const i18n = new I18n("en", withTitleTranslation);
    expect(i18n.isLocaleAvailable("en")).toBe(true);
  });
  it("should check based on first field when translation not has 'title' field", () => {
    const i18n = new I18n("en", withoutTitleTranslation);
    expect(i18n.isLocaleAvailable("en")).toBe(false);
  });
  it("should return false when translation is empty", () => {
    const i18n = new I18n("en", {});
    expect(i18n.isLocaleAvailable("en")).toBe(false);
  });
});

describe("t", () => {
  it("should return string not found error when translation not contains field", () => {
    const i18n = new I18n("en", withoutTitleTranslation);
    expect(() => i18n.t("title")).toThrow("title Translation string not found");
  });

  it("should return locale not found error when translation not contains locale", () => {
    const i18n = new I18n("en", withTitleTranslation);
    expect(() => i18n.t("subtitle")).toThrow(
      "subtitle Translation locale not found",
    );
  });

  it("should return locale string when translation contains locale and field", () => {
    const i18n = new I18n("en", withTitleTranslation);
    expect(i18n.t("title")).toBe("Hello");
  });
});

describe("setTranslation", () => {
  it("should update translation when setTranslation", () => {
    const i18n = new I18n("en", withTitleTranslation);
    expect(i18n.t("description")).toBe("Good Morning!");
    i18n.setTranslation(withoutTitleTranslation);
    expect(i18n.t("description")).toBe("Welcome to Earth");
  });
});
