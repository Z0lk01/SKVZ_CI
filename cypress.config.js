const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3zx1g9",
  "testFiles": "skvz.cy.js", // replace with your test file pattern
  "video": false, // disable video recording to save disk space
  "screenshots": false, // disable screenshots to save disk space

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
