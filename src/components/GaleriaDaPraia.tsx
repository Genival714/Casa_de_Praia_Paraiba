import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Foto } from '@/components/Foto';
import { ItemDeMidia, useVisor, VisorDeMidia } from '@/components/Galeria';
import { Icone } from '@/components/Icone';
import { miniaturaDe, type Praia } from '@/data/praias';
import { reconhecerVideo } from '@/lib/videos';
import { colors, espaco, fonts, raio } from '@/theme';

/**
 * A mídia de uma praia dentro do cartão: capa grande, uma tira de
 * miniaturas rolável (vídeos primeiro, com o play) e o visor em tela cheia.
 *
 * A capa sangra até a borda do cartão — por isso as margens negativas, que
 * desfazem o padding do <Cartao>. Quem vê a lista de praias entende num
 * relance o que cada uma tem: "9 fotos · 1 vídeo", tudo à mão sem sair da
 * página.
 *
 * A tira usa as miniaturas de 480 px (public/fotos/praias/miniaturas/); só
 * a capa e o visor pegam a foto grande.
 */
export function GaleriaDaPraia({ praia }: { praia: Praia }) {
  const fotos = praia.fotos ?? [];
  const videos = praia.videos ?? [];

  const itens = useMemo<ItemDeMidia[]>(
    () => [
      ...fotos.map((arquivo, i) => ({
        tipo: 'foto' as const,
        arquivo,
        legenda: fotos.length > 1 ? `${praia.nome} · foto ${i + 1}` : praia.nome,
      })),
      ...videos.map((video) => ({
        tipo: 'video' as const,
        url: video.url,
        legenda: video.titulo ?? praia.nome,
      })),
    ],
    [fotos, videos, praia.nome],
  );

  const visor = useVisor(itens.length);

  if (itens.length === 0) return null;

  const [capa, ...demaisFotos] = fotos;
  const temTira = demaisFotos.length > 0 || videos.length > 0;

  return (
    <View style={estilos.bloco}>
      {capa ? (
        <Foto
          arquivo={capa}
          legenda={praia.nome}
          altura={224}
          legendaSobreposta={false}
          raioDaBorda={0}
          aoTocar={() => visor.abrir(0)}
        />
      ) : null}

      {/* A contagem, em cima da capa. `pointerEvents: none` deixa o toque chegar na foto. */}
      {capa ? (
        <View style={estilos.contagem} pointerEvents="none">
          {fotos.length > 1 ? (
            <Pilula icone="image-multiple-outline" texto={`${fotos.length} fotos`} />
          ) : null}
          {videos.length > 0 ? (
            <Pilula
              icone="play"
              texto={videos.length === 1 ? '1 vídeo' : `${videos.length} vídeos`}
              destaque
            />
          ) : null}
        </View>
      ) : null}

      {temTira ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={estilos.tira}
          contentContainerStyle={estilos.tiraConteudo}
        >
          {videos.map((video, i) => (
            <TileDeVideo
              key={video.url}
              url={video.url}
              fundo={capa ? miniaturaDe(capa) : undefined}
              rotulo={video.titulo ?? `Vídeo de ${praia.nome}`}
              onPress={() => visor.abrir(fotos.length + i)}
            />
          ))}
          {demaisFotos.map((arquivo, i) => (
            <View key={arquivo} style={estilos.tile}>
              <Foto
                arquivo={miniaturaDe(arquivo)}
                legenda={`${praia.nome} · foto ${i + 2}`}
                altura={TILE}
                legendaSobreposta={false}
                raioDaBorda={raio.sm}
                aoTocar={() => visor.abrir(i + 1)}
              />
            </View>
          ))}
        </ScrollView>
      ) : null}

      <VisorDeMidia
        itens={itens}
        indice={visor.indice}
        aoFechar={visor.fechar}
        aoAvancar={visor.proxima}
        aoVoltar={visor.anterior}
      />
    </View>
  );
}

/* ------------------------------------------------------------------------- */

const TILE = 76;

/**
 * Miniatura de vídeo na tira. O YouTube dá a imagem do vídeo de graça; as
 * outras plataformas não, então entra a capa da praia escurecida com o play.
 */
function TileDeVideo({
  url,
  fundo,
  rotulo,
  onPress,
}: {
  url: string;
  fundo?: string;
  rotulo: string;
  onPress: () => void;
}) {
  const video = reconhecerVideo(url);
  const imagem = video?.miniatura ?? fundo;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Assistir: ${rotulo}`}
      style={({ pressed }) => [estilos.tileVideo, pressed && { opacity: 0.85 }]}
    >
      {imagem ? (
        <Foto arquivo={imagem} legenda={rotulo} altura={TILE} legendaSobreposta={false} raioDaBorda={0} />
      ) : (
        <View style={[estilos.tileVideoVazio, { height: TILE }]} />
      )}
      <View style={estilos.tileVideoSombra} pointerEvents="none">
        <View style={estilos.play}>
          <Icone name="play" size={18} color={colors.marProfundo} style={{ marginLeft: 2 }} />
        </View>
        <Text style={estilos.tileVideoRotulo} numberOfLines={1}>
          {video?.rotulo ?? 'Vídeo'}
        </Text>
      </View>
    </Pressable>
  );
}

function Pilula({
  icone,
  texto,
  destaque = false,
}: {
  icone: 'image-multiple-outline' | 'play';
  texto: string;
  destaque?: boolean;
}) {
  return (
    <View style={[estilos.pilula, destaque && estilos.pilulaDestaque]}>
      <Icone name={icone} size={13} color={colors.branco} />
      <Text style={estilos.pilulaTexto}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  bloco: {
    // Desfaz o padding do cartão: a capa vai de borda a borda.
    marginTop: -espaco.lg,
    marginHorizontal: -espaco.lg,
    gap: espaco.sm,
  },
  contagem: {
    position: 'absolute',
    left: espaco.md,
    top: 224 - espaco.md - 26,
    flexDirection: 'row',
    gap: 6,
  },
  pilula: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: raio.pill,
    backgroundColor: 'rgba(4, 30, 38, 0.62)',
  },
  pilulaDestaque: {
    backgroundColor: colors.falesia,
  },
  pilulaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    color: colors.branco,
  },
  tira: {
    marginHorizontal: 0,
  },
  tiraConteudo: {
    paddingHorizontal: espaco.lg,
    gap: espaco.sm,
  },
  tile: {
    width: TILE,
  },
  tileVideo: {
    width: 118,
    borderRadius: raio.sm,
    overflow: 'hidden',
    backgroundColor: colors.marProfundo,
  },
  tileVideoVazio: {
    backgroundColor: colors.mar,
  },
  tileVideoSombra: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(4, 30, 38, 0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  play: {
    width: 32,
    height: 32,
    borderRadius: raio.pill,
    backgroundColor: colors.branco,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileVideoRotulo: {
    fontFamily: fonts.corpo,
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.branco,
    letterSpacing: 0.3,
  },
});
