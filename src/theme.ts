/**
 * Paleta e escalas visuais do site.
 * Tema: litoral paraibano — mar turquesa, areia clara, sol e falésias de barro.
 */

export const colors = {
  /* Mar */
  marProfundo: '#063A4F',
  mar: '#0E6F7E',
  marClaro: '#16A6B6',
  agua: '#7FD8DE',
  aguaSuave: '#DFF4F5',

  /* Areia */
  areia: '#FDF8F0',
  areiaMedia: '#F5EADA',
  areiaEscura: '#E4D3BB',
  branco: '#FFFFFF',
  papel: '#FFFDF9',

  /* Sol e falésia */
  sol: '#E9A23B',
  porDoSol: '#F0714B',
  falesia: '#C4622F',
  coral: '#FF7A59',

  /* Vegetação */
  coqueiro: '#2E7D5B',

  /* Texto */
  texto: '#0B2B36',
  textoSuave: '#4A6B75',
  textoClaro: '#7D97A0',

  /* Marca externa */
  whatsapp: '#25D366',
  whatsappEscuro: '#128C7E',
  waze: '#33CCFF',

  /* Utilidades */
  borda: 'rgba(6, 58, 79, 0.10)',
  bordaForte: 'rgba(6, 58, 79, 0.18)',
  sombra: 'rgba(6, 58, 79, 0.14)',
  overlay: 'rgba(6, 58, 79, 0.55)',
} as const;

/**
 * As fontes chegam pelo <link> do Google Fonts declarado em app/+html.tsx.
 * Stacks completas para o app degradar bem se a fonte não carregar.
 */
export const fonts = {
  display: 'Fraunces, Georgia, "Times New Roman", serif',
  corpo: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

export const espaco = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const raio = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const sombras = {
  card: {
    shadowColor: colors.marProfundo,
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  flutuante: {
    shadowColor: colors.marProfundo,
    shadowOpacity: 0.28,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
} as const;

/** Largura máxima do conteúdo — o site nasce mobile, mas não pode quebrar no desktop. */
export const LARGURA_MAX = 720;
