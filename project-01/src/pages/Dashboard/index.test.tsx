import { fireEvent, render, screen } from "@testing-library/react";
//import { BrowserRouter } from "react-router-dom";
import Dashboard from ".";
import { fetchPokemonList } from "../../services/PokemonService";
import { faker } from "@faker-js/faker";

const navigateMock = vi.fn();

const mockFetchListPokemonFn = vi
    .fn(fetchPokemonList)
    .mockImplementation(async () => {
        return [
            {
                id: 1,
                name: "Pikachu",
                image: faker.image.avatar(),
                type: "Electric",
            },
            {
                id: 3,
                name: "Charmander",
                image: faker.image.avatar(),
                type: "Fire",
            },
        ];
    });

describe("Testa o componente Dashboard", () => {
    vi.mock("react-router-dom", () => ({
        useNavigate() {
            return navigateMock;
        },
        Link: vi.fn().mockImplementation((props) => props.children),
    }));

    // ****** Exemplo sem mocar o useNavigate com <BrowserRouter><Dashboard fetchPokemonList={mockFetchListPokemonFn} /></BrowserRouter>
    // test("Deve haver um título escrito Dashboard", async () => {
    //     render(
    //         <BrowserRouter>
    //             <Dashboard fetchPokemonList={mockFetchListPokemonFn} />
    //         </BrowserRouter>
    //     );
    //     const title = await screen.findByRole("heading", {
    //         name: "Dashboard",
    //     });
    //     expect(title).toHaveTextContent("Dashboard");
    // });

    test("Deve haver um título escrito Dashboard", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);
        const title = await screen.findByRole("heading", {
            name: "Dashboard",
        });
        expect(title).toHaveTextContent("Dashboard");
    });

    test("Deve haver uma lista com 10 Pokemons", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);
        const list = await screen.findAllByRole("listitem");

        expect(list).toHaveLength(2);
    });

    test("Deve haver um Picachu na Lista", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);
        const pikachu = await screen.findByText("Pikachu");

        expect(pikachu).toBeInTheDocument();
    });

    test("Deve ser possível clicar na li para abrir a página de detail", async () => {

        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);

        const link = await screen.findByText("Pikachu");

        fireEvent.click(link)

        expect(navigateMock).toHaveBeenCalledTimes(1)

    });

});
