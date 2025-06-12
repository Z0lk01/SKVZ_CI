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

  it('should test creating of centers', () => {
   cy.get('#li-settings > [href="javascript:;"]')
   .click()
   cy.wait(4000) // wait for the menu to open
   cy.get('#centers')
   .click()
   cy.get('#centers_button_0')
   .click()
   const CentersMenuItems = [
            {selector:  '#edit_centers_code-helptext > :nth-child(2)', text: "Kód strediska // lokality"},
            { selector: '#edit_centers_name-helptext > :nth-child(2)', text: "Názov nákladového strediska" },
            { selector: '#edit_centers_note-component > .form-label', text: "Poznámka" },
            { selector: '#edit_centers_group_id-component > .form-label', text: "Nadradené stredisko" },
            { selector: '#edit_centers_responsible_centers-search > .form-label', text: "Zodpovedná osoba" },
            ];
            CentersMenuItems.forEach(item => {
  cy.get(item.selector).scrollIntoView()
  .should('have.text', item.text);
});
   cy.get('#edit_centers_code')
   .type('112233') 
   cy.get('#edit_centers_name')
   .type('Testovacie stredisko')
   cy.get('#edit_centers_note')
   .type('Toto je testovacie stredisko pre automatizované testy')
   cy.get('#edit_centers_responsible_centers')
   .click()
   cy.get('#search_grid_users_with_profiles_table_filter > label > input')
   .scrollIntoView()
   .type('tsstestmza')
   cy.get('#search_grid_users_with_profiles_table > tbody > .odd > .fixed')
   .contains('tsstestmza')
   .click()
   cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/Centers/create.json?f=Centers_create&callback=jQuery*')
    .as('createCenter');
   cy.get('#modal-success')
   .click()
   cy.wait('@createCenter').then((interception) => {
     expect(interception.response.statusCode).to.eq(200);
   })
   cy.get('#centers_table_filter > label > input')
   .type('Testovacie stredisko')
   cy.wait(3000) // wait for the table to update
   cy.get('#centers')
   .click()
   cy.get('#centers_table > :nth-child(2) > :nth-child(1) > :nth-child(5)')
   .should('have.text', "Toto je testovacie stredisko pre automatizované testy")
    cy.get('#centers_table > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(3)').click();
    cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/Centers/delete.json?f=Centers_delete&callback=jQuery*')
    .as('deleteCenter');
    cy.get('#modal-success')
    .click();
    cy.wait('@deleteCenter').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('.dt-center > :nth-child(2) > .fa')
    .click();
    cy.intercept('POST', 'https://www.tssmonitoring.sk/api/v1.3/Centers/remove.json?f=Centers_remove&callback=jQuery*')
    .as('deleteCenterConfirmation');
    cy.get('#modal-success')
    .click();
    cy.wait('@deleteCenterConfirmation').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
   


   


     

  });
});