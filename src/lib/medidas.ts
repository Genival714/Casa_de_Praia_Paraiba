import { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';

/**
 * Largura real de um bloco, medida depois que ele é desenhado.
 *
 * Por que não `useWindowDimensions`: numa exportação estática ele devolve um
 * valor de mentira na geração da página e o valor verdadeiro só depois que o
 * JavaScript assume — o que faz o layout pular a cada carregamento. Medir o
 * próprio bloco não tem esse problema, e ainda dá a largura da coluna em vez
 * da largura da janela.
 *
 * Começa em 0 de propósito: o primeiro desenho deve ser o da versão estreita,
 * que é a que cabe em qualquer tela.
 */
export function useLarguraMedida() {
  const [largura, setLargura] = useState(0);

  const aoMedir = useCallback((evento: LayoutChangeEvent) => {
    const nova = evento.nativeEvent.layout.width;
    setLargura((atual) => (Math.abs(atual - nova) > 1 ? nova : atual));
  }, []);

  return { largura, aoMedir };
}
