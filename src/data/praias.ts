import type { Destino } from '@/lib/links';

export type Litoral = 'sul' | 'norte';
export type Nivel = 'top1' | 'top2' | 'norte';

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
   * Foto opcional. Salve o arquivo em `public/fotos/lugares/` e escreva aqui
   * apenas o nome, assim: `foto: 'lugares/coqueirinho.jpg'`.
   */
  foto?: string;
  /** Marca a praia onde a casa fica. */
  ehACasa?: boolean;
};

/* =========================================================================
 * LITORAL SUL — TOP I
 * Ranking pessoal do anfitrião.
 * ======================================================================= */

const litoralSulTop1: Praia[] = [
  {
    id: 'tabatinga-ii',
    nome: 'Tabatinga II',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 1,
    minutosDeCarro: 9,
    resumo:
      'Falésias altas, mar tranquilo e a vista que virou cartão-postal do Conde. É daqui que se chega ao Mirante da Voçoroca.',
    destaques: ['Falésias', 'Mirante da Voçoroca', 'Restaurantes na beira-mar'],
    dica: 'Suba ao mirante no fim da tarde: a luz bate de lado e o barranco fica alaranjado.',
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
      'Uma enseada abraçada por falésias coloridas e coqueiros, com água esverdeada e piscininhas que se formam na maré baixa.',
    destaques: ['Falésias coloridas', 'Águas calmas', 'Trilha até o Dedo de Deus'],
    dica: 'Vá na maré baixa: dá para caminhar pela faixa de areia até a formação do Dedo de Deus.',
    buscaMapa: 'Praia de Coqueirinho, Conde - PB',
  },
  {
    id: 'rio-grau',
    nome: 'Rio Graú',
    cidade: 'Pitimbu',
    litoral: 'sul',
    nivel: 'top1',
    posicao: 3,
    minutosDeCarro: 30,
    resumo:
      'O encontro do rio com o mar, em Praia Bela. Água doce e morna de um lado, ondas do outro — o melhor lugar do litoral para ir com crianças.',
    destaques: ['Encontro do rio com o mar', 'Ótimo para crianças', 'Bar e restaurante'],
    dica: 'Fica no trecho do Tambazulik / Barramares, em Praia Bela.',
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
      'Faixa de areia larga e extensa, coqueirais e mar aberto. Espaço de sobra para caminhar longe do movimento.',
    destaques: ['Praia extensa', 'Coqueirais', 'Boa estrutura'],
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
      'Falésias, mata atlântica e piscinas naturais entre as pedras. Foi a primeira praia oficial de naturismo do Brasil.',
    destaques: ['Piscinas naturais', 'Falésias e mata', 'Mirante de Tambaba'],
    dica: 'A praia é dividida: há o setor naturista, com regras próprias de acesso, e o setor tradicional, aberto a todos.',
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
      'Conhecida como a menor praia do Brasil: uma pequena enseada encaixada entre falésias, no trecho de Tambaba.',
    destaques: ['A menor praia do Brasil', 'Enseada entre falésias', 'Recanto reservado'],
    buscaMapa: 'Praia de Marcelia, Tambaba, Conde - PB',
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
      'Onde o rio Abiaí desemboca no mar, formando bancos de areia e água rasa e morna na maré baixa.',
    destaques: ['Foz do rio Abiaí', 'Bancos de areia', 'Passeio de barco'],
    buscaMapa: 'Barra do Abiai, Pitimbu - PB',
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
      'A última praia do Litoral Sul paraibano. Na maré baixa, os arrecifes formam piscinas de água transparente e quente.',
    destaques: ['Piscinas naturais', 'Última praia do Litoral Sul', 'Vila de pescadores'],
    dica: 'Só vale na maré baixa — confira a tábua de marés antes de sair.',
    buscaMapa: 'Piscinas Naturais de Pitimbu - PB',
  },
];

/* =========================================================================
 * LITORAL SUL — TOP II
 * ======================================================================= */

const litoralSulTop2: Praia[] = [
  {
    id: 'tabatinga-i',
    nome: 'Tabatinga I',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 1,
    minutosDeCarro: 7,
    resumo:
      'A irmã mais tranquila de Tabatinga II, com acesso fácil e o mesmo paredão de falésias ao fundo.',
    destaques: ['Acesso fácil', 'Falésias', 'Movimento menor'],
    buscaMapa: 'Praia de Tabatinga I, Conde - PB',
  },
  {
    id: 'praia-do-amor',
    nome: 'Praia do Amor',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 2,
    minutosDeCarro: 0,
    ehACasa: true,
    resumo:
      'A praia da casa. Enseada calma entre falésias, com o Mirante do Amor logo acima — nome à altura do pôr do sol.',
    destaques: ['Onde fica a casa', 'Mirante do Amor', 'Enseada abrigada'],
    buscaMapa: 'Praia do Amor, Jacuma, Conde - PB',
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
      'O centrinho do litoral: praia movimentada, com bares, comércio e a estrutura que resolve o dia a dia da temporada.',
    destaques: ['Comércio e bares', 'Estrutura completa', 'Ponto de encontro'],
    buscaMapa: 'Praia de Jacuma, Conde - PB',
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
      'Praia de falésias e coqueiros, com um dos mirantes mais bonitos do Conde bem acima da faixa de areia.',
    destaques: ['Mirante de Carapibus', 'Falésias', 'Restaurantes'],
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
      'Um recanto escondido no trecho de Carapibus, com água rasa e clima de praia particular.',
    destaques: ['Pouco movimento', 'Água rasa', 'Recanto reservado'],
    buscaMapa: 'Maceiozinho, Carapibus, Conde - PB',
  },
  {
    id: 'barra-de-gramame',
    nome: 'Barra de Gramame',
    cidade: 'Conde',
    litoral: 'sul',
    nivel: 'top2',
    posicao: 6,
    minutosDeCarro: 15,
    resumo:
      'A porta de entrada do Litoral Sul, na foz do rio Gramame. Nos fins de semana é onde acontece a apresentação do Guaiamum Gigante.',
    destaques: ['Foz do rio Gramame', 'Guaiamum Gigante', 'Bares de beira-rio'],
    dica: 'A apresentação do Guaiamum Gigante acontece sábados e domingos, a partir das 9h, no Bar do Mexicano.',
    buscaMapa: 'Barra de Gramame, Conde - PB',
  },
];

/* =========================================================================
 * LITORAL NORTE — sugestões de bate-volta
 * Lista de partida com os clássicos do Litoral Norte e de João Pessoa.
 * Reordene o campo `posicao` para deixar no gosto do anfitrião.
 * ======================================================================= */

const litoralNorte: Praia[] = [
  {
    id: 'praia-do-jacare',
    nome: 'Praia do Jacaré',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 1,
    minutosDeCarro: 55,
    resumo:
      'Às margens do rio Paraíba, o pôr do sol é acompanhado ao vivo pelo Bolero de Ravel, tocado por um saxofonista sobre a água.',
    destaques: ['Pôr do sol com Bolero de Ravel', 'Beira-rio', 'Passeio de catamarã'],
    dica: 'Chegue com pelo menos uma hora de antecedência para pegar mesa de frente para o rio.',
    buscaMapa: 'Praia do Jacare, Cabedelo - PB',
  },
  {
    id: 'areia-vermelha',
    nome: 'Areia Vermelha',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 2,
    minutosDeCarro: 55,
    resumo:
      'Uma ilha de areia que só existe na maré baixa: os barcos saem de Camboinha e param sobre um banco cercado de água transparente.',
    destaques: ['Ilha de areia', 'Passeio de catamarã', 'Só na maré baixa'],
    dica: 'O passeio depende da tábua de marés — confirme o horário no dia anterior.',
    buscaMapa: 'Ilha de Areia Vermelha, Cabedelo - PB',
  },
  {
    id: 'ponta-do-seixas',
    nome: 'Ponta do Seixas',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 3,
    minutosDeCarro: 35,
    resumo:
      'O ponto mais oriental das Américas: é aqui que o sol nasce primeiro no continente, com o Farol do Cabo Branco logo acima.',
    destaques: ['Ponto mais oriental das Américas', 'Farol do Cabo Branco', 'Mirante'],
    dica: 'Vale acordar cedo uma vez na viagem para ver o primeiro nascer do sol do continente.',
    buscaMapa: 'Ponta do Seixas, Joao Pessoa - PB',
  },
  {
    id: 'picaozinho',
    nome: 'Piscinas de Picãozinho',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 4,
    minutosDeCarro: 40,
    resumo:
      'Arrecifes a poucos minutos de barco da orla de Tambaú, formando piscinas naturais cheias de peixes coloridos.',
    destaques: ['Piscinas naturais', 'Mergulho leve', 'Saída de Tambaú'],
    buscaMapa: 'Picaozinho, Joao Pessoa - PB',
  },
  {
    id: 'praia-do-bessa',
    nome: 'Praia do Bessa',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 5,
    minutosDeCarro: 45,
    resumo:
      'Praia larga com piscinas naturais que aparecem entre as pedras quando a maré recua, em clima de bairro residencial.',
    destaques: ['Piscinas naturais', 'Praia larga', 'Clima de bairro'],
    buscaMapa: 'Praia do Bessa, Joao Pessoa - PB',
  },
  {
    id: 'intermares',
    nome: 'Intermares',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 6,
    minutosDeCarro: 50,
    resumo:
      'Piscinas naturais na maré baixa e um projeto de preservação de tartarugas marinhas na própria faixa de areia.',
    destaques: ['Tartarugas marinhas', 'Piscinas naturais', 'Orla urbanizada'],
    buscaMapa: 'Praia de Intermares, Cabedelo - PB',
  },
  {
    id: 'tambau',
    nome: 'Tambaú',
    cidade: 'João Pessoa',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 7,
    minutosDeCarro: 40,
    resumo:
      'A orla principal de João Pessoa: calçadão, quiosques, feirinha de artesanato e a saída dos barcos para as piscinas naturais.',
    destaques: ['Orla principal', 'Feirinha de artesanato', 'Bares e restaurantes'],
    buscaMapa: 'Praia de Tambau, Joao Pessoa - PB',
  },
  {
    id: 'camboinha',
    nome: 'Camboinha',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 8,
    minutosDeCarro: 55,
    resumo:
      'Mar calmo, quiosques de frutos do mar e o ponto de embarque para a Ilha de Areia Vermelha.',
    destaques: ['Mar calmo', 'Frutos do mar', 'Saída para Areia Vermelha'],
    buscaMapa: 'Praia de Camboinha, Cabedelo - PB',
  },
  {
    id: 'praia-do-poco',
    nome: 'Praia do Poço',
    cidade: 'Cabedelo',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 9,
    minutosDeCarro: 55,
    resumo:
      'Praia tranquila de águas rasas, vizinha do Jacaré — boa parada antes ou depois do pôr do sol no rio.',
    destaques: ['Águas rasas', 'Tranquila', 'Perto do Jacaré'],
    buscaMapa: 'Praia do Poco, Cabedelo - PB',
  },
  {
    id: 'lucena',
    nome: 'Lucena e Praia de Fagundes',
    cidade: 'Lucena',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 10,
    minutosDeCarro: 80,
    resumo:
      'Do outro lado do rio Paraíba: coqueirais, praias vazias e a travessia de balsa saindo de Cabedelo.',
    destaques: ['Travessia de balsa', 'Praias vazias', 'Coqueirais'],
    dica: 'A balsa parte de Costinha, em Cabedelo, e encurta bastante o caminho.',
    buscaMapa: 'Praia de Fagundes, Lucena - PB',
  },
  {
    id: 'barra-de-camaratuba',
    nome: 'Barra de Camaratuba',
    cidade: 'Mataraca',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 11,
    minutosDeCarro: 110,
    resumo:
      'Reduto de surfe no extremo norte do estado, na foz do rio Camaratuba, cercado de dunas e coqueirais.',
    destaques: ['Surfe', 'Foz de rio', 'Dunas'],
    buscaMapa: 'Barra de Camaratuba, Mataraca - PB',
  },
  {
    id: 'baia-da-traicao',
    nome: 'Baía da Traição',
    cidade: 'Baía da Traição',
    litoral: 'norte',
    nivel: 'norte',
    posicao: 12,
    minutosDeCarro: 140,
    resumo:
      'Enseadas de água calma, falésias e a cultura viva das aldeias Potiguara — o passeio mais distante e mais diferente da lista.',
    destaques: ['Aldeias Potiguara', 'Enseadas calmas', 'Cultura indígena'],
    dica: 'Programe o dia inteiro: é a viagem mais longa entre os passeios sugeridos.',
    buscaMapa: 'Baia da Traicao - PB',
  },
];

export const praias: Praia[] = [...litoralSulTop1, ...litoralSulTop2, ...litoralNorte];

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
    nivel: 'norte',
    litoral: 'norte',
    titulo: 'Litoral Norte e João Pessoa',
    descricao: 'Bate-volta de um dia, subindo o litoral a partir da capital.',
    itens: litoralNorte,
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
