/**
 * Crédito de uma foto que não é da casa.
 *
 * Foto do Wikimedia Commons ou de banco de imagens vem com licença que pede
 * o nome do autor e a licença à vista, com link para a fonte. As fotos do
 * anfitrião não precisam de nada disso — o campo simplesmente não existe.
 */
export type Credito = {
  /** Quem fotografou (ou "Fulano/MTur", no caso do Ministério do Turismo). */
  autor: string;
  /** Nome curto da licença: "CC BY-SA 4.0", "CC0", "Domínio público"… */
  licenca: string;
  /** Página da foto na fonte, onde estão o original e a licença completa. */
  url: string;
};

/** O texto que aparece em cima da foto: "Foto: Fulano · CC BY 2.0". */
export function textoDoCredito(credito: Credito): string {
  return `Foto: ${credito.autor} · ${credito.licenca}`;
}
