import { Link, usePathname } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, espaco, fonts, LARGURA_MAX, raio } from '@/theme';

/**
 * Faixa escura no topo, presente em todas as páginas.
 *
 * Mora FORA do ScrollView de cada tela (ver app/_layout.tsx). É isso que a
 * deixa sempre visível sem precisar de `position: sticky` — que não
 * funcionaria aqui, porque o ScrollViewStyleReset desliga a rolagem do body.
 *
 * Não tem borda nem sombra embaixo de propósito: ela precisa se fundir com o
 * CabecalhoDeTela da página e formar um bloco escuro só, como nos documentos
 * impressos do hóspede.
 */

type ItemDeMenu = {
  href: '/' | '/casa' | '/praias' | '/passeios' | '/sabores' | '/regras' | '/poco';
  rotulo: string;
  /** Páginas para quem já está hospedado — separadas visualmente das demais. */
  deHospede?: boolean;
};

const MENU: ItemDeMenu[] = [
  { href: '/', rotulo: 'Início' },
  { href: '/casa', rotulo: 'A Casa' },
  { href: '/praias', rotulo: 'Praias' },
  { href: '/passeios', rotulo: 'Passeios' },
  { href: '/sabores', rotulo: 'Sabores' },
  { href: '/regras', rotulo: 'Regras', deHospede: true },
  { href: '/poco', rotulo: 'Poço', deHospede: true },
];

export function Cabecalho() {
  const insets = useSafeAreaInsets();
  const caminho = usePathname();

  return (
    <View style={[estilos.faixa, { paddingTop: insets.top + espaco.md }]}>
      <View style={estilos.interno}>
        <Link href="/" asChild>
          <Pressable accessibilityRole="link" accessibilityLabel="Ir para o início">
            <Text style={estilos.marca}>
              Casa de Praia<Text style={estilos.ponto}>.</Text>
            </Text>
            <Text style={estilos.marcaApoio}>Praia do Amor · Conde/PB</Text>
          </Pressable>
        </Link>

        {/*
          A navegação sempre vive numa faixa rolável. No computador ela não
          transborda e parece uma linha comum; no celular, rola de lado com a
          última pílula cortada, que é a dica visual de que há mais.
          Assim não precisamos de nenhum ponto de quebra.
        */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.menu}
          style={estilos.menuExterno}
        >
          {MENU.map((item, i) => {
            const ativo = caminho === item.href;
            const primeiroDeHospede = item.deHospede && !MENU[i - 1]?.deHospede;

            return (
              <View key={item.href} style={estilos.grupoItem}>
                {primeiroDeHospede ? <View style={estilos.divisor} /> : null}
                <Link href={item.href} asChild>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityState={{ selected: ativo }}
                    accessibilityLabel={item.rotulo}
                    dataSet={{ pilula: 'true' }}
                    style={({ pressed }) => [
                      estilos.pilula,
                      item.deHospede && estilos.pilulaContorno,
                      ativo && estilos.pilulaAtiva,
                      pressed && { opacity: 0.75 },
                    ]}
                  >
                    <Text style={[estilos.rotulo, ativo && estilos.rotuloAtivo]}>
                      {item.rotulo}
                    </Text>
                  </Pressable>
                </Link>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  faixa: {
    backgroundColor: colors.marProfundo,
    paddingBottom: espaco.md,
  },
  interno: {
    width: '100%',
    maxWidth: LARGURA_MAX,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.lg,
    paddingLeft: espaco.xl,
  },
  marca: {
    fontFamily: fonts.display,
    fontSize: 20,
    fontWeight: '600',
    color: colors.branco,
    letterSpacing: -0.3,
  },
  ponto: {
    color: colors.falesia,
  },
  marcaApoio: {
    fontFamily: fonts.corpo,
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.3,
    marginTop: 1,
  },
  menuExterno: {
    flex: 1,
  },
  menu: {
    alignItems: 'center',
    gap: espaco.sm,
    paddingRight: espaco.xl,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  grupoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.sm,
  },
  divisor: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginHorizontal: espaco.xs,
  },
  pilula: {
    borderRadius: raio.pill,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: espaco.md,
    paddingVertical: 7,
  },
  pilulaContorno: {
    borderColor: 'rgba(255,255,255,0.28)',
  },
  pilulaAtiva: {
    backgroundColor: colors.falesia,
    borderColor: colors.falesia,
  },
  rotulo: {
    fontFamily: fonts.corpo,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.78)',
  },
  rotuloAtivo: {
    color: colors.branco,
  },
});
