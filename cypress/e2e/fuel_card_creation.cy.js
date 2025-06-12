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

          cy.get('#li-fuelsmenu').scrollIntoView().click();
        cy.get('#fuelcards').scrollIntoView().click();
        cy.get('#fuelcards_button_0').click();
        cy.get('#edit_fuelcards_number').type('1234567890');
        cy.get('#edit_fuelcards_pin').type('14587');
        cy.get('#edit_fuelcards_note').type('Testovacia tankovacia karta');
        cy.get('#edit_fuelcards_unit').click();
        cy.get('#search_grid_units_table_filter> :nth-child(1)> :nth-child(1)').type('942DE');
        cy.get('#search_grid_units_table').click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/fuelCards/create.json?f=fuelCards_create&callback=jQuery*')
          .as('fuelcardcreation');
        cy.get('#modal-success').click();
        cy.wait('@fuelcardcreation').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('label > input').type('1234567890');
        cy.get('.sorting_1').should('have.text', '1234567890');
        cy.get('.dt-center > :nth-child(4)').click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/fuelCards/delete.json?f=fuelCards_delete&callback=jQuery*')
          .as('fuelcarddeletion');
        cy.get('#modal-success').click();
        cy.wait('@fuelcarddeletion').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });


        

          
    });
});