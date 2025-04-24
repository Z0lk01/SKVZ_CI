/// <reference types="cypress" />
const moment = require('moment');
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



        

it("Korekcie a tankovania", () => {
//kontrola vytvárania editácie a mazania nákladov a servisnej knihy
    const currentDate = new Date();
const formattedTime = currentDate.toLocaleString('sk-SK', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
      });
      const expectedDate = moment().format('DD.MM.YYYY'); // Aktuálny dátum
      const expectedTime = '01:00'; // Očakávaný čas
      const expectedCost = "50.00 €"; // Očakávaná cena
      const expectedQuantity ="50 l"; //Očakávaný objem

        cy.get('#li-toolsmenu > [href="javascript:;"]')
        .scrollIntoView()
        .click()
        cy.get("#corrections")
        .click()
        cy.get('#corrections_button_0', {timeout: 10000 })
        .should("be.visible")
        .click()
        cy.get('#edit_corrections_time', {timeout: 10000 })
        .type("01:00")
        cy.get('#edit_corrections_tacho')
        .type("112233")
        cy.get('#edit_corrections_unit_id')
        .click()
        cy.get('#search_grid_units_table_filter > label > input')
        .type("FMC150 Test Mza")
        cy.get('#search_grid_units_table > tbody > .odd > .fixed')
        .should("have.text","FMC150 Test Mza")
        .click()
        cy.get('#modal-success').
        click()
        cy.get('#costsnew', {timeout: 10000 })
        .scrollIntoView()
        .click()
        cy.get('#costsnew_button_0', {timeout: 10000 })
        .click({force: true})
        cy.get('#edit_drivers_unit', {timeout: 10000 })
        .click({force: true})
        cy.get('#search_grid_units_table_filter > label > input')
        .type("IL 942DE")
        cy.get('#search_grid_units_table > tbody > .odd > .fixed')
        .should("have.text", "IL 942DE")
        .click()
        cy.get('#edit_costsnew_time', {timeout: 10000 })
        .type("01:00")
        cy.get('#edit_costsnew_quantity')
        .type("50")
        cy.get('#edit_costsnew_quantity_unit-helptext > .select2-container > .selection > .select2-selection > .select2-selection__arrow')
        .click()
        cy.get('#select2-edit_costsnew_quantity_unit-results')
        .children()
        .last()
        .click()
        cy.get('#edit_costsnew_price')
        .type("50")
        cy.get('#edit_costsnew_modules_currencys-helptext > .select2-container > .selection > .select2-selection > .select2-selection__arrow > b')
        .click()
        cy.get("#select2-edit_costsnew_modules_currencys-results")
        .children()
        .contains("€")
        .click()
        cy.get('#edit_costsnew_note')
        .type("test")
        cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/FuelCardsDatas/create.json?f=FuelCardsDatas_create&callback=jQuery*')
        .as('fueling')
        cy.get('#modal-success')
        .click()
        cy.wait('@fueling') .then(({ request, response }) => {
          expect(request.body).to.contain({
            fk_unit_id: "207834be-7ac5-434a-9f77-b9563fbe47d3",
            price_without_vat: "40.65",
            quantity: "50",
            price: "50",
            note: "test",
            fk_currency_id: "df50e937-69c3-48fa-909a-7da762aeef99",
          }),

          expect(response.statusCode).to.eq(200)
        }),
        cy.get('#costsnew_table > tbody > .odd > .sorting_1').then(($el) => {
                // Získa text z poľa
                const formattedText = $el.text()
                console.log("Formatted Text:", formattedText);
                //const formattedText = moment($el, 'HH:mm:DD.MM.YYYY').format('HH:mm DD.MM.YYYY');


          
                // Rozdelím text na dátum a čas
                const [datePart, timePart] = formattedText.split(' ');
                console.log("Date Part:", datePart);
                console.log("Time Part:", timePart);
                // Overí, či dátum a čas zodpovedajú očakávaným hodnotám
      expect(datePart).to.equal(expectedDate);
      expect(timePart).to.equal(expectedTime);
    });
      cy.get('#costsnew_table > tbody > .odd > :nth-child(9)')
      .should("have.text", expectedQuantity);
      cy.get('#costsnew_table > tbody > .odd > :nth-child(11)')
      .should("have.text", expectedCost);
      cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(2)')
      .click()
      cy.get('#modal-cancel')
      .click()
      .wait(2500)
      cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(3)')
      .click()
      cy.get('#modal-success')
      .click()
      cy.get('#service-books-v2')
      .click()
      cy.get('#service-books-v2_unit_filter-text')
      .scrollIntoView()
      .should("be.visible")
      .and("have.attr", "placeholder", "Všetky vozidlá...") 
      cy.get('#filter_centers_service_book_v2-component')
      .should("be.visible")
      cy.get('#filter_centers_service_book_v2-component :nth-child(2)')
      .should("have.text", "Stredisko / Lokalita: VšetkyVšetky")
      cy.get('#filter_service_books_last-checkbox > .form-label')
      .should("have.text", "Filter na dátum podľa posledného servisu")
      cy.get('#filter_service_books_next-checkbox > .form-label')
      .should("have.text", "Filter na dátum podľa najbližšieho servisu")
      cy.get('#service_books-date_from-component > .form-label > b')
      .should("have.text", "Začiatok obdobia")
      cy.get('#service_books-date_to-component > .form-label > b').
      should("have.text", "Koniec obdobia")
      cy.get('#service_books-date_from_next-component > .form-label > b')
      .should("have.text", "Začiatok obdobia")
      cy.get('#service_books-date_to_next-component > .form-label > b')
      .should("have.text", "Koniec obdobia")
      cy.get('#service_books-product_type_filter-component > .form-label > b')
      .should("have.text", "Servisný úkon")
      cy.get('#add-service-books-v2_button_search')
      .should("have.text", "Načítať dáta podľa zvolených kritérií")
      cy.get('#add-service-books-v2_button_reset')
      .should("have.text", "Reset")
      cy.get('#service-books-v2_button_0')
      .scrollIntoView()
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="6"]')
      .should("have.text", "EČV")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="7"]')
      .should("have.text", "Názov vozidla")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="9"]')
      .should("have.text", "Posledný servis")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="10"]')
      .should("have.text", "Dátum najbližšieho servisu")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="11"]')
      .should("have.text", "Vykonať servis pri (km)")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="12"]')
      .should("have.text", "Miesto")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="13"]')
      .should("have.text", "Servisný úkon")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="14"]')
      .should("have.text", "Množstvo")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="15"]')
      .should("have.text", "Cena bez DPH")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="16"]')
      .should("have.text", "Cena s DPH")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="18"]')
      .should("have.text", "Zákazník")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="19"]')
      .should("have.text", "Spárované s nákladom")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > .sorting_desc')
      .should("have.text", "Vytvorené")
      cy.get('#service-books-v2_button_0')
      .click()
      cy.wait(2500)
      cy.get('#edit_service_books_unit')
      .click()
      cy.get('#search_grid_units_table_filter > label > input')
      .type("IL 942DE")
      cy.get('#search_grid_units_table > tbody > .odd > .fixed')
      .click()
      cy.get('#edit_service_books_time')
      .type("01:00")
      cy.get('#service_books-settings-tab-2_link')
      .click()
      cy.get("#select2-edit_service_books_modules_products-container")
      .type("brzdy")
      cy.get("#select2-edit_service_books_modules_products-results")
      .click()
      cy.get('#modal-success')
      .click()
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(3)')
      .should("be.visible")
      .and("have.text", "IL 942DE")
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(4)')
      .should("be.visible")
      .and("have.text", "Opel Insignia")
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(5)').then(($el) => {
        // Získa text z poľa
        const formattedText = $el.text()
        console.log("Formatted Text:", formattedText);
        //const formattedText = moment($el, 'HH:mm:DD.MM.YYYY').format('HH:mm DD.MM.YYYY');


  
        // Rozdelím text na dátum a čas
        const [datePart, timePart] = formattedText.split(' ');
        console.log("Date Part:", datePart);
        console.log("Time Part:", timePart);
        // Overí, či dátum a čas zodpovedajú očakávaným hodnotám
expect(datePart).to.equal(expectedDate);
expect(timePart).to.equal(expectedTime);
});
});
});