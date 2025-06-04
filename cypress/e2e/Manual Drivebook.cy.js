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

        
        cy.get('#li-drivebooksmenu ')
        .scrollIntoView()
        .click()
        cy.get('#drivebooks_manuals')
        .scrollIntoView()
        .click();
        cy.get('.odd > .header-2 > :nth-child(1)')
        .click();
        cy.get('#drivebooks_manuals_button_0')
        .scrollIntoView()
        .click();
        cy.get('#edit_drivebooks_manuals_date_from')
        .click()
        .then(() => {
            // Select yesterday's date in the calendar
            cy.selectYesterdayInCalendar();
        }); 
        cy.get('#edit_drivebooks_manuals_time_from')
        .type('08:00')
        cy.get('#edit_drivebooks_manuals_date_to')
        .click()
        .then(() => {
            // Select yesterday's date in the calendar
            cy.selectYesterdayInCalendar();
        });
        cy.get('#edit_drivebooks_manuals_time_to')
        .type('16:00');
        cy.get('#edit_drivebooks_manuals_km_to')
        .type('1652');
        cy.get('#edit_drivebooks_manuals_address_to')
        .type('test');
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DrivebookManuals/create.json?f=DrivebookManuals_create&callback=jQuery*')
          .as('saveManualDrivebook');
        cy.get('#modal-success')
        .click();
        cy.wait('@saveManualDrivebook', { timeout: 10000 }).then((interception) => {
            // Check if the response status is 200
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('.header-4 > :nth-child(3)')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DrivebookManuals/delete.json?f=DrivebookManuals_delete&callback=jQuery*')
          .as('deleteManualDrivebooks');
          cy.get('#modal-success')
          .click();
        cy.wait('@deleteManualDrivebooks').then((interception) => {
            // Check if the response status is 200
            expect(interception.response.statusCode).to.eq(200);
        });
            
        
            

        
          
    });
});