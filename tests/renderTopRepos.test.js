require("@testing-library/jest-dom");
const cssToObject = require("@uppercod/css-to-object").cssToObject;
const renderTopRepos = require("../src/cards/top-repos-card");

const { queryByTestId, queryAllByTestId } = require("@testing-library/dom");
const themes = require("../themes");

describe("Test renderTopRepos", () => {
  const repos = [
    {
      name: "test-repo-1",
      forkCount: 10,
      stargazerCount: 10,
    },
    {
      name: "test-repo-2",
      forkCount: 8,
      stargazerCount: 7,
    },
    {
      name: "test-repo-3",
      forkCount: 6,
      stargazerCount: 5,
    },
  ];

  it("should render correctly based on stars", () => {
    document.body.innerHTML = renderTopRepos(repos);

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Top Starred Repos",
    );

    expect(queryAllByTestId(document.body, "repo-name")[0]).toHaveTextContent(
      "test-repo-1",
    );
    expect(queryAllByTestId(document.body, "repo-name")[1]).toHaveTextContent(
      "test-repo-2",
    );
    expect(queryAllByTestId(document.body, "repo-name")[2]).toHaveTextContent(
      "test-repo-3",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "100%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "70%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "50%",
    );
  });

  it("should render correctly based on forks", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type="fork");

    expect(queryByTestId(document.body, "header")).toHaveTextContent(
      "Top Forked Repos",
    );

    expect(queryAllByTestId(document.body, "repo-name")[0]).toHaveTextContent(
      "test-repo-1",
    );
    expect(queryAllByTestId(document.body, "repo-name")[1]).toHaveTextContent(
      "test-repo-2",
    );
    expect(queryAllByTestId(document.body, "repo-name")[2]).toHaveTextContent(
      "test-repo-3",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[0]).toHaveAttribute(
      "width",
      "100%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[1]).toHaveAttribute(
      "width",
      "80%",
    );
    expect(queryAllByTestId(document.body, "lang-progress")[2]).toHaveAttribute(
      "width",
      "60%",
    );
  });

  it("should render with custom width set", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", {});
    expect(document.querySelector("svg")).toHaveAttribute("width", "500");

    document.body.innerHTML = renderTopRepos(repos, card_type = "star", { card_width: 400 });
    expect(document.querySelector("svg")).toHaveAttribute("width", "400");
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type = "star");

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.textContent);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".repo-name "];

    expect(headerStyles.fill.trim()).toBe("#2f80ed");
    expect(langNameStyles.fill.trim()).toBe("#434d58");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderTopRepos(repos, card_type = "star", { ...customColors });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".repo-name "];

    expect(headerStyles.fill.trim()).toBe(`#${customColors.title_color}`);
    expect(langNameStyles.fill.trim()).toBe(`#${customColors.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerStyles = stylesObject[":host"][".header "];
    const langNameStyles = stylesObject[":host"][".repo-name "];

    expect(headerStyles.fill.trim()).toBe("#5a0");
    expect(langNameStyles.fill.trim()).toBe(`#${themes.radical.text_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderTopRepos(repos, card_type = "star", {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerStyles = stylesObject[":host"][".header "];
      const langNameStyles = stylesObject[":host"][".repo-name "];

      expect(headerStyles.fill.trim()).toBe(`#${themes[name].title_color}`);
      expect(langNameStyles.fill.trim()).toBe(`#${themes[name].text_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
    });
  });

  it("should render a translated title", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", { locale: "id" });
    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "⭐ Repositori dengan Bintang Terbanyak",
    );
  });

  it("should render without rounding", () => {
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", { border_radius: "0" });
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", {});
    expect(document.querySelector("rect")).toHaveAttribute("rx", "4.5");
  });

  it("should render langs with specified repo_count", async () => {
    options = {
      repo_count: 1,
    };
    document.body.innerHTML = renderTopRepos(repos, card_type = "star", { ...options });
    expect(queryAllByTestId(document.body, "repo-name").length).toBe(
      options.repo_count,
    );
  });

});
