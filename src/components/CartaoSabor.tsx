import { StyleSheet, Text, View } from 'react-native';

import { Botao, Cartao, Etiqueta, TempoDeCarro } from '@/components/Base';
import { BotoesDeRota } from '@/components/BotoesDeRota';
import { Icone, type NomeDeIcone } from '@/components/Icone';
import type { Categoria, Sabor } from '@/data/gastronomia';
import { abrirLink, urlWhatsApp } from '@/lib/links';
import { colors, espaco, fonts, raio } from '@/theme';

const iconesPorCategoria: Record<
  Categoria,
  NomeDeIcone
> = {
  'frutos-do-mar': 'fish',
  regional: 'pot-steam-outline',
  carnes: 'food-steak',
  padaria: 'bread-slice-outline',
  bar: 'glass-cocktail',
};

export function CartaoSabor({ sabor }: { sabor: Sabor }) {
  return (
    <Cartao style={estilos.cartao}>
      <View style={estilos.cabecalho}>
        <View style={estilos.icone}>
          <Icone
            name={iconesPorCategoria[sabor.categoria]}
            size={19}
            color={colors.mar}
          />
        </View>

        <View style={estilos.tituloBloco}>
          <Text style={estilos.nome}>{sabor.nome}</Text>
          <View style={estilos.metaLinha}>
            <Text style={estilos.onde}>{sabor.onde}</Text>
            <Text style={estilos.separador}>•</Text>
            <TempoDeCarro minutos={sabor.minutosDeCarro} />
          </View>
        </View>
      </View>

      {sabor.favoritoDoAnfitriao ? (
        <View style={estilos.selo}>
          <Icone name="star" size={13} color="#9A6410" />
          <Text style={estilos.seloTexto}>Favorito do anfitrião</Text>
        </View>
      ) : null}

      <Text style={estilos.especialidade}>{sabor.especialidade}</Text>

      <View style={estilos.etiquetas}>
        {sabor.pratos.map((p) => (
          <Etiqueta key={p} texto={p} tom="contorno" />
        ))}
      </View>

      {sabor.telefone ? (
        <Botao
          rotulo={`Falar no WhatsApp · ${sabor.telefone}`}
          icone="whatsapp"
          variante="whatsapp"
          compacto
          acessibilidade={`Falar com ${sabor.nome} no WhatsApp`}
          onPress={() =>
            abrirLink(
              urlWhatsApp(
                sabor.telefone as string,
                `Olá! Encontrei o ${sabor.nome} no guia da Casa de Praia da Praia do Amor e gostaria de informações.`,
              ),
            )
          }
        />
      ) : null}

      <BotoesDeRota destino={sabor} nome={sabor.nome} />
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
    backgroundColor: colors.aguaSuave,
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
  onde: {
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
    alignSelf: 'flex-start',
    gap: 5,
    backgroundColor: '#FDF0DA',
    borderRadius: raio.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  seloTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    color: '#9A6410',
  },
  especialidade: {
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
});
