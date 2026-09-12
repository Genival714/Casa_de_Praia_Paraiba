/**
 * Prepara o site para o GitHub Pages.
 *
 *   npm run github-pages
 *
 * Depois de publicar o repositório pelo GitHub Desktop, este comando descobre
 * sozinho o nome dele e gera o site na pasta `docs/`, já ajustado para morar
 * em `https://seu-usuario.github.io/nome-do-repositorio/`.
 *
 * Se preferir dizer o nome na mão:
 *
 *   npm run github-pages -- nome-do-repositorio
 *
 * No Windows, se o PowerShell recusar o comando dizendo que "a execução de
 * scripts foi desabilitada", troque `npm` por `npm.cmd`:
 *
 *   npm.cmd run github-pages
 *
 * Terminado o comando, é só dar commit e push no GitHub Desktop.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const PASTA = 'docs';

/* -------------------------------------------------------------------------
 * De onde vem o nome do repositório
 * ----------------------------------------------------------------------- */

/** Lê o endereço do repositório configurado pelo GitHub Desktop. */
function repositorioDoGit() {
  const git = spawnSync('git', ['remote', 'get-url', 'origin'], {
    encoding: 'utf8',
    shell: true,
  });
  if (git.status !== 0) return null;

  const endereco = (git.stdout || '').trim();
  // Serve tanto para https://github.com/user/repo.git
  // quanto para git@github.com:user/repo.git
  const achado = endereco.match(/[/:]([^/:]+?)(?:\.git)?$/);
  return achado ? achado[1] : null;
}

/**
 * Nome de usuário do GitHub, para montar o endereço completo do site.
 *
 * Serve para a pré-visualização do link no WhatsApp: sem endereço absoluto
 * não dá para apontar a imagem de compartilhamento nem a tag canônica.
 */
function donoDoGit() {
  const git = spawnSync('git', ['remote', 'get-url', 'origin'], {
    encoding: 'utf8',
    shell: true,
  });
  if (git.status !== 0) return null;

  const endereco = (git.stdout || '').trim();
  const achado = endereco.match(/github\.com[/:]([^/:]+)\//);
  // O endereço do GitHub Pages é sempre em minúsculas, mesmo que o nome de
  // usuário tenha maiúsculas. Sem isso, a tag canônica aponta para um
  // endereço diferente do real.
  return achado ? achado[1].toLowerCase() : null;
}

const informado = process.argv[2];
const doGit = informado ? null : repositorioDoGit();
const repositorio = (informado ?? doGit ?? '').replace(/^\/+|\/+$/g, '');

if (!repositorio || repositorio.startsWith('-')) {
  console.error(`
Não consegui descobrir o nome do repositório.

Se você já publicou pelo GitHub Desktop, rode o comando dizendo o nome:

  npm run github-pages -- nome-do-repositorio

(No Windows, se o PowerShell reclamar de "execução de scripts desabilitada",
use npm.cmd no lugar de npm.)

O nome é o que aparece no GitHub depois da barra. Se o endereço do
repositório for github.com/genival/casa-de-praia, o nome é "casa-de-praia".

Se ainda não publicou: abra o GitHub Desktop, use "Publish repository" e
depois rode este comando de novo.
`);
  process.exit(1);
}

if (!/^[A-Za-z0-9._-]+$/.test(repositorio)) {
  console.error(`
Nome de repositório inválido: "${repositorio}"

Vale letras, números, ponto, hífen e sublinhado — sem espaço e sem barra.
`);
  process.exit(1);
}

/**
 * Um repositório chamado "usuario.github.io" é o site principal da conta, e
 * esse fica na raiz do endereço, sem subpasta.
 */
const ehSitePrincipal = /\.github\.io$/i.test(repositorio);
const base = ehSitePrincipal ? '' : `/${repositorio}`;

if (doGit) {
  console.log(`\nRepositório encontrado pelo GitHub Desktop: ${repositorio}`);
}

/* -------------------------------------------------------------------------
 * 1. Limpa a pasta anterior
 * Sem isso, uma foto que você removeu do site continuaria publicada.
 * ----------------------------------------------------------------------- */
const destino = resolve(process.cwd(), PASTA);
if (existsSync(destino)) {
  rmSync(destino, { recursive: true, force: true });
}

/* -------------------------------------------------------------------------
 * 2. Gera o site com o caminho certo
 * ----------------------------------------------------------------------- */
console.log(`\nGerando o site para  https://<seu-usuario>.github.io${base}/\n`);

const build = spawnSync(
  'npx',
  ['expo', 'export', '--platform', 'web', '--output-dir', PASTA, '--clear'],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      CAMINHO_BASE: base,
      // Endereço completo do site. Sem ele, o link compartilhado no WhatsApp
      // vai sem imagem de pré-visualização.
      EXPO_PUBLIC_ORIGEM: donoDoGit() ? `https://${donoDoGit()}.github.io${base}` : '',
    },
  },
);

if (build.status !== 0) {
  console.error('\nO site não foi gerado. Veja a mensagem de erro acima.\n');
  process.exit(build.status ?? 1);
}

/* -------------------------------------------------------------------------
 * 3. O arquivo .nojekyll
 *
 * O GitHub Pages passa tudo por uma ferramenta chamada Jekyll, que ignora
 * pastas começadas por "_". O Expo guarda justamente o programa do site em
 * `_expo/`. Sem este arquivo vazio, a página abre em branco — e o erro não
 * aparece em lugar nenhum, o que torna a dor de cabeça pior.
 * ----------------------------------------------------------------------- */
writeFileSync(resolve(destino, '.nojekyll'), '');

/* -------------------------------------------------------------------------
 * 4. Confere o resultado
 * ----------------------------------------------------------------------- */
const paginas = readdirSync(destino).filter((f) => f.endsWith('.html'));
const temPrograma = existsSync(resolve(destino, '_expo'));

if (!paginas.includes('index.html') || !temPrograma) {
  console.error('\nO site saiu incompleto. Rode o comando de novo.\n');
  process.exit(1);
}

console.log(`
Pronto. O site está na pasta "${PASTA}".

  ${paginas.length} páginas geradas
  .nojekyll criado (sem ele o GitHub Pages abre a página em branco)

Agora, no GitHub Desktop:

  1. Escreva qualquer coisa no resumo, clique em "Commit to main"
     e depois em "Push origin".

E, só na primeira vez, no site do github.com:

  2. Abra o repositório em  Settings -> Pages
  3. Em "Build and deployment", escolha:
       Source: Deploy from a branch
       Branch: main    e a pasta   /docs
     Clique em Save.
  4. Espere um ou dois minutos e abra:
       https://<seu-usuario>.github.io${base}/

Nas próximas vezes, rode este comando e faça só o passo 1.
`);
