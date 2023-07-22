import { type Page } from '@playwright/test';
import { pageFixture } from '../utils/pageFixture';
import { HeaderComponent } from './components/header.component';
import { BasketOverlayComponent } from './components/basketOverlay.component';

export class BasketPage {
  page: Page;

  headerComponent = new HeaderComponent(pageFixture.page);
  basketOverlay = new BasketOverlayComponent(pageFixture.page);

  Elements = {
    contentContainer: 'div.container:nth-child(2)',
    errorHeader: 'div.site-error h1',
  }

  constructor(page: Page) {
    this.page = page;
  }
}
