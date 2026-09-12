import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Cabecalho } from '@/components/Cabecalho';
import { BotaoFlutuanteWhatsApp } from '@/components/Contato';
import { colors, espaco } from '@/theme';

export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Moldura />
    </SafeAreaProvider>
  );
}

/**
 * A moldura fixa do site: cabeçalho em cima, página no meio, botão do
 * WhatsApp por cima de tudo.
 *
 * O cabeçalho fica fora do <Stack> — ou seja, fora do ScrollView de cada
 * tela — então ele nunca rola. É por isso que não precisamos de
 * `position: sticky`, que aqui não funcionaria: o ScrollViewStyleReset
 * desliga a rolagem do body e quem rola é o ScrollView de dentro.
 *
 * Precisa ser um componente separado porque `useSafeAreaInsets` só funciona
 * dentro do SafeAreaProvider.
 */
function Moldura() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.areia }}>
      <Cabecalho />

      <View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: colors.areia },
          }}
        >
          <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
        </Stack>
      </View>

      <BotaoFlutuanteWhatsApp distanciaDaBase={espaco.xl + insets.bottom} />
    </View>
  );
}
