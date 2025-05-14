import { render, screen } from "@testing-library/react";
import PokemonDetail from ".";
import { fetchPokemonDetail } from "../../services/PokemonService";
import { faker } from "@faker-js/faker";
import { useParams } from "react-router-dom";

// Mock do react-router-dom antes de qualquer import/execução
vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
    Link: vi.fn().mockImplementation((props) => props.children),
}));

const mockFetchPokemonDetailFn = vi
    .fn(fetchPokemonDetail)
    .mockImplementation(async () => ({
        id: 1,
        name: "Pikachu",
        image: faker.image.urlPicsumPhotos(),
        type: "Electric",
    }));

describe("Testa o componente PokemonDetail", () => {
    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        vi.clearAllMocks();
    });

    test("Deve haver um título na página", async () => {
        // Configura o mock do useParams para este teste específico
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

        const pikachu = await screen.findByText("Pikachu");

        expect(pikachu).toBeInTheDocument();
    });

    test("Deve ter um link para voltar", async () => {
        // Configura o mock do useParams para este teste específico
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

        const linkBack = await screen.findByText("Voltar")

        expect(linkBack).toBeInTheDocument()
    });

    test("Deve validar quando não vier parâmetro na rota", async () => {
        // Configura o mock do useParams para este teste específico
        vi.mocked(useParams).mockReturnValue({ id: "0" });

        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

        const errorText = await screen.findByText("O id não é válido!");
        expect(errorText).toBeInTheDocument();
    });

    test("Deve renderizar o pokemon quando o id for válido", async () => {
        // Configura o mock do useParams para este teste específico
        vi.mocked(useParams).mockReturnValue({ id: "1" });

        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

        expect(await screen.findByText("Pikachu")).toBeInTheDocument();
        expect(screen.getByText("Electric")).toBeInTheDocument();
    });
});
