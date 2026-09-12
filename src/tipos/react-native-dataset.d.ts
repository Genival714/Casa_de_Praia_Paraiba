/**
 * O react-native-web converte a prop `dataSet` em atributos `data-*` no HTML
 * (veja node_modules/react-native-web/dist/modules/createDOMProps/index.js,
 * "dataSet replaced with data-*"). É a ponte que deixa o CSS injetado em
 * app/+html.tsx enxergar os componentes — usada pela revelação ao rolar e
 * pelo hover dos cartões.
 *
 * Só que os tipos do React Native não declaram essa prop, porque no app
 * nativo ela não existe. Este arquivo preenche a lacuna.
 *
 * No nativo a prop é simplesmente ignorada.
 */
import 'react-native';

type Dados = Record<string, string | number | boolean | undefined>;

declare module 'react-native' {
  interface ViewProps {
    dataSet?: Dados;
  }
  interface TextProps {
    dataSet?: Dados;
  }
  interface PressableProps {
    dataSet?: Dados;
  }
  interface ImageProps {
    dataSet?: Dados;
  }
  interface ScrollViewProps {
    dataSet?: Dados;
  }

  /**
   * O react-native-web também aceita algumas propriedades de CSS direto no
   * estilo. Usamos só as de transição, para suavizar toque e hover.
   * No app nativo elas são ignoradas.
   */
  interface ViewStyle {
    transitionProperty?: string;
    transitionDuration?: string;
    transitionTimingFunction?: string;
    transitionDelay?: string;
  }
}
