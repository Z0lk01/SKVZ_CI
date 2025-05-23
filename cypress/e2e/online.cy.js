/// <reference types="cypress" />
const { type } = require("os");

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

        // Search and navigation
        cy.get("#main_menu_search")
          .should("be.visible")
          .and("have.attr", "placeholder", "Vyhľadávanie")
          .type("Online");

        cy.get("#main-menu-wrapper")
          .children()
          .should('have.length', 3);

        cy.get(".fa-remove")
          .should("be.visible")
          .and("have.attr", "onclick", "clear_search_bar();")
          .click();

        cy.get("#main-menu-wrapper li.favorites > a")
          .should("have.text", "Obľúbené")
          .and('have.css', 'background-color', 'rgb(89, 89, 89)');

        // Verify and click "Online" menu
        cy.get('#li-online-menu').then($el => {
            const outerText = $el[0].outerText;
            expect(outerText).to.equal('Online');
        });

        cy.get('#li-online-menu').click();

        // Verify GPS map and search functionality
        cy.get('#gps_map_main')
          .should("be.visible")
          .children()
          .should("have.length", 3);

        cy.get("#gps_map_main").click();

        cy.get('#units-online-search')
          .should("have.attr", "placeholder", "Hľadať vozidlo / osobu")
          .type("942DE");

        // Intercept and validate API call
        cy.intercept({
            method: 'POST',
            url: "https://www.tssmonitoring.sk/api/v1.3/onlines/events.json?f=onlines_events&callback=jQuery*"
        }).as("apiRequest");

        cy.contains("Opel Insignia").click();
        cy.wait('@apiRequest').then((interception) => {
            assert.isNotNull(interception.response.body, 'API response is not null');
            expect(interception.response.statusCode).to.equal(200);
        });

        // Calendar interaction
        cy.get('#units-drives-calendar-toggle > .fa-calendar')
          .should("be.visible")
          .click();

        cy.get('#units-drives-calendar-toggle-datepicker-calendar-parent > .daterangepicker')
          .should("be.visible");

        cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .month > .monthselect')
          .select(2);

        cy.get("#units-online-title")
          .should("be.visible")
          .and("have.text", "Späť na všetky vozidlá")
          .and("have.css", "background-color", "rgb(233, 30, 99)");

        // Intercept and validate another API call
        cy.intercept({
            method: 'POST',
            url: "https://www.tssmonitoring.sk/api/v1.3/userGrids/read.json?f=userGrids_read&callback=jQuery*"
        }).as("apiRequest");

        cy.get('#gps_units_online_new').click();
        cy.wait('@apiRequest').then((interception) => {
            assert.isNotNull(interception.response.body, 'API response is not null');
            expect(interception.response.statusCode).to.equal(200);
        });

        // Verify and interact with filters and columns
        cy.get('#gps_units_online_new_main_button_refresh').then($el => {
            const outerText = $el[0].outerText;
            expect(outerText).to.equal(" Obnoviť");
        });

        cy.get('#gps_units_online_new_filter_IGN')
          .children()
          .should("have.length", 4);

        cy.get("#gps_units_online_new_filter_inspections")
          .children()
          .should("have.length", 5);

        cy.get('#gps_units_online_new_columns').then($el => {
            const outerText = $el[0].outerText;
            expect(outerText).to.equal(" Vyp./Zap. stĺpce");
            $el.click();
        });

        cy.get('#gps_units_online_new_column_chooser_modal')
          .should("be.visible")
          .children()
          .should("have.length", 4)
          .and("have.css", "background-color", "rgba(0, 0, 0, 0)");

        cy.get('#gps_units_online_new_column_chooser_ul_left')
          .should("be.visible")
          .children()
          .should("have.length", 12);

        cy.get('#gps_units_online_new_column_chooser_ul_right')
          .should("be.visible")
          .children()
          .should("have.length", 12);

        cy.get('#gps_units_online_new_close_column_chooser_modal > .fa').click();

        // Verify map and driver details
        cy.get('[data-search="#E91E63"]').click();
        cy.get('#gps_units_online_new_table')
          .find(".fa-globe")
          .eq(1)
          .click();

        cy.get('#gps_units_online_new_map').should("be.visible");
        cy.get('#gps_units_online_new_info').should("be.visible");

        cy.get('#gps_units_online_new_info > :nth-child(2)')
          .should("be.visible")
          .and('have.text', 'EČV : IL 942DE ');

        cy.get('#gps_units_online_new_info > :nth-child(3)')
          .should("be.visible")
          .and("have.text", 'Meno vodiča :  test ');

        cy.get('#gps_units_online_new_close_map > .fa').click();
    });
});
