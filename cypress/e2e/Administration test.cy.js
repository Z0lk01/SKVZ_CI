/// <reference types="cypress" />
const moment = require('moment');
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
          .visit("/")
          .get('#user_login').type(username)
          .get('#user_pass').type(password)
          .get("#wp-submit").click()
          .wait(15000);
    
});
it("Administration", () => {
    //kontrola viditeľnosti elemntov a ich textu
    cy.get('body').then($body => {
        if ($body.find('#id_news_users_modal_content').length > 0) {
            // element existuje urobím assertion a odkliknem novinky
            cy.get('#id_news_users_modal_content')
            .should('be.visible');
            cy.get('.confirm-modal-close')
            .click();
        } else {
            // element sa na stránke nenachádza , test pokračuje ďalej 
            cy.log('#id_news_users_modal_content');
        }
//kontrola vytorenia testovacieho uživateľa priradenie práv a vozidiel
cy.get('#li-object > [href="javascript:;"]')
.should("be.visible")
.click()
cy.get('#users')
.should("be.visible")
.click()
cy.get('#users_button_0')
.should("be.visible")
.click()
cy.get('#edit_users_username')
.type("testuser")
cy.get('#edit_users_password')
.type("testuser")
cy.get('#edit_users_reset_on_login-helptext > .switchery')
.click()
cy.get('#edit_users_email')
.type("hello@hello.com")
cy.get('#edit_users_role')
.click()
cy.get('#search_grid_roles_table > tbody > :nth-child(1) > .fixed')
.click()
cy.get('#edit_users_supervisor')
.click()
cy.get('#search_grid_users_with_profiles_table_filter > label > input')
.type("mza")
cy.get('#search_grid_users_with_profiles_table > tbody > :nth-child(1) > .fixed')
.should("have.text", "mza")
.click()
cy.get('#users-info-tab-2_link')
.should("be.visible")
.and("have.text", "Profil")
.click()
cy.get('#edit_users_profile_surname')
.type("surname")
cy.get('#edit_users_profile_name')
.type("name")
cy.get('#edit_users_profile_phone')
.type("0900000000")
cy.get('#edit_users_profile_note')
.type("testovacia poznámka k užívateľovi ktorého vytváram 100% v Cypress teste")
cy.get('#users-info-tab-3_link')
.click()
cy.wait(3200)
cy.get('#select2-edit_users_language-container')
.click()
cy.get('#select2-edit_users_language-results > :nth-child(1)')
.should("be.visible")
.and("have.text", "Čeština")
.click()
cy.get('#update_user_can_approve_driving-helptext > .switchery')
.click()
cy.get('#update_user_prepare_to_rent-helptext > .switchery')
.click()
cy.get('#modal-success')
.click()
cy.wait(8000)
cy.get('#users_table_filter > label > input')
.click()
.type("testuser")
cy.get('#users_table > tbody > :nth-child(1) > :nth-child(2)')
.should("have.text", "testuser")
cy.get('#users_table > tbody > :nth-child(1) > :nth-child(4)')
.should("have.text", 'Zákazník - administrátor')
cy.get('.dt-center > :nth-child(4)')
.should("be.visible")
.click()
//vymazanie užívateľa + kontrola API requestu
cy.intercept({
    method: 'POST',
    url: "https://support.tssmonitoring.sk/api/v1.3/users/delete.json?f=users_delete&callback=jQuery*"
     }).as("apiRequest")
cy.get('#modal-success').click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
});
});
});

