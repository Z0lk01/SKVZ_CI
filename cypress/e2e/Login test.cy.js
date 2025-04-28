/// <reference types="cypress" />
const moment = require('moment');

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

        cy.intercept('POST', 'https://tssmonitoring.sk/api/v1.3/UnitsEquipments/getList/notifications.json?f=UnitsEquipments_getList&callback=jQuery*')
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

        // Verify dashboard elements
        cy.get('#dashboard')
          .should('be.visible')
          .and('contain.text', 'Welcome to the Dashboard');
    });
});