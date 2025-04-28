/// <reference types="cypress" />
import { getYesterdayTimestampInSeconds, getFormattedYesterday } from '../support/utilities.js';

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        // Login and setup
        cy.clearCookies()
          .clearLocalStorage()
          .visit("/")
          .get('#user_login').type(username)
          .get('#user_pass').type(password);

        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/getList/myUnits/Manage.json?f=units_getList&callback=jQuery*')
          .as('webloading');

        cy.get("#wp-submit").click();
        cy.wait('@webloading', { timeout: 10000 });
    });

    it("Kontrola noviniek na stránke", () => {
        // Handle news modal if present
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                cy.get('#id_news_users_modal_content').should('be.visible');
                cy.get('.confirm-modal-close').click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Navigate to Drivers section
        cy.get('#li-settings > [href="javascript:;"]').should("be.visible").and("have.text", "Nastavenia").click();
        cy.get('#li-drivers > #drivers').should("be.visible").and("have.text", "Vodiči").click();

        // Verify and create a new driver
        cy.get("#drivers_button_0").should("be.visible").shouldHaveTrimmedText("Vytvoriť nového vodiča").click();
        cy.get(".modal-content").should("be.visible");
        cy.contains("Vytvorenie vodiča").should("be.visible");

        const driverDetails = [
            { selector: "#edit_drivers_token", placeholder: "Vyplňte číslo tokenu", value: "12345" },
            { selector: "#edit_drivers_surname", placeholder: "Vyplňte priezvisko", value: "Cypress" },
            { selector: "#edit_drivers_name", placeholder: "Vyplňte meno", value: "Test" },
            { selector: "#edit_drivers_email", placeholder: "Vyplňte e-mail adresu", value: "" },
            { selector: "#edit_drivers_telephone", placeholder: "Vyplňte telefón", value: "" },
            { selector: "#edit_drivers_flap", placeholder: "Zadajte klapku", value: "" },
            { selector: "#edit_drivers_note", placeholder: "Zadajte poznámku", value: "" },
            { selector: "#edit_drivers_internal_number", placeholder: "Zadajte interné číslo", value: "" },
        ];

        driverDetails.forEach(detail => {
            cy.get(detail.selector)
              .should("be.visible")
              .and("have.attr", "placeholder", detail.placeholder)
              .type(detail.value);
        });

        // Toggle driver options
        const toggleOptions = [
            { selector: "#edit_drivers_non_driver-helptext > :nth-child(2)", initialColor: "rgb(255, 255, 255)", toggledColor: "rgb(0, 0, 174)" },
            { selector: "#edit_drivers_benefit-helptext > :nth-child(2)", initialColor: "rgb(255, 255, 255)", toggledColor: "rgb(0, 0, 174)" },
        ];

        toggleOptions.forEach(option => {
            cy.get(option.selector).should("have.css", "background-color", option.initialColor).click();
            cy.get(option.selector).should("have.css", "background-color", option.toggledColor).click();
        });

        // Attempt to create driver with missing required fields
        cy.intercept("POST", "https://www.tssmonitoring.sk/api/v1.3/drivers/create.json?f=drivers_create&callback=jQuery*").as("createDriver");
        cy.get('#modal-success').click();
        cy.wait('@createDriver').then((interception) => {
            cy.parseJsonpResponse(interception).then((parsedResponse) => {
                const errorsString = parsedResponse.response.data.error;
                const errorsArray = errorsString.split(';').filter(Boolean);
                expect(errorsArray).to.include('VALIDATE_FROM_NOT_DEFINED');
                expect(errorsArray.length).to.equal(1);
            });
        });

        // Fix missing field and create driver
        cy.get('#edit_drivers_date-start').should("be.visible").click();
        cy.get('.show-calendar').should("be.visible");
        cy.selectYesterdayInCalendar();

        const expectedRequestBody = {
            id: "",
            kurzy_vodicov: {},
            name: "Test",
            surname: "Cypress",
            token: "12345",
            email: "",
            telephone: "",
            note: "",
            internal_number: "",
            date_from: getFormattedYesterday(),
            date_from_timestamp: getYesterdayTimestampInSeconds(),
            date_to: null,
            date_to_timestamp: null,
            fk_center_id: "",
            fk_unit_id: "",
            fk_profile_id: "",
            flap: "",
            formation: "",
            position: "",
            work_time_from: "",
            work_time_to: "",
            residence: "",
            non_driver: 0,
            is_benefit: 0,
            join_profiles: null,
            join_profiles_ex: null,
            remove_profiles: null,
        };

        cy.intercept('POST', 'https://support.tssmonitoring.sk/api/v1.3/drivers/create.json?f=drivers_create&callback=jQuery*').as('createDriver');
        cy.get("#modal-success").scrollIntoView().should("be.visible").click();
        cy.wait('@createDriver').then(({ request, response }) => {
            expect(request.body).to.deep.equal(expectedRequestBody);
            expect(response.statusCode).to.equal(200);
        });

        // Delete the test driver
        cy.get('label > input').scrollIntoView().should("be.visible").type("Cypress");
        cy.get('#drivers_table > tbody > :nth-child(1) > :nth-child(2)').should("be.visible").and("have.text", "Cypress");
        cy.get('#drivers_table > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3)').click();
        cy.intercept("POST", "https://www.tssmonitoring.sk/api/v1.3/drivers/delete.json?f=drivers_delete&callback=jQuery*").as("deleteDriver");
        cy.get("#modal-success").scrollIntoView().click();
        cy.wait('@deleteDriver').then((interception) => {
            expect(interception.response.statusCode).to.equal(200);
        });
    });
});