/**
 * Paleta e escalas visuais do site.
 * Tema: litoral paraibano — mar turquesa, areia clara, sol e falésias de barro.
 *
 * As cores vêm dos documentos impressos do hóspede (manual do poço e regras da
 * casa), para que site e papel sejam a mesma marca.
 *
 * Atenção: três arquivos espelham estes valores à mão, porque não conseguem
 * importar daqui. Ao mudar uma cor de marca, mude também em:
 *   - app/+html.tsx          (fundo, ::selection, foco, theme-color)
 *   - app.json               (themeColor, backgroundColor, splash, ícone Android)
 *   - scripts/gerar-qrcode.mjs (a placa impressa que fica na parede da casa)
 */

export const colors = {
  /* Mar */
  marProfundo: '#04303A',
  mar: '#0A4B57',
  marClaro: '#127C89',
  agua: '#3BB3BC',
  aguaSuave: '#E9F2F4',

  /* Areia */
  areia: '#FFFCF6', // fundo da página
  areiaMedia: '#F3E8D8', // faixas e cabeçalhos de tabela
  areiaEscura: '#E6D5BD',
  branco: '#FFFFFF',
  papel: '#FFFFFF', // fundo dos cartões

  /* Sol e falésia */
  sol: '#D9903A',
  porDoSol: '#C96A31', // igual a `falesia`, de propósito: uma cor de ação só
  falesia: '#C96A31',
  coral: '#D98055',

  /* Vegetação */
  coqueiro: '#2E7D5A',

  /* Texto */
  texto: '#14313A',
  textoSuave: '#4A6167',
  textoClaro: '#7A8E94',

  /* Marca externa */
  whatsapp: '#25D366',
  whatsappEscuro: '#128C7E',
  whatsappTexto: '#06331C',
  waze: '#33CCFF',

  /* Documentos do hóspede: sim/não, avisos e bloco legal */
  verde: '#2E7D5A',
  verdeEscuro: '#235F44',
  verdeBorda: 'rgba(46, 125, 90, 0.35)',
  vermelho: '#B03A2A',
  okFundo: '#E9F3EE',
  naoFundo: '#FAEBE8',
  avisoFundo: '#FDEFE4',
  avisoTexto: '#9A4B1C',
  solFundo: '#FDF0DA',
  solTexto: '#9A6410',

  /* Utilidades */
  borda: 'rgba(20, 49, 58, 0.15)',
  bordaForte: 'rgba(20, 49, 58, 0.24)',
  sombra: 'rgba(20, 49, 58, 0.14)',
  overlay: 'rgba(4, 48, 58, 0.58)',
} as const;

/**
 * As fontes chegam pelo <link> do Google Fonts declarado em app/+html.tsx.
 * Stacks completas para o app degradar bem se a fonte não carregar.
 */
export const fonts = {
  display: 'Fraunces, Georgia, "Times New Roman", serif',
  corpo: 'Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

/**
 * Escala de texto. O corpo é 17/27 como nos documentos.
 *
 * Os documentos usam peso 350, que o React Native não aceita — `fontWeight` só
 * vai de cem em cem. Texto corrido usa '300', que é o mais próximo.
 */
export const tipo = {
  corpo: { fontSize: 17, lineHeight: 27 },
  corpoMenor: { fontSize: 15, lineHeight: 23 },
  detalhe: { fontSize: 13, lineHeight: 19 },
  pesoCorpo: '300',
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

/**
 * Largura máxima do conteúdo — o site nasce mobile, mas não pode quebrar no
 * desktop. 808 menos os 48 de respiro lateral do `Conteudo` dá os 760 da
 * coluna dos documentos.
 */
export const LARGURA_MAX = 808;

/** Folga no fim de cada página para o botão flutuante do WhatsApp não cobrir nada. */
export const ESPACO_FINAL_DA_PAGINA = 96;
