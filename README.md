# SKVZ_CI

This repository contains automated end-to-end (E2E) tests for the SKVZ application using Cypress. The tests are designed to verify the functionality of various components and workflows within the application, ensuring that the system behaves as expected.

## Project Structure

### Key Files and Directories

- **`cypress/e2e/`**: Contains the test files for different functionalities.
  - `Test TSS group stranka.cy.js`: Tests for the TSS Group page, including login and navigation.
  - `skvz.cy.js`: Tests for corrections, fuel management, and service book functionalities.
  - `online.cy.js`: Tests for online vehicle tracking and related features.
- **`cypress/support/commands.js`**: Placeholder for custom Cypress commands (currently empty).
- **`cypress/support/e2e.js`**: Contains global configurations, such as handling uncaught exceptions.
- **`cypress/fixtures/example.json`**: Example fixture file for mocking data.
- **`cypress.config.js`**: Cypress configuration file, including environment variables and base URL.
- **`.circleci/config.yml`**: CircleCI configuration for continuous integration and test automation.
- **`cypress.yml`**: GitHub Actions configuration for running Cypress tests in parallel.
- **`package.json`**: Contains project dependencies and scripts for running tests.

## Tests Overview

### `Test TSS group stranka.cy.js`
This test file focuses on verifying the functionality of the TSS Group page:
- **Login Workflow**: Tests the login process and verifies redirection to the correct page.
- **Navigation Assertions**: Ensures that navigation links and elements are visible and have the correct text.
- **Localization Checks**: Verifies that the UI elements display the correct localized text.

### `skvz.cy.js`
This test file covers the following functionalities:
- **Corrections and Fuel Management**:
  - Tests creating, editing, and deleting corrections and fuel entries.
  - Verifies that the data entered matches the expected values.
- **Service Book**:
  - Tests creating and managing service book entries.
  - Verifies that filters and table headers display the correct text.

### `online.cy.js`
This test file focuses on online vehicle tracking:
- **Dashboard Navigation**: Verifies the visibility and functionality of dashboard elements.
- **Vehicle Search**: Tests searching for a specific vehicle and interacting with its details.
- **Filters and Columns**: Verifies the functionality of filters and column visibility toggles.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/SKVZ_CI.git
2. Navigate to the project directory: 
cd SKVZ_CI
3. Install Dependencies : 
npm install

Environment Variables
Set the following environment variables in cypress.config.js:

username: Your login username.
password: Your login password.
Running Tests

Run All Tests
To run all tests, use the following command:
npm run test

Run Specific Test
To run a specific test file, use:
npx cypress run --spec "cypress/e2e/<test-file-name>.cy.js"

Open Cypress Test Runner
To open the Cypress Test Runner, use:
npx cypress open
Continuous Integration
CircleCI
The .circleci/config.yml file is configured to run Cypress tests in a CI/CD pipeline. It installs dependencies, runs tests, and can deploy the application.

GitHub Actions
The cypress.yml file is configured to run Cypress tests in parallel using GitHub Actions. It includes steps for checking out the code, starting the server, and running tests.

Dependencies
Key Dependencies
Cypress: End-to-end testing framework.
Moment.js: Library for date and time manipulation.
Dev Dependencies
cypress-parallel: Enables running Cypress tests in parallel.

Notes
The tests include handling for elements that may not always be visible, ensuring that the tests are robust.
The project uses both CircleCI and GitHub Actions for continuous integration.
Future Improvements
Add more custom commands in cypress/support/commands.js to reduce code duplication.
Enhance test coverage for edge cases and error scenarios.
Optimize test execution time by leveraging parallelization more effectively.