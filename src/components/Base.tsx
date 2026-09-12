import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import { Icone, type NomeDeIcone } from '@/components/Icone';
import {
  propsDeRevelacao,
  Revelar,
  useRevelacao,
  type TipoDeRevelacao,
} from '@/components/Revelar';
import { colors, espaco, fonts, LARGURA_MAX, raio, sombras, tipo } from '@/theme';

/* -------------------------------------------------------------------------
 * Conteudo — centraliza e limita a largura.
 * O site nasce para celular, mas ninguém merece uma linha de texto de 1400px
 * quando alguem abre no computador.
 * ----------------------------------------------------------------------- */
export function Conteudo({
  children,
  style,
  anim,
  atraso,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Faz o bloco surgir ao entrar na tela. */
  anim?: TipoDeRevelacao;
  atraso?: 1 | 2 | 3;
}) {
  const referencia = useRevelacao(!!anim);

  return (
    <View style={estilos.conteudoExterno}>
      <View
        ref={referencia}
        dataSet={anim ? propsDeRevelacao(anim, atraso) : undefined}
        style={[estilos.conteudoInterno, style]}
      >
        {children}
      </View>
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
  anim = true,
  alinhamento = 'esquerda',
}: {
  sobrancelha?: string;
  titulo: string;
  apoio?: string;
  claro?: boolean;
  /** Surge ao entrar na tela. Ligado por padrão. */
  anim?: boolean;
  alinhamento?: 'esquerda' | 'centro';
}) {
  const referencia = useRevelacao(anim);
  const centro = alinhamento === 'centro';

  return (
    <View
      ref={referencia}
      dataSet={anim ? propsDeRevelacao('surge') : undefined}
      style={[estilos.tituloSecao, centro && estilos.tituloSecaoCentro]}
    >
      {sobrancelha ? (
        <View style={[estilos.sobrancelhaLinha, centro && estilos.sobrancelhaLinhaCentro]}>
          <View style={[estilos.sobrancelhaTraco, claro && { backgroundColor: colors.agua }]} />
          <Text style={[estilos.sobrancelha, claro && { color: colors.agua }]}>{sobrancelha}</Text>
        </View>
      ) : null}
      <Text
        dataSet={{ tipo: 'h2' }}
        style={[estilos.tituloH2, claro && { color: colors.branco }, centro && { textAlign: 'center' }]}
      >
        {titulo}
      </Text>
      {apoio ? (
        <Text
          style={[
            estilos.apoio,
            claro && { color: 'rgba(255,255,255,0.82)' },
            centro && { textAlign: 'center', alignSelf: 'center' },
          ]}
        >
          {apoio}
        </Text>
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
  interativo = false,
  anim,
  atraso,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Cartão que leva a algum lugar: sobe um pouco sob o cursor. */
  interativo?: boolean;
  anim?: TipoDeRevelacao;
  atraso?: 1 | 2 | 3;
}) {
  const cartao = (
    <View dataSet={interativo ? { cartao: 'true' } : undefined} style={[estilos.cartao, style]}>
      {children}
    </View>
  );

  // A revelação termina em `transform: none`, o que apagaria o leve subir do
  // hover. Por isso ela nunca mora no mesmo nó: quando há animação, o cartão
  // ganha um invólucro só para ela.
  return anim ? (
    <Revelar tipo={anim} atraso={atraso}>
      {cartao}
    </Revelar>
  ) : (
    cartao
  );
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
  tom?: 'agua' | 'sol' | 'coqueiro' | 'contorno' | 'coral' | 'verde' | 'vermelho' | 'selo';
  icone?: NomeDeIcone;
}) {
  const tons = {
    agua: { fundo: colors.aguaSuave, texto: colors.mar, borda: 'transparent' },
    sol: { fundo: colors.solFundo, texto: colors.solTexto, borda: 'transparent' },
    coqueiro: { fundo: colors.okFundo, texto: colors.coqueiro, borda: 'transparent' },
    coral: { fundo: colors.avisoFundo, texto: colors.falesia, borda: 'transparent' },
    contorno: { fundo: 'transparent', texto: colors.textoSuave, borda: colors.bordaForte },
    /* Distintivos sólidos dos documentos do hóspede */
    verde: { fundo: colors.verde, texto: colors.branco, borda: 'transparent' },
    vermelho: { fundo: colors.vermelho, texto: colors.branco, borda: 'transparent' },
    selo: { fundo: colors.falesia, texto: colors.branco, borda: 'transparent' },
  } as const;
  const t = tons[tom];
  const solido = tom === 'verde' || tom === 'vermelho' || tom === 'selo';

  return (
    <View
      style={[
        estilos.etiqueta,
        solido && estilos.etiquetaSolida,
        { backgroundColor: t.fundo, borderColor: t.borda },
      ]}
    >
      {icone ? <Icone name={icone} size={12} color={t.texto} /> : null}
      <Text
        style={[estilos.etiquetaTexto, solido && estilos.etiquetaTextoSolido, { color: t.texto }]}
      >
        {texto}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------------------
 * Botao — variantes usadas nas chamadas para ação.
 * ----------------------------------------------------------------------- */
type VarianteBotao = 'primario' | 'secundario' | 'contorno' | 'whatsapp' | 'vidro' | 'falesia';

export function Botao({
  rotulo,
  onPress,
  variante = 'primario',
  icone,
  compacto = false,
  seta = false,
  style,
  acessibilidade,
}: {
  rotulo: string;
  onPress: () => void;
  variante?: VarianteBotao;
  icone?: NomeDeIcone;
  compacto?: boolean;
  /** Seta no fim, que desliza ao passar o mouse. */
  seta?: boolean;
  style?: StyleProp<ViewStyle>;
  acessibilidade?: string;
}) {
  const paletas: Record<VarianteBotao, { fundo: string; texto: string; borda: string }> = {
    primario: { fundo: colors.porDoSol, texto: colors.branco, borda: colors.porDoSol },
    secundario: { fundo: colors.mar, texto: colors.branco, borda: colors.mar },
    contorno: { fundo: colors.branco, texto: colors.mar, borda: colors.bordaForte },
    whatsapp: { fundo: colors.whatsapp, texto: colors.whatsappTexto, borda: colors.whatsapp },
    vidro: { fundo: 'rgba(255,255,255,0.14)', texto: colors.branco, borda: 'rgba(255,255,255,0.40)' },
    falesia: { fundo: colors.falesia, texto: colors.branco, borda: colors.falesia },
  };
  const p = paletas[variante];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={acessibilidade ?? rotulo}
      dataSet={{ botao: 'true' }}
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
      {seta ? (
        <View dataSet={{ seta: 'true' }}>
          <Icone name="arrow-right" size={compacto ? 15 : 18} color={p.texto} />
        </View>
      ) : null}
    </Pressable>
  );
}

/* -------------------------------------------------------------------------
 * CartaoDeAtalho — a linha clicável que leva a outra página.
 * Usado na home e na página da casa.
 * ----------------------------------------------------------------------- */
export function CartaoDeAtalho({
  icone,
  titulo,
  texto,
  onPress,
  tom = 'mar',
  atraso,
}: {
  icone: NomeDeIcone;
  titulo: string;
  texto: string;
  onPress: () => void;
  /** `falesia` marca as páginas de quem já está hospedado. */
  tom?: 'mar' | 'falesia';
  atraso?: 1 | 2 | 3;
}) {
  const cor = tom === 'falesia' ? colors.falesia : colors.mar;
  const fundo = tom === 'falesia' ? colors.avisoFundo : colors.aguaSuave;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${titulo}: ${texto}`}
      style={({ pressed }) => [pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] }]}
    >
      <Cartao interativo anim="surge" atraso={atraso} style={estilos.atalho}>
        <View style={[estilos.atalhoIcone, { backgroundColor: fundo }]}>
          <Icone name={icone} size={20} color={cor} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={estilos.atalhoTitulo}>{titulo}</Text>
          <Text style={estilos.atalhoTexto}>{texto}</Text>
        </View>
        <Icone name="chevron-right" size={22} color={colors.textoClaro} />
      </Cartao>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------
 * Onda — divisor entre uma faixa colorida e o fundo areia, com o mar em
 * movimento: três camadas que atravessam a tela em velocidades e sentidos
 * diferentes, cada uma subindo e descendo devagar, como marulho na beira.
 *
 * Como o movimento não mostra emenda: cada camada é um SVG com o DOBRO da
 * largura e dois períodos idênticos da onda. O CSS (app/+html.tsx) desliza
 * a camada exatamente um período — metade da própria largura — e recomeça.
 * O fim de um ciclo é igual ao começo do outro, então o olho nunca pega.
 *
 * As camadas de trás são mais altas que a da frente, de propósito: o que
 * aparece por cima dela, translúcido, é o que dá a sensação de espuma.
 * ----------------------------------------------------------------------- */
const CAMADAS_DA_ONDA = [
  { nome: 'fundo', cristas: 4, base: 28, amplitude: 9, opacidade: 0.28 },
  { nome: 'meio', cristas: 3, base: 36, amplitude: 14, opacidade: 0.5 },
  { nome: 'frente', cristas: 2, base: 46, amplitude: 20, opacidade: 1 },
] as const;

/** Largura do desenho: dois períodos, para o loop não ter emenda. */
const LARGURA_DA_ONDA = 2880;
const ALTURA_DA_ONDA = 80;

/**
 * Desenha `cristas` ondas por largura de tela (o dobro no SVG inteiro).
 * Os pontos de controle de cada trecho apontam na mesma direção que os do
 * trecho seguinte, então a curva é lisa nas junções — inclusive na emenda
 * entre o fim e o começo.
 */
function caminhoDaOnda(cristas: number, base: number, amplitude: number): string {
  const periodo = LARGURA_DA_ONDA / (cristas * 2);
  const meio = periodo / 2;
  const alto = base - amplitude;
  const baixo = base + amplitude;
  const partes = [`M0,${base}`];

  for (let i = 0; i < cristas * 2; i += 1) {
    const x = i * periodo;
    partes.push(`C${x + meio / 3},${alto} ${x + (meio * 2) / 3},${alto} ${x + meio},${base}`);
    partes.push(
      `C${x + meio + meio / 3},${baixo} ${x + meio + (meio * 2) / 3},${baixo} ${x + periodo},${base}`,
    );
  }

  partes.push(`L${LARGURA_DA_ONDA},${ALTURA_DA_ONDA} L0,${ALTURA_DA_ONDA} Z`);
  return partes.join(' ');
}

const CAMINHOS_DA_ONDA = CAMADAS_DA_ONDA.map((camada) =>
  caminhoDaOnda(camada.cristas, camada.base, camada.amplitude),
);

export function Onda({
  cor = colors.areia,
  invertida = false,
  altura = 44,
  dupla = true,
}: {
  cor?: string;
  invertida?: boolean;
  altura?: number;
  /** Com as camadas translúcidas atrás; `false` deixa só a onda da frente. */
  dupla?: boolean;
}) {
  return (
    <View
      style={[
        { height: altura, width: '100%', overflow: 'hidden' },
        invertida && { transform: [{ rotate: '180deg' }] },
      ]}
    >
      {/*
        O movimento vive nos filhos, não no pai: o pai já pode estar virado
        180°, e a animação apagaria essa rotação. Cada camada tem dois nós —
        o de fora sobe e desce (balanço), o de dentro desliza (viagem) —
        porque um único elemento não pode ter duas animações de transform.
      */}
      {CAMADAS_DA_ONDA.map((camada, indice) => {
        if (!dupla && camada.nome !== 'frente') return null;
        return (
          <View
            key={camada.nome}
            dataSet={{ balanco: String(indice + 1) }}
            style={[estilos.ondaCamada, { opacity: camada.opacidade }]}
          >
            <View dataSet={{ onda: camada.nome }} style={estilos.ondaViagem}>
              <Svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${LARGURA_DA_ONDA} ${ALTURA_DA_ONDA}`}
                preserveAspectRatio="none"
              >
                <Path d={CAMINHOS_DA_ONDA[indice]} fill={cor} />
              </Svg>
            </View>
          </View>
        );
      })}
    </View>
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
  ondaCamada: {
    position: 'absolute',
    top: 0,
    // Passa da base: o balanço sobe a camada uns pixels e não pode descobrir o fundo.
    bottom: -8,
    left: 0,
    right: 0,
  },
  ondaViagem: {
    // O dobro da largura: dois períodos da onda, para o loop não ter emenda.
    width: '200%',
    height: '100%',
  },
  tituloSecao: {
    marginBottom: espaco.lg,
  },
  tituloSecaoCentro: {
    alignItems: 'center',
  },
  sobrancelhaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    marginBottom: espaco.md,
  },
  sobrancelhaLinhaCentro: {
    justifyContent: 'center',
  },
  sobrancelhaTraco: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.falesia,
  },
  sobrancelha: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.mar,
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
    ...tipo.corpo,
    fontWeight: tipo.pesoCorpo,
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
  etiquetaSolida: {
    paddingHorizontal: espaco.md,
    paddingVertical: 6,
  },
  etiquetaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  etiquetaTextoSolido: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
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
    // Suaviza o toque na web. No nativo estas duas são ignoradas.
    transitionProperty: 'opacity, transform',
    transitionDuration: '140ms',
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
  atalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
  },
  atalhoIcone: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atalhoTitulo: {
    fontFamily: fonts.display,
    fontSize: 17,
    fontWeight: '600',
    color: colors.texto,
  },
  atalhoTexto: {
    fontFamily: fonts.corpo,
    ...tipo.detalhe,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoClaro,
    marginTop: 2,
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
