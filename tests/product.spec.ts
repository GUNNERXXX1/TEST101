import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {

  // setup ก่อนแต่ละเคส (ก่อนทุก test case จะรันบรรทัดนี้)
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');      // เข้าเว็บ
    await page.locator('#user-name').fill('standard_user');  // กรอก username
    await page.locator('#password').fill('secret_sauce');    // กรอก password
    await page.locator('[data-test="login-button"]').click(); // คลิกปุ่มล็อกอิน
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // ตรวจสอบล็อกอินสำเร็จ
  }); 

  // TC-007 add and remove product from cart
  test('Adding all available products to the cart and then removing them, verifying that the cart updates correctly', async ({ page }) => {

    const addToCartButtons = page.locator('[data-test^="add-to-cart"]'); // หา element ปุ่ม Add to Cart ของทุกสินค้า
    const count = await addToCartButtons.count(); // นับว่ามีกี่ปุ่ม (กี่ชิ้นสินค้าบนหน้า)

    // เพิ่มสินค้าทั้งหมดเข้าตะกร้า
    for (let i = 0; i < count; i++) {
      await addToCartButtons.nth(i).click(); // คลิกปุ่ม Add to Cart ทีละปุ่ม
    }

    const cartBadge = page.locator('.shopping_cart_badge'); // หา element แสดงจำนวนสินค้าในตะกร้า
    await expect(cartBadge).toHaveText(String(count)); // เช็คว่าจำนวนใน badge ตรงกับจำนวนสินค้าที่เพิ่ม

    await page.locator('.shopping_cart_link').click(); // คลิกเข้าไปดูตะกร้า

    const removeButtons = page.locator('[data-test^="remove"]'); // หา element ปุ่ม Remove ของทุกสินค้าในตะกร้า
    const removeCount = await removeButtons.count(); // นับว่ามีกี่ปุ่ม Remove

    // ลบสินค้าออกทีละชิ้น
    for (let i = 0; i < removeCount; i++) {
      await removeButtons.nth(0).click(); // คลิก Remove ปุ่มแรกเสมอ เพราะปุ่มที่เหลือจะเลื่อนขึ้น
    }

    await expect(cartBadge).toHaveCount(0); // ตรวจสอบว่า badge หายไป แปลว่าตะกร้าว่าง
  });

});