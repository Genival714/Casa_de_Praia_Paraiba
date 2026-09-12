import { StyleSheet, Text, View } from 'react-native';

import { useLarguraMedida } from '@/lib/medidas';
import { colors, espaco, fonts, raio, tipo } from '@/theme';

/** Uma linha: a situação e o que fazer. */
export type LinhaDaTabela = {
  situacao: string;
  acao: string;
};

/** Abaixo desta largura a tabela vira uma lista empilhada. */
const LARGURA_MINIMA_PARA_COLUNAS = 460;

/**
 * A tabela "Situação / O que fazer" dos documentos impressos.
 *
 * O react-native-web não tem <table>, então ela é montada com Views. Em tela
 * estreita cada linha vira um bloco com a situação em cima e a ação embaixo —
 * é o que evita rolagem lateral no celular.
 */
export function Tabela({
  colunas,
  linhas,
}: {
  colunas: readonly [string, string];
  linhas: readonly LinhaDaTabela[];
}) {
  const { largura, aoMedir } = useLarguraMedida();
  // Enquanto não mediu (largura 0), mostra a versão estreita: é a que cabe
  // em qualquer tela, então o primeiro desenho nunca fica errado.
  const emColunas = largura >= LARGURA_MINIMA_PARA_COLUNAS;

  return (
    <View onLayout={aoMedir} style={estilos.moldura}>
      {emColunas ? (
        <View style={estilos.cabecalho}>
          <Text style={[estilos.textoCabecalho, estilos.celulaSituacao]}>{colunas[0]}</Text>
          <Text style={[estilos.textoCabecalho, estilos.celulaAcao]}>{colunas[1]}</Text>
        </View>
      ) : null}

      {linhas.map((linha, i) =>
        emColunas ? (
          <View key={linha.situacao} style={[estilos.linha, i > 0 && estilos.linhaComTraco]}>
            <Text style={[estilos.situacao, estilos.celulaSituacao]}>{linha.situacao}</Text>
            <Text style={[estilos.acao, estilos.celulaAcao]}>{linha.acao}</Text>
          </View>
        ) : (
          <View
            key={linha.situacao}
            style={[estilos.bloco, i > 0 && estilos.linhaComTraco]}
          >
            <Text style={estilos.situacaoEmpilhada}>{linha.situacao}</Text>
            <Text style={estilos.acao}>{linha.acao}</Text>
          </View>
        ),
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  moldura: {
    borderWidth: 1,
    borderColor: colors.borda,
    borderRadius: raio.md,
    overflow: 'hidden',
  },
  cabecalho: {
    flexDirection: 'row',
    backgroundColor: colors.areiaMedia,
    paddingVertical: espaco.md,
    paddingHorizontal: espaco.lg,
  },
  textoCabecalho: {
    fontFamily: fonts.corpo,
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.texto,
  },
  linha: {
    flexDirection: 'row',
    paddingVertical: espaco.md,
    paddingHorizontal: espaco.lg,
  },
  bloco: {
    paddingVertical: espaco.md,
    paddingHorizontal: espaco.lg,
  },
  linhaComTraco: {
    borderTopWidth: 1,
    borderTopColor: colors.borda,
  },
  celulaSituacao: {
    flex: 1,
    paddingRight: espaco.md,
  },
  celulaAcao: {
    flex: 1.5,
  },
  situacao: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: '600',
    color: colors.texto,
  },
  situacaoEmpilhada: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: '700',
    color: colors.falesia,
    marginBottom: 2,
  },
  acao: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
  },
});
