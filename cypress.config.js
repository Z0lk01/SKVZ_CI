const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'gmp6cf',
  env: {
    username: "mza",
    password: "alkoholik",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
