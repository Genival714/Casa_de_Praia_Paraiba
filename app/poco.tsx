import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Botao, Conteudo, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { Foto } from '@/components/Foto';
import { RodapeContato } from '@/components/RodapeContato';
import { Aviso } from '@/components/documento/Aviso';
import { Fluxo } from '@/components/documento/Fluxo';
import { ListasSimNao } from '@/components/documento/ListasSimNao';
import { Passos } from '@/components/documento/Passos';
import { Tabela } from '@/components/documento/Tabela';
import { casa } from '@/data/casa';
import { poco } from '@/data/poco';
import { abrirLink, urlWhatsApp } from '@/lib/links';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, tipo } from '@/theme';

export default function TelaPoco() {
  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Manual do poço artesiano · Guia rápido do hóspede"
        descricao="Como ligar a bomba do poço artesiano da casa, o que nunca fazer e o que fazer se faltar água. Guia rápido para quem está hospedado."
        rota="/poco"
      />
      <CabecalhoDeTela selo={poco.selo} titulo={poco.titulo} apoio={poco.subtitulo} />

      <Conteudo style={estilos.secaoCurta} anim="surge">
        <Text style={estilos.paragrafo}>{poco.introducao}</Text>
        <View style={estilos.espacoAcima}>
          <Fluxo etapas={poco.fluxo} />
        </View>
        <Text style={[estilos.paragrafo, estilos.espacoAcima]}>{poco.depoisDoFluxo}</Text>
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo="Onde fica o comando" />
        <Foto arquivo={poco.foto.arquivo} legenda={poco.foto.legenda} altura={240} />
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo="Como ligar a bomba" />
        <Passos itens={poco.passos} />
        <Text style={[estilos.paragrafo, estilos.espacoAcima]}>{poco.comoDesligar}</Text>
        <View style={estilos.espacoAcima}>
          <Aviso texto={poco.aviso} tom="atencao" icone="alert-circle-outline" />
        </View>
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo="O essencial do bom uso" />
        <ListasSimNao sempre={poco.sempre} nunca={poco.nunca} />
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao titulo="Se algo der errado" />
        <Tabela colunas={['Situação', 'O que fazer']} linhas={poco.problemas} />
      </Conteudo>

      <Conteudo style={estilos.secao} anim="surge">
        <TituloSecao titulo="Água para beber" anim={false} />
        <Text style={estilos.paragrafo}>{poco.aguaParaBeber}</Text>
      </Conteudo>

      <Conteudo style={estilos.secao} anim="surge">
        <TituloSecao titulo="Antes de ir embora" anim={false} />
        <Text style={estilos.paragrafo}>{poco.antesDeIrEmbora}</Text>

        <View style={estilos.acao}>
          <Botao
            rotulo="Falar com a gente no WhatsApp"
            icone="whatsapp"
            variante="falesia"
            onPress={() =>
              abrirLink(urlWhatsApp(casa.anfitrioes[0].telefone, poco.mensagemWhatsApp))
            }
          />
        </View>
      </Conteudo>

      <RodapeContato chamada={poco.chamadaDoRodape} />
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
  espacoAcima: {
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
