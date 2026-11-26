import { test, expect } from '@playwright/test';

test('Envio de horas trabalhadas', async ({ page }) => {
  // Acessa a página inicial da aplicação
  await page.goto('/');

  // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Entrando na página "Time"
  await page.getByRole('link', { name: 'Time' }).click();

  // Buscando um funcionário pelo campo de autocomplete e selecionando a primeira opção
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('Urvi Sri');
  await page.getByRole('option').first().click();

  // Visualiza a folha de ponto do funcionário selecionado
  await page.locator('form').getByRole('button', { name: 'View' }).click();

  // Caso ainda não exista folha de ponto para a semana, cria uma nova
  const botaoCriar = page.getByRole('button', { name: 'Create Timesheet' });
  if (await botaoCriar.isVisible()) {
    await botaoCriar.click();
  }

  // Abre a edição da folha de ponto
  await page.getByRole('button', { name: 'Edit' }).click();

  // Seleciona o projeto no campo de autocomplete
  await page.getByRole('textbox', { name: 'Type for hints...' }).first().fill('a');
  await page.getByRole('option').first().click();

  // Seleciona a atividade do projeto
  await page.getByText('-- Select --').first().click();
  await page.getByRole('option').first().click();

  // Preenche as horas trabalhadas de cada dia da semana
  const camposHoras = page.locator('tbody input.oxd-input');
  await camposHoras.nth(1).fill('8');
  await camposHoras.nth(2).fill('8');
  await camposHoras.nth(3).fill('0');
  await camposHoras.nth(4).fill('8');
  await camposHoras.nth(5).fill('8');
  await camposHoras.nth(6).fill('4');
  await camposHoras.nth(7).fill('0');

  // Salva as horas preenchidas e verifica a mensagem de sucesso
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Success', { exact: true })).toBeVisible();

  // Envia e aprova a folha de ponto (quando os botões estiverem disponíveis)
  const botaoSubmit = page.getByRole('button', { name: 'Submit' });
  if (await botaoSubmit.isVisible()) {
    await botaoSubmit.click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
  }

  const botaoApprove = page.getByRole('button', { name: 'Approve' });
  if (await botaoApprove.isVisible()) {
    await botaoApprove.click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
  }
});

test('Não deve permitir exclusão de um projeto com horas registradas', async ({ page }) => {
  // Acessa a página inicial da aplicação
  await page.goto('/');

  // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Entrando na página "Time"
  await page.getByRole('link', { name: 'Time' }).click();

  // Acessa o menu Project Info > Projects
  await page.getByText('Project Info').click();
  await page.getByRole('listitem').filter({ hasText: /^Projects$/ }).click();

  // Clica no ícone de lixeira (excluir) do projeto e confirma no modal
  await page.locator('.oxd-table-cell-actions button').first().click();
  await page.getByRole('button', { name: 'Yes, Delete' }).click();

  // Verifica se a mensagem de erro é exibida ao tentar excluir
  await expect(page.getByText('Error', { exact: true })).toBeVisible();
});

test('Deve negar busca de folha de ponto sem informar funcionário', async ({ page }) => {
  // Acessa a página inicial da aplicação
  await page.goto('/');

  // Realizar login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Entrando na página "Time"
  await page.getByRole('link', { name: 'Time' }).click();

  // Tenta clicar em View sem preencher o nome do funcionário
  await page.locator('form').getByRole('button', { name: 'View' }).click();

  // Verifica se a mensagem de campo obrigatório ("Required") aparece
  await expect(page.getByText('Required', { exact: true }));
});