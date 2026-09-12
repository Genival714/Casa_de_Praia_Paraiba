import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Conteudo, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { CartaoPasseio } from '@/components/CartaoPasseio';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { experiencias, mirantes } from '@/data/passeios';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, raio } from '@/theme';

type Aba = 'mirantes' | 'experiencias';

const OPCOES: { id: Aba; rotulo: string }[] = [
  { id: 'mirantes', rotulo: 'Mirantes' },
  { id: 'experiencias', rotulo: 'Experiências' },
];

export default function TelaPasseios() {
  const [aba, setAba] = useState<Aba>('mirantes');

  const ehMirantes = aba === 'mirantes';
  const itens = ehMirantes ? mirantes : experiencias;

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Mirantes e passeios do Litoral Sul · Guia do anfitrião"
        descricao="Os mirantes da falésia, o Castelinho da Princesa, as piscinas naturais e outras experiências do Litoral Sul paraibano, com rota pronta."
        rota="/passeios"
      />
      <CabecalhoDeTela
        sobrancelha="Vistas e passeios"
        titulo="De cima da falésia"
        apoio="Os mirantes do Litoral Sul e os passeios que valem entrar na agenda da temporada."
      />

      <Conteudo style={estilos.filtro}>
        <Seletor opcoes={OPCOES} selecionado={aba} aoSelecionar={setAba} />
      </Conteudo>

      <Conteudo style={estilos.aviso}>
        <View style={estilos.avisoCaixa}>
          <Icone
            name={ehMirantes ? 'weather-sunset' : 'waves'}
            size={16}
            color={colors.mar}
          />
          <Text style={estilos.avisoTexto}>
            {ehMirantes
              ? 'As falésias são de barro e cedem com facilidade — aprecie a vista longe da borda.'
              : 'Vários passeios dependem da maré. Confira a tábua de marés do dia antes de sair.'}
          </Text>
        </View>
      </Conteudo>

      <Conteudo style={estilos.grupo}>
        <TituloSecao
          titulo={ehMirantes ? 'Mirantes' : 'Experiências'}
          apoio={
            ehMirantes
              ? `${mirantes.length} vistas do alto, do Mirante do Amor — logo ali — até Tambaba.`
              : `${experiencias.length} programas para preencher os dias entre um mergulho e outro.`
          }
        />

        <View style={estilos.lista}>
          {itens.map((passeio) => (
            <CartaoPasseio key={passeio.id} passeio={passeio} />
          ))}
        </View>
      </Conteudo>

      <Conteudo style={estilos.nota}>
        <Text style={estilos.notaTexto}>
          Os tempos de carro são aproximados, medidos a partir da casa na Praia do Amor.
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
