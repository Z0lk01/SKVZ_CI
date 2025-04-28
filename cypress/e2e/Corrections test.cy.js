/// <reference types="cypress" />
const moment = require('moment');

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

    it("Korekcie a tankovania", () => {
        // Define expected values
        const expectedDate = moment().format('DD.MM.YYYY');
        const expectedTime = '01:00';
        const expectedCost = "50.00 €";
        const expectedQuantity = "50 l";

        // Navigate to Corrections
        cy.get('#li-toolsmenu > [href="javascript:;"]').scrollIntoView().click();
        cy.get("#corrections").click();

        // Create a correction
        cy.get('#corrections_button_0', { timeout: 10000 }).should("be.visible").click();
        cy.get('#edit_corrections_time', { timeout: 10000 }).type(expectedTime);
        cy.get('#edit_corrections_tacho').type("112233");
        cy.get('#edit_corrections_unit_id').click();
        cy.get('#search_grid_units_table_filter > label > input').type("FMC150 Test Mza");
        cy.get('#search_grid_units_table > tbody > .odd > .fixed')
          .should("have.text", "FMC150 Test Mza")
          .click();
        cy.get('#modal-success').click();

        // Navigate to Costs
        cy.get('#costsnew', { timeout: 10000 }).scrollIntoView().click();
        cy.get('#costsnew_button_0', { timeout: 10000 }).click({ force: true });

        // Fill in cost details
        cy.get('#edit_drivers_unit', { timeout: 10000 }).click({ force: true });
        cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE");
        cy.get('#search_grid_units_table > tbody > .odd > .fixed')
          .should("have.text", "IL 942DE")
          .click();
        cy.get('#edit_costsnew_time', { timeout: 10000 }).type(expectedTime);
        cy.get('#edit_costsnew_quantity').type("50");
        cy.get('#edit_costsnew_quantity_unit-helptext .select2-selection__arrow').click();
        cy.get('#select2-edit_costsnew_quantity_unit-results').children().last().click();
        cy.get('#edit_costsnew_price').type("50");
        cy.get('#edit_costsnew_modules_currencys-helptext .select2-selection__arrow').click();
        cy.get("#select2-edit_costsnew_modules_currencys-results").children().contains("€").click();
        cy.get('#edit_costsnew_note').type("test");

        // Intercept and validate API call
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/FuelCardsDatas/create.json?f=FuelCardsDatas_create&callback=jQuery*')
          .as('fueling');
        cy.get('#modal-success').click();
        cy.wait('@fueling').then(({ request, response }) => {
            expect(request.body).to.contain({
                fk_unit_id: "207834be-7ac5-434a-9f77-b9563fbe47d3",
                price_without_vat: "40.65",
                quantity: "50",
                price: "50",
                note: "test",
                fk_currency_id: "df50e937-69c3-48fa-909a-7da762aeef99",
            });
            expect(response.statusCode).to.eq(200);
        });

        // Verify cost details in the table
        cy.get('#costsnew_table > tbody > .odd > .sorting_1').then(($el) => {
            const formattedText = $el.text();
            const [datePart, timePart] = formattedText.split(' ');
            expect(datePart).to.equal(expectedDate);
            expect(timePart).to.equal(expectedTime);
        });
        cy.get('#costsnew_table > tbody > .odd > :nth-child(9)').should("have.text", expectedQuantity);
        cy.get('#costsnew_table > tbody > .odd > :nth-child(11)').should("have.text", expectedCost);

        // Delete the cost
        cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(2)').click();
        cy.get('#modal-cancel').click();

        // Navigate to Service Book
        cy.get('#service-books-v2').click();
        cy.get('#service-books-v2_unit_filter-text').scrollIntoView().should("be.visible").and("have.attr", "placeholder", "Všetky vozidlá...");
        cy.get('#filter_centers_service_book_v2-component').should("be.visible");

        // Verify service book filters
        const serviceBookFilters = [
            { selector: '#filter_service_books_last-checkbox > .form-label', text: "Filter na dátum podľa posledného servisu" },
            { selector: '#filter_service_books_next-checkbox > .form-label', text: "Filter na dátum podľa najbližšieho servisu" },
            { selector: '#service_books-date_from-component > .form-label > b', text: "Začiatok obdobia" },
            { selector: '#service_books-date_to-component > .form-label > b', text: "Koniec obdobia" },
        ];
        serviceBookFilters.forEach(filter => {
            cy.get(filter.selector).should("have.text", filter.text);
        });

        // Add a new service book entry
        cy.get('#service-books-v2_button_0').click();
        cy.get('#edit_service_books_unit').click();
        cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE");
        cy.get('#search_grid_units_table > tbody > .odd > .fixed').click();
        cy.get('#edit_service_books_time').type(expectedTime);
        cy.get('#service_books-settings-tab-2_link').click();
        cy.get("#select2-edit_service_books_modules_products-container").type("brzdy");
        cy.get("#select2-edit_service_books_modules_products-results").click();
        cy.get('#modal-success').click();

        // Verify service book entry
        cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(3)').should("have.text", "IL 942DE");
        cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(4)').should("have.text", "Opel Insignia");
        cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(5)').then(($el) => {
            const formattedText = $el.text();
            const [datePart, timePart] = formattedText.split(' ');
            expect(datePart).to.equal(expectedDate);
            expect(timePart).to.equal(expectedTime);
        });
    });
});