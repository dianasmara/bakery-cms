import { test, expect } from '@playwright/test';

test('Dea Bakery E2E Flow', async ({ page }) => {
    // 1. Visit Landing Page
    await page.goto('http://localhost:5173');
    await expect(page).toHaveTitle(/Dea Bakery|Vite/);

    // Verify Landing Page Elements
    await expect(page.getByText('Nikmati Kelembutan di Setiap Gigitan')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Belanja Sekarang' })).toBeVisible();

    // 2. Navigate to Products
    await page.getByRole('link', { name: 'Belanja Sekarang' }).click();
    await expect(page).toHaveURL(/.*products/);

    // Verify Product List
    await expect(page.getByText('KATEGORI PRODUK')).toBeVisible();

    // Filter by Category
    await page.getByText('Donat Ring').click();

    // 3. Navigate to Product Detail
    // Wait for filter to apply or just click a visible product
    await page.getByRole('link', { name: 'Lihat Detail Produk' }).first().click();
    // OR click specific product name
    // await page.getByText('Donat Coklat').click(); 

    // 4. Verify Product Detail
    // Check Banner
    await expect(page.getByText('Pemesanan produk Dea Bakery')).toBeVisible();

    // Check WhatsApp Button
    const waButton = page.getByRole('button', { name: 'Beli Sekarang' });
    await expect(waButton).toBeVisible();

    // Optional: Verify WhatsApp link structure
    // This might open a new tab, but we can check the onclick handler logic or intercept the window.open call if needed.
    // For now, existence is good enough.
});
