const { defineConfig } = require("cypress");

module.exports = {
  projectId: 'xx58n5',
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
