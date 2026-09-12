/**
 * Vídeos das praias — do link colado ao player embutido.
 *
 * O cadastro guarda só o link, do jeito que sai do botão "copiar" do app.
 * Aqui a gente descobre a plataforma, o id, o endereço do player que roda
 * dentro do site e, quando a plataforma oferece, a miniatura pública.
 *
 * Nada de terceiro é carregado até o hóspede tocar no play: o player só
 * nasce dentro do visor em tela cheia. A miniatura do YouTube é uma imagem
 * simples, sem script.
 */

export type Plataforma = 'youtube' | 'vimeo' | 'instagram' | 'tiktok';

export type VideoReconhecido = {
  plataforma: Plataforma;
  /** Nome para mostrar: "YouTube", "Shorts", "Reels"… */
  rotulo: string;
  /** Endereço do player embutido, com autoplay. */
  player: string;
  /** Miniatura pública, quando existe (só o YouTube dá sem chave de API). */
  miniatura?: string;
  /** Vídeo em pé (Shorts, Reels, TikTok). */
  vertical: boolean;
};

const ID_YOUTUBE = /^[\w-]{6,}$/;

function caminho(url: URL): string[] {
  return url.pathname.split('/').filter(Boolean);
}

function youtube(url: URL): VideoReconhecido | null {
  const partes = caminho(url);
  let id: string | null = null;
  let vertical = false;

  if (url.hostname === 'youtu.be') {
    id = partes[0] ?? null;
  } else if (partes[0] === 'watch') {
    id = url.searchParams.get('v');
  } else if (partes[0] === 'shorts' || partes[0] === 'embed' || partes[0] === 'live') {
    id = partes[1] ?? null;
    vertical = partes[0] === 'shorts';
  }

  if (!id || !ID_YOUTUBE.test(id)) return null;

  const parametros = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  const inicio = url.searchParams.get('t');
  if (inicio) parametros.set('start', String(parseInt(inicio, 10) || 0));

  return {
    plataforma: 'youtube',
    rotulo: vertical ? 'Shorts' : 'YouTube',
    player: `https://www.youtube-nocookie.com/embed/${id}?${parametros}`,
    miniatura: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    vertical,
  };
}

function vimeo(url: URL): VideoReconhecido | null {
  const id = caminho(url).find((parte) => /^\d{6,}$/.test(parte));
  if (!id) return null;
  return {
    plataforma: 'vimeo',
    rotulo: 'Vimeo',
    player: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`,
    vertical: false,
  };
}

function instagram(url: URL): VideoReconhecido | null {
  const partes = caminho(url);
  const tipo = partes[0] === 'reels' ? 'reel' : partes[0];
  const codigo = partes[1];
  if ((tipo !== 'reel' && tipo !== 'p') || !codigo || !/^[\w-]+$/.test(codigo)) return null;
  return {
    plataforma: 'instagram',
    rotulo: tipo === 'reel' ? 'Reels' : 'Instagram',
    player: `https://www.instagram.com/${tipo}/${codigo}/embed/`,
    vertical: true,
  };
}

function tiktok(url: URL): VideoReconhecido | null {
  const partes = caminho(url);
  const posicao = partes.indexOf('video');
  const id = posicao >= 0 ? partes[posicao + 1] : undefined;
  if (!id || !/^\d+$/.test(id)) return null;
  return {
    plataforma: 'tiktok',
    rotulo: 'TikTok',
    player: `https://www.tiktok.com/embed/v2/${id}`,
    vertical: true,
  };
}

/**
 * Reconhece um link de vídeo. Devolve `null` para links que não dá para
 * embutir (aí o site oferece só o botão de abrir fora).
 */
export function reconhecerVideo(endereco: string): VideoReconhecido | null {
  let url: URL;
  try {
    url = new URL(endereco.trim());
  } catch {
    return null;
  }

  const dominio = url.hostname.replace(/^(www|m|mobile)\./, '');
  if (dominio === 'youtube.com' || dominio === 'youtu.be' || dominio === 'youtube-nocookie.com') {
    return youtube(url);
  }
  if (dominio === 'vimeo.com' || dominio === 'player.vimeo.com') return vimeo(url);
  if (dominio === 'instagram.com') return instagram(url);
  if (dominio === 'tiktok.com') return tiktok(url);
  return null;
}
