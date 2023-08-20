import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect, it, describe, afterEach } from "@jest/globals";
import { fetchGist } from "../src/fetchers/gist-fetcher.js";

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
          {
            name: "territories.txt",
            language: {
              name: "Text",
            },
            size: 87858,
          },
          {
            name: "countries_spanish.json",
            language: {
              name: "JSON",
            },
            size: 85858,
          },
          {
            name: "territories_spanish.txt",
            language: {
              name: "Text",
            },
            size: 87858,
          },
        ],
      },
    },
  },
};

const gist_errors_data = {
  errors: [
    {
      message: "Some test GraphQL error",
    },
  ],
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe("Test fetchGist", () => {
  it("should fetch gist correctly", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, gist_data);

    let gist = await fetchGist("bbfce31e0217a3689c8d961a356cb10d");

    expect(gist).toStrictEqual({
      name: "countries.json",
      nameWithOwner: "Yizack/countries.json",
      description:
        "List of countries and territories in English and Spanish: name, continent, capital, dial code, country codes, TLD, and area in sq km. Lista de países y territorios en Inglés y Español: nombre, continente, capital, código de teléfono, códigos de país, dominio y área en km cuadrados. Updated 2023",
      language: "Text",
      starsCount: 33,
      forksCount: 11,
    });
  });

  it("should throw error if reaponse contains them", async () => {
    mock.onPost("https://api.github.com/graphql").reply(200, gist_errors_data);

    await expect(fetchGist("bbfce31e0217a3689c8d961a356cb10d")).rejects.toThrow(
      "Some test GraphQL error",
    );
  });

  it("should throw error if id is not provided", async () => {
    await expect(fetchGist()).rejects.toThrow(
      'Missing params "id" make sure you pass the parameters in URL',
    );
  });
});
