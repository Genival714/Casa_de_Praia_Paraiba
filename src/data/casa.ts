import type { Destino } from '@/lib/links';

/* -------------------------------------------------------------------------
 * ARQUIVO PRINCIPAL DE EDIÇÃO
 * Quase tudo que muda com o tempo (telefones, endereço, fotos, textos)
 * mora aqui. Editar este arquivo e publicar de novo já atualiza o site
 * inteiro — não precisa mexer em mais nada.
 * ----------------------------------------------------------------------- */

export const casa = {
  nome: 'Casa de Praia · Praia do Amor',
  chamada: 'Onde o mar encontra o seu lar',
  subchamada:
    'Casa completa e toda mobiliada para a sua temporada no Litoral Sul da Paraíba.',
  fraseImpacto:
    'A poucos minutos das praias mais belas e sedutoras do litoral paraibano: Praia Bela, Coqueirinho, Tambaba, Tabatinga e Praia do Amor.',

  endereco: {
    logradouro: 'Loteamento Village',
    bairro: 'Praia do Amor · Jacumã',
    cidade: 'Conde',
    estado: 'PB',
    completo: 'Loteamento Village, Praia do Amor, Jacumã — Conde/PB',
  },

  /**
   * Ponto usado pelos botões "Ver no mapa" e "Traçar rota".
   * Enquanto não houver coordenada conferida, o mapa resolve pelo endereço.
   *
   * Para fixar o pino exato: abra o Google Maps, segure o dedo sobre a casa,
   * copie o par de números que aparece e preencha assim:
   *   coords: { lat: -7.3350, lng: -34.7990 },
   */
  destino: {
    buscaMapa: 'Loteamento Village, Praia do Amor, Jacuma, Conde - PB',
  } satisfies Destino,

  /** Os números viram link direto de WhatsApp e de ligação. */
  anfitrioes: [
    {
      nome: 'Genival Junior',
      papel: 'Proprietário',
      telefone: '81 99294-3407',
    },
    {
      nome: 'Elaine',
      papel: 'Reservas',
      telefone: '81 99459-7169',
    },
  ],

  mensagemWhatsApp:
    'Olá! Vi o site da Casa de Praia na Praia do Amor (Jacumã — Conde/PB) e gostaria de informações sobre disponibilidade e valores para temporada.',
} as const;

/** O que a casa oferece. */
export const comodidades = [
  { icone: 'piscina', titulo: 'Piscina', detalhe: 'Área de lazer com piscina e deck' },
  { icone: 'quarto', titulo: '2 quartos', detalhe: 'Sendo 1 suíte' },
  { icone: 'mobilia', titulo: 'Toda mobiliada', detalhe: 'É só chegar e aproveitar' },
  { icone: 'garagem', titulo: '2 vagas', detalhe: 'Garagem para dois carros' },
  { icone: 'banho', titulo: 'WC social e externo', detalhe: 'Banheiro de apoio na área da piscina' },
  { icone: 'cozinha', titulo: 'Sala e cozinha', detalhe: 'Ambiente integrado' },
  { icone: 'servico', titulo: 'Área de serviço', detalhe: 'Espaço para lavanderia' },
  { icone: 'seguranca', titulo: 'Sistema de segurança', detalhe: 'Mais tranquilidade para a família' },
  { icone: 'churrasco', titulo: 'Churrasqueira', detalhe: 'Área gourmet ao lado da piscina' },
  { icone: 'jogos', titulo: 'Área de jogos', detalhe: 'Sinuca, totó e redes' },
  { icone: 'ar', titulo: 'Ar-condicionado', detalhe: 'Nos quartos' },
  { icone: 'tv', titulo: 'TV nos quartos', detalhe: 'E frigobar de apoio' },
] as const;

export type Foto = {
  arquivo: string;
  legenda: string;
  categoria: 'lazer' | 'convivio' | 'quartos' | 'banheiros';
};

/**
 * As imagens ficam em `public/fotos/` e são servidas na raiz do site.
 * Para trocar uma foto, basta salvar o arquivo novo por cima, com o mesmo
 * nome. Para acrescentar, copie a foto para a pasta e escreva mais uma
 * linha aqui. Enquanto um arquivo não existir, entra um cartão
 * "Foto em breve" no lugar, sem quebrar o layout.
 */
export const galeria: Foto[] = [
  /* Área de lazer */
  { arquivo: 'piscina-deck.jpg', legenda: 'Piscina, deck e jardim', categoria: 'lazer' },
  { arquivo: 'piscina-cascata.jpg', legenda: 'A cascata da piscina', categoria: 'lazer' },
  { arquivo: 'area-gourmet.jpg', legenda: 'Área gourmet e churrasqueira', categoria: 'lazer' },
  { arquivo: 'deck-espreguicadeiras.jpg', legenda: 'Espreguiçadeiras e guarda-sóis', categoria: 'lazer' },
  { arquivo: 'area-jogos.jpg', legenda: 'Sinuca, totó e redes', categoria: 'lazer' },

  /* Sala e cozinha */
  { arquivo: 'sala-estar.jpg', legenda: 'Sala de estar', categoria: 'convivio' },
  { arquivo: 'cozinha.jpg', legenda: 'Cozinha equipada', categoria: 'convivio' },
  { arquivo: 'cozinha-cafe.jpg', legenda: 'Cantinho do café', categoria: 'convivio' },

  /* Quartos */
  { arquivo: 'quarto-casal-tv.jpg', legenda: 'Quarto com cama de casal, beliche e TV', categoria: 'quartos' },
  { arquivo: 'quarto-beliches-tv.jpg', legenda: 'Quarto com beliches, TV e frigobar', categoria: 'quartos' },
  { arquivo: 'quarto-beliches.jpg', legenda: 'Quarto com beliches', categoria: 'quartos' },

  /* Banheiros */
  { arquivo: 'banheiro-01.jpg', legenda: 'Banheiro com box', categoria: 'banheiros' },
  { arquivo: 'banheiro-03.jpg', legenda: 'Box de vidro', categoria: 'banheiros' },
  { arquivo: 'wc-externo.jpg', legenda: 'WC externo, com saída para a piscina', categoria: 'banheiros' },
];

export type Video = {
  arquivo: string;
  titulo: string;
  /** Duração escrita como aparece para o visitante. */
  duracao: string;
  /** Foto que aparece antes de o vídeo começar a tocar. */
  capa: string;
  /** Vídeo gravado em pé, como uma foto de celular na vertical. */
  emPe?: boolean;
};

/**
 * Os vídeos ficam em `public/videos/`.
 *
 * Eles só são baixados quando o visitante toca em "tocar" — a página abre
 * leve mesmo com todos eles no ar. O primeiro da lista é o que aparece
 * escolhido quando a pessoa chega na seção.
 */
export const videos: Video[] = [
  {
    arquivo: 'area-de-lazer.mp4',
    titulo: 'Área de lazer e piscina',
    duracao: '1 min 13',
    capa: 'piscina-deck.jpg',
  },
  {
    arquivo: 'quartos.mp4',
    titulo: 'Quartos e banheiro',
    duracao: '34 s',
    capa: 'quarto-casal-tv.jpg',
  },
  {
    arquivo: 'sala-e-cozinha.mp4',
    titulo: 'Sala e cozinha',
    duracao: '18 s',
    capa: 'sala-estar.jpg',
  },
  {
    arquivo: 'banheiro.mp4',
    titulo: 'Banheiro',
    duracao: '20 s',
    capa: 'banheiro-01.jpg',
    emPe: true,
  },
  {
    arquivo: 'quarto-beliches.mp4',
    titulo: 'Quarto com beliches',
    duracao: '13 s',
    capa: 'quarto-beliches.jpg',
  },
];
