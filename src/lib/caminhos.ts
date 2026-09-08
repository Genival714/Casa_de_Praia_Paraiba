/**
 * Monta o endereço de um arquivo da pasta `public/`.
 *
 * Quando o site fica na raiz de um domínio, `/fotos/piscina.jpg` funciona
 * direto. Mas no GitHub Pages de um repositório o site mora numa subpasta —
 * `usuario.github.io/casa-de-praia/` — e aí o caminho certo passa a ser
 * `/casa-de-praia/fotos/piscina.jpg`.
 *
 * O Expo grava esse prefixo em EXPO_BASE_URL na hora de gerar o site, e esta
 * função só o coloca na frente. Assim o mesmo código serve para os dois casos.
 */
const BASE = (process.env.EXPO_BASE_URL ?? '').replace(/\/+$/, '');

export function arquivoPublico(caminho: string): string {
  const limpo = caminho.startsWith('/') ? caminho : `/${caminho}`;
  return `${BASE}${limpo}`;
}
