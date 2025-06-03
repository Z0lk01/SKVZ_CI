const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xx58n5',
  env: {
    username: "mzilka:mza",
    password: "alkoholik",
    gdpr: "Toto je testovací opis dokumentu, ktorý môže byť veľmi dlhý. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  e2e: {
    baseUrl: 'https://www.tssmonitoring.sk',
    video: true,
    setupNodeEvents(on, config) {
      // Add any node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
   reportDir: 'cypress/reports',
   overwrite: false,
   html: false,
   json: true,
   embeddedScreenshots: true,
   inlineAssets: true

   
   
},
screenshotsFolder: 'cypress/screenshots',

});