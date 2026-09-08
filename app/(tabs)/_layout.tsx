import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View, type ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BotaoFlutuanteWhatsApp } from '@/components/Contato';
import { Icone, type NomeDeIcone } from '@/components/Icone';
import { colors, fonts } from '@/theme';

const ALTURA_BARRA = 62;

export default function LayoutAbas() {
  const insets = useSafeAreaInsets();
  const alturaTotalDaBarra = ALTURA_BARRA + insets.bottom;

  return (
    <View style={estilos.raiz}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.mar,
          tabBarInactiveTintColor: colors.textoClaro,
          sceneStyle: { backgroundColor: colors.areia },
          tabBarStyle: [estilos.barra, { height: alturaTotalDaBarra, paddingBottom: insets.bottom }],
          tabBarLabelStyle: estilos.rotulo,
          tabBarItemStyle: estilos.item,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: (props) => <IconeAba nome="home-variant" {...props} />,
          }}
        />
        <Tabs.Screen
          name="casa"
          options={{
            title: 'A Casa',
            tabBarIcon: (props) => <IconeAba nome="sofa-outline" {...props} />,
          }}
        />
        <Tabs.Screen
          name="praias"
          options={{
            title: 'Praias',
            tabBarIcon: (props) => <IconeAba nome="beach" {...props} />,
          }}
        />
        <Tabs.Screen
          name="passeios"
          options={{
            title: 'Passeios',
            tabBarIcon: (props) => <IconeAba nome="binoculars" {...props} />,
          }}
        />
        <Tabs.Screen
          name="sabores"
          options={{
            title: 'Sabores',
            tabBarIcon: (props) => <IconeAba nome="silverware-fork-knife" {...props} />,
          }}
        />
      </Tabs>

      <BotaoFlutuanteWhatsApp distanciaDaBase={alturaTotalDaBarra + 16} />
    </View>
  );
}

function IconeAba({ nome, color, size }: { nome: NomeDeIcone; color: ColorValue; size: number }) {
  return <Icone name={nome} size={size - 1} color={color} />;
}

const estilos = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: colors.areia,
  },
  barra: {
    backgroundColor: colors.papel,
    borderTopWidth: 1,
    borderTopColor: colors.borda,
    paddingTop: 8,
    ...Platform.select({
      web: { boxShadow: '0 -6px 24px rgba(6, 58, 79, 0.07)' },
      default: {
        shadowColor: colors.marProfundo,
        shadowOpacity: 0.08,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: -4 },
        elevation: 12,
      },
    }),
  },
  item: {
    paddingTop: 2,
  },
  rotulo: {
    fontFamily: fonts.corpo,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
