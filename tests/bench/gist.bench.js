import { benchmarkSuite } from "jest-bench";
import gist from "../../api/gist.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { jest } from "@jest/globals";

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
mock.onPost("https://api.github.com/graphql").reply(200, gist_data);

benchmarkSuite("test /api/gist", {
  ["simple request"]: async () => {
    const req = {
      query: {
        id: "bbfce31e0217a3689c8d961a356cb10d",
      },
    };
    const res = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };

    await gist(req, res);
  },
});
