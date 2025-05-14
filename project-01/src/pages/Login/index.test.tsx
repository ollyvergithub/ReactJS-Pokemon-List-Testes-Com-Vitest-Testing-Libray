import { fireEvent, render, screen } from "@testing-library/react";
import Login from ".";

const navigateMock = vi.fn();

describe("Testa o componente Login", () => {
    vi.mock("react-router-dom", () => ({
        useNavigate() {
            return navigateMock;
        },
        Link: vi.fn().mockImplementation((props) => props.children),
    }));

    test("Deve haver um título", async () => {
        render(<Login />);
        const title = await screen.findByRole("heading", {
            name: "Sign In",
        });
        expect(title).toBeInTheDocument();
    });

    test("Deve haver um título escrito Login", async () => {
        render(<Login />);
        const title = await screen.findByRole("heading", {
            name: "Sign In",
        });
        expect(title.textContent).toBe("Sign In");
    });

    test("Devem haver 02 inputs na minha tela", async () => {
        render(<Login />);
        const inputs = await screen.findAllByRole("textbox");
        expect(inputs).toHaveLength(2);
    });

    test("Testando os placeholders dos inputs", async () => {
        render(<Login />);
        const inputs = await screen.findAllByRole("textbox");

        expect(inputs[0]).toHaveAttribute("placeholder", "Insira seu e-mail");
        expect(inputs[1]).toHaveAttribute("placeholder", "Insira sua senha");
    });

    test("Deve haver um input para e-mail", async () => {
        render(<Login />);
        const inputEmail = await screen.findByPlaceholderText(
            "Insira seu e-mail"
        );

        expect(inputEmail).toBeInTheDocument();
    });

    test("Deve haver um input para senha", async () => {
        render(<Login />);
        const inputSenha = await screen.findByPlaceholderText(
            "Insira sua senha"
        );

        expect(inputSenha).toBeInTheDocument();
    });

    test("Deve haver um botão", async () => {
        render(<Login />);
        const btn = await screen.findByRole("button", {
            name: "Login",
        });
        expect(btn).toBeInTheDocument();
    });

    test("Deve simular clique no botão login", async () => {
        render(<Login />);

        const button = await screen.findByRole("button");

        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    test("Deve haver um link para a página de Sign Up", async () => {
        render(<Login />);

        const link = await screen.findByText("Não tem cadastro? Clique aqui!");

        expect(link).toBeInTheDocument();
    });
});
