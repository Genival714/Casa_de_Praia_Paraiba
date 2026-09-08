import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

import { arquivoPublico } from '@/lib/caminhos';

/**
 * Casca HTML do site (so vale na web).
 * E aqui que entram as fontes, as metatags de compartilhamento e o fundo
 * da pagina — coisas que nao existem no app nativo.
 */
export default function Root({ children }: PropsWithChildren) {
  const titulo = 'Casa de Praia · Praia do Amor · Jacumã — Conde/PB';
  const descricao =
    'Casa de temporada toda mobiliada na Praia do Amor, Jacumã — Conde/PB. Piscina, área de lazer e um guia das melhores praias, mirantes e restaurantes do Litoral Sul paraibano.';

  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        <title>{titulo}</title>
        <meta name="description" content={descricao} />
        <meta name="theme-color" content="#0E6F7E" />

        {/* Pré-visualização ao compartilhar o link no WhatsApp e nas redes */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content={titulo} />
        <meta property="og:description" content={descricao} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
        />

        {/*
          Desliga o scroll do body para que só o ScrollView role.
          Sem isso, a rolagem duplica na web.
        */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: estiloDaPagina() }} />
      </head>
      <body>{children}</body>
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
html, body {
  background-color: #FDF8F0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overscroll-behavior-y: none;
}
/* Nada de rolagem horizontal: tabelas e faixas roladas cuidam de si. */
body {
  overflow-x: hidden;
}
::selection {
  background-color: #7FD8DE;
  color: #063A4F;
}
/* Foco visível para quem navega pelo teclado. */
:focus-visible {
  outline: 2px solid #0E6F7E;
  outline-offset: 2px;
  border-radius: 6px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
