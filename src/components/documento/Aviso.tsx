import { StyleSheet, Text, View } from 'react-native';

import { Icone, type NomeDeIcone } from '@/components/Icone';
import { colors, espaco, raio, fonts } from '@/theme';

/**
 * Caixa de aviso dos documentos impressos.
 *
 * `atencao` é o laranja de "espere 5 minutos antes de ligar de novo".
 * `perigo` é o vermelho de coisa que machuca.
 */
export function Aviso({
  texto,
  tom = 'atencao',
  icone,
}: {
  texto: string;
  tom?: 'atencao' | 'perigo';
  icone?: NomeDeIcone;
}) {
  const tons = {
    atencao: { fundo: colors.avisoFundo, texto: colors.avisoTexto },
    perigo: { fundo: colors.naoFundo, texto: colors.vermelho },
  } as const;
  const t = tons[tom];

  return (
    <View style={[estilos.caixa, { backgroundColor: t.fundo }]}>
      {icone ? <Icone name={icone} size={20} color={t.texto} /> : null}
      <Text style={[estilos.texto, { color: t.texto }]}>{texto}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: espaco.md,
    borderRadius: raio.md,
    paddingVertical: espaco.lg,
    paddingHorizontal: espaco.lg,
  },
  texto: {
    flex: 1,
    fontFamily: fonts.corpo,
    fontSize: 15.5,
    lineHeight: 23,
    fontWeight: '600',
  },
});
