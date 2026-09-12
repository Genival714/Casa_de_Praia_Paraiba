import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Conteudo, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { CartaoPraia } from '@/components/CartaoPraia';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { gruposDePraias, type Litoral } from '@/data/praias';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, raio } from '@/theme';

const OPCOES: { id: Litoral; rotulo: string }[] = [
  { id: 'sul', rotulo: 'Litoral Sul' },
  { id: 'norte', rotulo: 'Litoral Norte' },
];

export default function TelaPraias() {
  const [litoral, setLitoral] = useState<Litoral>('sul');

  const grupos = useMemo(
    () => gruposDePraias.filter((grupo) => grupo.litoral === litoral),
    [litoral],
  );

  const totalDePraias = useMemo(
    () => grupos.reduce((soma, grupo) => soma + grupo.itens.length, 0),
    [grupos],
  );

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="As praias da Paraíba · Guia do anfitrião"
        descricao="Ranking das praias do Litoral Sul e do Litoral Norte da Paraíba, com o tempo de carro a partir da casa e rota pronta para o Google Maps e o Waze."
        rota="/praias"
      />
      <CabecalhoDeTela
        sobrancelha="Guia do anfitrião"
        titulo="As praias da Paraíba"
        apoio="Separadas por litoral e ranqueadas do jeito que a gente gosta. Cada praia abre direto no Google Maps ou no Waze."
      />

      <Conteudo style={estilos.filtro}>
        <Seletor opcoes={OPCOES} selecionado={litoral} aoSelecionar={setLitoral} />
      </Conteudo>

      <Conteudo style={estilos.aviso}>
        <View style={estilos.avisoCaixa}>
          <Icone name="heart-outline" size={16} color={colors.falesia} />
          <Text style={estilos.avisoTexto}>
            {litoral === 'sul'
              ? `Ranking pessoal do anfitrião — ${totalDePraias} praias, todas a partir da casa.`
              : `Sugestões de bate-volta subindo o litoral — ${totalDePraias} paradas a partir de João Pessoa.`}
          </Text>
        </View>
      </Conteudo>

      {grupos.map((grupo) => (
        <Conteudo key={grupo.nivel} style={estilos.grupo}>
          <TituloSecao titulo={grupo.titulo} apoio={grupo.descricao} />

          <View style={estilos.lista}>
            {grupo.itens.map((praia) => (
              <CartaoPraia key={praia.id} praia={praia} destaque={grupo.nivel === 'top1'} />
            ))}
          </View>
        </Conteudo>
      ))}

      <Conteudo style={estilos.nota}>
        <Text style={estilos.notaTexto}>
          Os tempos de carro são aproximados e mudam com o trânsito e a época do ano. Confira
          sempre a tábua de marés nas praias de piscinas naturais.
        </Text>
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
  aviso: {
    marginTop: espaco.lg,
  },
  avisoCaixa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    backgroundColor: colors.avisoFundo,
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
    color: colors.avisoTexto,
  },
  grupo: {
    marginTop: espaco.xxl,
  },
  lista: {
    gap: espaco.md,
  },
  nota: {
    marginTop: espaco.xxl,
  },
  notaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textoClaro,
  },
});
