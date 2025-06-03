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

  function rightClickMapUntilModal() {
    cy.get('#map').then($el => {
      const width = $el.width();
      const height = $el.height();
      cy.wrap($el).rightclick(width / 2, height / 2);
    });
    cy.get('.units-infowindow-list-content', { timeout: 5000 }).should('be.visible')
      .catch(() => {
        // Retry once if modal didn't appear
        cy.log('Retrying right click on map...');
        cy.get('#map').then($el => {
          const width = $el.width();
          const height = $el.height();
          cy.wrap($el).rightclick(width / 2, height / 2);
        });
        cy.get('.units-infowindow-list-content', { timeout: 5000 }).should('be.visible');
      });
  }

  it('should test creating of POI', () => {
    cy.get('#li-online-menu').click();
    cy.get('#gps_map_main').click();

    cy.wait(10000); // wait for the map to load
    
    rightClickMapUntilModal();
    cy.wait(5000);
    cy.get('.units-infowindow-list-content').first()
    .scrollIntoView()
    .should('be.visible')
    cy.get('[aria-label="Ovládať kameru na mape"]')
    .should('be.visible')
    .click();
    cy.get('[aria-label="Posunúť nahor"]')
    .click();

    cy.get('.units-infowindow-list-content > :nth-child(3) > input')
    .scrollIntoView()
    .should('be.visible')
    .type('Testovacie POI');
    cy.get('[data-feature="button-add"] > .fa')
    .should('be.visible')
    .click();


  });
});