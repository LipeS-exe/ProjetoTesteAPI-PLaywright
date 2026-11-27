import { test, expect } from "@playwright/test";

test('Crie um post na categoria Buzz', async ({ page }) => {

    await page.goto('/');
    // await page.pause();

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrando na categória Buzz
    await page.getByRole('link', { name: 'Buzz' }).click();
    await expect(page.getByRole('heading', { name: 'Buzz' })).toBeVisible();

    // Criar um Post
    await page.getByRole('textbox', { name: 'What\'s on your mind?' }).fill('Olá, teste de comentário');
    await page.getByRole('button', { name: 'Post', exact: true }).click();
});

test('Curtir um post na categoria Buzz', async ({ page }) => {

    await page.goto('/');

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrando na categória Buzz
    await page.getByRole('link', { name: 'Buzz' }).click();
    await expect(page.getByRole('heading', { name: 'Buzz' })).toBeVisible();

    // Curtir um Post
    await page.locator('#heart-svg').first().click();
});

test('Comentar em um post na categoria Buzz', async ({ page }) => {

    await page.goto('/');

    // Login para entrar no site
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click();

    // Entrando na categória Buzz
    await page.getByRole('link', { name: 'Buzz' }).click();
    await expect(page.getByRole('heading', { name: 'Buzz' })).toBeVisible();

    // Comentar em um Post
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
    await page.getByRole('dialog').getByRole('textbox', { name: 'What\'s on your mind?' }).fill('Legal');
    await page.getByRole('button', { name: 'Share', exact: true }).click();
});