
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Input fields should display as the data that was filled', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await expect(page.locator('#user-name')).toHaveValue('standard_user');

    await page.locator('#password').fill('secret_sauce');
    await expect(page.locator('#password')).toHaveValue('secret_sauce');
  });
});