/// <reference types="cypress" />
const moment = require('moment');
const { type } = require("os");
describe('Test TSS Group stranka', () => {
    
    });
        it("Localization SK_1", () => {
            const urlRedirects = [];
            cy.clearCookies()
          .clearLocalStorage()
          .visit("https://www.tssgroup.sk/prihlasenie")
          .get('#user_login').clear().type("webtest2@tssgroup.cz")
          .get('#user_password').type("Lubos123")
          
          // Definuje URL na zachytenie
          cy.intercept({
            url: "https://www.tssgroup.sk/prihlasenie*"
             }).as("apiRequest")
             
             // Sleduje zmeny v rediretctoch a zadáva ich do urlRedirects array
             cy.on('url:changed', (url) => {
                urlRedirects.push(url);
                });
                
             // Login
             cy.get("#tss_login_form").click()
             
         // čaká na API odpoveď a porovná či odpoveď je ako sa očakáva
         cy.wait('@apiRequest').then((interception) => {
                assert.isNotNull(interception.response.body, 'API response is not null')
                expect(interception.response.statusCode).to.equal(302);
                
                // Overí či daný ulRedcirect je na správnej URL (nutné definovať baseUrl v cypress config.js) 
                cy
                .then(() => {
      expect(urlRedirects).to.have.length(2);
      expect(urlRedirects[1]).to.eq(`${Cypress.config('baseUrl')}/moja-firma`);
                cy.get('.hidden-xs').should("have.text", "(webtest2@tssgroup.cz)")
        cy.get('.title-lg').should("have.text", "Moja firma")  
        cy.get('.col-md-9 > :nth-child(2)').should("have.text", "Vitajte v klientskej zóne Moje TSS!")
        cy.get("#js-catalogue-navigation").should("be.visible").children().should("have.length", 1)
        cy.get('.active > a').should("be.visible").should("have.text", "Moja firma")
        cy.get('#js-catalogue-navigation > .nav > :nth-child(2) > a').should("have.text", "Moje objednávky")
        cy.get('#js-catalogue-navigation > .nav > :nth-child(3) > a').should("have.text", "Moje faktúry")
        cy.get('#js-catalogue-navigation > .nav > :nth-child(4) > a').should("have.text", "Moje reklamácie")
        cy.get('.nav > :nth-child(5) > a').should("have.text", "Moje zoznamy")
        cy.get('.nav > :nth-child(6) > a').should("have.text", "Moje ponuky od TSS")
        cy.get('.nav > :nth-child(7) > a').should("have.text", "Moje cenové ponuky")
        cy.get('.nav > :nth-child(8) > a').should("have.text", "Moje zápožičky")
        cy.get('.nav > :nth-child(9) > a').should("have.text", "Moje cenníky")
        cy.get('.nav > :nth-child(10) > a').should("have.text", "XML export")
        cy.get(':nth-child(11) > a').should("have.text", "Moje nastavenia")
        cy.get(':nth-child(12) > a').should("have.text", "Správa užívateľov")
        cy.get(':nth-child(13) > .text-danger').should("have.text", "Odhlásenie")
});
});
});
