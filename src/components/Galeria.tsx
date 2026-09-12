import { createElement, useCallback, useEffect, useState } from 'react';
import { Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Foto } from '@/components/Foto';
import { Icone } from '@/components/Icone';
import { propsDeRevelacao, useRevelacao } from '@/components/Revelar';
import { arquivoPublico } from '@/lib/caminhos';
import { colors, espaco, fonts, raio } from '@/theme';

export type FotoDaGaleria = {
  arquivo: string;
  legenda: string;
};

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
  const [aberta, setAberta] = useState<number | null>(null);

  const abrir = useCallback((i: number) => setAberta(i), []);
  const fechar = useCallback(() => setAberta(null), []);
  const proxima = useCallback(
    () => setAberta((i) => (i === null ? null : (i + 1) % fotos.length)),
    [fotos.length],
  );
  const anterior = useCallback(
    () => setAberta((i) => (i === null ? null : (i - 1 + fotos.length) % fotos.length)),
    [fotos.length],
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

      <TelaCheia
        fotos={fotos}
        indice={aberta}
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

function TelaCheia({
  fotos,
  indice,
  aoFechar,
  aoAvancar,
  aoVoltar,
}: {
  fotos: readonly FotoDaGaleria[];
  indice: number | null;
  aoFechar: () => void;
  aoAvancar: () => void;
  aoVoltar: () => void;
}) {
  const aberta = indice !== null;
  const foto = indice === null ? null : fotos[indice];

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

  if (!foto || indice === null) return null;
  const endereco = arquivoPublico(`/fotos/${foto.arquivo}`);

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
          {Platform.OS === 'web' ? (
            createElement('img', {
              src: endereco,
              alt: foto.legenda,
              style: {
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                borderRadius: 14,
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              },
            })
          ) : (
            <Image source={{ uri: endereco }} style={estilos.imagemNativa} resizeMode="contain" />
          )}

          <View style={estilos.legendaLinha}>
            <Text style={estilos.legenda}>{foto.legenda}</Text>
            <Text style={estilos.contagem}>
              {indice + 1} / {fotos.length}
            </Text>
          </View>
        </View>

        <BotaoRedondo icone="close" rotulo="Fechar" onPress={aoFechar} style={estilos.fechar} />
        {fotos.length > 1 ? (
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
