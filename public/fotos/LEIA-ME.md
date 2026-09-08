# Fotos da casa

As 14 fotos do site estão aqui. **Para trocar uma foto, salve a nova por cima,
com o mesmo nome** — não precisa mexer em nada no código.

## O que está publicado

**Área de lazer**

| Arquivo | Legenda no site |
| --- | --- |
| `piscina-deck.jpg` | Piscina, deck e jardim |
| `piscina-cascata.jpg` | A cascata da piscina |
| `area-gourmet.jpg` | Área gourmet e churrasqueira |
| `deck-espreguicadeiras.jpg` | Espreguiçadeiras e guarda-sóis |
| `area-jogos.jpg` | Sinuca, totó e redes |

**Sala e cozinha**

| Arquivo | Legenda no site |
| --- | --- |
| `sala-estar.jpg` | Sala de estar |
| `cozinha.jpg` | Cozinha equipada |
| `cozinha-cafe.jpg` | Cantinho do café |

**Quartos**

| Arquivo | Legenda no site |
| --- | --- |
| `quarto-casal-tv.jpg` | Quarto com cama de casal, beliche e TV |
| `quarto-beliches-tv.jpg` | Quarto com beliches, TV e frigobar |
| `quarto-beliches.jpg` | Quarto com beliches |

**Banheiros**

| Arquivo | Legenda no site |
| --- | --- |
| `banheiro-01.jpg` | Banheiro com box |
| `banheiro-03.jpg` | Box de vidro |
| `wc-externo.jpg` | WC externo, com saída para a piscina |

> **Duas coisas para conferir nos banheiros.**
> 1. Pelas fotos não dá para saber qual é o da suíte e qual é o social. Se
>    souber, troque as legendas em `src/data/casa.ts`.
> 2. `banheiro-01.jpg` e `banheiro-03.jpg` podem ser o mesmo banheiro — as
>    toalhas e os tapetes mudam, o azulejo é igual. Se forem, apague um.

## As fotos que saíram

Você mandou 28 fotos. Tirei as que mostravam o mesmo cômodo do mesmo ângulo,
porque galeria repetida cansa quem está decidindo se aluga:

| Saiu | Porque |
| --- | --- |
| `area-jogos-tv.jpg` | mesmo enquadramento de `area-jogos.jpg` |
| `deck-mesas.jpg` | mesmo canto de `deck-espreguicadeiras.jpg` |
| `sala-tv.jpg` | mesma sala de `sala-estar.jpg` |
| `cozinha-bancada.jpg` | ficava entre `cozinha.jpg` e `cozinha-cafe.jpg` |
| `quarto-casal-ar.jpg` | terceiro ângulo do mesmo quarto |
| `banheiro-02.jpg` | praticamente igual a `banheiro-01.jpg` |
| `wc-externo-box.jpg` | mesmo WC externo de `wc-externo.jpg` |
| `quarto-casal.jpg` | mesmo quarto de `quarto-casal-tv.jpg`, um passo ao lado |

**Nenhum original foi perdido**: as 28 fotos continuam na pasta
`Imagens da casa`, do jeito que você mandou.

## Voltar com uma foto, ou acrescentar outra

1. Copie a foto de `Imagens da casa` para esta pasta, com um nome simples e
   sem acento.
2. Abra `src/data/casa.ts` e acrescente uma linha na lista `galeria`:

   ```ts
   { arquivo: 'nome-da-foto.jpg', legenda: 'O que aparece', categoria: 'lazer' },
   ```

   A `categoria` pode ser `'lazer'`, `'convivio'` (sala e cozinha),
   `'quartos'` ou `'banheiros'` — é o que alimenta os filtros da tela.

3. Rode `npm run export` e publique de novo.

## Tamanho dos arquivos

As fotos atuais têm entre 90 e 190 KB, que é o tamanho certo para o site abrir
rápido no 4G da praia. Se for acrescentar uma foto tirada direto do celular
(que costuma ter 3 a 5 MB), reduza antes para no máximo **1600 pixels** de
largura. No Windows dá para fazer isso pelo app **Fotos** → *Redimensionar*.
