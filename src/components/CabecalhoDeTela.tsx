import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Conteudo, Onda } from '@/components/Base';
import { colors, espaco, fonts } from '@/theme';

/** Faixa de topo das telas internas: gradiente do mar, título e onda. */
export function CabecalhoDeTela({
  sobrancelha,
  titulo,
  apoio,
}: {
  sobrancelha: string;
  titulo: string;
  apoio?: string;
}) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.marProfundo, colors.mar]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[estilos.faixa, { paddingTop: insets.top + 32 }]}
    >
      <View style={estilos.sol} />

      <Conteudo>
        <Text style={estilos.sobrancelha}>{sobrancelha}</Text>
        <Text style={estilos.titulo}>{titulo}</Text>
        {apoio ? <Text style={estilos.apoio}>{apoio}</Text> : null}
      </Conteudo>

      <Onda cor={colors.areia} altura={40} />
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    overflow: 'hidden',
  },
  sol: {
    position: 'absolute',
    top: 22,
    right: -40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 226, 178, 0.18)',
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
    fontSize: 15,
    lineHeight: 23,
    color: 'rgba(255,255,255,0.86)',
    marginTop: espaco.md,
    marginBottom: espaco.xl,
    maxWidth: 460,
  },
});
