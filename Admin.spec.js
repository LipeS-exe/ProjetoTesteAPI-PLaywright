import { test, expect } from '@playwright/test';

test('Adicionar um novo usuário', async ({ page }) => {
    await page.goto('/');
    
    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrar no Modulo Admin e verificar se é o modulo está visivel
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible();

    // Criar usuário
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
    await page.locator('div').filter({ hasText: /^ESS$/ }).nth(2).click();
    await page.pause();
});