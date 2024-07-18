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
        .type("mzilka:mza")
        cy.get('#user_pass')
        .type("alkoholik")
        cy.get("#wp-submit") .click()
        cy.wait(15000)
        
         
        });
        
        it("Localization SK_2", () => {
        cy.get('#li-online-menu > [href="javascript:;"] > .title').should("be.visible") .click()
        cy.get('#gps_units_online_new').should("be.visible")
        .should("have.text", "Dispečer 2").click()
        


        
    
  
  
  
});
});