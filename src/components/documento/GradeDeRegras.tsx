import { StyleSheet, Text, View } from 'react-native';

import { colors, espaco, fonts, tipo } from '@/theme';

export type ItemDeRegra = {
  termo: string;
  definicao: string;
};

/**
 * A grade de regras dos documentos impressos: duas colunas de cartões com um
 * traço de falésia em cima.
 *
 * Quebra para uma coluna por `flexWrap` + `minWidth`, sem media query.
 */
export function GradeDeRegras({ itens }: { itens: readonly ItemDeRegra[] }) {
  return (
    <View style={estilos.grade}>
      {itens.map((item) => (
        <View key={item.termo} style={estilos.item}>
          <Text style={estilos.termo}>{item.termo}</Text>
          <Text style={estilos.definicao}>{item.definicao}</Text>
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.lg,
  },
  item: {
    flexBasis: 0,
    flexGrow: 1,
    // 300 garante duas colunas na coluna de 760 do site, como nos documentos
    // impressos — com 240, a largura permitiria três e a leitura ficava seca.
    minWidth: 300,
    borderTopWidth: 2,
    borderTopColor: colors.falesia,
    paddingTop: espaco.md,
  },
  termo: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
    marginBottom: 2,
  },
  definicao: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
  },
});
