/**
 * Revelação ao rolar — versão web.
 *
 * A primeira página já é observada pelo script no fim do <body>
 * (app/+html.tsx). Mas a navegação do site é feita do lado do cliente: ao
 * trocar de página, blocos novos nascem depois daquele script ter rodado.
 *
 * Em vez de ficar vigiando o documento inteiro com um MutationObserver, cada
 * bloco se apresenta ao montar. Resolve por construção e custa uma linha.
 */

type JanelaComRevelar = Window & {
  __revelar?: (no: Element) => void;
};

/** Observador reserva, para o caso de o script do <body> não ter rodado. */
let reserva: IntersectionObserver | null = null;

function observar(): ((no: Element) => void) | null {
  if (typeof window === 'undefined') return null;

  const janela = window as JanelaComRevelar;
  if (janela.__revelar) return janela.__revelar;

  if (!('IntersectionObserver' in window)) return null;

  if (!reserva) {
    reserva = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.setAttribute('data-visivel', '1');
            reserva?.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px -6% 0px' },
    );
  }

  return (no: Element) => reserva?.observe(no);
}

/**
 * Registra um nó para ser revelado quando entrar na tela.
 * Recebe `unknown` porque quem chama passa uma ref do React Native.
 */
export function registrarRevelacao(no: unknown): void {
  if (!no || typeof no !== 'object') return;

  const elemento = no as Element;
  if (typeof elemento.setAttribute !== 'function') return;
  if (elemento.hasAttribute?.('data-visivel')) return;

  observar()?.(elemento);
}

/* -------------------------------------------------------------------------
 * Contador: o número sobe de zero até o valor final quando entra na tela.
 *
 * Roda SÓ depois que o React assumiu a página (é chamado de um useEffect).
 * Se rodasse antes, pelo script do <body>, o React encontraria "3" onde
 * escreveu "8" e reclamaria de hidratação — foi exatamente o que aconteceu
 * na primeira versão.
 * ----------------------------------------------------------------------- */

function animarNumero(no: Element) {
  const fim = parseFloat(no.getAttribute('data-contador') ?? '');
  if (Number.isNaN(fim)) return;
  const sufixo = no.getAttribute('data-sufixo') ?? '';
  const duracao = 1100;
  let inicio: number | null = null;

  const passo = (t: number) => {
    if (inicio === null) inicio = t;
    const p = Math.min(1, (t - inicio) / duracao);
    const suave = 1 - Math.pow(1 - p, 3);
    no.textContent = `${Math.round(fim * suave)}${sufixo}`;
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

let observadorDeContagem: IntersectionObserver | null = null;

/**
 * Registra um bloco cujos filhos `[data-contador]` devem contar ao aparecer.
 * Quem prefere menos movimento vê o número final direto.
 */
export function contarQuandoVisivel(no: unknown): void {
  if (typeof window === 'undefined' || !no || typeof no !== 'object') return;
  const bloco = no as Element;
  if (typeof bloco.querySelectorAll !== 'function') return;

  const alvos = Array.from(bloco.querySelectorAll('[data-contador]'));
  if (alvos.length === 0) return;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const disparar = () => alvos.forEach(animarNumero);

  if (!('IntersectionObserver' in window)) {
    disparar();
    return;
  }

  if (!observadorDeContagem) {
    observadorDeContagem = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            const acao = pendentes.get(entrada.target);
            observadorDeContagem?.unobserve(entrada.target);
            pendentes.delete(entrada.target);
            acao?.();
          }
        }
      },
      { threshold: 0.3 },
    );
  }
  pendentes.set(bloco, disparar);
  observadorDeContagem.observe(bloco);
}

const pendentes = new Map<Element, () => void>();
