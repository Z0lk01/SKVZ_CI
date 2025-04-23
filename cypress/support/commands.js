//parsovanie JSONP na JSON odpoveď
Cypress.Commands.add('parseJsonpResponse', (interception) => {
    const rawBody = interception.response.body;
  
    // Vyňatie JSON z JSONP formátu
    const jsonString = rawBody.replace(/^.*?\(/, '').replace(/\);?$/, '');
  
    // Vráti naparsovaný objekt
    return JSON.parse(jsonString);
  });
  