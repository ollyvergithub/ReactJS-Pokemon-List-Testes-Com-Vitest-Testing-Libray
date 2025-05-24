describe("Testa a página de login", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Quando clicar em login deve ir para a página de Dashboard", () => {
        //cy.visit("/");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.contains("Login").click();
        cy.contains('Dashboard').should('be.visible')
        cy.contains("Dashboard");
    });

    it("Quando clicar em login deve ir para a página de Dashboard e ter um Pokenon Picachu", () => {
        //cy.visit("/");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.contains("Login").click();
        cy.contains("Dashboard");
        cy.contains("Pikachu");
    });

    it("Quando clicar em login deve ir para a página de Dashboard e ter um Pokenon Picachu", () => {
        //cy.visit("/");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.contains("Login").click();
        cy.contains("Dashboard");
        cy.contains("Pikachu");
    });

    it("Quando clicar em Não tem cadastro? Clique aqui! deve ir para sign-up", () => {
        //cy.visit("/");

        cy.contains("Não tem cadastro? Clique aqui!").click();
        cy.contains("Cadastre-se");
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

    it("Deve preencher o input de login com ollyverottoboni.gmail.com e o input de senha com 123456", () => {
        //cy.visit("/");
        cy.get(
            'input[type="email"], input[name="email"], input[placeholder*="e-mail"]'
        ).type("ollyverottoboni.gmail.com");

        cy.get(
            'input[type="email"], input[name="email"], input[placeholder*="e-mail"]'
        ).should("have.value", "ollyverottoboni.gmail.com");

        cy.get(
            'input[type="email"], input[name="email"], input[placeholder*="senha"]'
        ).type("123456");

        cy.get(
            'input[type="email"], input[name="email"], input[placeholder*="senha"]'
        ).should("have.value", "123456");
    });
});
