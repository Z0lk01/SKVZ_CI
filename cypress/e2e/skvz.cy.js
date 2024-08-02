
/// <reference types="cypress" />
const { type } = require("os");
import moment from 'moment';

describe('Test TSS', () => {

        beforeEach(() => {
        cy
        .clearCookies()
        cy
        .clearLocalStorage()
        cy
        .visit("https://support.tssmonitoring.sk/login")
        cy.get('#user_login') 
        .type("mzilka:mza")
        cy.get('#user_pass')
        .type("alkoholik")
        cy.get("#wp-submit") .click()
        cy.wait(15000)
        //cy.get(".confirm-modal-close") .click({force: true})
         
        });

it("Localization SK_1", () => {
        
        cy.get("#mainboard-filter-area > h1").should('contain', 'Dashboard')
        cy.get('#li-online-menu > [href="javascript:;"] > .title').should("be.visible") .click()
        cy.get('#gps_map_main').should("be.visible")
        .should("have.text", "Mapa")
        cy.get('#gps_units_online').should("be.visible")
        .should("have.text", "Dispečer")
        cy.get('#dashboard_online').should("be.visible")
        .should("have.text", "Grafické prehľady")
        cy.get('#gps_units_online_new').should("be.visible")
        .should("have.text", "Dispečer 2")
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
        .type("IL 942DE")
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
        cy.get("#usernew").should("be.visible")
        .should("have.text","Užívatelia newVytvoriť užívateľa")
        cy.get('#li-object > [href="javascript:;"]').click()
        cy.get(selectors.liRentCar).should("be.visible")
            .should("have.text", "Rezervačný systém").click();
        
        cy.get(selectors.rentCarsPrepare).should("be.visible")
            .should("have.text", "Autopožičovňa - priprave...");
        cy.get(selectors.rentCarsRequests).should("be.visible")
            .should("have.text", "Autopožičovňa - schvaľov...");
        cy.get(selectors.busPortals).should("be.visible")
            .should("have.text", "Autobusy rezervácie");
        cy.get(selectors.rentCarsReports).should("be.visible")
            .should("have.text", "Autopožičovňa reporty");
        cy.get(selectors.rentCarsMyRequests).should("be.visible")
            .should("have.text", "Autopožičovňa - moje žia...");
        cy.get(selectors.rentCars).should("be.visible")
            .should("have.text", "Autopožičovňa");
        cy.get(selectors.taxiPortals).should("be.visible")
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
        cy.get('#drivetypesnew').should("be.visible")
        .should("have.text", "Účel jazdy")
        cy.get('#driveconditionsnew').should("be.visible")
        .should("have.text", "Pravidlá pre jazdy")
        cy.get('#motohours').scrollIntoView()
        cy.get('#motohours').should("be.visible")
        .should("have.text", "Motohodiny")
        cy.get('#fuel-analyses').should("be.visible")
        .should("have.text", "Sledovanie paliva")
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
        
});
it("Korekcie a tankovania", () => {
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
        cy.get('#edit_corrections_time').type("01:00")
        cy.get('#edit_corrections_tacho').type("112233")
        cy.get('#edit_corrections_unit_id').click()
        cy.get('#search_grid_units_table_filter > label > input').type("FMC150 Test Mza")
        cy.get('#search_grid_units_table > tbody > .odd > .fixed').should("have.text","FMC150 Test Mza").click()
        cy.get('#modal-success').click()
        cy.wait(9500)
        cy.get('#costsnew').scrollIntoView().click()
        cy.wait(4500)
        cy.get('#costsnew_button_0').click()
        cy.wait(3500)
        cy.get('#edit_drivers_unit').click()
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
        cy.wait(10800)
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
      cy.get('#costsnew_table > tbody > .odd > :nth-child(8)').should("have.text", expectedQuantity);
      cy.get('#costsnew_table > tbody > .odd > :nth-child(9)').should("have.text", expectedCost);
      cy.get('#costsnew_table > tbody > .odd > .dt-center > :nth-child(2)').click()
      cy.get('#modal-success').click()
      cy.get('#calendar_costsnew').find(".fc-event-container").should("be.visible")
      cy.get('#costsnew_refresh').click()
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
      cy.get('#service-books-v2_button_0').should("be.visible")
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
});
});