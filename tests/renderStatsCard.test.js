require("@testing-library/jest-dom");
const renderStatsCard = require("../src/renderStatsCard");

const { getByTestId, queryByTestId } = require("@testing-library/dom");

describe("Test renderStatsCard", () => {
  const stats = {
    name: "Anurag Hazra",
    totalStars: 100,
    totalCommits: 200,
    totalIssues: 300,
    totalPRs: 400,
    contributedTo: 500,
  };

  it("should render correctly", () => {
    document.body.innerHTML = renderStatsCard(stats);

    expect(document.getElementsByClassName("header")[0].textContent).toBe(
      "Anurag Hazra's GitHub Stats"
    );

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height")
    ).toBe("195");
    expect(getByTestId(document.body, "stars").textContent).toBe("100");
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
    expect(getByTestId(document.body, "issues").textContent).toBe("300");
    expect(getByTestId(document.body, "prs").textContent).toBe("400");
    expect(getByTestId(document.body, "contribs").textContent).toBe("500");
    expect(queryByTestId(document.body, "card-border")).toBeInTheDocument();
  });

  it("should hide individual stats", () => {
    document.body.innerHTML = renderStatsCard(stats, {
      hide: "['issues', 'prs', 'contribs']",
    });

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height")
    ).toBe("120");
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(queryByTestId(document.body, "commits")).toBeDefined();
    expect(queryByTestId(document.body, "issues")).toBeNull();
    expect(queryByTestId(document.body, "prs")).toBeNull();
    expect(queryByTestId(document.body, "contribs")).toBeNull();
  });

  it("should hide_border", () => {
    document.body.innerHTML = renderStatsCard(stats, { hide_border: true });

    expect(queryByTestId(document.body, "card-border")).not.toBeInTheDocument();
  });
});
