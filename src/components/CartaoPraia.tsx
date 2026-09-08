import { StyleSheet, Text, View } from 'react-native';

import { Cartao, Etiqueta, Medalha, TempoDeCarro } from '@/components/Base';
import { BotoesDeRota } from '@/components/BotoesDeRota';
import { Foto } from '@/components/Foto';
import { Icone } from '@/components/Icone';
import type { Praia } from '@/data/praias';
import { colors, espaco, fonts, raio } from '@/theme';

export function CartaoPraia({ praia, destaque }: { praia: Praia; destaque?: boolean }) {
  return (
    <Cartao style={[estilos.cartao, praia.ehACasa && estilos.cartaoDaCasa]}>
      <View style={estilos.cabecalho}>
        <Medalha posicao={praia.posicao} destaque={destaque} />

        <View style={estilos.tituloBloco}>
          <Text style={estilos.nome}>{praia.nome}</Text>
          <View style={estilos.metaLinha}>
            <Text style={estilos.cidade}>{praia.cidade} · PB</Text>
            <Text style={estilos.separador}>•</Text>
            <TempoDeCarro minutos={praia.minutosDeCarro} />
          </View>
        </View>
      </View>

      {praia.ehACasa ? (
        <View style={estilos.selo}>
          <Icone name="home-heart" size={14} color={colors.coqueiro} />
          <Text style={estilos.seloTexto}>Você está aqui — é a praia da casa</Text>
        </View>
      ) : null}

      {praia.foto ? <Foto arquivo={praia.foto} altura={180} /> : null}

      <Text style={estilos.resumo}>{praia.resumo}</Text>

      <View style={estilos.etiquetas}>
        {praia.destaques.map((d) => (
          <Etiqueta key={d} texto={d} tom="agua" />
        ))}
      </View>

      {praia.dica ? (
        <View style={estilos.dica}>
          <Icone name="lightbulb-on-outline" size={15} color={colors.sol} />
          <Text style={estilos.dicaTexto}>{praia.dica}</Text>
        </View>
      ) : null}

      <BotoesDeRota destino={praia} nome={praia.nome} />
    </Cartao>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    gap: espaco.md,
  },
  cartaoDaCasa: {
    borderColor: 'rgba(46, 125, 91, 0.35)',
    backgroundColor: '#FBFDF9',
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
  },
  tituloBloco: {
    flex: 1,
    gap: 3,
  },
  nome: {
    fontFamily: fonts.display,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.texto,
    letterSpacing: -0.2,
  },
  metaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  cidade: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textoClaro,
  },
  separador: {
    fontSize: 10,
    color: colors.textoClaro,
  },
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E2F1EA',
    borderRadius: raio.sm,
    paddingHorizontal: espaco.md,
    paddingVertical: 8,
  },
  seloTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.coqueiro,
  },
  resumo: {
    fontFamily: fonts.corpo,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textoSuave,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dica: {
    flexDirection: 'row',
    gap: espaco.sm,
    backgroundColor: '#FDF6E9',
    borderRadius: raio.sm,
    padding: espaco.md,
  },
  dicaTexto: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 13,
    lineHeight: 19,
    color: '#7A5514',
  },
});
