require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const renderRepoCard = require("../src/renderRepoCard");

const { queryByTestId } = require("@testing-library/dom");
const themes = require("../themes");

const data_repo = {
  repository: {
    nameWithOwner: "anuraghazra/convoychat",
    name: "convoychat",
    stargazers: { totalCount: 38000 },
    description: "Help us take over the world! React + TS + GraphQL Chat App",
    primaryLanguage: {
      color: "#2b7489",
      id: "MDg6TGFuZ3VhZ2UyODc=",
      name: "TypeScript",
    },
    forkCount: 100,
  },
};

describe("Test renderRepoCard", () => {
  it("should render correctly", () => {
    document.body.innerHTML = renderRepoCard(data_repo.repository);

    const [header] = document.getElementsByClassName("header");

    expect(header).toHaveTextContent("convoychat");
    expect(header).not.toHaveTextContent("anuraghazra");
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Help us take over the world! React + TS + GraphQL Chat .."
    );
    expect(queryByTestId(document.body, "stargazers")).toHaveTextContent("38k");
    expect(queryByTestId(document.body, "forkcount")).toHaveTextContent("100");
    expect(queryByTestId(document.body, "lang")).toHaveTextContent(
      "TypeScript"
    );
    expect(queryByTestId(document.body, "lang-color")).toHaveAttribute(
      "fill",
      "#2b7489"
    );
  });

  it("should display username in title (full repo name)", () => {
    document.body.innerHTML = renderRepoCard(data_repo.repository, {
      show_owner: true,
    });
    expect(document.getElementsByClassName("header")[0]).toHaveTextContent(
      "anuraghazra/convoychat"
    );
  });

  it("should trim description", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      description:
        "Very long long long long long long long long text it should trim it",
    });

    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Very long long long long long long long long text it sh.."
    );

    // Should not trim
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      description: "Small text should not trim",
    });

    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "Small text should not trim"
    );
  });

  it("should parse emojis", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      description:
        "This is a text with a :poop: poo emoji",
    });


    // poop emoji may not show in all editors but it's there between "a" and "poo"
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "This is a text with a 💩 poo emoji"
    );
  });

  it("should remove emojis if show_emojis option is not set", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      description:
        "This is a text with a :poop: poo emoji",
    }, {
      show_emojis: 0
    });

    // poop emoji not between "a" and "poo"
    expect(document.getElementsByClassName("description")[0]).toHaveTextContent(
      "This is a text with a poo emoji"
    );
  });

  it("should shift the text position depending on language length", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      primaryLanguage: {
        ...data_repo.repository.primaryLanguage,
        name: "Jupyter Notebook",
      },
    });

    expect(document.getElementsByTagName("g")[1]).toHaveAttribute(
      "transform",
      "translate(155, 100)"
    );

    // Small lang
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      primaryLanguage: {
        ...data_repo.repository.primaryLanguage,
        name: "Ruby",
      },
    });

    expect(document.getElementsByTagName("g")[1]).toHaveAttribute(
      "transform",
      "translate(125, 100)"
    );
  });

  it("should render default colors properly", () => {
    document.body.innerHTML = renderRepoCard(data_repo.repository);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#2f80ed");
    expect(descClassStyles.fill).toBe("#333");
    expect(iconClassStyles.fill).toBe("#586069");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#FFFEFE"
    );
  });

  it("should render custom colors properly", () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    document.body.innerHTML = renderRepoCard(data_repo.repository, {
      ...customColors,
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${customColors.title_color}`);
    expect(descClassStyles.fill).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525"
    );
  });

  it("should render with all the themes", () => {
    Object.keys(themes).forEach((name) => {
      document.body.innerHTML = renderRepoCard(data_repo.repository, {
        theme: name,
      });

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const headerClassStyles = stylesObject[".header"];
      const descClassStyles = stylesObject[".description"];
      const iconClassStyles = stylesObject[".icon"];

      expect(headerClassStyles.fill).toBe(`#${themes[name].title_color}`);
      expect(descClassStyles.fill).toBe(`#${themes[name].text_color}`);
      expect(iconClassStyles.fill).toBe(`#${themes[name].icon_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`
      );
    });
  });

  it("should render custom colors with themes", () => {
    document.body.innerHTML = renderRepoCard(data_repo.repository, {
      title_color: "5a0",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#5a0");
    expect(descClassStyles.fill).toBe(`#${themes.radical.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`
    );
  });

  it("should render custom colors with themes and fallback to default colors if invalid", () => {
    document.body.innerHTML = renderRepoCard(data_repo.repository, {
      title_color: "invalid color",
      text_color: "invalid color",
      theme: "radical",
    });

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const headerClassStyles = stylesObject[".header"];
    const descClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${themes.default.title_color}`);
    expect(descClassStyles.fill).toBe(`#${themes.default.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`
    );
  });

  it("should render archive badge if repo is archived", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      isArchived: true,
    });

    expect(queryByTestId(document.body, "archive-badge")).toHaveTextContent(
      "Archived"
    );
  });

  it("should not render star count or fork count if either of the are zero", () => {
    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      stargazers: { totalCount: 0 },
    });

    expect(queryByTestId(document.body, "stargazers")).toBeNull();
    expect(queryByTestId(document.body, "forkcount")).toBeDefined();

    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      stargazers: { totalCount: 1 },
      forkCount: 0,
    });

    expect(queryByTestId(document.body, "stargazers")).toBeDefined();
    expect(queryByTestId(document.body, "forkcount")).toBeNull();

    document.body.innerHTML = renderRepoCard({
      ...data_repo.repository,
      stargazers: { totalCount: 0 },
      forkCount: 0,
    });

    expect(queryByTestId(document.body, "stargazers")).toBeNull();
    expect(queryByTestId(document.body, "forkcount")).toBeNull();
  });
});
