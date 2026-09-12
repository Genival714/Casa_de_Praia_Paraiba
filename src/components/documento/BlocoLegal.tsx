import { Pressable, StyleSheet, Text, View } from 'react-native';

import { abrirLink } from '@/lib/links';
import { colors, espaco, fonts, raio, tipo } from '@/theme';

export type Lei = {
  /** Nome da norma: "Decreto-Lei nº 3.688/1941, art. 42". */
  nome: string;
  /** O que ela prevê. */
  pena: string;
};

export type FonteOficial = {
  rotulo: string;
  url: string;
};

/**
 * O bloco vermelho das Regras da Casa: as normas de perturbação do sossego,
 * com link para os textos oficiais.
 */
export function BlocoLegal({
  titulo,
  chamada,
  leis,
  fontes,
}: {
  titulo: string;
  chamada?: string;
  leis: readonly Lei[];
  fontes?: readonly FonteOficial[];
}) {
  return (
    <View style={estilos.caixa}>
      <Text style={estilos.titulo}>{titulo}</Text>
      {chamada ? <Text style={estilos.chamada}>{chamada}</Text> : null}

      <View style={estilos.lista}>
        {leis.map((lei) => (
          <View key={lei.nome}>
            <Text style={estilos.nome}>{lei.nome}</Text>
            <Text style={estilos.pena}>{lei.pena}</Text>
          </View>
        ))}
      </View>

      {fontes?.length ? (
        <View style={estilos.fontes}>
          <Text style={estilos.fontesRotulo}>Textos oficiais:</Text>
          <View style={estilos.fontesLinha}>
            {fontes.map((fonte) => (
              <Pressable
                key={fonte.url}
                accessibilityRole="link"
                accessibilityLabel={`Abrir ${fonte.rotulo}`}
                onPress={() => abrirLink(fonte.url)}
                style={({ pressed }) => pressed && { opacity: 0.7 }}
              >
                <Text style={estilos.fonteLink}>{fonte.rotulo}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    backgroundColor: colors.naoFundo,
    borderRadius: raio.lg,
    paddingVertical: espaco.xl,
    paddingHorizontal: espaco.lg,
  },
  titulo: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.vermelho,
    marginBottom: espaco.sm,
  },
  chamada: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.texto,
  },
  lista: {
    marginTop: espaco.lg,
    gap: espaco.md,
  },
  nome: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '700',
    color: colors.vermelho,
  },
  pena: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.texto,
    marginTop: 1,
  },
  fontes: {
    marginTop: espaco.xl,
  },
  fontesRotulo: {
    fontFamily: fonts.corpo,
    ...tipo.detalhe,
    fontWeight: '600',
    color: colors.textoSuave,
  },
  fontesLinha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
    marginTop: espaco.xs,
  },
  fonteLink: {
    fontFamily: fonts.corpo,
    ...tipo.detalhe,
    fontWeight: '600',
    color: colors.vermelho,
    textDecorationLine: 'underline',
  },
});
