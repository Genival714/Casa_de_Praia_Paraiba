# Fotos dos mirantes e passeios

Esta pasta é opcional. Sem foto, o cartão de cada lugar já fica bonito — com
o número do ranking, o texto e os botões de rota. Com foto, fica melhor ainda.

> **Praias não passam por aqui.** As fotos das praias vão para a pasta
> `Imagens das Praias/` na raiz do projeto e o script
> `scripts/fotos-das-praias.py` cuida do resto — o README explica.

## Como acrescentar

1. Salve a imagem aqui, com um nome simples e sem acento.
   Exemplo: `mirante-do-amor.jpg`

2. Abra `src/data/passeios.ts`, ache o lugar e acrescente a linha `foto`:

   ```ts
   {
     id: 'mirante-do-amor',
     ...
     foto: 'lugares/mirante-do-amor.jpg',
   },
   ```

   Repare no `lugares/` na frente — é o caminho a partir de `public/fotos/`.

   Uma foto de praia que já está no site também serve, sem copiar nada:
   `foto: 'praias/tambaba-02.jpg'` (os nomes estão em
   `src/data/fotosDasPraias.ts`). É assim que os mirantes do Litoral Sul
   estão hoje.

   Se o corte da foto esconder a parte que interessa, ajuste com
   `fotoPosicao: '50% 30%'` (o segundo número sobe a foto; o padrão mostra
   mais a parte de baixo).

   Foto de terceiros (Wikimedia Commons, banco de imagens) precisa de
   crédito — o site mostra "Foto: autor · licença" no canto, com link:

   ```ts
   foto: 'lugares/farol-cabo-branco.jpg',
   credito: { autor: 'Fulano', licenca: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:...' },
   ```

3. Rode `npm run github-pages` e publique de novo.

## De onde tirar as fotos — atenção

Foto que aparece no Google **não é livre para usar**. Quase toda imagem tem
dono, e publicar sem permissão pode dar problema, ainda mais num site que
anuncia um imóvel. As saídas seguras são:

- **Fotos suas.** É a melhor opção de longe: você mora no litoral e conhece a
  melhor hora de luz de cada praia. Foto real também passa mais confiança do
  que banco de imagem.
- **Fotos de amigos ou de hóspedes**, com autorização de quem tirou.
- **Wikimedia Commons** (<https://commons.wikimedia.org>), com fotos sob
  licença Creative Commons — é de lá que vieram as fotos do Litoral Norte
  que estão no site. Só use as marcadas CC0, CC BY, CC BY-SA ou domínio
  público (nada de "NC" ou "ND"), e sempre com o campo `credito`.
- **Bancos de imagem gratuitos**, que já liberam o uso comercial:
  - <https://unsplash.com>
  - <https://pexels.com>
  - <https://pixabay.com>

  Procure por "Coqueirinho Paraiba", "falesia nordeste", "praia Paraiba".
  Só tome cuidado para a foto combinar com o lugar de verdade — hóspede que
  chega esperando uma praia diferente da foto sai frustrado.

## Tamanho

Mesma regra das fotos da casa: no máximo 1600 pixels de largura e abaixo de
400 KB por arquivo, para o site abrir rápido no 4G.
