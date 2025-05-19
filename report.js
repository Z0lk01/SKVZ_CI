const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Dátum pre názov reportu
const now = new Date();
const timestamp = now.toISOString().replace(/[:]/g, '-').split('.')[0]; // YYYY-MM-DDTHH-MM-SS
const shortDate = timestamp.replace('T', '_'); // napr. 2025-05-16_07-00-00

// Cesty
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const publicDir = path.join(__dirname, 'public');
const htmlReportNamed = `mochawesome-${shortDate}.html`;
const mergedReport = path.join(reportsDir, `merged-${shortDate}.json`);
const htmlReport = path.join(publicDir, htmlReportNamed);
const publicReportPath = path.join(publicDir, htmlReportNamed);
const publicIndexPath = path.join(publicDir, 'index.html');

function run(command, description, allowFail = true) {
  try {
    console.log(`\n🟢 ${description}...`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Zlyhalo: ${description}`);
    if (!allowFail) {
      process.exit(1);
    }
  }
}

function prepareDirectories() {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
}

function waitForJsonReports(timeout = 10000) {
  const start = Date.now();
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const jsons = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json') && !f.includes('merged'));
      if (jsons.length > 0 || Date.now() - start > timeout) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

async function main() {
  prepareDirectories();
  run('npx cypress run', 'Spúšťanie Cypress testov', true);

  console.log('⏳ Čakanie na JSON reporty...');
  await waitForJsonReports();

  run(`npx mochawesome-merge ${reportsDir}/*.json --output ${mergedReport}`, 'Zlučovanie reportov');
  run(`npx mochawesome-report-generator ${mergedReport} --reportDir ${publicDir} --reportFilename ${htmlReportNamed}`, 'Generovanie HTML reportu');

  if (fs.existsSync(htmlReport)) {
    fs.copyFileSync(htmlReport, publicReportPath);
    fs.copyFileSync(htmlReport, publicIndexPath);
    console.log(`✅ Report uložený ako:`);
    console.log(`- ${publicReportPath}`);
    console.log(`- ${publicIndexPath} (posledný report)`);
  } else {
    console.warn('⚠️ HTML report sa nenašiel.');
  }

  console.log('\n✅ Hotovo! Reporty nájdeš v zložke ./public');
}

main();
