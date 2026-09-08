/**
 * Configuração do app.
 *
 * Os dados fixos ficam em `app.json`. Este arquivo existe por um motivo só:
 * decidir, na hora de gerar o site, se ele vai morar na raiz de um endereço
 * (`https://meusite.com`) ou dentro de uma subpasta
 * (`https://usuario.github.io/nome-do-repo`).
 *
 * O GitHub Pages usa subpasta quando o site é de um repositório — e sem
 * avisar o Expo disso, todos os caminhos de foto, vídeo e página quebram.
 *
 * Quem define isso é a variável CAMINHO_BASE, que o script
 * `npm run github-pages` preenche sozinho. Sem ela, o site é gerado para a
 * raiz, que é o caso do Netlify e de domínio próprio.
 */
module.exports = ({ config }) => ({
  ...config,
  experiments: {
    ...config.experiments,
    baseUrl: process.env.CAMINHO_BASE ?? '',
  },
});
