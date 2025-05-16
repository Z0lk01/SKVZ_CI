const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cesta k reportom
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const jsonsDir = path.join(reportsDir);
const mergedReport = path.join(reportsDir, 'merged-report.json');
const htmlReport = path.join(reportsDir, 'index.html');

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

function clearOldReports() {
  if (fs.existsSync(reportsDir)) {
    const files = fs.readdirSync(reportsDir);
    files.forEach(file => {
      if (file.endsWith('.json') || file.endsWith('.html')) {
        fs.unlinkSync(path.join(reportsDir, file));
      }
    });
    console.log('🧹 Staré reporty boli vymazané.');
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
  clearOldReports();
  run('npx cypress run', 'Spúšťanie Cypress testov', true);

  console.log('⏳ Čakanie na JSON reporty...');
  await waitForJsonReports();

  // Log which JSON files will be merged
  const jsonFiles = fs.readdirSync(jsonsDir)
    .filter(f => f.endsWith('.json') && !f.includes('merged'))
    .map(f => path.join(jsonsDir, f));
  console.log('🔎 JSON files to merge:', jsonFiles);

  run(`npx mochawesome-merge ${jsonsDir}/*.json --output ${mergedReport}`, 'Zlučovanie reportov');
  run(`npx mochawesome-report-generator ${mergedReport} --reportDir ${reportsDir} --reportFilename mochawesome.html`, 'Generovanie HTML reportu');

  if (fs.existsSync(htmlReport)) {
    console.log('📂 Otváram HTML report...');
    const openCmd = process.platform === 'win32'
      ? `start "" "${htmlReport}"`
      : process.platform === 'darwin'
        ? `open "${htmlReport}"`
        : `xdg-open "${htmlReport}"`;
    run(openCmd, 'Otváranie reportu');
  } else {
    console.warn('⚠️ HTML report sa nenašiel.');
  }

  console.log('\n✅ Hotovo! Report nájdeš v: cypress/reports/mochawesome.html');
}

main();
