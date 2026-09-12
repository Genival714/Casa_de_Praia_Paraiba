/**
 * Revelação ao rolar — versão nativa.
 *
 * No app nativo não existe CSS nem IntersectionObserver, e o movimento das
 * telas já é do próprio sistema. Aqui a função não faz nada de propósito.
 *
 * A versão que vale na web está em revelar.web.ts, ao lado deste arquivo;
 * o empacotador escolhe uma das duas sozinho.
 */
export function registrarRevelacao(_no: unknown): void {
  // sem efeito no nativo
}

/** Contador animado — sem efeito no nativo. */
export function contarQuandoVisivel(_no: unknown): void {
  // sem efeito no nativo
}
