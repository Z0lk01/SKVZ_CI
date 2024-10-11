const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'x8ghag',
  env: {
    username: "mza",
    password: ".",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
