/// <reference types="cypress" />
const moment = require('moment');
const { type } = require("os");
describe('Test TSS Group stranka', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        cy.clearCookies()
          .clearLocalStorage()
          .visit("https://www.tssgroup.sk/prihlasenie")
          .get('#user_login').type(username)
          .get('#user_password').type(password)
          .get("#tss_login_form").click()
    });
});
