/// <reference types="cypress" />
const moment = require('moment');

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';

        if (!username || !password) {
            throw new Error('Environment variables username and password must be set');
        }

        // Login
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

    it("Login and handle news modal", () => {
        // Handle news modal if present
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                cy.get('#id_news_users_modal_content')
                  .should('be.visible');
                cy.get('.confirm-modal-close')
                  .click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Verify dashboard element
        cy.get('#mainboard-content-body')
          .should('be.visible')
        cy.get('#li-travelsmenu').scrollIntoView().and('have.text', 'Cestovné príkazy').click();
        cy.get('#domestic-allowances').scrollIntoView().click();
        cy.get('#domestic-allowances_button_0').shouldHaveTrimmedText('Pridať domáci cestovný príkaz')
        cy.get('#domestic-allowances_button_0').click();
        cy.get('#select2-edit_domestic-allowances_employer-container')
        .type('domáci')
        cy.get('.select2-results__option')
        .click();
        cy.get('#add-edit_domestic-allowances_person_extended_info')
        .should('be.visible')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DomesticAllowances/read.json?f=DomesticAllowances_read&callback=jQuery*')
          .as('personloading');
        cy.get('#add-edit_domestic-allowances_person_read_data')
        .click();
        cy.wait('@personloading').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('#edit_domestic-allowances_person_home_address')
        .should('have.value', 'DCA')
        cy.get('#edit_domestic-allowances_person_email')
        .should('have.value', 'test@testovacimail.sk')
        cy.get('#edit_domestic-allowances_person_phone')
        .should('have.value', '0900000000')
        cy.get('#edit_domestic-allowances_person_work_from')
        .should('have.value', '08:00')
        cy.get('#edit_domestic-allowances_person_work_to')
        .should('have.value', '16:00')
        cy.get('#edit_domestic-allowances_person_internal_number')
        .should('have.value', '01')
        cy.get('#edit_domestic-allowances_person_company_part')
        .should('have.value', 'GPS')
        cy.get('#edit_domestic-allowances_person_function')
        .should('have.value', 'Tester')
        cy.get('#edit_domestic-allowances_start_date_1').click()
        .selectYesterdayInCalendar();
        cy.get('#edit_domestic-allowances_end_date_1').click()
        .selectYesterdayInCalendar();
        cy.get('#edit_domestic-allowances_start_time_1')
        .type('08:00');
        cy.get('#edit_domestic-allowances_end_time_1')
        .type('16:00');
        cy.get('#select2-edit_domestic-allowances_travel_unit_id-container')
        .type('IL 942DE')
        cy.get('.select2-results__option')
        .click();
        cy.get('#add-edit_domestic-allowances_unit_extended_info')
        .click();
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/DomesticAllowances/read.json?f=DomesticAllowances_read&callback=jQuery*')
          .as('unitloading');
        cy.get('#add-edit_domestic-allowances_unit_read_data')
          .click();
          cy.wait('@unitloading').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get('#domestic-allowances-tab-2_link')
        .scrollIntoView()
        .click();
        cy.get('#edit_domestic-allowances_start_etapa_date_2')
        .click()
        .selectYesterdayInCalendar();
        cy.get('#edit_domestic-allowances_start_etapa_time_2')
        .type('08:00');
        cy.get('#edit_domestic-allowances_end_etapa_date_2')
        .click()
        .selectYesterdayInCalendar();
        cy.get('#edit_domestic-allowances_end_etapa_time_2')
        .type('09:00');
        cy.get('#edit_domestic-allowances_etapa_km')
        .type('10');
        cy.get('#edit_domestic-allowances_start_etapa_place_2')
        .type('Testovacia adresa 1');
        cy.get('#edit_domestic-allowances_end_etapa_place_2')
        .type('Testovacia adresa 2');
        cy.get('#select2-edit_domestic-allowances_travel_other_type_2-container')
        .type('Taxi')
        cy.get('#select2-edit_domestic-allowances_travel_other_type_2-results')
        .click();
        cy.get('#add-edit_domestic-allowances_etapa_append')
        .click();
        cy.get('#edit_domestic-allowances_start_etapa_time_2')
        .type('09:20');
        cy.get('#edit_domestic-allowances_end_etapa_time_2')
        .type('14:00');
        cy.get('#edit_domestic-allowances_start_etapa_place_2')
        .type('Testovacia adresa 2');
        cy.get('#edit_domestic-allowances_end_etapa_place_2')
        .type('Testovacia adresa 3');
        cy.get('#edit_domestic-allowances_etapa_km')
        .type('200');
        cy.get('#select2-edit_domestic-allowances_etaps_unit_id-container')
        .type('IL 942DE')
        cy.get('.select2-results__option')
        .click();
        cy.get('#add-edit_domestic-allowances_etapa_append')
        .click();
        cy.get('#edit_domestic-allowances_start_etapa_time_2')
        .type('14:30');
        cy.get('#edit_domestic-allowances_end_etapa_time_2')
        .type('16:00');
        cy.get('#edit_domestic-allowances_start_etapa_place_2')
        .type('Testovacia adresa 3');
        cy.get('#edit_domestic-allowances_end_etapa_place_2')
        .type('Testovacia adresa 1');
        cy.get('#add-edit_domestic-allowances_etapa_append')
        .click();
        cy.get('#domestic-allowances-tab-3_link')
        .scrollIntoView()
        .click();
        cy.get('#edit_domestic-allowances_expenses_date_3')
        .click()
        .selectYesterdayInCalendar();
        cy.get('#edit_domestic-allowances_expenses_item')
        .type('Taxik');
        cy.get('#select2-edit_domestic-allowances_expenses_type-container')
        .click();
        cy.get('.select2-results__options> :nth-child(2)')
        .click();
        cy.get('#edit_domestic-allowances_expenses_price_with_vat')
        .type('10.00');
        cy.get('#add-edit_domestic-allowances_payment_append')
        .click();
        cy.get('#domestic-allowances-tab-4_link')
        .scrollIntoView()
        .click();
        cy.get('#edit_domestic-allowances_fellows_external')
        .type('Testovací spolucestujúci');
        cy.get('#add-edit_domestic-allowances_fellows_append')
        .click();
        cy.get('#domestic-allowances-tab-5_link')
        .click();
        cy.get('#edit_domestic-allowances_deposit_price_5_1')
        .type('150');
        cy.get('#edit_domestic-allowances_deposit_payment_notice_5_1')
        .type('Test');
        cy.get('#edit_domestic-allowances_deposit_finish_payment_value')
        .should('have.value', '8.80');
        cy.get('#select2-edit_domestic-allowances_finish_payment_type-container')
        .should('have.text', 'Preplatiť zamestnancovi')
        cy.get('#add-edit_domestic-allowances_bill_running')
        .click();
        cy.get('#edit_domestic-allowances_deposit_finish_payment_value')
        .should('have.value', '131.20');
        cy.get('#select2-edit_domestic-allowances_finish_payment_type-container')
        .should('have.text', 'Zamestnanec musí doplatiť');
        cy.get('#modal-success')
        .click();

        cy.get('.odd > .header-4 > :nth-child(4)')
        .click();
        cy.get('#modal-success')
        .click();
        






        
        
          
    });
});