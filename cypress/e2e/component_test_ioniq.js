/// <reference types="cypress" />
const { type } = require("os");
describe('Test TSS', () => {
        beforeEach(() => {
        cy
        .clearCookies()
        cy
        .clearLocalStorage()
        cy
        .visit("https://support.tssmonitoring.sk/login")
        cy.get('#user_login') 
        .type("mmza")
        cy.get('#user_pass')
        .type("alkoholik")
        cy.get("#wp-submit") .click()
        cy.wait(15000)
        
         
        });
        
        it("Component 1", () => {
        cy.get("#main_menu_search_div").should("be.visible")
    
        

});
});