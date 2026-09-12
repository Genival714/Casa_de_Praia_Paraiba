import { StyleSheet, Text, View } from 'react-native';

import { Etiqueta } from '@/components/Base';
import { colors, espaco, fonts, raio, tipo } from '@/theme';

/**
 * As duas colunas SEMPRE × NUNCA dos documentos impressos.
 *
 * A quebra para uma coluna só é `flexWrap` + `minWidth`, não media query nem
 * `useWindowDimensions`: assim não há salto de layout depois que a página
 * carrega.
 */
export function ListasSimNao({
  sempre,
  nunca,
  rotuloSempre = 'SEMPRE',
  rotuloNunca = 'NUNCA',
}: {
  sempre: readonly string[];
  nunca: readonly string[];
  rotuloSempre?: string;
  rotuloNunca?: string;
}) {
  return (
    <View style={estilos.duplo}>
      <Coluna rotulo={rotuloSempre} tom="verde" fundo={colors.okFundo} itens={sempre} />
      <Coluna rotulo={rotuloNunca} tom="vermelho" fundo={colors.naoFundo} itens={nunca} />
    </View>
  );
}

function Coluna({
  rotulo,
  tom,
  fundo,
  itens,
}: {
  rotulo: string;
  tom: 'verde' | 'vermelho';
  fundo: string;
  itens: readonly string[];
}) {
  const marcador = tom === 'verde' ? colors.verde : colors.vermelho;

  return (
    <View style={[estilos.coluna, { backgroundColor: fundo }]}>
      <View style={estilos.distintivo}>
        <Etiqueta texto={rotulo} tom={tom} />
      </View>

      {itens.map((item) => (
        <View key={item} style={estilos.item}>
          <Text style={[estilos.marcador, { color: marcador }]}>•</Text>
          <Text style={estilos.itemTexto}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  duplo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
  },
  coluna: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 250,
    borderRadius: raio.md,
    paddingVertical: espaco.lg,
    paddingHorizontal: espaco.lg,
  },
  distintivo: {
    flexDirection: 'row',
    marginBottom: espaco.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espaco.sm,
    marginTop: espaco.sm,
  },
  marcador: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  itemTexto: {
    flex: 1,
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.texto,
  },
});
