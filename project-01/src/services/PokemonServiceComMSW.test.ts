import { PokemonType } from "../types/PokemonTypes";
import { fetchPokemonList, fetchPokemonDetail } from "./PokemonService";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

const mockPokemonList: PokemonType[] = [
  {
    id: 1,
    name: "Pikachu",
    image: "https://example.com/pikachu.jpg",
    type: "Electric",
  },
];

const mockPokemonDetail: PokemonType = {
  id: 1,
  name: "Pikachu",
  image: "https://example.com/pikachu.jpg",
  type: "Electric",
};

const server = setupServer(
  http.get("http://localhost:3000/pokemon", () => {
    return HttpResponse.json(mockPokemonList);
  }),
  http.get("http://localhost:3000/pokemon/:id", ({ params }) => {
    const { id } = params;
    if (id === "1") {
      return HttpResponse.json(mockPokemonDetail);
    }
    return new HttpResponse(null, { status: 404, statusText: "Not Found" });
  })
);

describe("PokemonService", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("fetchPokemonList", () => {
    it("deve retornar uma lista de pokémons", async () => {
      const result = await fetchPokemonList();
      expect(result).toEqual(mockPokemonList);
    });

    it("deve lidar com erro na requisição", async () => {
      server.use(
        http.get("http://localhost:3000/pokemon", () => {
          return new HttpResponse(null, { status: 500, statusText: "Server Error" });
        })
      );

      await expect(fetchPokemonList()).rejects.toThrow("Failed to fetch: Server Error");
    });
  });

  describe("fetchPokemonDetail", () => {
    it("deve retornar os detalhes de um pokémon", async () => {
      const result = await fetchPokemonDetail(1);
      expect(result).toEqual(mockPokemonDetail);
    });

    it("deve lidar com erro quando o pokémon não existe", async () => {
      await expect(fetchPokemonDetail(999)).rejects.toThrow("Failed to fetch: Not Found");
    });

    it("deve lidar com erro na requisição", async () => {
      server.use(
        http.get("http://localhost:3000/pokemon/:id", () => {
          return new HttpResponse(null, { status: 500, statusText: "Server Error" });
        })
      );

      await expect(fetchPokemonDetail(1)).rejects.toThrow("Failed to fetch: Server Error");
    });
  });
});
