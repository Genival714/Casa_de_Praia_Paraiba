import { StyleSheet, Text, View } from 'react-native';

import { propsDeRevelacao, useRevelacao } from '@/components/Revelar';
import { colors, espaco, fonts, tipo } from '@/theme';

export type Passo = {
  titulo: string;
  detalhe?: string;
};

/**
 * Lista numerada dos documentos impressos.
 *
 * O CSS dos seus arquivos usava `counter`, que não existe no React Native.
 * Aqui o número sai do próprio índice da lista.
 */
export function Passos({ itens }: { itens: readonly Passo[] }) {
  return (
    <View>
      {itens.map((passo, i) => (
        <LinhaDoPasso key={passo.titulo} passo={passo} numero={i + 1} primeiro={i === 0} />
      ))}
    </View>
  );
}

function LinhaDoPasso({
  passo,
  numero,
  primeiro,
}: {
  passo: Passo;
  numero: number;
  primeiro: boolean;
}) {
  // Escalona só os três primeiros; depois disso a cascata viraria espera.
  const atraso = numero <= 3 ? (numero as 1 | 2 | 3) : undefined;
  const referencia = useRevelacao(true);

  return (
    <View
      ref={referencia}
      dataSet={propsDeRevelacao('surge', atraso)}
      style={[estilos.linha, !primeiro && estilos.linhaComTraco]}
    >
      <View style={estilos.circulo}>
        <Text style={estilos.numero}>{numero}</Text>
      </View>

      <View style={estilos.corpo}>
        <Text style={estilos.titulo}>{passo.titulo}</Text>
        {passo.detalhe ? <Text style={estilos.detalhe}>{passo.detalhe}</Text> : null}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espaco.md,
    paddingVertical: espaco.md,
  },
  linhaComTraco: {
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
  circulo: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: colors.falesia,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero: {
    fontFamily: fonts.display,
    fontSize: 16,
    fontWeight: '600',
    color: colors.branco,
  },
  corpo: {
    flex: 1,
    paddingTop: 3,
  },
  titulo: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    fontWeight: '700',
    color: colors.texto,
  },
  detalhe: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
    marginTop: 2,
  },
});
