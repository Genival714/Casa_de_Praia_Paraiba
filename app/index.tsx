import { createElement, ReactNode, useEffect } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { Botao, CartaoDeAtalho, Conteudo, Onda, TituloSecao } from '@/components/Base';
import { CabecalhoDaPagina } from '@/components/CabecalhoDaPagina';
import { BlocoContato } from '@/components/Contato';
import { Galeria } from '@/components/Galeria';
import { Icone } from '@/components/Icone';
import { propsDeRevelacao, useRevelacao } from '@/components/Revelar';
import { RodapeContato } from '@/components/RodapeContato';
import { Sol } from '@/components/Sol';
import { casa, comodidades, galeria } from '@/data/casa';
import { sabores } from '@/data/gastronomia';
import { praias, praiasEmDestaque } from '@/data/praias';
import { regras } from '@/data/regras';
import { arquivoPublico } from '@/lib/caminhos';
import { contarQuandoVisivel } from '@/lib/revelar';
import { ICONES_COMODIDADE } from '@/lib/icones';
import { abrirLink, urlRotaGoogleMaps, urlWhatsApp } from '@/lib/links';
import { colors, espaco, ESPACO_FINAL_DA_PAGINA, fonts, LARGURA_MAX, raio, tipo } from '@/theme';

/** A foto que abre o site. Troque aqui se quiser outra na capa. */
const FOTO_DA_CAPA = 'piscina-deck.jpg';

export default function TelaInicio() {
  const router = useRouter();

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <CabecalhoDaPagina
        titulo="Casa de Praia na Praia do Amor · Jacumã — Conde/PB"
        descricao="Casa de temporada toda mobiliada na Praia do Amor, Jacumã — Conde/PB. Piscina, área de lazer e um guia das melhores praias, mirantes e restaurantes do Litoral Sul paraibano."
        rota="/"
      />

      {/* ---------------------------------------------------------------
          Capa: a foto da piscina em tela cheia, com zoom lento, e o texto
          entrando linha a linha.
      --------------------------------------------------------------- */}
      <View style={estilos.capa} dataSet={{ capa: 'true' }}>
        <FotoDeFundo arquivo={FOTO_DA_CAPA} />
        <LinearGradient
          colors={[
            'rgba(4, 48, 58, 0.30)',
            'rgba(4, 48, 58, 0.55)',
            'rgba(4, 48, 58, 0.92)',
          ]}
          locations={[0, 0.45, 1]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.3, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(4, 48, 58, 0.85)', 'rgba(4, 48, 58, 0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.7, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />

        <Conteudo style={estilos.capaConteudo}>
          <View dataSet={{ entrada: '1' }} style={estilos.capaSobrancelhaLinha}>
            <View style={estilos.capaTraco} />
            <Text style={estilos.sobrancelhaCapa}>Casa de temporada · Conde — PB</Text>
          </View>

          <Text dataSet={{ entrada: '2', tipo: 'capa' }} style={estilos.tituloCapa}>
            {casa.chamada}
          </Text>

          <Text dataSet={{ entrada: '3' }} style={estilos.textoCapa}>
            {casa.subchamada}
          </Text>

          <View dataSet={{ entrada: '4' }} style={estilos.localizacao}>
            <Icone name="map-marker-outline" size={16} color={colors.agua} />
            <Text style={estilos.localizacaoTexto}>{casa.endereco.completo}</Text>
          </View>

          <View dataSet={{ entrada: '5' }} style={estilos.acoesCapa}>
            <Botao
              rotulo="Reservar no WhatsApp"
              icone="whatsapp"
              variante="whatsapp"
              style={{ flex: 1, minWidth: 220 }}
              onPress={() =>
                abrirLink(urlWhatsApp(casa.anfitrioes[0].telefone, casa.mensagemWhatsApp))
              }
            />
            <Botao
              rotulo="Como chegar"
              icone="map-marker-radius-outline"
              variante="vidro"
              seta
              style={{ flex: 1, minWidth: 170 }}
              onPress={() => abrirLink(urlRotaGoogleMaps(casa.destino))}
            />
          </View>
        </Conteudo>

        <View style={estilos.capaOnda}>
          <Onda cor={colors.areia} altura={56} />
        </View>
      </View>

      {/* ---------------------------------------------------------------
          Números: a faixa flutua sobre o fim da capa.
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.numerosExterno}>
        <FaixaDeNumeros />
      </Conteudo>

      {/* ---------------------------------------------------------------
          Frase de impacto
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao} anim="surge">
        <View style={estilos.citacao}>
          <Text style={estilos.aspas}>“</Text>
          <Text style={estilos.citacaoTexto}>{casa.fraseImpacto}</Text>
        </View>
      </Conteudo>

      {/* ---------------------------------------------------------------
          A casa — faixa de areia com textura
      --------------------------------------------------------------- */}
      <View style={estilos.faixaAreia} dataSet={{ grao: 'claro' }}>
        <Conteudo>
          <TituloSecao
            sobrancelha="A casa"
            titulo="Tudo pronto para a sua temporada"
            apoio="Toda mobiliada, com área de lazer completa. É só chegar com a mala."
          />

          <GradeDeComodidades />

          <View style={estilos.galeriaDaHome}>
            <Galeria fotos={galeria.slice(0, 5)} arranjo="mosaico" />
          </View>

          <View style={estilos.acaoCentral}>
            <Botao
              rotulo="Ver a casa por dentro"
              variante="secundario"
              seta
              onPress={() => router.push('/casa')}
            />
          </View>
        </Conteudo>
      </View>

      {/* ---------------------------------------------------------------
          Praias vizinhas
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Litoral Sul"
          titulo="A poucos minutos daqui"
          apoio="As praias mais bonitas do Conde estão todas na mesma estrada."
        />
      </Conteudo>

      <FaixaRolante>
        {praiasEmDestaque.map((praia, i) => (
          <ChipDePraia key={praia.id} praia={praia} atraso={Math.min(i + 1, 3) as 1 | 2 | 3} />
        ))}
      </FaixaRolante>

      {/* ---------------------------------------------------------------
          Guia do anfitrião — faixa escura
      --------------------------------------------------------------- */}
      <View style={estilos.faixaEscura} dataSet={{ grao: 'true' }}>
        <View style={estilos.faixaEscuraLua} />
        <Sol tom="poente" tamanho={220} halo={false} fase={2} style={{ bottom: 40, left: -90 }} />
        <Onda cor={colors.areia} invertida altura={44} />

        <Conteudo style={estilos.faixaEscuraConteudo}>
          <TituloSecao
            claro
            sobrancelha="Guia do anfitrião"
            titulo="O que fazer por aqui"
            apoio="Nossas indicações pessoais, com rota pronta para o Google Maps e o Waze."
          />

          <View style={estilos.grade}>
            <CartaoDeAtalho
              icone="beach"
              titulo="Praias"
              texto={`${praias.length} praias em ranking, do Litoral Sul ao Norte`}
              atraso={1}
              onPress={() => router.push('/praias')}
            />
            <CartaoDeAtalho
              icone="binoculars"
              titulo="Passeios e mirantes"
              texto="As vistas de cima da falésia que valem a subida"
              atraso={2}
              onPress={() => router.push('/passeios')}
            />
            <CartaoDeAtalho
              icone="silverware-fork-knife"
              titulo="Sabores"
              texto={`${sabores.length} lugares para comer bem no litoral`}
              atraso={3}
              onPress={() => router.push('/sabores')}
            />
          </View>
        </Conteudo>

        <Onda cor={colors.areiaMedia} altura={44} />
      </View>

      {/* ---------------------------------------------------------------
          Manual da casa — outro público: quem já chegou.
      --------------------------------------------------------------- */}
      <View style={estilos.faixaHospede} dataSet={{ grao: 'claro' }}>
        <Conteudo>
          <TituloSecao
            sobrancelha="Já está hospedado?"
            titulo="Manual da casa"
            apoio="As regras da casa e como funciona o poço artesiano."
          />

          <View style={estilos.grade}>
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
      </View>

      {/* ---------------------------------------------------------------
          Contato
      --------------------------------------------------------------- */}
      <View style={estilos.faixaContato}>
        <Onda cor={colors.areiaMedia} invertida altura={40} />
        <Conteudo style={estilos.secaoContato}>
          <TituloSecao
            sobrancelha="Reservas"
            titulo="Fale com a gente"
            apoio="Tire dúvidas sobre disponibilidade, valores e a estadia. Respondemos pelo WhatsApp."
          />
          <BlocoContato />
        </Conteudo>
      </View>

      <RodapeContato chamada="Reservas, disponibilidade e valores:" />
    </ScrollView>
  );
}

/* ------------------------------------------------------------------------- */

/**
 * A foto de fundo da capa. Na web é uma <img> de verdade — já vem no HTML
 * que o servidor entrega e ganha o zoom lento pelo CSS.
 */
function FotoDeFundo({ arquivo }: { arquivo: string }) {
  const endereco = arquivoPublico(`/fotos/${arquivo}`);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {createElement('img', {
        src: endereco,
        alt: '',
        'aria-hidden': 'true',
        'data-kenburns': 'true',
        fetchPriority: 'high',
        style: {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '74% 58%',
          display: 'block',
        },
      })}
    </View>
  );
}

/** Os quatro números que resumem a casa, subindo do zero ao entrar na tela. */
function FaixaDeNumeros() {
  const referencia = useRevelacao(true);
  const lotacao = regras.destaques[0].numero;

  // Só depois de montar — nunca antes de o React assumir a página.
  useEffect(() => {
    contarQuandoVisivel(referencia.current);
  }, [referencia]);

  const itens = [
    { numero: lotacao, rotulo: 'hóspedes', detalhe: 'lotação máxima' },
    { numero: '2', rotulo: 'quartos', detalhe: 'sendo 1 suíte' },
    { numero: String(praias.length), rotulo: 'praias', detalhe: 'no guia do anfitrião' },
    { numero: String(sabores.length), rotulo: 'sabores', detalhe: 'restaurantes indicados' },
  ];

  return (
    <View ref={referencia} dataSet={propsDeRevelacao('surge')} style={estilos.numeros}>
      {itens.map((item, i) => (
        <View key={item.rotulo} style={[estilos.numero, i > 0 && estilos.numeroComTraco]}>
          <Text dataSet={{ contador: item.numero }} style={estilos.numeroGrande}>
            {item.numero}
          </Text>
          <Text style={estilos.numeroRotulo}>{item.rotulo}</Text>
          <Text style={estilos.numeroDetalhe}>{item.detalhe}</Text>
        </View>
      ))}
    </View>
  );
}

/** As comodidades em grade, cada uma com um ladrilho colorido. */
function GradeDeComodidades() {
  return (
    <View style={estilos.comodidades}>
      {comodidades.slice(0, 8).map((item, i) => (
        <Comodidade key={item.titulo} item={item} indice={i} />
      ))}
    </View>
  );
}

function Comodidade({
  item,
  indice,
}: {
  item: (typeof comodidades)[number];
  indice: number;
}) {
  const referencia = useRevelacao(true);
  const atraso = ((indice % 3) + 1) as 1 | 2 | 3;

  return (
    <View
      ref={referencia}
      dataSet={{ ...propsDeRevelacao('surge', atraso), cartao: 'true' }}
      style={estilos.comodidade}
    >
      <LinearGradient
        colors={[colors.aguaSuave, '#D5E9EC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={estilos.comodidadeIcone}
      >
        <Icone name={ICONES_COMODIDADE[item.icone]} size={22} color={colors.mar} />
      </LinearGradient>
      <Text style={estilos.comodidadeTitulo}>{item.titulo}</Text>
      <Text style={estilos.comodidadeDetalhe}>{item.detalhe}</Text>
    </View>
  );
}

/** Faixa que rola na horizontal, mas ancorada na mesma coluna do resto. */
function FaixaRolante({ children }: { children: ReactNode }) {
  return (
    <View style={estilos.faixaExterna}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.faixaConteudo}
      >
        {children}
      </ScrollView>
    </View>
  );
}

function ChipDePraia({
  praia,
  atraso,
}: {
  praia: (typeof praiasEmDestaque)[number];
  atraso: 1 | 2 | 3;
}) {
  const router = useRouter();
  const referencia = useRevelacao(true);

  return (
    <View ref={referencia} dataSet={propsDeRevelacao('surge', atraso)}>
      <Pressable
        onPress={() => router.push('/praias')}
        accessibilityRole="button"
        accessibilityLabel={`Ver ${praia.nome} na lista de praias`}
        dataSet={{ cartao: 'true' }}
        style={({ pressed }) => [estilos.chipPraia, pressed && { opacity: 0.88 }]}
      >
        <LinearGradient
          colors={
            praia.ehACasa
              ? [colors.coqueiro, colors.verdeEscuro]
              : [colors.marClaro, colors.marProfundo]
          }
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={estilos.chipFundo}
        >
          <Sol tamanho={96} halo={false} fase={atraso} style={{ top: -30, right: -30 }} />
          <Text style={estilos.chipMinutosGrande}>
            {praia.minutosDeCarro <= 0 ? '0' : praia.minutosDeCarro}
          </Text>
          <View style={estilos.chipTopo}>
            <Icone
              name={praia.ehACasa ? 'home-heart' : 'beach'}
              size={20}
              color={colors.branco}
            />
          </View>
          <Text style={estilos.chipNome} numberOfLines={2}>
            {praia.nome}
          </Text>
          <Text style={estilos.chipTempo}>
            {praia.minutosDeCarro <= 0 ? 'A praia da casa' : `${praia.minutosDeCarro} min de carro`}
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
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

  /* Capa */
  capa: {
    backgroundColor: colors.marProfundo,
    overflow: 'hidden',
    minHeight: 560,
    justifyContent: 'flex-end',
  },
  capaConteudo: {
    paddingTop: 96,
    paddingBottom: 110,
  },
  capaOnda: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -1,
  },
  capaSobrancelhaLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    marginBottom: espaco.lg,
  },
  capaTraco: {
    width: 28,
    height: 2,
    backgroundColor: colors.agua,
    borderRadius: 1,
  },
  sobrancelhaCapa: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.agua,
  },
  tituloCapa: {
    fontFamily: fonts.display,
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '500',
    color: colors.branco,
    letterSpacing: -1,
    maxWidth: 640,
  },
  textoCapa: {
    fontFamily: fonts.corpo,
    ...tipo.corpo,
    fontWeight: tipo.pesoCorpo,
    color: 'rgba(255,255,255,0.88)',
    marginTop: espaco.lg,
    maxWidth: 480,
  },
  localizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: espaco.lg,
  },
  localizacaoTexto: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.78)',
  },
  acoesCapa: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.sm,
    marginTop: espaco.xl,
  },

  /* Números */
  numerosExterno: {
    marginTop: -64,
    zIndex: 2,
  },
  numeros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.papel,
    borderRadius: raio.lg,
    borderWidth: 1,
    borderColor: colors.borda,
    paddingVertical: espaco.sm,
    shadowColor: colors.marProfundo,
    shadowOpacity: 0.14,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  numero: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 150,
    alignItems: 'center',
    paddingVertical: espaco.lg,
    paddingHorizontal: espaco.md,
  },
  numeroComTraco: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borda,
  },
  numeroGrande: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '500',
    color: colors.falesia,
    letterSpacing: -1,
  },
  numeroRotulo: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    fontWeight: '700',
    color: colors.texto,
    marginTop: 2,
  },
  numeroDetalhe: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '500',
    color: colors.textoClaro,
    marginTop: 1,
    textAlign: 'center',
  },

  /* Secoes */
  secao: {
    marginTop: espaco.xxxl,
  },
  citacao: {
    paddingLeft: espaco.xl,
    borderLeftWidth: 3,
    borderLeftColor: colors.falesia,
  },
  aspas: {
    position: 'absolute',
    left: espaco.md,
    top: -22,
    fontFamily: fonts.display,
    fontSize: 88,
    lineHeight: 88,
    color: colors.falesia,
    opacity: 0.22,
  },
  citacaoTexto: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '400',
    color: colors.texto,
    letterSpacing: -0.2,
  },

  /* Faixa de areia */
  faixaAreia: {
    marginTop: espaco.xxxl,
    backgroundColor: colors.areiaMedia,
    paddingVertical: espaco.xxxl,
  },
  comodidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.md,
  },
  comodidade: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: 156,
    backgroundColor: colors.papel,
    borderRadius: raio.md,
    padding: espaco.lg,
    gap: 6,
  },
  comodidadeIcone: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  comodidadeTitulo: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '700',
    color: colors.texto,
  },
  comodidadeDetalhe: {
    fontFamily: fonts.corpo,
    ...tipo.detalhe,
    fontWeight: tipo.pesoCorpo,
    color: colors.textoSuave,
  },
  galeriaDaHome: {
    marginTop: espaco.xl,
  },
  acaoCentral: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: espaco.xl,
  },

  /* Faixas horizontais */
  faixaExterna: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    alignSelf: 'center',
    marginTop: espaco.md,
  },
  faixaConteudo: {
    paddingHorizontal: espaco.xl,
    paddingBottom: espaco.md,
    gap: espaco.md,
  },

  /* Chips de praia */
  chipPraia: {
    width: 156,
    borderRadius: raio.lg,
    overflow: 'hidden',
  },
  chipFundo: {
    padding: espaco.lg,
    gap: 4,
    minHeight: 168,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chipMinutosGrande: {
    position: 'absolute',
    right: 10,
    top: 4,
    fontFamily: fonts.display,
    fontSize: 64,
    lineHeight: 70,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.12)',
    letterSpacing: -3,
  },
  chipTopo: {
    marginBottom: 'auto',
  },
  chipNome: {
    fontFamily: fonts.display,
    fontSize: 17,
    lineHeight: 21,
    fontWeight: '600',
    color: colors.branco,
    marginTop: espaco.xl,
  },
  chipTempo: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.82)',
  },

  /* Faixa escura */
  faixaEscura: {
    marginTop: espaco.xxl,
    backgroundColor: colors.marProfundo,
    overflow: 'hidden',
  },
  faixaEscuraLua: {
    position: 'absolute',
    top: 60,
    right: -120,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(59, 179, 188, 0.10)',
  },
  faixaEscuraConteudo: {
    paddingVertical: espaco.xxl,
  },
  grade: {
    gap: espaco.md,
  },

  /* Faixa do hospede */
  faixaHospede: {
    backgroundColor: colors.areiaMedia,
    paddingTop: espaco.xl,
    paddingBottom: espaco.xxxl,
  },

  /* Contato */
  faixaContato: {
    backgroundColor: colors.aguaSuave,
  },
  secaoContato: {
    paddingBottom: espaco.xxl,
  },
});
