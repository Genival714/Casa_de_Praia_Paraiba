import { createElement, useState } from 'react';
import { Image, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Icone } from '@/components/Icone';
import { arquivoPublico } from '@/lib/caminhos';
import { colors, espaco, fonts, raio } from '@/theme';

/**
 * Foto do site.
 *
 * Os arquivos ficam em `public/fotos/` e são servidos na raiz do site.
 * Se a imagem ainda não existir, entra um cartão "Foto em breve" no lugar —
 * assim o site nunca aparece quebrado enquanto as fotos não sobem.
 *
 * Na web usamos a tag `<img>` de verdade, e não o componente de imagem do
 * React Native: o site é gerado como HTML estático, e só o `<img>` aparece
 * já no HTML que o servidor entrega. Com o componente do React Native a
 * imagem só nasceria depois, dentro do navegador — o que faz a página piscar
 * e esconde o conteúdo de quem indexa o site.
 */
export function Foto({
  arquivo,
  legenda,
  altura = 220,
  style,
}: {
  arquivo: string;
  legenda?: string;
  altura?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const [falhou, setFalhou] = useState(false);
  const endereco = arquivoPublico(`/fotos/${arquivo}`);
  const descricao = legenda ?? 'Foto da casa de praia';

  return (
    <View style={[estilos.moldura, { height: altura }, style]}>
      {falhou ? (
        <View style={estilos.reserva}>
          <Icone name="image-outline" size={26} color={colors.marClaro} />
          <Text style={estilos.reservaTexto}>Foto em breve</Text>
        </View>
      ) : Platform.OS === 'web' ? (
        createElement('img', {
          src: endereco,
          alt: descricao,
          loading: 'lazy',
          decoding: 'async',
          onError: () => setFalhou(true),
          style: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          },
        })
      ) : (
        <Image
          source={{ uri: endereco }}
          style={estilos.imagem}
          resizeMode="cover"
          accessibilityLabel={descricao}
          onError={() => setFalhou(true)}
        />
      )}

      {legenda ? (
        <View style={estilos.faixaLegenda}>
          <Text style={estilos.legenda} numberOfLines={1}>
            {legenda}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  moldura: {
    width: '100%',
    borderRadius: raio.md,
    overflow: 'hidden',
    backgroundColor: colors.aguaSuave,
    justifyContent: 'flex-end',
  },
  imagem: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  reserva: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.aguaSuave,
  },
  reservaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '600',
    color: colors.mar,
    opacity: 0.75,
  },
  faixaLegenda: {
    backgroundColor: 'rgba(6, 58, 79, 0.62)',
    paddingHorizontal: espaco.md,
    paddingVertical: 8,
  },
  legenda: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.branco,
  },
});
