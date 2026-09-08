# Fotos das praias, mirantes e passeios

Esta pasta é opcional. Sem foto, o cartão de cada lugar já fica bonito — com
o número do ranking, o texto e os botões de rota. Com foto, fica melhor ainda.

## Como acrescentar

1. Salve a imagem aqui, com um nome simples e sem acento.
   Exemplo: `coqueirinho.jpg`

2. Abra `src/data/praias.ts` (ou `src/data/passeios.ts`), ache o lugar e
   acrescente a linha `foto`:

   ```ts
   {
     id: 'coqueirinho',
     nome: 'Coqueirinho e Enseada de Coqueirinho',
     ...
     foto: 'lugares/coqueirinho.jpg',
   },
   ```

   Repare no `lugares/` na frente — é o caminho a partir de `public/fotos/`.

3. Rode `npm run export` e publique de novo.

## De onde tirar as fotos — atenção

Foto que aparece no Google **não é livre para usar**. Quase toda imagem tem
dono, e publicar sem permissão pode dar problema, ainda mais num site que
anuncia um imóvel. As saídas seguras são:

- **Fotos suas.** É a melhor opção de longe: você mora no litoral e conhece a
  melhor hora de luz de cada praia. Foto real também passa mais confiança do
  que banco de imagem.
- **Fotos de amigos ou de hóspedes**, com autorização de quem tirou.
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
