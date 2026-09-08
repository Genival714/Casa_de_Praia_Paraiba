import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, espaco, fonts, LARGURA_MAX, raio } from '@/theme';

export type Opcao<T extends string> = { id: T; rotulo: string };

/**
 * Filtro em pílulas.
 * Com poucas opções ocupa a largura toda; com muitas, rola na horizontal.
 */
export function Seletor<T extends string>({
  opcoes,
  selecionado,
  aoSelecionar,
  rolavel = false,
}: {
  opcoes: Opcao<T>[];
  selecionado: T;
  aoSelecionar: (id: T) => void;
  rolavel?: boolean;
}) {
  const pilulas = opcoes.map((opcao) => {
    const ativo = opcao.id === selecionado;
    return (
      <Pressable
        key={opcao.id}
        onPress={() => aoSelecionar(opcao.id)}
        accessibilityRole="tab"
        accessibilityState={{ selected: ativo }}
        accessibilityLabel={opcao.rotulo}
        style={({ pressed }) => [
          estilos.pilula,
          !rolavel && estilos.pilulaExpandida,
          ativo && estilos.pilulaAtiva,
          pressed && { opacity: 0.85 },
        ]}
      >
        <Text style={[estilos.rotulo, ativo && estilos.rotuloAtivo]} numberOfLines={1}>
          {opcao.rotulo}
        </Text>
      </Pressable>
    );
  });

  if (rolavel) {
    return (
      <View style={estilos.externo}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.faixa}
        >
          {pilulas}
        </ScrollView>
      </View>
    );
  }

  return <View style={estilos.grupo}>{pilulas}</View>;
}

const estilos = StyleSheet.create({
  externo: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    alignSelf: 'center',
  },
  faixa: {
    paddingHorizontal: espaco.xl,
    gap: espaco.sm,
  },
  grupo: {
    flexDirection: 'row',
    gap: espaco.sm,
    backgroundColor: colors.areiaMedia,
    borderRadius: raio.pill,
    padding: 4,
  },
  pilula: {
    borderRadius: raio.pill,
    paddingVertical: 10,
    paddingHorizontal: espaco.lg,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pilulaExpandida: {
    flex: 1,
  },
  pilulaAtiva: {
    backgroundColor: colors.mar,
  },
  rotulo: {
    fontFamily: fonts.corpo,
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textoSuave,
  },
  rotuloAtivo: {
    color: colors.branco,
  },
});
