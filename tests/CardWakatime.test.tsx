import "@testing-library/jest-dom";
import {
  genWakatimeMockData,
  mockWakaTimeRequest,
  mockVercel,
} from "./utils/mock";
import api from "../api/[key]";
import WakaTimeCard from "../src/cards/wakatime";

it("should test the request", async () => {
  const { req, res } = mockVercel({
    key: "wakatime",
  });
  mockWakaTimeRequest(genWakatimeMockData());
  await api(req, res);

  expect(res.send).toBeCalledWith(
    await new WakaTimeCard(req.query).generateSvgString(res.setHeader),
  );
});

it("should work with the query options", async () => {
  const { req, res } = mockVercel({
    key: "wakatime",
    line_height: "24",
    hide_progress: "true",
    hide_title: "false",
    custom_title: "Last 7 Days WakaTime",
    layout: "compact",
    langs_count: "7",
  });
  mockWakaTimeRequest(genWakatimeMockData());
  await api(req, res);

  expect(res.send).toBeCalledWith(
    await new WakaTimeCard(req.query).generateSvgString(res.setHeader),
  );
});
