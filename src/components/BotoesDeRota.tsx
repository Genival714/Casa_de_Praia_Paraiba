import { StyleSheet, View } from 'react-native';

import { Botao } from '@/components/Base';
import { abrirLink, urlGoogleMaps, urlRotaGoogleMaps, urlWaze, type Destino } from '@/lib/links';
import { espaco } from '@/theme';

/**
 * Dupla de botoes de navegacao.
 *
 * `modo="rota"` abre a navegação passo a passo saindo de onde a pessoa está;
 * `modo="ver"` só mostra o lugar no mapa. Rota é o padrão porque, na prática,
 * quem escaneia o QR Code já está na casa e quer sair dirigindo.
 */
export function BotoesDeRota({
  destino,
  modo = 'rota',
  compacto = true,
  nome,
}: {
  destino: Destino;
  modo?: 'rota' | 'ver';
  compacto?: boolean;
  nome?: string;
}) {
  const referencia = nome ?? destino.buscaMapa;

  return (
    <View style={estilos.linha}>
      <Botao
        rotulo={modo === 'rota' ? 'Traçar rota' : 'Ver no mapa'}
        icone="google-maps"
        variante="contorno"
        compacto={compacto}
        style={estilos.item}
        acessibilidade={
          modo === 'rota'
            ? `Traçar rota até ${referencia} no Google Maps`
            : `Ver ${referencia} no Google Maps`
        }
        onPress={() =>
          abrirLink(modo === 'rota' ? urlRotaGoogleMaps(destino) : urlGoogleMaps(destino))
        }
      />
      <Botao
        rotulo="Waze"
        icone="waze"
        variante="secundario"
        compacto={compacto}
        style={estilos.item}
        acessibilidade={`Navegar até ${referencia} no Waze`}
        onPress={() => abrirLink(urlWaze(destino))}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    gap: espaco.sm,
  },
  item: {
    flex: 1,
  },
});
