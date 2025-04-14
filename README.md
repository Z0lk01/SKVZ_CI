
# SKVZ_CI

> EN This README contains both English and Slovak versions.  
> 🇸🇰 Tento README obsahuje anglickú aj slovenskú verziu.

---

## EN English Version

This repository contains automated end-to-end (E2E) tests for the SKVZ application using Cypress. The tests are designed to verify the functionality of various components and workflows within the application, ensuring the system behaves as expected.

###  Project Structure

Key Files and Directories:

- **`cypress/e2e/`** – Contains test files for specific functionalities:
  - `Test TSS group stranka.cy.js` – Tests for the TSS Group page including login and navigation.
  - `skvz.cy.js` – Tests for corrections, fuel management, and service book.
  - `online.cy.js` – Tests for online vehicle tracking and related features.
- **`cypress/support/commands.js`** – Placeholder for custom Cypress commands (currently empty).
- **`cypress/support/e2e.js`** – Global configuration, such as handling uncaught exceptions.
- **`cypress/fixtures/example.json`** – Sample data for mocking.
- **`cypress.config.js`** – Cypress configuration including environment variables and base URL.
- **`.circleci/config.yml`** – CircleCI configuration for CI/CD.
- **`cypress.yml`** – GitHub Actions config for parallel test execution.
- **`package.json`** – Project dependencies and scripts.

### Test Overview

- **`Test TSS group stranka.cy.js`**: Login, navigation, localization validation.
- **`skvz.cy.js`**: Correction and fuel entries, service book operations.
- **`online.cy.js`**: Dashboard, vehicle search, filters, and columns toggling.

### Installation

```bash
git clone https://github.com/your-repo/SKVZ_CI.git
cd SKVZ_CI
npm install
```

Set environment variables in `cypress.config.js`:  
- `username` and `password`

### Run Tests

- All tests: `npm run test`
- Specific test: `npx cypress run --spec "cypress/e2e/<file>.cy.js"`
- Cypress UI: `npx cypress open`

### CI

- **CircleCI**: Uses `.circleci/config.yml`
- **GitHub Actions**: Uses `cypress.yml` for parallel execution

### Dependencies

- Cypress, Moment.js
- Dev: `cypress-parallel`

### Improvements

- Add custom commands
- Improve edge case coverage
- Optimize parallel runs

---

## 🇸🇰 Slovenská Verzia

Tento repozitár obsahuje automatizované end-to-end (E2E) testy pre aplikáciu SKVZ pomocou nástroja Cypress. Testy overujú funkcionalitu rôznych komponentov a pracovných tokov v aplikácii, čím zabezpečujú, že systém sa správa podľa očakávaní.

### Štruktúra projektu

Dôležité súbory a adresáre:

- **`cypress/e2e/`** – Obsahuje testy pre rôzne funkcionality:
  - `Test TSS group stranka.cy.js` – Testy pre stránku TSS Group (login, navigácia).
  - `skvz.cy.js` – Testy opráv, paliva, servisnej knihy.
  - `online.cy.js` – Testy online sledovania vozidiel.
- **`cypress/support/commands.js`** – Vlastné Cypress príkazy (momentálne prázdne).
- **`cypress/support/e2e.js`** – Globálne nastavenia.
- **`cypress/fixtures/example.json`** – Ukážkové dáta.
- **`cypress.config.js`** – Konfigurácia Cypressu.
- **`.circleci/config.yml`** – CI konfigurácia pre CircleCI.
- **`cypress.yml`** – GitHub Actions konfigurácia.
- **`package.json`** – Závislosti a skripty.

### Prehľad testov

- **`Test TSS group stranka.cy.js`**: Prihlásenie, navigácia, lokalizácia.
- **`skvz.cy.js`**: Záznamy opráv, paliva, servisná kniha.
- **`online.cy.js`**: Dashboard, vyhľadávanie vozidiel, filtre a stĺpce.

### Inštalácia

```bash
git clone https://github.com/your-repo/SKVZ_CI.git
cd SKVZ_CI
npm install
```

Nastav premenné v `cypress.config.js`:  
- `username` a `password`

### Spúšťanie testov

- Všetky testy: `npm run test`
- Konkrétny test: `npx cypress run --spec "cypress/e2e/<nazov>.cy.js"`
- UI rozhranie: `npx cypress open`

### CI

- **CircleCI**: `.circleci/config.yml`
- **GitHub Actions**: `cypress.yml`

### Závislosti

- Cypress, Moment.js
- Dev: `cypress-parallel`

### Možnosti zlepšenia

- Vytvoriť vlastné príkazy
- Rozšíriť pokrytie pre okrajové prípady
- Zrýchliť testy paralelizáciou
