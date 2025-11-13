
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });


  // TC-001 เคสกรอกและแสดงผลถูกต้อง
  test('Input fields should display as the data that was filled', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await expect(page.locator('#user-name')).toHaveValue('standard_user');

    await page.locator('#password').fill('secret_sauce');
    await expect(page.locator('#password')).toHaveValue('secret_sauce');
  });


  // TC-002 เคสไม่กรอกยูสเซอร์เนม
test('Should show an error message if log in without a username', async ({ page }) => {
    
    await page.locator('#password').fill('secret_sauce');
    await expect(page.locator('#password')).toHaveValue('secret_sauce');
    await page.locator("data-test=login-button").click();
    await expect(page).toHaveURL("https://www.saucedemo.com");

  const errorLocator = page.locator("div.error-message-container.error");  // ประกาศตัวแปล
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText('Username is required');
  });
  

 // TC-003 เคสไม่กรอกพาสเวิร์ด
test('Should show an error message if log in without a password', async ({ page }) => {
    
    await page.locator('#user-name').fill('standard_user');
    await expect(page.locator('#user-name')).toHaveValue('standard_user');
    await page.locator("data-test=login-button").click();
    await expect(page).toHaveURL("https://www.saucedemo.com");
  
  const errorLocator = page.locator("div.error-message-container.error"); // ประกาศตัวแปล
    await expect(errorLocator).toBeVisible();   
    await expect(errorLocator).toContainText('Password is required');
  });

  // TC-004   เคสไม่กรอกข้อมูลใดๆเลย
test('Should show an error message if log in with both fields blank', async ({ page }) => {
  
    await page.locator("data-test=login-button").click();  // คลิกปุ่มล็อกอินโดยไม่กรอกข้อมูลใดๆ
    await expect(page).toHaveURL("https://www.saucedemo.com");
  
  const errorLocator = page.locator("div.error-message-container.error"); // ประกาศตัวแปล
    await expect(errorLocator).toBeVisible();   
    await expect(errorLocator).toContainText('Username is required');
  });

  //TC-005  login successfully
test('Should logged in successfully with valid credentials', async ({ page }) => {
  await page.locator('#user-name').fill('performance_glitch_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator("data-test=login-button").click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  //TC-006 login failed with invalid credentials
test('Should logged in fails with an error message when using invalid credentials', async ({ page }) => {
  await page.locator('#user-name').fill('invalid_user');
  await page.locator('#password').fill('invalid_password');
  await page.locator("data-test=login-button").click();

  const errorLocator = page.locator("div.error-message-container.error"); // ประกาศตัวแปล
    await expect(errorLocator).toBeVisible();   
    await expect(errorLocator).toContainText('Username and password do not match any user in this service');
  });

});