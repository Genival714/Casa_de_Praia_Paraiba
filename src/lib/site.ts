/**
 * Endereço completo do site, do tipo https://usuario.github.io/repositorio.
 *
 * Quem preenche é o script de publicação (scripts/publicar-github-pages.mjs),
 * que descobre o usuário pelo endereço do repositório no Git.
 *
 * Serve para as tags de compartilhamento: o robô do WhatsApp e do Google só
 * aceita endereço absoluto para a imagem de pré-visualização e para a tag
 * canônica. Rodando na sua máquina fica vazio — e aí simplesmente não
 * geramos essas tags, em vez de gerar uma errada.
 */
export const ORIGEM = (process.env.EXPO_PUBLIC_ORIGEM ?? '').replace(/\/+$/, '');

/**
 * Endereço absoluto de um arquivo de `public/`, ou `undefined` se não der.
 *
 * ORIGEM já termina no caminho base do site, então basta concatenar — não
 * use `arquivoPublico` aqui, senão o caminho base entra duas vezes.
 */
export function urlAbsoluta(caminho: string): string | undefined {
  if (!ORIGEM) return undefined;
  return `${ORIGEM}${caminho.startsWith('/') ? caminho : `/${caminho}`}`;
}

/** Endereço absoluto de uma página do site: `/`, `/casa`, `/regras`… */
export function urlDaPagina(rota: string): string | undefined {
  if (!ORIGEM) return undefined;
  const limpo = rota === '/' ? '' : rota.replace(/^\/+/, '/');
  return `${ORIGEM}${limpo}`;
}

/** A imagem que aparece quando alguém manda o link no WhatsApp. */
export const IMAGEM_DE_COMPARTILHAMENTO = '/og/capa.jpg';
