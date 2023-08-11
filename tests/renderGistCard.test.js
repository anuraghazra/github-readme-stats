import { renderGistCard } from "../src/cards/gist-card";
import { describe, expect, it } from "@jest/globals";
import { queryByTestId } from "@testing-library/dom";
import "@testing-library/jest-dom";

/**
 * @type {import("../src/fetchers/gist-fetcher").GistData}
 */
const data = {
  name: "test",
  nameWithOwner: "anuraghazra/test",
  description: "Small test repository with different Python programs.",
  language: "Python",
  starsCount: 163,
  forksCount: 19,
};

describe("test renderGistCard", () => {
  it("should render correctly", () => {
    document.body.innerHTML = renderGistCard(data);

    const [header] = document.getElementsByClassName("header");

    expect(header).toHaveTextContent("test");
    expect(header).not.toHaveTextContent("anuraghazra");
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small test repository with different Python programs.",
    );
    expect(queryByTestId(document.body, "starsCount")).toHaveTextContent("163");
    expect(queryByTestId(document.body, "forksCount")).toHaveTextContent("19");
    expect(queryByTestId(document.body, "lang-name")).toHaveTextContent(
      "Python",
    );
    expect(queryByTestId(document.body, "lang-color")).toHaveAttribute(
      "fill",
      "#3572A5",
    );
  });

  it("should display username in title if show_owner is true", () => {
    document.body.innerHTML = renderGistCard(data, { show_owner: true });
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("anuraghazra/test");
  });

  it("should trim header if name is too long", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      name: "some-really-long-repo-name-for-test-purposes",
    });
    const [header] = document.getElementsByClassName("header");
    expect(header).toHaveTextContent("some-really-long-repo-name-for-test...");
  });

  it("should trim description if description os too long", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description:
        "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet",
    });
    expect(
      document.getElementsByClassName("description")[0].children[0].textContent,
    ).toBe("The quick brown fox jumps over the lazy dog is an");

    expect(
      document.getElementsByClassName("description")[0].children[1].textContent,
    ).toBe("English-language pangram—a sentence that contains all");
  });

  it("should not trim description if it is short", () => {
    document.body.innerHTML = renderGistCard({
      ...data,
      description: "Small text should not trim",
    });
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small text should not trim",
    );
  });
});
