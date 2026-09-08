import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import { Icone, type NomeDeIcone } from '@/components/Icone';
import { colors, espaco, fonts, LARGURA_MAX, raio, sombras } from '@/theme';

/* -------------------------------------------------------------------------
 * Conteudo — centraliza e limita a largura.
 * O site nasce para celular, mas ninguém merece uma linha de texto de 1400px
 * quando alguem abre no computador.
 * ----------------------------------------------------------------------- */
export function Conteudo({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={estilos.conteudoExterno}>
      <View style={[estilos.conteudoInterno, style]}>{children}</View>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * TituloSecao — sobrancelha + título serifado + apoio.
 * ----------------------------------------------------------------------- */
export function TituloSecao({
  sobrancelha,
  titulo,
  apoio,
  claro = false,
}: {
  sobrancelha?: string;
  titulo: string;
  apoio?: string;
  claro?: boolean;
}) {
  return (
    <View style={estilos.tituloSecao}>
      {sobrancelha ? (
        <Text style={[estilos.sobrancelha, claro && { color: colors.agua }]}>{sobrancelha}</Text>
      ) : null}
      <Text style={[estilos.tituloH2, claro && { color: colors.branco }]}>{titulo}</Text>
      {apoio ? (
        <Text style={[estilos.apoio, claro && { color: 'rgba(255,255,255,0.82)' }]}>{apoio}</Text>
      ) : null}
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Cartao — a caixa branca com sombra suave usada em todo o site.
 * ----------------------------------------------------------------------- */
export function Cartao({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[estilos.cartao, style]}>{children}</View>;
}

/* -------------------------------------------------------------------------
 * Etiqueta — pílula pequena para destaques e categorias.
 * ----------------------------------------------------------------------- */
export function Etiqueta({
  texto,
  tom = 'agua',
  icone,
}: {
  texto: string;
  tom?: 'agua' | 'sol' | 'coqueiro' | 'contorno' | 'coral';
  icone?: NomeDeIcone;
}) {
  const tons = {
    agua: { fundo: colors.aguaSuave, texto: colors.mar, borda: 'transparent' },
    sol: { fundo: '#FDF0DA', texto: '#9A6410', borda: 'transparent' },
    coqueiro: { fundo: '#E2F1EA', texto: colors.coqueiro, borda: 'transparent' },
    coral: { fundo: '#FDE8E1', texto: colors.falesia, borda: 'transparent' },
    contorno: { fundo: 'transparent', texto: colors.textoSuave, borda: colors.bordaForte },
  } as const;
  const t = tons[tom];

  return (
    <View style={[estilos.etiqueta, { backgroundColor: t.fundo, borderColor: t.borda }]}>
      {icone ? <Icone name={icone} size={12} color={t.texto} /> : null}
      <Text style={[estilos.etiquetaTexto, { color: t.texto }]}>{texto}</Text>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Botao — variantes usadas nas chamadas para ação.
 * ----------------------------------------------------------------------- */
type VarianteBotao = 'primario' | 'secundario' | 'contorno' | 'whatsapp' | 'vidro';

export function Botao({
  rotulo,
  onPress,
  variante = 'primario',
  icone,
  compacto = false,
  style,
  acessibilidade,
}: {
  rotulo: string;
  onPress: () => void;
  variante?: VarianteBotao;
  icone?: NomeDeIcone;
  compacto?: boolean;
  style?: StyleProp<ViewStyle>;
  acessibilidade?: string;
}) {
  const paletas: Record<VarianteBotao, { fundo: string; texto: string; borda: string }> = {
    primario: { fundo: colors.porDoSol, texto: colors.branco, borda: colors.porDoSol },
    secundario: { fundo: colors.mar, texto: colors.branco, borda: colors.mar },
    contorno: { fundo: colors.branco, texto: colors.mar, borda: colors.bordaForte },
    whatsapp: { fundo: colors.whatsapp, texto: '#06331C', borda: colors.whatsapp },
    vidro: { fundo: 'rgba(255,255,255,0.16)', texto: colors.branco, borda: 'rgba(255,255,255,0.45)' },
  };
  const p = paletas[variante];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={acessibilidade ?? rotulo}
      style={({ pressed }) => [
        estilos.botao,
        compacto && estilos.botaoCompacto,
        { backgroundColor: p.fundo, borderColor: p.borda },
        pressed && estilos.pressionado,
        style,
      ]}
    >
      {icone ? (
        <Icone name={icone} size={compacto ? 15 : 18} color={p.texto} />
      ) : null}
      <Text
        style={[estilos.botaoTexto, compacto && estilos.botaoTextoCompacto, { color: p.texto }]}
        numberOfLines={1}
      >
        {rotulo}
      </Text>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------
 * Onda — divisor em SVG entre uma faixa colorida e o fundo areia.
 * ----------------------------------------------------------------------- */
export function Onda({
  cor = colors.areia,
  invertida = false,
  altura = 44,
}: {
  cor?: string;
  invertida?: boolean;
  altura?: number;
}) {
  // Desenhada com transform em vez de dois paths para manter um só caminho.
  return (
    <View
      style={[
        { height: altura, width: '100%', overflow: 'hidden' },
        invertida && { transform: [{ rotate: '180deg' }] },
      ]}
    >
      <View style={{ flex: 1 }}>
        <SvgOnda cor={cor} />
      </View>
    </View>
  );
}

function SvgOnda({ cor }: { cor: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 1440 80" preserveAspectRatio="none">
      <Path
        d="M0,40 C180,80 320,0 540,26 C760,52 900,90 1120,58 C1280,34 1360,12 1440,20 L1440,80 L0,80 Z"
        fill={cor}
      />
    </Svg>
  );
}

/* -------------------------------------------------------------------------
 * Medalha — o número do ranking, em gradiente de sol.
 * ----------------------------------------------------------------------- */
export function Medalha({ posicao, destaque = false }: { posicao: number; destaque?: boolean }) {
  return (
    <LinearGradient
      colors={destaque ? [colors.sol, colors.porDoSol] : [colors.marClaro, colors.mar]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={estilos.medalha}
    >
      <Text style={estilos.medalhaTexto}>{posicao}</Text>
    </LinearGradient>
  );
}

/* -------------------------------------------------------------------------
 * TempoDeCarro — "a 12 min da casa", com o caso especial de distância zero.
 * ----------------------------------------------------------------------- */
export function TempoDeCarro({ minutos, style }: { minutos: number; style?: StyleProp<TextStyle> }) {
  if (minutos <= 0) {
    return (
      <View style={estilos.tempo}>
        <Icone name="home-heart" size={13} color={colors.coqueiro} />
        <Text style={[estilos.tempoTexto, { color: colors.coqueiro }, style]}>É a praia da casa</Text>
      </View>
    );
  }

  const rotulo =
    minutos >= 60
      ? `${Math.floor(minutos / 60)}h${minutos % 60 ? String(minutos % 60).padStart(2, '0') : ''} de carro`
      : `${minutos} min de carro`;

  return (
    <View style={estilos.tempo}>
      <Icone name="car-outline" size={13} color={colors.textoClaro} />
      <Text style={[estilos.tempoTexto, style]}>{rotulo}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  conteudoExterno: {
    width: '100%',
    alignItems: 'center',
  },
  conteudoInterno: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    paddingHorizontal: espaco.xl,
  },
  tituloSecao: {
    marginBottom: espaco.lg,
  },
  sobrancelha: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.mar,
    marginBottom: espaco.sm,
  },
  tituloH2: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '600',
    color: colors.texto,
    letterSpacing: -0.4,
  },
  apoio: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    lineHeight: 23,
    color: colors.textoSuave,
    marginTop: espaco.sm,
  },
  cartao: {
    backgroundColor: colors.papel,
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: colors.borda,
    padding: espaco.lg,
    ...sombras.card,
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: raio.pill,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  etiquetaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.sm,
    borderRadius: raio.pill,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: espaco.xl,
  },
  botaoCompacto: {
    paddingVertical: 9,
    paddingHorizontal: espaco.md,
    gap: 6,
  },
  botaoTexto: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  botaoTextoCompacto: {
    fontSize: 13,
  },
  pressionado: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  medalha: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalhaTexto: {
    fontFamily: fonts.display,
    fontSize: 16,
    fontWeight: '700',
    color: colors.branco,
  },
  tempo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tempoTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textoClaro,
  },
});
