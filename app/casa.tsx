import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Botao, Cartao, CartaoDeAtalho, Conteudo, TituloSecao } from '@/components/Base';
import { BotoesDeRota } from '@/components/BotoesDeRota';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { CabecalhoDeTela } from '@/components/CabecalhoDeTela';
import { BlocoContato } from '@/components/Contato';
import { Galeria } from '@/components/Galeria';
import { Icone } from '@/components/Icone';
import { Seletor } from '@/components/Seletor';
import { Videos } from '@/components/Videos';
import { casa, comodidades, galeria, type Foto as TipoFoto } from '@/data/casa';
import { ICONES_COMODIDADE } from '@/lib/icones';
import { abrirLink, urlWhatsApp } from '@/lib/links';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, raio } from '@/theme';

type FiltroFoto = TipoFoto['categoria'] | 'todas';

const FILTROS: { id: FiltroFoto; rotulo: string }[] = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'lazer', rotulo: 'Área de lazer' },
  { id: 'convivio', rotulo: 'Sala e cozinha' },
  { id: 'quartos', rotulo: 'Quartos' },
  { id: 'banheiros', rotulo: 'Banheiros' },
];

export default function TelaCasa() {
  const router = useRouter();
  const [filtro, setFiltro] = useState<FiltroFoto>('todas');

  const fotos = useMemo(
    () => (filtro === 'todas' ? galeria : galeria.filter((f) => f.categoria === filtro)),
    [filtro],
  );

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="A casa por dentro · Casa de Praia na Praia do Amor"
        descricao="Fotos, vídeos e estrutura da casa: piscina, área gourmet, 2 quartos e tudo mobiliado. Veja como chegar à Praia do Amor, em Jacumã — Conde/PB."
        rota="/casa"
      />
      <CabecalhoDeTela
        sobrancelha="O imóvel"
        titulo="A casa por dentro"
        apoio="Toda mobiliada, com piscina, área gourmet e espaço para a família inteira."
      />

      {/* ---------------------------------------------------------------
          Galeria
      --------------------------------------------------------------- */}
      <View style={estilos.filtro}>
        <Seletor opcoes={FILTROS} selecionado={filtro} aoSelecionar={setFiltro} rolavel />
      </View>

      <Conteudo style={estilos.galeria}>
        {/* A chave força a galeria a recomeçar quando o filtro muda. */}
        <Galeria key={filtro} fotos={fotos} />
      </Conteudo>

      {/* ---------------------------------------------------------------
          Vídeo (aparece só quando houver link em src/data/casa.ts)
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Vídeos"
          titulo="Um passeio pela casa"
          apoio="Os vídeos só começam a baixar quando você toca em tocar."
        />
        <Videos />
      </Conteudo>

      {/* ---------------------------------------------------------------
          Comodidades
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Estrutura"
          titulo="O que você encontra"
          apoio="Chegue com a mala — o resto já está aqui."
        />

        <View style={estilos.grade}>
          {comodidades.map((item) => (
            <View key={item.titulo} style={estilos.comodidade}>
              <View style={estilos.comodidadeIcone}>
                <Icone
                  name={ICONES_COMODIDADE[item.icone]}
                  size={19}
                  color={colors.mar}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilos.comodidadeTitulo}>{item.titulo}</Text>
                <Text style={estilos.comodidadeDetalhe}>{item.detalhe}</Text>
              </View>
            </View>
          ))}
        </View>
      </Conteudo>

      {/* ---------------------------------------------------------------
          Localização
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Localização"
          titulo="Como chegar"
          apoio="No Loteamento Village, a poucos passos da faixa de areia da Praia do Amor."
        />

        <Cartao style={estilos.cartaoEndereco}>
          <View style={estilos.enderecoLinha}>
            <Icone name="map-marker-outline" size={20} color={colors.porDoSol} />
            <View style={{ flex: 1 }}>
              <Text style={estilos.enderecoTitulo}>{casa.endereco.logradouro}</Text>
              <Text style={estilos.enderecoTexto}>
                {casa.endereco.bairro}
                {'\n'}
                {casa.endereco.cidade} — {casa.endereco.estado}
              </Text>
            </View>
          </View>

          <BotoesDeRota destino={casa.destino} nome="a casa" compacto={false} />
        </Cartao>
      </Conteudo>

      {/* ---------------------------------------------------------------
          Reserva
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <View style={estilos.chamada}>
          <Text style={estilos.chamadaTitulo}>Garanta a sua temporada</Text>
          <Text style={estilos.chamadaTexto}>
            Consulte datas disponíveis e valores direto com os anfitriões.
          </Text>
          <Botao
            rotulo="Consultar disponibilidade"
            icone="whatsapp"
            variante="whatsapp"
            onPress={() =>
              abrirLink(urlWhatsApp(casa.anfitrioes[0].telefone, casa.mensagemWhatsApp))
            }
          />
        </View>
      </Conteudo>

      <Conteudo style={estilos.secao}>
        <TituloSecao sobrancelha="Reservas" titulo="Fale com a gente" />
        <BlocoContato />
      </Conteudo>

      {/* ---------------------------------------------------------------
          Manual da casa — para quem já está hospedado.
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Já está hospedado?"
          titulo="Manual da casa"
          apoio="As regras da casa e como funciona o poço artesiano."
        />

        <View style={estilos.atalhos}>
          <CartaoDeAtalho
            icone="clipboard-text-outline"
            titulo="Regras da casa"
            texto="Lotação, silêncio, piscina e churrasqueira"
            tom="falesia"
            atraso={1}
            onPress={() => router.push('/regras')}
          />
          <CartaoDeAtalho
            icone="water-pump"
            titulo="Poço artesiano"
            texto="Como ligar a bomba e o que fazer se faltar água"
            tom="falesia"
            atraso={2}
            onPress={() => router.push('/poco')}
          />
        </View>
      </Conteudo>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  atalhos: {
    gap: espaco.md,
  },
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
  galeria: {
    marginTop: espaco.xl,
    gap: espaco.md,
  },
  secao: {
    marginTop: espaco.xxl,
  },
  grade: {
    gap: espaco.sm,
  },
  comodidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    backgroundColor: colors.papel,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: colors.borda,
    padding: espaco.md,
  },
  comodidadeIcone: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.aguaSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comodidadeTitulo: {
    fontFamily: fonts.corpo,
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.texto,
  },
  comodidadeDetalhe: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.textoClaro,
    marginTop: 1,
  },
  cartaoEndereco: {
    gap: espaco.lg,
  },
  enderecoLinha: {
    flexDirection: 'row',
    gap: espaco.md,
  },
  enderecoTitulo: {
    fontFamily: fonts.display,
    fontSize: 18,
    fontWeight: '600',
    color: colors.texto,
  },
  enderecoTexto: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textoSuave,
    marginTop: 3,
  },
  chamada: {
    backgroundColor: colors.avisoFundo,
    borderRadius: raio.lg,
    padding: espaco.xl,
    gap: espaco.md,
  },
  chamadaTitulo: {
    fontFamily: fonts.display,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.avisoTexto,
  },
  chamadaTexto: {
    fontFamily: fonts.corpo,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.avisoTexto,
    marginBottom: espaco.xs,
  },
});
