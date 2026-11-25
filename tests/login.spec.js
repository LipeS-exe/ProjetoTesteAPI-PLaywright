
import { test, expect } from '@playwright/test';


test('Deve realizar login com sucesso', async ({ page }) => {

  // Acessa a página inicial da aplicação
  await page.goto('/');

  // Localiza o campo pelo placeholder Username e preenche com o usuário
  await page.getByPlaceholder('Username').fill('Admin');

  // Localiza o campo pelo placeholder Password e preenche com a senha
  await page.getByPlaceholder('Password').fill('admin123');

  // Localiza o botão Login e realiza o clique
  await page.getByRole('button', { name: 'Login' }).click();

  // Verifica se o texto DashBoard está visível na página
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});


test('Sistema deve rejeita login sem os campos preenchidos', async ({ page }) => {

  // Acessa a página inicial da aplicação
  await page.goto('/');

  // Localiza o campo pelo placeholder Username e deixar vazio
  await page.getByPlaceholder('Username').fill('');

  // Localiza o campo pelo placeholder Password e preenche com a senha
  await page.getByPlaceholder('Password').fill('');

  // Localiza o botão Login e realiza o clique
  await page.getByRole('button', { name: 'Login' }).click();

  // Verifica se o texto de ambos campos(Username e Password apresenta um mensagem de erro)
  await expect(page.getByText('Required').first()).toBeVisible() && page.getByAltText('Required'.nht(1)).toBeVisible();
});

test('Deve realizar logout com sucesso', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Garante que o login concluiu
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Abre o menu do usuário e clica em Logout
  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Valida que voltou para a tela de login
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();


});




