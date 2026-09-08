import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ColorValue, StyleProp, TextStyle } from 'react-native';

import type { NomeDeIcone } from '@/lib/glifos';

export type { NomeDeIcone };

export type PropsDoIcone = {
  name: NomeDeIcone;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
};

/**
 * Icone no aplicativo nativo.
 *
 * Aqui nao existe HTML entregue por um servidor, entao o componente original
 * serve bem: ele mesmo cuida de carregar a fonte. A versao da web fica em
 * `Icone.web.tsx`, e o empacotador escolhe sozinho qual usar.
 */
export function Icone({ name, size = 20, color, style }: PropsDoIcone) {
  return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />;
}
