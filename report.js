const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Timestamp for unique report names
const now = new Date();
const timestamp = now.toISOString().replace(/[:]/g, '-').split('.')[0];
const shortDate = timestamp.replace('T', '_');

// Paths
const reportsDir = path.join(__dirname, 'cypress', 'reports');
const mergedReport = path.join(reportsDir, `merged-${shortDate}.json`);
const htmlReport = path.join(reportsDir, `report-${shortDate}.html`);
const indexHtml = path.join(reportsDir, 'index.html');

function run(command, description) {
  try {
    console.log(`\n🟢 ${description}...`);
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Failed: ${description}`);
    process.exit(1);
  }
}

function prepareDirectories() {
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
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
  run('npx cypress run', 'Running Cypress tests');

  console.log('⏳ Waiting for JSON reports...');
  await waitForJsonReports();

  // Merge all JSONs into one
  run(`npx mochawesome-merge ${reportsDir}/*.json --output ${mergedReport}`, 'Merging reports');

  // Generate HTML report
  run(`npx mochawesome-report-generator ${mergedReport} --reportDir ${reportsDir} --reportFilename report-${shortDate}.html`, 'Generating HTML report');

  // Copy as index.html for easy deployment
  if (fs.existsSync(htmlReport)) {
    fs.copyFileSync(htmlReport, indexHtml);
    console.log(`✅ Report saved as:`);
    console.log(`- ${htmlReport}`);
    console.log(`- ${indexHtml} (latest report)`);
  } else {
    console.warn('⚠️ HTML report not found.');
  }

  console.log('\n✅ Done! Reports are in ./cypress/reports');
}

main();
