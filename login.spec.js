import { test, expect } from '@playwright/test';


test('Deve realizar login com sucesso', async ({ page }) => {

  // Acessa a página inicial da aplicação
  await page.goto('/');
  await page.pause();
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


test('Verificar se a tela de autenticação é apresentada corretamente.', async ({ page }) => {
    await page.goto('/')

    // Verifica se tela atual é a de Login
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('Realizar a autenticação e verificar o redirencionamento para o Dashboard', async ({ page }) => {

    await page.goto('/')

    // Digita o Nome do Usuário "Admin"
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');

    // Digita a Senha do Usuário "admin123"
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')

    // Clica no botão de Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verifica se fez login corretamente e está na aba de Dashboard
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Verificar se o sistema apresenta uma mensagem de erro.', async ({ page }) => {

    await page.goto('/')

    // Digita o nome do Usuário
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin2');

    // Digita a senha do Usuário
    await page.getByRole('textbox', { name: 'Password' }).fill('admin321')

    // Clica no botão de fazer Login
    await page.getByRole('button', { name: 'Login' }).click();

    // Verifica se o erro está aparecendo na tela de Login
    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
});