import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Conteudo } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { CartaoSabor } from '@/components/CartaoSabor';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { categorias, sabores, type Categoria } from '@/data/gastronomia';
import type { Litoral } from '@/data/praias';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, raio } from '@/theme';

type Filtro = Categoria | 'todos';

const LITORAIS: { id: Litoral; rotulo: string }[] = [
  { id: 'sul', rotulo: 'Litoral Sul' },
  { id: 'norte', rotulo: 'Litoral Norte' },
];

export default function TelaSabores() {
  const [litoral, setLitoral] = useState<Litoral>('sul');
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const doLitoral = useMemo(() => sabores.filter((s) => s.litoral === litoral), [litoral]);

  // Só as categorias que existem neste litoral — pílula sem lugar atrás não ajuda ninguém.
  const opcoes = useMemo(
    () =>
      categorias
        .filter((c) => c.id === 'todos' || doLitoral.some((s) => s.categoria === c.id))
        .map((c) => ({ id: c.id as Filtro, rotulo: c.rotulo })),
    [doLitoral],
  );

  const lista = useMemo(() => {
    const selecionados =
      filtro === 'todos' ? doLitoral : doLitoral.filter((s) => s.categoria === filtro);

    // Favoritos do anfitrião sobem para o topo — é a recomendação que importa.
    return [...selecionados].sort(
      (a, b) => Number(Boolean(b.favoritoDoAnfitriao)) - Number(Boolean(a.favoritoDoAnfitriao)),
    );
  }, [doLitoral, filtro]);

  function trocarLitoral(novo: Litoral) {
    setLitoral(novo);
    setFiltro('todos');
  }

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Onde comer bem no litoral · Guia do anfitrião"
        descricao="Frutos do mar, comida regional, carnes, padaria e bar de praia: os restaurantes que a gente indica no Litoral Sul da Paraíba e em João Pessoa."
        rota="/sabores"
      />
      <CabecalhoDeTela
        sobrancelha="Gastronomia do litoral"
        titulo="Onde comer bem"
        apoio="Da caldeirada de Tambaba à carne de sol do Recanto do Picuí: os lugares que a gente indica de olhos fechados."
      />

      <Conteudo style={estilos.filtro}>
        <Seletor opcoes={LITORAIS} selecionado={litoral} aoSelecionar={trocarLitoral} />
      </Conteudo>

      <View style={estilos.categorias}>
        <Seletor opcoes={opcoes} selecionado={filtro} aoSelecionar={setFiltro} rolavel />
      </View>

      <Conteudo style={estilos.aviso}>
        <View style={estilos.avisoCaixa}>
          <Icone name="information-outline" size={16} color={colors.mar} />
          <Text style={estilos.avisoTexto}>
            {litoral === 'sul'
              ? 'Horários e dias de funcionamento mudam fora da temporada. Vale confirmar por telefone antes de pegar a estrada.'
              : 'Em João Pessoa, as casas tradicionais lotam no almoço de fim de semana e os temáticos costumam pedir reserva. Confirme antes de ir.'}
          </Text>
        </View>
      </Conteudo>

      <Conteudo style={estilos.lista}>
        {lista.length === 0 ? (
          <Text style={estilos.vazio}>Nenhum lugar nesta categoria por enquanto.</Text>
        ) : (
          lista.map((sabor) => <CartaoSabor key={sabor.id} sabor={sabor} />)
        )}
      </Conteudo>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.areia,
  },
  conteudo: {
    paddingBottom: ESPACO_FINAL_DA_PAGINA,
  },
  filtro: {
    marginTop: espaco.xl,
  },
  categorias: {
    marginTop: espaco.md,
  },
  aviso: {
    marginTop: espaco.lg,
  },
  avisoCaixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    backgroundColor: colors.aguaSuave,
    borderRadius: raio.sm,
    paddingHorizontal: espaco.md,
    paddingVertical: 10,
  },
  avisoTexto: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: '600',
    color: colors.mar,
  },
  lista: {
    marginTop: espaco.xl,
    gap: espaco.md,
  },
  vazio: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    textAlign: 'center',
    color: colors.textoClaro,
    paddingVertical: espaco.xxl,
  },
});
