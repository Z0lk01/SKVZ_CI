const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'xx58n5',
  env: {
    username: "mza",
    password: ".",
    gdpr: "Toto je testovací opis dokumentu, ktorý môže byť veľmi dlhý. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    
  },

  e2e: {
    baseUrl: 'https://www.tssmonitoring.sk/login',
    setupNodeEvents(on, config) {
    
    },
    
  },
};
