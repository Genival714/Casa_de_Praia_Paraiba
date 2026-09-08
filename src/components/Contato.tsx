import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Botao, Cartao } from '@/components/Base';
import { Icone } from '@/components/Icone';
import { casa } from '@/data/casa';
import { abrirLink, urlTelefone, urlWhatsApp } from '@/lib/links';
import { colors, espaco, fonts, raio, sombras } from '@/theme';

/* -------------------------------------------------------------------------
 * BlocoContato — os anfitriões, com WhatsApp e ligação direta.
 * ----------------------------------------------------------------------- */
export function BlocoContato() {
  return (
    <View style={estilos.lista}>
      {casa.anfitrioes.map((anfitriao) => (
        <Cartao key={anfitriao.telefone} style={estilos.cartao}>
          <View style={estilos.identidade}>
            <View style={estilos.avatar}>
              <Text style={estilos.inicial}>{anfitriao.nome.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nome}>{anfitriao.nome}</Text>
              <Text style={estilos.papel}>{anfitriao.papel}</Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Ligar para ${anfitriao.nome}, ${anfitriao.telefone}`}
            onPress={() => abrirLink(urlTelefone(anfitriao.telefone))}
            style={({ pressed }) => [estilos.telefoneLinha, pressed && { opacity: 0.7 }]}
          >
            <Icone name="phone-outline" size={16} color={colors.mar} />
            <Text style={estilos.telefone}>{anfitriao.telefone}</Text>
          </Pressable>

          <Botao
            rotulo="Chamar no WhatsApp"
            icone="whatsapp"
            variante="whatsapp"
            acessibilidade={`Falar com ${anfitriao.nome} no WhatsApp`}
            onPress={() => abrirLink(urlWhatsApp(anfitriao.telefone, casa.mensagemWhatsApp))}
          />
        </Cartao>
      ))}
    </View>
  );
}

/* -------------------------------------------------------------------------
 * BotaoFlutuanteWhatsApp — sempre no canto, em todas as telas.
 * Quem escaneia o QR Code na parede precisa achar o contato sem procurar.
 * ----------------------------------------------------------------------- */
export function BotaoFlutuanteWhatsApp({ distanciaDaBase = 88 }: { distanciaDaBase?: number }) {
  const principal = casa.anfitrioes[0];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Falar com ${principal.nome} no WhatsApp para reservar`}
      onPress={() => abrirLink(urlWhatsApp(principal.telefone, casa.mensagemWhatsApp))}
      style={({ pressed }) => [
        estilos.flutuante,
        { bottom: distanciaDaBase },
        pressed && { transform: [{ scale: 0.94 }] },
      ]}
    >
      <Icone name="whatsapp" size={26} color={colors.branco} />
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: espaco.md,
  },
  cartao: {
    gap: espaco.md,
  },
  identidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.aguaSuave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    fontFamily: fonts.display,
    fontSize: 20,
    fontWeight: '700',
    color: colors.mar,
  },
  nome: {
    fontFamily: fonts.display,
    fontSize: 19,
    fontWeight: '600',
    color: colors.texto,
  },
  papel: {
    fontFamily: fonts.corpo,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textoClaro,
    marginTop: 1,
  },
  telefoneLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
    backgroundColor: colors.aguaSuave,
    borderRadius: raio.sm,
    paddingHorizontal: espaco.md,
    paddingVertical: 10,
  },
  telefone: {
    fontFamily: fonts.corpo,
    fontSize: 15,
    fontWeight: '700',
    color: colors.mar,
    letterSpacing: 0.2,
  },
  flutuante: {
    position: 'absolute',
    right: espaco.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.whatsapp,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombras.flutuante,
  },
});
