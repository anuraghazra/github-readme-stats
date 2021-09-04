import "@testing-library/jest-dom";
import cssToObject from "css-to-object";
import GithubStatsCard from "../src/cards/github-stats";

console.log(cssToObject);

import {
  getByTestId,
  queryByTestId,
  queryAllByTestId,
} from "@testing-library/dom";
import themes from "../themes";
import { mockVercel } from "./utils/mock";

describe("Test renderStatsCard", () => {
  const stats = {
    name: "Anurag Hazra",
    totalStars: 100,
    totalCommits: 200,
    totalIssues: 300,
    totalPRs: 400,
    contributedTo: 500,
    rank: { level: "A+", score: 40 },
  };

  it("should render correctly", async () => {
    const { req, res } = mockVercel();
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats").mockImplementation(() => stats);
    const svgString = await card.generateSvgString(res.setHeader);

    document.body.innerHTML = svgString;

    expect(queryByTestId(document.body, "header").textContent).toBe(
      "Anurag Hazra's GitHub Stats",
    );

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("195");
    expect(getByTestId(document.body, "stars").textContent).toBe("100");
    expect(getByTestId(document.body, "commits").textContent).toBe("200");
    expect(getByTestId(document.body, "issues").textContent).toBe("300");
    expect(getByTestId(document.body, "prs").textContent).toBe("400");
    expect(getByTestId(document.body, "contribs").textContent).toBe("500");
    expect(queryByTestId(document.body, "card-bg")).toBeInTheDocument();
    expect(queryByTestId(document.body, "rank-circle")).toBeInTheDocument();

    spy.mockRestore();
  });

  it("should have proper name apostrophe", async () => {
    const { req, res } = mockVercel();
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => ({ ...stats, name: "Anil Das" }));
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(queryByTestId(document.body, "header").textContent).toBe(
      "Anil Das' GitHub Stats",
    );

    spy.mockImplementation(() => ({ ...stats, name: "Felix" }));
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(queryByTestId(document.body, "header").textContent).toBe(
      "Felix' GitHub Stats",
    );
    spy.mockRestore();
  });

  it("should hide individual stats", async () => {
    const { req, res } = mockVercel({ hide: ["issues", "prs", "contribs"] });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("height"),
    ).toBe("150"); // height should be 150 because we clamped it.

    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(queryByTestId(document.body, "commits")).toBeDefined();
    expect(queryByTestId(document.body, "issues")).toBeNull();
    expect(queryByTestId(document.body, "prs")).toBeNull();
    expect(queryByTestId(document.body, "contribs")).toBeNull();
    spy.mockRestore();
  });

  it("should hide_rank", async () => {
    const { req, res } = mockVercel({ hide_rank: "true" });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(queryByTestId(document.body, "rank-circle")).not.toBeInTheDocument();
    spy.mockRestore();
  });

  it("should render default colors properly", async () => {
    const { req, res } = mockVercel({ hide_rank: "true" });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    const styles = document.querySelector("style").textContent;
    const stylesObject = cssToObject(styles);

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];
    const iconFill = stylesObject[".icon"];

    expect(primaryFill.fill).toBe("#2f80ed");
    expect(textFill.fill).toBe("#333");
    expect(iconFill.fill).toBe("#4c71f2");
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#fffefe",
    );
    spy.mockRestore();
  });

  it("should render custom colors properly", async () => {
    const customColors = {
      title_color: "5a0",
      icon_color: "1b998b",
      text_color: "9991",
      bg_color: "252525",
    };

    const { req, res } = mockVercel({ ...customColors });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];
    const iconFill = stylesObject[".icon"];

    expect(primaryFill.fill).toBe(`#${customColors.title_color}`);
    expect(textFill.fill).toBe(`#${customColors.text_color}`);
    expect(iconFill.fill).toBe(`#${customColors.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      "#252525",
    );
    spy.mockRestore();
  });

  it("should render custom colors with themes", async () => {
    const { req, res } = mockVercel({
      title_color: "5a0",
      theme: "radical",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);

    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];
    const iconFill = stylesObject[".icon"];

    expect(primaryFill.fill).toBe("#5a0");
    expect(textFill.fill).toBe(`#${themes.radical.text_color}`);
    expect(iconFill.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
    spy.mockRestore();
  });

  it("should render with all the themes", async () => {
    Object.keys(themes).forEach(async (name) => {
      const { req, res } = mockVercel({
        theme: name,
      });
      const card = new GithubStatsCard(req.query);
      const spy = jest.spyOn(card, "fetchStats");
      spy.mockImplementation(() => stats);
      document.body.innerHTML = await card.generateSvgString(res.setHeader);

      const styleTag = document.querySelector("style");
      const stylesObject = cssToObject(styleTag.innerHTML);

      const primaryFill = stylesObject[".primary-fill"];
      const textFill = stylesObject[".text-fill"];
      const iconFill = stylesObject[".icon"];

      expect(primaryFill.fill).toBe(`#${themes[name].title_color}`);
      expect(textFill.fill).toBe(`#${themes[name].text_color}`);
      expect(iconFill.fill).toBe(`#${themes[name].icon_color}`);
      expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
        "fill",
        `#${themes[name].bg_color}`,
      );
      spy.mockRestore();
    });
  });

  it("should render custom colors with themes and fallback to default colors if invalid", async () => {
    const { req, res } = mockVercel({
      title_color: "invalid color",
      text_color: "invalid color",
      theme: "radical",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");
    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    const styleTag = document.querySelector("style");
    const stylesObject = cssToObject(styleTag.innerHTML);
    const primaryFill = stylesObject[".primary-fill"];
    const textFill = stylesObject[".text-fill"];
    const iconFill = stylesObject[".icon"];

    expect(primaryFill.fill).toBe(`#${themes.default.title_color}`);
    expect(textFill.fill).toBe(`#${themes.default.text_color}`);
    expect(iconFill.fill).toBe(`#${themes.radical.icon_color}`);
    expect(queryByTestId(document.body, "card-bg")).toHaveAttribute(
      "fill",
      `#${themes.radical.bg_color}`,
    );
    spy.mockRestore();
  });

  it("should render icons correctly", async () => {
    const { req, res } = mockVercel({
      show_icons: "true",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    expect(queryAllByTestId(document.body, "icon")[0]).toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling, // the label
    ).toHaveAttribute("x", "25");
    spy.mockRestore();
  });

  it("should not have icons if show_icons is false", async () => {
    const { req, res } = mockVercel({
      show_icons: "false",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    expect(queryAllByTestId(document.body, "icon")[0]).not.toBeDefined();
    expect(queryByTestId(document.body, "stars")).toBeDefined();
    expect(
      queryByTestId(document.body, "stars").previousElementSibling, // the label
    ).toHaveAttribute("x", "0");
    spy.mockRestore();
  });

  it("should auto resize if hide_rank is true", async () => {
    const { req, res } = mockVercel({
      hide_rank: "true",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("305.81250000000006");
    spy.mockRestore();
  });

  it("should auto resize if hide_rank is true & custom_title is set", async () => {
    const { req, res } = mockVercel({
      hide_rank: "true",
      custom_title: "Hello world",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);

    expect(
      document.body.getElementsByTagName("svg")[0].getAttribute("width"),
    ).toBe("270");
    spy.mockRestore();
  });

  it("should render translations", async () => {
    const { req, res } = mockVercel({
      locale: "cn",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats");

    spy.mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(queryByTestId(document.body, "header").textContent).toBe(
      "Anurag Hazra 的 GitHub 统计数据",
    );
    expect(
      document.querySelector(
        'g[transform="translate(0, 0)"]>.fadeIn>.font-bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"获标星数（star）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 25)"]>.fadeIn>.font-bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"累计提交数（commit） (2021):"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 50)"]>.fadeIn>.font-bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"拉取请求数（PR）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 75)"]>.fadeIn>.font-bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"指出问题数（issue）:"`);
    expect(
      document.querySelector(
        'g[transform="translate(0, 100)"]>.fadeIn>.font-bold',
      ).textContent,
    ).toMatchInlineSnapshot(`"参与项目数:"`);
    spy.mockRestore();
  });

  it("should render without rounding", async () => {
    const { req, res } = mockVercel({
      border_radius: "0",
    });
    const card = new GithubStatsCard(req.query);
    const spy = jest.spyOn(card, "fetchStats").mockImplementation(() => stats);
    document.body.innerHTML = await card.generateSvgString(res.setHeader);
    expect(document.querySelector("rect")).toHaveAttribute("rx", "0");
    spy.mockRestore();
  });
});
