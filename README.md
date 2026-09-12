# Casa de Praia · Praia do Amor

Site da casa de temporada no Loteamento Village, Praia do Amor — Jacumã,
Conde/PB. Feito para ser aberto pelo **QR Code na parede da casa**: o hóspede
aponta a câmera e encontra as praias, os mirantes, os restaurantes da região
e o WhatsApp dos anfitriões, com rota pronta para o Google Maps e o Waze.

Escrito em **React Native + TypeScript** (Expo Router). O mesmo código gera o
site e pode virar aplicativo de Android/iOS mais tarde, sem reescrever nada.

---

## Comandos

| Comando            | O que faz                                                     |
| ------------------ | ------------------------------------------------------------- |
| `npm run web`      | Abre o site no navegador para você ver as mudanças ao vivo     |
| `npm run export`   | Gera o site para publicar na raiz de um endereço (Netlify)     |
| `npm run github-pages` | Gera o site em `docs/`, pronto para o GitHub Pages         |
| `npm run serve`    | Testa a pasta `dist/` antes de publicar                        |
| `npm run qrcode`   | Gera o QR Code e a placa de parede (veja abaixo)               |
| `npm run typecheck`| Confere se não há erro de código                               |
| `npm start`        | Abre no celular pelo app Expo Go (para virar aplicativo)       |

---

## Se o PowerShell recusar os comandos

No Windows, o `npm` é um script do PowerShell, e o sistema costuma vir
bloqueando esse tipo de arquivo. O erro aparece assim:

```
npm : O arquivo C:Program Files
odejs
pm.ps1 não pode ser carregado
porque a execução de scripts foi desabilitada neste sistema.
```

**Não é problema do projeto**, e há três saídas. A primeira é a mais simples.

**1. Troque `npm` por `npm.cmd`.** É a mesma coisa, por outro caminho, que
não passa pela regra do PowerShell:

```bash
npm.cmd run github-pages
```

Vale para todos os comandos deste README: `npm.cmd run export`,
`npm.cmd run qrcode` e assim por diante.

**2. Use o Prompt de Comando.** No GitHub Desktop, com o repositório aberto:
*Repository → Open in Command Prompt*. Ali o `npm run github-pages` funciona
normalmente.

**3. Libere os scripts de uma vez.** Se quiser resolver de vez, abra o
PowerShell **como administrador** e rode o comando abaixo. Ele muda uma
configuração de segurança do Windows — passa a permitir scripts feitos no
próprio computador, mantendo o bloqueio nos baixados da internet sem
assinatura. Só faça se estiver confortável com isso:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## Colocar o site no ar

Duas formas. Escolha uma — e depois use sempre a mesma.

### Opção A — GitHub Pages, pelo GitHub Desktop

Você já tem um site no GitHub Pages, e isso não atrapalha: o GitHub permite
**um site de usuário** (`seu-usuario.github.io`) e **quantos sites de projeto
você quiser** (`seu-usuario.github.io/nome-do-repo`), um por repositório. O
site que já existe continua no ar, intocado.

**Antes de começar:** o repositório precisa ser **público**. O GitHub Pages em
repositório privado só funciona no plano pago.

1. No GitHub Desktop: *File → Add local repository*, aponte para esta pasta e
   depois publique no GitHub (*Publish repository*). Anote o nome que você deu
   ao repositório — vai ser usado no passo seguinte.

2. No terminal, dentro desta pasta, rode (trocando pelo nome do seu
   repositório):

   ```bash
   npm run github-pages -- nome-do-repositorio
   ```

   Isso gera o site na pasta `docs/`, já ajustado para morar na subpasta.

3. Volte ao GitHub Desktop, escreva qualquer coisa no campo de resumo, clique
   em **Commit to main** e depois em **Push origin**.

4. No site do github.com, abra o repositório em **Settings → Pages** e
   configure:

   - **Source:** Deploy from a branch
   - **Branch:** `main` e a pasta `/docs`

   Clique em **Save**.

5. Espere um ou dois minutos e abra
   `https://seu-usuario.github.io/nome-do-repositorio/`.

**Para atualizar o site depois:** repita só os passos 2 e 3. Os passos 4 e 5
são de primeira viagem.

> **O primeiro envio demora.** O repositório fica com uns 100 MB, quase tudo
> vídeo. Pode levar vários minutos, e o GitHub Desktop parece travado nesse
> tempo — não é. Se quiser deixar mais leve, você pode escolher não enviar as
> pastas com os arquivos originais, que já estão no seu computador:
> acrescente estas duas linhas ao final do arquivo `.gitignore`, antes do
> primeiro commit.
>
> ```
> Imagens da casa/
> Videos da casa/
> ```
>
> Isso não afeta o site: as fotos e os vídeos que vão ao ar são os de
> `public/`, e esses continuam sendo enviados.

> **Por que existe o comando do passo 2?** Duas coisas quebram o site no
> GitHub Pages se ninguém cuidar delas:
>
> - O site fica numa **subpasta**, e não na raiz do endereço. Todos os
>   caminhos de foto, vídeo e página precisam desse prefixo. O comando avisa
>   o Expo disso.
> - O GitHub Pages passa tudo por uma ferramenta chamada Jekyll, que **ignora
>   pastas começadas por `_`** — e o Expo guarda o programa do site em
>   `_expo/`. Sem um arquivo vazio chamado `.nojekyll`, a página abre em
>   branco e nenhum erro aparece. O comando cria esse arquivo.

### Opção B — Netlify (endereço na raiz)

Mais simples se você não fizer questão do GitHub:

```bash
npm run export
```

Depois entre em <https://app.netlify.com/drop> e arraste a pasta `dist` para
dentro da página. Em poucos segundos você recebe um endereço tipo
`https://algum-nome.netlify.app`, já na raiz.

---

## Gerar o QR Code da parede

Com o endereço do site em mãos — **completo, com a subpasta**, se você usou
o GitHub Pages:

```bash
npm run qrcode -- https://o-endereco-do-seu-site.com
```

Isso cria a pasta `qrcode/` com dois arquivos:

- `placa-casa.svg` — a placa pronta para imprimir, em A5 (14,8 × 21 cm)
- `qrcode-casa.svg` — só o código, caso queira montar outra arte

Para imprimir: abra o arquivo no navegador e use **Ctrl+P → Salvar como PDF**.

**Antes de mandar imprimir**, escaneie o código na própria tela com o celular
e confira se o site abre. Vale imprimir em papel resistente ou plastificar —
parede de casa de praia pega maresia.

---

## Onde mexer em cada coisa

Todo o conteúdo fica em arquivos de texto simples, separado do código. Depois
de editar qualquer um deles, rode `npm run export` e publique de novo.

| Quero mudar…                                    | Abra o arquivo                |
| ----------------------------------------------- | ----------------------------- |
| Telefones, endereço, textos da capa, comodidades | `src/data/casa.ts`            |
| Praias, ranking, tempos de carro                 | `src/data/praias.ts`          |
| Mirantes e passeios                              | `src/data/passeios.ts`        |
| Restaurantes e bares                             | `src/data/gastronomia.ts`     |
| Regras da casa, lotação, silêncio, leis          | `src/data/regras.ts`          |
| Manual do poço: passos, avisos, tabela           | `src/data/poco.ts`            |
| Fotos da casa                                    | `public/fotos/` (veja o LEIA-ME de lá) |
| Vídeos da casa                                   | `public/videos/` (veja o LEIA-ME de lá) |
| Fotos das praias e passeios                      | `public/fotos/lugares/` (opcional)     |
| Imagem que aparece ao mandar o link no WhatsApp  | `public/og/capa.jpg` (1200×630) |
| Cores do site                                    | `src/theme.ts`                |

> **Atenção com as duas páginas de hóspede.** `regras.ts` reproduz o Anexo II
> do contrato de locação e `poco.ts` reproduz o manual impresso da bomba. São
> documentos operacionais e contratuais: ao mudar um texto aqui, mude também no
> papel, para que os dois nunca digam coisas diferentes.
>
> Os telefones não ficam em nenhum dos dois — as duas páginas leem de
> `src/data/casa.ts`, como o resto do site.

### Mudar a ordem do ranking das praias

Em `src/data/praias.ts`, cada praia tem um campo `posicao`. O número é a
posição dentro do próprio grupo (Top 1, Top 2 ou Litoral Norte). Troque os
números e a lista se reorganiza.

### Fixar o pino exato da casa no mapa

Hoje os botões "Ver no mapa" e "Traçar rota" procuram a casa pelo endereço.
Para deixar o pino exato:

1. Abra o Google Maps e ache a casa.
2. Segure o dedo em cima dela até aparecer um par de números
   (algo como `-7.3350, -34.7990`).
3. Em `src/data/casa.ts`, dentro de `destino`, acrescente a linha:

   ```ts
   coords: { lat: -7.3350, lng: -34.7990 },
   ```

O mesmo vale para qualquer praia, mirante ou restaurante.

---

## Como o site está organizado

```
app/                      as telas (cada arquivo vira um endereço do site)
  index.tsx               Início
  casa.tsx                A Casa
  praias.tsx              Praias
  passeios.tsx            Passeios e mirantes
  sabores.tsx             Gastronomia
  regras.tsx              Regras da Casa      (para quem já está hospedado)
  poco.tsx                Manual do poço      (para quem já está hospedado)
  _layout.tsx             a moldura: cabeçalho, página e botão do WhatsApp
  +html.tsx               a casca da página (fontes, título, compartilhamento)

src/
  data/                   TODO O CONTEÚDO — é aqui que se edita o site
  components/             as peças visuais reaproveitadas
  lib/links.ts            monta os links de mapa, Waze e WhatsApp
  theme.ts                cores, fontes e espaçamentos

public/fotos/             as fotos da casa
public/videos/            os vídeos da casa
public/fontes/            a fonte dos ícones
scripts/gerar-qrcode.mjs  o gerador da placa de parede
```

---

## Pontos que valem conferir antes de divulgar

- **Tempos de carro** — estão como estimativa a partir da casa
  (`minutosDeCarro`, em cada arquivo de dados). Vale ajustar com base em
  quem conhece a estrada.
- **Ranking do Litoral Norte** — a lista de praias do Litoral Norte e de
  João Pessoa é uma sugestão de partida. Reordene as posições no gosto do
  anfitrião, ou tire o que não valer a viagem.
- **Legendas dos banheiros** — pelas fotos não dá para saber qual é o da
  suíte e qual é o social. Estão com legendas genéricas; se souber, ajuste em
  `src/data/casa.ts`.
- **Fotos das praias** — os cartões de praia funcionam sem foto. Se quiser
  ilustrá-los, leia `public/fotos/lugares/LEIA-ME.md`: imagem achada no
  Google costuma ter dono, e o texto explica de onde tirar foto publicável.
- **Peso dos vídeos** — são 29 MB no total, mas só baixam quando o visitante
  toca em tocar. `public/videos/LEIA-ME.md` explica como aliviar isso, se
  um dia precisar.
- **Peso da fonte de ícones** — `public/fontes/MaterialCommunityIcons.ttf`
  tem 1,3 MB e carrega uma vez na primeira visita (depois fica no cache do
  celular). É o arquivo mais pesado do site. Se um dia isso incomodar, dá
  para reduzi-lo para poucos KB deixando só os ícones usados, com uma
  ferramenta de "subset" de fonte.
- **Restaurantes** — só o Irmão Neno tem telefone cadastrado. Se tiver o
  contato dos outros, é só acrescentar o campo `telefone` em
  `src/data/gastronomia.ts` que o botão de WhatsApp aparece sozinho. O
  campo `mensagemWhatsApp`, no mesmo lugar, é o texto que já vai escrito
  na conversa (o do Irmão Neno diz que o hóspede vem por indicação sua e
  pergunta as opções de refeição para comer lá); sem ele vale uma
  apresentação genérica.
