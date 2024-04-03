const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "gmp6cf",
  viewportWidth: 1920,
  viewportHeight: 920,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
});
