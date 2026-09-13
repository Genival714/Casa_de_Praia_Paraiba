import { createElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Botao } from '@/components/Base';
import { Foto } from '@/components/Foto';
import { Icone } from '@/components/Icone';
import { propsDeRevelacao, useRevelacao } from '@/components/Revelar';
import { arquivoPublico } from '@/lib/caminhos';
import { textoDoCredito, type Credito } from '@/lib/creditos';
import { abrirLink } from '@/lib/links';
import { reconhecerVideo } from '@/lib/videos';
import { colors, espaco, fonts, raio } from '@/theme';

export type FotoDaGaleria = {
  arquivo: string;
  legenda: string;
};

/** O que o visor em tela cheia sabe mostrar: uma foto do site ou um vídeo de fora. */
export type ItemDeMidia =
  | { tipo: 'foto'; arquivo: string; legenda: string; credito?: Credito }
  | { tipo: 'video'; url: string; legenda: string };

/**
 * Estado do visor: qual item está aberto e como andar entre eles.
 * Quem tem uma lista de mídia (a galeria da casa, o cartão de cada praia)
 * usa este hook e entrega o resultado ao <VisorDeMidia>.
 */
export function useVisor(total: number) {
  const [indice, setIndice] = useState<number | null>(null);

  const abrir = useCallback((i: number) => setIndice(i), []);
  const fechar = useCallback(() => setIndice(null), []);
  const proxima = useCallback(
    () => setIndice((i) => (i === null ? null : (i + 1) % total)),
    [total],
  );
  const anterior = useCallback(
    () => setIndice((i) => (i === null ? null : (i - 1 + total) % total)),
    [total],
  );

  return { indice, abrir, fechar, proxima, anterior };
}

/**
 * Galeria de fotos com ampliação em tela cheia.
 *
 * Dois arranjos:
 *  - `mosaico`: a primeira foto grande, as outras menores ao lado — para a
 *    home, onde o objetivo é seduzir em cinco fotos.
 *  - `lista`: uma foto por linha, todas do mesmo tamanho — para a página da
 *    casa, onde o objetivo é mostrar tudo.
 *
 * O mosaico quebra sozinho no celular por `flexWrap`: as fotos pequenas
 * viram duas por linha embaixo da grande.
 */
export function Galeria({
  fotos,
  arranjo = 'lista',
}: {
  fotos: readonly FotoDaGaleria[];
  arranjo?: 'mosaico' | 'lista';
}) {
  const { indice, abrir, fechar, proxima, anterior } = useVisor(fotos.length);
  const itens = useMemo<ItemDeMidia[]>(
    () => fotos.map((foto) => ({ tipo: 'foto', ...foto })),
    [fotos],
  );

  return (
    <>
      {arranjo === 'mosaico' ? (
        <Mosaico fotos={fotos} aoTocar={abrir} />
      ) : (
        <View style={estilos.lista}>
          {fotos.map((foto, i) => (
            <Foto
              key={foto.arquivo}
              arquivo={foto.arquivo}
              legenda={foto.legenda}
              altura={240}
              aoTocar={() => abrir(i)}
            />
          ))}
        </View>
      )}

      <VisorDeMidia
        itens={itens}
        indice={indice}
        aoFechar={fechar}
        aoAvancar={proxima}
        aoVoltar={anterior}
      />
    </>
  );
}

/* ------------------------------------------------------------------------- */

function Mosaico({
  fotos,
  aoTocar,
}: {
  fotos: readonly FotoDaGaleria[];
  aoTocar: (i: number) => void;
}) {
  const [principal, ...demais] = fotos;
  const referencia = useRevelacao(true);
  if (!principal) return null;

  return (
    <View ref={referencia} dataSet={propsDeRevelacao('cresce')} style={estilos.mosaico}>
      <Foto
        arquivo={principal.arquivo}
        legenda={principal.legenda}
        altura={380}
        style={estilos.mosaicoPrincipal}
        aoTocar={() => aoTocar(0)}
      />
      <View style={estilos.mosaicoLado}>
        {demais.slice(0, 4).map((foto, i) => (
          <Foto
            key={foto.arquivo}
            arquivo={foto.arquivo}
            legenda={foto.legenda}
            altura={182}
            legendaSobreposta={false}
            style={estilos.mosaicoPequena}
            aoTocar={() => aoTocar(i + 1)}
          />
        ))}
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------------- */

/**
 * Visor em tela cheia: foto ou vídeo, com setas, teclado e contagem.
 *
 * O vídeo roda AQUI DENTRO, no player da própria plataforma (YouTube,
 * Instagram, TikTok, Vimeo), sem mandar o hóspede para fora do site. O
 * player só é criado quando o visor abre — antes disso o site não carrega
 * nada de terceiros.
 */
export function VisorDeMidia({
  itens,
  indice,
  aoFechar,
  aoAvancar,
  aoVoltar,
}: {
  itens: readonly ItemDeMidia[];
  indice: number | null;
  aoFechar: () => void;
  aoAvancar: () => void;
  aoVoltar: () => void;
}) {
  const aberta = indice !== null;
  const item = indice === null ? null : itens[indice];

  // Setas e Esc no teclado, só na web.
  useEffect(() => {
    if (!aberta || Platform.OS !== 'web') return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') aoFechar();
      else if (e.key === 'ArrowRight') aoAvancar();
      else if (e.key === 'ArrowLeft') aoVoltar();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberta, aoFechar, aoAvancar, aoVoltar]);

  if (!item || indice === null) return null;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={aoFechar}>
      <View style={estilos.fundoEscuro}>
        {/* Toque fora da foto fecha. */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={aoFechar}
          accessibilityRole="button"
          accessibilityLabel="Fechar"
        />

        <View style={estilos.palco} pointerEvents="box-none">
          {item.tipo === 'foto' ? <FotoAmpliada item={item} /> : <VideoEmbutido item={item} />}

          <View style={estilos.legendaLinha}>
            <Text style={estilos.legenda}>{item.legenda}</Text>
            <Text style={estilos.contagem}>
              {indice + 1} / {itens.length}
            </Text>
          </View>

          {item.tipo === 'foto' && item.credito ? (
            <Pressable
              onPress={() => abrirLink(item.credito!.url)}
              accessibilityRole="link"
              accessibilityLabel={`${textoDoCredito(item.credito)}. Abre a fonte da foto.`}
              style={({ pressed }) => [estilos.creditoVisor, pressed && { opacity: 0.7 }]}
            >
              <Text style={estilos.creditoVisorTexto}>{textoDoCredito(item.credito)} · Wikimedia Commons</Text>
            </Pressable>
          ) : null}
        </View>

        <BotaoRedondo icone="close" rotulo="Fechar" onPress={aoFechar} style={estilos.fechar} />
        {itens.length > 1 ? (
          <>
            <BotaoRedondo
              icone="chevron-left"
              rotulo="Foto anterior"
              onPress={aoVoltar}
              style={estilos.voltar}
            />
            <BotaoRedondo
              icone="chevron-right"
              rotulo="Próxima foto"
              onPress={aoAvancar}
              style={estilos.avancar}
            />
          </>
        ) : null}
      </View>
    </Modal>
  );
}

function FotoAmpliada({ item }: { item: Extract<ItemDeMidia, { tipo: 'foto' }> }) {
  const endereco = arquivoPublico(`/fotos/${item.arquivo}`);

  if (Platform.OS !== 'web') {
    return <Image source={{ uri: endereco }} style={estilos.imagemNativa} resizeMode="contain" />;
  }

  return createElement('img', {
    src: endereco,
    alt: item.legenda,
    style: {
      maxWidth: '100%',
      maxHeight: '78vh',
      objectFit: 'contain',
      borderRadius: 14,
      boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
    },
  });
}

function VideoEmbutido({ item }: { item: Extract<ItemDeMidia, { tipo: 'video' }> }) {
  const video = reconhecerVideo(item.url);
  const abrirFora = () => abrirLink(item.url);

  // No app nativo (ou link que não dá para embutir): só o botão de abrir fora.
  if (!video || Platform.OS !== 'web') {
    return (
      <View style={estilos.videoReserva}>
        <Icone name="play-circle-outline" size={44} color={colors.branco} />
        <Botao
          rotulo={video ? `Assistir no ${video.rotulo}` : 'Assistir ao vídeo'}
          icone="open-in-new"
          variante="primario"
          onPress={abrirFora}
        />
      </View>
    );
  }

  return (
    <View style={estilos.videoBloco}>
      {createElement('iframe', {
        key: video.player,
        src: video.player,
        title: item.legenda,
        allow: 'autoplay; fullscreen; picture-in-picture; encrypted-media',
        allowFullScreen: true,
        referrerPolicy: 'strict-origin-when-cross-origin',
        style: {
          // Em pé (Shorts, Reels, TikTok) ou deitado, sempre cabendo na altura da tela.
          width: video.vertical ? 'min(100%, calc(72vh * 9 / 16))' : 'min(100%, calc(72vh * 16 / 9))',
          aspectRatio: video.vertical ? '9 / 16' : '16 / 9',
          border: 0,
          borderRadius: 14,
          background: '#000',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          display: 'block',
        },
      })}
      <Pressable onPress={abrirFora} accessibilityRole="link" style={estilos.videoFora}>
        <Icone name="open-in-new" size={13} color="rgba(255,255,255,0.6)" />
        <Text style={estilos.videoForaTexto}>Abrir no {video.rotulo}</Text>
      </Pressable>
    </View>
  );
}

function BotaoRedondo({
  icone,
  rotulo,
  onPress,
  style,
}: {
  icone: 'close' | 'chevron-left' | 'chevron-right';
  rotulo: string;
  onPress: () => void;
  style: object;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
      style={({ pressed }) => [estilos.redondo, style, pressed && { opacity: 0.7 }]}
    >
      <Icone name={icone} size={26} color={colors.branco} />
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: espaco.md,
  },
  mosaico: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
  },
  mosaicoPrincipal: {
    flexBasis: 0,
    flexGrow: 1.6,
    minWidth: 280,
  },
  mosaicoLado: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 280,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
  },
  mosaicoPequena: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 120,
  },

  /* Tela cheia */
  fundoEscuro: {
    flex: 1,
    backgroundColor: 'rgba(4, 30, 38, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaco.lg,
  },
  palco: {
    width: '100%',
    maxWidth: 1100,
    alignItems: 'center',
  },
  imagemNativa: {
    width: '100%',
    height: '78%',
  },
  videoBloco: {
    width: '100%',
    alignItems: 'center',
    gap: espaco.sm,
  },
  videoFora: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
  },
  videoForaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  videoReserva: {
    width: '100%',
    maxWidth: 420,
    aspectRatio: 16 / 9,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.lg,
  },
  legendaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.lg,
    marginTop: espaco.lg,
    paddingHorizontal: espaco.sm,
  },
  legenda: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '500',
    color: colors.branco,
    textAlign: 'center',
  },
  creditoVisor: {
    alignSelf: 'center',
    marginTop: espaco.sm,
    paddingHorizontal: espaco.md,
    paddingVertical: 4,
    borderRadius: raio.pill,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  creditoVisorTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textDecorationLine: 'underline',
  },
  contagem: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.5,
  },
  redondo: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: raio.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fechar: { top: espaco.xl, right: espaco.xl },
  voltar: { left: espaco.lg, top: '50%', marginTop: -24 },
  avancar: { right: espaco.lg, top: '50%', marginTop: -24 },
});
