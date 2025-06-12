/// <reference types="cypress" />
const moment = require('moment');

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

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
                cy.get('#id_news_users_modal_content').should('be.visible');
                cy.get('.confirm-modal-close').click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Verify dashboard element
        cy.get('#mainboard-content-body').should('be.visible');
        cy.get('#li-travelsmenu').scrollIntoView().and('have.text', 'Cestovné príkazy').click();
        cy.get('#domestic-allowances').scrollIntoView().click();
        cy.get('#domestic-allowances_button_0').shouldHaveTrimmedText('Pridať domáci cestovný príkaz')
        cy.get('#domestic-allowances_button_0').click();
        cy.get('#modal-form').should('be.visible');
        cy.get('.modal-title').should('be.visible');
        cy.get('#edit_domestic-allowances_tabs').children().should('have.length', 9);

        // Array of tab info: [tab number, expected children count]
        const tabs = [
            [1, 45],
            [2, 21],
            [3, 18],
            [4, 8],
            [5, 23],
            [6, 7],
            [7, 1],
            [8, 4],
            [9, 10]
        ];

        tabs.forEach(([tabNum, childrenCount]) => {
            if (tabNum > 1) {
                cy.get(`#domestic-allowances-tab-${tabNum}_link`)
                  .should('be.visible')
                  .scrollIntoView()
                  .click();
            }
            cy.get(`#domestic-allowances-tab-${tabNum}`)
              .children()
              .should('have.length', childrenCount);
        });
        cy.get('#modal-cancel').click();
        cy.get('#foreign-allowances')
        .should('be.visible')
        .and('have.text', 'Zahraničné príkazy')
        .click();
        cy.get('#foreign-allowances_button_0')
          .shouldHaveTrimmedText('Pridať zahraničný cestovný príkaz')
        cy.get('#foreign-allowances_button_0')
        .click();
        cy.get('#modal-form').should('be.visible');
        cy.get('.modal-title').should('be.visible');
        cy.get('#edit_foreign-allowances_tabs').children().should('have.length', 10);
         // Array of tab info: [tab number, expected children count]
        const ftabs = [
            [1, 46],
            [2, 22],
            [3, 19],
            [4, 8],
            [5, 48],
            [6, 8],
            [7, 1],
            [8, 4],
            [9, 10],
            [10, 15]
        ];

        ftabs.forEach(([tabNum, childrenCount]) => {
            if (tabNum > 1) {
                cy.get(`#foreign-allowances-tab-${tabNum}_link`)
                  .should('be.visible')
                  .scrollIntoView()
                  .click();
            }
            cy.get(`#foreign-allowances-tab-${tabNum}`)
              .children()
              .should('have.length', childrenCount);
        });
        cy.get('#modal-cancel')
        .scrollIntoView()
        .should('be.visible')
        .click();
    });
});