import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainRoutes from "../routes";
import { faker } from "@faker-js/faker";

import { fetchPokemonList } from "../services/PokemonService";



// Mock básico vazio
vi.mock("../services/PokemonService");

// Mock da função fetchPokemonList
// vi.mock("../services/PokemonService", () => ({
//     fetchPokemonList: vi.fn().mockResolvedValue([
//         {
//             id: 1,
//             name: "Pikachu",
//             image: "https://example.com/pikachu.jpg",
//             type: "Electric",
//         },
//     ]),
//     fetchPokemonDetail: vi.fn(),
// }));

describe("Testa o componente MainRoutes", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Configuração padrão que pode ser sobrescrita do Mock da função fetchPokemonList
    vi.mocked(fetchPokemonList).mockResolvedValue([{
      id: 1,
      name: "Pikachu",
      image: faker.image.urlPicsumPhotos(), // ✅ Aqui pode usar faker
      type: "Electric"
    }]);


    test("Deve renderizar a página de Login", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <MainRoutes />
            </MemoryRouter>
        );

        const title = screen.getByText("Sign In");
        expect(title).toBeInTheDocument();
    });

    test("Deve renderizar a página de Cadastro", async () => {
        render(
            <MemoryRouter initialEntries={["/sign-up"]}>
                <MainRoutes />
            </MemoryRouter>
        );

        const title = screen.getByText("Cadastre-se");
        expect(title).toBeInTheDocument();
    });

    test("Deve renderizar a página de Dashboard", async () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <MainRoutes />
            </MemoryRouter>
        );

        // Use findByText para esperar a renderização assíncrona
        const title = await screen.findByText("Dashboard");
        expect(title).toBeInTheDocument();
    });

    test("Deve renderizar a página de Not Found", async () => {
        render(
            <MemoryRouter initialEntries={["/qualquerrota"]}>
                <MainRoutes />
            </MemoryRouter>
        );

        const title = screen.getByText("404 Page Not Found");
        expect(title).toBeInTheDocument();
    });
});
