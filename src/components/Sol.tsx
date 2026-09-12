import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

/**
 * Sol — o disco de luz das faixas escuras, vivo: acende, se espalha e
 * recolhe num ritmo lento de respiração.
 *
 * São três camadas concêntricas, de trás para frente:
 *   halo   — água, bem aberto, respira devagar e fora de fase com o resto;
 *   brilho — quente e difuso, é o que "pulsa" e ilumina em volta;
 *   núcleo — o disco em si, que clareia junto com o brilho.
 *
 * Aqui só existem os discos chapados. O degradê radial, o movimento e as
 * fases ficam no CSS de app/+html.tsx, presos aos atributos `data-sol`,
 * `data-tom` e `data-fase` — no app nativo os discos ficam parados, como
 * sempre foram.
 */
type TomDoSol = 'dia' | 'poente';

const CORES: Record<TomDoSol, { nucleo: string; brilho: string }> = {
  dia: { nucleo: 'rgba(255, 226, 178, 0.18)', brilho: 'rgba(255, 210, 140, 0.06)' },
  poente: { nucleo: 'rgba(201, 106, 49, 0.14)', brilho: 'rgba(217, 128, 85, 0.05)' },
};

const COR_DO_HALO = 'rgba(59, 179, 188, 0.10)';

export function Sol({
  tamanho = 128,
  tom = 'dia',
  halo = true,
  fase = 0,
  style,
}: {
  /** Diâmetro do núcleo; o brilho e o halo são proporcionais a ele. */
  tamanho?: number;
  /** `dia` é amarelo-claro; `poente` puxa para a falésia. */
  tom?: TomDoSol;
  /** Halo água, bem aberto, atrás de tudo. */
  halo?: boolean;
  /** 0 a 3 — sóis na mesma tela com fases diferentes não respiram juntos. */
  fase?: 0 | 1 | 2 | 3;
  /** Posição (top/right/bottom/left) dentro da faixa. */
  style?: StyleProp<ViewStyle>;
}) {
  const camada = (medida: number): ViewStyle => ({
    position: 'absolute',
    width: medida,
    height: medida,
    borderRadius: medida / 2,
    // Centrada no núcleo.
    top: (tamanho - medida) / 2,
    left: (tamanho - medida) / 2,
  });

  const dados = (nome: 'halo' | 'brilho' | 'nucleo') => ({ sol: nome, tom, fase: String(fase) });

  return (
    <View style={[estilos.sol, { width: tamanho, height: tamanho }, style]}>
      {halo ? (
        <View dataSet={dados('halo')} style={[camada(tamanho * 2), { backgroundColor: COR_DO_HALO }]} />
      ) : null}
      <View
        dataSet={dados('brilho')}
        style={[camada(tamanho * 2.4), { backgroundColor: CORES[tom].brilho }]}
      />
      <View dataSet={dados('nucleo')} style={[camada(tamanho), { backgroundColor: CORES[tom].nucleo }]} />
    </View>
  );
}

const estilos = StyleSheet.create({
  sol: {
    position: 'absolute',
    // Só decoração: nunca pode ficar no caminho de um toque.
    pointerEvents: 'none',
  },
});
