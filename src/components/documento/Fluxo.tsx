import { StyleSheet, Text, View } from 'react-native';

import { colors, espaco, fonts, raio } from '@/theme';

/**
 * Faixa de etapas: Poço → Bomba → Caixa d'água → Torneiras.
 *
 * Quebra em várias linhas sozinha no celular — sem ponto de quebra, só
 * `flexWrap`.
 */
export function Fluxo({ etapas }: { etapas: readonly string[] }) {
  return (
    <View style={estilos.faixa}>
      {etapas.map((etapa, i) => (
        <View key={etapa} style={estilos.par}>
          {i > 0 ? (
            <Text style={estilos.seta} accessibilityElementsHidden importantForAccessibility="no">
              →
            </Text>
          ) : null}
          <Text style={estilos.etapa}>{etapa}</Text>
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: colors.areiaMedia,
    borderRadius: raio.md,
    paddingVertical: espaco.md,
    paddingHorizontal: espaco.lg,
  },
  par: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seta: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    fontWeight: '700',
    color: colors.falesia,
    marginHorizontal: espaco.sm,
  },
  etapa: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '600',
    color: colors.texto,
    paddingVertical: 2,
  },
});
