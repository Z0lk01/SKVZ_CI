//parsovanie JSONP na JSON odpoveď
Cypress.Commands.add('parseJsonpResponse', (interception) => {
    const rawBody = interception.response.body;
  
    // Vyňatie JSON z JSONP formátu
    const jsonString = rawBody.replace(/^.*?\(/, '').replace(/\);?$/, '');
  
    // Vráti naparsovaný objekt
    return JSON.parse(jsonString);
  });
  
  //Príkaz na orezanie textu z elemntu ktorý obsahuje whitespace znaky
  Cypress.Commands.add('shouldHaveTrimmedText', { prevSubject: 'element' }, (subject, expectedText) => {
    cy.wrap(subject)
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.eq(expectedText);
      });
  });
  
  //Príkaz na orezanie hodnoty z elemntu ktorý obsahuje whitespace znaky
  Cypress.Commands.add('shouldHaveTrimmedValue', { prevSubject: 'element' }, (subject, expectedValue) => {
    cy.wrap(subject)
      .invoke('val')
      .then((value) => {
        expect(value.trim()).to.eq(expectedValue);
      });
  });
  
  //Príkaz na vybranie včerajšeho dátumu v kalendári / yesterday= currentdate - 1day
  Cypress.Commands.add('selectYesterdayInCalendar', () => {
    cy.get('.today').filter((i, el) => {
      // dohľadanie elemntu s clasou .today a pozadím rgb(21, 122, 192)
      // a kliknutie na predchádzajúci element, ktorý je včerajším  dátumom
      return window.getComputedStyle(el).backgroundColor === 'rgb(21, 122, 192)';
    })
    .prev()
    .click();
  });
