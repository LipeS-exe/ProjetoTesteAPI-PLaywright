import { test, expect } from '@playwright/test';

test('Verificar se é possível acessar a área de gerenciamento de licenças.', async ({ page }) => {
    await page.goto('/');
    await page.pause();

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrar no Modulo Leave e verificar se é o modulo está visivel
    await page.getByRole('link', { name: 'Leave', exact: true }).click();
    await expect(getByRole('heading', { name: 'Leave', exact: true })).toBeVisible();
})

