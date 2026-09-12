import { StyleSheet, Text, View } from 'react-native';

import { propsDeRevelacao, useRevelacao } from '@/components/Revelar';
import { colors, espaco, fonts, raio, tipo } from '@/theme';

export type Destaque = {
  /** O número grande: "8", "22h". */
  numero: string;
  /** A unidade, menor, ao lado: "pessoas", "às 7h". */
  unidade?: string;
  rotulo: string;
  texto: string;
  tom: 'falesia' | 'mar';
};

/** Os dois cartões de destaque das Regras da Casa. */
export function Destaques({ itens }: { itens: readonly Destaque[] }) {
  return (
    <View style={estilos.grade}>
      {itens.map((item, i) => (
        <CartaoDeDestaque key={item.rotulo} item={item} atraso={i === 0 ? 1 : 2} />
      ))}
    </View>
  );
}

function CartaoDeDestaque({ item, atraso }: { item: Destaque; atraso: 1 | 2 }) {
  const referencia = useRevelacao(true);
  const paleta =
    item.tom === 'falesia'
      ? { fundo: colors.avisoFundo, tinta: colors.falesia }
      : { fundo: colors.aguaSuave, tinta: colors.mar };

  return (
    <View
      ref={referencia}
      dataSet={propsDeRevelacao('surge', atraso)}
      style={[estilos.cartao, { backgroundColor: paleta.fundo }]}
    >
      {/*
        A unidade é filha do mesmo <Text> para dividir a linha de base com o
        número — o React Native não alinha por base dentro de um flex row.
      */}
      <Text style={[estilos.numero, { color: paleta.tinta }]}>
        {item.numero}
        {/* O espaço vai dentro da string: solto no JSX, ele some. */}
        {item.unidade ? (
          <Text style={[estilos.unidade, { color: paleta.tinta }]}>{` ${item.unidade}`}</Text>
        ) : null}
      </Text>

      <Text style={[estilos.rotulo, { color: paleta.tinta }]}>{item.rotulo}</Text>
      <Text style={estilos.texto}>{item.texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
  },
  cartao: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 240,
    borderRadius: raio.lg,
    paddingVertical: espaco.xl,
    paddingHorizontal: espaco.lg,
  },
  numero: {
    fontFamily: fonts.display,
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '600',
    letterSpacing: -1,
  },
  unidade: {
    fontFamily: fonts.corpo,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0,
  },
  rotulo: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginTop: espaco.sm,
  },
  texto: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
    marginTop: espaco.xs,
  },
});
