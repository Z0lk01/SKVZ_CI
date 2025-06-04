/// <reference types="cypress" />
const moment = require('moment');

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        // Login
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

    it("Login and handle news modal", () => {
        // Handle news modal if present
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                cy.get('#id_news_users_modal_content')
                  .should('be.visible');
                cy.get('.confirm-modal-close')
                  .click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Verify dashboard element
        cy.get('#mainboard-content-body')
          .should('be.visible')
        cy.get('#li-workingsmenu')
        .scrollIntoView()
        .and('have.text', 'Práca')
        .click();
        cy.get('#works')
        .scrollIntoView()
        .click();
        cy.get('#works_panel > section.box > .panel_header > .title')
            .should('be.visible')
            .and('have.text', 'Prehľad práce');
        cy.get('#works-calendar-area')
            .should('be.visible')
        cy.get('#works_info_sumary')
            .should('be.visible')
        
          
    });
});