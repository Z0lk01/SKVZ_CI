const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Cesty k priečinkom
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const mergedReport = path.join(reportsDir, 'merged-report.json');
const htmlReport = path.join(reportsDir, 'mochawesome.html');

// Priečinok na publikovanie cez GitHub Pages
const publicDir = path.join(__dirname, 'public');
const publicHtml = path.join(publicDir, 'index.html');

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
  if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
    console.log('🧼 Starý public obsah bol odstránený.');
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

  run(`npx mochawesome-merge ${reportsDir}/*.json --output ${mergedReport}`, 'Zlučovanie reportov');
  run(`npx mochawesome-report-generator ${mergedReport} --reportDir ${reportsDir} --reportFilename mochawesome.html`, 'Generovanie HTML reportu');

  if (fs.existsSync(htmlReport)) {
    // Kopírovanie do public/index.html
    fs.mkdirSync(publicDir, { recursive: true });
    fs.copyFileSync(htmlReport, publicHtml);
    console.log(`✅ Report skopírovaný do ${publicHtml}`);
  } else {
    console.warn('⚠️ HTML report sa nenašiel.');
  }

  console.log('\n✅ Hotovo! Report nájdeš v:');
  console.log(`- ${htmlReport}`);
  console.log(`- ${publicHtml} (na GitHub Pages)`);
}

main();
