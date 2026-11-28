import { test, expect } from '@playwright/test';

test('verificar se é possível acessar a área de Admin.', async ({ page }) => {
    await page.goto('/');

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrar no Modulo Admin e verificar se é o modulo está visivel
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Admin', exact: true })).toBeVisible();
});

test('Fazer uma busca de "Admin" na barra de menu do site.', async ({ page }) => {
    
    await page.goto('/');

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Pesquisar "Admin" na barra de pesquisa
    await page.getByRole('textbox', { name: 'Search' }).fill('Admin');
    await page.getByRole('link', { name: 'Admin' }).click();

    await expect(page.getByRole('heading', { name: 'Admin' })).toBeVisible();
});