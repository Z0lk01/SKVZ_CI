/// <reference types="cypress" />
const { type } = require("os");
describe('Test TSS', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        cy.clearCookies()
          .clearLocalStorage()
          .visit("https://support.tssmonitoring.sk/login")
          .get('#user_login').type(username)
          .get('#user_pass').type(password)
          .get("#wp-submit").click()
          .wait(15000);
    });
        
    it("Component 1", () => {
        cy.get("#main_menu_search")
          .should("be.visible")
          .should("have.attr", "placeholder", "Vyhľadávanie")   
          .type("Online")
          .get("#main-menu-wrapper").children().should('have.length', 3)
          .get(".fa-remove").should("be.visible").should("have.attr", "onclick", "clear_search_bar();")
          .click()
          .get("#main-menu-wrapper li.favorites > a ").should("have.text", "Obľúbené").should('have.css', 'background-color', 'rgb(89, 89, 89)')
          
          //označenie elementu a použitie funkcie .then()na extrakciu "outerText" a porovnanie s očakávaným textom
          .get('#li-online-menu').then($el => {
                const outerText = $el[0].outerText;
                expect(outerText).to.equal('Online')
        });
         cy.get('#li-online-menu')  
             .click()
          .get('#gps_map_main').should("be.visible").children().should("have.length", 3)
          .get("#gps_map_main")
             .click()
         .get('#units-online-search')
         .should("have.attr" , "placeholder", "Hľadať vozidlo / osobu")
         .type("942DE")
         cy.intercept({
            method: 'POST',
            url: "https://support.tssmonitoring.sk/api/v1.3/onlines/index.json?f=onlines_index&callback=jQuery*"
             }).as("apiRequest")
        cy.get('.away > b').click()
        cy.wait('@apiRequest').then((interception) => {
                assert.isNotNull(interception.response.body, 'API response is not null')
                expect(interception.response.statusCode).to.equal(200);
        cy.get('#units-drives-calendar-toggle > .fa-calendar').should("be.visible").click()
        cy.get('#units-drives-calendar-toggle-datepicker-calendar-parent > .daterangepicker').should("be.visible")
        cy.get('#units-drives-calendar-toggle-datepicker-calendar-parent > .daterangepicker').should("be.visible")
        cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .month > .monthselect').select(7).should("have.value", "7")
        cy.get("#units-online-title").should("be.visible").should("have.text", "Späť na všetky vozidlá").should("have.css","background-color", "rgb(233, 30, 99)")
        
        






       

       

          
            


     });
 });
});
