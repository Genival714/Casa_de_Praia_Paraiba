import { StyleProp, Text, TextStyle, type ColorValue } from 'react-native';

import { GLIFOS, type NomeDeIcone } from '@/lib/glifos';

export type { NomeDeIcone };

export type PropsDoIcone = {
  name: NomeDeIcone;
  size?: number;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
};

/**
 * Icone na web.
 *
 * Escrevemos o caractere do icone direto, em vez de usar o componente do
 * `@expo/vector-icons`. O componente de la so desenha o icone depois de
 * confirmar que a fonte carregou, e ate la devolve um texto vazio. Como o
 * site e gerado como HTML estatico, o servidor entregaria os icones vazios
 * e o navegador os preencheria em seguida — o React percebe a diferenca,
 * joga fora o HTML pronto e redesenha a tela inteira. A pagina piscaria ao
 * abrir.
 *
 * Aqui o resultado e sempre o mesmo dos dois lados. A fonte e declarada no
 * `@font-face` de `app/+html.tsx` e servida a partir de `public/fontes/`.
 */
export function Icone({ name, size = 20, color, style }: PropsDoIcone) {
  const ponto = GLIFOS[name as string];

  return (
    <Text
      selectable={false}
      // O icone e decorativo: quem usa leitor de tela ja recebe o texto ao lado.
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          fontFamily: 'material-community',
          fontSize: size,
          lineHeight: size,
          height: size,
          color,
        },
        style,
      ]}
    >
      {typeof ponto === 'number' ? String.fromCodePoint(ponto) : ''}
    </Text>
  );
}
