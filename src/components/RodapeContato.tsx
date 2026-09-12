import { Pressable, StyleSheet, Text, View } from 'react-native';

import { casa } from '@/data/casa';
import { abrirLink, urlTelefone } from '@/lib/links';
import { colors, espaco, fonts, LARGURA_MAX, tipo } from '@/theme';

/**
 * Rodapé escuro dos documentos impressos: uma linha de contexto e os
 * telefones dos anfitriões em destaque.
 *
 * Os números vêm de src/data/casa.ts — nunca escreva um telefone aqui.
 */
export function RodapeContato({
  chamada = 'Dúvidas sobre a reserva, a casa ou a estadia:',
}: {
  chamada?: string;
}) {
  return (
    <View style={estilos.faixa}>
      <View style={estilos.interno}>
        <Text style={estilos.chamada}>{chamada}</Text>

        {casa.anfitrioes.map((anfitriao) => (
          <Pressable
            key={anfitriao.telefone}
            accessibilityRole="link"
            accessibilityLabel={`Ligar para ${anfitriao.nome}, ${anfitriao.telefone}`}
            onPress={() => abrirLink(urlTelefone(anfitriao.telefone))}
            style={({ pressed }) => pressed && { opacity: 0.7 }}
          >
            <Text style={estilos.telefone}>
              ({anfitriao.telefone.slice(0, 2)}) {anfitriao.telefone.slice(3)} — {anfitriao.nome}
            </Text>
          </Pressable>
        ))}

        <Text style={estilos.endereco}>
          {casa.nome}
          {'\n'}
          {casa.endereco.completo}
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    backgroundColor: colors.marProfundo,
    paddingVertical: espaco.xxl,
  },
  interno: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    alignSelf: 'center',
    paddingHorizontal: espaco.xl,
  },
  chamada: {
    fontFamily: fonts.corpo,
    ...tipo.corpoMenor,
    fontWeight: tipo.pesoCorpo,
    color: 'rgba(255,252,246,0.7)',
  },
  telefone: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '600',
    color: colors.branco,
    marginTop: espaco.xs,
  },
  endereco: {
    fontFamily: fonts.corpo,
    ...tipo.detalhe,
    fontWeight: tipo.pesoCorpo,
    color: 'rgba(255,252,246,0.6)',
    marginTop: espaco.lg,
  },
});
