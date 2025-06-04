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
        cy.get('#li-drivebooksmenu ')
        .scrollIntoView()
        .click()
        cy.get('#drivetypesnew')
        .scrollIntoView()
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/codebooks/getList/poi_colors.json?f=codebooks_getList&callback=jQuery*')
          .as('drivetypesloading'); 
        cy.get('#drivetypesnew_button_0')
        .click();
        cy.wait('@drivetypesloading').then(() => (interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('#edit_drivetypesnew_color')
        cy.get('#edit_drivetypesnew_title')
        .type('Testovací účel jazdy')
        cy.get('#edit_drivetypesnew_note')
        .type('Testovací účel jazdy pre automatizované testy')
        cy.get('#select2-edit_drivetypesnew_color-container')
        .click();
        cy.get('.select2-dropdown')
        .should('be.visible')
        cy.get('.select2-results__option')
        .contains('Zelená')
        .click();
        cy.get('#search_grid_report_pois_table_filter > label > input')
        .type('Domov'); 
        cy.get('#edit_drivetypesnew_pois_start')
        .click()
        cy.get('#edit_drivetypesnew_pois_end')
        .click()
        cy.get('#search_grid_report_pois_table > tbody > .odd > .dt-center > .icon-buttons')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DriveTypes/create.json?f=DriveTypes_create&callback=jQuery*')
          .as('drivetypessaving');
        cy.get('#modal-success')
        .click();
        cy.wait('@drivetypessaving').then((interception) => {
            // Check if the response status is 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.even > .sorting_1')
        .should('contain.text', 'Testovací účel jazdy')
        cy.get('.even > :nth-child(5)')
        .should('contain.text', 'Testovací účel jazdy pre automatizované testy')
        cy.get('.even > :nth-child(4) > div > span')
        .should('have.css', 'background-color', 'rgb(76, 255, 54)') // Check if the color is green
        cy.get('.even > :nth-child(7)')
        .should('contain.text', 'Domov')
        cy.get('.even > .dt-center > :nth-child(3)')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DriveTypes/delete.json?f=DriveTypes_delete&callback=jQuery*')
          .as('drivetypesdeleting');
        cy.get('#modal-success')
        .click();
        cy.wait('@drivetypesdeleting').then((interception) => {
            // Check if the response status is 200
            expect(interception.response.statusCode).to.eq(200);
        });
        
        cy.get('.even > .dt-center > :nth-child(2) > .fa')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DriveTypes/remove.json?f=DriveTypes_remove&callback=jQuery*')
          .as('divetypesremoving');
        cy.get('#modal-success')
        .click();
        cy.wait('@divetypesremoving').then((interception) => {
            // Check if the response status is 200
            expect(interception.response.statusCode).to.eq(200);
        });


            

        
          
    });
});