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

        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/getList/myUnits/Manage.json?f=units_getList&callback=jQuery*')
          .as('webloading');

        cy.get("#wp-submit").click();
        cy.wait('@webloading', { timeout: 10000 });
    });

    it("Administration", () => {
        // Handle news modal if present
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                cy.get('#id_news_users_modal_content').should('be.visible');
                cy.get('.confirm-modal-close').click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Navigate to Users section
        cy.get('#li-object > [href="javascript:;"]').should("be.visible").click();
        cy.get('#users').should("be.visible").click();

        // Create a new user
        cy.get('#users_button_0').should("be.visible").click();
        cy.get('#edit_users_username').type("testuser");
        cy.get('#edit_users_password').type("testuser");
        cy.get('#edit_users_reset_on_login-helptext > .switchery').click();
        cy.get('#edit_users_email').type("hello@hello.com");

        // Assign role and supervisor
        cy.get('#edit_users_role').click();
        cy.get('#search_grid_roles_table > tbody > :nth-child(1) > .fixed').click();
        cy.get('#edit_users_supervisor').click();
        cy.get('#search_grid_users_with_profiles_table_filter > label > input').type("mza");
        cy.get('#search_grid_users_with_profiles_table > tbody > :nth-child(1) > .fixed')
          .should("have.text", "mza")
          .click();

        // Fill in user profile details
        cy.get('#users-info-tab-2_link').should("be.visible").and("have.text", "Profil").click();
        cy.get('#edit_users_profile_surname').type("surname");
        cy.get('#edit_users_profile_name').type("name");
        cy.get('#edit_users_profile_phone').type("0900000000");
        cy.get('#edit_users_profile_note').type("Testovací poznámka k užívateľovi vytvorenému v Cypress teste");

        // Assign language and permissions
        cy.get('#users-info-tab-3_link').click();
        cy.get('#select2-edit_users_language-container', { timeout: 5000 }).click();
        cy.get('#select2-edit_users_language-results > :nth-child(1)')
          .should("be.visible")
          .and("have.text", "Čeština")
          .click();
        cy.get('#update_user_can_approve_driving-helptext > .switchery').click();
        cy.get('#update_user_prepare_to_rent-helptext > .switchery').click();

        // Save the user
        cy.get('#modal-success').click();

        // Verify the user in the table
        cy.get('#users_table_filter > label > input', { timeout: 5000 }).click().type("testuser");
        cy.get('#users_table > tbody > :nth-child(1) > :nth-child(2)').should("have.text", "testuser");
        cy.get('#users_table > tbody > :nth-child(1) > :nth-child(4)').should("have.text", 'Zákazník - administrátor');

        // Delete the user and validate API request
        cy.get('.dt-center > :nth-child(4)').should("be.visible").click();
        cy.intercept({
            method: 'POST',
            url: "https://tssmonitoring.sk/api/v1.3/users/delete.json?f=users_delete&callback=jQuery*"
        }).as("apiRequest");
        cy.get('#modal-success').click();
        cy.wait('@apiRequest').then((interception) => {
            assert.isNotNull(interception.response.body, 'API response is not null');
            expect(interception.response.statusCode).to.equal(200);
        });
    });
});

