# Vídeos da casa

Os cinco vídeos já estão publicados, na seção "Um passeio pela casa", dentro
da tela **A Casa**.

| Arquivo | Título no site | Duração | Peso |
| --- | --- | --- | --- |
| `area-de-lazer.mp4` | Área de lazer e piscina | 1 min 13 | 13 MB |
| `quartos.mp4` | Quartos e banheiro | 34 s | 6 MB |
| `sala-e-cozinha.mp4` | Sala e cozinha | 18 s | 3 MB |
| `banheiro.mp4` | Banheiro | 20 s | 3,5 MB |
| `quarto-beliches.mp4` | Quarto com beliches | 13 s | 2 MB |

## Como funciona

Tem um player só na tela. Embaixo dele ficam os cinco vídeos em botões; o
visitante toca em um e ele entra no player.

**Nenhum vídeo é baixado antes de a pessoa tocar em tocar.** Até lá aparece
só uma foto de capa. Isso é importante: são 29 MB no total, e ninguém no 4G
da praia deveria baixar isso sem pedir.

## Trocar, tirar ou acrescentar

Abra `src/data/casa.ts` e edite a lista `videos`. Cada item é assim:

```ts
{
  arquivo: 'area-de-lazer.mp4',   // o nome do arquivo nesta pasta
  titulo: 'Área de lazer e piscina',
  duracao: '1 min 13',            // escrito à mão, do jeito que deve aparecer
  capa: 'piscina-deck.jpg',       // uma foto de public/fotos/
  emPe: true,                     // só para vídeo gravado com o celular em pé
},
```

O primeiro da lista é o que aparece escolhido quando a pessoa chega na seção.

Depois de mexer, rode `npm run export` e publique de novo.

## Se quiser deixar o site mais leve

Os vídeos vieram do WhatsApp, já compactados (848 × 480). Está bom para
celular. Duas coisas que dariam para fazer um dia, se o site começar a pesar:

- **Encurtar o vídeo maior.** O de 1 min 13 é o mais pesado da casa inteira.
- **Subir os vídeos no YouTube** (podem ficar como "não listados", abrindo só
  por link) e apontar o site para lá. Aí o YouTube cuida de entregar a
  qualidade certa para a internet de cada visitante, e a pasta do site fica
  com poucos megabytes.

Nada disso é urgente — do jeito que está, a página abre rápido porque o vídeo
só carrega sob demanda.
