import { fetchPokemonList, fetchPokemonDetail } from "./PokemonService";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// Configuração do servidor mock
const server = setupServer(
  http.get("http://localhost:3000/pokemon", () => {
    return HttpResponse.json([]);
  }),
  http.get("http://localhost:3000/pokemon/:id", () => {
    return HttpResponse.json({});
  })
);

describe("Testa Pokemon Service", () => {
  beforeAll(() => {
    server.listen();
    // Mock do console.error para evitar poluição nos logs
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });

  afterAll(() => server.close());

  it("Verifica se foi feito um get list para a url correta", async () => {
    // Mock específico para este teste
    server.use(
      http.get("http://localhost:3000/pokemon", ({ request }) => {
        expect(request.url).toBe("http://localhost:3000/pokemon");
        return HttpResponse.json([]);
      })
    );

    await fetchPokemonList();
  });

  it("Verifica se foi feito um get detail para a url correta", async () => {
    const testId = 1;
    // Mock específico para este teste
    server.use(
      http.get(`http://localhost:3000/pokemon/${testId}`, ({ request }) => {
        expect(request.url).toBe(`http://localhost:3000/pokemon/${testId}`);
        return HttpResponse.json({});
      })
    );

    await fetchPokemonDetail(testId);
  });
});
