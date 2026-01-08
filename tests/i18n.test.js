import { describe, expect, it } from "@jest/globals";
import { I18n } from "../src/common/I18n.js";
import { statCardLocales } from "../src/translations.js";

describe("I18n", () => {
  it("should return translated string", () => {
    const i18n = new I18n({
      locale: "en",
      translations: statCardLocales({ name: "Anurag Hazra", apostrophe: "s" }),
    });
    expect(i18n.t("statcard.title")).toBe("Anurag Hazra's GitHub Stats");
  });

  it("should throw error if translation string not found", () => {
    const i18n = new I18n({
      locale: "en",
      translations: statCardLocales({ name: "Anurag Hazra", apostrophe: "s" }),
    });
    expect(() => i18n.t("statcard.title1")).toThrow(
      "statcard.title1 Translation string not found",
    );
  });

  it("should throw error if translation not found for locale", () => {
    const i18n = new I18n({
      locale: "asdf",
      translations: statCardLocales({ name: "Anurag Hazra", apostrophe: "s" }),
    });
    expect(() => i18n.t("statcard.title")).toThrow(
      "'statcard.title' translation not found for locale 'asdf'",
    );
  });
});
