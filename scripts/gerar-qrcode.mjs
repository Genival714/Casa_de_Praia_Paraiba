/**
 * Gera a plaquinha de QR Code para pendurar na parede da casa.
 *
 *   npm run qrcode -- https://seu-site.com
 *
 * Produz dois arquivos em `qrcode/`:
 *   - qrcode-casa.svg     → o QR Code puro, para colar em qualquer arte
 *   - placa-casa.svg      → a placa pronta para imprimir (A5 em pé)
 *
 * SVG imprime nítido em qualquer tamanho. Para virar PDF, é só abrir o
 * arquivo no navegador e mandar imprimir escolhendo "Salvar como PDF".
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import QRCode from 'qrcode';

// Espelha src/theme.ts à mão — este script é Node puro e não importa de lá.
const AZUL_MAR = '#0A4B57';
const AZUL_FUNDO = '#04303A';
const AREIA = '#FFFCF6';
const CORAL = '#C96A31';

const url = process.argv[2];

if (!url) {
  console.error(`
Faltou o endereço do site.

  npm run qrcode -- https://seu-site.com

Coloque o endereço completo, com https:// na frente.
`);
  process.exit(1);
}

try {
  // Recusa cedo um endereço malformado: melhor errar aqui do que imprimir
  // cinquenta placas com um QR Code que não abre nada.
  const conferido = new URL(url);
  if (!['http:', 'https:'].includes(conferido.protocol)) {
    throw new Error('protocolo inválido');
  }
} catch {
  console.error(`\nEndereço inválido: "${url}"\nUse algo como https://casadepraia.netlify.app\n`);
  process.exit(1);
}

const pasta = resolve(process.cwd(), 'qrcode');
await mkdir(pasta, { recursive: true });

/* -------------------------------------------------------------------------
 * 1. O QR Code sozinho
 * Correção de erro "H": o código continua legível mesmo sujo, riscado ou
 * parcialmente coberto — o que é bem provável numa parede de casa de praia.
 * ----------------------------------------------------------------------- */
const svgDoQr = await QRCode.toString(url, {
  type: 'svg',
  errorCorrectionLevel: 'H',
  margin: 1,
  color: { dark: AZUL_FUNDO, light: '#FFFFFF' },
});

await writeFile(resolve(pasta, 'qrcode-casa.svg'), svgDoQr, 'utf8');

/* -------------------------------------------------------------------------
 * 2. A placa pronta para imprimir
 * ----------------------------------------------------------------------- */
const miolo = svgDoQr
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/fill="#FFFFFF"/gi, 'fill="none"');

const tamanhoDoQr = Number(svgDoQr.match(/viewBox="0 0 (\d+)/)?.[1] ?? 33);
const escala = 300 / tamanhoDoQr;

const placa = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="595" viewBox="0 0 420 595">
  <defs>
    <linearGradient id="mar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${AZUL_FUNDO}"/>
      <stop offset="100%" stop-color="${AZUL_MAR}"/>
    </linearGradient>
  </defs>

  <rect width="420" height="595" fill="${AREIA}"/>
  <path d="M0,0 H420 V150 C340,190 280,120 200,150 C120,180 60,150 0,168 Z" fill="url(#mar)"/>

  <circle cx="360" cy="52" r="40" fill="#D9903A" opacity="0.28"/>

  <text x="210" y="62" text-anchor="middle" fill="#3BB3BC"
        font-family="Georgia, serif" font-size="11" letter-spacing="3.4">CASA DE TEMPORADA</text>
  <text x="210" y="100" text-anchor="middle" fill="#FFFFFF"
        font-family="Georgia, serif" font-size="27" font-weight="600">Praia do Amor</text>
  <text x="210" y="122" text-anchor="middle" fill="rgba(255,255,255,0.85)"
        font-family="Helvetica, Arial, sans-serif" font-size="12">Jacumã · Conde — PB</text>

  <rect x="47" y="212" width="326" height="326" rx="22" fill="#FFFFFF"
        stroke="rgba(6,58,79,0.12)" stroke-width="1"/>
  <g transform="translate(60, 225) scale(${escala.toFixed(4)})">
    ${miolo}
  </g>

  <text x="210" y="196" text-anchor="middle" fill="${CORAL}"
        font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="bold"
        letter-spacing="1.6">APONTE A CÂMERA DO CELULAR</text>

  <text x="210" y="566" text-anchor="middle" fill="#4A6167"
        font-family="Helvetica, Arial, sans-serif" font-size="11">
    Praias · mirantes · restaurantes · como chegar
  </text>
</svg>
`;

await writeFile(resolve(pasta, 'placa-casa.svg'), placa, 'utf8');

console.log(`
QR Code gerado para: ${url}

  qrcode/qrcode-casa.svg   o código sozinho
  qrcode/placa-casa.svg    a placa pronta (A5 em pé)

Para imprimir: abra o arquivo da placa no navegador e use
Ctrl+P → "Salvar como PDF". Antes de mandar imprimir em quantidade,
escaneie a tela com o celular para conferir que o link abre certo.
`);
