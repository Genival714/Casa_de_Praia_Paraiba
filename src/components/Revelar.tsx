import { ReactNode, useEffect, useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { registrarRevelacao } from '@/lib/revelar';

/** Como o bloco entra. `surgeSuave` só muda a opacidade. */
export type TipoDeRevelacao = 'surge' | 'desliza' | 'cresce' | 'surgeSuave';

/**
 * Envolve um trecho para que ele surja ao entrar na tela.
 *
 * Onde já existe um componente nosso (Cartao, TituloSecao, Conteudo), prefira
 * a prop `anim` dele — evita empilhar Views só para animar.
 *
 * Atenção: nunca use em elemento que já tenha `transform` próprio, porque a
 * revelação termina em `transform: none` e apagaria o transform original.
 * Para esses casos existe o tipo `surgeSuave`.
 */
export function Revelar({
  children,
  tipo = 'surge',
  atraso,
  style,
}: {
  children: ReactNode;
  tipo?: TipoDeRevelacao;
  /** 1, 2 ou 3 — escalona a entrada de uma lista. */
  atraso?: 1 | 2 | 3;
  style?: StyleProp<ViewStyle>;
}) {
  const referencia = useRef<View>(null);

  useEffect(() => {
    registrarRevelacao(referencia.current);
  }, []);

  return (
    <View ref={referencia} dataSet={propsDeRevelacao(tipo, atraso)} style={style}>
      {children}
    </View>
  );
}

/** Monta o `dataSet` que o CSS de app/+html.tsx procura. */
export function propsDeRevelacao(tipo: TipoDeRevelacao = 'surge', atraso?: 1 | 2 | 3) {
  return atraso ? { anim: tipo, atraso: String(atraso) } : { anim: tipo };
}

/**
 * Hook para os componentes que já têm uma View própria e só querem participar
 * da revelação, sem ganhar um invólucro.
 */
export function useRevelacao(ativo: boolean) {
  const referencia = useRef<View>(null);

  useEffect(() => {
    if (ativo) registrarRevelacao(referencia.current);
  }, [ativo]);

  return referencia;
}
