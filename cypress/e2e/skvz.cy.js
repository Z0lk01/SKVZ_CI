
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
          .get("#wp-submit").click()
          .wait(15000);
    });

it("Localization SK_1", () => {
        //kontrola viditeľnosti elemntov a ich textu
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
        cy.get("#mainboard-filter-area > h1").should('contain', 'Dashboard')
        cy.get('#li-online-menu > [href="javascript:;"] > .title').should("be.visible") .click()
        cy.get('#gps_map_main').should("be.visible").and("have.text", "Mapa")
        cy.get('#gps_units_online_new').should("be.visible").and("have.text", "Dispečer")
        cy.get('#dashboard_online').should("be.visible").and("have.text", "Grafické prehľady")
        cy.get('#unit-notifications').should("be.visible").and("have.text", "Hlásenia")
        cy.get("#favorit-gps_map_main").should("not.be.visible")
        .click({force: true})
        cy.get("#favorit-gps_map_main").should("not.be.visible").and("have.class", "favorit")
        .click({force: true})
        cy.get("#gps_map_main").click()
        cy.wait(2000)
        cy.get("#units-online-search").should("have.attr", "placeholder", "Hľadať vozidlo / osobu")
        .type("942DE")
        cy.wait(3500)
        cy.get('#company_name').should("be.visible").and("have.text", "Firmy a strediská")
        cy.get('.all').should("be.visible")
        cy.get(".zap").should("be.visible")
        cy.get(".vyp").should("be.visible")
        cy.get(".not").should("be.visible")
        cy.get(".multi").should("be.visible")
        cy.get("#units-online-box").should("be.visible")
        cy.get('#li-online-menu > [href="javascript:;"] > .title').click()
        cy.get('#li-object > [href="javascript:;"]').click()
        cy.get('#users').should("be.visible").and("have.text","UžívateliaVytváranie užívateľa")
        cy.get("#groups").should("be.visible").and("have.text","Skupiny")
        cy.get('#li-object > [href="javascript:;"]').click()
        cy.get('#li-rentcar > [href="javascript:;"]').should("be.visible").and("have.text", "Rezervačný systém").click();
        
        cy.get('#rent_cars_prepare_v2').should("be.visible").and("have.text", "Autopožičovňa - priprave...");
        cy.get('#rent_cars_requests_for_me_v2').should("be.visible").and("have.text", "Autopožičovňa - schvaľov...");
        cy.get("#busportals").should("be.visible").and("have.text", "Autobusy rezervácie");
        cy.get('#rent-cars-reports').should("be.visible").and("have.text", "Autopožičovňa reporty");
        cy.get('#rent_cars_my_requests_v2').should("be.visible").and("have.text", "Autopožičovňa - moje žia...");
        cy.get('#rent_cars_v2').should("be.visible").and("have.text", "Autopožičovňa");
        cy.get("#taxiportals").should("be.visible").and("have.text", "Taxislužba");
        cy.get('#li-rentcar > [href="javascript:;"]').click()
        cy.get('#li-settings > [href="javascript:;"]').should("be.visible").and("have.text", "Nastavenia").click()
        cy.get('#li-drivers > #drivers').should("be.visible").and("have.text", "Vodiči")
        cy.get('#units').should("be.visible").and("have.text", "Vozidlá")
        cy.get('#notifys').should("be.visible").and("have.text", "UpozorneniaNotifikácie")
        cy.get('#centers').should("be.visible").and("have.text", "Strediská")
        cy.get('#cost-centers').should("be.visible").and("have.text", "Nákladové strediská")
        cy.get('#departments').should("be.visible").and("have.text", "Oddelenia")
        cy.get('#li-settings > [href="javascript:;"]').click()
        cy.get('#li-poismenu > [href="javascript:;"]').should("be.visible").and("have.text", "Body záujmu").click()
        cy.get('#pois').should("be.visible").and("have.text", "Správa oblastí")
        cy.get('#poi_groups').should("be.visible").and("have.text", "Správa kategórií oblastí")
        cy.get('#li-poismenu > [href="javascript:;"]').click()
        cy.get('#li-drivebooksmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Jazdy").click()
        cy.wait(3500)
        cy.get('#drivebooks').should("be.visible").and("have.text", "Správa jázd")
        cy.get('#drivetypes').should("be.visible").and("have.text", "Účel jazdy")
        cy.get('#drive_conditions').should("be.visible").and("have.text", "Pravidlá pre jazdy")
        cy.get('#drivebook_report_copy_0').should("be.visible").and("have.text", "Kniha jázd")
        cy.get('#dailyreport_report_copy_0').should("be.visible").and("have.text", "Denný prehľad jázd")
        cy.get('#monthlyreport_report_copy_0').should("be.visible").and("have.text", "Mesačný/Súhrnný prehľad")
        cy.get('#drivetypes').should("be.visible").and("have.text", "Účel jazdy")
        cy.get('#drive_conditions').should("be.visible").and("have.text", "Pravidlá pre jazdy")
        cy.get('#motohours').scrollIntoView()
        cy.get('#motohours').should("be.visible").and("have.text", "Motohodiny")
        cy.get('#fuel-analyses').scrollIntoView()
        cy.get('#travel-allowance')
        cy.get('#newdrives').scrollIntoView().should("have.text", "Jazdy").and("be.visible")
        cy.get("#main-menu-wrapper > .ps-scrollbar-y-rail > .ps-scrollbar-y").click()
        cy.get('#consumptions').scrollIntoView().should("have.text", "Správa spotrieb").and("be.visible")
        cy.get('#routeplans').scrollIntoView().should("have.text", "Plánovač trás").and("be.visible")
        cy.get('#drivebooks_manuals').scrollIntoView().should("have.text", "Evidencia jázd").and("be.visible")
        cy.get('#li-drivebooksmenu > [href="javascript:;"]').click()
        cy.get('#li-reportsmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Reporty")
        cy.get('#li-fuelsmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Tankovania").click()
        cy.get('#addfuelcost').should("be.visible").and("have.text", "Pridať tankovanie")
        cy.get('#fuelcards').should("be.visible").and("have.text", "Tankovacie karty")
        cy.get('#fuel_cards_imports').should("be.visible").and("have.text", "Import z tankovacích kariet")
        cy.get('#fuelreport_report_copy_0').should("be.visible").and("have.text", "Prehľad tankovaní")
        cy.get('#li-fuelsmenu > [href="javascript:;"]').click()
        cy.get('#li-toolsmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Nástroje").click()
        cy.get('#corrections').should("be.visible").and("have.text", "Korekcia tachometra")
        cy.get('#fuellevel_corrections').should("be.visible").and("have.text", "Korekcia hladiny paliva")
        cy.get('#costs_report_copy_0').should("be.visible").and("have.text", "Prehľad nákladov")
        cy.get('#costsnew').should("be.visible").and("have.text", "Správa nákladov")
        cy.get('#service-books-v2').should("be.visible").and("have.text", "Servisná kniha")
        cy.get('#li-toolsmenu > [href="javascript:;"]').click()
        cy.get('#li-tachographsmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Tachografy").click()
        cy.get('#aetr').should("be.visible").and("have.text", "Aetrs")
        cy.get('#aetrsdispatchers').should("be.visible").and("have.text", "Dispečer")
        cy.get('#aetrsnotifications').should("be.visible").and("have.text", "Porušenia AETR")
        cy.get('#tachographs').should("be.visible").and("have.text", "Stiahnuté súbory")
        cy.get('#aetrsdddviewers').should("be.visible").and("have.text", "Prehliadač súborov")
        cy.get('#li-tachographsmenu > [href="javascript:;"]').click()
        cy.get('#li-workingsmenu > [href="javascript:;"]').should("be.visible").and("have.text", "Práca").click()
        cy.get('#works').should("be.visible").and("have.text", "Prehľad práce")
        cy.get('#li-workingsmenu > [href="javascript:;"]').click()
        cy.get('#li-vzv-menu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Vysokozdvižné vozíky").click()
        cy.get('#vzvusage').should("be.visible").and("have.text", "Využiteľnosť VZV")
        cy.get('#li-vzv-menu > [href="javascript:;"]').click()
        cy.get('#li-planner > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Plánovač").click()
        cy.get('#planners').should("be.visible").and("have.text", "Plánovač")
        cy.get('#li-planner > [href="javascript:;"]').click()
        cy.get('#li-document-repository-menu > [href="javascript:;"]').should("be.visible").and("have.text", "GDPR").click()
        cy.get('#document-repository').click()
        cy.wait(2500)
        cy.get('#document-repository_panel > .box > .panel_header > .title').should("be.visible").and("have.text", "Testovací dokument - GDPR")
        cy.get('.content-body > .row > .col-xs-12').should("be.visible").and("have.text", "Toto je testovací opis dokumentu, ktorý môže byť veľmi dlhý. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        
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

        cy.get('#li-toolsmenu > [href="javascript:;"]').scrollIntoView().click()
        cy.get("#corrections").click()
        cy.wait(6000)
        cy.get('#corrections_button_0').should("be.visible").click()
        cy.wait(1500)
        cy.get('#edit_corrections_time').type("01:00")
        cy.get('#edit_corrections_tacho').type("112233")
        cy.get('#edit_corrections_unit_id').click()
        cy.get('#search_grid_units_table_filter > label > input').type("FMC150 Test Mza")
        cy.get('#search_grid_units_table > tbody > .odd > .fixed').should("have.text","FMC150 Test Mza").click()
        cy.get('#modal-success').click()
        cy.wait(9500)
        cy.get('#costsnew').scrollIntoView().click()
        cy.wait(4500)
        cy.get('#costsnew_button_0').click({force: true})
        cy.wait(3500)
        cy.get('#edit_drivers_unit').click({force: true})
        cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE")
        cy.get('#search_grid_units_table > tbody > .odd > .fixed').should("have.text", "IL 942DE").click()
        cy.wait(1200)
        cy.get('#edit_costsnew_time').type("01:00")
        cy.get('#edit_costsnew_quantity').type("50")
        cy.get('#edit_costsnew_quantity_unit-helptext > .select2-container > .selection > .select2-selection > .select2-selection__arrow').click()
        cy.get('#select2-edit_costsnew_quantity_unit-results').children().last().click()
        cy.get('#edit_costsnew_price').type("50")
        cy.get('#edit_costsnew_modules_currencys-helptext > .select2-container > .selection > .select2-selection > .select2-selection__arrow > b').click()
        cy.get("#select2-edit_costsnew_modules_currencys-results").children().contains("€").click()
        cy.get('#edit_costsnew_note').type("test")
        cy.get('#modal-success').click()
        cy.wait(8800)
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
      cy.get('#costsnew_table > tbody > .odd > :nth-child(8)').should("have.text", expectedQuantity);
      cy.get('#costsnew_table > tbody > .odd > :nth-child(10)').should("have.text", expectedCost);
      cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(2)').click()
      cy.get('#modal-cancel').click().wait(2500)
      cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(3)').click()
      cy.get('#modal-success').click()
      cy.get('#service-books-v2').click()
      cy.get('#service-books-v2_unit_filter-text').scrollIntoView().should("be.visible").and("have.attr", "placeholder", "Všetky vozidlá...") //pokus o scrollnutie aby test prebehol
      cy.get('#filter_centers_service_book_v2-component').should("be.visible")
      cy.get('#filter_centers_service_book_v2-component :nth-child(2)').should("have.text", "Stredisko / Lokalita: VšetkyVšetky")
      cy.get('#filter_service_books_last-checkbox > .form-label').should("have.text", "Filter na dátum podľa posledného servisu")
      cy.get('#filter_service_books_next-checkbox > .form-label').should("have.text", "Filter na dátum podľa najbližšieho servisu")
      cy.get('#service_books-date_from-component > .form-label > b').should("have.text", "Začiatok obdobia")
      cy.get('#service_books-date_to-component > .form-label > b').should("have.text", "Koniec obdobia")
      cy.get('#service_books-date_from_next-component > .form-label > b').should("have.text", "Začiatok obdobia")
      cy.get('#service_books-date_to_next-component > .form-label > b').should("have.text", "Koniec obdobia")
      cy.get('#service_books-product_type_filter-component > .form-label > b').should("have.text", "Servisný úkon")
      cy.get('#add-service-books-v2_button_search').should("have.text", "Načítať dáta podľa zvolených kritérií")
      cy.get('#add-service-books-v2_button_reset').should("have.text", "Reset")
      cy.get('#service-books-v2_button_0').scrollIntoView()
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="6"]').should("have.text", "EČV")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="7"]').should("have.text", "Názov vozidla")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="9"]').should("have.text", "Posledný servis")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="10"]').should("have.text", "Dátum najbližšieho servisu")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="11"]').should("have.text", "Vykonať servis pri (km)")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="12"]').should("have.text", "Miesto")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="13"]').should("have.text", "Servisný úkon")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="14"]').should("have.text", "Množstvo")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="15"]').should("have.text", "Cena bez DPH")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="16"]').should("have.text", "Cena s DPH")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="18"]').should("have.text", "Zákazník")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > [data-column-index="19"]').should("have.text", "Spárované s nákladom")
      cy.get('#service-books-v2_table_wrapper > .dataTables_scroll > .dataTables_scrollHead > .dataTables_scrollHeadInner > .table > thead > tr > .sorting_desc').should("have.text", "Vytvorené")
      cy.get('#service-books-v2_button_0').click()
      cy.wait(2500)
      cy.get('#edit_service_books_unit').click()
      cy.get('#search_grid_units_table_filter > label > input').type("IL 942DE")
      cy.get('#search_grid_units_table > tbody > .odd > .fixed').click()
      cy.get('#edit_service_books_time').type("01:00")
      cy.get('#service_books-settings-tab-2_link').click()
      cy.get("#select2-edit_service_books_modules_products-container").type("brzdy")
      cy.get("#select2-edit_service_books_modules_products-results").click()
      cy.get('#modal-success').click()
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(3)').should("be.visible").and("have.text", "IL 942DE")
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(4)').should("be.visible").and("have.text", "Opel Insignia")
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
it("Administrácia a vytváranie užívateľa", () => {
//kontrola vytorenia testovacieho uživateľa priradenie práv a vozidiel
cy.get('#li-object > [href="javascript:;"]').should("be.visible").click()
cy.get('#users').should("be.visible").click()
cy.get('#users_button_0').should("be.visible").click()
cy.get('#edit_users_username').type("testuser")
cy.get('#edit_users_password').type("testuser")
cy.get('#edit_users_reset_on_login-helptext > .switchery').click()
cy.get('#edit_users_email').type("hello@hello.com")
cy.get('#edit_users_role').click()
cy.get('#search_grid_roles_table > tbody > :nth-child(1) > .fixed').click()
cy.get('#edit_users_supervisor').click()
cy.get('#search_grid_users_with_profiles_table_filter > label > input').type("mza")
cy.get('#search_grid_users_with_profiles_table > tbody > :nth-child(1) > .fixed').should("have.text", "mza").click()
cy.get('#users-info-tab-2_link').should("be.visible").and("have.text", "Profil").click()
cy.get('#edit_users_profile_surname').type("surname")
cy.get('#edit_users_profile_name').type("name")
cy.get('#edit_users_profile_phone').type("0900000000")
cy.get('#edit_users_profile_note').type("testovacia poznámka k užívateľovi ktorého vytváram 100% v Cypress teste")
cy.get('#users-info-tab-3_link').click()
cy.wait(3200)
cy.get('#select2-edit_users_language-container').click()
cy.get('#select2-edit_users_language-results > :nth-child(1)').should("be.visible").and("have.text", "Čeština").click()
cy.get('#update_user_can_approve_driving-helptext > .switchery').click()
cy.get('#update_user_prepare_to_rent-helptext > .switchery').click()
cy.get('#modal-success').click()
cy.wait(8000)
cy.get('#users_table_filter > label > input').click().type("testuser")
cy.get('#users_table > tbody > :nth-child(1) > :nth-child(2)').should("have.text", "testuser")
cy.get('#users_table > tbody > :nth-child(1) > :nth-child(4)').should("have.text", 'Zákazník - administrátor')
cy.get('.dt-center > :nth-child(4)').should("be.visible").click()
cy.intercept({
    method: 'POST',
    url: "https://support.tssmonitoring.sk/api/v1.3/users/delete.json?f=users_delete&callback=jQuery*"
     }).as("apiRequest")
cy.get('#modal-success').click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
});
it("Kontrola rezervačného systému", () => {
//kontrola elementov rezervačného systému , textu a viditeľnosti rezervácií
cy.get('#li-rentcar > [href="javascript:;"]').should("be.visible").and("have.text", "Rezervačný systém").click()
cy.get("#rentcar").children().should("have.length", 7)
cy.get('#rent_cars_prepare_v2').should("be.visible").and("have.text", "Autopožičovňa - priprave...")
cy.get('#rent_cars_requests_for_me_v2').should("be.visible").and("have.text", "Autopožičovňa - schvaľov...")
cy.get('#rent-cars-reports').should("be.visible").and("have.text", "Autopožičovňa reporty")
cy.get('#busportals').should("be.visible").and("have.text", "Autobusy rezervácie")
cy.get('#rent_cars_my_requests_v2').should("be.visible").and("have.text", "Autopožičovňa - moje žia...")
cy.get('#rent_cars_v2').should("be.visible").and("have.text", "Autopožičovňa")
cy.get('#taxiportals').should("be.visible").and("have.text", "Taxislužba")
cy.get('#rent_cars_prepare_v2').click()
cy.get('#rent_cars_prepare_v2_panel > section.box > .panel_header > .title').should("be.visible").and("have.text", "Pripravenie vozidla")
cy.get('#rent_cars_prepare_v2_table').should("be.visible")
cy.get('#rent_cars_requests_for_me_v2').click()
cy.get('#rent_cars_requests_for_me_v2_panel > section.box > .panel_header > .title').should("be.visible").and("have.text", "Schvaľovanie žiadostí")
cy.get('#filter_timeline_calendar_rent_cars_requests_for_me_v2-checkbox > .form-label').should("have.text", "Časová os").and("be.visible")
cy.get('#filter_calendar_rent_cars_requests_for_me_v2-checkbox > .form-label').should("have.text", "Kalendár").and("be.visible")
cy.get('#filter_timeline_calendar_rent_cars_requests_for_me_v2-helptext > .switchery').click()
cy.get('.vis-timeline').should("be.visible")
cy.get('#edit_rent_cars_requests_for_me_v2_timeline_moveToReservation > span').should("be.visible")
cy.get('#edit_rent_cars_requests_for_me_v2_timeline_moveToday').should("be.visible")
cy.get('#edit_rent_cars_requests_for_me_v2_timeline_zoomToday').should("be.visible")
cy.get('#edit_rent_cars_requests_for_me_v2_timeline_zoomWeek').should("be.visible")
cy.intercept({
    method: 'POST',
    url: "https://www.tssmonitoring.sk/api/v1.3/RentCars/read.json?f=RentCars_read&callback=jQuery*"
}).as("apiRequest")
cy.get('#rent_cars_requests_for_me_v2_table > tbody > :nth-child(1) > .dt-center > :nth-child(2)').scrollIntoView().click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
cy.get('#edit_rent_cars_driver_id-search > .form-label').scrollIntoView().should("be.visible").and("have.text", "Vodiči")
cy.get('#edit_rent_cars_driver_id')
  .invoke('val')
  .then((val) => {
    expect(val.trim()).to.eq('000000A'); // Očakávaná hodnota
    });
cy.get('#edit_rent_cars_location-component > .form-label').should("be.visible").and("have.text", "Stredisko / Lokalita")
cy.get('#edit_rent_cars_date-component > .form-label').should("be.visible").and("have.text", "Dátum požičania")
cy.get('#edit_rent_cars_time-component > .form-label').should("be.visible").and("have.text", "Čas požičania")
cy.get('#edit_rent_cars_date').should("be.visible").and("have.value", "28.01.2025")
cy.get('#edit_rent_cars_time').should("be.visible").and("have.value", "11:15")
cy.get('#edit_rent_cars_date_return-component > .form-label').should("be.visible").and("have.text", "Dátum vrátenia")
cy.get('#edit_rent_cars_time_return-component > .form-label').should("be.visible").and("have.text", "Čas vrátenia")
cy.get('#edit_rent_cars_date_return').should("be.visible").and("have.value", "28.01.2025")
cy.get('#edit_rent_cars_time_return').should("be.visible").and("have.value", "12:00")
cy.get('#edit_rent_cars_unit-search > .form-label').should("be.visible").and("have.text", "Vyberte vozidlo")
cy.get('#edit_rent_cars_unit').should("be.visible").and("have.value", "detekcia pv // detekcia pv")
cy.get('#edit_rent_cars_drive_approver-component > .form-label').should("be.visible").and("have.text", "Schvaľovateľ")
cy.get('#select2-edit_rent_cars_drive_approver-container').should("be.visible").and("have.text", "×test mza mza")
cy.get('#edit_rent_cars_destination-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Cieľ jazdy")
cy.get('#edit_rent_cars_destination').should("be.visible").and("have.value", "Kancel")
cy.get('#edit_rent_cars_drive_places-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Miesta jazdy")
cy.get('#edit_rent_cars_drive_passengers-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Pasažieri")
cy.get('#edit_rent_cars_drive_number_passengers-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Počet pasažierov")
cy.get('#edit_rent_cars_drive_number_passengers').should("be.visible").and("have.value", "1")
cy.get('#edit_rent_cars_drive_number_estimated_distance-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Odhadovaná vzdialenosť (km)")
cy.get('#edit_rent_cars_drive_number_purpose_driving-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Účel jazdy")
cy.get('#edit_rent_cars_drive_number_purpose_driving').should("be.visible").and("have.value", "Test")
cy.get('#edit_rent_cars_drive_note-component > .form-label').should("be.visible").and("have.text", "Poznámka")
cy.get('#edit_rent_cars_mail-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "E-mail pre informáciu o stave žiadosti")
cy.get('#edit_rent_cars_drive_approve_state-component > .form-label').should("be.visible").and("have.text", "Schváliť / zamietnuť")
cy.get('#select2-edit_rent_cars_drive_approve_state-container').should("be.visible").and("have.text", "×Schválené")
cy.get('#modal-cancel').scrollIntoView().should("be.visible").click()
cy.get('#filter_timeline_calendar_rent_cars_requests_for_me_v2-helptext > .switchery').click()
});
it.only("Vytvorenie rezervácie vozidla", () => {
//kontrola vytvorenia rezervácie vozidla a jej editácia a schválenie
cy.get('#li-rentcar > [href="javascript:;"]').should("be.visible").and("have.text", "Rezervačný systém").click()
cy.get('#rent_cars_my_requests_v2').should("be.visible").and("have.text", "Autopožičovňa - moje žia...").click()
cy.get('#rent_cars_my_requests_v2_panel > section.box > .panel_header > .title').should("be.visible").and("have.text", "Správa mojich žiadostí")
cy.get('#filter_timeline_calendar_rent_cars_my_requests_v2-checkbox > .form-label').should("have.text", "Časová os").and("be.visible")
cy.get('#filter_calendar_rent_cars_my_requests_v2-checkbox > .form-label').should("have.text", "Kalendár").and("be.visible")
cy.get('#filter_date_rent_cars_my_requests_v2-checkbox > .form-label').should("have.text", "Filter podľa dátumu").and("be.visible")
cy.get('#rent_cars_my_requests_v2_button')
  .invoke('text')
  .then((text) => {
    expect(text.trim()).to.eq('Vytvoriť novú žiadosť'); // Očakávaná hodnota
    });
cy.get('#div_filter_for_rent_cars_my_requests_v2_container_general_span').should("be.visible")
cy.intercept({
    method: 'GET',
    url: "https://www.tssmonitoring.sk/api/v1.3/Profiles/getList/basic/pk_profile_id/5451e151-e69f-42fd-a178-79b669c92957.json?f=Profiles_getList&callback=jQuery*"
}).as("apiRequest")
cy.get('#rent_cars_my_requests_v2_button_0').click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
cy.get('.modal-title').should("be.visible").and("have.text", "Vytvorenie novej položky")
cy.get('#edit_rent_cars_driver_id-search > .form-label').should("be.visible").and("have.text", "Vodiči")
cy.get('#edit_rent_cars_drive_approver-component > .form-label').should("be.visible").and("have.text", "Schvaľovateľ")
cy.get('#select2-edit_rent_cars_drive_approver-container').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_location-component > .form-label').scrollIntoView().should("be.visible").and("have.text", "Stredisko / Lokalita")
cy.get('#select2-edit_rent_cars_location-container').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_mail-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "E-mail pre informáciu o stave žiadosti")
cy.get('#edit_rent_cars_mail').scrollIntoView().should("be.visible").and("have.value", "zilka@tssgroup.sk")
cy.get('#edit_rent_cars_date-component > .form-label').scrollIntoView().should("be.visible").and("have.text", "Dátum požičania")
const currentDate = new Date();
const formattedTime = currentDate.toLocaleString('sk-SK', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
      });
      const expectedDate = moment().format('DD.MM.YYYY'); // Aktuálny dátum
cy.get('#edit_rent_cars_date').should("be.visible").and("have.value", expectedDate)
cy.get('#edit_rent_cars_time').should("be.visible").and("have.value", "00:00")
cy.get('#edit_rent_cars_date_return-component > .form-label').should("be.visible").and("have.text", "Dátum vrátenia")
cy.get('#edit_rent_cars_date_return').should("be.visible").and("have.value", expectedDate)
cy.get('#edit_rent_cars_time_return-component > .form-label').should("be.visible").and("have.text", "Čas vrátenia")
cy.get('#edit_rent_cars_time_return').should("be.visible").and("have.value", "00:00")
cy.get('#edit_rent_cars_destination-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Cieľ jazdy")
cy.get('#edit_rent_cars_destination').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_drive_number_passengers-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Počet pasažierov")
cy.get('#edit_rent_cars_drive_number_passengers-helptext > :nth-child(2)').should("be.visible")
cy.get('#edit_rent_cars_drive_number_purpose_driving-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Účel jazdy")
cy.get('#edit_rent_cars_drive_number_purpose_driving').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_unit-search > .form-label').scrollIntoView().should("be.visible").and("have.text", "Vyberte vozidlo")
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_drive_approve_state-component > .form-label').should("be.visible").and("have.text", "Schváliť / zamietnuť")
cy.get('#edit_rent_cars_drive_approve_state-component > .form-label').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_drive_note-component > .form-label').should("be.visible").and("have.text", "Poznámka")
cy.get('#edit_rent_cars_drive_number_estimated_distance-helptext > :nth-child(2)').scrollIntoView().should("be.visible").and("have.text", "Odhadovaná vzdialenosť (km)")
cy.get('#edit_rent_cars_drive_number_estimated_distance').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_drive_note').scrollIntoView().should("be.visible")
//rezervácia s pozitívnym výsledkom
cy.get('#select2-edit_rent_cars_drive_approver-container').scrollIntoView().should("be.visible").click()
cy.get("#select2-edit_rent_cars_drive_approver-results").should("be.visible").click()
cy.get('#edit_rent_cars_destination').scrollIntoView().should("be.visible").type("Práca")
cy.get('#edit_rent_cars_drive_number_passengers').scrollIntoView().should("be.visible").type("2")
cy.get('#edit_rent_cars_drive_number_purpose_driving').scrollIntoView().should("be.visible").type("Testovací účel jazdy vytvorený pomocou Cypress")
cy.get('#edit_rent_cars_drive_note').scrollIntoView().should("be.visible").type("Testovacia rezervácia vytvorená pomocou Cypress")
cy.get('#select2-edit_rent_cars_location-container').scrollIntoView().should("be.visible").click()
cy.get("#select2-edit_rent_cars_location-results > :nth-child(3)").click()
cy.get('#edit_rent_cars_time').scrollIntoView().should("be.visible").type("22:00")
cy.get('#edit_rent_cars_time_return').scrollIntoView().should("be.visible").type("23:00")
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible").click()
cy.get('#search_grid_units_table_filter > label > input').should("be.visible").type("IL 942DE")
cy.get('#search_grid_units_table > tbody > .odd > :nth-child(2)').should("be.visible").and("have.text", "Opel Insignia").click()
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible").and("have.value", "IL 942DE")
cy.intercept({
    method: 'POST',
    url: "https://www.tssmonitoring.sk/api/v1.3/RentCars/create.json?f=RentCars_create&callback=jQuery*"
}).as("apiRequest")
cy.get('#modal-success').scrollIntoView().should("be.visible").click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
cy.wait(3200)
cy.get('#rent_cars_requests_for_me_v2').scrollIntoView().click()
cy.get('#rent_cars_requests_for_me_v2_table > tbody > :nth-child(1) > .dt-center').scrollIntoView()
cy.get('#rent_cars_requests_for_me_v2_table > tbody > :nth-child(1) > .dt-center > :nth-child(2)').scrollIntoView().click()
cy.get('#edit_rent_cars_driver_id').scrollIntoView().should("be.visible").and("have.value", "test mza mza")
cy.get('#edit_rent_cars_date').scrollIntoView().should("be.visible").and("have.value", expectedDate)
cy.get('#edit_rent_cars_date_return').scrollIntoView().should("be.visible").and("have.value", expectedDate)
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible").and("have.value", "IL 942DE // Opel Insignia")
cy.get('#edit_rent_cars_drive_number_purpose_driving').scrollIntoView().should("be.visible").and("have.value", "Testovací účel jazdy vytvorený pomocou Cypress")
cy.get('#edit_rent_cars_drive_note').scrollIntoView().should("be.visible").and("have.value", "Testovacia rezervácia vytvorená pomocou Cypress")
cy.get('#select2-edit_rent_cars_drive_approve_state-container').scrollIntoView().should("be.visible").click()
cy.get("#select2-edit_rent_cars_drive_approve_state-results > :nth-child(2)").should("be.visible").and("have.text", "Zamietnuté").click()
cy.get('#modal-success').scrollIntoView().should("be.visible").click()
//rezervácia s negatívnym výsledkom
cy.get('#rent_cars_my_requests_v2').scrollIntoView().click()
cy.intercept({
    method: 'GET',
    url: "https://www.tssmonitoring.sk/api/v1.3/Profiles/getList/basic/pk_profile_id/5451e151-e69f-42fd-a178-79b669c92957.json?f=Profiles_getList&callback=jQuery*"
}).as("apiRequest")
cy.get('#rent_cars_my_requests_v2_button_0').click()
cy.wait('@apiRequest').then((interception) => {
    assert.isNotNull(interception.response.body, 'API response is not null')
    expect(interception.response.statusCode).to.equal(200);
});
cy.get('#select2-edit_rent_cars_drive_approver-container').scrollIntoView().should("be.visible").click()
cy.get("#select2-edit_rent_cars_drive_approver-results").should("be.visible")
cy.get('#edit_rent_cars_destination').scrollIntoView().should("be.visible").type("Práca")
cy.get('#edit_rent_cars_drive_number_passengers').scrollIntoView().should("be.visible").type("2")
cy.get('#edit_rent_cars_drive_number_purpose_driving').scrollIntoView().should("be.visible")
cy.get('#edit_rent_cars_drive_note').scrollIntoView().should("be.visible")
cy.get('#select2-edit_rent_cars_location-container').scrollIntoView().should("be.visible").click()
cy.get("#select2-edit_rent_cars_location-results > :nth-child(3)").click()
cy.get('#edit_rent_cars_time').scrollIntoView().should("be.visible").type("22:00")
cy.get('#edit_rent_cars_time_return').scrollIntoView().should("be.visible").type("23:00")
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible").click()
cy.get('#search_grid_units_table_filter > label > input').should("be.visible").type("IL 942DE")
cy.get('#search_grid_units_table > tbody > .odd > :nth-child(2)').should("be.visible").and("have.text", "Opel Insignia").click()
cy.get('#edit_rent_cars_unit').scrollIntoView().should("be.visible").and("have.value", "IL 942DE")
cy.intercept({
    method: 'POST',
    url: "https://www.tssmonitoring.sk/api/v1.3/RentCars/create.json?f=RentCars_create&callback=jQuery*"
}).as("reservationRequest")
cy.get('#modal-success').scrollIntoView().should("be.visible").click()
cy.wait('@reservationRequest').then((interception) => {
    cy.parseJsonpResponse(interception).then((parsedResponse) => {
      const errorsString = parsedResponse.response.data.error;
      
      // Rozdelíme chyby podľa bodkočiarok
      const errorsArray = errorsString.split(';').filter(Boolean); // .filter(Boolean) odstráni prázdne položky
  
      // Overenie očakávaných chýb
      expect(errorsArray).to.include('APPROVER_ERROR_CODE');
      expect(errorsArray).to.include('DESTINATION_ERROR_CODE');
      expect(errorsArray).to.include('PURPOSE_ERROR_CODE');
     // Overenie počtu chýb
      expect(errorsArray.length).to.equal(3);
    });
});




















});
});
