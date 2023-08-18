import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect, it, describe, afterEach } from "@jest/globals";
import { renderGistCard } from "../src/cards/gist-card.js";
import gist from "../api/gist.js";

const gist_data = {
  data: {
    viewer: {
      gist: {
        description:
          "List of countries and territories in English and Spanish: name, continent, capital, dial code, country codes, TLD, and area in sq km. Lista de países y territorios en Inglés y Español: nombre, continente, capital, código de teléfono, códigos de país, dominio y área en km cuadrados. Updated 2023",
        owner: {
          login: "Yizack",
        },
        stargazerCount: 33,
        forks: {
          totalCount: 11,
        },
        files: [
          {
            name: "countries.json",
            language: {
              name: "JSON",
            },
            size: 85858,
          },
        ],
      },
    },
  },
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test /api/gist", () => {
  it("should test the request", async () => {
    const req = {
      query: {
        id: "bbfce31e0217a3689c8d961a356cb10d",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, gist_data);

    await gist(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderGistCard({
        name: gist_data.data.viewer.gist.files[0].name,
        nameWithOwner: `${gist_data.data.viewer.gist.owner.login}/${gist_data.data.viewer.gist.files[0].name}`,
        description: gist_data.data.viewer.gist.description,
        language: gist_data.data.viewer.gist.files[0].language.name,
        starsCount: gist_data.data.viewer.gist.stargazerCount,
        forksCount: gist_data.data.viewer.gist.forks.totalCount,
      }),
    );
  });

  it("should get the query options", async () => {
    const req = {
      query: {
        title_color: "fff",
        icon_color: "fff",
        text_color: "fff",
        bg_color: "fff",
        show_owner: true,
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };
    mock.onPost("https://api.github.com/graphql").reply(200, gist_data);

    await gist(req, res);

    expect(res.setHeader).toBeCalledWith("Content-Type", "image/svg+xml");
    expect(res.send).toBeCalledWith(
      renderGistCard(
        {
          name: gist_data.data.viewer.gist.files[0].name,
          nameWithOwner: `${gist_data.data.viewer.gist.owner.login}/${gist_data.data.viewer.gist.files[0].name}`,
          description: gist_data.data.viewer.gist.description,
          language: gist_data.data.viewer.gist.files[0].language.name,
          starsCount: gist_data.data.viewer.gist.stargazerCount,
          forksCount: gist_data.data.viewer.gist.forks.totalCount,
        },
        { ...req.query },
      ),
    );
  });
});
