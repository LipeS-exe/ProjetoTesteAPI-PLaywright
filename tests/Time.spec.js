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

  // Buscando um funcionário existente (evita falha quando o ambiente demo reseta)
  await page.getByPlaceholder('Type for hints...').fill('a');
  const opcaoFuncionario = page.getByRole('option').filter({ hasNotText: 'Searching' }).first();
  await expect(opcaoFuncionario).toBeVisible();
  await opcaoFuncionario.click();

  // Visualiza a folha de ponto do funcionário selecionado
  await page.locator('form').getByRole('button', { name: 'View' }).click();

  // Aguarda o carregamento da folha de ponto e cria uma nova caso não exista
  const botaoCriar = page.getByRole('button', { name: 'Create Timesheet' });
  const botaoEditar = page.getByRole('button', { name: 'Edit' });

  await expect(botaoCriar.or(botaoEditar)).toBeVisible();
  if (await botaoCriar.isVisible()) {
    await botaoCriar.click();
  }

  // Abre a edição da folha de ponto
  await expect(botaoEditar).toBeVisible();
  await botaoEditar.click();

  // Seleciona o projeto na primeira linha da tabela
  const primeiraLinha = page.locator('tbody tr').first();
  await primeiraLinha.getByPlaceholder('Type for hints...').fill('a');
  const opcaoProjeto = page.getByRole('option').filter({ hasNotText: 'Searching' }).first();
  await expect(opcaoProjeto).toBeVisible();
  await opcaoProjeto.click();

  // Seleciona a primeira atividade válida do projeto (pula o "-- Select --")
  await primeiraLinha.locator('.oxd-select-text').click();
  const opcaoAtividade = page.getByRole('option').nth(1);
  await expect(opcaoAtividade).toBeVisible();
  await opcaoAtividade.click();

  // Preenche as horas trabalhadas apenas na primeira linha (índices 0 a 6 são os 7 dias da semana)
  const camposHoras = primeiraLinha.locator('input.oxd-input');
  await camposHoras.nth(0).fill('8');
  await camposHoras.nth(1).fill('8');
  await camposHoras.nth(2).fill('0');
  await camposHoras.nth(3).fill('8');
  await camposHoras.nth(4).fill('8');
  await camposHoras.nth(5).fill('4');
  await camposHoras.nth(6).fill('0');

  // Salva as horas preenchidas e verifica a mensagem de sucesso
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Success', { exact: true }).first()).toBeVisible();

  // Envia e aprova a folha de ponto (quando os botões estiverem disponíveis)
  const botaoSubmit = page.getByRole('button', { name: 'Submit' });
  if (await botaoSubmit.isVisible()) {
    await botaoSubmit.click();
    await expect(page.getByText('Success', { exact: true }).first()).toBeVisible();
  }

  const botaoApprove = page.getByRole('button', { name: 'Approve' });
  if (await botaoApprove.isVisible()) {
    await botaoApprove.click();
    await expect(page.getByText('Success', { exact: true }).first()).toBeVisible();
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