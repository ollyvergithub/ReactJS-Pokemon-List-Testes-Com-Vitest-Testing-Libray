describe("Testa a página Pokemon Detail", () => {
    it("Deve renderizar um Pokemon", () => {
        cy.intercept("GET", "http://localhost:3000/pokemon/1", {
            fixture: "pokemon-detail.json",
        });

        cy.visit("/pokemon-detail/1");
        cy.contains("Pikachu");
        cy.get("img").should(
            "have.attr",
            "src",
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png"
        );
    });

    it("Deve haver 02 divs na página", () => {
        cy.intercept("GET", "http://localhost:3000/pokemon/1", {
            fixture: "pokemon-detail.json",
        });

        cy.visit("/pokemon-detail/1");

        cy.get("div")
            .find("div")
            .should(($div) => {
                expect($div).to.have.length(2);

                const className = $div[0].className;
                expect(className).to.match(/container/);
            })
            .then(($div) => {
                expect($div).to.have.css("display", "flex");
            });
    });

    it("Deve haver um link 'Voltar'", () => {
        cy.intercept("GET", "http://localhost:3000/pokemon/1", {
            fixture: "pokemon-detail.json",
        });
        cy.visit("/pokemon-detail/1");
        cy.get("a").contains("Voltar").should("be.visible");
    });
});
