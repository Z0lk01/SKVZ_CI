/// <reference types="cypress" />
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
          .visit("https://support.tssmonitoring.sk/login")
          .get('#user_login').type(username)
          .get('#user_pass').type(password)
          .get("#wp-submit").click()
          .wait(15000);
    });
        
    it("Component 1", () => {
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
        cy.get("#main_menu_search")
          .should("be.visible")
          .should("have.attr", "placeholder", "Vyhľadávanie")   
          .type("Online")
          .get("#main-menu-wrapper").children().should('have.length', 3)
          .get(".fa-remove").should("be.visible").should("have.attr", "onclick", "clear_search_bar();")
          .click()
          .get("#main-menu-wrapper li.favorites > a ").should("have.text", "Obľúbené").should('have.css', 'background-color', 'rgb(89, 89, 89)')
          
          //označenie elementu a použitie funkcie .then()na extrakciu "outerText" a porovnanie s očakávaným textom
          .get('#li-online-menu').then($el => {
                const outerText = $el[0].outerText;
                expect(outerText).to.equal('Online')
        });
         cy.get('#li-online-menu')  
             .click()
          .get('#gps_map_main').should("be.visible").children().should("have.length", 3)
          .get("#gps_map_main")
             .click()
         .get('#units-online-search')
         .should("have.attr" , "placeholder", "Hľadať vozidlo / osobu")
         .type("942DE")
         cy.intercept({
            method: 'POST',
            url: "https://support.tssmonitoring.sk/api/v1.3/onlines/index.json?f=onlines_index&callback=jQuery*"
             }).as("apiRequest")
        cy.get('.away > b').click()
        cy.wait('@apiRequest').then((interception) => {
                assert.isNotNull(interception.response.body, 'API response is not null')
                expect(interception.response.statusCode).to.equal(200);
        cy.get('#units-drives-calendar-toggle > .fa-calendar').should("be.visible").click()
        cy.get('#units-drives-calendar-toggle-datepicker-calendar-parent > .daterangepicker').should("be.visible")
        cy.get('#units-drives-calendar-toggle-datepicker-calendar-parent > .daterangepicker').should("be.visible")
        cy.get('.left > .calendar-table > .table-condensed > thead > :nth-child(1) > .month > .monthselect').select(7)
        cy.get("#units-online-title").should("be.visible").should("have.text", "Späť na všetky vozidlá").should("have.css","background-color", "rgb(233, 30, 99)")
        cy.intercept({
            method: 'POST',
            url: "https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetViewportInfo"
             }).as("apiRequest")
        cy.get("#units-online-title").click()
            //cy.wait('@apiRequest').then((interception) => {
               //assert.isNotNull(interception.response.body, 'API response is not null')
               //expect(interception.response.statusCode).to.equal(200);
            cy.intercept({
                method: 'POST',
                url: "https://support.tssmonitoring.sk/api/v1.3/userGrids/read.json?f=userGrids_read&callback=jQuery*"
                }).as("apiRequest")
                 cy.get('#gps_units_online_new').click()
            cy.wait('@apiRequest').then((interception) => {
                    assert.isNotNull(interception.response.body, 'API response is not null')
                    expect(interception.response.statusCode).to.equal(200); 
        cy.get('#gps_units_online_new_main_button_refresh').then($el => {
                    const outerText = $el[0].outerText;
                    expect(outerText).to.equal(" Obnoviť")
        cy.get('#gps_units_online_new_filter_IGN').children().should("have.length", "4")
        cy.get("#gps_units_online_new_filter_inspections").children().should("have.length", "5")
            cy.intercept({
            method: 'POST',
            url: "https://support.tssmonitoring.sk/api/v1.3/userNotificationAlerts/getList.json?f=userNotificationAlerts_getList&callback=jQuery*"
            }).as("apiRequest")
        cy.get('#gps_units_online_new_full_screen_btn').click()
             cy.wait('@apiRequest').then((interception) => {
                    assert.isNotNull(interception.response.body, 'API response is not null')
                    expect(interception.response.statusCode).to.equal(200);
                    cy.get('#gps_units_online_new_columns').then($el => {
                        const outerText = $el[0].outerText;
                        expect(outerText).to.equal(" Vyp./Zap. stĺpce");
                        $el.click()
        
        cy.get('#gps_units_online_new_column_chooser_modal').should("be.visible").children().should("have.length", 4).should("have.css", "background-color", "rgba(0, 0, 0, 0)")
        cy.get('#gps_units_online_new_column_chooser_ul_left').should("be.visible").children().should("have.length", 11)
        cy.get('#gps_units_online_new_column_chooser_ul_right').should("be.visible").children().should("have.length", 12)
        cy.get('#gps_units_online_new_close_column_chooser_modal > .fa').click()
        
         
         cy.get('[data-search="#E91E63"]').click()
         cy.get('#gps_units_online_new_table').find(".fa-globe").eq(1).click()
         cy.get('#gps_units_online_new_map').should("be.visible")
         cy.get('#gps_units_online_new_info').should("be.visible")
         cy.get('#gps_units_online_new_info > :nth-child(2)').should("be.visible").should("have.text", "EČV : IL 942DE ")
         cy.get('#gps_units_online_new_info > :nth-child(3)').should("be.visible").should("have.text", "Meno vodiča : test mza mza ")
         cy.get('#gps_units_online_new_close_map > .fa').click()
         cy.get('#gps_units_online_new_filter_IGN  > :nth-child(1)').should("be.visible").click()
         cy.get('#gps_units_online_new_filter_inspections > :nth-child(3)').should("be.visible").click()
         cy.get('.even > .gps_units_online_new_input_name_column > [style="width:100%; min-width:310px; text-align: left;  cursor: default;"] > [style="float: right; z-index: 0; font-size: 15px;"] > .fa-leaf')
         .should('have.css', 'color', 'rgb(250, 130, 104)')
         cy.get('.even > .gps_units_online_new_input_name_column > [style="width:100%; min-width:310px; text-align: left;  cursor: default;"] > .dropdown > .fa').click()
         cy.intercept({
            method: 'POST',
            url: "https://support.tssmonitoring.sk/api/v1.3/units/index.json?_mode=DataTables&is_archived=0&is_deleted=0&callback=jQuery*"
            }).as("apiRequest")
         cy.get('.even > .gps_units_online_new_input_name_column > [style="width:100%; min-width:310px; text-align: left;  cursor: default;"] > .dropdown > .dropdown-menu  > :nth-child(1)').click()
               cy.wait('@apiRequest').then((interception) => {
               assert.isNotNull(interception.response.body, 'API response is not null')
               expect(interception.response.statusCode).to.equal(200);
             cy.wait(3400)
               cy.get("#units-info-basic-tab-1").should("be.visible").children().should("have.length", 17)
        cy.intercept({
            method: 'POST',
            url: "https://support.tssmonitoring.sk/api/v1.3/units/releaseLock.json?f=units_releaseLock&callback=jQuery*"
            }).as("apiRequest")
        cy.get('#modal-cancel').click()
            cy.wait('@apiRequest').then((interception) => {
            assert.isNotNull(interception.response.body, 'API response is not null')
            expect(interception.response.statusCode).to.equal(200);
            cy.get('#gps_units_online_new_filter_inspections > :nth-child(1)').should("be.visible").click()
            cy.get('#gps_units_online_new_table > tbody').children().should("have.length", 10)
            cy.get(':nth-child(7) > .gps_units_online_new_input_name_column > [style="width:100%; min-width:310px; text-align: left;  cursor: default;"] > .dropdown > .fa').click()
            cy.intercept({
                method: 'POST',
                url: "https://support.tssmonitoring.sk/api/v1.3/UnitNotifications/index.json?_mode=DataTables&callback=jQuery*"
                }).as("apiRequest")
                cy.wait('@apiRequest').then((interception) => {
                    assert.isNotNull(interception.response.body, 'API response is not null')
                    expect(interception.response.statusCode).to.equal(200);
            cy.get('#unit-notifications').click()
            cy.get("#unit-notifications_table_wrapper").children().should("have.length", 4)
            cy.intercept({
                method: 'POST',
                url: "https://support.tssmonitoring.sk/api/v1.3/UnitNotifications/read/8374128.json?f=UnitNotifications_read&callback=jQuery*"
                }).as("apiRequest")
            cy.get(".dt-center header-1 fixed").should("be.visible").click()
            cy.wait('@apiRequest').then((interception) => {
                assert.isNotNull(interception.response.body, 'API response is not null')
                expect(interception.response.statusCode).to.equal(200);
                cy.get("#add-modal-map-header-button-1729511006991").click();
                



         


        


       

       

          











                });
                });
                });
               });
            });
        });
     });
    });
});
});
});