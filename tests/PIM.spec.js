
import { test, expect } from '@playwright/test';


test('Deve registrar um novo funcionario com sucesso', async ({ page }) => {

  await page.goto('/');
  // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Ir para página de gerenciamento de Funcionarios
  await page.getByRole('link', { name: 'PIM' }).click();
  // Clicar em adicionar novo funcionario
  await page.getByRole('listitem').filter({ hasText: 'Add Employee' }).click();

  // Inserir as informações do novo empregado, exemplo: Ricardo Meia Tompson
  await page.getByRole('textbox', { name: 'First Name' }).fill('Ricardo');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('Meia');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Tompson');

  // Clicar em salvar
  await page.getByRole('button', { name: 'Save' }).click();

  // Capturar a mensagem de sucesso
  await expect(page.getByText('Success', { exact: true })).toBeVisible();

  // Voltar para a lista de funcionários antes de fazer a busca
  await page.getByRole('link', { name: 'Employee List' }).click();

  // 2° Confirmação de sucesso: busca na lista de funcionarios
  await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill('Ricardo');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByRole('cell', { name: 'Ricardo Meia' }).first()).toBeVisible();
});

test('Deve negar um registro novo de funcionario informações', async ({ page }) => {

  await page.goto('/');
  // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Ir para página de gerenciamento de Funcionarios
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Add Employee' }).click();

  // Deixar os campos obrigatórios vazios e tentar salvar
  await page.getByRole('textbox', { name: 'First Name' }).fill('');
  await page.getByRole('textbox', { name: 'Middle Name' }).fill('');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('');
  await page.getByRole('button', { name: 'Save' }).click();

  // Verifica se as mensagens de campo obrigatório ("Required") aparecem
  await expect(page.getByText('Required').first()).toBeVisible();
  await expect(page.getByText('Required').nth(1)).toBeVisible();
});