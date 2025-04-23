const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'xx58n5',
  env: {
    username: "mza",
    password: ".",
  },

  e2e: {
    baseUrl: 'https://www.tssmonitoring.sk/login',
    setupNodeEvents(on, config) {
      
    },
  },
};
