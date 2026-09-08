import { Linking, Platform } from 'react-native';

export type Coordenadas = { lat: number; lng: number };

export type Destino = {
  /** Nome + cidade. Usado como busca quando não há coordenada exata. */
  buscaMapa: string;
  /** Coordenada exata, quando conferida. Tem prioridade sobre a busca. */
  coords?: Coordenadas;
};

/**
 * Por que buscar pelo nome em vez de sempre usar coordenada:
 * o Google e o Waze resolvem o ponto oficial do lugar (com avaliacoes, horario
 * e acesso correto), enquanto uma coordenada aproximada pode largar o visitante
 * na beira da estrada. Coordenada só entra quando estiver conferida no mapa.
 */

/** Abre o cartao do lugar no Google Maps (ver onde fica). */
export function urlGoogleMaps(destino: Destino): string {
  const query = destino.coords
    ? `${destino.coords.lat},${destino.coords.lng}`
    : destino.buscaMapa;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Abre a navegação passo a passo no Google Maps, saindo da localização atual. */
export function urlRotaGoogleMaps(destino: Destino): string {
  const query = destino.coords
    ? `${destino.coords.lat},${destino.coords.lng}`
    : destino.buscaMapa;
  return `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${encodeURIComponent(query)}`;
}

/** Abre a navegação no Waze (app ou versão web). */
export function urlWaze(destino: Destino): string {
  if (destino.coords) {
    return `https://waze.com/ul?ll=${destino.coords.lat},${destino.coords.lng}&navigate=yes`;
  }
  return `https://waze.com/ul?q=${encodeURIComponent(destino.buscaMapa)}&navigate=yes`;
}

/** Remove tudo que não for dígito e devolve o telefone no padrão internacional. */
export function normalizarTelefone(telefone: string, ddi = '55'): string {
  const digitos = telefone.replace(/\D/g, '');
  return digitos.startsWith(ddi) ? digitos : `${ddi}${digitos}`;
}

export function urlWhatsApp(telefone: string, mensagem?: string): string {
  const numero = normalizarTelefone(telefone);
  const texto = mensagem ? `?text=${encodeURIComponent(mensagem)}` : '';
  return `https://wa.me/${numero}${texto}`;
}

export function urlTelefone(telefone: string): string {
  return `tel:+${normalizarTelefone(telefone)}`;
}

/** Abre um link externo. Na web cai em nova aba; no app, no navegador do sistema. */
export async function abrirLink(url: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    await Linking.openURL(url);
  } catch {
    // Link inválido ou sem app capaz de abrir: falhar em silêncio e não quebrar a tela.
  }
}
