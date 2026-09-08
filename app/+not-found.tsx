import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Botao, Conteudo } from '@/components/Base';
import { Icone } from '@/components/Icone';
import { colors, espaco, fonts } from '@/theme';

export default function NaoEncontrada() {
  const router = useRouter();

  return (
    <View style={estilos.tela}>
      <Conteudo style={estilos.centro}>
        <Icone name="compass-off-outline" size={44} color={colors.marClaro} />
        <Text style={estilos.titulo}>Essa página se perdeu no mar</Text>
        <Text style={estilos.texto}>
          O endereço que você tentou abrir não existe por aqui. Volte para o início e siga a
          correnteza.
        </Text>
        <Botao rotulo="Voltar ao início" icone="home-variant" onPress={() => router.replace('/')} />
      </Conteudo>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.areia,
    justifyContent: 'center',
  },
  centro: {
    alignItems: 'center',
    gap: espaco.md,
  },
  titulo: {
    fontFamily: fonts.display,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.texto,
  },
  texto: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: colors.textoSuave,
    marginBottom: espaco.sm,
  },
});
