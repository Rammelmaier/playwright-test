import { Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/pageFixture';
import { ShopPage } from '../pages/shop.page';
import { request } from '@playwright/test';
import { expect } from '@playwright/test';

Then(/^I clear basket via API$/, { timeout: 60 * 1000 }, async function () {
  const shopPage = new ShopPage(pageFixture.page);

  // await shopPage.page.waitForTimeout(5000);
  const cookies = await shopPage.page.context().cookies();
  console.log('Get playwright cookies', cookies);
  let cookieString = '';
  cookies.forEach(cookie => cookieString += cookie.name + '=' + cookie.value + '; ');

  const accessTokenObj = await shopPage.page.context().storageState();
  console.log('GET BROWSER CONTEXT:', accessTokenObj)
  // TO DO
  // find out hov to get X-CSRF-Token
  const apiContext = await request.newContext({});
  const apiCleanBasket = await apiContext.post('https://enotes.pointschool.ru/basket/clear', {
    headers: {
      'X-CSRF-Token': 'LZ3f1rg4cFFTE0B-jRYMuiI-8_zdhuS31E7DG28GcRdu0Le_0EFGJSlmLRm9WU3_TFiXtKvAvtHhBfIoWTMCLg==',
      'Cookie': cookieString,
    },
    data: {},
  });

  expect(apiCleanBasket.status()).toBe(200);
  expect(await apiCleanBasket.text()).toEqual('{"response": "true"}');
});
