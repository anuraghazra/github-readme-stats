import { renderError } from "../src/helpers/CardRenderer";
import { mockVercel } from "./utils/mock";
import { CardError, URLQueryError } from "../src/helpers/Error";
import Card from "../src/cards/Card";

describe("Card Base Class", () => {
  describe("generateSvgString", () => {
    it("should run workflow when extend by sub Class", async () => {
      const callStack = jest.fn();
      class TestCard extends Card {
        preprocess(query) {
          callStack("preprocess");
          return super.preprocess(query);
        }
        checkProps() {
          callStack("checkProps");
          return super.checkProps();
        }
        fetchStats() {
          callStack("fetchStats");
          return super.fetchStats();
        }
        renderCard() {
          callStack("renderCard");
          return super.renderCard();
        }
        getCacheSeconds() {
          callStack("getCacheSeconds");
          return super.getCacheSeconds();
        }
      }

      const { req, res } = mockVercel({});
      const card = new TestCard(req.query, { title: { en: "Title" } });
      await card.generateSvgString(res.setHeader);
      expect(callStack.mock.calls).toEqual([
        ["preprocess"],
        ["checkProps"],
        ["fetchStats"],
        ["renderCard"],
        ["getCacheSeconds"],
      ]);
    });
    it("should render error card when throw error", async () => {
      const error = new CardError("Error", "Details");
      class TestCard extends Card {
        checkProps() {
          throw error;
        }
      }
      const { req, res } = mockVercel({});
      const card = new TestCard(req.query, { title: { en: "Title" } });
      const svgString = await card.generateSvgString(res.setHeader);
      expect(svgString).toBe(renderError(error));
    });
    it("should render query missing error when username is empty", async () => {
      const { res } = mockVercel();
      const card = new Card({}, { title: { en: "Title" } });
      const svgString = await card.generateSvgString(res.setHeader);
      expect(svgString).toBe(
        renderError(new URLQueryError(URLQueryError.TYPE.MISSING, "username")),
      );
    });
    it("should render query missing error when locale is not available", async () => {
      const { req, res } = mockVercel({
        locale: "fr",
      });
      const card = new Card(req.query, { title: { en: "Title" } });
      const svgString = await card.generateSvgString(res.setHeader);
      expect(svgString).toBe(
        renderError(
          new URLQueryError(URLQueryError.TYPE.NOT_SUPPORTED, "locale=fr"),
        ),
      );
    });
  });

  describe("getCacheSeconds", () => {
    it("should have proper cache", async () => {
      const { req, res } = mockVercel();
      await new Card(req.query, {
        title: { en: "Title" },
      }).generateSvgString(res.setHeader);
      expect(res.setHeader).toBeCalledWith(
        "Cache-Control",
        `public, max-age=${Card.CATCH_SECONDS.TWO_HOURS}`,
      );
    });

    it("should set proper cache", async () => {
      const { req, res } = mockVercel({
        cache_seconds: 8000,
      });
      await new Card(req.query, {
        title: { en: "Title" },
      }).generateSvgString(res.setHeader);
      expect(res.setHeader).toBeCalledWith(
        "Cache-Control",
        `public, max-age=${8000}`,
      );
    });

    it("should set proper cache with clamped values", async () => {
      {
        const { req, res } = mockVercel({
          cache_seconds: 200000,
        });
        await new Card(req.query, {
          title: { en: "Title" },
        }).generateSvgString(res.setHeader);
        expect(res.setHeader).toBeCalledWith(
          "Cache-Control",
          `public, max-age=${Card.CATCH_SECONDS.ONE_DAY}`,
        );
      }

      // note i'm using block scoped vars
      {
        const { req, res } = mockVercel({
          cache_seconds: 0,
        });
        await new Card(req.query, {
          title: { en: "Title" },
        }).generateSvgString(res.setHeader);
        expect(res.setHeader).toBeCalledWith(
          "Cache-Control",
          `public, max-age=${Card.CATCH_SECONDS.TWO_HOURS}`,
        );
      }

      {
        const { req, res } = mockVercel({
          cache_seconds: -10000,
        });
        await new Card(req.query, {
          title: { en: "Title" },
        }).generateSvgString(res.setHeader);
        expect(res.setHeader).toBeCalledWith(
          "Cache-Control",
          `public, max-age=${Card.CATCH_SECONDS.TWO_HOURS}`,
        );
      }
    });
  });
});
