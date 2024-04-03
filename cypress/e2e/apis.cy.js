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
        cy.get(".confirm-modal-close") .click({force: true})
         
        });
        
        it("Localization SK_2", () => {
cy.get('#li-drivebooksmenu > [href="javascript:;"]').should("be.visible")
.should("have.text", "Jazdy").click()
cy.wait(1500)
cy.get("#main-menu-wrapper > .ps-scrollbar-y-rail > .ps-scrollbar-y").click()

        
    
  
  
  
});
});