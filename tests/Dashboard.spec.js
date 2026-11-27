import { test, expect } from '@playwright/test';

test('Verificar se os principais menus do sistemas são apresentado após o login.', async ({ page }) => {
    await page.goto('/')
    await page.pause();

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')

    await page.getByRole('button', { name: 'Login' }).click();


    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'PIM' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Time' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Recruitment' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Info' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Performance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Directory' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Maintenance' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Claim', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Buzz' })).toBeVisible();
});