/// <reference types="cypress" />
const moment = require('moment');
const { type } = require("os");
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
          .get('#user_pass').type(password)
          cy.intercept('POST', 'https://tssmonitoring.sk/api/v1.3/UnitsEquipments/getList/notifications.json?f=UnitsEquipments_getList&callback=jQuery*').
          as('webloading')
          .get("#wp-submit")
          .click()
          cy.wait('@webloading')
          
    
});
});
it("Login", () => {
    //kontrola viditeľnosti elementov a ich textu
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
        };
    });
});