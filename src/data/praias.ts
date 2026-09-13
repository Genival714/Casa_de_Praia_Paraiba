import { creditosDasFotos, fotosDasPraias } from '@/data/fotosDasPraias';
import type { Credito } from '@/lib/creditos';
import type { Destino } from '@/lib/links';

export type Litoral = 'sul' | 'norte';

export type VideoDaPraia = {
  /**
   * Link do vídeo, do jeito que sai do botão "copiar link" do app.
   * Entende YouTube (e Shorts), Instagram (post e Reels), TikTok e Vimeo —
   * o vídeo roda dentro do site, sem mandar o hóspede para fora.
   */
  url: string;
  /** Aparece no visor; sem ele, vale o nome da praia. */
  titulo?: string;
};

/**
 * Cada litoral tem dois grupos: o Top 1 (as imperdíveis) e o Top 2 —
 * no Sul, as praias da vizinhança; no Norte, as piscinas naturais.
 */
export type Nivel = 'top1' | 'top2';

export type Praia = Destino & {
  id: string;
  nome: string;
  cidade: string;
  litoral: Litoral;
  nivel: Nivel;
  /** Posição no ranking pessoal do anfitrião, dentro do próprio grupo. */
  posicao: number;
  resumo: string;
  destaques: string[];
  /** Tempo aproximado de carro saindo da casa. Confira e ajuste se precisar. */
  minutosDeCarro: number;
  dica?: string;
  /**
   * Fotos da praia, a primeira é a capa. NÃO se escreve aqui: vem de
   * `fotosDasPraias.ts`, que o script `scripts/fotos-das-praias.py` gera a
   * partir da pasta `Imagens das Praias/`. Caminhos a partir de `public/fotos/`.
   */
  fotos?: readonly string[];
  /** Vídeos da praia — estes sim se escrevem aqui, um link por vídeo. */
  videos?: readonly VideoDaPraia[];
  /** Marca a praia onde a casa fica. */
  ehACasa?: boolean;
};

/** Liga a cada praia as fotos que o script gerou para o `id` dela. */
function comFotos(lista: Praia[]): Praia[] {
  return lista.map((praia) => {
    const nomes = fotosDasPraias[praia.id];
    return nomes ? { ...praia, fotos: nomes.map((nome) => `praias/${nome}`) } : praia;
  });
}

/**
 * A versão pequena de uma foto de praia (480 px), para cartões e chips.
 * Fotos de fora de `praias/` não têm miniatura e voltam como estão.
 */
export function miniaturaDe(arquivo: string): string {
  return arquivo.startsWith('praias/') ? arquivo.replace('praias/', 'praias/miniaturas/') : arquivo;
}

/**
 * O crédito de uma foto de praia, se ela for de terceiros. As fotos do
 * anfitrião não têm crédito e voltam `undefined`.
 */
export function creditoDaFoto(arquivo: string): Credito | undefined {
  return creditosDasFotos[arquivo.replace(/^praias\/(miniaturas\/)?/, '')];
}

/* =========================================================================
 * BARRA DE GRAMAME — a praia da divisa
 * Fica entre o Conde e João Pessoa e entra nas duas listas: fecha o Top 1
 * do Litoral Sul e abre o do Litoral Norte. É uma praia só (mesmo `id`,
 * mesmas fotos); o que muda é a posição e a dica de cada lado.
 * ======================================================================= */

const barraDeGramame: Praia = {
  id: 'barra-de-gramame',
  nome: 'Barra de Gramame',
  cidade: 'Conde · João Pessoa',
  litoral: 'sul',
  nivel: 'top1',
  posicao: 9,
  minutosDeCarro: 15,
  resumo:
    'O encontro do rio Gramame com o mar, na divisa com João Pessoa. Água calma e rasa do lado do rio, boa para crianças, bares pé na areia e, nos fins de semana, a apresentação do Guaiamum Gigante.',
  destaques: ['Foz do rio Gramame', 'Guaiamum Gigante', 'Bares pé na areia'],
  dica: 'A apresentação do Guaiamum Gigante acontece sábados e domingos, a partir das 9h, no Bar do Mexicano. Na areia fica também o Bar do Seu Zezinho e, no caminho de volta para João Pessoa, o Bar e Restaurante da Kada.',
  buscaMapa: 'Barra de Gramame, Conde - PB',
  videos: [
    {
      url: 'https://www.tiktok.com/@portal.jampa/video/7561142926361906444?is_from_webapp=1&sender_device=pc',
      titulo: 'Barra de Gramame, por @portal.jampa',
    },
  ],
};

/* =========================================================================
 * LITORAL SUL — TOP 1
 * Ranking pessoal do anfitrião: as imperdíveis.
 * ======================================================================= */

const litoralSulTop1: Praia[] = comFotos([
  {
    id: 'tabatinga-ii',
    nome: 'Tabatinga II',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 1,
    minutosDeCarro: 9,
    resumo:
      'Falésias altas, mar aberto e a melhor concentração de bares pé na areia do trecho. No alto da praia está o Mirante da Voçoroca, um dos pontos mais fotografados do litoral.',
    destaques: ['Falésias', 'Mirante da Voçoroca', 'Bares pé na areia'],
    dica: 'Acesso pela PB-008, com estacionamento na parte alta e descida até a areia. Na beira-mar ficam o Praia Soul e o TabaGrill Mirante; suba ao mirante no fim da tarde, quando o barranco fica alaranjado.',
    buscaMapa: 'Praia de Tabatinga II, Conde - PB',
  },
  {
    id: 'coqueirinho',
    nome: 'Coqueirinho e Enseada de Coqueirinho',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 2,
    minutosDeCarro: 12,
    resumo:
      'O cartão-postal do Litoral Sul: falésias avermelhadas, coqueiral e água esverdeada. Boa estrutura de quiosques e estacionamento — funciona bem com família e crianças.',
    destaques: ['Falésias coloridas', 'Piscinas na maré baixa', 'Trilha até o Dedo de Deus'],
    dica: 'Costuma receber excursões: chegue cedo para pegar a praia mais vazia. Na maré baixa formam-se piscinas junto às pedras e dá para caminhar até a enseada, um pouco além e mais reservada.',
    buscaMapa: 'Praia de Coqueirinho, Conde - PB',
  },
  {
    id: 'rio-grau',
    nome: 'Barra do Rio Graú',
    cidade: 'Conde · Pitimbu',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 3,
    minutosDeCarro: 30,
    resumo:
      'O encontro do rio com o mar, em cenário rústico e quase deserto. Água calma do lado do rio e mar aberto do outro — o melhor lugar do litoral para ir com crianças.',
    destaques: ['Encontro do rio com o mar', 'Ótimo para crianças', 'Divisa Conde · Pitimbu'],
    dica: 'O banho seguro é na parte do rio. A estrutura de bares fica do lado de Pitimbu, no trecho do Tambazulik / Barramares, em Praia Bela; o lado do Conde é bonito, porém sem apoio — leve água e comida se for ficar o dia.',
    buscaMapa: 'Rio Grau, Praia Bela, Pitimbu - PB',
  },
  {
    id: 'praia-bela',
    nome: 'Praia Bela',
    cidade: 'Pitimbu',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 4,
    minutosDeCarro: 30,
    resumo:
      'Famosa pelo encontro do rio de águas escuras do mangue com o mar. Faixa estreita de areia, piscinas naturais e áreas de água parada, ótimas para crianças.',
    destaques: ['Rio do mangue e mar', 'Água parada para crianças', 'Restaurantes à beira do rio'],
    dica: 'A paisagem fica no auge na maré baixa. Os restaurantes são simples, instalados à beira do rio.',
    buscaMapa: 'Praia Bela, Pitimbu - PB',
  },
  {
    id: 'tambaba',
    nome: 'Tambaba',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 5,
    minutosDeCarro: 20,
    resumo:
      'Enseada entre paredões de falésia e mata atlântica, com piscinas rasas e água calma na maré baixa. Foi a primeira praia oficial de naturismo do Brasil.',
    destaques: ['Piscinas na maré baixa', 'Falésias e mata', 'Almoço na Arca da Bilú'],
    dica: 'A praia é dividida em duas partes: a área convencional, aberta a todos, e a área naturista, com acesso separado e código próprio — é proibido fotografar e homens desacompanhados só entram com carteirinha de naturista.',
    buscaMapa: 'Praia de Tambaba, Conde - PB',
  },
  {
    id: 'marcelia',
    nome: 'Praia de Marcélia',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 6,
    minutosDeCarro: 20,
    resumo:
      'Pequeno trecho de areia encaixado entre falésias, no mesmo conjunto de Tambaba — apontado por moradores como a menor praia do Brasil.',
    destaques: ['A menor praia do Brasil', 'Enseada entre falésias', 'Junto a Tambaba'],
    dica: 'Visita-se na mesma parada de Tambaba, a pé pela areia, dependendo da maré. Dica da casa: combine com o Mirante de Tambaba no fim da tarde.',
    buscaMapa: 'Praia de Marcelia, Tambaba, Conde - PB',
    videos: [{ url: 'https://www.youtube.com/shorts/AZ5zTFgskWI?feature=share' }],
  },
  {
    id: 'barra-abiai',
    nome: 'Barra do Abiaí',
    cidade: 'Pitimbu',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 7,
    minutosDeCarro: 35,
    resumo:
      'Outro encontro de rio e mar, com coqueiral fechado e clima de vilarejo. Na parte do rio a água é rasa e morna, e há passeio de barco pelos manguezais.',
    destaques: ['Foz do rio Abiaí', 'Água rasa e morna', 'Passeio de barco'],
    dica: 'Fica no caminho entre Praia Bela e o centro de Pitimbu. Estrutura simples: leve dinheiro em espécie.',
    buscaMapa: 'Barra do Abiai, Pitimbu - PB',
    videos: [{ url: 'https://youtu.be/aoT23IkYO6o?si=OoYiftyVzINjzxij' }],
  },
  {
    id: 'piscinas-pitimbu',
    nome: 'Piscinas Naturais de Pitimbu',
    cidade: 'Pitimbu',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 8,
    minutosDeCarro: 40,
    resumo:
      'Piscinas de água transparente e quente que aparecem na maré baixa, no extremo sul do litoral paraibano — a última praia do estado.',
    destaques: ['Piscinas naturais', 'Passeio de catamarã', 'Última praia do Litoral Sul'],
    dica: 'Só existem com a maré baixa — confira a tábua de marés antes de sair. Há passeio de catamarã saindo de Pitimbu, e vale combinar com o almoço em Acaú, na Pontinha.',
    buscaMapa: 'Piscinas Naturais de Pitimbu - PB',
  },
  barraDeGramame,
]);

/* =========================================================================
 * LITORAL SUL — TOP 2
 * As praias da vizinhança, todas a poucos minutos da casa.
 * ======================================================================= */

const litoralSulTop2: Praia[] = comFotos([
  {
    id: 'praia-do-amor',
    nome: 'Praia do Amor',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 1,
    minutosDeCarro: 0,
    ehACasa: true,
    resumo:
      'A praia da casa: falésias, formações de pedra e clima tranquilo, com o Mirante do Amor logo acima — nome à altura do pôr do sol.',
    destaques: ['Onde fica a casa', 'Mirante do Amor', 'Clima tranquilo'],
    dica: 'Boa para o primeiro dia, enquanto a família se ambienta. No fim da tarde, suba ao Mirante do Amor.',
    buscaMapa: 'Praia do Amor, Jacuma, Conde - PB',
  },
  {
    id: 'tabatinga-i',
    nome: 'Tabatinga I',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 2,
    minutosDeCarro: 7,
    resumo:
      'O trecho mais abrigado de Tabatinga, com formações naturais nas pedras — entre elas, uma espécie de ponte escavada pelo mar nos recifes.',
    destaques: ['Ponte natural nos recifes', 'Trecho abrigado', 'Quase sempre vazia'],
    dica: 'Costuma ficar vazia mesmo na temporada, a poucos minutos da casa pela PB-008.',
    buscaMapa: 'Praia de Tabatinga I, Conde - PB',
  },
  {
    id: 'jacuma',
    nome: 'Jacumã',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 3,
    minutosDeCarro: 2,
    resumo:
      'O núcleo urbano do litoral: comércio, farmácia, mercado e movimento à noite. É onde você resolve as compras da estadia e de onde partem quase todos os passeios.',
    destaques: ['Comércio e farmácia', 'Bares na orla', 'Ponto de partida'],
    buscaMapa: 'Praia de Jacuma, Conde - PB',
    videos: [{ url: 'https://youtube.com/shorts/4Uup5Snjl6I?si=1kJ59lzRMkwC0wga' }],
  },
  {
    id: 'carapibus',
    nome: 'Carapibus',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 4,
    minutosDeCarro: 5,
    resumo:
      'Mar calmo na maré baixa e um dos mirantes mais bonitos do trecho, logo acima da praia. Excelente para crianças quando a maré está baixa.',
    destaques: ['Mirante de Carapibus', 'Ótima para crianças', 'Almoço no Turek'],
    dica: 'Almoce no Turek, ali mesmo em Carapibus: costela assada, moqueca de pescada amarela e torta holandesa.',
    buscaMapa: 'Praia de Carapibus, Conde - PB',
  },
  {
    id: 'maceiozinho',
    nome: 'Maceiozinho de Carapibus',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 5,
    minutosDeCarro: 6,
    resumo:
      'Poço de água doce e rasa que se forma junto à praia — água parada e morna, sem ondas, sucesso com as crianças.',
    destaques: ['Água doce e rasa', 'Sem ondas', 'Sucesso com crianças'],
    dica: 'Visite junto com Carapibus, na mesma manhã. Depende do regime de chuvas e da maré.',
    buscaMapa: 'Maceiozinho, Carapibus, Conde - PB',
  },
]);

/* =========================================================================
 * LITORAL NORTE — TOP 1
 * As imperdíveis do lado de João Pessoa: praias largas, foz de rio e pouca
 * estrutura. Bate-volta de um dia, subindo a PB-008.
 * ======================================================================= */

const litoralNorteTop1: Praia[] = comFotos([
  {
    ...barraDeGramame,
    litoral: 'norte',
    posicao: 1,
    dica: 'É a praia mais próxima de quem vem do Litoral Sul: fica no caminho para João Pessoa. Aos sábados e domingos, a apresentação do Guaiamum Gigante começa às 9h, no Bar do Mexicano.',
  },
  {
    id: 'praia-do-sol',
    nome: 'Praia do Sol',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'top1',
    posicao: 2,
    minutosDeCarro: 20,
    resumo:
      'Praia larga e pouco movimentada na zona sul de João Pessoa, entre falésias e vegetação nativa. Boa para quem quer praia vazia mesmo na temporada.',
    destaques: ['Praia larga e vazia', 'Falésias e mata', 'Zona sul de João Pessoa'],
    dica: 'Acesso por via secundária a partir da PB-008. Estrutura simples: leve água, comida e dinheiro em espécie.',
    buscaMapa: 'Praia do Sol, Joao Pessoa - PB',
  },
  {
    id: 'jacarape',
    nome: 'Praia de Jacarapé',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'top1',
    posicao: 3,
    minutosDeCarro: 22,
    resumo:
      'A foz do rio Jacarapé cercada de mata atlântica preservada, com água doce e salgada no mesmo lugar. A parte do rio forma poços rasos, ótimos para as crianças.',
    destaques: ['Foz do rio Jacarapé', 'Mata atlântica', 'Poços rasos para crianças'],
    dica: 'Fica dentro de uma área de proteção ambiental — a paisagem é o atrativo principal. Almoço no Restaurante e Peixada Jacarapé, ali mesmo.',
    buscaMapa: 'Praia de Jacarape, Joao Pessoa - PB',
  },
  {
    id: 'praia-da-penha',
    nome: 'Praia da Penha',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'top1',
    posicao: 4,
    minutosDeCarro: 28,
    resumo:
      'A praia da igreja de Nossa Senhora da Penha, no alto do rochedo, com piscinas naturais que aparecem na maré baixa.',
    destaques: ['Igreja da Penha', 'Piscinas naturais', 'Ponto de romaria'],
    dica: 'A igreja é ponto de romaria e rende as melhores fotos. As piscinas só aparecem na maré baixa. Almoço na Peixada do Edson, na PB-008.',
    buscaMapa: 'Praia da Penha, Joao Pessoa - PB',
  },
]);

/* =========================================================================
 * LITORAL NORTE — PISCINAS NATURAIS
 * Do Seixas a Cabedelo. Quase tudo aqui depende da maré baixa.
 * ======================================================================= */

const litoralNorteTop2: Praia[] = comFotos([
  {
    id: 'ponta-do-seixas',
    nome: 'Ponta do Seixas e piscinas naturais',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 1,
    minutosDeCarro: 35,
    resumo:
      'O ponto mais oriental das Américas — onde o sol nasce primeiro no continente. No alto fica o Farol do Cabo Branco, com vista para toda a costa.',
    destaques: ['Ponto mais oriental das Américas', 'Farol do Cabo Branco', 'Jangadas para as piscinas'],
    dica: 'Na maré baixa formam-se piscinas naturais junto aos recifes, com jangadas e catamarãs saindo da própria praia. A Peixada do Amor e a Peixada do Lobo ficam a poucos metros.',
    buscaMapa: 'Ponta do Seixas, Joao Pessoa - PB',
  },
  {
    id: 'piscinas-da-penha',
    nome: 'Piscinas naturais da Penha',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 2,
    minutosDeCarro: 28,
    resumo:
      'Piscinas de água transparente sobre os recifes, na frente da Praia da Penha. O passeio é feito de jangada ou catamarã.',
    destaques: ['Piscinas naturais', 'Jangada ou catamarã', 'Só na maré baixa'],
    dica: 'Só existem com a maré baixa — confira a tábua de marés antes de sair. Leve máscara e snorkel se tiver.',
    buscaMapa: 'Piscinas Naturais da Penha, Joao Pessoa - PB',
  },
  {
    id: 'areia-vermelha',
    nome: 'Areia Vermelha',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 3,
    minutosDeCarro: 55,
    resumo:
      'Banco de areia que emerge do mar na maré baixa e desaparece horas depois, cercado de água transparente. Os catamarãs saem da Praia de Camboinha.',
    destaques: ['Ilha de areia', 'Passeio de catamarã', 'Só na maré baixa'],
    dica: 'O passeio é agendado pela tábua de marés e dura poucas horas — confirme o horário na véspera. Leve protetor solar e chapéu: não há sombra natural.',
    buscaMapa: 'Ilha de Areia Vermelha, Cabedelo - PB',
  },
  {
    id: 'ponta-de-campina',
    nome: 'Ponta de Campina',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 4,
    minutosDeCarro: 55,
    resumo:
      'Mar calmo, faixa larga de areia e quiosques com estrutura para o dia inteiro — uma das praias mais tranquilas para famílias com crianças pequenas.',
    destaques: ['Mar calmo', 'Quiosques com estrutura', 'Crianças pequenas'],
    dica: 'Boa opção quando a maré não colabora para as piscinas naturais.',
    buscaMapa: 'Praia de Ponta de Campina, Cabedelo - PB',
  },
  {
    id: 'praia-formosa',
    nome: 'Praia Formosa',
    cidade: 'Intermares · Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 5,
    minutosDeCarro: 50,
    resumo:
      'Orla urbanizada em Intermares, com piscinas naturais rasas que se formam coladas na areia quando a maré baixa.',
    destaques: ['Piscinas rasas', 'Calçadão', 'Orla urbanizada'],
    dica: 'O calçadão é bom para caminhada e ciclismo. As piscinas aparecem na maré baixa, junto à praia.',
    buscaMapa: 'Praia Formosa, Cabedelo - PB',
  },
  {
    id: 'camboinha',
    nome: 'Praia de Camboinha',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 6,
    minutosDeCarro: 55,
    resumo:
      'O ponto de partida dos catamarãs para Areia Vermelha e para as piscinas naturais, com bares e restaurantes na beira da praia enquanto se espera o embarque.',
    destaques: ['Saída para Areia Vermelha', 'Bares na praia', 'Mar calmo'],
    dica: 'Chegue com antecedência e confira o horário do passeio na véspera: ele muda com a maré.',
    buscaMapa: 'Praia de Camboinha, Cabedelo - PB',
  },
  {
    id: 'praia-do-poco',
    nome: 'Praia do Poço',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 7,
    minutosDeCarro: 55,
    resumo:
      'Mar calmo e raso, com quiosques e clima de praia de bairro. Excelente para crianças e para quem não quer mar agitado.',
    destaques: ['Mar calmo e raso', 'Quiosques', 'Clima de bairro'],
    dica: 'Fica no caminho entre Camboinha e o centro de Cabedelo.',
    buscaMapa: 'Praia do Poco, Cabedelo - PB',
  },
  {
    id: 'dique-de-cabedelo',
    nome: 'Dique de Cabedelo (Prainha)',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'top2',
    posicao: 8,
    minutosDeCarro: 60,
    resumo:
      'Água parada e rasa junto ao rio, ao lado do Forte Santa Catarina — praticamente uma piscina natural de rio, sem ondas.',
    destaques: ['Sem ondas', 'Forte Santa Catarina', 'Ótimo fim de tarde'],
    dica: 'Combine com a visita ao Forte Santa Catarina e ao Farol de Cabedelo, e fique para o fim de tarde.',
    buscaMapa: 'Prainha do Dique, Cabedelo - PB',
  },
]);

/**
 * Todas as praias, sem repetição: a Barra de Gramame aparece nos dois
 * litorais, mas conta uma vez só.
 */
const todas = [...litoralSulTop1, ...litoralSulTop2, ...litoralNorteTop1, ...litoralNorteTop2];
export const praias: Praia[] = todas.filter(
  (praia, indice) => todas.findIndex((outra) => outra.id === praia.id) === indice,
);

export type GrupoDePraias = {
  nivel: Nivel;
  litoral: Litoral;
  titulo: string;
  descricao: string;
  itens: Praia[];
};

export const gruposDePraias: GrupoDePraias[] = [
  {
    nivel: 'top1',
    litoral: 'sul',
    titulo: 'Top 1 · Litoral Sul',
    descricao: 'As imperdíveis. Se a temporada for curta, comece por estas.',
    itens: litoralSulTop1,
  },
  {
    nivel: 'top2',
    litoral: 'sul',
    titulo: 'Top 2 · Litoral Sul',
    descricao: 'As praias da vizinhança — todas a poucos minutos da casa.',
    itens: litoralSulTop2,
  },
  {
    nivel: 'top1',
    litoral: 'norte',
    titulo: 'Top 1 · Litoral Norte',
    descricao:
      'As imperdíveis da zona sul de João Pessoa: praias largas, foz de rio e pouca estrutura — leve água e dinheiro.',
    itens: litoralNorteTop1,
  },
  {
    nivel: 'top2',
    litoral: 'norte',
    titulo: 'Piscinas naturais · Litoral Norte',
    descricao:
      'Do Seixas a Cabedelo. Quase tudo aqui depende da maré baixa — monte o dia em volta dela.',
    itens: litoralNorteTop2,
  },
];

/** Atalho usado na faixa de destaques da tela inicial. */
export const praiasEmDestaque: Praia[] = [
  'praia-do-amor',
  'coqueirinho',
  'tabatinga-ii',
  'tambaba',
  'praia-bela',
  'carapibus',
]
  .map((id) => praias.find((p) => p.id === id))
  .filter((p): p is Praia => Boolean(p));
