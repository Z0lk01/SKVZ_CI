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

    it("Kontrola rezervačného systému", () => {
        // Verify reservation system menu
        cy.get('#li-rentcar > [href="javascript:;"]')
          .should("be.visible")
          .and("have.text", "Rezervačný systém")
          .click();

        cy.get("#rentcar")
          .children()
          .should("have.length", 7);

        const menuItems = [
            { selector: '#rent_cars_prepare_v2', text: "Autopožičovňa - priprave..." },
            { selector: '#rent_cars_requests_for_me_v2', text: "Autopožičovňa - schvaľov..." },
            { selector: '#rent-cars-reports', text: "Autopožičovňa reporty" },
            { selector: '#busportals', text: "Autobusy rezervácie" },
            { selector: '#rent_cars_my_requests_v2', text: "Autopožičovňa - moje žia..." },
            { selector: '#rent_cars_v2', text: "Autopožičovňa" },
            { selector: '#taxiportals', text: "Taxislužba" },
        ];

        menuItems.forEach(item => {
            cy.get(item.selector)
              .should("be.visible")
              .and("have.text", item.text);
        });

        // Verify "Pripravenie vozidla" section
        cy.get('#rent_cars_prepare_v2').click();
        cy.get('#rent_cars_prepare_v2_panel > section.box > .panel_header > .title')
          .should("be.visible")
          .and("have.text", "Pripravenie vozidla");

        cy.get('#rent_cars_prepare_v2_table')
          .should("be.visible");

        // Verify "Schvaľovanie žiadostí" section
        cy.get('#rent_cars_requests_for_me_v2').click();
        cy.get('#rent_cars_requests_for_me_v2_panel > section.box > .panel_header > .title')
          .should("be.visible")
          .and("have.text", "Schvaľovanie žiadostí");

        const filters = [
            { selector: '#filter_timeline_calendar_rent_cars_requests_for_me_v2-checkbox > .form-label', text: "Časová os" },
            { selector: '#filter_calendar_rent_cars_requests_for_me_v2-checkbox > .form-label', text: "Kalendár" },
        ];

        filters.forEach(filter => {
            cy.get(filter.selector)
              .should("be.visible")
              .and("have.text", filter.text);
        });

        cy.get('#filter_timeline_calendar_rent_cars_requests_for_me_v2-helptext > .switchery')
          .click();

        cy.get('.vis-timeline')
          .should("be.visible");

        const timelineButtons = [
            '#edit_rent_cars_requests_for_me_v2_timeline_moveToReservation > span',
            '#edit_rent_cars_requests_for_me_v2_timeline_moveToday',
            '#edit_rent_cars_requests_for_me_v2_timeline_zoomToday',
            '#edit_rent_cars_requests_for_me_v2_timeline_zoomWeek',
        ];

        timelineButtons.forEach(button => {
            cy.get(button).should("be.visible");
        });
        //Vytvorenie žiadosti na požičanie vozidla
        cy.get('#rent_cars_v2').scrollIntoView()
        .click();
        cy.get('#rent_cars_v2_button_0').click();
        cy.get('#select2-edit_rent_cars_location-container').click();
        cy.get('#select2-edit_rent_cars_location-results > :nth-child(1)')
          .should("be.visible")
          .and("have.text", "PRO-DOMA, SE")
          .click();
          cy.get('#edit_rent_cars_unit').click();
          cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE");
          cy.get('#search_grid_units_table > tbody > :nth-child(1)').click();
          cy.get('#edit_rent_cars_time').type("11:15");
          cy.get('#edit_rent_cars_time_return').type("12:00");
          cy.get('#select2-edit_rent_cars_drive_approver-container').scrollIntoView()
          .should("be.visible")
          .click();
          cy.get('#select2-edit_rent_cars_drive_approver-results > :nth-child(1)')
          .should("have.text", "mza test mza")
          .click();
          cy.get('#edit_rent_cars_destination').should("be.visible")
          .type("Test cieľ");
          cy.get('#edit_rent_cars_drive_number_passengers').should("be.visible")
          .type("2");
          cy.get('#edit_rent_cars_drive_note').should("be.visible")
          .type("Test neúplného vyplnenia povinných polí v žiadosti");
          cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/rentCars/create.json?f=rentCars_create&callback=jQuery*')
          .as('Reservation_create_fail');
          cy.get('#modal-success').click(); // zámerné neúplné vyplnenie žiadosti , mal by sa zobraziť error v response body
          cy.wait('@Reservation_create_fail').then(({ request, response }) => {
              expect(response.statusCode).to.eq(200);
              expect(response.body).to.include("PURPOSE_ERROR_CODE");
          });
          //doplnenie chýbajúcich údajov
          cy.get('#edit_rent_cars_drive_number_purpose_driving').should("be.visible")
          .type("Test účel jazdy");
          cy.get('#edit_rent_cars_unit').click();
          cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE");
          cy.get('#search_grid_units_table > tbody > :nth-child(1)').click();
          cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/rentCars/create.json?f=rentCars_create&callback=jQuery*')
          .as('Reservation_create_success');
          cy.get('#modal-success').scrollIntoView()
          .click();
          cy.wait('@Reservation_create_success').then(({ request, response }) => {
              expect(response.statusCode).to.eq(200);
              expect(response.body).to.include("null");// odpoveď by mala byť null, ak je všetko v poriadku a response je 200
          });
         });
         it("Schvalovanie žiadosti", () => {
          cy.get('#li-rentcar > [href="javascript:;"]').click();
          cy.get('#rent_cars_requests_for_me_v2 > .title').scrollIntoView()
          .should("be.visible")
          .click();
         // Overenie requestu pre otvrenie schvalovania
        cy.intercept({
            method: 'POST',
            url: "https://www.tssmonitoring.sk/api/v1.3/RentCars/read.json?f=RentCars_read&callback=jQuery*"
        }).as("apiRequest");

        cy.get(':nth-child(1) > .dt-center > :nth-child(2)')
          .scrollIntoView()
          .click();

        cy.wait('@apiRequest').then((interception) => {
            assert.isNotNull(interception.response.body, 'API response is not null');
            expect(interception.response.statusCode).to.equal(200);
        });

        // Verify reservation details
        const reservationDetails = [
            { selector: '#edit_rent_cars_driver_id-search > .form-label', text: "Vodiči" },
            { selector: '#edit_rent_cars_location-component > .form-label', text: "Stredisko / Lokalita" },
            { selector: '#edit_rent_cars_date-component > .form-label', text: "Dátum požičania" },
            { selector: '#edit_rent_cars_time-component > .form-label', text: "Čas požičania" },
            { selector: '#edit_rent_cars_date_return-component > .form-label', text: "Dátum vrátenia" },
            { selector: '#edit_rent_cars_time_return-component > .form-label', text: "Čas vrátenia" },
        ];

        reservationDetails.forEach(detail => {
            cy.get(detail.selector)
              .scrollIntoView()
              .should("be.visible")
              .and("have.text", detail.text);
        });

        cy.get('#edit_rent_cars_date').scrollIntoView()
          .should("be.visible")
          .and("have.value", moment().format('DD.MM.YYYY'));

        cy.get('#edit_rent_cars_time')
          .should("be.visible")
          .and("have.value", "11:15");

        cy.get('#edit_rent_cars_date_return')
          .should("be.visible")
          .and("have.value", moment().format('DD.MM.YYYY'));

        cy.get('#edit_rent_cars_time_return')
          .should("be.visible")
          .and("have.value", "12:00");
        
        cy.get('#select2-edit_rent_cars_drive_approve_state-container')
          .scrollIntoView()
          .click();
        cy.get('#select2-edit_rent_cars_drive_approve_state-results > :nth-child(2)')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/RentCars/update.json?f=RentCars_update&callback=jQuery*')
          .as('Reservation_update');
        cy.get('#modal-success')
          .scrollIntoView()
          .should("be.visible")
          .click();
        cy.wait('@Reservation_update').then(({ request, response }) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.include("null");
    });
});
});
