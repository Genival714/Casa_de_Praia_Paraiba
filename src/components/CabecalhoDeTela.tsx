import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Conteudo, Onda } from '@/components/Base';
import { Sol } from '@/components/Sol';
import { colors, espaco, fonts, raio, tipo } from '@/theme';

/**
 * Faixa de topo das telas internas: selo, título e onda.
 *
 * O gradiente é vertical de propósito — assim a borda de cima é exatamente
 * `marProfundo`, a mesma cor do <Cabecalho>, e as duas faixas se fundem num
 * bloco escuro só, sem costura visível.
 *
 * Não tem `insets.top`: o respiro do topo já é do <Cabecalho>.
 */
export function CabecalhoDeTela({
  selo,
  sobrancelha,
  titulo,
  apoio,
}: {
  /** Pílula sólida, como nos documentos impressos. */
  selo?: string;
  /** Texto em versalete. Usado quando não há `selo`. */
  sobrancelha?: string;
  titulo: string;
  apoio?: string;
}) {
  return (
    <LinearGradient
      colors={[colors.marProfundo, colors.mar]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={estilos.faixa}
      dataSet={{ grao: 'true' }}
    >
      <Sol tamanho={136} style={{ top: 18, right: -36 }} />

      <Conteudo>
        {selo ? (
          <View style={estilos.selo}>
            <Text style={estilos.seloTexto}>{selo}</Text>
          </View>
        ) : sobrancelha ? (
          <Text style={estilos.sobrancelha}>{sobrancelha}</Text>
        ) : null}

        <Text dataSet={{ tipo: 'titulo-tela' }} style={estilos.titulo}>{titulo}</Text>
        {apoio ? <Text style={estilos.apoio}>{apoio}</Text> : null}
      </Conteudo>

      <Onda cor={colors.areia} altura={40} />
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    overflow: 'hidden',
    paddingTop: espaco.xxl,
  },
  selo: {
    alignSelf: 'flex-start',
    backgroundColor: colors.falesia,
    borderRadius: raio.pill,
    paddingHorizontal: espaco.md,
    paddingVertical: 6,
    marginBottom: espaco.md,
  },
  seloTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.branco,
  },
  sobrancelha: {
    fontFamily: fonts.corpo,
    fontSize: 11.5,
    fontWeight: '700',
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    color: colors.agua,
    marginBottom: espaco.sm,
  },
  titulo: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '600',
    color: colors.branco,
    letterSpacing: -0.7,
  },
  apoio: {
    fontFamily: fonts.corpo,
    ...tipo.corpo,
    fontWeight: tipo.pesoCorpo,
    color: 'rgba(255,255,255,0.86)',
    marginTop: espaco.md,
    marginBottom: espaco.xl,
    maxWidth: 460,
  },
});
