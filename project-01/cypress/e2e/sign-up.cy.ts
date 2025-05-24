describe("Testa a página de Sign Up", () => {
    it("Deve haver um título 'Cadastre-se'", () => {
        cy.visit("/sign-up");
        cy.contains("Cadastre-se");
    });
    it("Deve haver um campo de texto para o nome", () => {
        cy.visit("/sign-up");
        cy.get("input[placeholder='Insira seu nome']").should("be.visible");
    });
    it("Deve haver um campo de texto para o e-mail", () => {
        cy.visit("/sign-up");
        cy.get("input[placeholder='Insira seu e-mail']").should("be.visible");
    });
    it("Deve haver um campo de texto para a senha", () => {
        cy.visit("/sign-up");
        cy.get("input[placeholder='Insira sua senha']").should("be.visible");
    });
    it("Deve haver um botão 'Sign Up'", () => {
        cy.visit("/sign-up");
        cy.contains("Sign Up");
    });
    it("Deve haver um link 'Já tem cadastro? Clique aqui!'", () => {
        cy.visit("/sign-up");
        cy.contains("Já tem cadastro? Clique aqui!");
    });

    it("Quando clicar em Sign Up deve ir para a página de Dashboard", () => {
        cy.visit("/sign-up");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });
        cy.contains("Sign Up").click();

        cy.contains("Dashboard");
    });

    it("Quando clicar em Já tem cadastro? Clique aqui! deve ir para login", () => {
        cy.visit("/sign-up");
        cy.contains("Já tem cadastro? Clique aqui!").click();
        cy.contains("Sign In");
    });

    it("O botão deve ter 10px de margin top", () => {
        cy.visit("/sign-up");
        cy.get("div")
            .find("button")
            .should("have.css", "marginTop")
            .and("eq", "10px");
        cy.get("div")
            .find("button")
            .should("have.css", "marginTop")
            .and("match", /10px/);
    });
});
