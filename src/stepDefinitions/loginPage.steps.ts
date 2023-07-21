import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { LoginPage } from '../pages/login.page';
import StepMemory from '../utils/shareStepData';

When(/^I enter "(Login|Password)" for Test User$/, async function (fieldType: string) {
  const loginPage = new LoginPage(pageFixture.page);
  fieldType == 'Login' ? await loginPage.enterLogin('test') : await loginPage.enterPassword('test');
});

Then(/^I click "Submit" button$/, { timeout: 6000 }, async function () {
  const loginPage = new LoginPage(pageFixture.page);

  // listen for all http responses
  // await loginPage.page.on('response', response => console.log('<<', response.status(), response.url()));

  // listen for particular http response
  const responsePromise = loginPage.page.waitForResponse('**/product/get');

  await loginPage.clickSubmitButton();
  const response = await responsePromise;

  StepMemory.notProtectedSave('productsData', JSON.parse(await response.text()));
});
