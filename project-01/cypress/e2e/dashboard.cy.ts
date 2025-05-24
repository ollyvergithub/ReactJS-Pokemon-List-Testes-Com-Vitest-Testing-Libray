describe("Testa a página de Dashboard", () => {
    it("Deve carregar uma lista com 03 Pokemons", () => {
        cy.visit("/dashboard");
        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.contains("Pikachu");
        cy.contains("Rotom");
        cy.contains("Charmander");
        // cy.contains("Dashboard");
        // cy.get('[data-cy="pokemon-list"]').should("have.length", 3);
        // cy.get('[data-cy="pokemon-1"]').should("be.visible");
        // cy.get('[data-cy="pokemon-2"]').should("be.visible");
        // cy.get('[data-cy="pokemon-3"]').should("be.visible");
        // cy.get('[data-cy="pokemon-1"]').contains("Pikachu");
        // cy.get('[data-cy="pokemon-2"]').contains("Charmander");
        // cy.get('[data-cy="pokemon-3"]').contains("Bulbasaur");
        // cy.get('[data-cy="pokemon-1"]').find("img").should("have.attr", "src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
        // cy.get('[data-cy="pokemon-2"]').find("img").should("have.attr", "src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
        // cy.get('[data-cy="pokemon-3"]').find("img").should("have.attr", "src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
    });

    it("Quando clicar em um Pokemon deve ir para a página de detalhes e ao clicar em voltar deve haver 03 Pokemons", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.intercept("GET", "http://localhost:3000/pokemon/1", {
            fixture: "pokemon-detail.json",
        });

        cy.contains("Pikachu").click();

        cy.contains("Voltar").click();

        cy.contains("Pikachu");
        cy.contains("Rotom");
        cy.contains("Charmander");
    });

    it("Devem haver 3 pokemons na tela com li's", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemon-list.json",
        });

        cy.get("div")
            .find("li")
            .should(($li) => {
                expect($li).to.have.length(3);

                const pikachu = $li[0];
                const rotom = $li[1];
                const charmander = $li[2];

                expect(pikachu.textContent).to.contain("Pikachu");
                expect(rotom.textContent).to.contain("Rotom");
                expect(charmander.textContent).to.contain("Charmander");
            });
    });
});
