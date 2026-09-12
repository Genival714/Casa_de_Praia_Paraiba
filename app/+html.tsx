import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { casa } from '@/data/casa';
import { arquivoPublico } from '@/lib/caminhos';
import { normalizarTelefone } from '@/lib/links';
import { IMAGEM_DE_COMPARTILHAMENTO, ORIGEM, urlAbsoluta } from '@/lib/site';

/**
 * Ficha do imóvel no formato que o Google entende (schema.org).
 *
 * Sem `geo`: a casa ainda não tem coordenada conferida — veja o comentário
 * em src/data/casa.ts sobre como pegá-la no Google Maps.
 */
function fichaDoImovel() {
  const imagem = urlAbsoluta(IMAGEM_DE_COMPARTILHAMENTO);

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: casa.nome,
    description: casa.subchamada,
    telephone: `+${normalizarTelefone(casa.anfitrioes[0].telefone)}`,
    ...(ORIGEM ? { url: ORIGEM } : {}),
    ...(imagem ? { image: [imagem] } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: casa.endereco.logradouro,
      addressLocality: casa.endereco.cidade,
      addressRegion: casa.endereco.estado,
      addressCountry: 'BR',
    },
  };
}

/**
 * Casca HTML do site (so vale na web).
 * E aqui que entram as fontes, as metatags de compartilhamento e o fundo
 * da pagina — coisas que nao existem no app nativo.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        {/*
          O título e as metatags de compartilhamento NÃO ficam aqui: cada
          página declara os seus, em src/components/CabecalhoDaPagina.tsx.
          Se voltarem para cá, todas as páginas passam a ter o mesmo título.
        */}
        <meta name="theme-color" content="#04303A" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&family=Outfit:wght@300..700&display=swap"
        />

        {/*
          Desliga o scroll do body para que só o ScrollView role.
          Sem isso, a rolagem duplica na web.
        */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: estiloDaPagina() }} />

        {/*
          Marca que o JavaScript está ligado, antes do primeiro desenho.
          Sem essa marca, nada do CSS de revelação vale — quem entra com o
          JavaScript desligado vê a página inteira, parada e completa.
          Precisa vir aqui no <head>: se viesse depois, o conteúdo apareceria
          e sumiria num piscar.
        */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.dataset.js="1"' }} />

        {/* Ficha do imóvel para os buscadores, montada a partir de src/data/casa.ts. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fichaDoImovel()) }}
        />
      </head>
      <body>
        {children}
        {/*
          Observador da revelação ao rolar. Fica no fim do <body> para já
          encontrar o conteúdo da primeira página desenhado pelo servidor.
          As páginas seguintes (navegação interna) se registram sozinhas —
          veja src/lib/revelar.web.ts.
        */}
        <script dangerouslySetInnerHTML={{ __html: scriptDeRevelacao() }} />
      </body>
    </html>
  );
}

const estiloDaPagina = () => `
/* Fonte dos ícones. Declarada aqui para o ícone existir já no primeiro
   desenho da página, sem esperar o JavaScript carregar a fonte. */
@font-face {
  font-family: 'material-community';
  src: url('${arquivoPublico('/fontes/MaterialCommunityIcons.ttf')}') format('truetype');
  font-display: block;
  font-weight: normal;
  font-style: normal;
}
:root {
  color-scheme: light;
}
/* As cores abaixo espelham src/theme.ts à mão — este arquivo não consegue
   importar de lá. Ao mudar a paleta, mude aqui também. */
html, body {
  background-color: #FFFCF6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior-y: none;
}
/* Nada de rolagem horizontal: tabelas e faixas roladas cuidam de si. */
body {
  overflow-x: hidden;
}
::selection {
  background-color: #3BB3BC;
  color: #04303A;
}
/* Foco visível para quem navega pelo teclado. */
:focus-visible {
  outline: 2px solid #0A4B57;
  outline-offset: 2px;
  border-radius: 6px;
}

/* -------------------------------------------------------------------------
   Movimento

   O react-native-web repassa a prop \`dataSet\` como atributos data-* no HTML.
   É por eles que este CSS enxerga os componentes. Tudo fica atrás de
   html[data-js="1"]: sem JavaScript, nada some.
   ----------------------------------------------------------------------- */

/* Estado de repouso: o bloco espera fora de vista. */
html[data-js="1"] [data-anim] {
  opacity: 0;
  transition-property: opacity, transform;
  transition-duration: 640ms;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
html[data-js="1"] [data-anim="surge"]    { transform: translateY(16px); }
html[data-js="1"] [data-anim="desliza"]  { transform: translateX(-14px); }
html[data-js="1"] [data-anim="cresce"]   { transform: scale(0.97); }
/* Só opacidade: para blocos que já têm transform próprio (a onda virada). */
html[data-js="1"] [data-anim="surgeSuave"] { transform: none; }

/* Chegou: assenta e libera a camada de composição. */
html[data-js="1"] [data-anim][data-visivel="1"] {
  opacity: 1;
  transform: none;
  will-change: auto;
}

/* Listas entram em cascata, não todas de uma vez. */
html[data-js="1"] [data-atraso="1"] { transition-delay:  70ms; }
html[data-js="1"] [data-atraso="2"] { transition-delay: 140ms; }
html[data-js="1"] [data-atraso="3"] { transition-delay: 210ms; }

/* -------------------------------------------------------------------------
   Ondas de verdade (src/components/Base.tsx, Onda).

   Cada camada tem o dobro da largura e dois períodos iguais; deslizar 50%
   da própria largura em ritmo constante e recomeçar não deixa emenda.
   A da frente e a de trás vão para um lado, a do meio volta — ondas que
   se cruzam são o que faz parecer mar, e não uma esteira.
   O balanço vertical fica num nó de fora, com outro ritmo, porque um só
   elemento não pode ter duas animações de transform ao mesmo tempo.
   ----------------------------------------------------------------------- */
@keyframes ondaVai   { from { transform: translate3d(0, 0, 0); }    to { transform: translate3d(-50%, 0, 0); } }
@keyframes ondaVolta { from { transform: translate3d(-50%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
@keyframes ondaBalanca {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -5px, 0); }
}
[data-onda="frente"] { animation: ondaVai   11s linear infinite; }
[data-onda="meio"]   { animation: ondaVolta 17s linear infinite; }
[data-onda="fundo"]  { animation: ondaVai   26s linear infinite; }
[data-balanco="1"] { animation: ondaBalanca 7.5s ease-in-out infinite; }
[data-balanco="2"] { animation: ondaBalanca 5.5s ease-in-out infinite -2s; }
[data-balanco="3"] { animation: ondaBalanca 6.5s ease-in-out infinite -4s; }

/* -------------------------------------------------------------------------
   Sol vivo (src/components/Sol.tsx).

   O núcleo e o brilho respiram juntos — é a mesma luz — e o halo, mais
   lento e fora de fase, garante que o conjunto nunca repita igual.
   O degradê radial vai aqui, e não no componente, porque o React Native
   não desenha degradê radial. A cor chapada do componente sai como estilo
   inline — que ganha de qualquer seletor —, daí o !important: na web ela
   some e fica só o degradê, de borda macia; no nativo ela continua lá.
   ----------------------------------------------------------------------- */
[data-sol][data-tom] { background-color: transparent !important; }
@keyframes solRespira {
  0%, 100% { opacity: 0.55; transform: scale(0.96); }
  50%      { opacity: 1;    transform: scale(1.06); }
}
@keyframes solEspalha {
  0%, 100% { opacity: 0.35; transform: scale(0.88); }
  50%      { opacity: 1;    transform: scale(1.22); }
}
@keyframes solHalo {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.1); }
}
[data-sol="nucleo"][data-tom="dia"] {
  background: radial-gradient(circle, rgba(255,240,205,0.55) 0%, rgba(255,226,178,0.38) 45%, rgba(255,226,178,0.10) 75%, rgba(255,226,178,0) 100%);
}
[data-sol="brilho"][data-tom="dia"] {
  background: radial-gradient(circle, rgba(255,214,150,0.22) 0%, rgba(255,200,120,0.08) 45%, rgba(255,200,120,0) 70%);
}
[data-sol="nucleo"][data-tom="poente"] {
  background: radial-gradient(circle, rgba(232,150,95,0.50) 0%, rgba(201,106,49,0.30) 45%, rgba(201,106,49,0.08) 75%, rgba(201,106,49,0) 100%);
}
[data-sol="brilho"][data-tom="poente"] {
  background: radial-gradient(circle, rgba(217,128,85,0.20) 0%, rgba(217,128,85,0.07) 45%, rgba(217,128,85,0) 70%);
}
[data-sol="halo"][data-tom] {
  background: radial-gradient(circle, rgba(59,179,188,0.14) 0%, rgba(59,179,188,0.05) 55%, rgba(59,179,188,0) 72%);
}
[data-sol="nucleo"] { animation: solRespira 5.2s ease-in-out infinite; }
[data-sol="brilho"] { animation: solEspalha 5.2s ease-in-out infinite; }
[data-sol="halo"]   { animation: solHalo   8.6s ease-in-out infinite -3s; }
/* Sóis na mesma tela começam em pontos diferentes da respiração. */
[data-sol][data-fase="1"] { animation-delay: -1.3s; }
[data-sol][data-fase="2"] { animation-delay: -2.6s; }
[data-sol][data-fase="3"] { animation-delay: -3.9s; }

/* Hover em CSS não re-renderiza nada e não aparece em tela de toque. */
[data-cartao="true"] {
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms ease;
}
@media (hover: hover) {
  [data-cartao="true"]:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 34px rgba(20, 49, 58, 0.13);
  }
  [data-pilula="true"] {
    transition: background-color 180ms ease, border-color 180ms ease;
  }
}

/* -------------------------------------------------------------------------
   Atmosfera e profundidade
   ----------------------------------------------------------------------- */

/* Grão fino por cima das faixas escuras e de areia — tira o aspecto de
   "cor chapada" e dá textura de papel e areia. */
[data-grao="true"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
[data-grao="claro"]::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.35;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.28 0 0 0 0 0.2 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

/* Foto de capa: zoom lento e contínuo (efeito Ken Burns). */
@keyframes kenburns {
  0%   { transform: scale(1.02) translate3d(0, 0, 0); }
  100% { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
}
[data-kenburns="true"] {
  animation: kenburns 22s ease-out forwards;
  transform-origin: 60% 40%;
  will-change: transform;
}

/* Entrada orquestrada da capa: cada linha sobe um pouco depois da anterior.
   É animação de carregamento, não de rolagem — por isso não usa data-anim. */
@keyframes entrada {
  from { opacity: 0; transform: translate3d(0, 22px, 0); }
  to   { opacity: 1; transform: none; }
}
html[data-js="1"] [data-entrada] {
  opacity: 0;
  animation: entrada 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
html[data-js="1"] [data-entrada="1"] { animation-delay: 120ms; }
html[data-js="1"] [data-entrada="2"] { animation-delay: 260ms; }
html[data-js="1"] [data-entrada="3"] { animation-delay: 400ms; }
html[data-js="1"] [data-entrada="4"] { animation-delay: 540ms; }
html[data-js="1"] [data-entrada="5"] { animation-delay: 700ms; }

/* Tipografia fluida: o React Native não sabe fazer clamp(), o CSS sabe.
   No celular o título fica como está; no computador ele cresce. */
[data-tipo="capa"] {
  font-size: clamp(2.6rem, 6.2vw, 4.6rem) !important;
  line-height: 1.02 !important;
  letter-spacing: -0.03em !important;
}
[data-tipo="titulo-tela"] {
  font-size: clamp(2.1rem, 5vw, 3.4rem) !important;
  line-height: 1.06 !important;
  letter-spacing: -0.025em !important;
}
[data-tipo="h2"] {
  font-size: clamp(1.7rem, 3.6vw, 2.4rem) !important;
  line-height: 1.1 !important;
}

/* A capa ocupa boa parte da tela em qualquer tamanho, sem virar um abismo. */
[data-capa="true"] {
  min-height: clamp(560px, 84vh, 800px) !important;
}

/* Fotos que reagem ao cursor: a imagem cresce dentro da moldura. */
[data-zoom="true"] img {
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 600ms ease;
  will-change: transform;
}
@media (hover: hover) {
  [data-zoom="true"]:hover img {
    transform: scale(1.06);
    filter: saturate(1.08);
  }
}

/* Cartões: sombra em três camadas. */
[data-cartao="true"] {
  box-shadow:
    0 1px 2px rgba(20, 49, 58, 0.04),
    0 6px 16px rgba(20, 49, 58, 0.06),
    0 18px 40px rgba(20, 49, 58, 0.06);
}
@media (hover: hover) {
  [data-cartao="true"]:hover {
    transform: translateY(-4px);
    box-shadow:
      0 2px 4px rgba(20, 49, 58, 0.05),
      0 14px 28px rgba(20, 49, 58, 0.10),
      0 30px 60px rgba(20, 49, 58, 0.10);
  }
}

/* Botões: a seta desliza para a direita ao passar o mouse. */
[data-seta="true"] {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}
@media (hover: hover) {
  [data-botao="true"] { transition: filter 180ms ease, transform 140ms ease, opacity 140ms ease; }
  [data-botao="true"]:hover { filter: brightness(1.06); }
  [data-botao="true"]:hover [data-seta="true"] { transform: translateX(4px); }
}

/* Botão flutuante do WhatsApp: um anel que pulsa devagar, para o olho achar. */
@keyframes pulso {
  0%   { transform: scale(1);   opacity: 0.55; }
  100% { transform: scale(1.9); opacity: 0; }
}
[data-fab="true"]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: #25D366;
  animation: pulso 2.6s ease-out infinite;
  z-index: -1;
}

/* Navegação: sublinhado que cresce do meio ao passar o mouse. */
[data-pilula="true"]::after {
  content: "";
  position: absolute;
  left: 12px; right: 12px; bottom: 3px;
  height: 1.5px;
  background: #3BB3BC;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}
@media (hover: hover) {
  [data-pilula="true"]:hover::after { transform: scaleX(1); }
}

/* Contador: números alinhados enquanto sobem. */
[data-contador] { font-variant-numeric: tabular-nums; }

/* -------------------------------------------------------------------------
   Quem pediu menos movimento vê tudo — parado e completo.

   Zerar a duração da transição não basta: sem isso, um bloco que nunca fosse
   observado ficaria preso em opacity: 0. Por isso o estado de repouso também
   é anulado aqui. Este bloco precisa ser o último.
   ----------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  html[data-js="1"] [data-anim] {
    opacity: 1 !important;
    transform: none !important;
  }
  [data-onda], [data-balanco], [data-sol], [data-kenburns="true"], [data-fab="true"]::before {
    animation: none !important;
  }
  html[data-js="1"] [data-entrada] {
    opacity: 1 !important;
    animation: none !important;
  }
  [data-cartao="true"]:hover, [data-zoom="true"]:hover img {
    transform: none !important;
  }
}
`;

/**
 * Marca cada bloco como visível assim que ele entra na tela, uma vez só.
 *
 * Fica exposto em window.__revelar para que os blocos criados depois —
 * navegação interna, filtros — possam se registrar no mesmo observador.
 */
const scriptDeRevelacao = () => `
(function () {
  if (!('IntersectionObserver' in window)) {
    // Navegador antigo: mostra tudo e vai embora.
    document.documentElement.removeAttribute('data-js');
    return;
  }
  var observador = new IntersectionObserver(function (entradas) {
    for (var i = 0; i < entradas.length; i++) {
      if (entradas[i].isIntersecting) {
        entradas[i].target.setAttribute('data-visivel', '1');
        observador.unobserve(entradas[i].target);
      }
    }
  }, { threshold: 0.04, rootMargin: '0px 0px -6% 0px' });

  window.__revelar = function (no) {
    if (no && no.nodeType === 1 && !no.hasAttribute('data-visivel')) {
      observador.observe(no);
    }
  };

  var blocos = document.querySelectorAll('[data-anim]');
  for (var j = 0; j < blocos.length; j++) window.__revelar(blocos[j]);
})();
`;
