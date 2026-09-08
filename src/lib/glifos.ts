import glifos from '@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json';

/**
 * A tabela que liga o nome do icone ao caractere dele dentro da fonte.
 *
 * Importamos so este JSON, e nao o pacote `@expo/vector-icons` inteiro:
 * o pacote traz junto os arquivos de fonte de TODAS as familias de icones
 * (FontAwesome, Ionicons e companhia), e o empacotador copia cada um deles
 * para a pasta publicada — cinco megabytes de arquivos que ninguem baixa.
 */
export const GLIFOS: Record<string, number> = glifos;

export type NomeDeIcone = keyof typeof glifos;
