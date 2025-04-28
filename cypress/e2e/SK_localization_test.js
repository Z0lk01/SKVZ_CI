/// <reference types="cypress" />
const moment = require('moment');

describe('Testy TSS monitoringu', () => {
    beforeEach(() => {
        const username = Cypress.env('username') || 'your-username';
        const password = Cypress.env('password') || 'your-password';
        const gdpr = Cypress.env('gdpr') || 'your-gdpr-text';

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

    it("Localization SK_1", () => {
        // Handle news modal if present
        cy.get('body').then($body => {
            if ($body.find('#id_news_users_modal_content').length > 0) {
                cy.get('#id_news_users_modal_content').should('be.visible');
                cy.get('.confirm-modal-close').click();
            } else {
                cy.log('#id_news_users_modal_content not found');
            }
        });

        // Verify dashboard elements
        cy.get("#mainboard-filter-area > h1")
          .should('contain', 'Dashboard');

        const menuItems = [
            { selector: '#gps_map_main', text: 'Mapa' },
            { selector: '#gps_units_online_new', text: 'Dispečer' },
            { selector: '#dashboard_online', text: 'Grafické prehľady' },
            { selector: '#unit-notifications', text: 'Hlásenia' },
        ];

        menuItems.forEach(item => {
            cy.get(item.selector)
              .should("be.visible")
              .and("have.text", item.text);
        });

        // Verify reservation system menu
        cy.get('#li-rentcar > [href="javascript:;"]')
          .should("be.visible")
          .and("have.text", "Rezervačný systém")
          .click();

        const reservationMenuItems = [
            { selector: '#rent_cars_prepare_v2', text: "Autopožičovňa - priprave..." },
            { selector: '#rent_cars_requests_for_me_v2', text: "Autopožičovňa - schvaľov..." },
            { selector: '#busportals', text: "Autobusy rezervácie" },
            { selector: '#rent-cars-reports', text: "Autopožičovňa reporty" },
            { selector: '#rent_cars_my_requests_v2', text: "Autopožičovňa - moje žia..." },
            { selector: '#rent_cars_v2', text: "Autopožičovňa" },
            { selector: '#taxiportals', text: "Taxislužba" },
        ];

        reservationMenuItems.forEach(item => {
            cy.get(item.selector)
              .should("be.visible")
              .and("have.text", item.text);
        });

        // Verify settings menu
        cy.get('#li-settings > [href="javascript:;"]')
          .should("be.visible")
          .and("have.text", "Nastavenia")
          .click();

        const settingsMenuItems = [
            { selector: '#li-drivers > #drivers', text: "Vodiči" },
            { selector: '#units', text: "Vozidlá" },
            { selector: '#notifys', text: "UpozorneniaNotifikácie" },
            { selector: '#centers', text: "Strediská" },
            { selector: '#cost-centers', text: "Nákladové strediská" },
            { selector: '#departments', text: "Oddelenia" },
        ];

        settingsMenuItems.forEach(item => {
            cy.get(item.selector)
              .should("be.visible")
              .and("have.text", item.text);
        });

        // Verify GDPR document
        cy.get('#li-document-repository-menu > [href="javascript:;"]')
          .should("be.visible")
          .and("have.text", "GDPR")
          .click();

        cy.get('#document-repository')
          .click();

        cy.get('#document-repository_panel > .box > .panel_header > .title')
          .should("be.visible")
          .and("have.text", "Testovací dokument - GDPR");

        cy.get('.content-body > .row > .col-xs-12')
          .should("be.visible")
          .and("have.text", gdpr);
    });
});