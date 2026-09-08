import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Botao, Cartao, Conteudo, Onda, TituloSecao } from '@/components/Base';
import { BlocoContato } from '@/components/Contato';
import { Foto } from '@/components/Foto';
import { Icone, type NomeDeIcone } from '@/components/Icone';
import { casa, comodidades, galeria } from '@/data/casa';
import { praiasEmDestaque } from '@/data/praias';
import { ICONES_COMODIDADE } from '@/lib/icones';
import { abrirLink, urlRotaGoogleMaps, urlWhatsApp } from '@/lib/links';
import { colors, espaco, fonts, LARGURA_MAX, raio } from '@/theme';

export default function TelaInicio() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView
      style={estilos.tela}
      contentContainerStyle={estilos.conteudo}
      showsVerticalScrollIndicator={false}
    >
      {/* ---------------------------------------------------------------
          Capa
      --------------------------------------------------------------- */}
      <LinearGradient
        colors={[colors.marProfundo, colors.mar, colors.marClaro]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[estilos.capa, { paddingTop: insets.top + 40 }]}
      >
        <View style={estilos.sol} />
        <View style={estilos.solHalo} />

        <Conteudo>
          <Text style={estilos.sobrancelhaCapa}>Casa de temporada · Conde — PB</Text>
          <Text style={estilos.tituloCapa}>{casa.chamada}</Text>
          <Text style={estilos.textoCapa}>{casa.subchamada}</Text>

          <View style={estilos.localizacao}>
            <Icone name="map-marker-outline" size={16} color={colors.agua} />
            <Text style={estilos.localizacaoTexto}>{casa.endereco.completo}</Text>
          </View>

          <View style={estilos.acoesCapa}>
            <Botao
              rotulo="Reservar no WhatsApp"
              icone="whatsapp"
              variante="whatsapp"
              style={{ flex: 1, minWidth: 200 }}
              onPress={() =>
                abrirLink(urlWhatsApp(casa.anfitrioes[0].telefone, casa.mensagemWhatsApp))
              }
            />
            <Botao
              rotulo="Como chegar"
              icone="map-marker-radius-outline"
              variante="vidro"
              style={{ flex: 1, minWidth: 150 }}
              onPress={() => abrirLink(urlRotaGoogleMaps(casa.destino))}
            />
          </View>
        </Conteudo>

        <Onda cor={colors.areia} altura={48} />
      </LinearGradient>

      {/* ---------------------------------------------------------------
          Frase de impacto
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <View style={estilos.citacao}>
          <Icone name="format-quote-open" size={26} color={colors.porDoSol} />
          <Text style={estilos.citacaoTexto}>{casa.fraseImpacto}</Text>
        </View>
      </Conteudo>

      {/* ---------------------------------------------------------------
          O que a casa tem
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="A casa"
          titulo="Tudo pronto para a sua temporada"
          apoio="Toda mobiliada, com área de lazer completa. É só chegar com a mala."
        />
      </Conteudo>

      <FaixaRolante>
        {comodidades.slice(0, 6).map((item) => (
          <View key={item.titulo} style={estilos.destaqueCurto}>
            <Icone name={ICONES_COMODIDADE[item.icone]} size={22} color={colors.mar} />
            <Text style={estilos.destaqueTitulo}>{item.titulo}</Text>
            <Text style={estilos.destaqueDetalhe}>{item.detalhe}</Text>
          </View>
        ))}
      </FaixaRolante>

      <FaixaRolante>
        {galeria.slice(0, 5).map((foto) => (
          <Foto
            key={foto.arquivo}
            arquivo={foto.arquivo}
            legenda={foto.legenda}
            altura={190}
            style={estilos.fotoDaFaixa}
          />
        ))}
      </FaixaRolante>

      <Conteudo style={estilos.secaoCurta}>
        <Botao
          rotulo="Ver a casa por dentro"
          icone="arrow-right"
          variante="contorno"
          onPress={() => router.push('/casa')}
        />
      </Conteudo>

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
        {praiasEmDestaque.map((praia) => (
          <Pressable
            key={praia.id}
            onPress={() => router.push('/praias')}
            accessibilityRole="button"
            accessibilityLabel={`Ver ${praia.nome} na lista de praias`}
            style={({ pressed }) => [estilos.chipPraia, pressed && { opacity: 0.85 }]}
          >
            <LinearGradient
              colors={
                praia.ehACasa
                  ? [colors.coqueiro, '#1F5C41']
                  : [colors.marClaro, colors.mar]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={estilos.chipFundo}
            >
              <Icone
                name={praia.ehACasa ? 'home-heart' : 'beach'}
                size={20}
                color={colors.branco}
              />
              <Text style={estilos.chipNome} numberOfLines={2}>
                {praia.nome}
              </Text>
              <Text style={estilos.chipTempo}>
                {praia.minutosDeCarro <= 0 ? 'A praia da casa' : `${praia.minutosDeCarro} min`}
              </Text>
            </LinearGradient>
          </Pressable>
        ))}
      </FaixaRolante>

      {/* ---------------------------------------------------------------
          Navegacao para as demais telas
      --------------------------------------------------------------- */}
      <Conteudo style={estilos.secao}>
        <TituloSecao
          sobrancelha="Guia do anfitrião"
          titulo="O que fazer por aqui"
          apoio="Nossas indicações pessoais, com rota pronta para o Google Maps e o Waze."
        />

        <View style={estilos.grade}>
          <CartaoDeAtalho
            icone="beach"
            titulo="Praias"
            texto="Ranking do Litoral Sul e do Litoral Norte"
            onPress={() => router.push('/praias')}
          />
          <CartaoDeAtalho
            icone="binoculars"
            titulo="Passeios e mirantes"
            texto="As vistas que valem a subida"
            onPress={() => router.push('/passeios')}
          />
          <CartaoDeAtalho
            icone="silverware-fork-knife"
            titulo="Sabores"
            texto="Onde comer bem no litoral"
            onPress={() => router.push('/sabores')}
          />
        </View>
      </Conteudo>

      {/* ---------------------------------------------------------------
          Contato
      --------------------------------------------------------------- */}
      <View style={estilos.faixaContato}>
        <Onda cor={colors.areia} invertida altura={40} />
        <Conteudo style={estilos.secaoContato}>
          <TituloSecao
            sobrancelha="Reservas"
            titulo="Fale com a gente"
            apoio="Tire dúvidas sobre disponibilidade, valores e a estadia. Respondemos pelo WhatsApp."
          />
          <BlocoContato />
        </Conteudo>
      </View>

      <Conteudo style={estilos.rodape}>
        <Text style={estilos.rodapeTexto}>
          {casa.nome}{'\n'}
          {casa.endereco.completo}
        </Text>
      </Conteudo>
    </ScrollView>
  );
}

/* ------------------------------------------------------------------------- */

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

function CartaoDeAtalho({
  icone,
  titulo,
  texto,
  onPress,
}: {
  icone: NomeDeIcone;
  titulo: string;
  texto: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${titulo}: ${texto}`}
      style={({ pressed }) => [pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] }]}
    >
      <Cartao style={estilos.atalho}>
        <View style={estilos.atalhoIcone}>
          <Icone name={icone} size={20} color={colors.mar} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={estilos.atalhoTitulo}>{titulo}</Text>
          <Text style={estilos.atalhoTexto}>{texto}</Text>
        </View>
        <Icone name="chevron-right" size={22} color={colors.textoClaro} />
      </Cartao>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: colors.areia,
  },
  conteudo: {
    paddingBottom: 120,
  },

  /* Capa */
  capa: {
    paddingBottom: 0,
    overflow: 'hidden',
  },
  sol: {
    position: 'absolute',
    top: 54,
    right: -34,
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: 'rgba(255, 226, 178, 0.26)',
  },
  solHalo: {
    position: 'absolute',
    top: 14,
    right: -74,
    width: 212,
    height: 212,
    borderRadius: 106,
    backgroundColor: 'rgba(255, 226, 178, 0.11)',
  },
  sobrancelhaCapa: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colors.agua,
    marginBottom: espaco.md,
  },
  tituloCapa: {
    fontFamily: fonts.display,
    fontSize: 40,
    lineHeight: 45,
    fontWeight: '600',
    color: colors.branco,
    letterSpacing: -1,
  },
  textoCapa: {
    fontFamily: fonts.corpo,
    fontSize: 16,
    lineHeight: 25,
    color: 'rgba(255,255,255,0.9)',
    marginTop: espaco.md,
    maxWidth: 460,
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
    color: 'rgba(255,255,255,0.82)',
  },
  acoesCapa: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaco.sm,
    marginTop: espaco.xl,
    marginBottom: espaco.xxl,
  },

  /* Secoes */
  secao: {
    marginTop: espaco.xxl,
  },
  secaoCurta: {
    marginTop: espaco.lg,
  },
  citacao: {
    flexDirection: 'row',
    gap: espaco.md,
    backgroundColor: '#FFF3EE',
    borderLeftWidth: 3,
    borderLeftColor: colors.porDoSol,
    borderRadius: raio.md,
    padding: espaco.lg,
  },
  citacaoTexto: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 17,
    lineHeight: 26,
    color: '#7B3A22',
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
    gap: espaco.md,
  },
  destaqueCurto: {
    width: 150,
    gap: 5,
    backgroundColor: colors.papel,
    borderRadius: raio.md,
    borderWidth: 1,
    borderColor: colors.borda,
    padding: espaco.lg,
  },
  destaqueTitulo: {
    fontFamily: fonts.corpo,
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.texto,
    marginTop: 2,
  },
  destaqueDetalhe: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.textoClaro,
  },
  fotoDaFaixa: {
    width: 268,
  },

  /* Chips de praia */
  chipPraia: {
    width: 132,
    borderRadius: raio.md,
    overflow: 'hidden',
  },
  chipFundo: {
    padding: espaco.lg,
    gap: 6,
    minHeight: 132,
    justifyContent: 'flex-end',
  },
  chipNome: {
    fontFamily: fonts.display,
    fontSize: 15.5,
    lineHeight: 19,
    fontWeight: '600',
    color: colors.branco,
  },
  chipTempo: {
    fontFamily: fonts.corpo,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },

  /* Atalhos */
  grade: {
    gap: espaco.md,
  },
  atalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
  },
  atalhoIcone: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: colors.aguaSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atalhoTitulo: {
    fontFamily: fonts.display,
    fontSize: 17,
    fontWeight: '600',
    color: colors.texto,
  },
  atalhoTexto: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textoClaro,
    marginTop: 2,
  },

  /* Contato */
  faixaContato: {
    marginTop: espaco.xxxl,
    backgroundColor: colors.aguaSuave,
  },
  secaoContato: {
    paddingBottom: espaco.xxl,
  },
  rodape: {
    marginTop: espaco.xl,
    alignItems: 'center',
  },
  rodapeTexto: {
    fontFamily: fonts.corpo,
    fontSize: 12.5,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textoClaro,
  },
});
