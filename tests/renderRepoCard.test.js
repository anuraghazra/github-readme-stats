require("@testing-library/jest-dom");
const cssToObject = require("css-to-object");
const renderRepoCard = require("../src/renderRepoCard");

const { queryByTestId } = require("@testing-library/dom");

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
    const statClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe("#2f80ed");
    expect(statClassStyles.fill).toBe("#333");
    expect(iconClassStyles.fill).toBe("#586069");
    expect(queryByTestId(document.body, "card-border")).toHaveAttribute(
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
    const statClassStyles = stylesObject[".description"];
    const iconClassStyles = stylesObject[".icon"];

    expect(headerClassStyles.fill).toBe(`#${customColors.title_color}`);
    expect(statClassStyles.fill).toBe(`#${customColors.text_color}`);
    expect(iconClassStyles.fill).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-border")).toHaveAttribute(
      "fill",
      "#252525"
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
});
