import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Conteudo, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { CartaoPasseio } from '@/components/CartaoPasseio';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { gruposDePasseios } from '@/data/passeios';
import type { Litoral } from '@/data/praias';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, raio } from '@/theme';

const OPCOES: { id: Litoral; rotulo: string }[] = [
  { id: 'sul', rotulo: 'Litoral Sul' },
  { id: 'norte', rotulo: 'Litoral Norte' },
];

export default function TelaPasseios() {
  const [litoral, setLitoral] = useState<Litoral>('sul');

  const grupos = useMemo(
    () => gruposDePasseios.filter((grupo) => grupo.litoral === litoral),
    [litoral],
  );

  const ehSul = litoral === 'sul';

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Mirantes, passeios e bairros · Guia do anfitrião"
        descricao="Os mirantes da falésia e as experiências do Litoral Sul, mais os passeios e os bairros da orla de João Pessoa e Cabedelo, com rota pronta para o Google Maps e o Waze."
        rota="/passeios"
      />
      <CabecalhoDeTela
        sobrancelha="Vistas e passeios"
        titulo="Além da areia"
        apoio="No Litoral Sul, os mirantes da falésia e as experiências da temporada. No Norte, os passeios e bairros de João Pessoa e Cabedelo."
      />

      <Conteudo style={estilos.filtro}>
        <Seletor opcoes={OPCOES} selecionado={litoral} aoSelecionar={setLitoral} />
      </Conteudo>

      <Conteudo style={estilos.aviso}>
        <View style={estilos.avisoCaixa}>
          <Icone name={ehSul ? 'weather-sunset' : 'car-outline'} size={16} color={colors.mar} />
          <Text style={estilos.avisoTexto}>
            {ehSul
              ? 'Falésia é para admirar: fique longe da borda e não pare embaixo dela. Piscinas e barras de rio dependem da maré — confira a tábua do dia.'
              : 'De Jacumã a João Pessoa são 40 a 50 minutos pela PB-008 ou pela BR-101 — dá para ir e voltar no mesmo dia, dormindo sempre na mesma casa.'}
          </Text>
        </View>
      </Conteudo>

      {grupos.map((grupo) => (
        <Conteudo key={`${grupo.litoral}-${grupo.tipo}`} style={estilos.grupo}>
          <TituloSecao titulo={grupo.titulo} apoio={grupo.descricao} />

          <View style={estilos.lista}>
            {grupo.itens.map((passeio) => (
              <CartaoPasseio key={passeio.id} passeio={passeio} />
            ))}
          </View>
        </Conteudo>
      ))}

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
