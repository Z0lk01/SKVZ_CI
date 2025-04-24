/// <reference types="cypress" />
import { getYesterdayTimestampInSeconds } from '../support/utilities.js';
const timestamp = getYesterdayTimestampInSeconds(); // získať timestamp pre včera
import { getFormattedYesterday } from '../support/utilities.js';
const formattedDate = getFormattedYesterday(); // získať formátovaný dátum pre včera
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
          cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/getList/myUnits/Manage.json?f=units_getList&callback=jQuery*').
          as('webloading')
          cy.get("#wp-submit")
          .click()
          cy.wait('@webloading', { timeout: 10000 });
          
          
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
    //overenie elemtntov modálového okna vytvárania vodiča
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
            .shouldHaveTrimmedText("Vytvoriť nového vodiča")
            cy.get("#drivers_button_0")
            .click()
            cy.get(".modal-content")
            .should("be.visible")
            cy.contains("Vytvorenie vodiča")
            .should("be.visible")
            cy.get("#edit_drivers_token")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte číslo tokenu")
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
            .and("have.attr", "placeholder", "Vyplňte e-mail adresu")
            cy.get("#edit_drivers_telephone")
            .should("be.visible")
            .and("have.attr", "placeholder", "Vyplňte telefón")
            cy.get("#edit_drivers_flap")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte klapku")
            cy.get("#edit_drivers_note-component")
            .should("be.visible")
            cy.get("#edit_drivers_note")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte poznámku")
            cy.get("#edit_drivers_internal_number")
            .should("be.visible")
            .and("have.attr", "placeholder", "Zadajte interné číslo")
            cy.get("#edit_drivers_non_driver-checkbox")
            .should("be.visible")
           cy.get("#edit_drivers_non_driver-checkbox")
           .should("be.visible")
           cy.get("#edit_drivers_non_driver-helptext > :nth-child(2)")
           .should("be.visible")
           .and("have.css", "background-color", "rgb(255, 255, 255)")
           .click()
           cy.get("#edit_drivers_non_driver-helptext > :nth-child(2)")
           .should("be.visible")
           .and("have.css", "background-color", "rgb(0, 0, 174)")
           .click()
           cy.get('#edit_drivers_benefit-checkbox > .form-label')
           .should("be.visible")
           .should("have.text", "Benefitný vodič")
           cy.get("#edit_drivers_benefit-helptext > :nth-child(2)")
           .should("have.css", "background-color", "rgb(255, 255, 255)")
           .click()
           cy.get("#edit_drivers_benefit-helptext > :nth-child(2)")
            .should("be.visible")
            .and("have.css", "background-color", "rgb(0, 0, 174)")
            .click()
            //vytvorenie vodiča s negatívnym výsledkom
            cy.intercept("POST", "https://www.tssmonitoring.sk/api/v1.3/drivers/create.json?f=drivers_create&callback=jQuery*")
            .as("createDriver");
            cy.get('#modal-success').click()
            cy.wait('@createDriver').then((interception) => {
                cy.parseJsonpResponse(interception).then((parsedResponse) => {
                    const errorsString = parsedResponse.response.data.error;
                    
                    // Rozdelenie chýb podľa bodkočiarok
                    const errorsArray = errorsString.split(';').filter(Boolean); // .filter odstráni prázdne položky
                
                    // Overenie očakávaných chýb
                    expect(errorsArray).to.include('VALIDATE_FROM_NOT_DEFINED');
                    
                   // Overenie počtu chýb
                    expect(errorsArray.length).to.equal(1);
                  });
                });
                //kontrola chybovej hlášky
                cy.get("#edit_drivers_date-start")
                .scrollIntoView()
                .should("be.visible")
                .should("have.css", "border-color", "rgb(244, 67, 54)")
                .and("have.attr", "placeholder", "Zadajte dátum")
                cy.get("#edit_drivers_date-error")
                .should("be.visible")
                .should("have.css", "color", "rgb(244, 67, 54)")
                .and("have.text", "Začiatok platnosti je povinný")
                //fixnutie chyby a vytvorenie vodiča s pozitívnym výsledkom
                cy.get('#edit_drivers_date-start')
                .should("be.visible")
                .click()
                cy.get('.show-calendar')
                .should("be.visible")
                cy.get('.today')
                .should("be.visible")
                cy.selectYesterdayInCalendar()
                //overenie tela requestu vytvorenie vodiča
                const expectedRequestBody = {
                    id:"",
                    kurzy_vodicov:{},
                    name:"Test",
                    surname:"Cypress",
                    token:"12345",
                    email:"",
                    telephone:"",
                    note:"",
                    internal_number:"",
                    date_from: getFormattedYesterday(),
                    date_from_timestamp: getYesterdayTimestampInSeconds(),
                    date_to: null,
                    date_to_timestamp: null,
                    fk_center_id:"",
                    fk_unit_id:"",
                    fk_profile_id:"",
                    flap:"",
                    formation:"",
                    position:"",
                    work_time_from:"",
                    work_time_to:"",
                    residence:"",
                    non_driver: 0,
                    is_benefit: 0,
                    join_profiles: null,
                    join_profiles_ex: null,
                    remove_profiles: null


                  };
                  
                  cy.intercept('POST', 'https://support.tssmonitoring.sk/api/v1.3/drivers/create.json?f=drivers_create&callback=jQuery*')
                  .as('createDriver');

                  // Odoslanie requestu na vytvorenie vodiča
                  cy.get("#modal-success")
                .scrollIntoView()
                .should("be.visible")
                .click();
                  
                  // Overenie requestu
                  cy.wait('@createDriver').then(({ request, response }) => {
                    const actual = request.body;
                    const expected = expectedRequestBody;
                  
                    // Vypísanie a porovnanie objektov
                    console.log(' Actual Request Body:', actual);
                    console.log('Expected Request Body:', expected);
                    expect(actual).to.deep.equal(expected);
                    expect(response.statusCode).to.equal(200);
                });
                //vymazanie testovacieho vodiča
                cy.get('label > input')
                .scrollIntoView()
                .should("be.visible")
                .type("Cypress")
                cy.get('#drivers_table > tbody > :nth-child(1) > :nth-child(2)')
                .should("be.visible")
                .and("have.text", "Cypress")
                cy.get('#drivers_table_info > :nth-child(1) > :nth-child(1)')
                .scrollIntoView()
                .should("be.visible")
                .and("have.text", "1")
                cy.get('#drivers_table > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3)')
                .click()
                //kontrola API requestu na vymazanie vodiča
                cy.intercept("POST", "https://www.tssmonitoring.sk/api/v1.3/drivers/delete.json?f=drivers_delete&callback=jQuery*")
                .as("deleteDriver");
                cy.get("#modal-success")
                .scrollIntoView()
                .click()
                cy.wait('@deleteDriver').then((interception) => {
                    expect(interception.response.statusCode).to.equal(200);
                });















        });
});