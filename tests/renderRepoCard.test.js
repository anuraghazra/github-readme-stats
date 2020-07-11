require("@testing-library/jest-dom");
const renderRepoCard = require("../src/renderRepoCard");

const { queryByTestId } = require("@testing-library/dom");

const data_repo = {
  repository: {
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

    expect(document.getElementsByClassName("header")[0]).toHaveTextContent(
      "convoychat"
    );
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
});
