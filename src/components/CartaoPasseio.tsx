import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Cartao, Etiqueta, TempoDeCarro } from '@/components/Base';
import { BotoesDeRota } from '@/components/BotoesDeRota';
import { Foto } from '@/components/Foto';
import { Icone, type NomeDeIcone } from '@/components/Icone';
import type { Passeio, TipoPasseio } from '@/data/passeios';
import { colors, espaco, fonts, raio } from '@/theme';

/** Cada tipo de passeio tem o seu ícone, o degradê do ladrilho e a cor das etiquetas. */
const visualPorTipo: Record<
  TipoPasseio,
  { icone: NomeDeIcone; cores: [string, string]; tom: 'agua' | 'sol' | 'coqueiro' | 'coral' }
> = {
  mirante: { icone: 'binoculars', cores: [colors.marClaro, colors.mar], tom: 'agua' },
  experiencia: { icone: 'compass-outline', cores: [colors.sol, colors.porDoSol], tom: 'sol' },
  passeio: { icone: 'map-marker-star-outline', cores: [colors.coqueiro, colors.verdeEscuro], tom: 'coqueiro' },
  bairro: { icone: 'city-variant-outline', cores: [colors.coral, colors.falesia], tom: 'coral' },
};

export function CartaoPasseio({ passeio }: { passeio: Passeio }) {
  const visual = visualPorTipo[passeio.tipo];

  return (
    <Cartao interativo anim="surge" style={estilos.cartao}>
      <View style={estilos.cabecalho}>
        <LinearGradient
          colors={visual.cores}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={estilos.icone}
        >
          <Icone name={visual.icone} size={18} color={colors.branco} />
        </LinearGradient>

        <View style={estilos.tituloBloco}>
          <Text style={estilos.nome}>{passeio.nome}</Text>
          <View style={estilos.metaLinha}>
            <Text style={estilos.cidade}>{passeio.cidade}</Text>
            <Text style={estilos.separador}>•</Text>
            <TempoDeCarro minutos={passeio.minutosDeCarro} />
          </View>
        </View>
      </View>

      {passeio.melhorHorario ? (
        <View style={estilos.horario}>
          <Icone name="clock-outline" size={14} color={colors.falesia} />
          <Text style={estilos.horarioTexto}>{passeio.melhorHorario}</Text>
        </View>
      ) : null}

      {passeio.foto ? (
        <Foto
          arquivo={passeio.foto}
          legenda={passeio.nome}
          legendaSobreposta={false}
          altura={180}
          credito={passeio.credito}
          posicao={passeio.fotoPosicao}
        />
      ) : null}

      <Text style={estilos.resumo}>{passeio.resumo}</Text>

      <View style={estilos.etiquetas}>
        {passeio.destaques.map((d) => (
          <Etiqueta key={d} texto={d} tom={visual.tom} />
        ))}
      </View>

      {passeio.dica ? (
        <View style={estilos.dica}>
          <Icone name="lightbulb-on-outline" size={15} color={colors.sol} />
          <Text style={estilos.dicaTexto}>{passeio.dica}</Text>
        </View>
      ) : null}

      <BotoesDeRota destino={passeio} nome={passeio.nome} />
    </Cartao>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    gap: espaco.md,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
  },
  icone: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloBloco: {
    flex: 1,
    gap: 3,
  },
  nome: {
    fontFamily: fonts.display,
    fontSize: 18,
    lineHeight: 23,
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
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: colors.avisoFundo,
    borderRadius: raio.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  horarioTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    color: colors.falesia,
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
    backgroundColor: colors.solFundo,
    borderRadius: raio.sm,
    padding: espaco.md,
  },
  dicaTexto: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 13,
    lineHeight: 19,
    color: colors.solTexto,
  },
});
