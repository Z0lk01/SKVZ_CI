
/// <reference types="cypress" />
const { type } = require("os");
describe('Test TSS', () => {
        beforeEach(() => {
        cy
        .clearCookies()
        cy
        .clearLocalStorage()
        cy
        .visit("http://www.tssmonitoring.sk")
         
        });

it("Konto MZa", () => {
        cy.get('#user_login') .type("mzilka:mza")
        
        cy.get('#user_pass')
        .click
        .type("alkoholik")

});




    




});