
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
          .visit("https://support.tssmonitoring.sk/login")
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
        cy.get('#gps_map_main').should("be.visible")
        .should("have.text", "Mapa")
        cy.get('#gps_units_online_new').should("be.visible")
        .should("have.text", "Dispečer")
        cy.get('#dashboard_online').should("be.visible")
        .should("have.text", "Grafické prehľady")
        cy.get('#unit-notifications').should("be.visible")
        .should("have.text", "Hlásenia")
        cy.get("#favorit-gps_map_main").should("not.be.visible")
        .click({force: true})
        cy.get("#favorit-gps_map_main").should("not.be.visible")
        .should("have.class", "favorit")
        .click({force: true})
        cy.get("#gps_map_main").click()
        cy.wait(2000)
        cy.get("#units-online-search").should("have.attr", "placeholder", "Hľadať vozidlo / osobu")
        .type("942DE")
        cy.wait(3500)
        cy.get('#company_name').should("be.visible")
        .should("have.text", "Firmy a strediská")
        cy.get('.all').should("be.visible")
        cy.get(".zap").should("be.visible")
        cy.get(".vyp").should("be.visible")
        cy.get(".not").should("be.visible")
        cy.get(".multi").should("be.visible")
        cy.get("#units-online-box").should("be.visible")
        cy.get('#li-online-menu > [href="javascript:;"] > .title').click()
        cy.get('#li-object > [href="javascript:;"]').click()
        cy.get('#users').should("be.visible")
        .should("have.text","UžívateliaVytváranie užívateľa")
        cy.get("#groups").should("be.visible")
        .should("have.text","Skupiny")
        cy.get('#li-object > [href="javascript:;"]').click()
        cy.get('#li-rentcar > [href="javascript:;"]').should("be.visible")
            .should("have.text", "Rezervačný systém").click();
        
        cy.get('#rent_cars_prepare_v2').should("be.visible")
            .should("have.text", "Autopožičovňa - priprave...");
        cy.get('#rent_cars_requests_for_me_v2').should("be.visible")
            .should("have.text", "Autopožičovňa - schvaľov...");
        cy.get("#busportals").should("be.visible")
            .should("have.text", "Autobusy rezervácie");
        cy.get('#rent-cars-reports').should("be.visible")
            .should("have.text", "Autopožičovňa reporty");
        cy.get('#rent_cars_my_requests_v2').should("be.visible")
            .should("have.text", "Autopožičovňa - moje žia...");
        cy.get('#rent_cars_v2').should("be.visible")
            .should("have.text", "Autopožičovňa");
        cy.get("#taxiportals").should("be.visible")
            .should("have.text", "Taxislužba");
        cy.get('#li-rentcar > [href="javascript:;"]').click()
        cy.get('#li-settings > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Nastavenia").click()
        cy.get('#li-drivers > #drivers').should("be.visible")
        .should("have.text", "Vodiči")
        cy.get('#units').should("be.visible")
        .should("have.text", "Vozidlá")
        cy.get('#notifys').should("be.visible")
        .should("have.text", "UpozorneniaNotifikácie")
        cy.get('#centers').should("be.visible")
        .should("have.text", "Strediská")
        cy.get('#cost-centers').should("be.visible")
        .should("have.text", "Nákladové strediská")
        cy.get('#departments').should("be.visible")
        .should("have.text", "Oddelenia")
        cy.get('#li-settings > [href="javascript:;"]').click()
        cy.get('#li-poismenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Body záujmu").click()
        cy.get('#pois').should("be.visible")
        .should("have.text", "Správa oblastí")
        cy.get('#poi_groups').should("be.visible")
        .should("have.text", "Správa kategórií oblastí")
        cy.get('#li-poismenu > [href="javascript:;"]').click()
        cy.get('#li-drivebooksmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Jazdy").click()
        cy.wait(3500)
        cy.get('#drivebooks').should("be.visible")
        .should("have.text", "Správa jázd")
        cy.get('#drivetypes').should("be.visible")
        .should("have.text", "Účel jazdy")
        cy.get('#drive_conditions').should("be.visible")
        .should("have.text", "Pravidlá pre jazdy")
        cy.get('#drivebook_report_copy_0').should("be.visible")
        .should("have.text", "Kniha jázd")
        cy.get('#dailyreport_report_copy_0').should("be.visible")
        .should("have.text", "Denný prehľad jázd")
        cy.get('#monthlyreport_report_copy_0').should("be.visible")
        .should("have.text", "Mesačný/Súhrnný prehľad")
        cy.get('#drivetypes').should("be.visible")
        .should("have.text", "Účel jazdy")
        cy.get('#drive_conditions').should("be.visible")
        .should("have.text", "Pravidlá pre jazdy")
        cy.get('#motohours').scrollIntoView()
        cy.get('#motohours').should("be.visible")
        .should("have.text", "Motohodiny")
        cy.get('#fuel-analyses').scrollIntoView()
        cy.get('#travel-allowance')
        cy.get('#newdrives').scrollIntoView()
        .should("have.text", "Jazdy")
        cy.get("#main-menu-wrapper > .ps-scrollbar-y-rail > .ps-scrollbar-y").click()
        cy.get('#consumptions').scrollIntoView()
        .should("have.text", "Správa spotrieb")
        cy.get('#routeplans').scrollIntoView()
        .should("have.text", "Plánovač trás")
        cy.get('#drivebooks_manuals').scrollIntoView()
        .should("have.text", "Evidencia jázd")
        cy.get('#li-drivebooksmenu > [href="javascript:;"]').click()
        cy.get('#li-reportsmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Reporty")
        cy.get('#li-fuelsmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Tankovania").click()
        cy.get('#addfuelcost').should("be.visible")
        .should("have.text", "Pridať tankovanie")
        cy.get('#fuelcards').should("be.visible")
        .should("have.text", "Tankovacie karty")
        cy.get('#fuel_cards_imports').should("be.visible")
        .should("have.text", "Import z tankovacích kariet")
        cy.get('#fuelreport_report_copy_0').should("be.visible")
        .should("have.text", "Prehľad tankovaní")
        cy.get('#li-fuelsmenu > [href="javascript:;"]').click()
        cy.get('#li-toolsmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Nástroje").click()
        cy.get('#corrections').should("be.visible")
        .should("have.text", "Korekcia tachometra")
        cy.get('#fuellevel_corrections').should("be.visible")
        .should("have.text", "Korekcia hladiny paliva")
        cy.get('#costs_report_copy_0').should("be.visible")
        .should("have.text", "Prehľad nákladov")
        cy.get('#costsnew').should("be.visible")
        .should("have.text", "Správa nákladov")
        cy.get('#service-books-v2').should("be.visible")
        .should("have.text", "Servisná kniha")
        cy.get('#li-toolsmenu > [href="javascript:;"]').click()
        cy.get('#li-tachographsmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Tachografy").click()
        cy.get('#aetr').should("be.visible")
        .should("have.text", "Aetrs")
        cy.get('#aetrsdispatchers').should("be.visible")
        .should("have.text", "Dispečer")
        cy.get('#aetrsnotifications').should("be.visible")
        .should("have.text", "Porušenia AETR")
        cy.get('#tachographs').should("be.visible")
        .should("have.text", "Stiahnuté súbory")
        cy.get('#aetrsdddviewers').should("be.visible")
        .should("have.text", "Prehliadač súborov")
        cy.get('#li-tachographsmenu > [href="javascript:;"]').click()
        cy.get('#li-workingsmenu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Práca").click()
        cy.get('#works').should("be.visible")
        .should("have.text", "Prehľad práce")
        cy.get('#li-workingsmenu > [href="javascript:;"]').click()
        cy.get('#li-vzv-menu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Vysokozdvižné vozíky").click()
        cy.get('#vzvusage').should("be.visible")
        .should("have.text", "Využiteľnosť VZV")
        cy.get('#li-vzv-menu > [href="javascript:;"]').click()
        cy.get('#li-planner > [href="javascript:;"]').should("be.visible")
        .should("have.text", "Plánovač").click()
        cy.get('#planners').should("be.visible")
        .should("have.text", "Plánovač")
        cy.get('#li-planner > [href="javascript:;"]').click()
        cy.get('#li-document-repository-menu > [href="javascript:;"]').should("be.visible")
        .should("have.text", "GDPR").click()
        cy.get('#document-repository').click()
        cy.wait(2500)
        cy.get('#document-repository_panel > .box > .panel_header > .title').should("be.visible").should("have.text", "Testovací dokument - GDPR")
        cy.get('.content-body > .row > .col-xs-12').should("be.visible").should("have.text", "Toto je testovací opis dokumentu, ktorý môže byť veľmi dlhý. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")

        
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
      cy.get('#service-books-v2_unit_filter-text').scrollIntoView().should("be.visible").should("have.attr", "placeholder", "Všetky vozidlá...") //pokus o scrollnutie aby test prebehol
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
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(3)').should("be.visible").should("have.text", "IL 942DE")
      cy.get('#service-books-v2_table > tbody > :nth-child(1) > :nth-child(4)').should("be.visible").should("have.text", "Opel Insignia")
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
it.only("Kontrola rezervačného systému", () => {
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
});












});
