
/// <reference types="cypress" />
const { type } = require("os");
describe('Test TSS', () => {
        beforeEach(() => {
        cy
        .clearCookies()
        cy
        .clearLocalStorage()
        cy
        .visit("http://skvza.tssmonitoring.sk")
         
        });

it("Test 1", () => {
        cy
        .get("#form_submit")
        .should("be.visible")
        .click()
        cy
        .wait(3500)
        cy
        .get("#otazkacislo_13")
        .should("exist")
        cy
        .get("#otazkacislo_13")
        .click({force: true})
        cy
        .get("#answer_b")
        .click({force: true})
        cy
        .get("#nextBtn")
        .click({force: true})
        cy
        .get("#answer_b")
        cy
        .get("#nextBtn")
        .click({force: true})
        cy
        .get("#answer_b")
        .click({force: true})
        cy
        .get("#finishBtn")
        .click({force: true})

});




    




});