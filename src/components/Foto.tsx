import { createElement, useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Icone } from '@/components/Icone';
import { arquivoPublico } from '@/lib/caminhos';
import { abrirLink } from '@/lib/links';
import { textoDoCredito, type Credito } from '@/lib/creditos';
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
  aoTocar,
  legendaSobreposta = true,
  raioDaBorda = raio.md,
  credito,
  posicao = '50% 62%',
}: {
  arquivo: string;
  legenda?: string;
  altura?: number;
  /** Foto de terceiros: mostra "Foto: autor · licença" no canto, com link para a fonte. */
  credito?: Credito;
  /**
   * Que parte da foto fica visível quando o corte aperta (object-position).
   * O padrão favorece a parte de baixo, porque as fotos da casa têm céu em cima.
   */
  posicao?: string;
  /** Cantos: miniaturas pequenas pedem raio menor. */
  raioDaBorda?: number;
  style?: StyleProp<ViewStyle>;
  /** Quando existe, a foto vira um botão (abre a galeria em tela cheia). */
  aoTocar?: () => void;
  /** Mostra a faixa de legenda por cima da foto. */
  legendaSobreposta?: boolean;
}) {
  const [falhou, setFalhou] = useState(false);
  const imagem = useRef<HTMLImageElement | null>(null);
  // Um endereço completo (a miniatura de um vídeo do YouTube) passa direto.
  const endereco = /^https?:\/\//.test(arquivo) ? arquivo : arquivoPublico(`/fotos/${arquivo}`);
  const descricao = legenda ?? 'Foto da casa de praia';

  /*
    A <img> já vem escrita no HTML que o servidor entrega, então ela pode
    falhar ANTES de o React assumir a página — e aí o `onError` de baixo nunca
    chega a existir, deixando o ícone de imagem quebrada para sempre.
    Esta conferência pega esse caso: se a imagem já terminou de carregar e
    veio sem largura nenhuma, é porque o arquivo não existe.
  */
  useEffect(() => {
    const no = imagem.current;
    if (no?.complete && no.naturalWidth === 0) setFalhou(true);
  }, []);

  const conteudo = (
    <View
      dataSet={aoTocar ? { zoom: 'true' } : undefined}
      style={[estilos.moldura, { height: altura, borderRadius: raioDaBorda }, !aoTocar && style]}
    >
      {falhou ? (
        <View style={estilos.reserva}>
          <Icone name="image-outline" size={26} color={colors.marClaro} />
          <Text style={estilos.reservaTexto}>Foto em breve</Text>
        </View>
      ) : Platform.OS === 'web' ? (
        createElement('img', {
          ref: imagem,
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
            objectPosition: posicao,
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

      {legenda && legendaSobreposta ? (
        <View style={estilos.faixaLegenda}>
          <Text style={estilos.legenda} numberOfLines={1}>
            {legenda}
          </Text>
        </View>
      ) : null}

      {credito && !falhou ? <EtiquetaDeCredito credito={credito} /> : null}
    </View>
  );

  if (!aoTocar) return conteudo;

  return (
    <Pressable
      onPress={aoTocar}
      accessibilityRole="button"
      accessibilityLabel={`Ampliar: ${descricao}`}
      style={({ pressed }) => [style, pressed && { opacity: 0.92 }]}
    >
      {conteudo}
    </Pressable>
  );
}

/**
 * O crédito no canto da foto. É um botão de verdade: abre a página da foto na
 * fonte, onde estão o autor e a licença por extenso — as licenças Creative
 * Commons pedem isso. Fica por cima de tudo, então recebe o toque antes da
 * foto (que abre a galeria).
 */
function EtiquetaDeCredito({ credito }: { credito: Credito }) {
  return (
    <Pressable
      onPress={() => abrirLink(credito.url)}
      accessibilityRole="link"
      accessibilityLabel={`${textoDoCredito(credito)}. Abre a fonte da foto.`}
      style={({ pressed }) => [estilos.credito, pressed && { opacity: 0.7 }]}
    >
      <Text style={estilos.creditoTexto} numberOfLines={1}>
        {textoDoCredito(credito)}
      </Text>
    </Pressable>
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
    backgroundColor: 'rgba(4, 48, 58, 0.55)',
    paddingHorizontal: espaco.md,
    paddingVertical: 9,
  },
  legenda: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.branco,
  },
  credito: {
    position: 'absolute',
    top: espaco.sm,
    right: espaco.sm,
    maxWidth: '80%',
    backgroundColor: 'rgba(4, 48, 58, 0.55)',
    borderRadius: raio.pill,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  creditoTexto: {
    fontFamily: fonts.corpo,
    fontSize: 10.5,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
  },
});
