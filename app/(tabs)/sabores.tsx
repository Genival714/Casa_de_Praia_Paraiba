import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Conteudo } from '@/components/Base';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { CartaoSabor } from '@/components/CartaoSabor';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { categorias, sabores, type Categoria } from '@/data/gastronomia';
import { colors, espaco, fonts, raio } from '@/theme';

type Filtro = Categoria | 'todos';

export default function TelaSabores() {
  const [filtro, setFiltro] = useState<Filtro>('todos');

  const lista = useMemo(() => {
    const selecionados =
      filtro === 'todos' ? sabores : sabores.filter((s) => s.categoria === filtro);

    // Favoritos do anfitrião sobem para o topo — é a recomendação que importa.
    return [...selecionados].sort(
      (a, b) => Number(Boolean(b.favoritoDoAnfitriao)) - Number(Boolean(a.favoritoDoAnfitriao)),
    );
  }, [filtro]);

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDeTela
        sobrancelha="Gastronomia do litoral"
        titulo="Onde comer bem"
        apoio="Da caldeirada de Tambaba ao rubacão da Casa de Taipa: os lugares que a gente indica de olhos fechados."
      />

      <View style={estilos.filtro}>
        <Seletor
          opcoes={categorias.map((c) => ({ id: c.id as Filtro, rotulo: c.rotulo }))}
          selecionado={filtro}
          aoSelecionar={setFiltro}
          rolavel
        />
      </View>

      <Conteudo style={estilos.aviso}>
        <View style={estilos.avisoCaixa}>
          <Icone name="information-outline" size={16} color={colors.mar} />
          <Text style={estilos.avisoTexto}>
            Horários e dias de funcionamento mudam fora da temporada. Vale confirmar por telefone
            antes de pegar a estrada.
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
    paddingBottom: 130,
  },
  filtro: {
    marginTop: espaco.xl,
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
