/// <reference types="cypress" />

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

  it('should do something', () => {
   cy.get('#li-settings')
    .should('be.visible')
    .click();
    cy.get('#units')
    .click();
    cy.get('#units_table_filter> :nth-child(1)')
    .should('be.visible')
    .type('IL 942DE')
    cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/units/read.json?f=units_read&callback=jQuery*')
    .as('settingsLoading');
    cy.get('#units_table > tbody > .odd > :nth-child(3)').should('have.text', 'IL 942DE');
    cy.get('#units_table> tbody> :nth-child(1)> :nth-child(1)> :nth-child(2)')
    .click();
    cy.wait('@settingsLoading').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    // Verify basic information in vehicle settings
        cy.get('#units-info-basic-tab-1_link > span')
          .should("be.visible")
          

        const informationnMenuItems = [
            {selector: '#add-edit_unit_cropper_button_add_new', text: " Pridať nový obrázok"},
            { selector: '#edit_unit_basic_ecv-helptext > :nth-child(2)', text: "EČV" },
            { selector: '#edit_unit_basic_internal_number-helptext > :nth-child(2)', text: "Interné číslo" },
            { selector: '#edit_unit_basic_category-component > .form-label', text: "(1) Druh" },
            { selector: '#edit_unit_basic_name-helptext > :nth-child(2)', text: "Názov" },
            { selector: '#edit_unit_basic_key_position-helptext > :nth-child(2)', text: "Umiestnenie kľúča" },
            { selector: '#edit_unit_basic_kind_ownership-component > .form-label', text: "Druh vlastníctva" },
            { selector: '#edit_unit_basic_center-component > .form-label', text: "Stredisko / Lokalita" },
            { selector: '#edit_unit_basic_car_rent-checkbox > .form-label', text: "Umožniť požičanie vozidla" },
            { selector: '#edit_unit_basic_pool-checkbox > .form-label', text: "Pool vozidlo" },
            { selector: '#units-info-basic-tab-1 > #label_unit_profile-component > .form-label', text: "Priradenie vozidla na súkromné účely je možné urobiť v záložke História" },
            { selector: '#edit_unit_basic_car_archive_date-component > .form-label', text: "Dátum preradenia do archívu" },
            { selector: '#edit_customer_unit_note-component > .form-label', text: "Poznámka" },
            ];
            informationnMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-extended-tab-1_link')
        .scrollIntoView()
        .click();
        const InsuranceMenuItems = [
            {selector:  '#units-data-tab_link', text: "Údaje o vozidle"},
            { selector: '#units-extended-drive-style-tab_link', text: "Štýl jazdy" },
            { selector: '#units-insurance-tab-1_link', text: "Povinné" },
            { selector: '#units-insurance-tab-2_link', text: "Havarijné" },
            { selector: '#edit_unit_mandatory_insurance-helptext > :nth-child(2)', text: "Poisťovňa" },
            { selector: '#edit_unit_mandatory_insurance_number-helptext > :nth-child(2)', text: "Číslo poistnej zmluvy" },
            { selector: '#edit_unit_mandatory_insurance_date-helptext > [style="width:25%;display:inline-block"]', text: "Dátum uzavretia" },
            { selector: '#edit_unit_mandatory_insurance_date-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Platnosť zmluvy do" },
            { selector: '#edit_unit_mandatory_resposible_person-helptext > :nth-child(2)', text: "Zodpovedná osoba" },
            { selector: '#edit_unit_mandatory_price-helptext > :nth-child(2)', text: "Cena poistenia na rok" },
            { selector: '#edit_unit_mandatory_participation-helptext > :nth-child(2)', text: "Spoluúčasť" },
        ];
        InsuranceMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        
        cy.get('#units-insurance-tab-2_link')
            .scrollIntoView()
            .click();
        const EmergencyInsuranceMenuItems = [
            { selector: '#edit_unit_emergency-helptext > :nth-child(2)', text: "Poisťovňa" },
            { selector: '#edit_unit_emergency_insurance_number-helptext > :nth-child(2)', text: "Číslo poistnej zmluvy" },
            { selector: '#edit_unit_emergency_insurance_date-helptext > [style="width:25%;display:inline-block"]', text: "Dátum uzavretia" },
            { selector: '#edit_unit_emergency_insurance_date-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Platnosť zmluvy do" },
            { selector: '#edit_unit_emergency_resposible_person-helptext > :nth-child(2)', text: "Zodpovedná osoba" },
            { selector: '#edit_unit_emergency_price-helptext > :nth-child(2)', text: "Cena poistenia na rok" },
            { selector: '#edit_unit_emergency_participation-helptext > :nth-child(2)', text: "Spoluúčasť" },
            {selector:  '#edit_unit_emergency_glass_participation-helptext > :nth-child(2)', text: "Spoluúčasť sklo" },
        ];
        EmergencyInsuranceMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
    
        cy.get('#units-leasing-tab_link')
            .scrollIntoView()
            .click();
        const LeasingMenuItems = [
            { selector: '#units-leasing-tab_link', text: "Leasing" },
            { selector: '#units-leasing-tab-1_link', text: "Leasing" },
            { selector: '#units-leasing-tab-2_link', text: "Operatívny leasing" },
            { selector: '#edit_unit_leasing_company-helptext > :nth-child(2)', text: "Leasingová spoločnosť" },
            { selector: '#edit_unit_leasing_number-helptext > :nth-child(2)', text: "Číslo leasingovej zmluvy" },
            { selector: '#edit_unit_leasing-helptext > [style="width:25%;display:inline-block"]', text: "Dátum uzavretia" },
            { selector: '#edit_unit_leasing-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Platnosť zmluvy do" },
            { selector: '#edit_unit_leasing_monthly_cost-helptext > :nth-child(2)', text: "Mesačná splátka" },
            { selector: '#edit_unit_leasing_monthly_cost_without_vat-helptext > :nth-child(2)', text: "Mesačná splátka bez DPH" },
            { selector: '#edit_unit_leasing_note-component > .form-label', text: "Poznámka" },
        ];
        LeasingMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-leasing-tab-2_link')
            .scrollIntoView()
            .click();
            const OperativeLeasingMenuItems = [
            {selector:  '#edit_unit_operative_leasing_company-helptext > :nth-child(2)', text: "Leasingová spoločnosť"},
            { selector: '#edit_unit_operative_leasing_number-helptext > :nth-child(2)', text: "Číslo leasingovej zmluvy" },
            { selector: '#edit_unit_operative_leasing-helptext > [style="width:25%;display:inline-block"]', text: "Dátum uzavretia" },
            { selector: '#edit_unit_operative_leasing-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Platnosť zmluvy do" },
            { selector: '#edit_unit_operative_leasing_number_month-helptext > :nth-child(2)', text: "Dĺžka zmluvy" },
            { selector: '#edit_unit_operative_leasing_drive_total-helptext > :nth-child(2)', text: "Celkový nájazd (km)" },
            { selector: '#edit_unit_operative_leasing_monthly_cost-helptext > :nth-child(2)', text: "Mesačná splátka" },
            { selector: '#edit_unit_operative_leasing_monthly_cost_without_vat-helptext > :nth-child(2)', text: "Mesačná splátka bez DPH" },
            { selector: '#edit_unit_operative_leasing_monthly_drive-helptext > :nth-child(2)', text: "Mesačný nájazd (km)" }, 
            { selector: '#edit_unit_operative_leasing_price_more_length-helptext > :nth-child(2)', text: "Cena za viac km" },  
            { selector: '#edit_unit_operative_leasing_price_less_length-helptext > :nth-child(2)', text: "Cena za menej km" },
            { selector: '#edit_unit_extend_liability_insurance-checkbox > .form-label', text: "Povinné ručenie" },
            { selector: '#edit_unit_extend_hav-checkbox > .form-label', text: "HAV" },
            { selector: '#edit_unit_extend_glass-checkbox > .form-label', text: "Sklá" },
            { selector: '#edit_unit_extend_road_tax-checkbox > .form-label', text: "Cestná daň" },
            { selector: '#edit_unit_extend_radio-checkbox > .form-label', text: "Rádio" },
            { selector: '#edit_unit_extend_assistance-checkbox > .form-label', text: "Asistencia" },
            { selector: '#edit_unit_extend_vignette-checkbox > .form-label', text: "Diaľničná známka" },
            { selector: '#edit_unit_extend_maintenance-helptext > :nth-child(2)', text: "Údržba" },
            { selector: '#edit_unit_extend_pneu-helptext > :nth-child(2)', text: "Pneu - Všetky / 1 sada" },
            { selector: '#edit_unit_operative_leasing_note-component > .form-label', text: "Poznámka" },
        ];
        OperativeLeasingMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-data-tab-2_link')
            .scrollIntoView()
            .click();
        const DataMenuItems = [
            { selector: '#edit_inspection_date-helptext > [style="width:25%;display:inline-block"]', text: "Dátum poslednej TK" },
            { selector: '#edit_inspection_date-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Najbližšia TK (*)" },
            { selector: '#edit_unit_inspection_place-helptext > :nth-child(2)', text: "Miesto TK" },
            { selector: '#edit_unit_inspection_notification_tk-checkbox > .form-label', text: "Upozornenie" },
            { selector: '#edit_unit_inspection_tk_service_book-checkbox > .form-label', text: "Zaznamenať v servisnej knihe" },
        ];
        DataMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-inspection-tab-2_link')
            .scrollIntoView()
            .click();
        const InspectionMenuItems = [
            { selector: '#edit_inspection_date_ek-helptext > [style="width:25%;display:inline-block"]', text: "Dátum poslednej EK" },
            { selector: '#edit_inspection_date_ek-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Najbližšia EK (*)" },
            { selector: '#edit_unit_inspection_place_ek-helptext > :nth-child(2)', text: "Miesto EK" },
            { selector: '#edit_unit_inspection_notification_ek-checkbox > .form-label', text: "Upozornenie" },
            { selector: '#edit_unit_inspection_ek_service_book-checkbox > .form-label', text: "Zaznamenať v servisnej knihe" },
        ];
        InspectionMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-inspection-tab-3_link')
            .scrollIntoView()
            .click();
        const InspectionTachographsMenuItems = [
            { selector: '#edit_inspection_date_tachograf-helptext > [style="width:25%;display:inline-block"]', text: "Dátum poslednej kontroly" },
            { selector: '#edit_inspection_date_tachograf-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Najbližšia kontrola" },
            { selector: '#edit_unit_inspection_place_tachograf-helptext > :nth-child(2)', text: "Miesto ciachovania" },
            { selector: '#edit_unit_inspection_notification_tachograf-checkbox > .form-label', text: "Upozornenie" },
            { selector: '#edit_unit_inspection_tachograf_service_book-checkbox > .form-label', text: "Zaznamenať v servisnej knihe" },
        ];
        InspectionTachographsMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-tab-3_link')
            .scrollIntoView()
            .click();
        const EquipmentMenuItems = [
            { selector: '#units-equipment-tab-2_link', text: "Autolekárnička" },
            { selector: '#edit_unit_purchase_date-helptext > [style="width:25%;display:inline-block"]', text: "Dátum nákupu" },
            { selector: '#edit_unit_purchase_date-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Platnosť do" },
            { selector: '#edit_unit_took_person-helptext > :nth-child(2)', text: "Prevzal" },
        ];
        EquipmentMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
        cy.get('#units-equipment-tab-3_link')
            .scrollIntoView()
            .click();
            const SummerTiresMenuItems = [
            { selector: '#edit_unit_dimensions_st-helptext > :nth-child(2)', text: "Rozmery" },
            { selector: '#edit_unit_brand_st-helptext > :nth-child(2)', text: "Značka a model" },
            { selector: '#edit_unit_acquisition_date_st-component > [style="width:48%;display:inline-block"]', text: "Dátum obstarania" },
            { selector: '#edit_unit_price_st-helptext > :nth-child(2)', text: "Nákupná cena na 1 ks" },
            { selector: '#edit_unit_place_st-helptext > :nth-child(2)', text: "Miesto uskladnenia" },
            ];
            SummerTiresMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-equipment-tab-4_link')
            .scrollIntoView()
            .click();
            const WinterTiresMenuItems = [
            { selector: '#edit_unit_dimensions_wt-helptext > :nth-child(2)', text: "Rozmery" },
            { selector: '#edit_unit_brand_wt-helptext > :nth-child(2)', text: "Značka a model" },
            { selector: '#edit_unit_acquisition_date_wt-component > [style="width:48%;display:inline-block"]', text: "Dátum obstarania" },
            { selector: '#edit_unit_price_wt-helptext > :nth-child(2)', text: "Nákupná cena na 1 ks" },
            //{ selector: '#edit_unit_place_wt-helptext > :nth-child(2)', text: "Miesto uskladnenia" },
            ];
            WinterTiresMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-equipment-tab-5_link')
            .scrollIntoView()
            .click();
            const OtherEquipmentMenuItems = [
            { selector: '#edit_unit_others_accessories_tab-component > .form-label', text: "Ostatné príslušenstvo" },
            ];
            OtherEquipmentMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-highway-tab-1_link')
            .scrollIntoView()
            .click();
            const HighwayMenuItems = [
            { selector: '#edit_units_highway_products__1-component > .form-label', text: "Typ" },
            { selector: '#edit_units_highway_name__1-helptext > :nth-child(2', text: "Názov" },
            { selector: '#edit_units_highway_date_from__1-component > .form-label', text: "Platnosť od" },
            { selector: '#edit_units_highway_date_to__1-component > .form-label', text: "Platnosť do" },
            ];
            HighwayMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-data-tab-5_link')
            .scrollIntoView()
            .click();
            const EconomyMenuItems = [
            { selector: '#edit_unit_extend_date-helptext > [style="width:25%;display:inline-block"]', text: "Dátum obstarania" },
            { selector: '#edit_unit_extend_date-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Dátum vyradenia" },
            { selector: '#edit_unit_date_first_and_sale-helptext > [style="width:25%;display:inline-block"]', text: "Dátum prvého zaradenia" },
            { selector: '#edit_unit_date_first_and_sale-helptext > [style="margin-left:23.5%;width:25%;display:inline-block"]', text: "Dátum predaja" },
            { selector: '#edit_unit_acquisition_price-helptext > :nth-child(2)', text: "Obstarávacia cena s DPH" },
            { selector: '#edit_unit_acquisition_price_without_vat-helptext > :nth-child(2)', text: "Obstarávacia cena bez DPH" },
            { selector: '#edit_acquisition_currencys-component > .form-label', text: "Mena" },
            { selector: '#edit_unit_sale_price-helptext > :nth-child(2)', text: "Odpredajová cena s DPH" },
            { selector: '#edit_unit_sale_price_without_vat-helptext > :nth-child(2)', text: "Odpredajová cena bez DPH" },
            { selector: '#edit_sale_price_currencys-component > .form-label', text: "Mena" },
            { selector: '#edit_unit_monthly_rent-helptext > :nth-child(2)', text: "Mesačné nájomné" },
            { selector: '#edit_unit_monthly_rent_without_vat-helptext > :nth-child(2)', text: "Mesačné nájomné bez DPH" },
            { selector: '#edit_monthly_rent_currencys-component > .form-label', text: "Mena" },
            { selector: '#edit_unit_acquisition_depreciation_cost-helptext > :nth-child(2)', text: "1% odpisová cena" },
            { selector: '#edit_unit_acquisition_usage_year-helptext > :nth-child(2)', text: "Doba užívania v čase kúpy (rok)" },
            ];
            EconomyMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-data-tab-6_link')
            .scrollIntoView()
            .click();
            const OthersMenuItems = [
            { selector: '#edit_unit_extend_fuel_consumption_recalculate-checkbox > .form-label', text: "Prepočítať normovanú spotrebu do reportu" },
            { selector: '#edit_unit_extend_fuel_level_percent_recalculate-checkbox > .form-label', text: "Prepočítavať stav hladiny paliva v nádrži z % na litre" },
            { selector: '#edit_unit_extend_fuel_level_percent_recalculate-helptext > .help-block', text: "Výpočet je len orientačný, a podmienkou je mať nastavenú veľkosť palivovej nádrže." },
            { selector: '#edit_unit_extend_show_fuellevel_liters-checkbox > .form-label', text: "Zobrazovať stav hladiny v litroch" },
            { selector: '#edit_unit_extend_show_fuellevel_percent-checkbox > .form-label', text: "Zobrazovať stav hladiny v %" },
            { selector: '#edit_unit_extend_fuel_analyse_automate_authorisation-checkbox > .form-label', text: "Automatická autorizácia tankovaní zo sond" },
            { selector: '#edit_unit_extend_fuel_analyse_automate_price-helptext > :nth-child(2)', text: "Cena za 1 liter paliva pri  automatickej autorizácii" },
            { selector: '#edit_unit_segment-helptext > :nth-child(2)', text: "Eurosegment" },
            { selector: '#edit_unit_segment_car_policy-component > .form-label', text: "Segment vozidla" },
            ];
            OthersMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-data-tab-7_link')
            .scrollIntoView()
            .click();
            const ActivationMenuItems = [
            { selector: '#edit_unit_car_activation_date-component > .form-label', text: "Dátum aktivácie" },
            { selector: '#edit_unit_car_activation_tacho-helptext > :nth-child(2)', text: "Začiatočný stav tachometra" },
            { selector: '#edit_unit_car_activation_moto-helptext > :nth-child(2)', text: "Počiatočný stav motohodín" },
            { selector: '#edit_unit_car_activation_fuel_0-helptext > :nth-child(2)', text: "1. Zač. stav paliva" },
            { selector: '#edit_unit_car_activation_fuel_price_0-helptext > :nth-child(2)', text: "Cena počiatočného paliva v nádrži" },
            { selector: '#edit_unit_car_activation_fuel_1-helptext > :nth-child(2)', text: "2. Zač. stav paliva" },
            { selector: '#edit_unit_car_activation_fuel_price_1-helptext > :nth-child(2)', text: "Cena počiatočného paliva v nádrži" },
            { selector: '#edit_unit_car_activation_fuel_2-helptext > :nth-child(2)', text: "3. Zač. stav paliva" },
            { selector: '#edit_unit_car_activation_fuel_price_2-helptext > :nth-child(2)', text: "Cena počiatočného paliva v nádrži" },
            ];
            ActivationMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-info-tab-1_link')
            .scrollIntoView()
            .click();
            cy.get('#units-info-look-tab-2_link')
            .scrollIntoView()
            .click();
            const TechnicalLicenseMenuItems = [
            { selector: '#edit_unit_basic_kategoria-helptext > :nth-child(2)', text: "(2) Kategória" },
            { selector: '#edit_unit_extend_vin-helptext > :nth-child(2)', text: "(3) VIN" },
            { selector: '#edit_unit_basic_brand-helptext > :nth-child(2)', text: "(4) Značka" },
            { selector: '#edit_unit_basic_model-helptext > :nth-child(2)', text: "(5) Model" },
            { selector: '#edit_unit_basic_variant-helptext > :nth-child(2)', text: "(6-8) Typ  / variant / verzia" },
            { selector: '#edit_unit_basic_manufacturer-helptext > :nth-child(2)', text: "(9) Výrobca" },
            { selector: '#edit_unit_basic_number_type_es-helptext > :nth-child(2)', text: "(10) Číslo typového schválenia ES" },
            { selector: '#edit_unit_basic_production-helptext > :nth-child(2)', text: "Rok výroby" },
            { selector: '#edit_unit_basic_date_type_es-component > [style="width:48%;display:inline-block"]', text: "(11) Dátum typového schválenia ES" },
            { selector: '#edit_unit_extend_card_number-helptext > :nth-child(2)', text: "Číslo technického preukazu" },
            ];
            TechnicalLicenseMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            cy.get('#units-technical_evidence-tab-2_link')
            .scrollIntoView()
            .click();
            const EngineMenuItems = [
            { selector: '#edit_unit_basic_axle_drive-component > .form-label', text: "Pohon náprav" },
            { selector: '#edit_unit_basic_typ_pohonu-component > .form-label', text: "Druh pohonu" },
            { selector: '#edit_unit_engine_manufacturer-helptext > :nth-child(2)', text: "(12) Výrobca motora" },
            { selector: '#edit_unit_identification_number_engine-helptext > :nth-child(2)', text: "(13) Identifikačné číslo motora" },
            { selector: '#edit_unit_extend_motor-helptext > :nth-child(2)', text: "(14) Objem motora" },
            { selector: '#edit_unit_extend_fuel_kat-helptext > :nth-child(2)', text: "(15) Katalyzátor" },
            { selector: '#edit_unit_extend_fuel_engine_power-helptext > :nth-child(2)', text: "(16-17) Najväčší výkon motora /otáčky" },
            { selector: '#edit_unit_basic_fuel-component > .form-label', text: "18 Palivo" },
            { selector: '#edit_unit_extend_fuel_prevodovka-helptext > :nth-child(2)', text: "(20) Prevodovka / počet stupňov" },
            ];
            EngineMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
            

            

        






  });
});