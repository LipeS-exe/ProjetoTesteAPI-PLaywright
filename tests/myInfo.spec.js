import { test, expect } from '@playwright/test';

test('Alteração do perfil com sucesso', async ({ page }) => {
    await page.goto("/")
    

    // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

    // Entrando na página "My-info"
  await page.getByRole('link', { name: 'My Info' }).click();
 
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Urso');
  await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('Sem');
  await page.getByRole('textbox', { name: 'Middle Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Graduação');
  await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();
  await page.getByText('Success', { exact: true }).click();
  await page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();
  await expect(page.getByText('Success', { exact: true }));
});

