import { Before, BeforeAll, AfterStep, After, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function ({ pickle }) {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  console.log('.\u23F1  Scenario: ' + pickle.name);
});

AfterStep(async function ({ pickleStep, result }) {
  console.log(`.. ${result.status === 'PASSED' ? '\u2714' : '\u2716'}` + '  Step: ' + pickleStep.text);
});

After(async function ({ pickle, result }) {
  if (result?.status === 'FAILED') {
    const img = await pageFixture.page.screenshot({ path: `./test-result/screenshot/${pickle.name}.png` });
    await this.attach(img, 'image/png');
  }
  await pageFixture.page.close();
  await context.close();
  console.log(`${result?.status === 'PASSED' ? '\u2705' : '\u274C'}` + '  Scenario: ' + pickle.name + ' ');
});

AfterAll(async function () {
  await browser.close();
});
