import { createElement, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Icone } from '@/components/Icone';
import { videos, type Video } from '@/data/casa';
import { arquivoPublico } from '@/lib/caminhos';
import { colors, espaco, fonts, LARGURA_MAX, raio } from '@/theme';

/**
 * Seção de vídeos da casa.
 *
 * Um player só, e uma faixa de miniaturas que troca o vídeo dele. Assim a
 * página carrega apenas o vídeo que a pessoa escolheu ver.
 *
 * `preload="none"` é o detalhe que faz a diferença: sem isso, o navegador
 * começaria a baixar os trinta megabytes de vídeo assim que a tela abrisse,
 * e quem está no 4G da praia esperaria à toa. Com ele, o visitante vê a foto
 * de capa e só baixa o vídeo se tocar em tocar.
 *
 * No aplicativo nativo a seção não aparece — lá o vídeo precisaria do
 * `expo-video`, que fica para quando o aplicativo existir.
 */
export function Videos() {
  const [escolhido, setEscolhido] = useState<Video>(videos[0]);

  if (Platform.OS !== 'web' || videos.length === 0) return null;

  return (
    <View style={estilos.secao}>
      <View style={[estilos.palco, escolhido.emPe && estilos.palcoEmPe]}>
        {createElement('video', {
          // Sem a chave, o navegador continuaria mostrando o vídeo anterior
          // ao trocar de clipe.
          key: escolhido.arquivo,
          src: arquivoPublico(`/videos/${escolhido.arquivo}`),
          poster: arquivoPublico(`/fotos/${escolhido.capa}`),
          controls: true,
          preload: 'none',
          playsInline: true,
          title: escolhido.titulo,
          style: {
            width: '100%',
            height: '100%',
            // Os vídeos deitados preenchem a moldura; o gravado em pé fica
            // inteiro, com tarja nas laterais, para não cortar a imagem.
            objectFit: escolhido.emPe ? 'contain' : 'cover',
            display: 'block',
          },
        })}
      </View>

      <Text style={estilos.tituloAtual}>
        {escolhido.titulo} · {escolhido.duracao}
      </Text>

      {videos.length > 1 ? (
        <View style={estilos.faixaExterna}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilos.faixa}
          >
            {videos.map((video) => {
              const ativo = video.arquivo === escolhido.arquivo;
              return (
                <Pressable
                  key={video.arquivo}
                  onPress={() => setEscolhido(video)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: ativo }}
                  accessibilityLabel={`Ver o vídeo ${video.titulo}, ${video.duracao}`}
                  style={({ pressed }) => [
                    estilos.clipe,
                    ativo && estilos.clipeAtivo,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Icone
                    name={ativo ? 'play-circle' : 'play-circle-outline'}
                    size={17}
                    color={ativo ? colors.branco : colors.mar}
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[estilos.clipeTitulo, ativo && estilos.clipeTextoAtivo]}
                      numberOfLines={1}
                    >
                      {video.titulo}
                    </Text>
                    <Text
                      style={[estilos.clipeDuracao, ativo && estilos.clipeTextoAtivo]}
                      numberOfLines={1}
                    >
                      {video.duracao}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  secao: {
    gap: espaco.md,
  },
  palco: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: raio.md,
    overflow: 'hidden',
    backgroundColor: colors.marProfundo,
  },
  palcoEmPe: {
    aspectRatio: 3 / 4,
  },
  tituloAtual: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textoClaro,
  },
  faixaExterna: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    alignSelf: 'center',
  },
  faixa: {
    gap: espaco.sm,
    paddingVertical: 2,
  },
  clipe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    width: 186,
    backgroundColor: colors.papel,
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: raio.md,
    paddingHorizontal: espaco.md,
    paddingVertical: 10,
  },
  clipeAtivo: {
    backgroundColor: colors.mar,
    borderColor: colors.mar,
  },
  clipeTitulo: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '700',
    color: colors.texto,
  },
  clipeDuracao: {
    fontFamily: fonts.corpo,
    fontSize: 11.5,
    color: colors.textoClaro,
    marginTop: 1,
  },
  clipeTextoAtivo: {
    color: colors.branco,
  },
});
