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
          .visit("/")
          .get('#user_login').type(username)
          .get('#user_pass').type(password)
          .get("#wp-submit").click()
          .wait(15000);
    });
        
    it("Kontrola noviniek na stránke", () => {
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                // element existuje urobím assertion a odkliknem novinky
                cy.get('#id_news_users_modal_content').should('be.visible');
                cy.get('.confirm-modal-close').click();
            } else {
                // element sa na stránke nenachádza , test pokračuje ďalej 
                cy.log('#id_news_users_modal_content');
            }
        });
    });
    cy.get('#li-settings > [href="javascript:;"]')
            .should("be.visible")
            .and("have.text", "Nastavenia")
            .click()
            cy.get('#li-drivers > #drivers')
            .should("be.visible")
            .and("have.text", "Vodiči")
            .click()
            cy.get("#drivers_button_0")
            .should("be.visible")
            .and("have.text", "Vytvoriť nového vodiča")
            .click()
            cy.get("#modal-content")
            .should("be.visible")
            cy.contains("Vytvorenie vodiča")
            .should("be.visible")
            cy.get("#edit_drivers_token")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte token vodiča")
            .type("12345")
            cy.get("#edit_drivers_surname")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte priezvisko")
            .type("Cypress")
            cy.get("#edit_drivers_name")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte meno")
            .type("Test")
            cy.get("#edit_drivers_email")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte email")
            cy.get("#edit_drivers_telephone")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte telefón")
            cy.get("#edit_drivers_flap")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte klapku")
            cy.get("#edit_drivers_note-components")
            .should("be.visible")
            cy.get("#edit_drivers_note-helptext")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte poznámku")
            cy.get("#edit_drivers_internal_number")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte interné číslo")
            cy.get("#edit_drivers_non_driver-checkbox")
            .should("be.visible")
           cy.get("#edit_drivers_non_driver-checkbox")
           .should("be.visible")
           cy.get("#edit_drivers_non_driver-helptext > nth-child(2)")
           .should("be.visible")
           .and("have.css", "color", "rgb(223, 223, 223)")
           .click()
           cy.get("#edit_drivers_non_driver-helptext > nth-child(2)")
           .should("be.visible")
           .and("have.css", "color", "rgb(0, 0, 174)")
           .click()
           cy.get("#edit_drivers_benefit-checkbox")
           .should("be.visible")
           .and("have.text", "Benefitný vodič")









});