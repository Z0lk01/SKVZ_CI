/// <reference types="cypress" />
const { type } = require("os");

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        // Login and setup
        cy.clearCookies()
          .clearLocalStorage()
          .visit("/")
          .get('#user_login').type(username)
          .get('#user_pass').type(password);

        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/getList/myUnits/Manage.json?f=units_getList&callback=jQuery*')
          .as('webloading');

        cy.get("#wp-submit").click();
        cy.wait('@webloading', { timeout: 10000 });
  });

  it('should check elements in vehicle settings', () => {
    cy.get('#li-settings')
    .should('be.visible')
    .click();
    cy.get('#units')
    .click();
    cy.get('#units_table_filter> :nth-child(1)')
    .should('be.visible')
    .type('IL 942DE')
    cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/read.json?f=units_read&callback=jQuery*')
    .as('settingsLoading');
    cy.get('#units_table> tbody> :nth-child(1)> :nth-child(1)> :nth-child(2)')
    .click();
    cy.wait('@settingsLoading').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('#modal-header').should('be.visible')
    .children()
    .should('have.length', 4)
    cy.get('#modal-header> :nth-child(4)')
    .should('have.text', 'Úprava vozidla')
    cy.get('.modal-body')
    .should('be.visible')
    .children()
    .should('have.length', 1)
    cy.get('#edit_units_info_tabs')
    .children()
    //.should('have.length', 4)
    cy.get('#edit_units_info_tabs-area')
    .children()
    //.should('have.length', 4)
    cy.get('#units-info-tab-1_link')
    .should('have.text', 'Základné údaje')
    .and('be.visible')
    cy.get('#units-info-basic-tab-1_link')
    .should('have.text', 'Základné údaje')
    .and('be.visible')
    cy.get('#units-extended-tab-1_link')
    .should('have.text', 'Rozšírené údaje')
    .and('be.visible')
    cy.get('#units-info-look-tab-2_link')
    .should('have.text', 'Technický preukaz')
    .and('be.visible')
    cy.get('#units-info-tab-4_link')
    .should('have.text', 'Zodpovedná osoba')
    .and('be.visible')
    cy.get('#units-info-look-tab-3_link')
    .should('have.text', 'Tankovacie karty')
    .and('be.visible')
    cy.get('#units-history-tab-1_link')
    .should('have.text', 'História')
    .and('be.visible')
    cy.get('#units-info-look-tab-4_link')
    .should('have.text', 'Obrázky a dokumenty')
    .and('be.visible')
    cy.get('#edit_unit_basic_ecv-helptext > :nth-child(2)')
    
    









    
  });
});