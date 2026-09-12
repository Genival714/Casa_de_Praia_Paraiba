import Head from 'expo-router/head';

import { IMAGEM_DE_COMPARTILHAMENTO, urlAbsoluta, urlDaPagina } from '@/lib/site';

/**
 * Título e metatags de uma página.
 *
 * Antes, o título vivia em app/+html.tsx e era o mesmo nas cinco páginas —
 * pior: o react-helmet inseria um <title> vazio ANTES dele, e é o primeiro
 * que o navegador usa. Ou seja, o site aparecia sem nome nenhum na aba e nos
 * resultados de busca. Declarar aqui resolve os dois problemas de uma vez.
 *
 * O endereço absoluto só existe quando o site é gerado pelo script de
 * publicação. Rodando na sua máquina, as tags que precisam dele são
 * simplesmente omitidas — melhor faltar do que apontar para o lugar errado.
 */
export function CabecalhoDaPagina({
  titulo,
  descricao,
  rota,
}: {
  titulo: string;
  descricao: string;
  /** '/', '/casa', '/regras'… */
  rota: string;
}) {
  const endereco = urlDaPagina(rota);
  const imagem = urlAbsoluta(IMAGEM_DE_COMPARTILHAMENTO);

  return (
    <Head>
      <title>{titulo}</title>
      <meta name="description" content={descricao} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={titulo} />
      <meta property="og:description" content={descricao} />
      <meta name="twitter:card" content="summary_large_image" />

      {endereco ? <link rel="canonical" href={endereco} /> : null}
      {endereco ? <meta property="og:url" content={endereco} /> : null}
      {imagem ? <meta property="og:image" content={imagem} /> : null}
      {imagem ? <meta name="twitter:image" content={imagem} /> : null}
    </Head>
  );
}
