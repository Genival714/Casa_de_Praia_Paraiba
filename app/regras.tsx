import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Botao, Conteudo, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { RodapeContato } from '@/components/RodapeContato';
import { BlocoLegal } from '@/components/documento/BlocoLegal';
import { Destaques } from '@/components/documento/Destaques';
import { GradeDeRegras } from '@/components/documento/GradeDeRegras';
import { casa } from '@/data/casa';
import { regras } from '@/data/regras';
import { abrirLink, urlWhatsApp } from '@/lib/links';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, tipo } from '@/theme';

export default function TelaRegras() {
  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Regras da Casa · Casa de Praia na Praia do Amor"
        descricao="Lotação máxima de 8 pessoas, silêncio das 22h às 7h, piscina, churrasqueira e demais normas de conduta da casa de temporada na Praia do Amor."
        rota="/regras"
      />
      <CabecalhoDeTela selo={regras.selo} titulo={regras.titulo} apoio={regras.subtitulo} />

      <Conteudo style={estilos.secaoCurta}>
        <Destaques itens={regras.destaques} />
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo="O que vale dentro e fora da casa" />
        <GradeDeRegras itens={regras.itens} />
      </Conteudo>

      <Conteudo style={estilos.secao} anim="surge">
        <BlocoLegal
          titulo={regras.lei.titulo}
          chamada={regras.lei.chamada}
          leis={regras.lei.itens}
          fontes={regras.lei.fontes}
        />
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo={regras.descumprimento.titulo} />
        <Text style={estilos.paragrafo}>{regras.descumprimento.texto}</Text>

        <View style={estilos.acao}>
          <Botao
            rotulo="Tirar uma dúvida no WhatsApp"
            icone="whatsapp"
            variante="falesia"
            onPress={() =>
              abrirLink(urlWhatsApp(casa.anfitrioes[0].telefone, regras.mensagemWhatsApp))
            }
          />
        </View>
      </Conteudo>

      <RodapeContato chamada={regras.chamadaDoRodape} />
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
  secao: {
    marginTop: espaco.xxl,
  },
  secaoCurta: {
    marginTop: espaco.lg,
  },
  paragrafo: {
    fontFamily: fonts.corpo,
    ...tipo.corpo,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
  },
  acao: {
    flexDirection: 'row',
    marginTop: espaco.xl,
  },
});
