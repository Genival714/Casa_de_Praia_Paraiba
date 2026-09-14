import { LinearGradient } from 'expo-linear-gradient';
import { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  FrameInfo,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useFrameCallback,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated';

/**
 * Faixa horizontal que anda sozinha, sem fim — é o menu do cabeçalho.
 *
 * O problema que ela resolve: no celular o menu não cabe inteiro e as últimas
 * abas ficam escondidas à direita. Quem não arrasta nunca descobre que elas
 * existem. Aqui a faixa passa devagar, como um letreiro, e mostra todas.
 *
 * Como funciona:
 *   - Enquanto tudo cabe (computador), é uma linha comum: nada se move.
 *   - Quando transborda, a lista é desenhada três vezes seguidas e um relógio
 *     de quadro (useFrameCallback) empurra a rolagem alguns pixels por quadro,
 *     na thread de interface. Ao passar do fim da segunda cópia, volta um
 *     ciclo inteiro para trás — as cópias são idênticas, então o olho não vê
 *     a emenda. É isso que faz parecer infinita.
 *   - Qualquer toque, arrasto, mouse por cima ou foco de teclado pausa na
 *     hora, para a pílula que a pessoa viu ser a que ela acerta. A faixa
 *     retoma sozinha um pouco depois que ela solta.
 *   - Quem pede menos movimento no sistema vê a faixa parada, rolável à mão,
 *     como sempre foi — só com a ponta esmaecida avisando que há mais.
 *
 * A rolagem continua sendo a nativa do ScrollView: arrastar, inércia e roda
 * do mouse funcionam como em qualquer lista, e o foco do teclado traz a
 * pílula para a vista sozinho. O Reanimated só entra para empurrar.
 */

/** Pixels por segundo que a faixa anda sozinha. */
const VELOCIDADE = 36;
/** Quanto tempo depois do último toque ou rolagem a faixa volta a andar. */
const RETOMAR_APOS = 2800;
/** Pausa antes do primeiro movimento, para a página assentar. */
const ESPERA_INICIAL = 1400;
/** Cópias da lista. A do meio é a "de verdade"; as pontas dão folga para arrastar. */
const COPIAS = 3;
const COPIA_PRINCIPAL = 1;

type Copia = { clone: boolean };
type Segurando = 'toque' | 'ponteiro' | 'foco';

export function FaixaInfinita({
  children,
  separador,
  espacamento = 0,
  corDoFundo,
  style,
  contentContainerStyle,
}: {
  /**
   * Desenha os itens de uma cópia da lista. `clone` é verdadeiro nas cópias
   * de apoio: elas ficam fora da árvore de acessibilidade (o leitor de tela
   * não anuncia o menu três vezes) e os itens devem sair da ordem do
   * teclado — passe `tabIndex={clone ? -1 : undefined}` para eles.
   */
  children: (copia: Copia) => ReactNode;
  /** Vai entre uma volta e a próxima; só aparece no modo infinito. */
  separador?: ReactNode;
  /** Espaço entre os itens de uma cópia. */
  espacamento?: number;
  /** Cor do fundo em #RRGGBB, para o degradê que esmaece as pontas. */
  corDoFundo: `#${string}`;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  const menosMovimento = useReducedMotion();
  const referencia = useAnimatedRef<Animated.ScrollView>();

  const [modo, setModo] = useState<'linha' | 'infinito'>('linha');
  const [transborda, setTransborda] = useState(false);
  const infinito = modo === 'infinito';

  /* Medidas, no JavaScript. */
  const medidas = useRef({ janela: 0, conteudo: 0, ciclo: 0 });
  const posicaoDasCopias = useRef<number[]>([]);
  const segurando = useRef<Record<Segurando, boolean>>({ toque: false, ponteiro: false, foco: false });
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const avaliacao = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Estado do movimento, na thread de interface. */
  const deslocamento = useSharedValue(0); // onde a rolagem está
  const ciclo = useSharedValue(0); // largura de uma volta: cópia + separador
  const pausado = useSharedValue(true);
  const ultimaRolagem = useSharedValue(0);

  /* --- O motor -------------------------------------------------------- */

  const andar = useCallback(
    (quadro: FrameInfo) => {
      'worklet';
      if (pausado.value || ciclo.value <= 0) return;
      // Voltando de uma aba em segundo plano o intervalo pode ser enorme;
      // limita para a faixa não dar um salto.
      const segundos = Math.min(quadro.timeSincePreviousFrame ?? 16, 64) / 1000;
      let x = deslocamento.value + VELOCIDADE * segundos;
      if (x >= ciclo.value * 2) x -= ciclo.value;
      deslocamento.value = x;
      scrollTo(referencia, x, 0, false);
    },
    [ciclo, deslocamento, pausado, referencia],
  );

  // O relógio só roda no modo infinito. Ligamos à mão porque o `autostart`
  // do hook só vale na primeira renderização.
  const relogio = useFrameCallback(andar, false);
  useEffect(() => {
    relogio.setActive(infinito);
  }, [infinito, relogio]);

  const aoRolar = useAnimatedScrollHandler({
    onScroll: (evento) => {
      // Rolagem nossa (a faixa andando) não interessa; só a da pessoa.
      if (!pausado.value) return;
      deslocamento.value = evento.contentOffset.x;
      ultimaRolagem.value = Date.now();
    },
    // No app nativo o arrasto chega por aqui, direto na thread de interface,
    // sem esperar a volta pelo JavaScript.
    onBeginDrag: () => {
      pausado.value = true;
      ultimaRolagem.value = Date.now();
    },
  });

  /* --- Pausa e retomada ------------------------------------------------ */

  function cancelarTemporizador() {
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = null;
  }

  function agendarRetomada(espera: number) {
    cancelarTemporizador();
    temporizador.current = setTimeout(tentarRetomar, espera);
  }

  function segurar(motivo: Segurando) {
    segurando.current[motivo] = true;
    pausado.value = true;
    cancelarTemporizador();
  }

  function soltar(motivo: Segurando) {
    segurando.current[motivo] = false;
    ultimaRolagem.value = Date.now();
    agendarRetomada(RETOMAR_APOS);
  }

  function tentarRetomar() {
    temporizador.current = null;
    const { toque, ponteiro, foco } = segurando.current;
    if (toque || ponteiro || foco) return; // quem soltar por último agenda de novo
    // A inércia do arrasto ainda pode estar rolando: espera assentar.
    const quietoHa = Date.now() - ultimaRolagem.value;
    if (quietoHa < RETOMAR_APOS) {
      agendarRetomada(RETOMAR_APOS - quietoHa);
      return;
    }
    retomar();
  }

  function retomar() {
    const c = medidas.current.ciclo;
    if (c <= 0) return;
    // Volta para a cópia do meio antes de andar, para ter folga dos dois
    // lados. Como as cópias são iguais, pular um ciclo inteiro não muda nada
    // do que se vê.
    const x = deslocamento.value;
    const dentro = c + ((((x - c) % c) + c) % c);
    if (Math.abs(dentro - x) > 0.5) {
      deslocamento.value = dentro;
      referencia.current?.scrollTo({ x: dentro, animated: false });
    }
    pausado.value = false;
  }

  useEffect(
    () => () => {
      cancelarTemporizador();
      if (avaliacao.current) clearTimeout(avaliacao.current);
    },
    [],
  );

  /* --- Medidas: quando ligar e desligar -------------------------------- */

  // A largura da janela e a do conteúdo chegam por eventos separados, em
  // ordem imprevisível. Avaliar na hora, com uma medida nova e outra velha,
  // erra (uma janela que encolheu mas ainda cabe pareceria transbordar).
  // Por isso a avaliação espera um instante, até as duas terem chegado.
  function agendarAvaliacao() {
    if (avaliacao.current) clearTimeout(avaliacao.current);
    avaliacao.current = setTimeout(avaliar, 80);
  }

  function avaliar() {
    avaliacao.current = null;
    const { janela, conteudo } = medidas.current;
    if (janela <= 0 || conteudo <= 0) return;
    const sobra = conteudo > janela + 1;
    setTransborda(sobra);
    if (sobra && !menosMovimento) setModo('infinito');
  }

  function desligar() {
    cancelarTemporizador();
    pausado.value = true;
    ciclo.value = 0;
    deslocamento.value = 0;
    medidas.current.ciclo = 0;
    // O conteúdo vai encolher para uma cópia só e ser medido de novo.
    medidas.current.conteudo = 0;
    posicaoDasCopias.current = [];
    referencia.current?.scrollTo({ x: 0, animated: false });
    setModo('linha');
  }

  function aoMedirJanela(evento: LayoutChangeEvent) {
    const largura = evento.nativeEvent.layout.width;
    if (Math.abs(largura - medidas.current.janela) < 1) return;
    const mudou = medidas.current.janela > 0;
    medidas.current.janela = largura;
    // Girou o celular ou redimensionou a janela: volta à linha simples e mede
    // tudo de novo — é mais simples que corrigir as contas no meio do caminho.
    if (mudou && infinito) desligar();
    agendarAvaliacao();
  }

  function aoMedirConteudo(largura: number) {
    // No modo infinito o conteúdo é o triplo; só a linha simples diz se cabe.
    if (infinito) return;
    medidas.current.conteudo = largura;
    agendarAvaliacao();
  }

  function aoMedirCopia(indice: number, evento: LayoutChangeEvent) {
    posicaoDasCopias.current[indice] = evento.nativeEvent.layout.x;
    // Mede pela segunda e pela terceira cópia, não pela primeira: na web o
    // onLayout só dispara quando o tamanho de um nó muda, e a primeira cópia
    // já existia antes de ligar o modo infinito, do mesmo tamanho — ela nunca
    // seria medida. As outras duas nascem na troca de modo.
    const segunda = posicaoDasCopias.current[COPIA_PRINCIPAL];
    const terceira = posicaoDasCopias.current[COPIA_PRINCIPAL + 1];
    if (segunda === undefined || terceira === undefined) return;

    // A distância entre o começo de uma cópia e o da seguinte já inclui o
    // separador e os espaços — é o ciclo exato, sem contas com padding.
    const novoCiclo = terceira - segunda;
    if (novoCiclo <= 0 || Math.abs(novoCiclo - medidas.current.ciclo) < 0.5) return;
    const primeiraVez = medidas.current.ciclo === 0;
    medidas.current.ciclo = novoCiclo;
    ciclo.value = novoCiclo;
    if (primeiraVez) iniciar(novoCiclo);
  }

  function iniciar(c: number) {
    // Começa na cópia do meio: mesma imagem da linha simples, mas com folga
    // para arrastar para os dois lados.
    deslocamento.value = c;
    referencia.current?.scrollTo({ x: c, animated: false });
    agendarRetomada(ESPERA_INICIAL);
  }

  /* --- Desenho ---------------------------------------------------------- */

  return (
    <View
      style={[estilos.moldura, style]}
      // O toque já é tratado abaixo; aqui é só o mouse (e a caneta) parado em cima.
      onPointerEnter={(e) => {
        if (e.nativeEvent.pointerType !== 'touch') segurar('ponteiro');
      }}
      onPointerLeave={() => soltar('ponteiro')}
      // Na web o foco dos itens borbulha até aqui; o navegador rola a pílula
      // focada para a vista, e a faixa espera enquanto isso. Só o foco de
      // teclado conta: um toque também deixa o link focado, e por ele a faixa
      // ficaria travada até a pessoa tocar em outro lugar.
      onFocus={(e) => {
        if (focoDeTeclado(e.nativeEvent.target)) segurar('foco');
      }}
      onBlur={() => soltar('foco')}
    >
      <Animated.ScrollView
        ref={referencia}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={aoRolar}
        onLayout={aoMedirJanela}
        onContentSizeChange={aoMedirConteudo}
        onTouchStart={() => segurar('toque')}
        onTouchEnd={() => soltar('toque')}
        onTouchCancel={() => soltar('toque')}
        contentContainerStyle={contentContainerStyle}
      >
        {Array.from({ length: infinito ? COPIAS : 1 }, (_, indice) => {
          const clone = infinito && indice !== COPIA_PRINCIPAL;
          return (
            <Fragment key={indice}>
              <View
                aria-hidden={clone}
                onLayout={infinito && indice > 0 ? (evento) => aoMedirCopia(indice, evento) : undefined}
                style={[estilos.copia, { gap: espacamento }]}
              >
                {children({ clone })}
              </View>
              {infinito ? separador : null}
            </Fragment>
          );
        })}
      </Animated.ScrollView>

      {infinito ? <Esmaecer lado="esquerda" cor={corDoFundo} /> : null}
      {transborda ? <Esmaecer lado="direita" cor={corDoFundo} /> : null}
    </View>
  );
}

/**
 * O foco veio do teclado? Na web, `:focus-visible` é exatamente essa
 * distinção, feita pelo próprio navegador. Fora dela (app nativo) não há como
 * saber, e aí qualquer foco conta.
 */
function focoDeTeclado(alvo: unknown) {
  const elemento = alvo as { matches?: (seletor: string) => boolean } | null;
  if (!elemento || typeof elemento.matches !== 'function') return true;
  try {
    return elemento.matches(':focus-visible');
  } catch {
    return true; // navegador antigo, sem :focus-visible
  }
}

/**
 * Degradê da cor do fundo para o transparente, por cima da ponta da faixa.
 * Esconde o corte seco das pílulas e sugere que a fila continua.
 */
function Esmaecer({ lado, cor }: { lado: 'esquerda' | 'direita'; cor: `#${string}` }) {
  // #RRGGBB + "00" é a mesma cor com opacidade zero. Não usamos 'transparent'
  // porque ele é preto transparente, e o meio do degradê ficaria acinzentado.
  const some: `#${string}` = `${cor}00`;

  return (
    <LinearGradient
      colors={lado === 'esquerda' ? [cor, some] : [some, cor]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[estilos.esmaecer, lado === 'esquerda' ? estilos.naEsquerda : estilos.naDireita]}
    />
  );
}

const estilos = StyleSheet.create({
  moldura: {
    position: 'relative',
  },
  copia: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  esmaecer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 28,
    pointerEvents: 'none',
  },
  naEsquerda: { left: 0 },
  naDireita: { right: 0 },
});
